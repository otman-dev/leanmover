import { NextRequest, NextResponse } from 'next/server';
import { validateNewsletterForm, subscribeToNewsletter, sanitizeInput, type NewsletterFormData, type ApiResponse } from '@/lib/api/contact';

export async function POST(request: NextRequest) {
  try {
    const data: NewsletterFormData = await request.json();

    // Sanitize inputs
    const sanitizedData: NewsletterFormData = {
      email: sanitizeInput(data.email),
      name: data.name ? sanitizeInput(data.name) : undefined
    };

    // Validate data
    const validation = validateNewsletterForm(sanitizedData);
    if (!validation.valid) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: 'Validation failed',
          error: validation.errors.join(', ')
        },
        { status: 400 }
      );
    }

    // Subscribe
    const result = await subscribeToNewsletter(sanitizedData);

    if (result.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: result.message
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: result.message,
          error: result.error
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: 'Une erreur serveur est survenue',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
