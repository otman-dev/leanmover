import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel } from '@/models';

// GET - Fetch all blog posts
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogModel.find({}).sort({ publishedAt: -1 });
    return NextResponse.json({ articles: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Generate slug from title if not provided
    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9\u00C0-\u017F]+/g, '-') // Handle French characters
        .replace(/^-|-$/g, '');
    }
    
    const newPost = new BlogModel({
      ...data,
      publishedAt: new Date()
    });
    
    await newPost.save();
    
    return NextResponse.json({ article: newPost }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog post:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
