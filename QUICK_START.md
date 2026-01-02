# 🚀 Quick Start Guide - RAG System Setup

## Overview
Complete setup guide for the Leanmover RAG chatbot system using MongoDB Atlas Vector Search.

---

## ✅ Prerequisites Checklist

Before starting, ensure you have:

- [ ] MongoDB Atlas account (free M0 tier works)
- [ ] MongoDB cluster created (version 6.0.11+ or 7.0.2+)
- [ ] Environment variables set in `.env.local`:
  ```env
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
  GROQ_API_KEY=gsk_your_groq_api_key_here
  ```
- [ ] Dependencies installed (`npm install` already done)

---

## 📋 Setup Steps (Follow in Order)

### Step 1: Create MongoDB Vector Search Index

**Choose Option A or B:**

#### ✨ Option A: Automatic (Recommended)

```bash
npm run create-vector-index
```

If you see errors about `createSearchIndex not supported`, proceed to Option B.

#### 📝 Option B: Manual (MongoDB Atlas UI)

1. Go to https://cloud.mongodb.com
2. Navigate to your cluster
3. Click **"Search"** tab
4. Click **"Create Search Index"**
5. Select **"JSON Editor"**
6. Paste this configuration:

```json
{
  "name": "vector_search_index",
  "type": "vectorSearch",
  "definition": {
    "fields": [
      {
        "type": "vector",
        "path": "embedding",
        "numDimensions": 384,
        "similarity": "cosine"
      },
      {
        "type": "filter",
        "path": "contentType"
      },
      {
        "type": "filter",
        "path": "metadata.category"
      },
      {
        "type": "filter",
        "path": "metadata.language"
      }
    ]
  }
}
```

7. Click **"Create Search Index"**
8. ⏳ **Wait 5-10 minutes** for index status to become **ACTIVE**

---

### Step 2: Seed Vector Database

Once your index is **ACTIVE**, run:

```bash
npm run sync-vectors
```

**What happens:**
- 🔄 Extracts all static content (services, FAQs, company info, etc.)
- 🧠 Generates 384-dim embeddings using Xenova/all-MiniLM-L6-v2
- 💾 Inserts/updates ~100+ content chunks into MongoDB
- ⏱️  **First run:** 5-10 minutes (downloads ~100MB embedding model)
- ⏱️  **Subsequent runs:** ~1-2 minutes (uses cached model)

**Expected Output:**
```
🚀 Leanmover RAG Vector Database Seeding 🚀

📊 Current database state:
   Total vectors: 0

🚀 Starting content indexing...
✅ Connected to MongoDB

📦 Indexing services...
  ✓ Indexed service: Ingénierie & Industrialisation
  ✓ Indexed service: Solutions Industrie 4.0
  ...

❓ Indexing general FAQs...
  ✓ Indexed FAQ category: general (3 FAQs)
  ✓ Indexed FAQ category: pricing (3 FAQs)
  ...

✨ Indexing completed!
📊 Total: 120 items
✅ Success: 120
❌ Failed: 0
⏱️  Duration: 180.45s

📈 By content type:
   🔧 service: 30
   ❓ faq: 42
   🏢 company: 1
   💬 testimonial: 3
   🏆 certification: 2
   ...

🎉 Vector database is ready for RAG queries!
```

---

### Step 3: Test the Chatbot

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Open browser:**
   ```
   http://localhost:3000
   ```

3. **Test queries in the chat widget:**

   Try these example queries:
   
   - ✅ "Quels sont vos services d'automatisation?"
   - ✅ "Comment fonctionne l'Industrie 4.0?"
   - ✅ "Quels sont les délais de mise en œuvre?"
   - ✅ "Combien coûte un projet typique?"
   - ✅ "Avez-vous des certifications ISO?"
   - ✅ "Comment puis-je vous contacter?"

4. **Verify vector search is working:**
   
   Check browser console (F12) or terminal for logs like:
   ```
   🔍 Vector search found 5 relevant chunks for query: "automatisation"
      1. [service] Machines Spéciales & Automatisation (score: 0.842)
      2. [service] Solutions Industrie 4.0 (score: 0.781)
      ...
   ```

---

## 🎯 Success Criteria

Your RAG system is working correctly if:

