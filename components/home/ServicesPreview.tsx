'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { services } from '@/data/services';

export default function ServicesPreview() {
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
          {services.map((service, index) => {
            const content = (
              <div className={`bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 ${service.comingSoon ? 'opacity-75' : 'hover:border-blue-500 hover:shadow-xl cursor-pointer'} transition-all duration-300 h-full relative`}>
                {service.comingSoon && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Bientôt disponible
                  </div>
                )}
                <div className={`${service.comingSoon ? 'text-gray-400' : 'text-blue-600 group-hover:scale-110'} mb-3 sm:mb-4 transition-transform duration-300`}>
                  <service.icon className="w-12 h-12" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${service.comingSoon ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-600'} mb-2 sm:mb-3 transition-colors`}>
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.shortDescription}
                </p>
                {!service.comingSoon && (
                  <div className="mt-4 text-blue-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    En savoir plus
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            );

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                {service.comingSoon ? content : (
                  <Link href={`/services/${service.slug}`}>
                    {content}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            Voir tous nos services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
