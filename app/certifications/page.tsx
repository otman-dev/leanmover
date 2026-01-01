import { Metadata } from 'next';
import { generateCertificationsMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema } from '@/lib/structuredData';
import { certifications } from '@/data/certifications';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiDownload, HiShieldCheck, HiStar, HiLightningBolt } from 'react-icons/hi';

export const metadata: Metadata = generateCertificationsMetadata();

export default function CertificationsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Certifications', url: '/certifications' }
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
                      Qualité Certifiée
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Nos
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        Certifications
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      L'excellence reconnue par des certifications internationales qui garantissent notre engagement qualité
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#certifications"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Voir les certifications
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Nous contacter
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
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">🏆</div>
                        <div className="text-lg sm:text-xl font-semibold">Excellence</div>
                        <div className="text-sm text-blue-200">Certifiée</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">ISO</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-xs text-center">Qualité<br/>2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Nos Certifications Qualité
              </h2>
              <p className="text-lg text-gray-600">
                Reconnus par les organismes internationaux pour notre engagement vers l'excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow">
                      <HiShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {cert.name}
                        </h2>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                          Valide
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
                    {cert.scope && (
                      <div className="flex items-start gap-3">
                        <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-700">Domaine d'application</span>
                          <div className="text-gray-600 mt-1">{cert.scope}</div>
                        </div>
                      </div>
                    )}
                    {cert.registrationNumber && (
                      <div className="flex items-start gap-3">
                        <HiCheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-700">Numéro d'enregistrement</span>
                          <div className="text-gray-600 mt-1 font-mono">{cert.registrationNumber}</div>
                        </div>
                      </div>
                    )}
                    {cert.year && cert.validUntil && (
                      <div className="flex items-start gap-3">
                        <HiCheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-gray-700">Période de validité</span>
                          <div className="text-gray-600 mt-1">{cert.year} - {cert.validUntil}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {cert.pdfPath && (
                    <a
                      href={cert.pdfPath}
                      download
                      className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02]"
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
            <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6 border-2 border-white/30">
                    <HiShieldCheck className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                    Notre Engagement Qualité
                  </h2>
                  <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                    Ces certifications attestent de notre engagement constant envers l'excellence. 
                    Nous maintenons les plus hauts standards de qualité, de sécurité et de durabilité 
                    dans tous nos projets et services.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 border border-white/30 group-hover:bg-white/30 transition-colors">
                      <HiStar className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Excellence</h3>
                    <p className="text-blue-100 leading-relaxed">Standards de qualité internationaux respectés dans chaque projet</p>
                  </div>
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 border border-white/30 group-hover:bg-white/30 transition-colors">
                      <HiShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Conformité</h3>
                    <p className="text-blue-100 leading-relaxed">Certifications reconnues mondialement par AENOR et IQNET</p>
                  </div>
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 border border-white/30 group-hover:bg-white/30 transition-colors">
                      <HiLightningBolt className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Innovation</h3>
                    <p className="text-blue-100 leading-relaxed">Solutions durables et performantes adaptées aux défis actuels</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg shadow-lg"
                  >
                    Découvrir nos services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
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
