import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { solutions, getIndustries } from '@/data/solutions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'Nos Solutions & Réalisations',
  description: 'Découvrez nos projets et études de cas dans différents secteurs : automobile, pharmaceutique, textile, agroalimentaire.',
  keywords: ['études de cas', 'réalisations', 'projets', 'solutions industrielles'],
  path: '/solutions'
});

export default function SolutionsPage() {
  const industries = getIndustries();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Solutions', url: '/solutions' }
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
                Nos Solutions & Réalisations
              </h1>
              <p className="text-lg sm:text-xl text-blue-100">
                Découvrez comment nous avons accompagné nos clients vers le succès
              </p>
            </div>
          </div>
        </section>

        {/* Industries Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold">
                  Tous les secteurs
                </button>
                {industries.map((industry) => (
                  <button
                    key={industry}
                    className="px-6 py-2 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {solutions.map((solution) => (
                  <Link key={solution.id} href={`/solutions/${solution.slug}`}>
                    <article className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full cursor-pointer group">
                      {solution.imageUrl && (
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-700"></div>
                      )}
                      <div className="p-8">
                        <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                          {solution.industry}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {solution.title}
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {solution.shortDescription}
                        </p>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">Résultats clés:</h3>
                          <ul className="space-y-2">
                            {solution.results.slice(0, 3).map((result, index) => (
                              <li key={index} className="flex items-start gap-2 text-gray-700">
                                <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span>{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6 text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                          Lire l'étude de cas
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-10 text-center shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Votre Projet, Notre Expertise
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                Parlons de vos défis et trouvons ensemble les solutions adaptées
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                Démarrer un projet
              </Link>
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
