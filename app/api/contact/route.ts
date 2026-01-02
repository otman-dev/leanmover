import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactModel } from '@/models';
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
      message: sanitizeInput(data.message),
      priority: data.priority || 'normal'
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

    // Connect to database and save contact
    await connectDB();
    
    const newContact = new ContactModel({
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      company: sanitizedData.company,
      subject: sanitizedData.subject,
      message: sanitizedData.message,
      status: 'new',
      priority: sanitizedData.priority,
      source: 'website'
    });

    await newContact.save();

    // Send email notification
    const emailResult = await sendContactEmail(sanitizedData);

    if (emailResult.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
        },
        { status: 200 }
      );
    } else {
      // Even if email fails, the contact was saved to database
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          message: 'Votre message a été enregistré avec succès. Nous vous contacterons bientôt.'
        },
        { status: 200 }
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
