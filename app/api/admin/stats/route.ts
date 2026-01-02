import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel, SolutionModel, ContactModel } from '@/models';

export async function GET() {
  try {
    await connectDB();
    
    // Get all counts from MongoDB
    const totalBlogs = await BlogModel.countDocuments();
    const totalSolutions = await SolutionModel.countDocuments();
    const totalContacts = await ContactModel.countDocuments();

    // Count recent contacts (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentContacts = await ContactModel.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Get contact status breakdown for additional insights
    const contactStats = await ContactModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert to object for easier access
    const statusBreakdown = contactStats.reduce((acc: any, stat: any) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    // Get monthly data for the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // Aggregate blog data by month
    const blogMonthlyData = await BlogModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Aggregate solution data by month
    const solutionMonthlyData = await SolutionModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Aggregate contact data by month
    const contactMonthlyData = await ContactModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Create monthly chart data for the last 6 months
    const monthlyChartData = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const monthName = monthNames[date.getMonth()];

      // Find data for this month
      const blogCount = blogMonthlyData.find(item => 
        item._id.year === year && item._id.month === month
      )?.count || 0;

      const solutionCount = solutionMonthlyData.find(item => 
        item._id.year === year && item._id.month === month
      )?.count || 0;

      const contactCount = contactMonthlyData.find(item => 
        item._id.year === year && item._id.month === month
      )?.count || 0;

      monthlyChartData.push({
        name: monthName,
        blogs: blogCount,
        solutions: solutionCount,
        contacts: contactCount,
        year: year,
        month: month
      });
    }

    return NextResponse.json({
      totalBlogs,
      totalSolutions,
      totalContacts,
      recentContacts,
      contactStatusBreakdown: {
        new: statusBreakdown.new || 0,
        read: statusBreakdown.read || 0,
        replied: statusBreakdown.replied || 0,
        archived: statusBreakdown.archived || 0,
      },
      monthlyChartData
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      {
        totalBlogs: 0,
        totalSolutions: 0,
        totalContacts: 0,
        recentContacts: 0,
        contactStatusBreakdown: {
          new: 0,
          read: 0,
          replied: 0,
          archived: 0,
        },
        monthlyChartData: []
      },
      { status: 200 }
    );
  }
}
