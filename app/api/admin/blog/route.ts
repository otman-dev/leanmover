import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(BLOG_FILE)) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify({ articles: [] }, null, 2));
}

function readBlogData() {
  try {
    const data = fs.readFileSync(BLOG_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { articles: [] };
  }
}

function writeBlogData(data: any) {
  fs.writeFileSync(BLOG_FILE, JSON.stringify(data, null, 2));
}

// GET all articles
export async function GET() {
  try {
    const data = readBlogData();
    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching articles' },
      { status: 500 }
    );
  }
}

// POST new article
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readBlogData();

    const newArticle = {
      id: Date.now().toString(),
      ...body,
      publishedAt: new Date().toISOString(),
    };

    data.articles.push(newArticle);
    writeBlogData(data);

    return NextResponse.json({ article: newArticle }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating article' },
      { status: 500 }
    );
  }
}
