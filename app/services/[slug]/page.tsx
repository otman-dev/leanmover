import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as genMetadata } from '@/lib/metadata';
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/structuredData';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceDetail from '@/components/services/ServiceDetail';
import ServiceCTA from '@/components/services/ServiceCTA';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug: slug
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return {};
  }

  return genMetadata({
    title: service.title,
    description: service.metaDescription,
    keywords: [service.title, 'Leanmover', 'Maroc'],
    path: `/services/${service.slug}`
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` }
  ]);

  // Extract icon separately to render in server component
  const ServiceIcon = service.icon;
  
  // Create a serializable version of service without the icon
  const serializableService = {
    id: service.id,
    slug: service.slug,
    title: service.title,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    features: service.features,
    benefits: service.benefits,
    sections: service.sections,
    faqs: service.faqs,
    metaDescription: service.metaDescription,
    comingSoon: service.comingSoon
  };

  return (
    <>
      <Header />
      <main className="min-h-screen relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16 sm:py-20 pt-28 sm:pt-32 lg:pt-36 overflow-hidden">
          {/* Background Animations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            <div className="absolute top-20 left-1/3 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <ServiceIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <span className="text-blue-200 text-lg font-medium">Service Expert</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                    {service.title}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8">
                    {service.shortDescription}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl">
                      Découvrir le service
                      <ServiceIcon className="w-5 h-5" />
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300">
                      Demander un devis
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <ServiceIcon className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 text-white/80" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-yellow-800 font-bold text-sm">TOP</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-green-400/90 rounded-full flex items-center justify-center">
                      <span className="text-green-800 font-bold text-xs text-center">Expert<br/>Certifié</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-12 sm:py-16 bg-gray-50 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <ServiceDetail service={serializableService} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <ServiceCTA />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
