import connectDB from '@/lib/mongodb';
import { BlogModel, SolutionModel } from '@/models';
import { blogPosts } from '@/data/blog';
import { solutions } from '@/data/solutions';

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await BlogModel.deleteMany({});
    await SolutionModel.deleteMany({});
    console.log('Cleared existing data');

    // Seed blog posts
    console.log('Seeding blog posts...');
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
      console.log(`Seeded blog post: ${post.title}`);
    }

    // Seed solutions
    console.log('Seeding solutions...');
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
      console.log(`Seeded solution: ${solution.title}`);
    }

    console.log('Database seeding completed successfully!');
    console.log(`Seeded ${blogPosts.length} blog posts and ${solutions.length} solutions`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };