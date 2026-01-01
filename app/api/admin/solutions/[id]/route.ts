import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { SolutionModel } from '@/models';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET - Fetch single solution
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    
    const solution = await SolutionModel.findById(id);
    if (!solution) {
      return NextResponse.json({ message: 'Solution not found' }, { status: 404 });
    }
    
    return NextResponse.json({ solution });
  } catch (error) {
    console.error('Error fetching solution:', error);
    return NextResponse.json({ message: 'Error fetching solution' }, { status: 500 });
  }
}

// PUT - Update solution
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
    
    const updatedSolution = await SolutionModel.findByIdAndUpdate(id, data, { new: true });
    if (!updatedSolution) {
      return NextResponse.json({ message: 'Solution not found' }, { status: 404 });
    }
    
    return NextResponse.json({ solution: updatedSolution });
  } catch (error: any) {
    console.error('Error updating solution:', error);
    
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A solution with this slug already exists' }, { status: 409 });
    }
    
    return NextResponse.json({ message: 'Error updating solution' }, { status: 500 });
  }
}

// DELETE - Remove solution
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedSolution = await SolutionModel.findByIdAndDelete(id);
    if (!deletedSolution) {
      return NextResponse.json({ message: 'Solution not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Solution deleted successfully' });
  } catch (error) {
    console.error('Error deleting solution:', error);
    return NextResponse.json({ message: 'Error deleting solution' }, { status: 500 });
  }
}
