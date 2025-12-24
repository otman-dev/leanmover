'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiCheckCircle, HiDownload } from 'react-icons/hi';
import { certifications } from '@/data/certifications';

export default function CertificationsPreview() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Nos Certifications
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            Nous sommes fiers de détenir des certifications reconnues, gage de qualité et de fiabilité 
            dans l'ensemble de nos services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {certifications.slice(0, 2).map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-blue-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                    <HiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  {cert.scope && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">Domaine:</span>
                      <span className="text-gray-600">{cert.scope}</span>
                    </div>
                  )}
                  {cert.year && cert.validUntil && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">Validité:</span>
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
                    Télécharger
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            Voir toutes nos certifications
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
