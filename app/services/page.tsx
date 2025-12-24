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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 md:py-24 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Nos Services
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed">
                Solutions complètes pour accompagner votre transformation industrielle et logistique
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id} 
                  id={service.id}
                  slug={service.slug}
                  title={service.title}
                  shortDescription={service.shortDescription}
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
