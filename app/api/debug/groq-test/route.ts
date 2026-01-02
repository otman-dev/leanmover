import { NextRequest, NextResponse } from "next/server";

/**
 * DEBUG endpoint to test Groq connection
 * Only works in development or with admin auth
 */
export async function GET(req: NextRequest) {
  // Only allow in development or with admin auth
  if (process.env.NODE_ENV !== 'development') {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token || token !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  try {
    const Groq = require('groq-sdk').default;
    
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        status: 'error',
        message: 'GROQ_API_KEY is not configured',
        environment: process.env.NODE_ENV,
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Test with a simple request
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "Say 'test successful' in one sentence only" }],
      max_tokens: 50,
    });

    const responseText = completion.choices[0]?.message?.content || '';

    return NextResponse.json({
      status: 'success',
      message: 'Groq API is working correctly',
      testResponse: responseText,
      modelUsed: "llama-3.1-8b-instant",
      tokensUsed: completion.usage?.total_tokens || 0,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Groq test error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Failed to connect to Groq API',
      error: error.message || String(error),
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
