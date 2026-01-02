import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import connectDB from '../lib/mongodb';
import { VectorContentModel } from '../models/VectorContent';

async function cleanupHeroSlides() {
  try {
    console.log('🧹 Cleaning up hero slides from RAG database...\n');
    
    await connectDB();
    
    // Delete all hero slides
    const result = await VectorContentModel.deleteMany({ contentType: 'hero' });
    
    console.log(`✅ Deleted ${result.deletedCount} hero slide entries\n`);
    
    // Show updated count
    const total = await VectorContentModel.countDocuments();
    console.log(`📊 Total items remaining: ${total}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

cleanupHeroSlides();
