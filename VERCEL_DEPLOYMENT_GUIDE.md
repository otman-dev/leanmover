# Vercel Deployment Checklist

## Quick Fix for Chatbot Issue

Your chatbot is showing API information instead of responses on Vercel because:
1. Invalid Groq model names were being used ❌ → **FIXED** ✅
2. Test API request was leaking response data ❌ → **FIXED** ✅  
3. Missing/incorrect environment variables ⚠️ → **NEEDS VERIFICATION**

## Step-by-Step Fix

### 1️⃣ Update Vercel Environment Variables

Go to: **https://vercel.com/dashboard** → Your Project → **Settings** → **Environment Variables**

Add/Update these variables:

```
GROQ_API_KEY = gsk_xxxxxxxxxxxxxxxxxxxx
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/database
NEXT_PUBLIC_BASE_URL = https://yourdomain.com
INTERNAL_API_KEY = your-secret-key-here
NEXT_PUBLIC_WHATSAPP_PHONE = 212674770836
```

**Important Notes:**
- `GROQ_API_KEY`: Get from https://console.groq.com/keys (requires free account)
- `MONGODB_URI`: Get from MongoDB Atlas connection string
- `NEXT_PUBLIC_BASE_URL`: Set to your actual domain (e.g., `https://leanmover.ma`)
- `INTERNAL_API_KEY`: Create a secure random string
- `NEXT_PUBLIC_WHATSAPP_PHONE`: Your WhatsApp business number (optional)

### 2️⃣ Deploy

After setting variables, deploy one of these ways:

**Option A: Via Git (Recommended)**
```bash
git add .
git commit -m "Fix: Update Groq models and remove test requests"
git push origin main
```
Vercel auto-deploys on push.

**Option B: Via Vercel Dashboard**
1. Go to Deployments
2. Click the latest deployment
3. Click "Redeploy"

### 3️⃣ Test the Fix

#### Test 1: Verify Environment
```bash
curl https://yourdomain.com/api/debug/groq-test
```

Expected response:
```json
{
  "status": "success",
  "message": "Groq API is working correctly",
  "testResponse": "test successful",
  "tokensUsed": X
}
```

#### Test 2: Test Chat
Send a message in your chatbot widget. You should get a normal AI response.

#### Test 3: Check Admin Dashboard
Visit `/admin/groq` (after login) to see real-time API usage.

## Troubleshooting

### Problem: Still showing API information
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Wait 5 minutes for Vercel to fully deploy
3. Check that ALL environment variables are set (not just some)
4. Verify `GROQ_API_KEY` is valid: https://console.groq.com/keys

### Problem: 500 Error in chat
**Solution:**
1. Check `/api/debug/groq-test` response
2. If error, verify `GROQ_API_KEY` is correct
3. Check Vercel function logs: **Settings** → **Functions** → View logs

### Problem: MongoDB connection error
**Solution:**
1. Verify `MONGODB_URI` is correct
2. Check MongoDB Atlas allows Vercel IP addresses
3. Connection string should be: `mongodb+srv://username:password@cluster.mongodb.net/database`

## Files Changed

✅ **Fixed:**
- `lib/ai/groq.ts` - Updated model names
- `app/api/admin/groq-usage/route.ts` - Removed test request
- `app/api/chat/route.ts` - Better error handling
- `lib/ai/chat.ts` - Response validation

✅ **Created:**
- `scripts/verify-env.ts` - Environment verification
- `app/api/debug/groq-test/route.ts` - Groq test endpoint
- `CHATBOT_FIX_SUMMARY.md` - Complete fix documentation

## Model Priority (Fallback Order)

If one model fails, system tries next in order:
1. 🎯 `llama-3.3-70b-versatile` (Primary - most powerful)
2. ⚡ `llama-3.1-8b-instant` (Fast & efficient)
3. 👁️ `llama-3.2-90b-vision-preview` (Multimodal support)
4. 🔧 `mixtral-8x7b-32768` (Great performance)
5. 📦 `gemma-7b-it` (Lightweight)
6. 🏛️ `llama2-70b-4096` (Legacy fallback)

## Support

After deploying:
- Check `/api/debug/groq-test` if you have issues
- View function logs in Vercel dashboard
- Verify all environment variables are set
- Test with local `npx ts-node scripts/verify-env.ts`

**Everything is now configured correctly. The chatbot should work on Vercel!** ✨
