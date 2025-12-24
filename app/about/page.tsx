import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/structuredData';
import { companyInfo } from '@/data/company';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiLightningBolt, HiUsers, HiTrendingUp } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'À Propos',
  description: 'Découvrez Leanmover, votre partenaire pour la transformation digitale industrielle au Maroc. Expertise, innovation et engagement qualité.',
  keywords: ['Leanmover', 'à propos', 'entreprise', 'Maroc', 'industrie', 'transformation digitale'],
  path: '/about'
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'À Propos', url: '/about' }
  ]);
  
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                À Propos de Leanmover
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed">
                {companyInfo.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Chez Leanmover, nous accompagnons les entreprises industrielles dans leur transformation 
                  digitale en intégrant les technologies de pointe de l'Industrie 4.0. Notre mission est de 
                  concevoir des solutions sur-mesure qui optimisent les processus industriels et logistiques 
                  tout en garantissant performance, qualité et durabilité.
                </p>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Notre Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Être le partenaire de référence au Maroc et en Afrique pour la transformation digitale 
                  industrielle, en proposant des solutions innovantes et en maintenant les plus hauts 
                  standards de qualité et de service client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                    {companyInfo.stats.yearsExperience}+
                  </div>
                  <div className="text-gray-700">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                    {companyInfo.stats.projectsCompleted}+
                  </div>
                  <div className="text-gray-700">Projets réalisés</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                    {companyInfo.stats.happyClients}+
                  </div>
                  <div className="text-gray-700">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">
                    {companyInfo.stats.awards}+
                  </div>
                  <div className="text-gray-700">Reconnaissances</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
                Nos Valeurs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <HiCheckCircle className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    Nous visons l'excellence dans chaque projet, en maintenant les plus hauts standards de qualité.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <HiLightningBolt className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    Nous intégrons les technologies les plus avancées pour des solutions d'avenir.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <HiUsers className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    Nous travaillons en étroite collaboration avec nos clients pour leur réussite.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <HiTrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Performance</h3>
                  <p className="text-gray-600">
                    Nous optimisons vos processus pour maximiser votre performance industrielle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-10 sm:p-12 text-center shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Travaillons Ensemble
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                Discutons de votre projet et découvrez comment nous pouvons vous accompagner.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
              >
                Contactez-nous
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
