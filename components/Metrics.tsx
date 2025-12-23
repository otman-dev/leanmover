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
      className="text-center"
    >
      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-base sm:text-lg text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Boostez vos performances avec nos solutions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 leading-relaxed">
              Leanmover vous accompagne dans la conception de solutions industrielles et logistiques sur-mesure, 
              intégrant l'automatisation, les systèmes de test, les solutions 4.0, la gestion des entrepôts et 
              des infrastructures afin d'optimiser vos performances et garantir la fiabilité de vos process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 md:gap-20">
            <AnimatedCounter end={80} label="Best Award" suffix="+" />
            <AnimatedCounter end={80} label="Happy Clients" suffix="k" />
          </div>
        </div>
      </div>
    </section>
  );
}
