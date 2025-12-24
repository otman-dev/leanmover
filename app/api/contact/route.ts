import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sendContactEmail, sanitizeInput, type ContactFormData, type ApiResponse } from '@/lib/api/contact';

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      phone: data.phone ? sanitizeInput(data.phone) : undefined,
      company: data.company ? sanitizeInput(data.company) : undefined,
      subject: sanitizeInput(data.subject),
      message: sanitizeInput(data.message)
    };

    // Validate data
    const validation = validateContactForm(sanitizedData);
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

    // Send email
    const result = await sendContactEmail(sanitizedData);

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
    console.error('Contact API error:', error);
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
