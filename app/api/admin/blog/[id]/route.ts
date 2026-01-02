import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel } from '@/models';
import { triggerRagSync } from '@/lib/rag/auto-sync';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single blog post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    
    const post = await BlogModel.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ article: post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'Error fetching article' }, { status: 500 });
  }
}

// PUT - Update blog post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    
    // Update slug if title changed
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\u00C0-\u017F]+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    data.updatedAt = new Date();
    
    const updatedPost = await BlogModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPost) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    
    // Trigger RAG sync in background
    triggerRagSync('Blog post updated');
    
    return NextResponse.json({ article: updatedPost });
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A blog post with this slug already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'Error updating article' }, { status: 500 });
  }
}

// DELETE - Remove blog post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedPost = await BlogModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    
    // Trigger RAG sync in background
    triggerRagSync('Blog post deleted');
    
    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ message: 'Error deleting article' }, { status: 500 });
  }
}
