import mongoose from 'mongoose';

// Metadata structure for content
interface ContentMetadata {
  slug?: string;
  category?: string;
  keywords?: string[];
  author?: string;
  language?: string;
  industry?: string;
}

// Vector content document interface
export interface IVectorContent {
  contentId: string;
  contentType: 'service' | 'company' | 'faq' | 'testimonial' | 'certification' | 'legal' | 'hero' | 'blog' | 'solution';
  title: string;
  text: string;
  embedding: number[];
  metadata: ContentMetadata;
  source: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const vectorContentSchema = new mongoose.Schema<IVectorContent>(
  {
    // Unique identifier for this content piece
    contentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // Type of content for filtering
    contentType: {
      type: String,
      required: true,
      enum: ['service', 'company', 'faq', 'testimonial', 'certification', 'legal', 'hero', 'blog', 'solution'],
      index: true
    },

    // Content title
    title: {
      type: String,
      required: true,
      trim: true
    },

    // Main text content
    text: {
      type: String,
      required: true,
      trim: true
    },

    // 384-dimensional embedding vector (for Xenova/all-MiniLM-L6-v2)
    embedding: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v: number[]) {
          return v.length === 384;
        },
        message: 'Embedding must be exactly 384 dimensions'
      }
    },

    // Metadata for filtering and context
    metadata: {
      slug: { type: String },
      category: { type: String, index: true },
      keywords: [{ type: String }],
      author: { type: String },
      language: { type: String, default: 'fr', index: true },
      industry: { type: String }
    },

    // Source URL or page reference
    source: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
    collection: 'vectorcontents'
  }
);

// Add indexes for common queries
vectorContentSchema.index({ contentType: 1, 'metadata.category': 1 });
vectorContentSchema.index({ contentType: 1, 'metadata.language': 1 });
vectorContentSchema.index({ 'metadata.keywords': 1 });

// Static method to upsert content (insert or update)
vectorContentSchema.statics.upsertContent = async function(
  contentId: string,
  data: Partial<IVectorContent>
) {
  return this.findOneAndUpdate(
    { contentId },
    { $set: { ...data, contentId } },
    { upsert: true, new: true, runValidators: true }
  );
};

// Static method to delete by content type
vectorContentSchema.statics.deleteByType = async function(contentType: string) {
  return this.deleteMany({ contentType });
};

// Static method to get count by content type
vectorContentSchema.statics.getCountByType = async function() {
  return this.aggregate([
    {
      $group: {
        _id: '$contentType',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);
};

// Instance method to calculate similarity with another embedding
vectorContentSchema.methods.calculateSimilarity = function(otherEmbedding: number[]): number {
  if (otherEmbedding.length !== 384) {
    throw new Error('Embedding must be 384 dimensions');
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < 384; i++) {
    dotProduct += this.embedding[i] * otherEmbedding[i];
    norm1 += this.embedding[i] * this.embedding[i];
    norm2 += otherEmbedding[i] * otherEmbedding[i];
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};

// Export the model
export const VectorContentModel = mongoose.models.VectorContent || 
  mongoose.model<IVectorContent>('VectorContent', vectorContentSchema);

export default VectorContentModel;
