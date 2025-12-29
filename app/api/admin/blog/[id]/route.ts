import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');

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

// GET single article
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readBlogData();
    const article = data.articles.find((a: any) => a.id === id);

    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching article' },
      { status: 500 }
    );
  }
}

// PUT update article
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = readBlogData();
    const index = data.articles.findIndex((a: any) => a.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    data.articles[index] = {
      ...data.articles[index],
      ...body,
      id: id,
      updatedAt: new Date().toISOString(),
    };

    writeBlogData(data);

    return NextResponse.json({ article: data.articles[index] });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating article' },
      { status: 500 }
    );
  }
}

// DELETE article
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readBlogData();
    const filteredArticles = data.articles.filter((a: any) => a.id !== id);

    if (filteredArticles.length === data.articles.length) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      );
    }

    data.articles = filteredArticles;
    writeBlogData(data);

    return NextResponse.json({ message: 'Article deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting article' },
      { status: 500 }
    );
  }
}
