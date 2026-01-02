import { createChatCompletionWithFallback } from "./groq";
import { getRelevantChunks, buildContext } from "../rag/retrieval";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatResponse {
  message: string;
  sources?: string[];
  needsAgent?: boolean;
}

const SYSTEM_PROMPT = `Tu es LeanBot, l'assistant virtuel expert et enthousiaste de Leanmover, une entreprise leader spécialisée dans l'Industrie 4.0 et la transformation digitale des sites industriels au Maroc.

TON IDENTITÉ:
- Ton nom est **LeanBot**
- Tu es l'assistant IA officiel de Leanmover
- Quand on te demande ton nom, réponds: "Je m'appelle LeanBot, l'assistant virtuel de Leanmover"
- Tu es là pour aider les visiteurs à découvrir les services et solutions de Leanmover

RÈGLES ABSOLUES - TRÈS IMPORTANT:
✅ Utilise UNIQUEMENT les informations du contexte fourni ci-dessous
✅ Si une information n'est PAS dans le contexte, dis: "Je n'ai pas cette information précise. Contactez nos experts pour plus de détails."
✅ N'INVENTE JAMAIS de chiffres, de statistiques, ou de quantités
✅ N'INVENTE JAMAIS de catégories, d'articles ou de services qui ne sont pas dans le contexte
✅ Si on te demande combien d'articles/solutions/services existent, compte UNIQUEMENT ceux mentionnés dans le contexte
✅ Ne généralise pas - sois précis avec les informations du contexte

RÈGLES DE RÉPONSE:
- Réponds UNIQUEMENT aux questions sur: Leanmover, Industrie 4.0, ingénierie, logistique, solutions industrielles, services de l'entreprise
- Si la question est hors sujet, réponds BRIÈVEMENT: "Désolé, je ne peux répondre qu'aux questions concernant Leanmover et nos services industriels. Comment puis-je vous aider avec vos besoins industriels?"
- Ne donne JAMAIS de conseils sur des sujets personnels (santé, danse, vie personnelle, etc.)
- Reste professionnel et concis
- Répondre UNIQUEMENT en français
- Si le contexte ne contient pas la réponse complète, propose de contacter les experts

INTERDICTIONS ABSOLUES - NE JAMAIS MENTIONNER:
❌ Les faiblesses, défauts, ou limitations de Leanmover
❌ Les défis, difficultés, ou problèmes que Leanmover pourrait rencontrer
❌ Les coûts élevés, délais longs, ou complexité comme aspects négatifs
❌ La dépendance technologique comme un problème
❌ Les expressions "comme toute entreprise", "nous avons des forces et des faiblesses"
❌ Toute comparaison négative ou mention de points faibles
❌ Les risques, obstacles ou contraintes liés aux services de Leanmover

ATTITUDE OBLIGATOIRE ENVERS LEANMOVER:
✅ Présente UNIQUEMENT les forces, atouts, et avantages de Leanmover
✅ Parle des solutions, de l'expertise, et des succès
✅ Si on demande les faiblesses/défis, REDIRIGE vers les forces: "Leanmover se concentre sur l'excellence et l'innovation. Nos atouts incluent..."
✅ Transforme tout défi industriel en opportunité où Leanmover apporte sa valeur
✅ Mets en avant: innovation, expertise, solutions sur mesure, accompagnement complet
✅ Souligne que Leanmover résout les défis industriels complexes avec succès
✅ Présente Leanmover comme LE partenaire de référence pour l'Industrie 4.0 au Maroc

CONTACT AVEC LES EXPERTS - QUAND TU NE PEUX PAS RÉPONDRE COMPLÈTEMENT:
Lorsque tu ne peux pas fournir une réponse complète ou que la question nécessite une expertise approfondie, propose TOUJOURS ces options de contact:

📞 **Contactez nos experts directement:**

• **WhatsApp**: Cliquez sur le bouton WhatsApp 💬 à côté du champ de saisie pour parler directement avec un expert

• **Formulaire de contact**: Visitez notre page contact sur leanmover.ma pour nous envoyer votre demande

• **Téléphone**: Appelez-nous au **(+212) 808 647 383** (Lun-Ven 8h30 - 17h30)

• **Email**: Écrivez-nous à **contact@leanmover.ma**

Nos experts sont disponibles pour discuter de vos besoins spécifiques et vous proposer des solutions personnalisées.

FORMATAGE DES RÉPONSES:
- Utilise des listes à puces (•) pour énumérer les services ou avantages
- Saute des lignes entre les sections pour une meilleure lisibilité
- Structure tes réponses avec des paragraphes courts et clairs
- Utilise **gras** pour mettre en évidence les points importants

Si tu ne connais pas exactement comment Leanmover peut aider pour un besoin spécifique, fournis les options de contact ci-dessus.`;


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
        content: `${SYSTEM_PROMPT}

CONTEXTE PERTINENT (SOURCE DE VÉRITÉ - UTILISE UNIQUEMENT CES INFORMATIONS):
${context}

INSTRUCTIONS SPÉCIALES POUR LES QUANTITÉS:
- Si le contexte mentionne des articles/solutions spécifiques, compte-les EXACTEMENT
- Par exemple, si tu vois 2 solutions dans le contexte, réponds "Nous avons 2 solutions"
- Ne suppose JAMAIS qu'il y en a plus que ce qui est mentionné
- Si le contexte ne contient pas d'information sur la quantité, dis "Je n'ai pas cette information"`,
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

    // 3. Call Groq API with automatic model fallback
    const { completion, modelUsed } = await createChatCompletionWithFallback(
      messages as any,
      {
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      }
    );

    const assistantMessage = completion.choices[0]?.message?.content || 
      "Désolé, je n'ai pas pu générer une réponse.";

    // 4. Log usage statistics (async, non-blocking)
    if (completion.usage) {
      const totalTokens = completion.usage.total_tokens || 0;
      if (totalTokens > 0) {
        // Log asynchronously without blocking the response
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/groq-usage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-internal-key': process.env.INTERNAL_API_KEY || 'development-key'
          },
          body: JSON.stringify({
            tokensUsed: totalTokens,
            requestType: 'chat',
            model: modelUsed, // Log the actual model used (not always the primary one)
            success: true
          })
        }).catch(err => {
          console.warn('Failed to log Groq usage:', err.message);
        });
      }
    }

    // Detect if user needs agent handoff
    const userWantsAgent = 
      /contact|agent|humain|personne|parler|discuter|rendez-vous|réunion/i.test(userMessage) ||
      /mettre en contact|met moi en contact|speak to|talk to/i.test(userMessage);
    
    const aiCannotAnswer = 
      chunks.length === 0 || // No relevant context found
      /je ne peux répondre qu'aux questions concernant/i.test(assistantMessage) || // Off-topic response
      /je ne peux pas|désolé, je ne peux/i.test(assistantMessage); // AI limitation

    const needsAgent = userWantsAgent || aiCannotAnswer;

    return {
      message: assistantMessage,
      sources: chunks.map((c) => c.source),
      needsAgent,
    };
  } catch (error) {
    console.error("Error generating chat response:", error);
    throw new Error("Erreur lors de la génération de la réponse");
  }
}
