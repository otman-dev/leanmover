'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiCheckCircle, HiDownload, HiShieldCheck } from 'react-icons/hi';
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {certifications.slice(0, 2).map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full group overflow-hidden">
                {/* Premium border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-blue-600 to-amber-400 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Inner card with white background */}
                <div className="relative bg-white rounded-[22px] p-6 sm:p-8 h-full">
                  {/* Decorative corner patterns */}
                  <div className="absolute top-0 left-0 w-24 h-24 opacity-5">
                    <div className="absolute top-3 left-3 w-16 h-16 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-blue-600 rounded-tl-xl"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                    <div className="absolute bottom-3 right-3 w-16 h-16 border-b-4 border-r-4 border-amber-500 rounded-br-2xl"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-blue-600 rounded-br-xl"></div>
                  </div>

                  {/* Official seal/badge */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-amber-300">
                        <HiShieldCheck className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-lg" />
                      </div>
                      {/* Verified checkmark overlay */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                        <HiCheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Certification title */}
                  <div className="text-center mb-6 border-b-2 border-dashed border-gray-200 pb-4">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-[0.15em] mb-2">
                      CERTIFICATION INTERNATIONALE
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-2 leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  {/* Certificate details - official style */}
                  <div className="space-y-3 mb-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 sm:p-5 border-2 border-gray-100 shadow-inner">
                    {cert.scope && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[120px] flex items-center gap-2">
                          <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                          DOMAINE
                        </span>
                        <span className="text-gray-900 font-semibold text-sm">{cert.scope}</span>
                      </div>
                    )}
                    {cert.registrationNumber && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[120px] flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                          N° ENREGISTREMENT
                        </span>
                        <span className="text-gray-900 font-mono font-bold text-sm tracking-wider">{cert.registrationNumber}</span>
                      </div>
                    )}
                    {cert.year && cert.validUntil && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                        <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[120px] flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          PÉRIODE VALIDITÉ
                        </span>
                        <span className="text-gray-900 font-bold text-sm">
                          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-200">
                            {cert.year} → {cert.validUntil}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Download button - premium style */}
                  {cert.pdfPath && (
                    <a
                      href={cert.pdfPath}
                      download
                      className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl group-hover:scale-[1.02] border-2 border-blue-500"
                    >
                      <HiDownload className="w-5 h-5" />
                      <span className="text-sm sm:text-base">TÉLÉCHARGER LE CERTIFICAT</span>
                    </a>
                  )}

                  {/* Authenticity watermark */}
                  <div className="text-center mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-semibold">
                    <HiCheckCircle className="w-4 h-4 text-green-500" />
                    <span>CERTIFICAT AUTHENTIFIÉ ET VÉRIFIÉ</span>
                  </div>
                </div>
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
