'use client';

import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Votre Performance Industrielle Connectée",
    subtitle: "Votre Partenaire vers l'Industrie 4.0",
    description: "Chez Leanmover, nous vous accompagnons dans la transformation digitale de vos sites industriels en intégrant les dernières technologies de l'Industrie 4.0."
  },
  {
    title: "L'Excellence Industrielle au Service de Vos Projets",
    subtitle: "Des Solutions Innovantes pour vos Projets Industriels",
    description: "Leanmover vous accompagne dans la conception, l'optimisation et le réaménagement de vos installations industrielles grâce à des solutions sur-mesure et connectées."
  },
  {
    title: "Bienvenue chez Leanmover",
    subtitle: "Intralogistique 4.0 : Solutions Sur-Mesure et Adaptées",
    description: "Nous concevons des solutions sur mesure et adaptées aux exigences de l'intralogistique 4.0, afin d'optimiser vos processus industriels et logistiques."
  }
];

export default function Hero() {
  // Using the first slide as the main hero content
  const mainSlide = heroSlides[0];

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background with animated shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        
        {/* Geometric overlay with subtle lines */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Subtle diagonal lines for depth */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full transform -skew-y-12 bg-gradient-to-b from-white/10 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-blue-200 px-2">
              {mainSlide.subtitle}
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              {mainSlide.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed px-2">
              {mainSlide.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2"
          >
            <a
              href="#services"
              className="group bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Découvrir nos services
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="group bg-transparent text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm sm:text-base text-center"
            >
              Nous contacter
            </a>
          </motion.div>

          {/* Additional hero slides as feature highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 px-2"
          >
            {heroSlides.map((slide, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-xl p-5 sm:p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{slide.subtitle}</h3>
                <p className="text-sm text-blue-100 leading-relaxed">{slide.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <span className="text-sm">Défiler</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
