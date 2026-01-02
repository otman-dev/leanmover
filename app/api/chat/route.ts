import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/ai/chat";
import type { ChatRequest, ChatResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, conversationHistory = [] } = body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Le message est requis" },
        { status: 400 }
      );
    }

    // Check if Groq API key is configured
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "gsk_your_groq_api_key_here") {
      return NextResponse.json(
        { 
          error: "Le chatbot n'est pas encore configuré. Veuillez ajouter votre clé API Groq.",
          message: "Désolé, le service de chat n'est pas disponible pour le moment. Veuillez nous contacter directement."
        },
        { status: 503 }
      );
    }

    // Generate response using RAG + Groq
    const response: ChatResponse = await generateChatResponse(
      message,
      conversationHistory
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API error:", error);
    
    return NextResponse.json(
      {
        error: "Erreur lors du traitement de votre message",
        message: "Désolé, une erreur s'est produite. Veuillez réessayer dans quelques instants.",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
