'use client';

import { useState, useMemo } from "react";
import { ArrowLeft, Check, Clock, MapPin, Package, Filter, Search, Heart, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface AnnoncesListProps {
  categoryType: string;
}

const AnnoncesList = ({ categoryType }: AnnoncesListProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");

  // Données d'exemple - TOUTES LES ANNONCES
  const allAnnonces = [
    // === ANNONCES GP (Transport aérien) ===
    {
      id: 1,
      slug: "dakar-paris-11-novembre-2025",
      title: "Dakar/Paris le 11 Novembre 2025",
      location: "Dakar/M'bour",
      locationCountry: "Sénégal",
      destination: "Paris",
      destinationCountry: "France",
      date: "novembre 11, 2025",
      price: "10€/Kg",
      type: "gp",
      verified: true,
    },
    {
      id: 2,
      slug: "3m-business-gp-senegal-canada",
      title: "3M BUSINESS GP SENEGAL-CANADA",
      location: "Dakar",
      locationCountry: "Sénégal",
      destination: "Montréal",
      destinationCountry: "Canada",
      date: "novembre 10, 2025",
      price: "15$/Kg",
      type: "gp",
      verified: true,
    },
    {
      id: 3,
      slug: "paris-dakar-vol-direct",
      title: "Paris/Dakar Vol Direct",
      location: "Paris",
      locationCountry: "France",
      destination: "Dakar",
      destinationCountry: "Sénégal",
      date: "novembre 25, 2025",
      price: "11€/Kg",
      type: "gp",
      verified: true,
    },
    {
      id: 4,
      slug: "casablanca-new-york-gp",
      title: "Casablanca/New York GP",
      location: "Casablanca",
      locationCountry: "Maroc",
      destination: "New York",
      destinationCountry: "États-Unis",
      date: "décembre 1, 2025",
      price: "18$/Kg",
      type: "gp",
      verified: true,
    },
    {
      id: 5,
      slug: "abidjan-paris-colis-express",
      title: "Abidjan/Paris Colis Express",
      location: "Abidjan",
      locationCountry: "Côte d'Ivoire",
      destination: "Paris",
      destinationCountry: "France",
      date: "novembre 18, 2025",
      price: "12€/Kg",
      type: "gp",
      verified: false,
    },
    {
      id: 6,
      slug: "lagos-london-gp-service",
      title: "Lagos/London GP Service",
      location: "Lagos",
      locationCountry: "Nigéria",
      destination: "London",
      destinationCountry: "Royaume-Uni",
      date: "novembre 22, 2025",
      price: "14£/Kg",
      type: "gp",
      verified: true,
    },
    
    // === ANNONCES TRANSPORT TERRESTRE (Camion) ===
    {
      id: 7,
      slug: "casablanca-paris-transport-terrestre",
      title: "Casablanca/Paris Transport Express",
      location: "Casablanca",
      locationCountry: "Maroc",
      destination: "Paris",
      destinationCountry: "France",
      date: "novembre 15, 2025",
      price: "6€/Kg",
      type: "transport-terrestre",
      verified: true,
    },
    {
      id: 8,
      slug: "rabat-madrid-camion",
      title: "Rabat/Madrid par Camion",
      location: "Rabat",
      locationCountry: "Maroc",
      destination: "Madrid",
      destinationCountry: "Espagne",
      date: "novembre 20, 2025",
      price: "5€/Kg",
      type: "transport-terrestre",
      verified: true,
    },
    {
      id: 9,
      slug: "tanger-barcelone-camion",
      title: "Tanger/Barcelone Transport Routier",
      location: "Tanger",
      locationCountry: "Maroc",
      destination: "Barcelone",
      destinationCountry: "Espagne",
      date: "novembre 28, 2025",
      price: "5€/Kg",
      type: "transport-terrestre",
      verified: true,
    },
    {
      id: 10,
      slug: "marrakech-marseille-terrestre",
      title: "Marrakech/Marseille Camion",
      location: "Marrakech",
      locationCountry: "Maroc",
      destination: "Marseille",
      destinationCountry: "France",
      date: "décembre 5, 2025",
      price: "7€/Kg",
      type: "transport-terrestre",
      verified: false,
    },
    {
      id: 11,
      slug: "agadir-paris-transport-routier",
      title: "Agadir/Paris Transport Routier",
      location: "Agadir",
      locationCountry: "Maroc",
      destination: "Paris",
      destinationCountry: "France",
      date: "novembre 30, 2025",
      price: "6.5€/Kg",
      type: "transport-terrestre",
      verified: true,
    },
  ];

  console.log('Category Type reçu:', categoryType);
  console.log('Nombre total d\'annonces:', allAnnonces.length);

  // Filtrer les annonces selon la catégorie
  const filteredByCategory = useMemo(() => {
    const filtered = allAnnonces.filter(annonce => annonce.type === categoryType);
    console.log('Annonces filtrées par catégorie:', filtered.length);
    return filtered;
  }, [categoryType]);

  // Extraire les pays uniques pour les filtres
  const countries = useMemo(() => {
    const countriesSet = new Set<string>();
    filteredByCategory.forEach(annonce => {
      countriesSet.add(annonce.locationCountry);
    });
    return Array.from(countriesSet).sort();
  }, [filteredByCategory]);

  const destinations = useMemo(() => {
    const destinationsSet = new Set<string>();
    filteredByCategory.forEach(annonce => {
      destinationsSet.add(annonce.destinationCountry);
    });
    return Array.from(destinationsSet).sort();
  }, [filteredByCategory]);

  // Filtrage des annonces
  const filteredAnnonces = useMemo(() => {
    return filteredByCategory.filter(annonce => {
      const matchesSearch = 
        annonce.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        annonce.destination.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCountry = 
        selectedCountry === "all" || annonce.locationCountry === selectedCountry;
      
      const matchesDestination = 
        selectedDestination === "all" || annonce.destinationCountry === selectedDestination;

      return matchesSearch && matchesCountry && matchesDestination;
    });
  }, [filteredByCategory, searchQuery, selectedCountry, selectedDestination]);

  const getCategoryTitle = () => {
    switch (categoryType) {
      case 'gp':
        return 'Annonces GP (Transport Aérien)';
      case 'transport-terrestre':
        return 'Transport Terrestre (Camion)';
      default:
        return 'Annonces';
    }
  };

  const getCategoryDescription = () => {
    switch (categoryType) {
      case 'gp':
        return 'Transport de colis par avion - Livraison rapide internationale';
      case 'transport-terrestre':
        return 'Transport de colis par camion - Solution économique pour l\'Europe';
      default:
        return '';
    }
  };

  const handleAnnonceClick = (slug: string) => {
    router.push(`/annonces/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
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
                {getCategoryTitle()}
              </h1>
              <p className="text-gray-500 mt-1">
                {getCategoryDescription()}
              </p>
              <p className="text-gray-600 mt-2 font-medium">
                {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''} disponible{filteredAnnonces.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* FILTRES */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-[#104C9E]" />
            <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* RECHERCHE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ville, destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent"
                />
              </div>
            </div>

            {/* PAYS DE DÉPART */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays de départ
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

            {/* DESTINATION */}
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
          </div>

          {/* BOUTON RESET */}
          {(searchQuery || selectedCountry !== "all" || selectedDestination !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCountry("all");
                setSelectedDestination("all");
              }}
              className="mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* LISTE DES ANNONCES */}
        {filteredAnnonces.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucune annonce trouvée
            </h3>
            <p className="text-gray-500">
              Essayez de modifier vos filtres de recherche
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnnonces.map((annonce) => (
              <div
                key={annonce.id}
                onClick={() => handleAnnonceClick(annonce.slug)}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer"
              >
                {/* HEADER */}
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative border-b border-gray-200">
                  {/* BADGE TYPE */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700">
                    {categoryType === 'gp' ? 'GP' : 'TERRESTRE'}
                  </span>

                  {/* VERIFIED */}
                  {annonce.verified && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}

                  {/* ICON */}
                  <Package className="w-16 h-16 text-gray-300 group-hover:text-orange-400 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition">
                    {annonce.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 opacity-70 text-orange-500" />
                      {annonce.location}
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Destination :</span>
                      <span className="font-medium text-gray-900">
                        {annonce.destination}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {annonce.date}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-extrabold text-orange-500">
                      {annonce.price}
                    </span>

                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Favori:', annonce.title);
                        }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Message:', annonce.title);
                        }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-blue-500 transition" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnoncesList;