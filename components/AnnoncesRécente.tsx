'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Heart, Mail, Calendar, CheckCircle, User, Package } from "lucide-react";
import Flag from 'react-world-flags';

// URL API
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json/wp/v2';

const AnnoncesRecente = () => {
  const [recentAnnonces, setRecentAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // DIFFÉRENCE 1 : On charge 12 annonces
        const res = await fetch(`${WP_API_URL}/annonce?per_page=12&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {};
          
          // --- LOGIQUE EXACTE DE TOP ANNONCES ---
          // 1. Récupération du texte exact (ex: "Transport Terrestre")
          const typeString = acf.type ? acf.type.toString() : 'GP';
          const typeLower = typeString.toLowerCase();
          
          // 2. Distinction Livreur vs Transport (GP/Terrestre)
          const isLivreur = typeLower.includes('livreur');

          return {
            id: item.id,
            slug: item.slug,
            title: item.title.rendered,
            location: acf.location || "Lieu non précisé",
            destination: acf.destination || "-",
            date: acf.date || "Date à définir",
            price: acf.price || "Prix non défini",
            
            // TEXTE DU BADGE : On garde le texte original (ex: "Transport Terrestre")
            badgeLabel: typeString,
            
            // CATÉGORIE VISUELLE : Si ce n'est pas un livreur, c'est un Transport (2 drapeaux)
            category: isLivreur ? 'livreur' : 'transport',
            
            // COULEUR : Vert pour livreur, Bleu pour GP et Transport Terrestre
            badgeColor: isLivreur ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
            
            verified: acf.verified === true,
            departureCountryCode: acf.departurecountrycode,
            arrivalCountryCode: acf.arrivalcountrycode,
          };
        });

        setRecentAnnonces(formattedData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  // --- COMPOSANT VISUEL (IDENTIQUE À TOP ANNONCES) ---
  const AnnonceVisual = ({ annonce }: { annonce: any }) => {
    
    // CAS 1 : Transport International (GP OU Transport Terrestre) -> 2 Drapeaux
    if (annonce.category === 'transport' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
      return (
        <div className="flex items-center justify-center space-x-3 w-full h-full">
          <div className="relative">
            <Flag code={annonce.departureCountryCode} className="w-16 h-12 rounded-md shadow-sm object-cover" style={{ width: '64px', height: '48px' }} />
          </div>
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <div className="relative">
            <Flag code={annonce.arrivalCountryCode} className="w-16 h-12 rounded-md shadow-sm object-cover" style={{ width: '64px', height: '48px' }} />
          </div>
        </div>
      );
    }

    // CAS 2 : Livreur Local -> 1 Drapeau + Icône
    if (annonce.category === 'livreur' && annonce.departureCountryCode) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
              <div className="relative">
                 <div className="absolute inset-0 flex items-center justify-center"><User className="w-24 h-24 text-gray-200" /></div>
                 <div className="relative z-10 mt-8">
                  <Flag code={annonce.departureCountryCode} className="w-20 h-14 rounded-lg shadow-md object-cover mx-auto" style={{ width: '80px', height: '56px' }} />
                </div>
              </div>
              <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Livreur local</span>
            </div>
          );
    }

    // CAS 3 : Fallback
    return (
        <div className="flex items-center justify-center w-full h-full flex-col">
          <Package className="w-16 h-16 text-gray-300 mb-2" />
          <span className="text-xs text-gray-400">Pays manquants</span>
        </div>
      );
  };

  if (loading) return <div className="py-20 text-center text-gray-500">Chargement des annonces...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* HEADER AVEC BOUTON */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-[#104C9E]">Annonces Récentes</h2>
          <p className="text-gray-600 text-lg">Les dernières opportunités disponibles</p>
        </div>
        
        <Link href="/annonces" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center space-x-1 transition-colors">
          <span>Voir tout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* GRILLE IDENTIQUE */}
      <div className="grid md:grid-cols-3 gap-8">
        {recentAnnonces.map((annonce) => (
          <div key={annonce.id} onClick={() => window.location.href = `/annonces/${annonce.slug}`} className="group cursor-pointer">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
              
              {/* Section visuelle */}
              <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                
                <AnnonceVisual annonce={annonce} />
                
                {/* Badge avec le BON texte (Transport Terrestre) et la BONNE couleur (Bleue) */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${annonce.badgeColor} shadow-sm`}>
                  {annonce.badgeLabel}
                </span>
                
                {annonce.verified && (
                  <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                {/* Titre avec gestion des caractères spéciaux */}
                <h3 
                    className="text-xl font-bold text-gray-900 mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: annonce.title }} 
                />
                
                <div className="space-y-3 text-sm text-gray-700 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                    <span>{annonce.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2 w-24 flex-shrink-0">Destination :</span>
                    <span className="font-semibold text-gray-900">{annonce.destination}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                    {annonce.date === 'Disponible' ? <span className="text-green-600 font-bold">{annonce.date}</span> : <span>{annonce.date}</span>}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                  <span className="text-2xl font-extrabold text-orange-500">{annonce.price}</span>
                  <div className="flex space-x-3">
                    <button 
                      className="p-2 rounded-full hover:bg-red-50 transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                    <button 
                      className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Mail className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnoncesRecente;