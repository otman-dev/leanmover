import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel, SolutionModel } from '@/models';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'admin');
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
    await connectDB();
    
    // Get blog and solutions count from MongoDB
    const totalBlogs = await BlogModel.countDocuments();
    const totalSolutions = await SolutionModel.countDocuments();
    
    // Still get contacts from JSON file for now
    const contactsData = readJsonFile(CONTACTS_FILE);
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
