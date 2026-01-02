# RAG System Implementation - Leanmover Chatbot

## Overview

This document describes the enhanced Retrieval-Augmented Generation (RAG) system implemented for the Leanmover chatbot using MongoDB Atlas Vector Search and Xenova/Transformers.js for local embeddings.

## Architecture

### Components

1. **Embedding Service** (`lib/embeddings.ts`)
   - Uses Xenova/all-MiniLM-L6-v2 model (384 dimensions)
   - Runs locally - no API costs
   - Automatic model caching for performance

2. **Text Chunker** (`lib/text-chunker.ts`)
   - Intelligent content splitting (500-word chunks with 50-word overlap)
   - Maintains semantic coherence
   - Special handling for FAQs, sections, and structured content

3. **Vector Database** (`models/VectorContent.ts`)
   - MongoDB collection: `vectorcontents`
   - Schema includes: contentId, contentType, title, text, embedding (384-dim), metadata, source
   - Supports 9 content types: service, company, faq, testimonial, certification, legal, hero, blog, solution

4. **Content Indexer** (`lib/rag/indexer.ts`)
   - Extracts content from all data sources
   - Generates embeddings
   - Upserts to MongoDB with deduplication

5. **Vector Search Retrieval** (`lib/rag/retrieval.ts`)
   - MongoDB `$vectorSearch` aggregation
   - Cosine similarity matching
   - Supports filtering by content type, category, language

6. **Chat Integration** (`lib/ai/chat.ts`, `app/api/chat/route.ts`)
   - Seamless integration with Groq LLM
   - RAG-enhanced context for accurate responses

## Data Sources Indexed

### Static Content
- ✅ **6 Services** with detailed sections and FAQs (48 FAQs total)
- ✅ **Company Information** (Leanmover profile, contact, stats)
- ✅ **2 Certifications** (ISO 9001:2015 AENOR, IQNET)
- ✅ **3 Testimonials** from clients
- ✅ **3 Hero Slides** for homepage
- ✅ **18 General FAQs** (pricing, implementation, support, ROI, tech)
- ✅ **10 Legal Sections** (mentions légales, politique de confidentialité)

### Dynamic Content (from MongoDB)
- ✅ **Blog Posts** (when published)
- ✅ **Solutions/Case Studies** (when published)

**Total Indexed Content:** ~100+ content chunks covering all aspects of Leanmover's services and expertise.

## Setup Instructions

### Prerequisites

1. **MongoDB Atlas Account** (Free M0 tier works)
   - Supports vector search
   - MongoDB version 6.0.11+ or 7.0.2+

2. **Environment Variables**
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   GROQ_API_KEY=your_groq_api_key
   ```

### Installation

All dependencies are already installed:
- `@xenova/transformers` - Local embedding model
- `tsx` - TypeScript execution

### Step 1: Create Vector Search Index

You need to create a vector search index in MongoDB Atlas:

#### Option A: Using Script (Recommended)
```bash
npm run create-vector-index
```

#### Option B: Manual Creation in MongoDB Atlas UI

1. Go to MongoDB Atlas → Your Cluster → Search tab
2. Click "Create Search Index"
3. Choose "JSON Editor"
4. Use index name: `vector_search_index`
5. Paste this configuration:

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

6. Click "Create Search Index"
7. Wait 5-10 minutes for index to become ACTIVE

### Step 2: Seed Vector Database

Once the index is ACTIVE, run:

```bash
npm run sync-vectors
```

This will:
- Extract all static content from data files
- Generate embeddings (first run downloads ~100MB model, takes 5-10 minutes)
- Index all content into MongoDB
- Show statistics of indexed content

**Expected Output:**
```
🚀 Starting content indexing...
✅ Connected to MongoDB

📦 Indexing services...
  ✓ Indexed service: Ingénierie & Industrialisation
  ...
  
✨ Indexing completed!
📊 Total: 120 items
✅ Success: 120
❌ Failed: 0
⏱️  Duration: 180.45s

📈 By content type:
   service: 30
   faq: 42
   company: 1
   testimonial: 3
   ...
```

### Step 3: Test the Chatbot

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Test the chat widget with queries like:
   - "Quels sont vos services d'automatisation?"
   - "Comment fonctionne l'Industrie 4.0?"
   - "Quels sont les délais de mise en œuvre?"
   - "Combien coûte un projet typique?"

The chatbot should now provide accurate, context-aware responses using vector search!

## Usage

### Manual Content Sync

After adding new blog posts or solutions to the database:

```bash
npm run sync-vectors
```

Or via admin API:
```bash
POST /api/admin/sync-vectors
```

### Check Indexing Statistics

```bash
GET /api/admin/sync-vectors
```

Returns:
```json
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

