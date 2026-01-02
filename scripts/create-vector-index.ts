#!/usr/bin/env node

/**
 * Script to create MongoDB Atlas Vector Search index
 * This needs to be run once to set up the vector search capability
 * 
 * Prerequisites:
 * - MongoDB Atlas cluster (M10+ for vector search, or M0 with limited capacity)
 * - MongoDB version 6.0.11+ or 7.0.2+
 * 
 * Run: node scripts/create-vector-index.js
 * or: tsx scripts/create-vector-index.ts
 */

// Load environment variables from .env.local
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';

const VECTOR_INDEX_NAME = 'vector_search_index';
const COLLECTION_NAME = 'vectorcontents';

async function createVectorSearchIndex() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   🔍 MongoDB Atlas Vector Search Index Setup    ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const collection = db.collection(COLLECTION_NAME);

    console.log('📋 Vector Search Index Configuration:');
    console.log(`   Index name: ${VECTOR_INDEX_NAME}`);
    console.log(`   Collection: ${COLLECTION_NAME}`);
    console.log(`   Vector field: embedding`);
    console.log(`   Dimensions: 384`);
    console.log(`   Similarity: cosine`);
    console.log('');

    // Check if index already exists
    try {
      const indexes = await collection.listSearchIndexes().toArray();
      const existingIndex = indexes.find((idx: any) => idx.name === VECTOR_INDEX_NAME);

      if (existingIndex) {
        console.log('⚠️  Vector search index already exists!');
        console.log('   Current configuration:');
        console.log(JSON.stringify(existingIndex, null, 2));
        console.log('\n   To recreate the index, delete it first from MongoDB Atlas UI.\n');
        return;
      }
    } catch (error) {
      console.log('ℹ️  No existing vector search indexes found (this is expected for first run)\n');
    }

    // Create the vector search index
    console.log('🚀 Creating vector search index...\n');

    const indexDefinition = {
      name: VECTOR_INDEX_NAME,
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            path: 'embedding',
            numDimensions: 384,
            similarity: 'cosine'
          },
          {
            type: 'filter',
            path: 'contentType'
          },
          {
            type: 'filter',
            path: 'metadata.category'
          },
          {
            type: 'filter',
            path: 'metadata.language'
          },
          {
            type: 'filter',
            path: 'metadata.industry'
          }
        ]
      }
    };

    // Create index using MongoDB Atlas Search API
    // Note: This requires MongoDB 6.0+ and may need to be done via Atlas UI for some configurations
    try {
      await collection.createSearchIndex(indexDefinition);
      
      console.log('✅ Vector search index created successfully!\n');
      console.log('⏳ Note: Index building may take a few minutes.');
      console.log('   You can check the status in MongoDB Atlas UI:\n');
      console.log('   1. Go to your cluster');
      console.log('   2. Click "Search" tab');
      console.log('   3. View the index status\n');
      console.log('🎉 Once the index is ACTIVE, your RAG system is ready!\n');
    } catch (error: any) {
      if (error.message.includes('not supported') || error.message.includes('createSearchIndex')) {
        console.log('⚠️  Automatic index creation not supported.\n');
        console.log('📝 Please create the index manually in MongoDB Atlas UI:\n');
        console.log('1. Go to your cluster → Search tab');
        console.log('2. Click "Create Search Index"');
        console.log('3. Choose "JSON Editor"');
        console.log('4. Use this configuration:\n');
        console.log(JSON.stringify(indexDefinition, null, 2));
        console.log('\n5. Click "Create Search Index"\n');
      } else {
        throw error;
      }
    }

    await mongoose.connection.close();
    console.log('✅ Database connection closed\n');

  } catch (error) {
    console.error('\n❌ Error creating vector search index:');
    console.error(error);
    console.log('\n📖 Manual Setup Instructions:\n');
    console.log('If automatic creation failed, create the index manually:');
    console.log('');
    console.log('1. Open MongoDB Atlas (cloud.mongodb.com)');
    console.log('2. Navigate to your cluster');
    console.log('3. Go to "Search" tab');
    console.log('4. Click "Create Search Index"');
    console.log('5. Select "JSON Editor"');
    console.log('6. Paste this configuration:');
    console.log('');
    console.log(JSON.stringify({
      name: VECTOR_INDEX_NAME,
      type: 'vectorSearch',
      definition: {
        fields: [
          {
            type: 'vector',
            path: 'embedding',
            numDimensions: 384,
            similarity: 'cosine'
          },
          {
            type: 'filter',
            path: 'contentType'
          },
          {
            type: 'filter',
            path: 'metadata.category'
          },
          {
            type: 'filter',
            path: 'metadata.language'
          }
        ]
      }
    }, null, 2));
    console.log('');
    console.log('7. Click "Create Search Index"');
    console.log('8. Wait for index to become ACTIVE (may take 5-10 minutes)\n');
    
    process.exit(1);
  }
}

// Run the script
createVectorSearchIndex();
