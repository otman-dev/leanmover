import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const SOLUTIONS_FILE = path.join(DATA_DIR, 'solutions.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(SOLUTIONS_FILE)) {
  fs.writeFileSync(SOLUTIONS_FILE, JSON.stringify({ solutions: [] }, null, 2));
}

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

// GET all solutions
export async function GET() {
  try {
    const data = readSolutionsData();
    return NextResponse.json({ solutions: data.solutions });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching solutions' },
      { status: 500 }
    );
  }
}

// POST new solution
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readSolutionsData();

    const newSolution = {
      id: Date.now().toString(),
      ...body,
      publishedAt: new Date().toISOString(),
    };

    data.solutions.push(newSolution);
    writeSolutionsData(data);

    return NextResponse.json({ solution: newSolution }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating solution' },
      { status: 500 }
    );
  }
}
