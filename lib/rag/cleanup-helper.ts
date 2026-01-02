/**
 * Server-side helper functions for RAG management
 * This file is imported only in API routes and backend functions
 */

import connectDB from '../mongodb';
import { VectorContentModel } from '../../models/VectorContent';
import { BlogModel } from '../../models';
import { SolutionModel } from '../../models';

/**
 * Clean up draft articles from the vector database
 */
export async function cleanupDraftArticlesHelper() {
  try {
    await connectDB();

    // Get all published blog IDs
    const publishedBlogs = await BlogModel.find({ status: 'published' }, { slug: 1 });
    const publishedBlogIds = new Set(publishedBlogs.map((b: any) => `blog-${b.slug}`));

    // Get all published solutions IDs
    const publishedSolutions = await SolutionModel.find(
      { status: { $in: ['published', 'featured'] } },
      { _id: 1 }
    );
    const publishedSolutionIds = new Set(publishedSolutions.map((s: any) => `solution-${s._id}`));

    // Find all blog and solution entries in vector DB
    const vectorBlogs = await VectorContentModel.find({ contentType: 'blog' });
    const vectorSolutions = await VectorContentModel.find({ contentType: 'solution' });

    let removedCount = 0;

    // Remove draft blogs
    for (const vectorBlog of vectorBlogs) {
      if (!publishedBlogIds.has(vectorBlog.contentId)) {
        await VectorContentModel.deleteOne({ contentId: vectorBlog.contentId });
        removedCount++;
        console.log(`  🗑️  Removed draft blog: ${vectorBlog.contentId}`);
      }
    }

    // Remove draft solutions
    for (const vectorSolution of vectorSolutions) {
      if (!publishedSolutionIds.has(vectorSolution.contentId)) {
        await VectorContentModel.deleteOne({ contentId: vectorSolution.contentId });
        removedCount++;
        console.log(`  🗑️  Removed draft solution: ${vectorSolution.contentId}`);
      }
    }

    return {
      success: true,
      removedCount,
      stats: {
        publishedBlogs: publishedBlogs.length,
        publishedSolutions: publishedSolutions.length,
        vectorBlogs: vectorBlogs.length - vectorBlogs.filter(b => !publishedBlogIds.has(b.contentId)).length,
        vectorSolutions: vectorSolutions.length - vectorSolutions.filter(s => !publishedSolutionIds.has(s.contentId)).length
      }
    };
  } catch (error) {
    console.error('Error cleaning up draft articles:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get draft cleanup status
 */
export async function getDraftCleanupStatusHelper() {
  try {
    await connectDB();

    // Get all published counts
    const publishedBlogs = await BlogModel.countDocuments({ status: 'published' });
    const publishedSolutions = await SolutionModel.countDocuments({ status: { $in: ['published', 'featured'] } });
    const draftBlogs = await BlogModel.countDocuments({ status: 'draft' });
    const draftSolutions = await SolutionModel.countDocuments({ status: 'draft' });

    // Get vector DB counts
    const vectorBlogs = await VectorContentModel.countDocuments({ contentType: 'blog' });
    const vectorSolutions = await VectorContentModel.countDocuments({ contentType: 'solution' });

    return {
      database: {
        publishedBlogs,
        publishedSolutions,
        draftBlogs,
        draftSolutions
      },
      vectorDb: {
        blogs: vectorBlogs,
        solutions: vectorSolutions
      },
      needsCleanup: (vectorBlogs > publishedBlogs) || (vectorSolutions > publishedSolutions)
    };
  } catch (error) {
    console.error('Error getting cleanup status:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
