#!/usr/bin/env node

/**
 * Script to cleanup draft articles from the vector database
 * Removes any blog posts or solutions that are in draft status
 * Run: npx tsx scripts/cleanup-draft-articles.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { VectorContentModel, BlogModel, SolutionModel } from '../models';

async function cleanupDraftArticles() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  🧹 Cleaning Draft Articles from Vector DB 🧹  ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  try {
    await connectDB();

    // Get all published blog IDs
    const publishedBlogs = await BlogModel.find({ status: 'published' }, { slug: 1 });
    const publishedBlogIds = new Set(publishedBlogs.map(b => `blog-${b.slug}`));

    // Get all published solutions IDs
    const publishedSolutions = await SolutionModel.find(
      { status: { $in: ['published', 'featured'] } },
      { _id: 1 }
    );
    const publishedSolutionIds = new Set(publishedSolutions.map(s => `solution-${s._id}`));

    // Find all blog and solution entries in vector DB
    const vectorBlogs = await VectorContentModel.find({ contentType: 'blog' }, { contentId: 1 });
    const vectorSolutions = await VectorContentModel.find({ contentType: 'solution' }, { contentId: 1 });

    console.log(`📊 Status Check:`);
    console.log(`   Published blogs: ${publishedBlogs.length}`);
    console.log(`   Published solutions: ${publishedSolutions.length}`);
    console.log(`   Vector DB blogs: ${vectorBlogs.length}`);
    console.log(`   Vector DB solutions: ${vectorSolutions.length}\n`);

    // Find draft articles (in vector DB but not in published)
    let removedCount = 0;

    for (const vectorBlog of vectorBlogs) {
      if (!publishedBlogIds.has(vectorBlog.contentId)) {
        await VectorContentModel.deleteOne({ contentId: vectorBlog.contentId });
        console.log(`  🗑️  Removed draft blog: ${vectorBlog.contentId}`);
        removedCount++;
      }
    }

    for (const vectorSolution of vectorSolutions) {
      if (!publishedSolutionIds.has(vectorSolution.contentId)) {
        await VectorContentModel.deleteOne({ contentId: vectorSolution.contentId });
        console.log(`  🗑️  Removed draft solution: ${vectorSolution.contentId}`);
        removedCount++;
      }
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`   Removed: ${removedCount} draft articles`);
    console.log(`   Kept: ${vectorBlogs.length + vectorSolutions.length - removedCount} published articles\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error during cleanup:');
    console.error(error);
    process.exit(1);
  }
}

cleanupDraftArticles();