## Advanced Features

### Filtered Search by Content Type

```typescript
import { getRelevantChunksByType } from '@/lib/rag/retrieval';

// Search only in FAQs
const chunks = await getRelevantChunksByType(
  'pricing questions',
  ['faq'],
  5
);
```

### Hybrid Search (Vector + Keywords)

```typescript
import { getRelevantChunksHybrid } from '@/lib/rag/retrieval';

// Boost results containing specific keywords
const chunks = await getRelevantChunksHybrid(
  'automation solutions',
  ['automatisation', 'industrie 4.0', 'robotique'],
  5
);
```

## Performance

- **Embedding Generation:** ~100ms per text (local, no API)
- **Vector Search Query:** ~50-100ms (MongoDB Atlas)
- **Total Chatbot Response:** ~500-800ms (including LLM generation)

## Maintenance

### Updating Content

1. **Static Content:**
   - Edit files in `data/` folder
   - Run `npm run sync-vectors`

2. **Blog/Solutions:**
   - Add via admin UI
   - Auto-sync on create/update (if hooks are enabled)
   - Or manually run `npm run sync-vectors`

### Troubleshooting

**Issue:** "Vector search index not found"
- **Solution:** Ensure index is created and ACTIVE in MongoDB Atlas

**Issue:** "Embedding model download failed"
- **Solution:** Check internet connection, model will auto-download on first run

**Issue:** "No relevant chunks found"
- **Solution:** Check if content is indexed: `GET /api/admin/sync-vectors`

**Issue:** "Slow embedding generation"
- **Solution:** First run is slow (model download). Subsequent runs use cache and are fast.

## Future Enhancements

### Planned Features
- [ ] Auto-sync on blog/solution CRUD operations
- [ ] Query intent classification (informational vs commercial)
- [ ] Multi-language support (English content)
- [ ] Usage analytics and popular queries tracking
- [ ] A/B testing different chunk sizes and overlaps
- [ ] Feedback loop for continuous improvement

### Optimization Opportunities
- [ ] Redis caching for frequent queries
- [ ] Batch embedding generation for efficiency
- [ ] Incremental indexing (only changed content)
- [ ] Query expansion and synonym handling

## Architecture Diagram

```
User Query
    ↓
[Chat Widget] → POST /api/chat
    ↓
[generateChatResponse]
    ↓
[getRelevantChunks] ← Generates query embedding
    ↓
[MongoDB Vector Search] ← Uses vector_search_index
    ↓
Top 5 Relevant Chunks (with scores)
    ↓
[buildContext] ← Formats chunks for LLM
    ↓
[Groq LLM] ← System prompt + context + conversation
    ↓
AI Response + Sources
    ↓
User receives answer
```

## Files Structure

```
lib/
├── embeddings.ts              # Embedding generation (Xenova)
├── text-chunker.ts            # Content chunking utilities
├── mongodb.ts                 # MongoDB connection
├── rag/
│   ├── indexer.ts            # Content indexing pipeline
│   └── retrieval.ts          # Vector search queries
└── ai/
    ├── chat.ts               # Chat orchestration + RAG
    └── groq.ts               # Groq API client

models/
├── VectorContent.ts          # Vector content schema
└── index.ts                  # Model exports

data/
├── services.ts               # 6 services with details
├── company.ts                # Company information
├── certifications.ts         # 2 certifications
├── testimonials.ts           # 3 client testimonials
├── hero-slides.ts            # 3 homepage hero slides
├── general-faqs.ts           # 18 general FAQs
└── legal-content.ts          # 10 legal sections

scripts/
├── seed-vectors.ts           # Index all content
└── create-vector-index.ts    # Setup MongoDB index

app/api/
├── chat/route.ts             # Chat endpoint
└── admin/
    └── sync-vectors/route.ts # Admin sync endpoint
```

## Support

For issues or questions:
- Check MongoDB Atlas index status
- Review terminal logs during `npm run sync-vectors`
- Ensure all environment variables are set
- Verify MongoDB version supports vector search (6.0.11+)

## License

This RAG implementation is part of the Leanmover project.

---

**Last Updated:** January 2, 2026
**Version:** 1.0.0
**Authors:** Leanmover Development Team
