import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const connectDB = (await import('@/lib/mongodb')).default;
    const { SolutionModel } = await import('@/models');
    const { VectorContentModel } = await import('@/models/VectorContent');

    await connectDB();

    // Get all solutions with their status
    const allSolutions = await SolutionModel.find({}, { title: 1, slug: 1, status: 1 });
    
    // Get published/featured solutions (what indexer looks for)
    const publishedSolutions = await SolutionModel.find({ 
      status: { $in: ['published', 'featured'] } 
    }, { title: 1, slug: 1, status: 1 });

    // Get all vector content with contentType 'solution'
    const vectorSolutions = await VectorContentModel.find(
      { contentType: 'solution' },
      { contentId: 1, title: 1, metadata: 1 }
    );

    // Get distinct contentTypes in vector DB
    const distinctTypes = await VectorContentModel.distinct('contentType');

    return NextResponse.json({
      allSolutions: {
        count: allSolutions.length,
        data: allSolutions
      },
      publishedSolutions: {
        count: publishedSolutions.length,
        data: publishedSolutions
      },
      vectorSolutions: {
        count: vectorSolutions.length,
        data: vectorSolutions
      },
      distinctContentTypes: distinctTypes,
      message: 'Check if solutions exist and have correct status/contentType'
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
