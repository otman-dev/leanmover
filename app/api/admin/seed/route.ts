import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogModel, SolutionModel } from '@/models';
import { blogPosts } from '@/data/blog';
import { solutions } from '@/data/solutions';

export async function POST(request: NextRequest) {
  try {
    // Basic auth check (you can enhance this)
    const authorization = request.headers.get('authorization');
    if (!authorization || authorization !== 'Bearer admin-seed-token') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await BlogModel.deleteMany({});
    await SolutionModel.deleteMany({});
    console.log('Cleared existing data');

    let seededPosts = 0;
    let seededSolutions = 0;

    // Seed blog posts
    for (const post of blogPosts) {
      const blogData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        readTime: `${post.readingTime} min`,
        imageUrl: post.imageUrl,
        metaDescription: post.metaDescription || post.excerpt,
        keywords: post.keywords || [],
        publishedAt: new Date(post.publishedAt),
        status: 'published',
        featured: post.featured || false,
        viewCount: post.viewCount || 0
      };

      const newPost = new BlogModel(blogData);
      await newPost.save();
      seededPosts++;
    }

    // Seed solutions
    for (const solution of solutions) {
      const solutionData = {
        title: solution.title,
        slug: solution.slug,
        industry: solution.industry,
        shortDescription: solution.shortDescription,
        client: {
          name: solution.client?.name || 'Client Confidentiel',
          sector: solution.client?.sector || 'Manufacturing',
          size: solution.client?.size || 'large',
          location: solution.client?.location || 'Maroc'
        },
        challenge: solution.challenge,
        solution: solution.solution,
        results: solution.results,
        technologies: solution.technologies,
        timeline: solution.timeline || [
          {
            phase: 'Analyse & Conception',
            duration: '4-6 semaines',
            description: 'Étude des besoins et conception de la solution'
          },
          {
            phase: 'Implémentation',
            duration: '8-12 semaines',
            description: 'Développement et déploiement de la solution'
          },
          {
            phase: 'Formation & Support',
            duration: '2-4 semaines',
            description: 'Formation des équipes et mise en place du support'
          }
        ],
        imageUrl: solution.imageUrl,
        gallery: solution.gallery || [],
        metaDescription: solution.metaDescription,
        keywords: solution.keywords || [],
        publishedAt: new Date(solution.publishedAt),
        status: 'published',
        featured: solution.featured || false,
        viewCount: 0,
        downloadCount: 0
      };

      const newSolution = new SolutionModel(solutionData);
      await newSolution.save();
      seededSolutions++;
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      stats: {
        blogPosts: seededPosts,
        solutions: seededSolutions
      }
    });

  } catch (error: any) {
    console.error('Error seeding database:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database',
      details: error.message 
    }, { status: 500 });
  }
}