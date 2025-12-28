import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/structuredData';
import { companyInfo } from '@/data/company';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { HiCheckCircle, HiCog, HiShieldCheck, HiChartBar, HiLightningBolt, HiUserGroup, HiSparkles, HiHeart } from 'react-icons/hi';

export const metadata: Metadata = generateMetadata({
  title: 'À Propos',
  description: 'Leanmover est une entreprise innovante spécialisée dans l\'optimisation des flux logistiques, l\'automatisation industrielle, et l\'amélioration des conditions de travail.',
  keywords: ['Leanmover', 'à propos', 'entreprise', 'Maroc', 'industrie', 'transformation digitale', 'automatisation', 'logistique'],
  path: '/about'
});

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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16 sm:py-20 pt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                À propos de Leanmover
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 leading-relaxed">
                Leanmover est une entreprise innovante spécialisée dans l'optimisation des flux logistiques, l'automatisation industrielle, et l'amélioration des conditions de travail.
              </p>
              <p className="text-lg sm:text-xl text-blue-50 leading-relaxed mt-4">
                Nous accompagnons les industries vers une performance durable et intelligente grâce à des solutions connectées, sur mesure et orientées résultats.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
                Nos Services
              </h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-4xl mx-auto">
                Chez Leanmover, nous vous accompagnons à chaque étape de votre transformation industrielle et logistique grâce à des services sur mesure, innovants et orientés performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                      <service.icon className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 sm:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
                Pourquoi nous choisir ?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full mb-6 shadow-lg">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-10 sm:p-16 text-center shadow-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Votre productivité, notre mission
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed max-w-3xl mx-auto">
                Nous transformons vos défis industriels en opportunités de croissance grâce à des outils innovants, une expertise terrain et un accompagnement personnalisé.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <a 
                  href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
                  className="text-xl sm:text-2xl font-bold hover:text-blue-200 transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </div>
              
              <div className="text-blue-100 space-y-2 mb-8">
                <p className="text-lg">{companyInfo.address.street},</p>
                <p className="text-lg">{companyInfo.businessHours.weekdays}</p>
              </div>
              
              <a
                href="/contact"
                className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors text-lg shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
