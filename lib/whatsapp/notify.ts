// Agent Notification System

import { sendWhatsAppMessage } from "./send";
import { ConversationState } from "./state";

export async function notifyAgent(data: {
  userId: string;
  message: string;
  conversationState: ConversationState;
}): Promise<void> {
  const agentPhone = process.env.AGENT_PHONE_NUMBER;
  
  if (!agentPhone) {
    console.error("Agent phone number not configured");
    return;
  }

  // Format conversation history
  const historyText = data.conversationState.conversationHistory
    .slice(-5)
    .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
    .join("\n");

  const notificationMessage = `
🔔 **NOUVELLE DEMANDE CLIENT**

📱 De: ${data.userId}
💬 Message: ${data.message}

📋 Historique récent:
${historyText}

👉 Répondez directement sur WhatsApp ou tapez:
• /takeover - Prendre le contrôle
• /ai - Laisser l'IA répondre
• /done - Terminer la session
  `.trim();

  // Send to agent's WhatsApp
  await sendWhatsAppMessage(agentPhone, notificationMessage);

  // Could also send email/SMS/dashboard notification here
  console.log(`Agent notified for user ${data.userId}`);
}
