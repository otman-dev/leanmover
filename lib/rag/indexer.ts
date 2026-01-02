import connectDB from '../mongodb';
import { VectorContentModel } from '../../models/VectorContent';
import { generateEmbedding } from '../embeddings';
import { chunkStructuredContent, chunkFAQs, createSingleChunk } from '../text-chunker';

// Import all data sources
import { services } from '../../data/services';
import { companyInfo } from '../../data/company';
import { certifications } from '../../data/certifications';
import { testimonials } from '../../data/testimonials';
import { heroSlides } from '../../data/hero-slides';
import { generalFAQs } from '../../data/general-faqs';
import { legalContent } from '../../data/legal-content';
import { BlogModel, SolutionModel } from '../../models';

interface IndexingStats {
  total: number;
  success: number;
  failed: number;
  byType: Record<string, number>;
  duration: number;
}

/**
 * Index all content sources into the vector database
 * This includes: services, company info, certifications, testimonials, FAQs, legal content, and dynamic content (blog, solutions)
 */
export async function indexAllContent(): Promise<IndexingStats> {
  const startTime = Date.now();
  const stats: IndexingStats = {
    total: 0,
    success: 0,
    failed: 0,
    byType: {},
    duration: 0
  };

  console.log('🚀 Starting content indexing...\n');

  try {
    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Index each content type (skip hero slides - not useful for RAG)
    await indexServices(stats);
    await indexCompanyInfo(stats);
    await indexCertifications(stats);
    await indexTestimonials(stats);
    // await indexHeroSlides(stats); // SKIPPED - Not useful for chatbot
    await indexGeneralFAQs(stats);
    await indexLegalContent(stats);
    await indexBlogPosts(stats);
    await indexSolutions(stats);

    stats.duration = Date.now() - startTime;

    console.log('\n✨ Indexing completed!');
    console.log(`📊 Total: ${stats.total} items`);
    console.log(`✅ Success: ${stats.success}`);
    console.log(`❌ Failed: ${stats.failed}`);
    console.log(`⏱️  Duration: ${(stats.duration / 1000).toFixed(2)}s`);
    console.log('\n📈 By content type:');
    Object.entries(stats.byType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count}`);
    });

    return stats;
  } catch (error) {
    console.error('❌ Error during indexing:', error);
    throw error;
  }
}

/**
 * Index services with their sections and FAQs
 */
async function indexServices(stats: IndexingStats) {
  console.log('📦 Indexing services...');

  for (const service of services) {
    try {
      // Create sections array for chunking
      const sections = [
        { content: service.shortDescription },
        { content: service.fullDescription },
        ...(service.sections || []).map(s => ({ title: s.title, content: s.content }))
      ];

      // Chunk service content
      const chunks = chunkStructuredContent(service.title, sections, 500);

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const embedding = await generateEmbedding(chunk.text);

        await VectorContentModel.findOneAndUpdate(
          { contentId: `service-${service.slug}-chunk-${i}` },
          {
            $set: {
              contentId: `service-${service.slug}-chunk-${i}`,
              contentType: 'service',
              title: service.title,
              text: chunk.text,
              embedding,
              metadata: {
                slug: service.slug,
                category: 'service',
                keywords: service.features,
                language: 'fr'
              },
              source: `/services/${service.slug}`
            }
          },
          { upsert: true, new: true }
        );

        stats.total++;
        stats.success++;
        stats.byType['service'] = (stats.byType['service'] || 0) + 1;
      }

      // Index FAQs separately
      if (service.faqs && service.faqs.length > 0) {
        const faqChunks = chunkFAQs(service.title, service.faqs, 5);

        for (let i = 0; i < faqChunks.length; i++) {
          const chunk = faqChunks[i];
          const embedding = await generateEmbedding(chunk.text);

          await VectorContentModel.findOneAndUpdate(
            { contentId: `service-faq-${service.slug}-chunk-${i}` },
            {
              $set: {
                contentId: `service-faq-${service.slug}-chunk-${i}`,
                contentType: 'faq',
                title: `FAQ - ${service.title}`,
                text: chunk.text,
                embedding,
                metadata: {
                  slug: service.slug,
                  category: service.title,
                  keywords: ['faq', ...service.features],
                  language: 'fr'
                },
                source: `/services/${service.slug}#faq`
              }
            },
            { upsert: true, new: true }
          );

          stats.total++;
          stats.success++;
          stats.byType['faq'] = (stats.byType['faq'] || 0) + 1;
        }
      }

      console.log(`  ✓ Indexed service: ${service.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to index service: ${service.title}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index company information
 */
async function indexCompanyInfo(stats: IndexingStats) {
  console.log('🏢 Indexing company information...');

  try {
    const companyText = `
${companyInfo.name} - ${companyInfo.tagline}

${companyInfo.description}

Contact:
Email: ${companyInfo.email}
Téléphone: ${companyInfo.phone}
Site web: ${companyInfo.website}

Adresse:
${companyInfo.address.street}
${companyInfo.address.city}, ${companyInfo.address.region}
${companyInfo.address.country}

Horaires:
${companyInfo.businessHours.weekdays}
${companyInfo.businessHours.weekend}

Chiffres clés:
- ${companyInfo.stats.yearsExperience}+ années d'expérience
- ${companyInfo.stats.projectsCompleted}+ projets réalisés
- ${companyInfo.stats.happyClients}+ clients satisfaits
`.trim();

    const chunk = createSingleChunk(companyInfo.name, companyText);
    const embedding = await generateEmbedding(chunk.text);

    await VectorContentModel.findOneAndUpdate(
      { contentId: 'company-info' },
      {
        $set: {
          contentId: 'company-info',
          contentType: 'company',
          title: companyInfo.name,
          text: chunk.text,
          embedding,
          metadata: {
            category: 'company',
            keywords: companyInfo.seo.keywords,
            language: 'fr'
          },
          source: '/about'
        }
      },
      { upsert: true, new: true }
    );

    stats.total++;
    stats.success++;
    stats.byType['company'] = (stats.byType['company'] || 0) + 1;
    console.log('  ✓ Indexed company information');
  } catch (error) {
    console.error('  ✗ Failed to index company information', error);
    stats.failed++;
  }
}

/**
 * Index certifications
 */
async function indexCertifications(stats: IndexingStats) {
  console.log('🏆 Indexing certifications...');

  for (const cert of certifications) {
    try {
      const certText = `
${cert.name}

${cert.description}
${cert.scope ? `Domaine d'application: ${cert.scope}` : ''}
${cert.registrationNumber ? `Numéro d'enregistrement: ${cert.registrationNumber}` : ''}
${cert.validUntil ? `Valide jusqu'à: ${cert.validUntil}` : ''}
`.trim();

      const chunk = createSingleChunk(cert.name, certText);
      const embedding = await generateEmbedding(chunk.text);

      await VectorContentModel.findOneAndUpdate(
        { contentId: `certification-${cert.name.toLowerCase().replace(/\s+/g, '-')}` },
        {
          $set: {
            contentId: `certification-${cert.name.toLowerCase().replace(/\s+/g, '-')}`,
            contentType: 'certification',
            title: cert.name,
            text: chunk.text,
            embedding,
            metadata: {
              category: 'quality',
              keywords: ['certification', 'iso', 'qualité'],
              language: 'fr'
            },
            source: '/certifications'
          }
        },
        { upsert: true, new: true }
      );

      stats.total++;
      stats.success++;
      stats.byType['certification'] = (stats.byType['certification'] || 0) + 1;
      console.log(`  ✓ Indexed certification: ${cert.name}`);
    } catch (error) {
      console.error(`  ✗ Failed to index certification: ${cert.name}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index testimonials
 */
async function indexTestimonials(stats: IndexingStats) {
  console.log('💬 Indexing testimonials...');

  for (const testimonial of testimonials) {
    try {
      const testimonialText = `
Témoignage client - ${testimonial.name}, ${testimonial.position} chez ${testimonial.company}

"${testimonial.content}"

${testimonial.industry ? `Secteur: ${testimonial.industry}` : ''}
${testimonial.projectType ? `Type de projet: ${testimonial.projectType}` : ''}
Note: ${testimonial.rating}/5
`.trim();

      const chunk = createSingleChunk('Témoignage Client', testimonialText);
      const embedding = await generateEmbedding(chunk.text);

      await VectorContentModel.findOneAndUpdate(
        { contentId: `testimonial-${testimonial.id}` },
        {
          $set: {
            contentId: `testimonial-${testimonial.id}`,
            contentType: 'testimonial',
            title: `Témoignage - ${testimonial.company}`,
            text: chunk.text,
            embedding,
            metadata: {
              category: 'testimonial',
              industry: testimonial.industry,
              keywords: ['témoignage', 'client', 'avis', testimonial.projectType || ''],
              language: 'fr'
            },
            source: '/about#testimonials'
          }
        },
        { upsert: true, new: true }
      );

      stats.total++;
      stats.success++;
      stats.byType['testimonial'] = (stats.byType['testimonial'] || 0) + 1;
      console.log(`  ✓ Indexed testimonial: ${testimonial.company}`);
    } catch (error) {
      console.error(`  ✗ Failed to index testimonial: ${testimonial.company}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index hero slides
 */
async function indexHeroSlides(stats: IndexingStats) {
  console.log('🎯 Indexing hero slides...');

  for (const slide of heroSlides) {
    try {
      const slideText = `
${slide.title}

${slide.subtitle}

${slide.description}
`.trim();

      const chunk = createSingleChunk('Leanmover', slideText);
      const embedding = await generateEmbedding(chunk.text);

      await VectorContentModel.findOneAndUpdate(
        { contentId: `hero-${slide.id}` },
        {
          $set: {
            contentId: `hero-${slide.id}`,
            contentType: 'hero',
            title: slide.title,
            text: chunk.text,
            embedding,
            metadata: {
              category: 'homepage',
              keywords: ['leanmover', 'industrie 4.0', 'transformation digitale'],
              language: 'fr'
            },
            source: '/'
          }
        },
        { upsert: true, new: true }
      );

      stats.total++;
      stats.success++;
      stats.byType['hero'] = (stats.byType['hero'] || 0) + 1;
      console.log(`  ✓ Indexed hero slide: ${slide.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to index hero slide: ${slide.title}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index general FAQs
 */
async function indexGeneralFAQs(stats: IndexingStats) {
  console.log('❓ Indexing general FAQs...');

  // Group FAQs by category
  const faqsByCategory = generalFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof generalFAQs>);

  for (const [category, faqs] of Object.entries(faqsByCategory)) {
    try {
      const faqsFormatted = faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }));

      const faqChunks = chunkFAQs(`FAQ - ${category}`, faqsFormatted, 3);

      for (let i = 0; i < faqChunks.length; i++) {
        const chunk = faqChunks[i];
        const embedding = await generateEmbedding(chunk.text);

        await VectorContentModel.findOneAndUpdate(
          { contentId: `general-faq-${category}-chunk-${i}` },
          {
            $set: {
              contentId: `general-faq-${category}-chunk-${i}`,
              contentType: 'faq',
              title: `FAQ - ${category}`,
              text: chunk.text,
              embedding,
              metadata: {
                category,
                keywords: ['faq', category, ...faqs.flatMap(f => f.keywords || [])],
                language: 'fr'
              },
              source: '/faq'
            }
          },
          { upsert: true, new: true }
        );

        stats.total++;
        stats.success++;
        stats.byType['faq'] = (stats.byType['faq'] || 0) + 1;
      }

      console.log(`  ✓ Indexed FAQ category: ${category} (${faqs.length} FAQs)`);
    } catch (error) {
      console.error(`  ✗ Failed to index FAQ category: ${category}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index legal content
 */
async function indexLegalContent(stats: IndexingStats) {
  console.log('⚖️  Indexing legal content...');

  for (const legal of legalContent) {
    try {
      const chunk = createSingleChunk(legal.title, legal.content);
      const embedding = await generateEmbedding(chunk.text);

      await VectorContentModel.findOneAndUpdate(
        { contentId: `legal-${legal.id}` },
        {
          $set: {
            contentId: `legal-${legal.id}`,
            contentType: 'legal',
            title: legal.title,
            text: chunk.text,
            embedding,
            metadata: {
              category: legal.category,
              keywords: ['légal', 'confidentialité', 'mentions légales'],
              language: 'fr'
            },
            source: legal.category === 'mentions-legales' ? '/mentions-legales' : '/politique-confidentialite'
          }
        },
        { upsert: true, new: true }
      );

      stats.total++;
      stats.success++;
      stats.byType['legal'] = (stats.byType['legal'] || 0) + 1;
      console.log(`  ✓ Indexed legal content: ${legal.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to index legal content: ${legal.title}`, error);
      stats.failed++;
    }
  }
}

/**
 * Index blog posts from database
 */
async function indexBlogPosts(stats: IndexingStats) {
  console.log('📰 Indexing blog posts...');

  try {
    const blogPosts = await BlogModel.find({ status: 'published' });

    for (const post of blogPosts) {
      try {
        const blogText = `
${post.title}

${post.excerpt}

${post.content}

Catégorie: ${post.category}
Auteur: ${post.author}
`.trim();

        const chunk = createSingleChunk(post.title, blogText);
        const embedding = await generateEmbedding(chunk.text);

        await VectorContentModel.findOneAndUpdate(
          { contentId: `blog-${post.slug}` },
          {
            $set: {
              contentId: `blog-${post.slug}`,
              contentType: 'blog',
              title: post.title,
              text: chunk.text,
              embedding,
              metadata: {
                slug: post.slug,
                category: post.category,
                keywords: post.keywords || [],
                author: post.author,
                language: 'fr'
              },
              source: `/blog/${post.slug}`
            }
          },
          { upsert: true, new: true }
        );

        stats.total++;
        stats.success++;
        stats.byType['blog'] = (stats.byType['blog'] || 0) + 1;
        console.log(`  ✓ Indexed blog post: ${post.title}`);
      } catch (error) {
        console.error(`  ✗ Failed to index blog post: ${post.title}`, error);
        stats.failed++;
      }
    }

    if (blogPosts.length === 0) {
      console.log('  ℹ️  No published blog posts found');
    }
  } catch (error) {
    console.error('  ✗ Failed to fetch blog posts', error);
  }
}

/**
 * Index solutions from database
 */
async function indexSolutions(stats: IndexingStats) {
  console.log('💡 Indexing solutions...');

  try {
    const solutions = await SolutionModel.find({ status: { $in: ['published', 'featured'] } });

    for (const solution of solutions) {
      try {
        const resultsText = solution.results
          .map((r: any) => `${r.metric}: ${r.value} - ${r.description}`)
          .join('\n');

        const techText = solution.technologies
          .map((t: any) => `${t.name} (${t.category}): ${t.description || ''}`)
          .join('\n');

        const solutionText = `
${solution.title}

Secteur: ${solution.industry}
Client: ${solution.client.name || 'Confidentiel'} - ${solution.client.sector}

Défi:
${solution.challenge}

Solution apportée:
${solution.solution}

Résultats obtenus:
${resultsText}

Technologies utilisées:
${techText}
`.trim();

        const chunk = createSingleChunk(solution.title, solutionText);
        const embedding = await generateEmbedding(chunk.text);

        await VectorContentModel.findOneAndUpdate(
          { contentId: `solution-${solution.slug}` },
          {
            $set: {
              contentId: `solution-${solution.slug}`,
              contentType: 'solution',
              title: solution.title,
              text: chunk.text,
              embedding,
              metadata: {
                slug: solution.slug,
                category: solution.industry,
                industry: solution.industry,
                keywords: solution.keywords || [],
                language: 'fr'
              },
              source: `/solutions/${solution.slug}`
            }
          },
          { upsert: true, new: true }
        );

        stats.total++;
        stats.success++;
        stats.byType['solution'] = (stats.byType['solution'] || 0) + 1;
        console.log(`  ✓ Indexed solution: ${solution.title}`);
      } catch (error) {
        console.error(`  ✗ Failed to index solution: ${solution.title}`, error);
        stats.failed++;
      }
    }

    if (solutions.length === 0) {
      console.log('  ℹ️  No published solutions found');
    }
  } catch (error) {
    console.error('  ✗ Failed to fetch solutions', error);
  }
}

/**
 * Delete all vectors of a specific content type
 */
export async function deleteVectorsByType(contentType: string): Promise<number> {
  await connectDB();
  const result = await VectorContentModel.deleteMany({ contentType });
  return result.deletedCount || 0;
}

/**
 * Get statistics about indexed content
 */
export async function getIndexingStats() {
  await connectDB();
  const stats = await VectorContentModel.aggregate([
    {
      $group: {
        _id: '$contentType',
        count: { $sum: 1 }
      }
    },
    {
      $sort: { count: -1 }
    }
  ]);

  const total = await VectorContentModel.countDocuments();

  return {
    total,
    byType: stats.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {} as Record<string, number>)
  };
}
