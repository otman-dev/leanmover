import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

async function fetchSolutions() {
  try {
    // Determine the base URL based on environment
    let baseUrl;
    if (process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      baseUrl = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    } else if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://leanmover.vercel.app';
    } else {
      baseUrl = 'http://localhost:3000';
    }
    
    const response = await fetch(`${baseUrl}/api/admin/solutions`, {
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
