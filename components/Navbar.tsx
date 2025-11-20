'use client';

import {
  Menu,
  X,
  MapPin,
  Phone,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AnnonceModal from './AnnonceModal'; // Assurez-vous que le chemin est correct

export default function WassaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnoncePopup, setShowAnnoncePopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/service' },
    { name: 'Produits', href: '/produits' },
    { name: 'Nous Contactez', href: '/contact' },
  ];

  const activeItem = navItems.find(item => item.href === pathname)?.name || 'Accueil';

  // Cette fonction est appelée par le modal quand le formulaire est envoyé avec succès
  const handleFormSuccess = () => {
    setShowAnnoncePopup(false); // Ferme le modal
    setShowSuccess(true); // Affiche le toast
    setTimeout(() => setShowSuccess(false), 3000); // Cache le toast après 3s
  };

  return (
    <>
      {/* Toast Succès (Géré ici pour rester visible après fermeture du modal) */}
      {showSuccess && (
        <div className="fixed top-5 right-5 z-[9999] animate-slide-in">
          <div className="flex items-center gap-3 bg-white shadow-xl border-l-4 border-green-500 px-5 py-4 rounded-xl">
            <CheckCircle className="text-green-600 w-6 h-6" />
            <p className="text-slate-700 font-medium">
              Votre demande a été envoyée avec succès !
            </p>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center ml-36 gap-2 group cursor-pointer">
                <div className="p-1.5 bg-orange-50 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <span className="text-sm text-slate-600 font-medium">Casablanca, Maroc</span>
              </div>

              <Link
                href="tel:+212663833056"
                className="hidden sm:flex items-center gap-2"
              >
                <div className="p-1.5 bg-orange-50 rounded-full">
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

      {/* NAVBAR */}
      <header className="bg-[#F7F9F6] shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="group">
              <div className="relative w-72 h-16">
                <Image
                  src="/images/logo/logo.png"
                  alt="WassaExpress"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-5 py-2.5 text-sm font-semibold relative ${
                    activeItem === item.name ? 'text-orange-600' : 'text-slate-700 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setShowAnnoncePopup(true)}
                className="relative px-6 py-3 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                Publier une annonce
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-3">
            {navItems.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-orange-50"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowAnnoncePopup(true);
              }}
              className="w-full px-4 py-3 bg-orange-600 text-white rounded-xl font-bold shadow-md"
            >
              Publier une annonce
            </button>
          </div>
        )}
      </header>

      {/* LE COMPOSANT MODAL EST APPELÉ ICI */}
      <AnnonceModal 
        isOpen={showAnnoncePopup} 
        onClose={() => setShowAnnoncePopup(false)} 
        onSuccess={handleFormSuccess}
      />

      <style jsx global>{`
        .animate-slide-in {
          animation: slideIn 0.4s ease forwards;
        }
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}