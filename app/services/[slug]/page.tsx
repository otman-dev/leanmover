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
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 sm:py-24 pt-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <ServiceIcon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  {service.title}
                </h1>
              </div>
              <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-4xl">
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
