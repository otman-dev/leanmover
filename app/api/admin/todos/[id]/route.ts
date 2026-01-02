import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { TodoModel } from '@/models/Todo';

/**
 * PUT /api/admin/todos/[id]
 * Update a todo
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { title, description, status, priority, category, dueDate, tags, assignedTo, notes, order } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
      updateData.status = status;
      if (status === 'completed' && !body.completedAt) {
        updateData.completedAt = new Date();
      }
    }
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category;
    if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
    if (tags !== undefined) updateData.tags = tags;
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
    if (notes !== undefined) updateData.notes = notes;
    if (order !== undefined) updateData.order = order;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      todo
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/todos/[id]
 * Delete a todo
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    await connectDB();

    const todo = await TodoModel.findByIdAndDelete(id);

    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}
