'use client';

import {
  Menu,
  X,
  MapPin,
  Phone,
  Package,
  User,
  CheckCircle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WassaNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnoncePopup, setShowAnnoncePopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    typeService: 'GP',
    depart: '',
    destination: '',
    dateDepart: '',
    poids: '',
    description: ''
  });

  const pathname = usePathname();

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/service' },
    { name: 'Produits', href: '/produits' },
    { name: 'Nous Contactez', href: '/contact' },
  ];

  const activeItem = navItems.find(item => item.href === pathname)?.name || 'Accueil';

  useEffect(() => {
    document.body.style.overflow = showAnnoncePopup ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAnnoncePopup]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 🔔 Animation toast succès
  const triggerSuccessToast = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    // Simulation API
    setTimeout(() => {
      console.log('Formulaire envoyé : ', formData);

      // Reset
      setLoading(false);
      setShowAnnoncePopup(false);
      triggerSuccessToast();

      setFormData({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        typeService: 'GP',
        depart: '',
        destination: '',
        dateDepart: '',
        poids: '',
        description: ''
      });
    }, 1500);
  };

  return (
    <>
      {/* Toast Succès */}
      {showSuccess && (
        <div className="fixed top-5 right-5 z-[9999] animate-slide-in">
          <div className="flex items-center gap-3 bg-white shadow-xl border-l-4 border-green-500 px-5 py-4 rounded-xl">
            <CheckCircle className="text-green-600 w-6 h-6" />
            <p className="text-slate-700 font-medium">
              Votre annonce a été envoyée avec succès !
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

            {/* Desktop Navigation */}
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

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
         

              <button
                onClick={() => setShowAnnoncePopup(true)}
                className="relative px-6 py-3 bg-orange-600 text-white text-sm font-bold rounded-xl shadow-lg hover:scale-105 transition-all"
              >
                Publier une annonce
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
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

      {/* POPUP FORM */}
      {showAnnoncePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAnnoncePopup(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="sticky top-0 bg-orange-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Publier une annonce</h2>
                <button onClick={() => setShowAnnoncePopup(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Informations personnelles */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" />
                  Informations personnelles
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['nom', 'prenom', 'telephone', 'email'].map((field, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field.charAt(0).toUpperCase() + field.slice(1)} *
                      </label>
                      <input
                        type={field === 'email' ? 'email' : field === 'telephone' ? 'tel' : 'text'}
                        name={field}
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Détails annonce */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-500" />
                  Détails de l'annonce
                </h3>

                <select
                  name="typeService"
                  value={formData.typeService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                >
                  <option value="GP">Groupage de Personnes</option>
                  <option value="LIVREUR">Livreur Local</option>
                  <option value="FRET">Fret Aérien</option>
                  <option value="MARITIME">Fret Maritime</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {['depart', 'destination'].map((field, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {field === 'depart' ? 'Ville de départ *' : 'Ville de destination *'}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Date de départ *
                    </label>
                    <input
                      type="date"
                      name="dateDepart"
                      value={formData.dateDepart}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Poids estimé
                    </label>
                    <input
                      type="number"
                      name="poids"
                      value={formData.poids}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full mt-4 px-4 py-2.5 border border-gray-300 rounded-lg resize-none"
                  placeholder="Décrivez votre demande..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAnnoncePopup(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-slate-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:scale-105 shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                  ) : (
                    'Envoyer ma demande'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        .animate-slide-in {
          animation: slideIn 0.4s ease forwards;
        }
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.35s ease;
        }
        @keyframes fadeIn {
          from {
            transform: scale(0.94);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
