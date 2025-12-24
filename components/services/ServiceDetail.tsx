'use client';

import { Service } from '@/data/services';
import { HiCheckCircle } from 'react-icons/hi';

interface ServiceDetailProps {
  service: Service;
}

export default function ServiceDetail({ service }: ServiceDetailProps) {
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
    </div>
  );
}
