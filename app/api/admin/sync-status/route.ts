import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Validate admin token
    const token = request.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    // Lazy load to avoid importing embeddings at startup
    const { getSyncStatus } = await import('@/lib/rag/auto-sync');
    const syncStatus = getSyncStatus();

    // Get actual vector DB stats from MongoDB
    const connectDB = (await import('@/lib/mongodb')).default;
    const { VectorContentModel } = await import('@/models/VectorContent');
    const { BlogModel, SolutionModel } = await import('@/models');

    await connectDB();

    // Count vector database content
    const [vectorBlogs, vectorSolutions, vectorServices, vectorFaqs, vectorTotal] = await Promise.all([
      VectorContentModel.countDocuments({ contentType: 'blog' }),
      VectorContentModel.countDocuments({ contentType: 'solution' }),
      VectorContentModel.countDocuments({ contentType: 'service' }),
      VectorContentModel.countDocuments({ contentType: 'faq' }),
      VectorContentModel.countDocuments(),
    ]);

    // Count database content
    const [blogPublished, blogDraft, solutionPublished, solutionDraft] = await Promise.all([
      BlogModel.countDocuments({ status: 'published' }),
      BlogModel.countDocuments({ status: 'draft' }),
      SolutionModel.countDocuments({ status: 'published' }),
      SolutionModel.countDocuments({ status: 'draft' }),
    ]);

    // Count drafts in vector DB (these should be cleaned up)
    const draftBlogsInVector = await VectorContentModel.countDocuments({ 
      contentType: 'blog',
      metadata: { status: 'draft' }
    });
    
    const draftSolutionsInVector = await VectorContentModel.countDocuments({ 
      contentType: 'solution',
      metadata: { status: 'draft' }
    });

    const status = {
      ...syncStatus,
      database: {
        blogs: { published: blogPublished, draft: blogDraft },
        solutions: { published: solutionPublished, draft: solutionDraft },
      },
      vectorDb: {
        blogs: vectorBlogs,
        solutions: vectorSolutions,
        services: vectorServices,
        faqs: vectorFaqs,
        total: vectorTotal,
      },
      sync: {
        ...syncStatus,
        draftInVector: draftBlogsInVector + draftSolutionsInVector,
      }
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get sync status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
