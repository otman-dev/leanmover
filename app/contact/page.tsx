import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/structuredData';
import { companyInfo } from '@/data/company';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/shared/ContactForm';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'Contact',
  description: 'Contactez Leanmover pour vos projets industriels et logistiques. Devis gratuit et accompagnement personnalisé.',
  keywords: ['contact', 'devis', 'Leanmover', 'Maroc', 'Casablanca'],
  path: '/contact'
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]);
  
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contactez-nous
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed">
                Discutons de votre projet et trouvons ensemble les meilleures solutions
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Informations de Contact
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    Notre équipe est à votre disposition pour répondre à vos questions et 
                    vous accompagner dans vos projets.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiMail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a 
                          href={`mailto:${companyInfo.email}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {companyInfo.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiPhone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                        <a 
                          href={`tel:${companyInfo.phone}`}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {companyInfo.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiLocationMarker className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                        <p className="text-gray-700">
                          {companyInfo.address.city}, {companyInfo.address.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <HiClock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                        <p className="text-gray-700">{companyInfo.businessHours.weekdays}</p>
                        <p className="text-gray-700">{companyInfo.businessHours.weekend}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h2>
                  <ContactForm />
                </div>
              </div>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
