import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

async function fetchSolutions() {
  try {
    // During build time, skip API calls that depend on database
    if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
      return [];
    }
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/solutions`, {
      next: { revalidate: 1800 } // Revalidate every 30 minutes
    });
    if (!response.ok) throw new Error('Failed to fetch');
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
