'use client';

import { useState, useEffect, useMemo } from "react";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  MapPin, 
  Package, 
  Filter, 
  Search, 
  Heart, 
  Mail, 
  ArrowRight, 
  Calendar, 
  CheckCircle, 
  User, 
  Plane, 
  Truck 
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Flag from 'react-world-flags';
import Link from 'next/link';

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
        // Helper pour nettoyer les titres
        const decodeHtml = (html: string) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        };

        // On récupère un grand nombre d'annonces pour pouvoir filtrer côté client
        const res = await fetch(`${WP_API_URL}/annonce?per_page=100&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {};
          
          // Logique de type pour le filtrage URL et le visuel
          const typeString = acf.type ? acf.type.toString() : 'GP';
          const typeLower = typeString.toLowerCase();
          
          // Détections
          const isLivreur = typeLower.includes('livreur');
          const isTerrestre = typeLower.includes('terrestre') || typeLower.includes('camion') || typeLower.includes('routier');

          // Normalisation pour le filtre URL (params.type)
          let normalizedType = 'gp';
          if (isTerrestre) normalizedType = 'transport-terrestre';
          else if (isLivreur) normalizedType = 'livreur';

          return {
            id: item.id,
            slug: item.slug,
            title: decodeHtml(item.title.rendered),
            
            location: acf.location || 'Non spécifié',
            locationCountry: acf.departurecountrycode || 'Non spécifié', 
            
            destination: acf.destination || 'Non spécifié',
            destinationCountry: acf.arrivalcountrycode || 'Non spécifié',
            
            date: acf.date || 'Date à définir',
            price: acf.price || 'Prix non défini',
            
            type: normalizedType, // Pour le filtre de page
            
            // Propriétés pour le Design Premium
            badgeLabel: typeString,
            category: isLivreur ? 'livreur' : 'transport',
            isTerrestre: isTerrestre,
            badgeColor: isLivreur ? "bg-green-100 text-green-800" : "bg-[#E0F2FE] text-[#0369A1]",
            
            verified: acf.verified === true,
            departureCountryCode: acf.departurecountrycode,
            arrivalCountryCode: acf.arrivalcountrycode,
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

  // 2. LOGIQUE DE FILTRAGE
  const filteredByCategory = useMemo(() => {
    // Si pas de paramètre type dans l'URL, on montre tout, sinon on filtre
    if (!categoryType) return annonces;
    return annonces.filter(annonce => annonce.type === categoryType);
  }, [categoryType, annonces]);

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

  const getCategoryTitle = () => {
    switch (categoryType) {
      case 'gp': return 'GP (Transport Aérien)';
      case 'transport-terrestre': return 'Transport Terrestre';
      case 'livreur': return 'Livreurs Locaux';
      default: return 'Toutes les annonces';
    }
  };

  // --- 3. LE COMPOSANT VISUEL "CAPSULE" (Premium) ---
  const AnnonceVisual = ({ annonce }: { annonce: any }) => {
    // Transport (GP/Terrestre)
    if (annonce.category === 'transport' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
      return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transform transition-transform group-hover:scale-105">
                
                <div className="flex flex-col items-center gap-1">
                    <Flag code={annonce.departureCountryCode} className="w-10 h-8 rounded shadow-sm object-cover ring-1 ring-gray-100" style={{ width: '40px', height: '30px' }}/>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{annonce.departureCountryCode}</span>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 border-t-2 border-dashed border-gray-300 relative top-3"></div>
                    <div className="bg-[#F0F7FF] p-2 rounded-full relative z-10 text-[#104C9E]">
                        {annonce.isTerrestre ? (
                             <Truck className="w-5 h-5" />
                        ) : (
                             <Plane className="w-5 h-5" style={{ transform: 'rotate(45deg)' }} />
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <Flag code={annonce.arrivalCountryCode} className="w-10 h-8 rounded shadow-sm object-cover ring-1 ring-gray-100" style={{ width: '40px', height: '30px' }}/>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{annonce.arrivalCountryCode}</span>
                </div>
            </div>
        </div>
      );
    }
    // Livreur
    if (annonce.category === 'livreur' && annonce.departureCountryCode) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                 <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full"><User className="w-6 h-6 text-green-600" /></div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <Flag code={annonce.departureCountryCode} className="w-10 h-8 rounded shadow-sm object-cover" style={{ width: '40px', height: '30px' }}/>
                 </div>
            </div>
          );
    }
    // Fallback
    return <div className="flex items-center justify-center w-full h-full flex-col text-gray-300"><Package className="w-12 h-12 mb-1" /></div>;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#104C9E]">Chargement des annonces...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-4">
            <ArrowLeft className="w-5 h-5" /> <span className="font-medium">Retour</span>
          </button>

          <h1 className="text-4xl font-black text-[#104C9E] mb-2">{getCategoryTitle()}</h1>
          <p className="text-gray-600">{filteredAnnonces.length} annonce{filteredAnnonces.length > 1 ? 's' : ''} disponible{filteredAnnonces.length > 1 ? 's' : ''}</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Ville, destination..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent" />
              </div>
            </div>

            {/* PAYS DE DÉPART */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pays de départ (Code)</label>
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent">
                <option value="all">Tous les pays</option>
                {countries.map(country => (<option key={country} value={country}>{country}</option>))}
              </select>
            </div>

            {/* DESTINATION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pays de destination (Code)</label>
              <select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#104C9E] focus:border-transparent">
                <option value="all">Toutes les destinations</option>
                {destinations.map(dest => (<option key={dest} value={dest}>{dest}</option>))}
              </select>
            </div>
          </div>

          {(searchQuery || selectedCountry !== "all" || selectedDestination !== "all") && (
            <button onClick={() => { setSearchQuery(""); setSelectedCountry("all"); setSelectedDestination("all"); }} className="mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm">
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* LISTE DES RÉSULTATS AVEC LE NOUVEAU DESIGN DE CARTE */}
        {filteredAnnonces.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucune annonce trouvée</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAnnonces.map((annonce) => (
              <Link href={`/annonces/${annonce.slug}`} key={annonce.id} className="group cursor-pointer h-full">
                <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
                  
                  {/* ZONE VISUELLE (CAPSULE) */}
                  <div className="relative w-full h-52 bg-[#F8FAFC] group-hover:bg-[#F1F5F9] transition-colors p-4 flex items-center justify-center">
                    <AnnonceVisual annonce={annonce} />
                    
                    <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase ${annonce.badgeColor}`}>
                      {annonce.badgeLabel}
                    </span>
                    
                    {annonce.verified && (
                      <div className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    )}
                  </div>

                  {/* CONTENU */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#104C9E] transition-colors">
                        {annonce.title}
                      </h3>
                    </div>

                    <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-6 flex justify-center"><MapPin className="w-4 h-4 text-gray-400" /></div>
                        <span className="font-medium">{annonce.location}</span>
                      </div>
                      {annonce.category !== 'livreur' && (
                        <div className="flex items-center gap-3">
                            <div className="w-6 flex justify-center"><ArrowRight className="w-4 h-4 text-gray-400" /></div>
                            <span className="font-medium">{annonce.destination}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <div className="w-6 flex justify-center"><Calendar className="w-4 h-4 text-gray-400" /></div>
                        <span className={annonce.date === 'Disponible' ? 'text-green-600 font-bold' : ''}>{annonce.date}</span>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-gray-100 flex justify-between items-center mt-auto">
                      <div>
                        <span className="block text-xs text-gray-400 font-medium mb-0.5">Tarif</span>
                        <span className="text-xl font-extrabold text-[#FF5722]">{annonce.price}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="w-9 h-9 rounded-full bg-gray-50 hover:bg-red-50 flex items-center justify-center transition-colors group/btn" onClick={(e) => e.preventDefault()}>
                          <Heart className="w-4 h-4 text-gray-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-all" />
                        </button>
                        <button className="w-9 h-9 rounded-full bg-gray-50 hover:bg-[#104C9E] flex items-center justify-center transition-colors group/btn" onClick={(e) => e.preventDefault()}>
                          <Mail className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-all" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}