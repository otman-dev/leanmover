'use client';

import { motion } from 'framer-motion';
import { HiCheckCircle, HiDownload, HiShieldCheck, HiStar, HiLightningBolt } from 'react-icons/hi';

interface Certification {
  name: string;
  description: string;
  year?: string;
  pdfPath?: string;
  registrationNumber?: string;
  validUntil?: string;
  scope?: string;
}

const certifications: Certification[] = [
  {
    name: "AENOR ISO 9001:2015",
    description: "Système de management de la qualité",
    scope: "Services de conseil en logistique",
    registrationNumber: "ES-0540/2024",
    year: "2024",
    validUntil: "2027",
    pdfPath: "/certificates/Certif1leanmover.pdf"
  },
  {
    name: "IQNET ISO 9001:2015",
    description: "Certification internationale qualité",
    scope: "Services de conseil en logistique",
    registrationNumber: "ES-0540/2024",
    year: "2024",
    validUntil: "2027",
    pdfPath: "/certificates/Certif2Leanmover.pdf"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
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
                  {cert.registrationNumber && (
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[80px]">N° Reg:</span>
                      <span className="text-gray-600">{cert.registrationNumber}</span>
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
                    Télécharger le certificat
                  </a>
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
          className="mt-12 sm:mt-16 md:mt-20"
        >
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-8 sm:p-10 md:p-12 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8 sm:mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-4 sm:mb-6">
                  <HiShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                  Engagement Qualité
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                  Notre engagement envers l'excellence se reflète dans nos certifications. 
                  Nous maintenons les plus hauts standards de qualité, de sécurité et de durabilité 
                  pour tous nos projets et services.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiStar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Excellence</h4>
                  <p className="text-sm text-blue-100">Standards de qualité internationaux</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Fiabilité</h4>
                  <p className="text-sm text-blue-100">Certifications reconnues mondialement</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <HiLightningBolt className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Innovation</h4>
                  <p className="text-sm text-blue-100">Solutions durables et performantes</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
