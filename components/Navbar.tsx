'use client';

import { Menu, X, MapPin, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WassaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/service' },
    { name: 'Produits', href: '/produits' },
    { name: 'Nous Contactez', href: '/contact' },
  ];

  // Déterminer l'élément actif en fonction de la route
  const activeItem = navItems.find(item => item.href === pathname)?.name || 'Accueil';

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center ml-36 gap-2 group cursor-pointer">
                <div className="p-1.5 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span className="text-sm text-slate-600 font-medium">Casablanca, Maroc</span>
              </div>
              <Link href="tel:+212663833056" className="hidden sm:flex items-center gap-2 group cursor-pointer">
                <div className="p-1.5 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span className="text-sm text-slate-600 font-medium">+212 663-833056</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-2 ml-auto mr-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600 font-medium">Votre partenaire logistique de confiance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-[#F7F9F6] backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0 cursor-pointer group">
              <div className="relative w-72 h-16 transition-all duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo/logo.png"
                  alt="WassaExpress - Votre partenaire logistique"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = activeItem === item.name;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative px-5 py-2.5 group"
                  >
                    <span
                      className={`relative z-10 text-sm font-semibold transition-colors duration-300 ${
                        isActive ? 'text-orange-600' : 'text-slate-700 group-hover:text-orange-600'
                      }`}
                    >
                      {item.name}
                    </span>

                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    )}

                    <div
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        isActive ? 'bg-white shadow-sm' : 'bg-white/60 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-all duration-300 hover:bg-white rounded-xl shadow-sm hover:shadow-md"
              >
                Connexion
              </Link>

              <Link
                href="/annonce"
                className="relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl overflow-hidden group shadow-lg shadow-orange-500/25 hover:scale-105 transition-transform"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Publier une annonce
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:bg-gray-50 rounded-xl transition-all duration-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-1">
              <nav className="space-y-1">
                {navItems.map(item => {
                  const isActive = activeItem === item.name;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`w-full block px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isActive ? 'text-orange-600 bg-orange-50' : 'text-slate-700 hover:bg-orange-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {item.name}
                        {isActive && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
                <Link
                  href="/login"
                  className="w-full block px-4 py-3.5 text-center text-sm font-semibold text-slate-700 hover:bg-orange-50 rounded-xl transition-all duration-300"
                >
                  Connexion
                </Link>

                <Link
                  href="/annonce"
                  className="w-full block px-4 py-3.5 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-orange-500/25"
                >
                  Publier une annonce
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
