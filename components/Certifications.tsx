'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

interface Certification {
  name: string;
  description: string;
  year?: string;
}

const certifications: Certification[] = [
  {
    name: "ISO 9001:2015",
    description: "Système de management de la qualité",
    year: "2023"
  },
  {
    name: "ISO 14001",
    description: "Management environnemental",
    year: "2023"
  },
  {
    name: "ISO 45001",
    description: "Santé et sécurité au travail",
    year: "2023"
  },
  {
    name: "Industrie 4.0",
    description: "Certification expertise transformation digitale",
    year: "2024"
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Nos Certificats
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Nous sommes fiers de détenir des certifications reconnues, gage de qualité et de fiabilité 
            dans l'ensemble de nos services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-5 sm:p-6 border-2 border-blue-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-600 transition-colors">
                  <HiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2 flex-grow">
                  {cert.description}
                </p>
                {cert.year && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
                    {cert.year}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional certification info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 sm:mt-12 md:mt-16 text-center"
        >
          <div className="bg-blue-600 text-white rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Engagement Qualité</h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Notre engagement envers l'excellence se reflète dans nos certifications. 
              Nous maintenons les plus hauts standards de qualité, de sécurité et de durabilité 
              pour tous nos projets et services.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
