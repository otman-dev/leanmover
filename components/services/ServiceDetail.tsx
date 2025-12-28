'use client';

import { useState } from 'react';
import { ServiceSection, FAQ } from '@/data/services';
import { HiCheckCircle, HiChevronDown } from 'react-icons/hi';

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

  return (
    <div className="space-y-12">
      {/* Description */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          À propos de ce service
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {service.fullDescription}
        </p>
      </div>

      {/* Detailed Sections */}
      {service.sections && service.sections.length > 0 && (
        <div className="space-y-8">
          {service.sections.map((section, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                {section.title}
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Nos prestations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 bg-blue-50 p-4 rounded-lg">
                <HiCheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits */}
      {service.benefits && service.benefits.length > 0 && (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl p-8 sm:p-10">
          <h3 className="text-xl sm:text-2xl font-bold mb-6">
            Les avantages
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <HiCheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            FAQ
          </h3>
          <div className="space-y-4">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <HiChevronDown
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className="text-gray-700 leading-relaxed">
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
