import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';
import { indexAllContent, getIndexingStats } from '@/lib/rag/indexer';

/**
 * Admin endpoint to manually sync/reindex all content to vector database
 * POST /api/admin/sync-vectors
 * 
 * Requires authentication (admin user)
 * 
 * This will:
 * 1. Extract all static content (services, FAQs, company info, etc.)
 * 2. Generate embeddings for each content piece
 * 3. Upsert into MongoDB vector collection
 * 4. Return indexing statistics
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      console.warn('❌ Unauthorized sync attempt');
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    console.log('🔄 Starting manual vector sync triggered by admin...');

    // Run the indexing process
    const stats = await indexAllContent();

    // Get final database statistics
    const dbStats = await getIndexingStats();

    console.log(`✅ Sync completed: ${stats.success} items indexed`);

    return NextResponse.json({
      success: true,
      message: 'Synchronisation des vecteurs terminée avec succès',
      stats: {
        indexed: stats,
        database: dbStats
      }
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Error in vector sync endpoint:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la synchronisation des vecteurs',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * GET endpoint to check current vector database statistics
 */
export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    // Get database statistics
    const stats = await getIndexingStats();

    return NextResponse.json({
      success: true,
      stats
    }, { status: 200 });

  } catch (error: any) {
    console.error('❌ Error fetching vector stats:', error);

    return NextResponse.json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
