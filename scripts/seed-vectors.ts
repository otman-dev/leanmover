#!/usr/bin/env node

/**
 * Script to seed the vector database with all content
 * Run: npm run sync-vectors
 * or: node scripts/seed-vectors.js
 * or: tsx scripts/seed-vectors.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { indexAllContent, getIndexingStats } from '../lib/rag/indexer';

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   🚀 Leanmover RAG Vector Database Seeding 🚀   ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  try {
    // Check current state
    console.log('📊 Current database state:');
    try {
      const currentStats = await getIndexingStats();
      console.log(`   Total vectors: ${currentStats.total}`);
      if (currentStats.total > 0) {
        console.log('   By type:');
        Object.entries(currentStats.byType).forEach(([type, count]) => {
          console.log(`     - ${type}: ${count}`);
        });
      }
      console.log('');
    } catch (error) {
      console.log('   (Unable to fetch current stats - database may be empty)\n');
    }

    // Confirm before proceeding
    console.log('⚠️  This will upsert all content into the vector database.');
    console.log('   Existing content with the same contentId will be updated.\n');

    // Run indexing
    const stats = await indexAllContent();

    // Display results
    console.log('\n╔══════════════════════════════════════════════════╗');
    console.log('║              ✨ Indexing Complete! ✨             ║');
    console.log('╚══════════════════════════════════════════════════╝\n');

    console.log('📈 Final statistics:');
    console.log(`   Total items: ${stats.total}`);
    console.log(`   ✅ Successful: ${stats.success}`);
    console.log(`   ❌ Failed: ${stats.failed}`);
    console.log(`   ⏱️  Duration: ${(stats.duration / 1000).toFixed(2)}s`);
    console.log('\n   By content type:');
    Object.entries(stats.byType)
      .sort(([, a], [, b]) => b - a)
      .forEach(([type, count]) => {
        const emoji = getEmojiForType(type);
        console.log(`   ${emoji} ${type}: ${count}`);
      });

    console.log('\n🎉 Vector database is ready for RAG queries!\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Fatal error during indexing:');
    console.error(error);
    process.exit(1);
  }
}

function getEmojiForType(type: string): string {
  const emojiMap: Record<string, string> = {
    service: '🔧',
    company: '🏢',
    faq: '❓',
    testimonial: '💬',
    certification: '🏆',
    legal: '⚖️',
    hero: '🎯',
    blog: '📰',
    solution: '💡'
  };
  return emojiMap[type] || '📄';
}

// Run the script
main();
