import connectDB from '../mongodb';
import { VectorContentModel } from '../../models/VectorContent';
import { generateEmbedding } from '../embeddings';

export interface ContentChunk {
  text: string;
  source: string;
  type: string;
  score?: number;
  title?: string;
}

/**
 * Get relevant content chunks using MongoDB Atlas Vector Search
 * Uses semantic similarity with embeddings for intelligent retrieval
 */
export async function getRelevantChunks(
  query: string,
  limit: number = 5
): Promise<ContentChunk[]> {
  try {
    // Connect to MongoDB
    await connectDB();

    // Detect if user is asking about counting/listing articles
    const queryLower = query.toLowerCase();
    const isCountingQuery = /combien|nombre|quantité|liste|tous les|quels sont/i.test(query);
    const mentionsBlog = /blog|article/i.test(query);
    const mentionsSolutions = /solution/i.test(query);
    
    let contentTypeFilter: string[] | undefined;
    
    // If asking about counting/listing specific content, filter by type
    if (isCountingQuery) {
      if (mentionsSolutions && !mentionsBlog) {
        contentTypeFilter = ['solution'];
        limit = 10; // Get more results for counting
      } else if (mentionsBlog && !mentionsSolutions) {
        contentTypeFilter = ['blog'];
        limit = 10;
      } else if (mentionsBlog && mentionsSolutions) {
        contentTypeFilter = ['blog', 'solution'];
        limit = 15;
      }
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);

    // Build vector search pipeline
    const pipeline: any[] = [
      {
        $vectorSearch: {
          index: 'vector_search_index',
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit,
        }
      }
    ];
    
    // Add filter if detected specific content type
    if (contentTypeFilter) {
      pipeline[0].$vectorSearch.filter = {
        contentType: { $in: contentTypeFilter }
      };
    }
    
    pipeline.push({
      $project: {
        _id: 0,
        contentId: 1,
        contentType: 1,
        title: 1,
        text: 1,
        source: 1,
        metadata: 1,
        score: { $meta: 'vectorSearchScore' }
      }
    });

    // Perform vector search
    const results = await VectorContentModel.aggregate(pipeline);

    // Transform results to ContentChunk format
    const chunks: ContentChunk[] = results.map((result: any) => ({
      text: result.text,
      source: result.source,
      type: result.contentType,
      score: result.score,
      title: result.title
    }));

    console.log(`🔍 Vector search found ${chunks.length} relevant chunks for query: "${query}"`);
    if (contentTypeFilter) {
      console.log(`   Filtered by types: ${contentTypeFilter.join(', ')}`);
    }
    chunks.forEach((chunk, i) => {
      console.log(`   ${i + 1}. [${chunk.type}] ${chunk.title} (score: ${chunk.score?.toFixed(3)})`);
    });

    return chunks;

  } catch (error) {
    console.error('❌ Error in vector search:', error);

    // Fallback to empty results if vector search fails
    console.warn('⚠️  Falling back to empty results. Ensure vector index is created.');
    return [];
  }
}

/**
 * Get relevant chunks with content type filtering
 * Useful for targeted searches (e.g., only FAQs, only services)
 */
export async function getRelevantChunksByType(
  query: string,
  contentTypes: string[],
  limit: number = 5
): Promise<ContentChunk[]> {
  try {
    await connectDB();
    const queryEmbedding = await generateEmbedding(query);

    const results = await VectorContentModel.aggregate([
      {
        $vectorSearch: {
          index: 'vector_search_index',
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit,
          filter: {
            contentType: { $in: contentTypes }
          }
        }
      },
      {
        $project: {
          _id: 0,
          contentId: 1,
          contentType: 1,
          title: 1,
          text: 1,
          source: 1,
          metadata: 1,
          score: { $meta: 'vectorSearchScore' }
        }
      }
    ]);

    return results.map((result: any) => ({
      text: result.text,
      source: result.source,
      type: result.contentType,
      score: result.score,
      title: result.title
    }));

  } catch (error) {
    console.error('❌ Error in filtered vector search:', error);
    return [];
  }
}

/**
 * Hybrid search: Combine vector search with keyword boosting
 * Gives extra weight to content that matches specific keywords
 */
export async function getRelevantChunksHybrid(
  query: string,
  keywords: string[] = [],
  limit: number = 5
): Promise<ContentChunk[]> {
  try {
    await connectDB();
    const queryEmbedding = await generateEmbedding(query);

    // First, get vector search results
    const vectorResults = await VectorContentModel.aggregate([
      {
        $vectorSearch: {
          index: 'vector_search_index',
          path: 'embedding',
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: limit * 2 // Get more candidates for filtering
        }
      },
      {
        $project: {
          _id: 0,
          contentId: 1,
          contentType: 1,
          title: 1,
          text: 1,
          source: 1,
          metadata: 1,
          vectorScore: { $meta: 'vectorSearchScore' }
        }
      }
    ]);

    // Boost scores for keyword matches
    const boostedResults = vectorResults.map((result: any) => {
      let boost = 0;
      const textLower = result.text.toLowerCase();

      keywords.forEach(keyword => {
        if (textLower.includes(keyword.toLowerCase())) {
          boost += 0.1; // Add 10% boost per keyword match
        }
      });

      return {
        ...result,
        score: result.vectorScore * (1 + boost)
      };
    });

    // Sort by boosted score and return top results
    boostedResults.sort((a, b) => b.score - a.score);

    return boostedResults.slice(0, limit).map(result => ({
      text: result.text,
      source: result.source,
      type: result.contentType,
      score: result.score,
      title: result.title
    }));

  } catch (error) {
    console.error('❌ Error in hybrid search:', error);
    return [];
  }
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
