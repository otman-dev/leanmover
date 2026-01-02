import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactModel } from '@/models';

// GET - Fetch single contact
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const contact = await ContactModel.findById(id);
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json({ contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

// PATCH - Update contact status, notes, etc.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();
    
    const updateData: any = {};
    
    // Only allow certain fields to be updated
    if (data.status) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.priority) updateData.priority = data.priority;
    if (data.assignedTo !== undefined) updateData.assignedTo = data.assignedTo;
    
    // Set repliedAt if status changed to replied
    if (data.status === 'replied') {
      updateData.repliedAt = new Date();
    }
    
    const contact = await ContactModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json({ contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}

// DELETE - Delete contact
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const contact = await ContactModel.findByIdAndDelete(id);
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 });
  }
}
