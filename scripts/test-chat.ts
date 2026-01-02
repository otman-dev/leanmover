#!/usr/bin/env node

/**
 * Script to test the chatbot with RAG integration
 * Run: npx tsx scripts/test-chat.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

import { generateChatResponse } from '../lib/ai/chat';

async function testChat() {
  const queries = [
    "combien d'articles de solutions avez-vous?",
    "combien d'articles de blog?",
    "liste tous les articles de blog",
    "quels services proposez-vous?",
  ];

  console.log('🤖 Testing Chat with RAG...\n');

  for (const query of queries) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📝 Question: "${query}"`);
    console.log('='.repeat(60));

    try {
      const response = await generateChatResponse(query, []);
      console.log('✅ Response:');
      console.log(response);
    } catch (error) {
      console.error('❌ Error:', error);
    }
  }
}

testChat().catch(console.error);
