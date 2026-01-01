import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as genMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { getSolutionBySlug, getAllSolutionSlugs } from '@/data/solutions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiChip, HiClock, HiTrendingUp, HiShieldCheck, HiLightBulb } from 'react-icons/hi';

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  
  if (!solution) {
    return {};
  }

  return genMetadata({
    title: solution.title,
    description: solution.metaDescription,
    keywords: [solution.industry, ...solution.technologies.map(tech => tech.name)],
    path: `/solutions/${solution.slug}`,
    image: solution.imageUrl
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Solutions', url: '/solutions' },
    { name: solution.title, url: `/solutions/${solution.slug}` }
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 sm:py-20 pt-28 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 border border-white/30">
                <HiShieldCheck className="w-4 h-4" />
                {solution.industry}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {solution.title}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl">
                {solution.shortDescription}
              </p>
              
              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">
                    {solution.results.length}+
                  </div>
                  <div className="text-blue-200 text-sm">Résultats clés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">
                    {solution.technologies.length}
                  </div>
                  <div className="text-blue-200 text-sm">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">12-18</div>
                  <div className="text-blue-200 text-sm">Mois ROI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold mb-1">100%</div>
                  <div className="text-blue-200 text-sm">Succès</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
              
              {/* Overview Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  {/* Challenge */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-500 rounded-xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                        <HiLightBulb className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Le Défi
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {solution.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <HiChip className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Notre Solution
                      </h2>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {solution.solution}
                    </p>
                  </div>
                </div>

                {/* Side info card */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 sm:p-8 border-2 border-gray-200 sticky top-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <HiClock className="w-6 h-6 text-blue-600" />
                      Informations Projet
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                          Secteur d'activité
                        </div>
                        <div className="text-lg font-bold text-gray-900">{solution.industry}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                          Durée projet
                        </div>
                        <div className="text-lg font-bold text-gray-900">6-12 mois</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                          Équipe projet
                        </div>
                        <div className="text-lg font-bold text-gray-900">8-12 experts</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-1">
                          Technologies
                        </div>
                        <div className="text-lg font-bold text-gray-900">{solution.technologies.length} solutions</div>
                      </div>
                    </div>
                    
                    {/* Contact CTA in sidebar */}
                    <div className="mt-6 pt-6 border-t border-gray-300">
                      <Link
                        href="/contact"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                      >
                        Discuter de votre projet
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results - Enhanced */}
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-3xl p-8 sm:p-12 border border-green-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
                    <HiTrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Résultats Obtenus
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {solution.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-4 bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-lg transition-shadow">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <HiCheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gray-700 font-medium">{result.metric}:</span>
                          <span className="text-green-600 font-bold text-xl">{result.value}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{result.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies - Enhanced */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Technologies & Solutions Utilisées
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {solution.technologies.map((tech, index) => (
                    <div
                      key={`${tech.category}-${tech.name}-${index}`}
                      className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 hover:border-blue-300 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="mb-3">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                          {tech.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <HiChip className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-blue-900 font-bold text-lg">{tech.name}</div>
                          {tech.description && (
                            <div className="text-blue-700 text-sm">{tech.description}</div>
                          )}
                        </div>
                      </div>
                      
                      {/* Tech number badge */}
                      <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Timeline - New Section */}
              <div className="bg-gray-50 rounded-3xl p-8 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Étapes du Projet
                </h2>
                <div className="space-y-6">
                  {[
                    { phase: 'Analyse & Audit', duration: '2-4 semaines', description: 'Étude approfondie des besoins et contraintes existantes' },
                    { phase: 'Conception & Design', duration: '4-6 semaines', description: 'Élaboration de la solution technique et architecturale' },
                    { phase: 'Développement & Tests', duration: '8-12 semaines', description: 'Implémentation et validation de la solution' },
                    { phase: 'Déploiement', duration: '2-4 semaines', description: 'Mise en production et formation des équipes' },
                    { phase: 'Support & Optimisation', duration: 'Continu', description: 'Accompagnement et amélioration continue' }
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{step.phase}</h3>
                          <span className="text-blue-600 font-semibold text-sm">{step.duration}</span>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA - Enhanced */}
              <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                    Un Projet Similaire ?
                  </h3>
                  <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                    Nos experts sont prêts à vous accompagner dans votre projet de transformation industrielle et logistique
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      <HiCheckCircle className="w-5 h-5" />
                      Contactez-nous
                    </Link>
                    <Link
                      href="/solutions"
                      className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      <HiTrendingUp className="w-5 h-5" />
                      Autres projets
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
