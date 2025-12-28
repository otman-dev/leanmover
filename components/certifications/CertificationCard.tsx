'use client';

import { HiCheckCircle, HiDownload, HiShieldCheck } from 'react-icons/hi';
import { Certification } from '@/data/certifications';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 h-full group overflow-hidden">
      {/* Premium border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-blue-600 to-amber-400 rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
      
      {/* Inner card with white background */}
      <div className="relative bg-white rounded-[22px] p-8 sm:p-10 h-full">
        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-5">
          <div className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl"></div>
          <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-blue-600 rounded-tl-xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-amber-500 rounded-br-2xl"></div>
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-blue-600 rounded-br-xl"></div>
        </div>

        {/* Official seal/badge */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 border-4 border-amber-300">
              <HiShieldCheck className="w-11 h-11 text-white drop-shadow-lg" />
            </div>
            {/* Verified checkmark overlay */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
              <HiCheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Certification title */}
        <div className="text-center mb-6 border-b-2 border-dashed border-gray-200 pb-6">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] mb-2">
            CERTIFICATION INTERNATIONALE
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-3 leading-tight">
            {certification.name}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            {certification.description}
          </p>
        </div>

        {/* Certificate details - official style */}
        <div className="space-y-4 mb-8 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-100 shadow-inner">
          {certification.scope && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[140px] flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                DOMAINE
              </span>
              <span className="text-gray-900 font-semibold text-sm sm:text-base">{certification.scope}</span>
            </div>
          )}
          {certification.registrationNumber && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[140px] flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                N° ENREGISTREMENT
              </span>
              <span className="text-gray-900 font-mono font-bold text-sm sm:text-base tracking-wider">{certification.registrationNumber}</span>
            </div>
          )}
          {certification.year && certification.validUntil && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-3 border-b border-gray-200 last:border-0 last:pb-0">
              <span className="text-xs font-black text-slate-700 uppercase tracking-widest min-w-[140px] flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                PÉRIODE VALIDITÉ
              </span>
              <span className="text-gray-900 font-bold text-sm sm:text-base">
                <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg border border-green-200">
                  {certification.year} → {certification.validUntil}
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Download button - premium style */}
        {certification.pdfPath && (
          <a
            href={certification.pdfPath}
            download
            className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:via-blue-800 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl group-hover:scale-[1.02] border-2 border-blue-500"
          >
            <HiDownload className="w-6 h-6" />
            <span className="text-base">TÉLÉCHARGER LE CERTIFICAT</span>
          </a>
        )}

        {/* Authenticity watermark */}
        <div className="text-center mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-semibold">
          <HiCheckCircle className="w-4 h-4 text-green-500" />
          <span>CERTIFICAT AUTHENTIFIÉ ET VÉRIFIÉ</span>
        </div>
      </div>
    </div>
  );
}
