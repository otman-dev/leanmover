import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel } from '@/models';

// GET - Fetch all published blog posts for public use
export async function GET() {
  try {
    await connectDB();
    const posts = await BlogModel.find({ status: 'published' }).sort({ publishedAt: -1 });
    return NextResponse.json({ articles: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}