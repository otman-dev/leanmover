import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
const BLOG_FILE = path.join(DATA_DIR, 'blog.json');
const SOLUTIONS_FILE = path.join(DATA_DIR, 'solutions.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function readJsonFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch {}
  return null;
}

export async function GET() {
  try {
    const blogData = readJsonFile(BLOG_FILE);
    const solutionsData = readJsonFile(SOLUTIONS_FILE);
    const contactsData = readJsonFile(CONTACTS_FILE);

    const totalBlogs = blogData?.articles?.length || 0;
    const totalSolutions = solutionsData?.solutions?.length || 0;
    const totalContacts = contactsData?.contacts?.length || 0;

    // Count recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = contactsData?.contacts?.filter((contact: any) => {
      const submittedDate = new Date(contact.submittedAt);
      return submittedDate >= sevenDaysAgo;
    }).length || 0;

    return NextResponse.json({
      totalBlogs,
      totalSolutions,
      totalContacts,
      recentContacts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        totalBlogs: 0,
        totalSolutions: 0,
        totalContacts: 0,
        recentContacts: 0,
      },
      { status: 200 }
    );
  }
}
