import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel, SolutionModel } from '@/models';

export async function GET() {
  try {
    await connectDB();
    
    // Get all blog slugs
    const blogPosts = await BlogModel.find({ status: 'published' }).select('slug').lean();
    const blogSlugs = blogPosts.map(post => post.slug);
    
    // Get all solution slugs  
    const solutions = await SolutionModel.find({ status: 'published' }).select('slug').lean();
    const solutionSlugs = solutions.map(solution => solution.slug);
    
    return NextResponse.json({
      blogSlugs,
      solutionSlugs
    });
  } catch (error) {
    console.error('Error fetching sitemap data:', error);
    return NextResponse.json({ blogSlugs: [], solutionSlugs: [] });
  }
}