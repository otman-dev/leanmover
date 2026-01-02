import { indexAllContent } from './indexer';
import { cleanupDraftArticlesHelper } from './cleanup-helper';

// Global sync status tracker
let syncStatus: {
  inProgress: boolean;
  lastReason: string;
  lastStarted: Date | null;
  lastCompleted: Date | null;
  lastError: string | null;
  lastStats: any;
} = {
  inProgress: false,
  lastReason: '',
  lastStarted: null,
  lastCompleted: null,
  lastError: null,
  lastStats: null
};

/**
 * Get current sync status
 */
export function getSyncStatus() {
  return { ...syncStatus };
}

/**
 * Clean up draft articles from the vector database
 */
async function cleanupDraftArticles() {
  try {
    console.log('🧹 Cleaning up draft articles...');
    const result = await cleanupDraftArticlesHelper();
    
    if (result.success) {
      console.log(`✅ Cleaned up ${result.removedCount} draft articles from RAG`);
    } else {
      console.error('❌ Error cleaning up draft articles:', result.error);
    }
  } catch (error) {
    console.error('❌ Error cleaning up draft articles:', error);
    // Don't throw - continue with sync anyway
  }
}

/**
 * Trigger RAG database sync in the background
 * This runs asynchronously without blocking the API response
 */
export function triggerRagSync(reason: string = 'Content updated') {
  syncStatus.inProgress = true;
  syncStatus.lastReason = reason;
  syncStatus.lastStarted = new Date();
  syncStatus.lastError = null;
  
  // Run in background - don't await
  setTimeout(async () => {
    try {
      console.log(`🔄 RAG Auto-Sync triggered: ${reason}`);
      const stats = await indexAllContent();
      console.log(`✅ RAG content indexed: ${stats.success} items in ${(stats.duration / 1000).toFixed(1)}s`);
      
      // Clean up draft articles after indexing
      await cleanupDraftArticles();
      
      syncStatus.inProgress = false;
      syncStatus.lastCompleted = new Date();
      syncStatus.lastStats = stats;
    } catch (error) {
      console.error('❌ RAG Auto-Sync failed:', error);
      
      syncStatus.inProgress = false;
      syncStatus.lastError = error instanceof Error ? error.message : 'Unknown error';
      // Don't throw - this is a background operation
    }
  }, 0);
}

/**
 * Sync only blog posts (more efficient than full sync)
 */
export async function syncBlogPosts() {
  // For now, trigger full sync (could be optimized to only sync blog posts later)
  return triggerRagSync('Blog post updated');
}

/**
 * Sync only solutions (more efficient than full sync)
 */
export async function syncSolutions() {
  // For now, trigger full sync (could be optimized to only sync solutions later)
  return triggerRagSync('Solution updated');
}
