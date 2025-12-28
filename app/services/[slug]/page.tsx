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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <ServiceIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                  {service.title}
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <ServiceDetail service={serializableService} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
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
