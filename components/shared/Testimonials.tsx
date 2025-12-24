'use client';

import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mohammed Alami',
    position: 'Directeur Industriel',
    company: 'Groupe Industriel XYZ',
    content: 'Leanmover a transformé notre ligne de production. Leur expertise en automatisation et leur accompagnement personnalisé ont été déterminants pour le succès de notre projet.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Benkirane',
    position: 'Responsable Logistique',
    company: 'Pharma Solutions',
    content: 'Le système WMS déployé par Leanmover a considérablement amélioré notre efficacité. Traçabilité parfaite et réduction significative des erreurs.',
    rating: 5
  },
  {
    id: 3,
    name: 'Karim El Fassi',
    position: 'CEO',
    company: 'Textile Innovation',
    content: 'L\'accompagnement de Leanmover dans notre transition vers l\'Industrie 4.0 a dépassé nos attentes. Des résultats concrets et mesurables.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ils Nous Font Confiance
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez ce que nos clients pensent de nos services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.position}
                    </div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
