import { services } from "@/data/services";
import { companyInfo } from "@/data/company";

export interface ContentChunk {
  text: string;
  source: string;
  type: "service" | "company" | "general";
}

/**
 * Get relevant content chunks based on user query
 * For now, this is a simple implementation. Later can be replaced with vector embeddings
 */
export async function getRelevantChunks(
  query: string,
  limit: number = 3
): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];
  
  const queryLower = query.toLowerCase();

  // Search in services
  services.forEach((service) => {
    const serviceText = `${service.title} ${service.shortDescription} ${service.fullDescription}`.toLowerCase();
    
    if (serviceText.includes(queryLower.split(" ")[0]) || 
        queryLower.split(" ").some(word => word.length > 3 && serviceText.includes(word))) {
      chunks.push({
        text: `${service.title}: ${service.fullDescription}`,
        source: service.slug,
        type: "service",
      });
    }
  });

  // Add company info if relevant
  if (queryLower.includes("leanmover") || 
      queryLower.includes("entreprise") || 
      queryLower.includes("société") ||
      queryLower.includes("qui") ||
      queryLower.includes("contact")) {
    chunks.push({
      text: `${companyInfo.name} - ${companyInfo.tagline}. ${companyInfo.description}`,
      source: "company",
      type: "company",
    });
  }

  return chunks.slice(0, limit);
}

/**
 * Build context string from chunks for the AI prompt
 */
export function buildContext(chunks: ContentChunk[]): string {
  if (chunks.length === 0) {
    return "Aucun contexte spécifique disponible.";
  }

  return chunks
    .map((chunk, idx) => `[Source ${idx + 1}]: ${chunk.text}`)
    .join("\n\n");
}
