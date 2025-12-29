import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }

  try {
    // Decode and validate token
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, timestamp] = decoded.split(':');

    // Check if token is valid (not expired - 24 hours)
    const isValid = username === 'admin' && 
                    (Date.now() - parseInt(timestamp)) < 24 * 60 * 60 * 1000;

    if (isValid) {
      return NextResponse.json({ authenticated: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { authenticated: false, message: 'Token expired' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { authenticated: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
}
