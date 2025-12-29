import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

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

// PATCH update contact status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = readContactsData();
    const index = data.contacts.findIndex((c: any) => c.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    data.contacts[index] = {
      ...data.contacts[index],
      ...body,
      id: params.id,
    };

    writeContactsData(data);

    return NextResponse.json({ contact: data.contacts[index] });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating contact' },
      { status: 500 }
    );
  }
}

// DELETE contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = readContactsData();
    const filteredContacts = data.contacts.filter((c: any) => c.id !== params.id);

    if (filteredContacts.length === data.contacts.length) {
      return NextResponse.json(
        { message: 'Contact not found' },
        { status: 404 }
      );
    }

    data.contacts = filteredContacts;
    writeContactsData(data);

    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting contact' },
      { status: 500 }
    );
  }
}
