'use client';

import { Menu, X, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WassaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Produits', href: '/produits' },
    { name: 'Nous Contactez', href: '/contact' }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Top bar - Info contact */}
      {/* MODIFIÉ: Fond blanc, texte foncé, bordure grise */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            {/* MODIFIÉ: Texte foncé */}
            <div className="flex items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Casablanca, Maroc</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+212 663-833056</span>
              </div>
            </div>
            {/* MODIFIÉ: Texte foncé */}
            <div className="text-slate-600 hidden md:block">
              Votre partenaire logistique de confiance
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      {/* MODIFIÉ: Fond blanc, bordure grise */}
      <header className="bg-[#f7f9f6] backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              {/* Le fond du logo était déjà blanc, il s'intègre maintenant parfaitement */}
              <div className="relative w-80 h-22   transition-all duration-300 group-hover:scale-105 group-hover:shadow-orange-500/20">
                <Image 
                  src="/images/logo/logou.png" 
                  alt="WassaExpress - Votre partenaire logistique" 
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
            </Link>
            
            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  // MODIFIÉ: Couleurs du texte (foncé par défaut, orange si actif)
                  className={`relative px-5 py-2 font-medium transition-all duration-300 group ${
                    isActive(item.href) 
                      ? 'text-orange-600' // Actif: texte orange
                      : 'text-slate-600 hover:text-slate-900' // Défaut: texte foncé
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Le fond orange au survol est conservé, il contraste bien */}
                  <span className={`absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-lg transition-opacity duration-300 ${
                    isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  {/* Le soulignement orange est conservé */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300 ${
                    isActive(item.href) ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link 
                href="/connexion"
                // MODIFIÉ: Texte foncé, bordure grise
                className="px-6 py-2.5 text-slate-600 hover:text-orange-600 font-medium transition-colors duration-300 border border-slate-300 hover:border-orange-500/50 rounded-lg"
              >
                Connexion
              </Link>
              {/* Ce bouton est déjà orange, pas de modif nécessaire */}
              <Link 
                href="/publier"
                className="relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg overflow-hidden group shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
              >
                <span className="relative z-10">Publier une annonce</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            {/* MODIFIÉ: Icône foncée, fond clair au survol */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-orange-600 hover:bg-gray-100/50 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          // MODIFIÉ: Fond blanc, bordure grise
          <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-gray-200 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    // MODIFIÉ: Texte foncé, fond clair (actif ou survol)
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-orange-600 bg-gray-100/70' // Actif
                        : 'text-slate-600 hover:text-orange-600 hover:bg-gray-100/50' // Défaut
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {/* MODIFIÉ: Bordure grise */}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <Link 
                  href="/connexion"
                  // MODIFIÉ: Texte foncé, bordure grise, fond clair au survol
                  className="block px-4 py-3 text-center text-slate-600 hover:text-orange-600 hover:bg-gray-100/50 rounded-lg font-medium transition-all duration-300 border border-slate-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connexion
                </Link>
                {/* Bouton orange déjà OK */}
                <Link 
                  href="/publier"
                  className="block px-4 py-3 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
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