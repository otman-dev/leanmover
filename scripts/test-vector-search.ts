import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { getRelevantChunks } from '../lib/rag/retrieval';

async function testVectorSearch() {
  try {
    console.log('🧪 Testing Vector Search...\n');
    
    await connectDB();
    
    const testQueries = [
      'combien d\'articles de solutions',  // Should trigger solution filter
      'combien d\'articles de blog',       // Should trigger blog filter
      'liste tous les services',           // Should trigger service filter
      'Industrie 4.0',                     // Normal semantic search
    ];
    
    for (const query of testQueries) {
      console.log(`\n📝 Query: "${query}"`);
      console.log('─'.repeat(60));
      
      try {
        const chunks = await getRelevantChunks(query, 3);
        
        if (chunks.length === 0) {
          console.log('⚠️  No results found (vector index might not be ready yet)');
        } else {
          console.log(`✅ Found ${chunks.length} relevant chunks:\n`);
          
          chunks.forEach((chunk, i) => {
            console.log(`${i + 1}. [${chunk.type}] ${chunk.title}`);
            console.log(`   Score: ${(chunk.score || 0).toFixed(4)}`);
            console.log(`   Preview: ${chunk.text.substring(0, 100)}...`);
            console.log('');
          });
        }
      } catch (error: any) {
        console.log(`❌ Error: ${error.message}`);
        if (error.message.includes('$search')) {
          console.log('\n💡 Tip: Vector search index might not be created yet.');
          console.log('   Run: npx tsx scripts/create-vector-index.ts');
          console.log('   Then wait 2-3 minutes for the index to become ACTIVE in MongoDB Atlas.\n');
        }
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

testVectorSearch();
