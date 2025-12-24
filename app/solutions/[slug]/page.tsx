import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { generateMetadata as genMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { getSolutionBySlug, getAllSolutionSlugs } from '@/data/solutions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiChip } from 'react-icons/hi';

interface SolutionPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllSolutionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = getSolutionBySlug(params.slug);
  
  if (!solution) {
    return {};
  }

  return genMetadata({
    title: solution.title,
    description: solution.metaDescription,
    keywords: [solution.industry, ...solution.technologies],
    path: `/solutions/${solution.slug}`,
    image: solution.imageUrl
  });
}

export default function SolutionPage({ params }: SolutionPageProps) {
  const solution = getSolutionBySlug(params.slug);

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
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
                {solution.industry}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {solution.title}
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                {solution.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Le Défi
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {solution.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  Notre Solution
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {solution.solution}
                </p>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Résultats Obtenus
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {solution.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3 bg-green-50 p-4 rounded-lg">
                      <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Technologies Utilisées
                </h2>
                <div className="flex flex-wrap gap-3">
                  {solution.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold"
                    >
                      <HiChip className="w-5 h-5" />
                      {tech}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-10 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  Un Projet Similaire ?
                </h3>
                <p className="text-lg text-blue-100 mb-8">
                  Nos experts sont prêts à vous accompagner dans votre projet
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Contactez-nous
                  </Link>
                  <Link
                    href="/solutions"
                    className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Voir d'autres projets
                  </Link>
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
