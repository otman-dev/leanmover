#!/usr/bin/env node

/**
 * Comprehensive RAG and Chatbot Status Check
 * Verifies all systems are working correctly
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { VectorContentModel, BlogModel, SolutionModel } from '../models';

async function statusCheck() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║         🤖 Leanmover RAG & Chatbot Status Check 🤖        ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    await connectDB();
    console.log('✅ Database connection: OK\n');

    // Check published articles
    console.log('📊 Published Articles:');
    const publishedBlogs = await BlogModel.countDocuments({ status: 'published' });
    const draftBlogs = await BlogModel.countDocuments({ status: 'draft' });
    console.log(`   📰 Blog posts: ${publishedBlogs} published, ${draftBlogs} draft`);

    const publishedSolutions = await SolutionModel.countDocuments({ status: { $in: ['published', 'featured'] } });
    const draftSolutions = await SolutionModel.countDocuments({ status: 'draft' });
    console.log(`   💡 Solutions: ${publishedSolutions} published, ${draftSolutions} draft\n`);

    // Check vector database
    console.log('🔍 Vector Database Content:');
    const vectorBlogs = await VectorContentModel.countDocuments({ contentType: 'blog' });
    const vectorSolutions = await VectorContentModel.countDocuments({ contentType: 'solution' });
    const vectorServices = await VectorContentModel.countDocuments({ contentType: 'service' });
    const vectorFaqs = await VectorContentModel.countDocuments({ contentType: 'faq' });
    const vectorOther = await VectorContentModel.countDocuments({
      contentType: { $nin: ['blog', 'solution', 'service', 'faq'] }
    });

    console.log(`   📰 Blog chunks: ${vectorBlogs}`);
    console.log(`   💡 Solution chunks: ${vectorSolutions}`);
    console.log(`   🔧 Service chunks: ${vectorServices}`);
    console.log(`   ❓ FAQ chunks: ${vectorFaqs}`);
    console.log(`   📄 Other content: ${vectorOther}`);
    console.log(`   📊 Total: ${vectorBlogs + vectorSolutions + vectorServices + vectorFaqs + vectorOther}\n`);

    // Verify no draft articles in vector DB
    console.log('🧹 Draft Article Cleanup:');
    const publishedBlogIds = new Set(
      (await BlogModel.find({ status: 'published' }, { slug: 1 })).map((b: any) => `blog-${b.slug}`)
    );
    const publishedSolutionIds = new Set(
      (await SolutionModel.find({ status: { $in: ['published', 'featured'] } }, { _id: 1 })).map((s: any) => `solution-${s._id}`)
    );

    const vectorBlogList = await VectorContentModel.find({ contentType: 'blog' }, { contentId: 1 });
    const vectorSolutionList = await VectorContentModel.find({ contentType: 'solution' }, { contentId: 1 });

    let draftBlogsInVector = 0;
    let draftSolutionsInVector = 0;

    vectorBlogList.forEach((blog: any) => {
      if (!publishedBlogIds.has(blog.contentId)) {
        draftBlogsInVector++;
        console.log(`   ⚠️  Draft blog in vector DB: ${blog.contentId}`);
      }
    });

    vectorSolutionList.forEach((solution: any) => {
      if (!publishedSolutionIds.has(solution.contentId)) {
        draftSolutionsInVector++;
        console.log(`   ⚠️  Draft solution in vector DB: ${solution.contentId}`);
      }
    });

    if (draftBlogsInVector === 0 && draftSolutionsInVector === 0) {
      console.log('   ✅ No draft articles in vector DB');
    }

    console.log(`\n📈 Summary:`);
    console.log(`   Published articles sync: ${publishedBlogs + publishedSolutions} DB → ${vectorBlogs + vectorSolutions} Vector`);
    console.log(`   Sync status: ${vectorBlogs === publishedBlogs && vectorSolutions === publishedSolutions ? '✅ PERFECT SYNC' : '⚠️  OUT OF SYNC'}`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

statusCheck();
