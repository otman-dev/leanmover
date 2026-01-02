import { pipeline, env } from '@xenova/transformers';

// Configure to run in Node.js environment
env.allowLocalModels = false;

// Cache the embedding model globally
let embeddingPipeline: any = null;

/**
 * Initialize the embedding model
 * Uses Xenova/all-MiniLM-L6-v2 which generates 384-dimensional embeddings
 * This is a free, local model that runs without API costs
 */
async function getEmbeddingModel() {
  if (!embeddingPipeline) {
    console.log('Initializing embedding model (first run will download ~100MB)...');
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    console.log('Embedding model initialized successfully');
  }
  return embeddingPipeline;
}

/**
 * Generate embedding vector for a given text
 * @param text - Text to generate embedding for
 * @returns 384-dimensional embedding array
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    if (!text || text.trim().length === 0) {
      throw new Error('Text cannot be empty');
    }

    // Get the model
    const model = await getEmbeddingModel();

    // Generate embedding
    const output = await model(text, { pooling: 'mean', normalize: true });
    
    // Convert to regular array of numbers
    const embedding = Array.from(output.data) as number[];

    // Verify dimension
    if (embedding.length !== 384) {
      throw new Error(`Expected 384 dimensions, got ${embedding.length}`);
    }

    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error(`Failed to generate embedding: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate embeddings for multiple texts in batch
 * More efficient than calling generateEmbedding multiple times
 * @param texts - Array of texts to generate embeddings for
 * @returns Array of 384-dimensional embedding arrays
 */
export async function generateEmbeddingBatch(texts: string[]): Promise<number[][]> {
  try {
    if (!texts || texts.length === 0) {
      return [];
    }

    // Filter out empty texts
    const validTexts = texts.filter(t => t && t.trim().length > 0);
    
    if (validTexts.length === 0) {
      return [];
    }

    // Get the model
    const model = await getEmbeddingModel();

    // Generate embeddings for all texts
    const embeddings: number[][] = [];
    
    for (const text of validTexts) {
      const output = await model(text, { pooling: 'mean', normalize: true });
      embeddings.push(Array.from(output.data));
    }

    return embeddings;
  } catch (error) {
    console.error('Error generating embeddings batch:', error);
    throw new Error(`Failed to generate embeddings batch: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Calculate cosine similarity between two embeddings
 * Used for testing and validation
 * @param embedding1 - First embedding vector
 * @param embedding2 - Second embedding vector
 * @returns Similarity score between -1 and 1 (higher is more similar)
 */
export function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same dimension');
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < embedding1.length; i++) {
    dotProduct += embedding1[i] * embedding2[i];
    norm1 += embedding1[i] * embedding1[i];
    norm2 += embedding2[i] * embedding2[i];
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}
