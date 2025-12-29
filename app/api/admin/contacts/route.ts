import { NextRequest, NextResponse } from 'next/server';
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

function readContactsData() {
  try {
    const data = fs.readFileSync(CONTACTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { contacts: [] };
  }
}

function writeContactsData(data: any) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(data, null, 2));
}

// GET all contacts
export async function GET() {
  try {
    const data = readContactsData();
    // Sort by newest first
    const sortedContacts = [...data.contacts].sort(
      (a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    return NextResponse.json({ contacts: sortedContacts });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching contacts' },
      { status: 500 }
    );
  }
}

// POST new contact (for storing contact form submissions)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readContactsData();

    const newContact = {
      id: Date.now().toString(),
      ...body,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    data.contacts.push(newContact);
    writeContactsData(data);

    return NextResponse.json({ contact: newContact }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error saving contact' },
      { status: 500 }
    );
  }
}
