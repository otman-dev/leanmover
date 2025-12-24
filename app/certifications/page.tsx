import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { certifications } from '@/data/certifications';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiDownload, HiShieldCheck, HiStar, HiLightningBolt } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'Nos Certifications',
  description: 'Leanmover est certifié ISO 9001:2015 par AENOR et IQNET. Découvrez nos certifications qualité et nos engagements envers l\'excellence.',
  keywords: ['certification ISO', 'ISO 9001', 'AENOR', 'IQNET', 'qualité', 'Maroc'],
  path: '/certifications'
});

export default function CertificationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Certifications', url: '/certifications' }
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
                Nos Certifications
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed">
                L'excellence reconnue par des certifications internationales
              </p>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 border-2 border-blue-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HiCheckCircle className="w-9 h-9 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {cert.name}
                      </h2>
                      <p className="text-gray-600">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {cert.scope && (
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">Domaine:</span>
                        <span className="text-gray-600">{cert.scope}</span>
                      </div>
                    )}
                    {cert.registrationNumber && (
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">N° Reg:</span>
                        <span className="text-gray-600">{cert.registrationNumber}</span>
                      </div>
                    )}
                    {cert.year && cert.validUntil && (
                      <div className="flex items-start gap-2">
                        <span className="font-semibold text-gray-700 min-w-[100px]">Validité:</span>
                        <span className="text-gray-600">{cert.year} - {cert.validUntil}</span>
                      </div>
                    )}
                  </div>

                  {cert.pdfPath && (
                    <a
                      href={cert.pdfPath}
                      download
                      className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                    >
                      <HiDownload className="w-5 h-5" />
                      Télécharger le certificat
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-10 sm:p-12 shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                  <HiShieldCheck className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Engagement Qualité
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Notre engagement envers l'excellence se reflète dans nos certifications. 
                  Nous maintenons les plus hauts standards de qualité, de sécurité et de durabilité 
                  pour tous nos projets et services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiStar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Excellence</h3>
                  <p className="text-sm text-blue-100">Standards de qualité internationaux</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Fiabilité</h3>
                  <p className="text-sm text-blue-100">Certifications reconnues mondialement</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiLightningBolt className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Innovation</h3>
                  <p className="text-sm text-blue-100">Solutions durables et performantes</p>
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
    </>
  );
}
