'use client';

import Link from 'next/link';
import { HiMail, HiPhone, HiLocationMarker, HiGlobe } from 'react-icons/hi';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { companyInfo } from '@/data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">LEANMOVER</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 leading-relaxed">
              {companyInfo.tagline}
            </p>
            <div className="flex space-x-4">
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href={companyInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nos Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services/ingenierie-industrialisation" className="hover:text-blue-400 transition-colors">
                  Ingénierie Industrielle
                </Link>
              </li>
              <li>
                <Link href="/services/solutions-industrie-4-0" className="hover:text-blue-400 transition-colors">
                  Solutions Industrie 4.0
                </Link>
              </li>
              <li>
                <Link href="/services/machines-speciales-automatisation" className="hover:text-blue-400 transition-colors">
                  Automatisation
                </Link>
              </li>
              <li>
                <Link href="/services/warehousing-logistique" className="hover:text-blue-400 transition-colors">
                  Warehousing & Logistique
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  {companyInfo.address.street}<br />
                  {companyInfo.address.city}, {companyInfo.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiGlobe className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">
                  {companyInfo.businessHours.weekdays}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {companyInfo.name}. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="text-gray-400 hover:text-blue-400 transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="text-gray-400 hover:text-blue-400 transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
