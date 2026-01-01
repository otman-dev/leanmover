import mongoose from 'mongoose';

// Blog Post Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  imageUrl: { type: String },
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  featured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'blog_articles'
});

// Solution Schema
const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  industry: { type: String, required: true },
  shortDescription: { type: String, required: true },
  client: {
    name: { type: String },
    sector: { type: String, required: true },
    size: { type: String, enum: ['startup', 'sme', 'large'], required: true },
    location: { type: String }
  },
  challenge: { type: String, required: true },
  solution: { type: String, required: true },
  results: [{
    metric: { type: String, required: true },
    value: { type: String, required: true },
    description: { type: String, required: true }
  }],
  technologies: [{
    category: { type: String, enum: ['Hardware', 'Software', 'Process', 'Integration'], required: true },
    name: { type: String, required: true },
    description: { type: String }
  }],
  timeline: [{
    phase: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String }
  }],
  imageUrl: { type: String },
  gallery: [{ type: String }],
  metaDescription: { type: String, required: true },
  keywords: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  status: { type: String, enum: ['draft', 'published', 'featured'], default: 'published' },
  featured: { type: Boolean, default: false },
  viewCount: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'solution_articles'
});

// Create indexes for better performance
blogSchema.index({ category: 1 });
blogSchema.index({ status: 1 });
blogSchema.index({ publishedAt: -1 });

solutionSchema.index({ industry: 1 });
solutionSchema.index({ status: 1 });
solutionSchema.index({ publishedAt: -1 });

export const BlogModel = mongoose.models.BlogPost || mongoose.model('BlogPost', blogSchema);
export const SolutionModel = mongoose.models.Solution || mongoose.model('Solution', solutionSchema);