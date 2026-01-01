import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

async function fetchSolutions() {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/solutions`, {
      cache: 'no-store'
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
