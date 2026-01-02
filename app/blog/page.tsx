import type { Metadata } from 'next';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata();

async function fetchBlogPosts() {
  try {
    // In production, connect directly to the database to avoid build-time API issues
    if (process.env.NODE_ENV === 'production') {
      const connectDB = (await import('@/lib/mongodb')).default;
      const { BlogModel } = await import('@/models');
      
      await connectDB();
      const posts = await BlogModel.find({}).sort({ publishedAt: -1 });
      return JSON.parse(JSON.stringify(posts)); // Serialize for Next.js
    }
    
    // In development, use API calls
    const response = await fetch('http://localhost:3000/api/admin/blog', {
      next: { revalidate: 1800 } // Revalidate every 30 minutes
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.status, response.statusText);
      return [];
    }
    
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