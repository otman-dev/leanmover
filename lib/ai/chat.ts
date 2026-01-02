import { groq, GROQ_MODEL } from "./groq";
import { getRelevantChunks, buildContext } from "../rag/retrieval";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  message: string;
  sources?: string[];
}

const SYSTEM_PROMPT = `Tu es un assistant virtuel expert pour Leanmover, une entreprise spécialisée dans l'Industrie 4.0 et la transformation digitale des sites industriels au Maroc.

RÈGLES STRICTES:
- Réponds UNIQUEMENT aux questions sur: Leanmover, Industrie 4.0, ingénierie, logistique, solutions industrielles, services de l'entreprise
- Si la question est hors sujet, réponds BRIÈVEMENT: "Désolé, je ne peux répondre qu'aux questions concernant Leanmover et nos services industriels. Comment puis-je vous aider avec vos besoins industriels?"
- Ne donne JAMAIS de conseils sur des sujets personnels (santé, danse, vie personnelle, etc.)
- Reste professionnel et concis
- Répondre UNIQUEMENT en français
- Utilise le contexte fourni pour donner des réponses précises

FORMATAGE DES RÉPONSES:
- Utilise des listes à puces (•) pour énumérer les services ou avantages
- Saute des lignes entre les sections pour une meilleure lisibilité
- Structure tes réponses avec des paragraphes courts et clairs
- Utilise **gras** pour mettre en évidence les points importants

Si tu ne connais pas la réponse sur nos services, suggère de contacter Leanmover directement.`;

/**
 * Generate AI response using RAG + Groq
 */
export async function generateChatResponse(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> {
  try {
    // 1. Get relevant content chunks (RAG)
    const chunks = await getRelevantChunks(userMessage);
    const context = buildContext(chunks);

    // 2. Build messages for Groq (strip timestamp field)
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n\nContexte pertinent:\n${context}`,
      },
      ...conversationHistory.slice(-4).map(msg => ({
        role: msg.role,
        content: msg.content,
      })), // Keep last 4 messages, remove timestamp
      {
        role: "user",
        content: userMessage,
      },
    ];

    // 3. Call Groq API
    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const assistantMessage = completion.choices[0]?.message?.content || 
      "Désolé, je n'ai pas pu générer une réponse.";

    return {
      message: assistantMessage,
      sources: chunks.map((c) => c.source),
    };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Erreur lors de la génération de la réponse");
  }
}
