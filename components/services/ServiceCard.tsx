'use client';

import Link from 'next/link';
import { 
  HiCog, 
  HiCpuChip, 
  HiShoppingCart, 
  HiWrenchScrewdriver, 
  HiCubeTransparent, 
  HiCube 
} from 'react-icons/hi2';

interface ServiceCardProps {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  comingSoon?: boolean;
}

const iconMap = {
  '1': HiCog,
  '2': HiCpuChip,
  '3': HiShoppingCart,
  '4': HiWrenchScrewdriver,
  '5': HiCubeTransparent,
  '6': HiCube,
};

export default function ServiceCard({ id, slug, title, shortDescription, comingSoon }: ServiceCardProps) {
  const Icon = iconMap[id as keyof typeof iconMap] || HiCog;
  
  const content = (
    <div className={`bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 ${comingSoon ? 'opacity-75' : 'hover:border-blue-500 hover:shadow-xl cursor-pointer'} transition-all duration-300 h-full group relative`}>
      {comingSoon && (
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          Bientôt disponible
        </div>
      )}
      <div className={`${comingSoon ? 'text-gray-400' : 'text-blue-600 group-hover:scale-110'} mb-3 sm:mb-4 transition-transform duration-300`}>
        <Icon className="w-12 h-12" />
      </div>
      <h3 className={`text-lg sm:text-xl font-bold ${comingSoon ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-600'} mb-2 sm:mb-3 transition-colors`}>
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
        {shortDescription}
      </p>
      {!comingSoon && (
        <div className="text-blue-600 font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
          En savoir plus
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
  
  return comingSoon ? content : <Link href={`/services/${slug}`}>{content}</Link>;
}
