'use client';

import { motion } from 'framer-motion';
import { HiCog, HiLightningBolt, HiTruck, HiChip, HiCube, HiBeaker } from 'react-icons/hi';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <HiCog className="w-12 h-12" />,
    title: "Ingénierie & Industrialisation",
    description: "Conception et optimisation de vos installations industrielles pour maximiser l'efficacité et la productivité."
  },
  {
    icon: <HiChip className="w-12 h-12" />,
    title: "Solutions 4.0",
    description: "Intégration de systèmes connectés et contrôle qualité par vision industrielle."
  },
  {
    icon: <HiCube className="w-12 h-12" />,
    title: "Achat & Stockage",
    description: "Approvisionnement global et gestion de vos stocks en toute sécurité."
  },
  {
    icon: <HiBeaker className="w-12 h-12" />,
    title: "Gestion & Maintenance",
    description: "Pilotage et entretien de vos sites industriels."
  },
  {
    icon: <HiLightningBolt className="w-12 h-12" />,
    title: "Machines Spéciales & Automatisation",
    description: "Solutions sur-mesure pour vos process industriels."
  },
  {
    icon: <HiTruck className="w-12 h-12" />,
    title: "Warehousing & Logistique",
    description: "Gestion optimisée des flux et des stocks."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-block mb-4">
            <span className="text-blue-600 font-semibold text-sm sm:text-base uppercase tracking-wider">
              Nos Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-2 leading-tight">
            Nous pouvons vous inspirer et proposer différents services
          </h2>
          <div className="space-y-4">
            <p className="text-xl sm:text-2xl text-blue-600 font-semibold px-2">
              Nous vous accompagnons avec des solutions sur-mesure pour vos projets industriels.
            </p>
            <p className="text-base sm:text-lg text-gray-600 px-2 leading-relaxed max-w-3xl mx-auto">
              Leanmover vous apporte expertise, réactivité et innovation dans vos projets d'ingénierie, 
              de logistique et d'industrie 4.0.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-blue-600 mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
