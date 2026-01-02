import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'completed'], 
    default: 'todo' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  category: { 
    type: String, 
    enum: ['content', 'technical', 'marketing', 'support', 'other'], 
    default: 'other' 
  },
  assignedTo: { type: String },
  dueDate: { type: Date },
  completedAt: { type: Date },
  tags: [{ type: String }],
  notes: { type: String },
  order: { type: Number, default: 0 }
}, {
  timestamps: true,
  collection: 'todos'
});

// Create indexes
todoSchema.index({ status: 1 });
todoSchema.index({ priority: 1 });
todoSchema.index({ dueDate: 1 });
todoSchema.index({ order: 1 });

export const TodoModel = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
