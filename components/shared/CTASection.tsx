'use client';

import Link from 'next/link';
import { HiArrowRight } from 'react-icons/hi';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function CTASection({
  title = "Prêt à Démarrer Votre Projet ?",
  description = "Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.",
  primaryButtonText = "Demander un devis",
  primaryButtonLink = "/contact",
  secondaryButtonText,
  secondaryButtonLink
}: CTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white rounded-3xl p-8 sm:p-12 shadow-2xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg sm:text-xl text-blue-100 mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButtonLink}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg"
          >
            {primaryButtonText}
            <HiArrowRight className="w-5 h-5" />
          </Link>
          {secondaryButtonText && secondaryButtonLink && (
            <Link
              href={secondaryButtonLink}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
