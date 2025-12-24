'use client';

import { certifications } from '@/data/certifications';
import CertificationCard from './CertificationCard';

export default function CertificationsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
      {certifications.map((cert, index) => (
        <CertificationCard key={index} certification={cert} />
      ))}
    </div>
  );
}
