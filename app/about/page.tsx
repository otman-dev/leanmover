import { Metadata } from 'next';
import { generateAboutMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/structuredData';
import { companyInfo } from '@/data/company';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiCog, HiShieldCheck, HiChartBar, HiLightningBolt, HiUserGroup, HiSparkles, HiHeart } from 'react-icons/hi';

export const metadata: Metadata = generateAboutMetadata();

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'À Propos', url: '/about' }
  ]);
  
  const organizationSchema = generateOrganizationSchema();

  const services = [
    {
      icon: HiChartBar,
      title: 'Intralogistique',
      description: 'Nous analysons et améliorons vos flux logistiques pour gagner en productivité, réduire les coûts et accélérer vos délais de livraison.'
    },
    {
      icon: HiCog,
      title: 'Automatisation des processus',
      description: 'Intégration de systèmes automatisés, robots, convoyeurs et machines spéciales pour moderniser vos opérations industrielles.'
    },
    {
      icon: HiShieldCheck,
      title: 'Ergonomiques & sécurité',
      description: 'Mise en place d\'équipements et d\'aménagements ergonomiques pour améliorer les conditions de travail, réduire la pénibilité et renforcer la sécurité.'
    },
    {
      icon: HiCheckCircle,
      title: 'Performance & traçabilité',
      description: 'Déploiement d\'outils de mesure, tableaux de bord et systèmes de traçabilité pour un pilotage efficace de vos opérations.'
    }
  ];

  const whyChooseUs = [
    {
      icon: HiLightningBolt,
      title: 'Expertise reconnue',
      description: 'Expérience dans la logistique, l\'automatisation industrielle et l\'industrie 4.0.'
    },
    {
      icon: HiSparkles,
      title: 'Solutions sur mesure',
      description: 'Chaque projet est personnalisé selon vos besoins, votre secteur et vos objectifs de performance.'
    },
    {
      icon: HiCog,
      title: 'Innovation continue',
      description: 'Des solutions modernes et connectées, grâce aux dernières technologies.'
    },
    {
      icon: HiHeart,
      title: 'Engagement client',
      description: 'Accompagnement de proximité, transparent et réactif à chaque étape de votre projet.'
    }
  ];

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
                      {companyInfo.tagline}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                      À Propos de
                      <span className="block text-3xl sm:text-4xl lg:text-5xl text-yellow-300 mt-2">
                        {companyInfo.name}
                      </span>
                    </h1>
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6 max-w-2xl lg:mx-0 mx-auto">
                      Une entreprise innovante spécialisée dans l'optimisation des flux logistiques, l'automatisation industrielle, et l'amélioration des conditions de travail.
                    </p>
                    <p className="text-base sm:text-lg text-blue-200 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                      Nous accompagnons les industries vers une performance durable et intelligente grâce à des solutions connectées, sur mesure et orientées résultats.
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
                        <div className="text-6xl sm:text-7xl lg:text-8xl mb-4">🏭</div>
                        <div className="text-lg sm:text-xl font-semibold">Innovation</div>
                        <div className="text-sm text-blue-200">Industrielle</div>
                      </div>
                    </div>
                    
                    {/* Simple corner badges */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">4.0</span>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-yellow-800 font-bold text-xs text-center">10+<br/>Années</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Notre Expertise au Service de Votre Industrie
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  Chez {companyInfo.name}, nous vous accompagnons à chaque étape de votre transformation industrielle et logistique grâce à des services sur mesure, innovants et orientés performance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group relative overflow-hidden"
                  >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:bg-blue-100 transition-colors"></div>
                    
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl">
                        <service.icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {/* Hover indicator */}
                      <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center text-blue-600 font-semibold text-sm">
                          En savoir plus
                          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Call to action */}
              <div className="text-center mt-12">
                <a 
                  href="/services"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Voir tous nos services
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Pourquoi Choisir {companyInfo.name} ?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Notre expertise, notre approche sur-mesure et notre engagement client font toute la différence dans la réussite de vos projets industriels.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <item.icon className="w-9 h-9 text-white" />
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-yellow-800 font-bold text-xs">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Additional value proposition */}
              <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100">
                <div className="text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    Une Approche Qui Fait la Différence
                  </h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                    Nous ne nous contentons pas de vendre des solutions. Nous devenons votre partenaire stratégique pour transformer durablement votre industrie avec des technologies de pointe et un accompagnement personnalisé.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/solutions"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Nos réalisations
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                    <a 
                      href="/certifications"
                      className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Nos certifications
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 border border-white/30">
                  <HiUserGroup className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Votre Productivité, Notre Mission
                </h2>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                  Nous transformons vos défis industriels en opportunités de croissance grâce à des outils innovants, une expertise terrain et un accompagnement personnalisé.
                </p>
                
                {/* Contact Information */}
                <div className="bg-white/10 rounded-2xl p-6 mb-8 border border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center md:text-left">
                      <h3 className="font-semibold text-lg mb-3">Contactez-nous</h3>
                      <div className="space-y-2">
                        <a 
                          href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                          className="block text-xl font-bold hover:text-blue-200 transition-colors"
                        >
                          {companyInfo.phone}
                        </a>
                        <a 
                          href={`mailto:${companyInfo.email}`}
                          className="block text-blue-200 hover:text-white transition-colors"
                        >
                          {companyInfo.email}
                        </a>
                      </div>
                    </div>
                    <div className="text-center md:text-right">
                      <h3 className="font-semibold text-lg mb-3">Nos bureaux</h3>
                      <div className="text-blue-100 space-y-1">
                        <p>{companyInfo.address.street}</p>
                        <p>{companyInfo.address.city}, {companyInfo.address.country}</p>
                        <p className="text-sm">{companyInfo.businessHours.weekdays}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors text-lg shadow-lg"
                  >
                    Démarrer un projet
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href="/services"
                    className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-bold border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Nos services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
