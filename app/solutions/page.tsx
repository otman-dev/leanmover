'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { solutions, getIndustries } from '@/data/solutions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiSearch, HiFilter, HiChip, HiSortDescending } from 'react-icons/hi';

export default function SolutionsPage() {
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
      solution.challenge.toLowerCase().includes(searchLower) ||
      solution.solution.toLowerCase().includes(searchLower) ||
      solution.industry.toLowerCase().includes(searchLower) ||
      solution.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
      solution.results.some(result => result.toLowerCase().includes(searchLower))
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
                      Études de Cas & Réalisations
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Nos Solutions
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        & Réalisations
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Découvrez comment nous avons accompagné nos clients vers le succès avec des solutions innovantes et sur-mesure
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#solutions"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Voir nos réalisations
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Démarrer un projet
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
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">📊</div>
                        <div className="text-lg sm:text-xl font-semibold">Succès</div>
                        <div className="text-sm text-blue-200">Clients</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">ROI+</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-xs text-center">Résultats<br/>Prouvés</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section id="solutions" className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Trouvez Votre Solution Idéale
                </h2>
                <p className="text-gray-600 text-base sm:text-lg px-4 sm:px-0">
                  Explorez nos études de cas et découvrez comment nous transformons les défis en succès
                </p>
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
                  placeholder="Rechercher par industrie, technologie..."
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
                  {filteredSolutions.length === solutions.length
                    ? `${filteredSolutions.length} solutions disponibles`
                    : `${filteredSolutions.length} solutions trouvées`
                  }
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {filteredSolutions.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aucune solution trouvée
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm 
                      ? `Aucune solution ne correspond à "${searchTerm}"`
                      : 'Aucune solution disponible'
                    }
                  </p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Voir toutes les solutions
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{filteredSolutions.map((solution) => (
                  <Link key={solution.id} href={`/solutions/${solution.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 h-full cursor-pointer group transform hover:-translate-y-2">
                      {solution.imageUrl ? (
                        <div className="aspect-[16/8] bg-gradient-to-br from-blue-500 to-blue-700 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-white/90 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                              Étude de cas
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[16/8] bg-gradient-to-br from-blue-500 to-blue-700 relative flex items-center justify-center">
                          <div className="text-4xl text-white/80">📈</div>
                          <div className="absolute top-3 right-3">
                            <span className="bg-white/90 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                              Étude de cas
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold border border-blue-200">
                            {solution.industry}
                          </span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-xs text-gray-600 font-medium">
                            {solution.results.length} résultats
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                          {solution.title}
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-2">
                          {solution.shortDescription}
                        </p>
                        
                        {/* Key Results Preview */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                            <HiCheckCircle className="w-4 h-4 text-green-500" />
                            Résultats clés:
                          </h3>
                          <ul className="space-y-1">
                            {solution.results.slice(0, 1).map((result, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                <span className="text-xs">
                                  {result.metric}: <strong>{result.value}</strong>
                                </span>
                              </li>
                            ))}
                            {solution.results.length > 1 && (
                              <li className="text-xs text-blue-600 font-medium">
                                +{solution.results.length - 1} autres résultats
                              </li>
                            )}
                          </ul>
                        </div>

                        {/* Technologies Used */}
                        {solution.technologies && solution.technologies.length > 0 && (
                          <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                              {solution.technologies.slice(0, 3).map((tech, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  {tech.name}
                                </span>
                              ))}
                              {solution.technologies.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                                  +{solution.technologies.length - 3} autres
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                            Lire l'étude complète
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                          <div className="text-right text-sm text-gray-500">
                            <div className="font-medium">ROI prouvé</div>
                            <div className="text-xs">Résultats mesurables</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  Votre Projet, Notre Expertise
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Rejoignez nos clients satisfaits et découvrez comment nous pouvons transformer vos défis en succès
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
                  >
                    Démarrer un projet
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Voir nos services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
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
