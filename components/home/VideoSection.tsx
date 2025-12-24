'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlay } from 'react-icons/hi';

export default function VideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="solutions" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-10 md:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Découvrez nos Solutions en Action
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
              Visionnez notre présentation pour comprendre comment nous transformons 
              les défis industriels en opportunités de croissance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            {!showVideo ? (
              <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-blue-900">
                {/* Placeholder background with pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setShowVideo(true)}
                      className="group relative"
                      aria-label="Voir la vidéo"
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-blue-50 transition-all duration-300">
                        <HiPlay className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 ml-1" />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-20"></div>
                    </button>
                  </motion.div>
                  <p className="mt-6 text-xl sm:text-2xl font-semibold">Voir Vidéo</p>
                  <p className="mt-2 text-blue-200">Découvrez notre expertise</p>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-black">
                {/* Real YouTube video from leanmover.ma */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/6mkoGSqTqFI"
                  title="Leanmover Presentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </motion.div>

          {/* Feature highlights below video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">10+</div>
              <p className="text-sm sm:text-base text-gray-600">Années d'expérience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-sm sm:text-base text-gray-600">Projets réalisés</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-sm sm:text-base text-gray-600">Satisfaction client</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
