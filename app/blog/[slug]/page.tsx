import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as genMetadata } from '@/lib/metadata';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiClock, HiUser, HiTag, HiCalendar, HiEye, HiShare, HiBookmark, HiArrowLeft, HiArrowRight } from 'react-icons/hi';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function fetchBlogPostBySlug(slug: string) {
  try {
    // During build time or when server isn't available, return fallback data
    if (typeof window === 'undefined' && (!global.fetch || process.env.NODE_ENV === 'production')) {
      return null;
    }
    
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/blog`, {
      next: { revalidate: 1800 } // Revalidate every 30 minutes
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data.articles?.find((post: any) => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function fetchAllBlogPosts() {
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

export async function generateStaticParams() {
  const posts = await fetchAllBlogPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  
  if (!post) {
    return {};
  }

  return genMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    path: `/blog/${post.slug}`,
    image: post.imageUrl
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.imageUrl,
    url: `/blog/${post.slug}`
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white pt-24 pb-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-blue-200 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-white">{post.title}</span>
              </div>

              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 border border-white/30">
                <HiTag className="w-4 h-4" />
                {post.category}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-blue-200">
                <div className="flex items-center gap-2">
                  <HiUser className="w-5 h-5" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiCalendar className="w-5 h-5" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiClock className="w-5 h-5" />
                  <span>{post.readingTime} min de lecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiEye className="w-5 h-5" />
                  <span>1,247 vues</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Featured Image */}
                  {post.imageUrl && (
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-12 overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-6xl mb-4">📖</div>
                          <div className="text-lg font-semibold">Image de l'article</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Article Body */}
                  <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200">
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
                        {post.content.split('\n\n').map((paragraph: string, index: number) => (
                          <p key={index} className="mb-6 leading-8">{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t-2 border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <HiTag className="w-5 h-5 text-blue-600" />
                        Mots-clés de l'article
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {post.tags?.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-semibold border-2 border-blue-100 hover:border-blue-300 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                    >
                      <HiArrowLeft className="w-5 h-5" />
                      Retour au blog
                    </Link>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="space-y-8 sticky top-8">
                    
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-semibold">
                          <HiBookmark className="w-5 h-5" />
                          Sauvegarder
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-semibold">
                          <HiShare className="w-5 h-5" />
                          Partager
                        </button>
                      </div>
                    </div>

                    {/* Article Stats */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Statistiques</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Temps de lecture</span>
                          <span className="font-bold text-blue-600">{post.readingTime} min</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Vues</span>
                          <span className="font-bold text-green-600">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Partages</span>
                          <span className="font-bold text-purple-600">42</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Catégorie</span>
                          <span className="font-bold text-gray-900">{post.category}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold mb-3">Une question ?</h3>
                      <p className="text-blue-100 mb-4 text-sm">
                        Nos experts sont là pour vous conseiller
                      </p>
                      <Link
                        href="/contact"
                        className="block w-full bg-white text-blue-600 px-4 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                      >
                        Nous contacter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Besoin d'accompagnement pour votre projet ?
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8">
                    Contactez nos experts pour discuter de vos besoins en transformation industrielle
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      <HiUser className="w-5 h-5" />
                      Contactez-nous
                    </Link>
                    <Link
                      href="/blog"
                      className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      <HiBookmark className="w-5 h-5" />
                      Plus d'articles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
