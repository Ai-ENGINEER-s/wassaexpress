'use client';

import { useState, useMemo } from "react";
import { ArrowLeft, Check, MapPin, Star, Filter, Search, MessageCircle, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LivreursList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  const allLivreurs = [
    {
      id: 1,
      name: "Ahmed El Mansouri",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      location: "Casablanca",
      locationCountry: "Maroc",
      destination: "Paris",
      destinationCountry: "France",
      rating: 4.9,
      completedDeliveries: 156,
      responseTime: "< 1h",
      price: "8€/Kg",
      verified: true,
      specialties: ["Documents", "Colis fragiles"],
      phone: "+212612345678",
      whatsapp: "+212612345678",
      available: true,
      description: "Livreur professionnel avec plus de 5 ans d'expérience"
    },
    {
      id: 2,
      name: "Mohammed Benali",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      location: "Casablanca",
      locationCountry: "Maroc",
      destination: "Paris",
      destinationCountry: "France",
      rating: 4.7,
      completedDeliveries: 89,
      responseTime: "< 2h",
      price: "9€/Kg",
      verified: true,
      specialties: ["Vêtements", "Alimentaire"],
      phone: "+212623456789",
      whatsapp: "+212623456789",
      available: true,
      description: "Spécialiste des envois alimentaires et textiles"
    },
    {
      id: 3,
      name: "Fatima Zahra",
      profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
      location: "Rabat",
      locationCountry: "Maroc",
      destination: "Paris",
      destinationCountry: "France",
      rating: 4.8,
      completedDeliveries: 203,
      responseTime: "< 30min",
      price: "10€/Kg",
      verified: true,
      specialties: ["Express", "Volumineux"],
      phone: "+212634567890",
      whatsapp: "+212634567890",
      available: false,
      description: "Service express garanti, livraison rapide et sécurisée"
    },
    {
      id: 4,
      name: "Mamadou Diallo",
      profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
      location: "Dakar",
      locationCountry: "Sénégal",
      destination: "Montréal",
      destinationCountry: "Canada",
      rating: 4.6,
      completedDeliveries: 67,
      responseTime: "< 3h",
      price: "12$/Kg",
      verified: true,
      specialties: ["Documents", "Électronique"],
      phone: "+221771234567",
      whatsapp: "+221771234567",
      available: true,
      description: "Expert en envois internationaux vers le Canada"
    },
    {
      id: 5,
      name: "Jean-Pierre Dubois",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
      location: "Paris",
      locationCountry: "France",
      destination: "Casablanca",
      destinationCountry: "Maroc",
      rating: 4.9,
      completedDeliveries: 234,
      responseTime: "< 1h",
      price: "7€/Kg",
      verified: true,
      specialties: ["Tous types", "Volumineux"],
      phone: "+33612345678",
      whatsapp: "+33612345678",
      available: true,
      description: "Transporteur fiable pour tous types de colis"
    }
  ];

  const countries = useMemo(() => {
    const countriesSet = new Set<string>();
    allLivreurs.forEach(livreur => {
      countriesSet.add(livreur.locationCountry);
    });
    return Array.from(countriesSet).sort();
  }, []);

  const destinations = useMemo(() => {
    const destinationsSet = new Set<string>();
    allLivreurs.forEach(livreur => {
      destinationsSet.add(livreur.destinationCountry);
    });
    return Array.from(destinationsSet).sort();
  }, []);

  const filteredLivreurs = useMemo(() => {
    return allLivreurs.filter(livreur => {
      const matchesSearch = 
        livreur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        livreur.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        livreur.destination.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = 
        selectedCountry === "all" || livreur.locationCountry === selectedCountry;
      
      const matchesDestination = 
        selectedDestination === "all" || livreur.destinationCountry === selectedDestination;

      const matchesAvailable = !availableOnly || livreur.available;

      return matchesSearch && matchesCountry && matchesDestination && matchesAvailable;
    });
  }, [searchQuery, selectedCountry, selectedDestination, availableOnly]);

  const handleWhatsAppContact = (e: React.MouseEvent, phone: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(`Bonjour ${name}, je souhaite envoyer un colis`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handlePhoneContact = (e: React.MouseEvent, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#104C9E]">
                Livreurs Professionnels
              </h1>
              <p className="text-gray-500 mt-1">
                {filteredLivreurs.length} livreur{filteredLivreurs.length > 1 ? 's' : ''} disponible{filteredLivreurs.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-[#104C9E]" />
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom, ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent"
              >
                <option value="all">Tous les pays</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent"
              >
                <option value="all">Toutes les destinations</option>
                {destinations.map(dest => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilité
              </label>
              <label className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 text-[#104C9E] rounded focus:ring-[#104C9E]"
                />
                <span className="text-sm text-gray-700">Disponibles uniquement</span>
              </label>
            </div>
          </div>

          {(searchQuery || selectedCountry !== "all" || selectedDestination !== "all" || availableOnly) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCountry("all");
                setSelectedDestination("all");
                setAvailableOnly(false);
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {filteredLivreurs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun livreur trouvé
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLivreurs.map((livreur) => (
              <Link
                key={livreur.id}
                href={`/livreurs/${livreur.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 relative group-hover:from-blue-100 group-hover:to-orange-100 transition-colors">
                  {livreur.verified && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {!livreur.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Occupé
                      </span>
                    </div>
                  )}

                  {livreur.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-pulse">
                        Disponible
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={livreur.profileImage}
                          alt={livreur.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {livreur.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{livreur.location}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium">{livreur.destination}</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      {livreur.description}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900">{livreur.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Note</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 mb-1">{livreur.completedDeliveries}</div>
                      <p className="text-xs text-gray-500">Livraisons</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600 mb-1">{livreur.responseTime}</div>
                      <p className="text-xs text-gray-500">Réponse</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Spécialités:</p>
                    <div className="flex flex-wrap gap-2">
                      {livreur.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Tarif</p>
                    <p className="text-2xl font-bold text-orange-600">{livreur.price}</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={(e) => handleWhatsAppContact(e, livreur.whatsapp, livreur.name)}
                      disabled={!livreur.available}
                      className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
                        livreur.available
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={(e) => handlePhoneContact(e, livreur.phone)}
                      disabled={!livreur.available}
                      className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
                        livreur.available
                          ? 'bg-[#104C9E] hover:bg-[#0d3d7f] text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Appeler</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LivreursList;