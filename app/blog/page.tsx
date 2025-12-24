import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { blogPosts, getBlogCategories } from '@/data/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiClock, HiUser, HiTag } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'Blog & Actualités',
  description: 'Découvrez nos articles sur l\'Industrie 4.0, la logistique, l\'automatisation et les dernières innovations industrielles.',
  keywords: ['blog', 'actualités', 'industrie 4.0', 'logistique', 'automatisation'],
  path: '/blog'
});

export default function BlogPage() {
  const categories = getBlogCategories();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' }
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Blog & Actualités
              </h1>
              <p className="text-lg sm:text-xl text-blue-100">
                Conseils d'experts, tendances et innovations en Industrie 4.0
              </p>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Categories */}
              <div className="flex flex-wrap gap-3 mb-12">
                <Link
                  href="/blog"
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold"
                >
                  Tous
                </Link>
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                      {post.imageUrl && (
                        <div className="aspect-video bg-gray-200 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
                          <HiTag className="w-4 h-4" />
                          {post.category}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <HiUser className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <HiClock className="w-4 h-4" />
                            {post.readingTime} min
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
