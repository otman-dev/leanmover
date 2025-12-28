'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Accueil', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tous les services', href: '/services' },
        { name: 'Ingénierie & Industrialisation', href: '/services/ingenierie-industrialisation' },
        { name: 'Solutions Industrie 4.0', href: '/services/solutions-industrie-4-0' },
        { name: 'Achat & Stockage', href: '/services/achat-stockage' },
        { name: 'Gestion & Maintenance', href: '/services/gestion-maintenance' },
        { name: 'Machines Spéciales', href: '/services/machines-speciales-automatisation' },
        { name: 'Warehousing & Logistique', href: '/services/warehousing-logistique' },
      ]
    },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Certifications', href: '/certifications' },
    { name: 'Blog', href: '/blog' },
    { name: 'À Propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/leanmover-logo.png" 
              alt="LEANMOVER Logo" 
              width={1800} 
              height={60} 
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                      <HiChevronDown className="w-4 h-4" />
                    </Link>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem.href}
                          href={dropItem.href}
                          className={`block px-4 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 ${
                            isActive(dropItem.href) ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                          }`}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive(item.href) ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <HiX className="w-6 h-6 text-gray-700" />
            ) : (
              <HiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <nav className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`flex-1 py-2 font-medium transition-colors ${
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                      }`}
                      onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.hasDropdown && (
                      <button
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        className="p-2"
                      >
                        <HiChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            servicesDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {item.hasDropdown && servicesDropdownOpen && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem.href}
                          href={dropItem.href}
                          className={`block py-2 text-sm transition-colors ${
                            isActive(dropItem.href) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demander un devis
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
