import type { Metadata } from 'next';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { generateBlogMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateBlogMetadata();

async function fetchBlogPosts() {
  try {
    // Always use direct database connection for better reliability
    const connectDB = (await import('@/lib/mongodb')).default;
    const { BlogModel } = await import('@/models');
    
    await connectDB();
    const posts = await BlogModel.find({}).sort({ publishedAt: -1 });
    return JSON.parse(JSON.stringify(posts)); // Serialize for Next.js
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // In case of database issues, return empty array to prevent page crash
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await fetchBlogPosts();
  return <BlogPageClient blogPosts={blogPosts} />;
}