import { NextRequest, NextResponse } from 'next/server';
import { getSyncStatus } from '@/lib/rag/auto-sync';

export async function GET(request: NextRequest) {
  try {
    const status = getSyncStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error('Error getting sync status:', error);
    return NextResponse.json(
      { error: 'Failed to get sync status' },
      { status: 500 }
    );
  }
}
