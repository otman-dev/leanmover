'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="text-white space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo in white card */}
                <div className="mb-8 inline-block">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl">
                    <Image 
                      src="/images/leanmover-logo.png"
                      alt="LEANMOVER - Solution pour une logistique optimal"
                      width={500}
                      height={150}
                      className="w-full max-w-md h-auto"
                      priority
                    />
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  {mainSlide.title}
                </h1>
                
                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                  {mainSlide.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#services"
                    className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    Découvrir nos services
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="/contact"
                    className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold border-2 border-white/50 hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
                  >
                    Demander un devis
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right side - Feature cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              {heroSlides.map((slide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 border border-white/20 hover:border-white/40 hover:translate-x-2"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">{slide.subtitle}</h3>
                  <p className="text-sm text-blue-100 leading-relaxed">{slide.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
