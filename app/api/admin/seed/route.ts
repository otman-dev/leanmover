import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  return NextResponse.json({
    message: 'Seed endpoint no longer available - application now relies entirely on database data',
    note: 'Use the admin panel to create blog posts and solutions directly in the database'
  }, { status: 410 }); // 410 Gone
}

export async function GET() {
  return NextResponse.json({
    message: 'Seed endpoint no longer available - application now relies entirely on database data',
    note: 'Use the admin panel to create blog posts and solutions directly in the database'
  }, { status: 410 }); // 410 Gone
}