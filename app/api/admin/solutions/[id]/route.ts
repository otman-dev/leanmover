import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const SOLUTIONS_FILE = path.join(DATA_DIR, 'solutions.json');

function readSolutionsData() {
  try {
    const data = fs.readFileSync(SOLUTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { solutions: [] };
  }
}

function writeSolutionsData(data: any) {
  fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify(data, null, 2));
}

// GET single solution
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readSolutionsData();
    const solution = data.solutions.find((s: any) => s.id === id);

    if (!solution) {
      return NextResponse.json(
        { message: 'Solution not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ solution });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching solution' },
      { status: 500 }
    );
  }
}

// PUT update solution
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = readSolutionsData();
    const index = data.solutions.findIndex((s: any) => s.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: 'Solution not found' },
        { status: 404 }
      );
    }

    data.solutions[index] = {
      ...data.solutions[index],
      ...body,
      id: id,
      updatedAt: new Date().toISOString(),
    };

    writeSolutionsData(data);

    return NextResponse.json({ solution: data.solutions[index] });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating solution' },
      { status: 500 }
    );
  }
}

// DELETE solution
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readSolutionsData();
    const filteredSolutions = data.solutions.filter((s: any) => s.id !== id);

    if (filteredSolutions.length === data.solutions.length) {
      return NextResponse.json(
        { message: 'Solution not found' },
        { status: 404 }
      );
    }

    data.solutions = filteredSolutions;
    writeSolutionsData(data);

    return NextResponse.json({ message: 'Solution deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting solution' },
      { status: 500 }
    );
  }
}
