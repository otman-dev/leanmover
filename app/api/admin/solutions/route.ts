import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SolutionModel } from '@/models';

// GET - Fetch all solutions
export async function GET() {
  try {
    await connectDB();
    const solutions = await SolutionModel.find({}).sort({ publishedAt: -1 });
    return NextResponse.json({ solutions });
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return NextResponse.json({ message: 'Error fetching solutions' }, { status: 500 });
  }
}

// POST - Create new solution
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
    
    const newSolution = new SolutionModel({
      ...data,
      publishedAt: new Date()
    });
    
    await newSolution.save();
    
    return NextResponse.json({ solution: newSolution }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating solution:', error);
    
    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A solution with this slug already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'Error creating solution' }, { status: 500 });
  }
}
