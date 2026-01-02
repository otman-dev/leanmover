#!/usr/bin/env node

/**
 * Verify that all required environment variables are set correctly
 * Usage: npx ts-node scripts/verify-env.ts
 */

import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const requiredVars = [
  'GROQ_API_KEY',
  'MONGODB_URI',
  'NEXT_PUBLIC_BASE_URL',
  'INTERNAL_API_KEY',
];

const optionalVars = [
  'NEXT_PUBLIC_WHATSAPP_PHONE',
];

console.log('🔍 Environment Variables Verification\n');

let allValid = true;

console.log('📋 Required Variables:');
requiredVars.forEach((varName) => {
  const value = process.env[varName];
  if (value && value.trim() !== '') {
    console.log(`  ✅ ${varName}: ${varName === 'GROQ_API_KEY' ? '***' + value.slice(-8) : 'Set'}`);
  } else {
    console.log(`  ❌ ${varName}: NOT SET`);
    allValid = false;
  }
});

console.log('\n📋 Optional Variables:');
optionalVars.forEach((varName) => {
  const value = process.env[varName];
  if (value && value.trim() !== '') {
    console.log(`  ✅ ${varName}: Set`);
  } else {
    console.log(`  ℹ️  ${varName}: Not set (using defaults)`);
  }
});

console.log('\n📊 Groq Models Configuration:');
try {
  const Groq = require('groq-sdk').default;
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  
  const models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "llama-3.2-90b-vision-preview",
    "mixtral-8x7b-32768",
    "gemma-7b-it",
    "llama2-70b-4096",
  ];
  
  console.log('  Primary Model: llama-3.3-70b-versatile');
  console.log('  Available Fallbacks:');
  models.slice(1).forEach((model) => {
    console.log(`    - ${model}`);
  });
} catch (e) {
  console.log('  ⚠️  Could not verify Groq setup');
}

if (allValid) {
  console.log('\n✅ All required environment variables are set!\n');
  process.exit(0);
} else {
  console.log('\n❌ Some required environment variables are missing!\n');
  console.log('Vercel Configuration:');
  console.log('1. Go to your Vercel project settings');
  console.log('2. Navigate to Environment Variables');
  console.log('3. Add all required variables listed above');
  console.log('4. Redeploy your application\n');
  process.exit(1);
}
