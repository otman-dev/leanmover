import { NextRequest, NextResponse } from 'next/server';
import { validateAdminToken } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { TodoModel } from '@/models/Todo';

/**
 * GET /api/admin/todos
 * Get all todos with optional filtering
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '') || null;
    const isValid = validateAdminToken(token);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Non autorisé. Authentification admin requise.' },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const category = searchParams.get('category');

    // Build query
    const query: any = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;

    const todos = await TodoModel.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      success: true,
      todos,
      count: todos.length
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/todos
 * Create a new todo
 */
export async function POST(req: NextRequest) {
  try {
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
    const { title, description, priority, category, dueDate, tags, assignedTo } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Get the highest order value and add 1
    const maxOrder = await TodoModel.findOne().sort({ order: -1 }).select('order');
    const order = (maxOrder?.order || 0) + 1;

    const todo = new TodoModel({
      title,
      description,
      priority: priority || 'medium',
      category: category || 'other',
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags || [],
      assignedTo,
      order
    });

    await todo.save();

    return NextResponse.json({
      success: true,
      todo
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
