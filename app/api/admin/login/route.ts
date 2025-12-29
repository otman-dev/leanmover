import { NextRequest, NextResponse } from 'next/server';

// Hardcoded credentials (for demo only)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

      const response = NextResponse.json(
        { 
          success: true, 
          token,
          message: 'Login successful' 
        },
        { status: 200 }
      );

      // Set cookie
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
