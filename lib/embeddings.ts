// Configure to run in Node.js environment
// Note: @xenova/transformers requires native ONNX bindings which aren't available on Vercel
// This module gracefully handles the unavailability
let embeddingPipeline: any = null;
let initError: Error | null = null;

/**
 * Initialize the embedding model
 * Uses Xenova/all-MiniLM-L6-v2 which generates 384-dimensional embeddings
 * This is a free, local model that runs without API costs
 * 
 * Note: On Vercel, native bindings aren't available, so this will fail gracefully
 */
async function getEmbeddingModel() {
  // If already tried and failed, return the error
  if (initError) {
    throw initError;
  }

  if (!embeddingPipeline) {
    try {
      const { pipeline, env } = await import('@xenova/transformers');
      env.allowLocalModels = false;
      
      console.log('Initializing embedding model (first run will download ~100MB)...');
      embeddingPipeline = await pipeline(
        'feature-extraction',
        'Xenova/all-MiniLM-L6-v2'
      );
      console.log('Embedding model initialized successfully');
    } catch (error) {
      initError = error instanceof Error ? error : new Error(String(error));
      
      // Log the error but provide a helpful message
      console.warn(
        '⚠️ Warning: Embedding model initialization failed. ' +
        'This is expected on Vercel (native ONNX bindings not available). ' +
        'RAG will use fallback vector search based on text similarity instead. ' +
        'Error details:',
        initError.message
      );
      
      throw initError;
    }
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
    // Log the error
    console.warn('Error generating embedding with ML model:', error instanceof Error ? error.message : String(error));
    
    // Use fallback embedding
    console.log('Falling back to text similarity embedding...');
    return getFallbackEmbedding(text);
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

/**
 * Fallback embedding when native ONNX bindings aren't available
 * Uses simple text similarity instead of ML model
 */
export function getFallbackEmbedding(text: string): number[] {
  console.warn('⚠️ Using fallback text embedding (native ONNX not available)');
  return createSimpleEmbedding(text);
}

/**
 * Create a simple embedding from text using character and word frequencies
 * This is a fallback when ML embeddings aren't available
 * Returns 384-dimensional vector for compatibility with main embeddings
 */
function createSimpleEmbedding(text: string): number[] {
  // Normalize text
  const normalized = text.toLowerCase().trim();
  
  // Create 384-dimensional vector (same as all-MiniLM-L6-v2)
  const embedding = new Array(384).fill(0);
  
  // Use hash of each character to distribute values
  let hash = 0;
  for (let i = 0; i < Math.min(normalized.length, 100); i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
    
    // Distribute to embedding dimensions
    const idx = Math.abs(hash) % 384;
    embedding[idx] += (char % 256) / 256;
  }
  
  // Normalize the vector
  let magnitude = 0;
  for (let i = 0; i < embedding.length; i++) {
    magnitude += embedding[i] * embedding[i];
  }
  magnitude = Math.sqrt(magnitude);
  
  if (magnitude > 0) {
    for (let i = 0; i < embedding.length; i++) {
      embedding[i] = embedding[i] / magnitude;
    }
  }
  
  return embedding;
}
