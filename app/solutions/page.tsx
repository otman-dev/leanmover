import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

async function fetchSolutions() {
  try {
    // Always use direct database connection for better reliability
    const connectDB = (await import('@/lib/mongodb')).default;
    const { SolutionModel } = await import('@/models');
    
    await connectDB();
    const solutions = await SolutionModel.find({}).sort({ publishedAt: -1 });
    return JSON.parse(JSON.stringify(solutions)); // Serialize for Next.js
  } catch (error) {
    console.error('Error fetching solutions:', error);
    // In case of database issues, return empty array to prevent page crash
    return [];
  }
}

export default async function SolutionsPage() {
  const solutions = await fetchSolutions();
  return <SolutionsPageClient solutions={solutions} />;
}
