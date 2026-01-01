'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { blogPosts, getBlogCategories } from '@/data/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiClock, HiUser, HiTag, HiSearch, HiFilter, HiSortDescending } from 'react-icons/hi';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filtered posts - only by search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm) {
      return blogPosts;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.author.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Blog', url: '/blog' }
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white pt-20 sm:pt-24 lg:pt-28 pb-0">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative py-16 sm:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-12 sm:mb-16">
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <span className="inline-block bg-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/30">
                      Expertise & Innovation
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Blog &
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        Actualités
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Conseils d'experts, tendances et innovations pour transformer votre industrie avec les dernières technologies
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#articles"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Découvrir les articles
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Nous suivre
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">📝</div>
                        <div className="text-lg sm:text-xl font-semibold">Expertise</div>
                        <div className="text-sm text-blue-200">Partagée</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-sm">NEW</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xs text-center">Conseils<br/>Expert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section id="articles" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Nos Derniers Articles
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Découvrez nos conseils d'experts, analyses de tendances et retours d'expérience pour optimiser votre industrie
                </p>
              </div>

              {/* Search Section */}
              <div className="mb-8 sm:mb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-0">
                  {/* Header */}
                  <div className="text-center mb-6 sm:mb-8">
                    {/* Header space reserved for future content */}
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                      <HiSearch className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-12 sm:pl-16 pr-12 sm:pr-16 py-4 sm:py-6 border border-gray-200 rounded-xl sm:rounded-2xl text-base sm:text-lg bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md font-medium"
                      placeholder="Rechercher par titre, contenu, tags..."
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute inset-y-0 right-0 pr-4 sm:pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Results Counter */}
                  <div className="text-center mt-3 sm:mt-4">
                    <span className="text-sm text-gray-500">
                      {filteredPosts.length === blogPosts.length
                        ? `${filteredPosts.length} articles disponibles`
                        : `${filteredPosts.length} résultats trouvés`
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Posts Grid */}
              {filteredPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aucun article trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm 
                      ? `Aucun article ne correspond à "${searchTerm}"`
                      : 'Aucun article disponible'
                    }
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Voir tous les articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 h-full cursor-pointer group transform hover:-translate-y-2">
                      {post.imageUrl ? (
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                              <HiClock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {post.category}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700 relative flex items-center justify-center">
                          <div className="text-6xl text-white/80">📚</div>
                          <div className="absolute top-4 right-4">
                            <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                              <HiClock className="w-3 h-3" />
                              {post.readingTime} min
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                            <HiTag className="w-4 h-4" />
                            {post.category}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags Preview */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  #{tag}
                                </span>
                              ))}
                              {post.tags.length > 2 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  +{post.tags.length - 2} autres
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <HiUser className="w-4 h-4" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                            Lire l'article
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                  ))}
                </div>
              )}
              
              {/* Newsletter CTA */}
              <div className="mt-16">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                      Restez informé de nos actualités
                    </h3>
                    <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                      Recevez nos dernières publications, conseils d'experts et analyses de tendances directement dans votre boîte mail
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      S'abonner à la newsletter
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
