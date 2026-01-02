import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { VectorContentModel } from '../models/VectorContent';

async function checkRagContent() {
  try {
    console.log('🔍 Checking RAG database content...\n');
    
    await connectDB();
    
    // Count by content type
    const contentTypes = ['blog', 'solution', 'service', 'faq', 'company', 'testimonial', 'certification', 'hero', 'legal'];
    
    for (const type of contentTypes) {
      const count = await VectorContentModel.countDocuments({ contentType: type });
      if (count > 0) {
        console.log(`📄 ${type.toUpperCase()}: ${count} items`);
        
        // For services, show unique service titles
        if (type === 'service') {
          const uniqueServices = await VectorContentModel.distinct('title', { contentType: 'service' });
          console.log(`   📦 ${uniqueServices.length} services uniques:`);
          uniqueServices.forEach(title => {
            console.log(`      • ${title}`);
          });
        } else if (type === 'faq') {
          // For FAQs, show unique categories
          const uniqueFaqs = await VectorContentModel.distinct('title', { contentType: 'faq' });
          console.log(`   ❓ ${uniqueFaqs.length} catégories FAQ:`);
          uniqueFaqs.slice(0, 10).forEach(title => {
            console.log(`      • ${title}`);
          });
        } else {
          // Show sample documents for other types
          const samples = await VectorContentModel.find({ contentType: type })
            .select('title contentId slug')
            .limit(5);
          
          samples.forEach(doc => {
            console.log(`   - ${doc.title || doc.contentId}`);
          });
        }
        console.log('');
      }
    }
    
    // Total count
    const total = await VectorContentModel.countDocuments();
    console.log(`\n✅ Total items in RAG database: ${total}\n`);
    
    // Check if collection exists and get indexes
    try {
      const indexes = await VectorContentModel.collection.listIndexes().toArray();
      console.log('✅ Collection "vectorcontents" exists\n');
      console.log('📊 Available indexes:');
      indexes.forEach(idx => {
        console.log(`   - ${idx.name} (type: ${idx.type || 'regular'})`);
      });
    } catch (error) {
      console.log('ℹ️  Could not list indexes (collection may not exist yet)');
    }
    
    console.log('\n🎉 Check complete!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkRagContent();
