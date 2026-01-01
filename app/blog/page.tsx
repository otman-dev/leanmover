import type { Metadata } from 'next';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata();

async function fetchBlogPosts() {
  try {
    // During build time or when server isn't available, return fallback data
    if (typeof window === 'undefined' && (!global.fetch || process.env.NODE_ENV === 'production')) {
      return [];
    }
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/blog`, {
      next: { revalidate: 1800 } // Revalidate every 30 minutes
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();
  return <BlogPageClient blogPosts={blogPosts} />;
}