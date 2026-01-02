import Groq from "groq-sdk";
import dotenv from "dotenv";

// Load environment variables in non-Next.js context (scripts)
if (!process.env.NEXT_RUNTIME) {
  dotenv.config({ path: '.env.local' });
}

if (!process.env.GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set in environment variables");
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Available Groq models in order of preference (all free tier, updated Jan 2026)
export const GROQ_MODELS = [
  "llama-3.3-70b-versatile",                    // Primary: Most powerful, 8k context
  "llama-3.1-8b-instant",                       // Fallback 1: Fast, efficient, 8k context
  "llama-3.2-90b-vision-preview",               // Fallback 2: Multimodal support
  "mixtral-8x7b-32768",                         // Fallback 3: Good performance
  "gemma-7b-it",                                // Fallback 4: Fast and compact
  "llama2-70b-4096",                            // Fallback 5: Legacy fallback
] as const;

export type GroqModel = typeof GROQ_MODELS[number];

// Default model
export const GROQ_MODEL = GROQ_MODELS[0];

/**
 * Try multiple models with automatic fallback when rate limits are hit
 */
export async function createChatCompletionWithFallback(
  messages: any[],
  options: {
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    stream?: boolean;
  } = {}
): Promise<{ completion: any; modelUsed: string }> {
  const errors: Array<{ model: string; error: string }> = [];

  for (const model of GROQ_MODELS) {
    try {
      console.log(`🔄 Trying model: ${model}`);
      
      const completion = await groq.chat.completions.create({
        model,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 1024,
        top_p: options.top_p ?? 1,
        stream: options.stream ?? false,
      });

      console.log(`✅ Success with model: ${model}`);
      return { completion, modelUsed: model };

    } catch (error: any) {
      const errorMessage = error?.message || error?.toString() || 'Unknown error';
      
      // Log the failure for monitoring
      try {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/groq-usage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-internal-key': process.env.INTERNAL_API_KEY || 'development-key'
          },
          body: JSON.stringify({
            tokensUsed: 0,
            requestType: 'chat',
            model: model,
            success: false
          })
        }).catch(() => {/* Silent fail */});
      } catch (logError) {
        // Don't let logging errors affect the main flow
      }
      
      // Check if it's a rate limit error (429) or decommissioned model error (400)
      if (
        errorMessage.includes('429') || 
        errorMessage.includes('rate_limit_exceeded') ||
        errorMessage.includes('400') ||
        errorMessage.includes('model_decommissioned') ||
        errorMessage.includes('decommissioned') ||
        errorMessage.includes('no longer supported')
      ) {
        console.warn(`⚠️  Error with ${model}, trying next model...`);
        errors.push({ model, error: errorMessage });
        continue; // Try next model
      }
      
      // If it's not a rate limit or decommissioned error, throw immediately
      console.error(`❌ Error with model ${model}:`, errorMessage);
      throw error;
    }
  }

  // If all models failed
  const errorSummary = errors.map(e => `${e.model}: ${e.error.substring(0, 100)}...`).join('\n');
  throw new Error(
    `All Groq models have failed. Please check your API configuration or try again later.\n\n` +
    `Models attempted:\n${errorSummary}\n\n` +
    `Visit https://console.groq.com/docs/models for available models`
  );
}
