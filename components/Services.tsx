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
    title: "Ingénierie Industrielle",
    description: "Conception et optimisation de vos installations industrielles pour maximiser l'efficacité et la productivité."
  },
  {
    icon: <HiLightningBolt className="w-12 h-12" />,
    title: "Automatisation",
    description: "Solutions d'automatisation avancées pour moderniser vos processus de production et réduire les coûts."
  },
  {
    icon: <HiTruck className="w-12 h-12" />,
    title: "Intralogistique 4.0",
    description: "Systèmes intelligents de gestion des flux pour optimiser votre chaîne d'approvisionnement interne."
  },
  {
    icon: <HiChip className="w-12 h-12" />,
    title: "Solutions Industrie 4.0",
    description: "Intégration des technologies IoT, IA et Big Data pour une usine connectée et intelligente."
  },
  {
    icon: <HiCube className="w-12 h-12" />,
    title: "Gestion d'Entrepôts",
    description: "Optimisation de vos espaces de stockage et gestion intelligente des inventaires."
  },
  {
    icon: <HiBeaker className="w-12 h-12" />,
    title: "Systèmes de Test",
    description: "Solutions de contrôle qualité et tests automatisés pour garantir la fiabilité de vos produits."
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
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Nous pouvons vous inspirer et proposer différents services
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-2 max-w-3xl mx-auto px-2">
            Nous vous accompagnons avec des solutions sur-mesure pour vos projets industriels.
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Leanmover vous apporte expertise, réactivité et innovation dans vos projets d'ingénierie, 
            de logistique et d'industrie 4.0.
          </p>
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