- ✅ Vector index shows **ACTIVE** status in MongoDB Atlas
- ✅ `npm run sync-vectors` completes successfully with 100+ items indexed
- ✅ Chatbot provides accurate, context-aware responses
- ✅ Console logs show vector search scores
- ✅ Responses cite relevant sources from indexed content

---

## 🔧 Troubleshooting

### Issue 1: "Vector search index not found"
**Cause:** Index not created or not active yet  
**Solution:**
1. Check MongoDB Atlas → Search tab
2. Verify index name is `vector_search_index`
3. Ensure status is **ACTIVE** (not building/pending)
4. Wait if still building (can take 10 minutes)

### Issue 2: "No relevant chunks found"
**Cause:** Database not seeded  
**Solution:**
1. Run `npm run sync-vectors`
2. Check output for success messages
3. Verify at least 100 items were indexed

### Issue 3: "Embedding model download failed"
**Cause:** Network issues or disk space  
**Solution:**
1. Ensure stable internet connection
2. Check available disk space (~500MB needed)
3. Model downloads to: `node_modules/@xenova/transformers/.cache`

### Issue 4: "MongoDB connection timeout"
**Cause:** Wrong connection string or network  
**Solution:**
1. Verify `MONGODB_URI` in `.env.local`
2. Check MongoDB Atlas network access (allow your IP)
3. Test connection: MongoDB Atlas → Connect → Test connection

### Issue 5: "Chat responses are generic/not specific"
**Cause:** Not using vector search, falling back to basic retrieval  
**Solution:**
1. Check vector index is active
2. Run `npm run sync-vectors` to ensure content is indexed
3. Look for console errors during chat requests

---

## 📊 Verify Setup

### Check Index Status
```bash
# MongoDB Atlas UI
Go to Cluster → Search → Check "vector_search_index" status
Should show: ACTIVE ✅
```

### Check Database Content
```bash
# Via Admin API (requires admin auth)
GET http://localhost:3000/api/admin/sync-vectors

Response:
{
  "success": true,
  "stats": {
    "total": 120,
    "byType": {
      "service": 30,
      "faq": 42,
      "company": 1,
      ...
    }
  }
}
```

### Check Chatbot Logs
```bash
# In terminal running `npm run dev`
Look for:
🔍 Vector search found 5 relevant chunks for query: "..."
   1. [service] ... (score: 0.842)
   ...
```

---

## 🔄 Re-indexing Content

### When to Re-index:
- After adding new blog posts
- After adding new solutions/case studies
- After updating static content in `data/` folder
- After modifying service descriptions or FAQs

### How to Re-index:
```bash
npm run sync-vectors
```

This will:
- Upsert new/updated content
- Preserve existing content
- Update embeddings if text changed
- Complete in ~1-2 minutes (after first run)

---

## 📈 Performance Benchmarks

| Operation | Time |
|-----------|------|
| First embedding model download | 1-2 min |
| Generate single embedding | ~100ms |
| Vector search query | 50-100ms |
| Full chatbot response | 500-800ms |
| Initial indexing (100+ items) | 5-10 min |
| Re-indexing (cached model) | 1-2 min |

---

## 🎓 Next Steps

Once your RAG system is working:

1. **Add More Content:**
   - Create blog posts via admin UI
   - Add solution case studies
   - Watch them automatically appear in chat responses

2. **Customize Retrieval:**
   - Adjust chunk size in `lib/text-chunker.ts`
   - Change number of retrieved chunks in `lib/ai/chat.ts`
   - Experiment with hybrid search for better results

3. **Monitor Performance:**
   - Track chatbot usage
   - Identify common queries
   - Optimize content based on user needs

4. **Enhance Content:**
   - Add more FAQs based on user questions
   - Expand service descriptions
   - Create industry-specific content

---

## 📚 Additional Resources

- **Full Documentation:** See `RAG_IMPLEMENTATION.md`
- **MongoDB Vector Search Docs:** https://www.mongodb.com/docs/atlas/atlas-vector-search/
- **Xenova Transformers:** https://huggingface.co/docs/transformers.js

---

## ✅ Setup Complete!

Your Leanmover RAG chatbot is now ready to provide intelligent, context-aware responses! 🎉

**Questions?** Check the troubleshooting section or review `RAG_IMPLEMENTATION.md` for detailed documentation.

---

**Last Updated:** January 2, 2026  
**Version:** 1.0.0
