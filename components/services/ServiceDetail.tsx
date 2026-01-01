'use client';

import { useState } from 'react';
import { ServiceSection, FAQ } from '@/data/services';
import { HiCheckCircle, HiChevronDown, HiArrowRight, HiClock, HiCog, HiLightBulb, HiShieldCheck } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import ChartWrapper from '@/components/shared/ChartWrapper';

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
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [showAllFAQs, setShowAllFAQs] = useState<boolean>(false);

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
    <div className="space-y-8 sm:space-y-10">
      {/* Description Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <HiLightBulb className="w-4 h-4 text-white" />
          </div>
          À propos de ce service
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
          {service.fullDescription}
        </p>
      </motion.div>

      {/* Process Overview - Enhanced Version */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white overflow-hidden relative"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/30">
              <HiCog className="w-4 h-4" />
              Méthodologie éprouvée
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Notre processus d'ingénierie
            </h3>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Une approche structurée en 4 phases pour transformer vos idées en solutions industrielles performantes et durables
            </p>
          </div>

          {/* Process Timeline */}
          <div className="relative mb-8">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {processData.map((step, index) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="relative"
                >
                  {/* Step number */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-400 text-yellow-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10">
                    {index + 1}
                  </div>
                  
                  {/* Card */}
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 text-center border border-white/20 hover:bg-white/25 transition-all duration-300 group hover:scale-105">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${step.color}40` }}
                    >
                      <step.icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    
                    <h4 className="text-lg font-bold mb-2 text-white">{step.name}</h4>
                    <p className="text-sm text-blue-100 mb-3 leading-relaxed">{step.description}</p>
                    
                    {/* Duration badge */}
                    <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full text-xs font-medium">
                      <HiClock className="w-3 h-3" />
                      {step.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom description */}
          <div className="text-center">
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Chaque phase s'enchaîne naturellement avec des livrables définis pour garantir le succès de votre projet
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features & Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Features */}
        {service.features && service.features.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                <HiCheckCircle className="w-4 h-4 text-white" />
              </div>
              Nos prestations
            </h3>
            <div className="space-y-3">
              {service.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 bg-green-50 p-3 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-5 h-5 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    <HiCheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm sm:text-base">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Benefits with Chart */}
        {service.benefits && service.benefits.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-3">
              <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
                <HiCog className="w-4 h-4 text-white" />
              </div>
              Les avantages clés
            </h3>
            
            <div className="space-y-3 mb-4">
              {service.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div 
                    className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${benefitsData[index].color}20` }}
                  >
                    <HiCheckCircle className="w-3 h-3" style={{ color: benefitsData[index].color }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-gray-800 font-medium block mb-1 text-sm sm:text-base">{benefit}</span>
                    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                      <motion.div 
                        className="h-1 rounded-full"
                        style={{ backgroundColor: benefitsData[index].color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${benefitsData[index].value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Compact Chart */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-32 sm:h-40"
            >
              <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                  <Pie
                    data={benefitsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
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
              </ChartWrapper>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Detailed Sections - Collapsible Cards */}
      {service.sections && service.sections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-6">
            Nos expertises détaillées
          </h3>
          <div className="space-y-3">
            {service.sections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setOpenSection(openSection === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <HiArrowRight className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight text-left">
                      {section.title}
                    </h4>
                  </div>
                  <HiChevronDown
                    className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ml-3 ${
                      openSection === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openSection === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 pb-4 sm:pb-6"
                  >
                    <div className="pl-11">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {section.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section - Compact */}
      {service.faqs && service.faqs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Questions fréquentes
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {(showAllFAQs ? service.faqs : service.faqs.slice(0, 6)).map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900 pr-3 leading-relaxed">
                    {faq.question}
                  </span>
                  <HiChevronDown
                    className={`w-4 h-4 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-3 pb-3 pt-0">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {service.faqs.length > 6 && (
            <div className="text-center mt-4">
              <button 
                onClick={() => setShowAllFAQs(!showAllFAQs)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-all duration-200"
              >
                {showAllFAQs 
                  ? 'Masquer les questions supplémentaires' 
                  : `Voir toutes les questions (${service.faqs.length - 6} de plus)`
                }
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
