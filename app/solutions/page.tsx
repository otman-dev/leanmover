import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

async function fetchSolutions() {
  try {
    // In production, connect directly to the database to avoid build-time API issues
    if (process.env.NODE_ENV === 'production') {
      const connectDB = (await import('@/lib/mongodb')).default;
      const { SolutionModel } = await import('@/models');
      
      await connectDB();
      const solutions = await SolutionModel.find({}).sort({ publishedAt: -1 });
      return JSON.parse(JSON.stringify(solutions)); // Serialize for Next.js
    }
    
    // In development, use API calls
    const response = await fetch('http://localhost:3000/api/admin/solutions', {
      next: { revalidate: 1800 }, // Revalidate every 30 minutes
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch solutions:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.solutions || [];
  } catch (error) {
    console.error('Error fetching solutions:', error);
    return [];
  }
}

export default async function SolutionsPage() {
  const solutions = await fetchSolutions();
  return <SolutionsPageClient solutions={solutions} />;
}
