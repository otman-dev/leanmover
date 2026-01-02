import { MetadataRoute } from 'next';
import { companyInfo } from '@/data/company';
import { getAllServiceSlugs } from '@/data/services';

async function getSlugsFromDatabase(): Promise<{ blogSlugs: string[], solutionSlugs: string[] }> {
  try {
    // During build time or when server isn't available, return fallback data
    if (typeof window === 'undefined' && (!global.fetch || process.env.NODE_ENV === 'production')) {
      return { blogSlugs: [], solutionSlugs: [] };
    }
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/sitemap`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) throw new Error('Failed to fetch');
    return await response.json();
  } catch (error) {
    // Silently return fallback during build time
    if (process.env.NODE_ENV === 'production' || !process.env.MONGODB_URI) {
      return { blogSlugs: [], solutionSlugs: [] };
    }
    console.error('Error fetching sitemap data:', error);
    return { blogSlugs: [], solutionSlugs: [] };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = companyInfo.website;
  const serviceSlugs = getAllServiceSlugs();
  const { blogSlugs, solutionSlugs }: { blogSlugs: string[], solutionSlugs: string[] } = await getSlugsFromDatabase();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/certifications`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  // Service pages
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Solution pages
  const solutionPages = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...solutionPages];
}
