'use client';

import { HiCheckCircle, HiDownload } from 'react-icons/hi';
import { Certification } from '@/data/certifications';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 sm:p-8 border-2 border-blue-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 h-full group">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
          <HiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors" />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {certification.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            {certification.description}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        {certification.scope && (
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px]">Domaine:</span>
            <span className="text-gray-600">{certification.scope}</span>
          </div>
        )}
        {certification.registrationNumber && (
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px]">N° Reg:</span>
            <span className="text-gray-600">{certification.registrationNumber}</span>
          </div>
        )}
        {certification.year && certification.validUntil && (
          <div className="flex items-start gap-2">
            <span className="font-semibold text-gray-700 min-w-[80px]">Validité:</span>
            <span className="text-gray-600">{certification.year} - {certification.validUntil}</span>
          </div>
        )}
      </div>

      {certification.pdfPath && (
        <a
          href={certification.pdfPath}
          download
          className="inline-flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          <HiDownload className="w-5 h-5" />
          Télécharger le certificat
        </a>
      )}
    </div>
  );
}
