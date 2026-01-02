import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SolutionModel } from '@/models';

// GET - Fetch all published solutions for public use
export async function GET() {
  try {
    await connectDB();
    const solutions = await SolutionModel.find({ 
      status: { $in: ['published', 'featured'] } 
    }).sort({ publishedAt: -1 });
    return NextResponse.json({ solutions });
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return NextResponse.json({ message: 'Error fetching solutions' }, { status: 500 });
  }
}