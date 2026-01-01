import type { Metadata } from 'next';
import SolutionsPageClient from '@/components/solutions/SolutionsPageClient';
import { generateSolutionsMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSolutionsMetadata();

export default function SolutionsPage() {
  return <SolutionsPageClient />;
}
