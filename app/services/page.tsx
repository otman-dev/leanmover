import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { services } from '@/data/services';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/services/ServiceCard';

export const metadata: Metadata = generateMetadata({
  title: 'Nos Services',
  description: 'Découvrez nos services en ingénierie industrielle, automatisation, Industrie 4.0, logistique et warehousing. Solutions sur-mesure pour vos projets au Maroc.',
  keywords: ['services industriels', 'ingénierie', 'automatisation', 'industrie 4.0', 'logistique', 'Maroc'],
  path: '/services'
});

export default function ServicesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Services', url: '/services' }
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
                      Solutions d'Excellence
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Nos Services
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        Industriels
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Solutions complètes pour accompagner votre transformation industrielle et logistique avec expertise et innovation
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#services"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Découvrir nos services
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Demander un devis
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
                        <div className="text-lg sm:text-xl font-semibold">Excellence</div>
                        <div className="text-sm text-blue-200">Industrielle</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-sm">TOP</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xs text-center">Expert<br/>Certifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats bar - now in normal flow */}
          <div className="border-t border-white/20 bg-white/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center max-w-2xl mx-auto">
                <div>
                  <div className="text-2xl font-bold">6+</div>
                  <div className="text-blue-200 text-sm">Services</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-blue-200 text-sm">Projets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-blue-200 text-sm">Années d'expertise</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24h</div>
                  <div className="text-blue-200 text-sm">Réponse</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section id="services" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  id={service.id}
                  slug={service.slug}
                  title={service.title}
                  shortDescription={service.shortDescription}
                  comingSoon={service.comingSoon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Besoin d'une solution personnalisée ?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                Notre équipe d'experts est à votre disposition pour étudier vos besoins spécifiques.
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
    </>
  );
}
