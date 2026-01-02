#!/usr/bin/env node

/**
 * Local Testing Script for Chatbot Fix
 * Tests the chat API locally to verify the fix works
 * 
 * Usage: npm run test-chat
 * Or: npx ts-node scripts/test-chat-local.ts
 */

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

interface TestResult {
  name: string;
  status: 'pass' | 'fail';
  details: string;
  time: number;
}

const results: TestResult[] = [];

async function test(name: string, fn: () => Promise<void>) {
  const start = Date.now();
  try {
    await fn();
    const time = Date.now() - start;
    results.push({ name, status: 'pass', details: 'OK', time });
    console.log(`✅ ${name} (${time}ms)`);
  } catch (error) {
    const time = Date.now() - start;
    const details = error instanceof Error ? error.message : String(error);
    results.push({ name, status: 'fail', details, time });
    console.log(`❌ ${name}`);
    console.log(`   Error: ${details}`);
  }
}

async function runTests() {
  console.log('🤖 Chatbot Fix - Local Testing Suite\n');
  console.log(`Testing endpoint: ${BASE_URL}\n`);

  // Test 1: Check Groq connection
  await test('Groq API Connection', async () => {
    const response = await fetch(`${BASE_URL}/api/debug/groq-test`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json() as any;
    if (data.status !== 'success') {
      throw new Error(`Groq returned: ${data.message}`);
    }
    console.log(`   Model: ${data.modelUsed}`);
    console.log(`   Tokens: ${data.tokensUsed}`);
  });

  // Test 2: Basic chat message
  await test('Basic Chat Message', async () => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Bonjour',
        conversationHistory: [],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP ${response.status}: ${errorData.error}`);
    }

    const data = await response.json() as any;
    
    // Check response structure
    if (!data.message) {
      throw new Error('No message in response');
    }

    // Check for API information leak
    if (data.message.includes('API Information') || 
        data.message.includes('Primary Model:') ||
        data.message.includes('Fallback Strategy:')) {
      throw new Error('API information detected in response - fix may not be applied');
    }

    // Verify it's a real response (at least 10 chars)
    if (data.message.length < 10) {
      throw new Error(`Response too short: "${data.message}"`);
    }

    console.log(`   Response length: ${data.message.length} chars`);
    console.log(`   First 100 chars: "${data.message.substring(0, 100)}..."`);
  });

  // Test 3: Multi-turn conversation
  await test('Multi-turn Conversation', async () => {
    const history = [
      { role: 'user' as const, content: 'Qui est Leanmover?', timestamp: new Date() },
      { role: 'assistant' as const, content: 'Leanmover est une entreprise.', timestamp: new Date() },
    ];

    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Quels sont vos services?',
        conversationHistory: history,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json() as any;
    if (!data.message || data.message.length < 10) {
      throw new Error('Invalid response for multi-turn conversation');
    }
  });

  // Test 4: Error handling
  await test('Error Handling (Empty Message)', async () => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: '',
        conversationHistory: [],
      }),
    });

    if (response.status !== 400) {
      throw new Error(`Expected 400, got ${response.status}`);
    }

    const data = await response.json() as any;
    if (!data.error) {
      throw new Error('No error message in response');
    }
  });

  // Test 5: Admin usage endpoint
  await test('Admin Usage Endpoint', async () => {
    const token = process.env.INTERNAL_API_KEY || 'test-token';
    const response = await fetch(`${BASE_URL}/api/admin/groq-usage`, {
      headers: {
        'x-internal-key': token,
      },
    });

    if (!response.ok) {
      console.log(`   (Skipped: requires valid auth)`);
      return;
    }

    const data = await response.json() as any;
    if (!data.stats) {
      throw new Error('No stats in response');
    }
    console.log(`   Total requests: ${data.stats.requests}`);
    console.log(`   Current model: ${data.stats.currentModel}`);
  });

  // Print summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results Summary\n');

  const passed = results.filter(r => r.status === 'pass').length;
  const failed = results.filter(r => r.status === 'fail').length;
  const totalTime = results.reduce((sum, r) => sum + r.time, 0);

  console.log(`Total: ${results.length} tests`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏱️  Total time: ${totalTime}ms\n`);

  if (failed === 0) {
    console.log('🎉 All tests passed! Your chatbot fix is working correctly.\n');
    console.log('Next steps:');
    console.log('1. Verify all environment variables on Vercel');
    console.log('2. Deploy to Vercel');
    console.log('3. Test on production\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.\n');
    console.log('Common issues:');
    console.log('- GROQ_API_KEY is not set or invalid');
    console.log('- MongoDB connection issues');
    console.log('- Server not running on ' + BASE_URL + '\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
