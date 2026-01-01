import { Metadata } from 'next';
import { generateContactMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/structuredData';
import { companyInfo } from '@/data/company';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/shared/ContactForm';
import { HiMail, HiPhone, HiLocationMarker, HiClock } from 'react-icons/hi';

export const metadata: Metadata = generateContactMetadata();

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]);
  
  const localBusinessSchema = generateLocalBusinessSchema();

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
                      Parlons de votre projet
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      Contactez
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        Nos Experts
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Notre équipe d'experts est à votre disposition pour étudier vos besoins et vous proposer des solutions sur-mesure
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                      Nous contacter
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </a>
                    <a
                      href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      {companyInfo.phone}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="flex-1 flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">📞</div>
                        <div className="text-lg sm:text-xl font-semibold">Support</div>
                        <div className="text-sm text-blue-200">Expert</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">24h</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-xs text-center">Devis<br/>Gratuit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section id="contact" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Parlons de Votre Projet
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Notre équipe d'experts vous accompagne de l'analyse de vos besoins jusqu'à la mise en œuvre de votre solution industrielle
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Informations de Contact
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Nos spécialistes sont disponibles pour répondre à toutes vos questions et vous proposer des solutions adaptées à vos défis industriels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 hover:border-blue-300 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <HiMail className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Email Professionnel</h4>
                          <a 
                            href={`mailto:${companyInfo.email}`}
                            className="text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors"
                          >
                            {companyInfo.email}
                          </a>
                          <p className="text-gray-600 text-sm mt-1">Réponse sous 24h</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6 border border-green-100 hover:border-green-300 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <HiPhone className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Téléphone Direct</h4>
                          <a 
                            href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                            className="text-green-600 hover:text-green-700 font-medium text-xl transition-colors"
                          >
                            {companyInfo.phone}
                          </a>
                          <p className="text-gray-600 text-sm mt-1">Appel direct avec nos experts</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 hover:border-purple-300 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <HiLocationMarker className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Nos Bureaux</h4>
                          <p className="text-purple-600 font-medium">
                            {companyInfo.address.street}
                          </p>
                          <p className="text-gray-700">
                            {companyInfo.address.city}, {companyInfo.address.country}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 hover:border-orange-300 transition-colors group">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <HiClock className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 text-lg">Horaires d'Ouverture</h4>
                          <p className="text-orange-600 font-medium">{companyInfo.businessHours.weekdays}</p>
                          <p className="text-gray-600">{companyInfo.businessHours.weekend}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">Actions Rapides</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                      >
                        <HiPhone className="w-4 h-4" />
                        Appeler maintenant
                      </a>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm"
                      >
                        <HiMail className="w-4 h-4" />
                        Envoyer un email
                      </a>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-lg">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Demande de Devis Gratuit
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Remplissez ce formulaire pour recevoir une étude personnalisée et un devis détaillé adapté à votre projet industriel.
                    </p>
                    
                    {/* Benefits */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Réponse sous 24h</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Devis détaillé</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Consultation gratuite</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Solution sur-mesure</span>
                      </div>
                    </div>
                  </div>
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
