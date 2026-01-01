'use client';

import Link from 'next/link';
import { HiArrowRight, HiPhone, HiMail } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ServiceCTA() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl overflow-hidden"
    >
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-10 left-1/3 w-40 h-40 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Intéressé par ce service ?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé adapté à vos besoins.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl group"
            >
              <HiMail className="w-5 h-5" />
              Demander un devis
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="tel:+212XXXXXXXXX"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 group"
            >
              <HiPhone className="w-5 h-5" />
              Nous appeler
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-1">24h</div>
              <div className="text-blue-200 text-sm">Réponse garantie</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-1">100+</div>
              <div className="text-blue-200 text-sm">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold mb-1">15+</div>
              <div className="text-blue-200 text-sm">Années d'expertise</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
