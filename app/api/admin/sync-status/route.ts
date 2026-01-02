import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Lazy load to avoid importing embeddings at startup
    const { getSyncStatus } = await import('@/lib/rag/auto-sync');
    const status = getSyncStatus();
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
