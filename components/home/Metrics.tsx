'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricProps {
  end: number;
  label: string;
  suffix?: string;
}

function AnimatedCounter({ end, label, suffix = '' }: MetricProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-300">
        <div className="text-center">
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
            {count}{suffix}
          </div>
          <div className="text-lg sm:text-xl text-gray-700 font-semibold">{label}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block mb-4">
              <span className="text-blue-600 font-semibold text-sm sm:text-base uppercase tracking-wider">
                Votre Partenaire Industriel
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-2 leading-tight">
              Boostez vos performances avec nos solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto px-2 leading-relaxed">
              Leanmover vous accompagne dans la conception de solutions industrielles et logistiques sur-mesure, 
              intégrant l'automatisation, les systèmes de test, les solutions 4.0, la gestion des entrepôts et 
              des infrastructures afin d'optimiser vos performances et garantir la fiabilité de vos process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12 md:gap-16 max-w-4xl mx-auto">
            <AnimatedCounter end={80} label="Best Award" suffix="+" />
            <AnimatedCounter end={80} label="Happy Clients" suffix="k" />
          </div>
        </div>
      </div>
    </section>
  );
}
