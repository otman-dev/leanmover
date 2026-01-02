import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/chat";
import { sendWhatsAppMessage } from "@/lib/whatsapp/send";
import { notifyAgent } from "@/lib/whatsapp/notify";
import {
  getConversationState,
  updateConversationState,
  addMessageToHistory,
} from "@/lib/whatsapp/state";

// GET - Webhook verification (required by Meta)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Check if token matches
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return new NextResponse(challenge, { status: 200 });
  }

  console.error("Webhook verification failed");
  return new NextResponse("Forbidden", { status: 403 });
}

// POST - Receive messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract message data
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    const message = value?.messages?.[0];

    // Ignore if no message or if it's a status update
    if (!message || value?.statuses) {
      return NextResponse.json({ success: true });
    }

    const from = message.from; // User's phone number
    const messageText = message.text?.body;
    const messageId = message.id;

    if (!messageText) {
      return NextResponse.json({ success: true });
    }

    console.log(`📱 WhatsApp message from ${from}: ${messageText}`);

    // Get conversation state
    const state = getConversationState(from);

    // Add user message to history
    addMessageToHistory(from, {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    });

    // Check if message is from agent
    const isAgent = await checkIfAgent(from);

    if (isAgent) {
      await handleAgentMessage(from, messageText, state);
      return NextResponse.json({ success: true });
    }

    // Handle based on conversation state
    switch (state.status) {
      case "ai_active":
        await handleAIResponse(from, messageText, state);
        break;

      case "pending_agent":
        await handlePendingAgentState(from, messageText, state);
        break;

      case "agent_active":
        // Forward to agent dashboard/notification
        console.log(`Message forwarded to active agent for ${from}`);
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle AI responses
async function handleAIResponse(
  from: string,
  text: string,
  state: any
) {
  // Convert conversation history to chat format
  const chatHistory = state.conversationHistory.map((msg: any) => ({
    role: msg.role === "ai" ? "assistant" : msg.role,
    content: msg.content,
  }));

  // Get AI response
  const result = await generateChatResponse(text, chatHistory);

  // Send response
  await sendWhatsAppMessage(from, result.message);

  // Add AI response to history
  addMessageToHistory(from, {
    role: "ai",
    content: result.message,
    timestamp: new Date(),
  });

  // Check if needs agent handoff
  if (result.needsAgent) {
    updateConversationState(from, { status: "pending_agent" });

    await sendWhatsAppMessage(
      from,
      "✅ **Parfait !** J'ai transmis votre demande à notre équipe d'experts.\n\n" +
        "📞 Un conseiller vous répondra sous peu (généralement sous 15-30 minutes).\n\n" +
        "💬 En attendant, je reste disponible pour répondre à d'autres questions !"
    );

    // Notify agent
    await notifyAgent({
      userId: from,
      message: text,
      conversationState: state,
    });
  }
}

// Handle when agent is pending
async function handlePendingAgentState(
  from: string,
  text: string,
  state: any
) {
  // AI still responds to keep user engaged
  const chatHistory = state.conversationHistory.map((msg: any) => ({
    role: msg.role === "ai" ? "assistant" : msg.role,
    content: msg.content,
  }));

  const result = await generateChatResponse(text, chatHistory);
  await sendWhatsAppMessage(from, result.message);

  addMessageToHistory(from, {
    role: "ai",
    content: result.message,
    timestamp: new Date(),
  });
}

// Handle agent commands and messages
async function handleAgentMessage(
  agentPhone: string,
  text: string,
  state: any
) {
  // Agent commands
  if (text.startsWith("/")) {
    const command = text.split(" ")[0].toLowerCase();

    switch (command) {
      case "/takeover":
        updateConversationState(state.userId, {
          status: "agent_active",
          agentId: agentPhone,
        });
        await sendWhatsAppMessage(
          agentPhone,
          "✅ Vous gérez maintenant cette conversation. L'IA est en pause."
        );
        break;

      case "/ai":
        updateConversationState(state.userId, { status: "ai_active" });
        await sendWhatsAppMessage(agentPhone, "🤖 L'IA reprend la conversation.");
        await sendWhatsAppMessage(
          state.userId,
          "Je suis de retour ! Comment puis-je vous aider ?"
        );
        break;

      case "/done":
        updateConversationState(state.userId, { status: "ai_active" });
        await sendWhatsAppMessage(
          state.userId,
          "Merci d'avoir échangé avec notre équipe ! 🙏\n\n" +
            "Je reste disponible si vous avez d'autres questions."
        );
        break;

      default:
        await sendWhatsAppMessage(
          agentPhone,
          "Commandes disponibles:\n/takeover - Prendre le contrôle\n/ai - Laisser l'IA répondre\n/done - Terminer"
        );
    }
  } else {
    // Agent's regular message - forward to user
    await sendWhatsAppMessage(state.userId, text);

    // Auto-activate agent mode on first reply
    if (state.status === "pending_agent") {
      updateConversationState(state.userId, {
        status: "agent_active",
        agentId: agentPhone,
      });
    }

    addMessageToHistory(state.userId, {
      role: "agent",
      content: text,
      timestamp: new Date(),
    });
  }
}

// Check if phone belongs to agent
async function checkIfAgent(phone: string): Promise<boolean> {
  const agentNumbers = [process.env.AGENT_PHONE_NUMBER];
  return agentNumbers.includes(phone);
}
