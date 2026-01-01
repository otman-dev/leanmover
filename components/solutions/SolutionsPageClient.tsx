'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { solutions, getIndustries } from '@/data/solutions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiSearch, HiFilter, HiChip, HiSortDescending } from 'react-icons/hi';

export default function SolutionsPageClient() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Filtered solutions - only by search term
  const filteredSolutions = useMemo(() => {
    if (!searchTerm) {
      return solutions;
    }
    
    const searchLower = searchTerm.toLowerCase();
    return solutions.filter(solution => 
      solution.title.toLowerCase().includes(searchLower) ||
      solution.shortDescription.toLowerCase().includes(searchLower) ||
      solution.industry.toLowerCase().includes(searchLower) ||
      solution.technologies.some(tech => tech.name.toLowerCase().includes(searchLower)) ||
      solution.challenge.toLowerCase().includes(searchLower) ||
      (solution.client?.name || '').toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Solutions', url: '/solutions' }
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
                      Cas d'Usage & Réalisations
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Nos Solutions
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        Industrielles
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Découvrez comment nous avons transformé des industries avec nos solutions d'automatisation, IoT et optimisation
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#solutions"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Explorer les solutions
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Discuter de votre projet
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
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">🏭</div>
                        <div className="text-lg sm:text-xl font-semibold">Solutions</div>
                        <div className="text-sm text-blue-200">Sur Mesure</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-sm">ROI</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xs text-center">Projet<br/>Clés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="solutions" className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <HiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher une solution, industrie, technologie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-lg"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
                
                {/* Search Results Counter */}
                <div className="text-center mt-4">
                  {searchTerm ? (
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">{filteredSolutions.length}</span> solution{filteredSolutions.length !== 1 ? 's' : ''} trouvée{filteredSolutions.length !== 1 ? 's' : ''} 
                      {searchTerm && <span> pour "<span className="font-semibold">{searchTerm}</span>"</span>}
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">{solutions.length}</span> solutions disponibles
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredSolutions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune solution trouvée</h3>
                <p className="text-gray-600 mb-6">Essayez de modifier vos termes de recherche</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Voir toutes les solutions
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSolutions.map((solution) => (
                  <article
                    key={solution.id}
                    className="group bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-4xl mb-2">🏭</div>
                        <div className="text-sm font-medium">{solution.industry}</div>
                      </div>
                      
                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold border border-white/30">
                          <HiChip className="w-3 h-3" />
                          {solution.industry}
                        </span>
                      </div>
                      
                      {/* ROI Badge */}
                      {solution.results.find(result => result.metric.toLowerCase().includes('roi') || result.metric.toLowerCase().includes('retour sur investissement')) && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/90 backdrop-blur-sm text-yellow-800 rounded-full text-xs font-bold">
                            ROI {solution.results.find(result => result.metric.toLowerCase().includes('roi') || result.metric.toLowerCase().includes('retour sur investissement'))?.value}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      {/* Industry badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold border border-blue-200">
                          {solution.industry}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        {solution.client?.name && (
                          <span className="font-medium text-blue-600">{solution.client.name}</span>
                        )}
                        <span className="text-gray-500">{solution.results.length} résultats clés</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link href={`/solutions/${solution.slug}`} className="hover:underline">
                          {solution.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {solution.shortDescription}
                      </p>

                      {/* Key Results Preview */}
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-green-800 text-sm mb-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Résultats obtenus:
                        </h4>
                        <div className="space-y-1">
                          {solution.results.slice(0, 2).map((result, index) => (
                            <div key={index} className="text-sm text-green-700">
                              <span className="font-medium">{result.metric}:</span> <span className="font-bold text-green-600">{result.value}</span>
                            </div>
                          ))}
                          {solution.results.length > 2 && (
                            <div className="text-xs text-green-600">
                              +{solution.results.length - 2} autres résultats
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {solution.technologies.slice(0, 3).map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
                          >
                            {tech.name}
                          </span>
                        ))}
                        {solution.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                            +{solution.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {solution.results.find(result => result.metric.toLowerCase().includes('productivité') || result.metric.toLowerCase().includes('efficiency')) && (
                            <span className="text-sm text-blue-600 font-semibold">
                              ↗ {solution.results.find(result => result.metric.toLowerCase().includes('productivité') || result.metric.toLowerCase().includes('efficiency'))?.value}
                            </span>
                          )}
                        </div>
                        
                        <Link
                          href={`/solutions/${solution.slug}`}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform"
                        >
                          Voir le projet
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Prêt à transformer votre industrie ?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                Discutons de votre projet et découvrons ensemble les opportunités d'optimisation.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                Démarrer un projet
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}