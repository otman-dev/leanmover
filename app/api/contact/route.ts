import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sendContactEmail, sanitizeInput, type ContactFormData, type ApiResponse } from '@/lib/api/contact';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify({ contacts: [] }, null, 2));
}

function saveContactToDatabase(contactData: ContactFormData) {
  try {
    let data = { contacts: [] };
    if (fs.existsSync(CONTACTS_FILE)) {
      const fileContent = fs.readFileSync(CONTACTS_FILE, 'utf8');
      data = JSON.parse(fileContent);
    }

    const newContact = {
      id: Date.now().toString(),
      name: contactData.name,
      email: contactData.email,
      phone: contactData.phone,
      company: contactData.company,
      message: `${contactData.subject}\n\n${contactData.message}`,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    data.contacts.push(newContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving contact to database:', error);
  }
}

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

    // Save to admin database
    saveContactToDatabase(sanitizedData);

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
