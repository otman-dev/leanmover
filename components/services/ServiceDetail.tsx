'use client';

import { useState } from 'react';
import { ServiceSection, FAQ } from '@/data/services';
import { HiCheckCircle, HiChevronDown, HiArrowRight, HiClock, HiCog, HiLightBulb, HiShieldCheck } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

interface ServiceDetailProps {
  service: {
    id: string;
    slug: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    benefits: string[];
    sections?: ServiceSection[];
    faqs?: FAQ[];
    metaDescription: string;
    comingSoon?: boolean;
  };
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Enhanced process data with more details
  const processData = [
    { 
      name: 'Conception', 
      color: '#3b82f6',
      description: 'Analyse & design',
      icon: HiLightBulb,
      duration: '2-4 semaines'
    },
    { 
      name: 'Prototypage', 
      color: '#10b981',
      description: 'Validation technique',
      icon: HiCog,
      duration: '3-6 semaines'
    },
    { 
      name: 'Industrialisation', 
      color: '#f59e0b',
      description: 'Mise en production',
      icon: HiClock,
      duration: '4-8 semaines'
    },
    { 
      name: 'Accompagnement', 
      color: '#ef4444',
      description: 'Support & optimisation',
      icon: HiShieldCheck,
      duration: 'Continu'
    },
  ];

  // Benefits chart data with enhanced styling
  const benefitsData = service.benefits.map((benefit, index) => ({
    name: benefit.length > 25 ? benefit.substring(0, 25) + '...' : benefit,
    fullName: benefit,
    value: Math.floor(85 + Math.random() * 15), // Random values between 85-100
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]
  }));

  return (
    <div className="space-y-16">
      {/* Description */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          À propos de ce service
        </h2>
        <p className="text-xl text-gray-700 leading-relaxed mb-8">
          {service.fullDescription}
        </p>
      </motion.div>
      {/* Project Timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-12"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Chronologie d'un projet type
          </h3>
          <p className="text-lg text-gray-600">
            Suivez les étapes clés de votre projet d'ingénierie de A à Z
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600"></div>
            
            {/* Timeline steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 relative">
              {[
                'Analyse besoins',
                'Étude technique',
                'Conception détaillée',
                'Prototypage',
                'Tests & validation',
                'Industrialisation',
                'Mise en service',
                'Accompagnement'
              ].map((phase, index) => (
                <motion.div
                  key={phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {/* Step circle */}
                  <div className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg mb-4 relative z-10">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  
                  {/* Step content */}
                  <div className="text-center max-w-24">
                    <div className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                      {phase}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline description */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 text-lg">
              Chaque phase s'enchaîne naturellement pour garantir le succès de votre projet
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Process Overview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-blue-100"
      >
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Notre processus d'ingénierie
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Une méthodologie éprouvée en 4 phases pour transformer vos idées en solutions industrielles performantes
          </p>
        </div>

        {/* Process Steps with Icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {processData.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color }} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{step.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{step.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-600 text-center text-lg">
          Chaque étape de notre processus est conçue pour maximiser la réussite de votre projet
        </p>
      </motion.div>

      {/* Detailed Sections */}
      {service.sections && service.sections.length > 0 && (
        <div className="space-y-12">
          {service.sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-10 sm:p-12 border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <HiArrowRight className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {section.title}
                  </h3>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10 text-center">
            Nos prestations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <HiCheckCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl text-gray-800 font-medium leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Benefits Section */}
      {service.benefits && service.benefits.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-48 -translate-x-48"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                Les avantages clés
              </h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Découvrez pourquoi nos clients nous font confiance pour leurs projets d'ingénierie
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="h-96"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={benefitsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {benefitsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '12px',
                        color: 'black',
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [`${value}%`, 'Impact']}
                      labelFormatter={(label) => benefitsData.find(b => b.name === label)?.fullName || label}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${benefitsData[index].color}30` }}
                    >
                      <HiCheckCircle className="w-6 h-6" style={{ color: benefitsData[index].color }} />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg leading-relaxed block">{benefit}</span>
                      <div className="w-full bg-white/20 rounded-full h-1 mt-3 overflow-hidden">
                        <motion.div 
                          className="h-1 rounded-full"
                          style={{ backgroundColor: benefitsData[index].color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${benefitsData[index].value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
            Questions fréquentes
          </h3>
          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg sm:text-xl font-semibold text-gray-900 pr-4 leading-relaxed">
                    {faq.question}
                  </span>
                  <HiChevronDown
                    className={`w-8 h-8 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
