'use client';

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Check, Clock, MapPin, Package, Filter, Search, Heart, Mail } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

// VOTRE URL LOCALE
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json/wp/v2';

export default function AnnoncesPage() {
  const router = useRouter();
  const params = useParams();
  const categoryType = params.type as string; // ex: 'gp' ou 'transport-terrestre'

  // États
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États de filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");

  // 1. CHARGEMENT DES DONNÉES API
  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // On récupère un grand nombre d'annonces pour pouvoir filtrer côté client
        const res = await fetch(`${WP_API_URL}/annonce?per_page=100&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {};
          
          // Normalisation du type pour faciliter le filtrage
          // ex: "Transport Terrestre" devient "transport-terrestre"
          let normalizedType = 'gp';
          const acfType = acf.type ? acf.type.toLowerCase() : '';

          if (acfType.includes('terrestre') || acfType.includes('routier')) {
            normalizedType = 'transport-terrestre';
          } else if (acfType.includes('livreur')) {
            normalizedType = 'livreur';
          } else {
            normalizedType = 'gp';
          }

          return {
            id: item.id,
            slug: item.slug,
            title: item.title.rendered,
            location: acf.location || 'Non spécifié',
            // On utilise le code pays pour le filtre (ex: SN, FR)
            locationCountry: acf.departurecountrycode || 'Non spécifié', 
            destination: acf.destination || 'Non spécifié',
            // On utilise le code pays pour le filtre
            destinationCountry: acf.arrivalcountrycode || 'Non spécifié',
            date: acf.date || 'Date à définir',
            price: acf.price || 'Prix non défini',
            type: normalizedType, // Notre type normalisé
            verified: acf.verified === true,
          };
        });

        setAnnonces(formattedData);
      } catch (error) {
        console.error("Erreur chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  // 2. LOGIQUE DE FILTRAGE (Similaire à avant, mais sur les données API)

  // Filtrer par catégorie (GP ou Transport Terrestre)
  const filteredByCategory = useMemo(() => {
    return annonces.filter(annonce => annonce.type === categoryType);
  }, [categoryType, annonces]);

  // Pays et destinations dynamiques basés sur les résultats
  const countries = useMemo(() => {
    const countriesSet = new Set<string>();
    filteredByCategory.forEach(annonce => {
      if (annonce.locationCountry && annonce.locationCountry !== 'Non spécifié') {
        countriesSet.add(annonce.locationCountry);
      }
    });
    return Array.from(countriesSet).sort();
  }, [filteredByCategory]);

  const destinations = useMemo(() => {
    const destinationsSet = new Set<string>();
    filteredByCategory.forEach(annonce => {
      if (annonce.destinationCountry && annonce.destinationCountry !== 'Non spécifié') {
        destinationsSet.add(annonce.destinationCountry);
      }
    });
    return Array.from(destinationsSet).sort();
  }, [filteredByCategory]);

  // Filtrage final (Recherche + Selects)
  const filteredAnnonces = useMemo(() => {
    return filteredByCategory.filter(annonce => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (annonce.title && annonce.title.toLowerCase().includes(searchLower)) ||
        (annonce.location && annonce.location.toLowerCase().includes(searchLower)) ||
        (annonce.destination && annonce.destination.toLowerCase().includes(searchLower));
      
      const matchesCountry = 
        selectedCountry === "all" || annonce.locationCountry === selectedCountry;
      
      const matchesDestination = 
        selectedDestination === "all" || annonce.destinationCountry === selectedDestination;

      return matchesSearch && matchesCountry && matchesDestination;
    });
  }, [filteredByCategory, searchQuery, selectedCountry, selectedDestination]);

  // Titre de la page
  const getCategoryTitle = () => {
    switch (categoryType) {
      case 'gp':
        return 'GP (Transport Aérien)';
      case 'transport-terrestre':
        return 'Transport Terrestre';
      default:
        return 'Annonces';
    }
  };

  const handleAnnonceClick = (slug: string) => {
    router.push(`/annonces/${slug}`);
  };

  // --- RENDU ---

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement des annonces...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          <h1 className="text-4xl font-black text-[#104C9E] mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600">
            {filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''} disponible{filteredAnnonces.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

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
                Pays de départ (Code)
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
                Pays de destination (Code)
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

          {/* RESET */}
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

        {/* LISTE DES RÉSULTATS */}
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
                {/* HEADER CARTE */}
                <div className="h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative border-b border-gray-200">
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 uppercase">
                    {categoryType === 'gp' ? 'GP' : 'TERRESTRE'}
                  </span>

                  {annonce.verified && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}

                  <Package className="w-16 h-16 text-gray-300 group-hover:text-orange-400 transition" />
                </div>

                {/* CONTENU CARTE */}
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

                  {/* FOOTER CARTE */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-2xl font-extrabold text-orange-500">
                      {annonce.price}
                    </span>

                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-2 rounded-xl hover:bg-gray-100 transition"
                      >
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
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
}