import type { Metadata } from 'next';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata();

export default function BlogPage() {
  return <BlogPageClient />;
}