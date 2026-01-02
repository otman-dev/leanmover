import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ContactModel } from '@/models';

// GET - Fetch all contact submissions
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;
    
    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Get contacts with pagination
    const contacts = await ContactModel
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination (filtered)
    const filteredTotal = await ContactModel.countDocuments(query);
    
    // Get total count for stats (all contacts)
    const totalContacts = await ContactModel.countDocuments();
    
    // Get stats
    const stats = await ContactModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {} as Record<string, number>);
    
    return NextResponse.json({
      contacts,
      pagination: {
        page,
        limit,
        total: filteredTotal,
        pages: Math.ceil(filteredTotal / limit)
      },
      stats: {
        total: totalContacts,
        new: statusStats.new || 0,
        read: statusStats.read || 0,
        replied: statusStats.replied || 0,
        archived: statusStats.archived || 0
      }
    });
    
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
