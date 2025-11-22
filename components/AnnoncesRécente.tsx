'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  MapPin, 
  Heart, 
  Mail, 
  Calendar, 
  CheckCircle, 
  User, 
  Package, 
  Plane,
  Truck // Ajout de l'icône camion
} from "lucide-react";
import Flag from 'react-world-flags';

// URL API
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json/wp/v2';

const AnnoncesRecente = () => {
  const [recentAnnonces, setRecentAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const decodeHtml = (html: string) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        };

        const res = await fetch(`${WP_API_URL}/annonce?per_page=12&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {};
          
          const typeString = acf.type ? acf.type.toString() : 'GP';
          const typeLower = typeString.toLowerCase();
          const isLivreur = typeLower.includes('livreur');
          // Détection si c'est terrestre pour changer l'icône
          const isTerrestre = typeLower.includes('terrestre') || typeLower.includes('camion');

          return {
            id: item.id,
            slug: item.slug,
            title: decodeHtml(item.title.rendered),
            location: acf.location || "Lieu non précisé",
            destination: acf.destination || "-",
            date: acf.date || "Date à définir",
            price: acf.price || "Prix non défini",
            badgeLabel: typeString,
            category: isLivreur ? 'livreur' : 'transport',
            isTerrestre: isTerrestre, // Nouvelle propriété
            badgeColor: isLivreur ? "bg-green-100 text-green-800" : "bg-[#E0F2FE] text-[#0369A1]",
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

  // --- NOUVEAU DESIGN VISUEL : LA "CAPSULE" ---
  const AnnonceVisual = ({ annonce }: { annonce: any }) => {
    
    // Transport International (GP ou Camion)
    if (annonce.category === 'transport' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
      return (
        <div className="w-full h-full flex items-center justify-center">
            {/* La Capsule Flottante */}
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transform transition-transform group-hover:scale-105">
                
                {/* Drapeau Départ */}
                <div className="flex flex-col items-center gap-1">
                    <Flag 
                        code={annonce.departureCountryCode} 
                        className="w-10 h-8 rounded shadow-sm object-cover ring-1 ring-gray-100" 
                        style={{ width: '40px', height: '30px' }}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{annonce.departureCountryCode}</span>
                </div>

                {/* Connecteur (Avion ou Camion) */}
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

                {/* Drapeau Arrivée */}
                <div className="flex flex-col items-center gap-1">
                    <Flag 
                        code={annonce.arrivalCountryCode} 
                        className="w-10 h-8 rounded shadow-sm object-cover ring-1 ring-gray-100" 
                        style={{ width: '40px', height: '30px' }}
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{annonce.arrivalCountryCode}</span>
                </div>

            </div>
        </div>
      );
    }

    // Livreur Local
    if (annonce.category === 'livreur' && annonce.departureCountryCode) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                 <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                    <div className="bg-green-50 p-2 rounded-full">
                        <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <Flag 
                        code={annonce.departureCountryCode} 
                        className="w-10 h-8 rounded shadow-sm object-cover" 
                        style={{ width: '40px', height: '30px' }}
                    />
                 </div>
            </div>
          );
    }

    return (
        <div className="flex items-center justify-center w-full h-full flex-col text-gray-300">
          <Package className="w-12 h-12 mb-1" />
        </div>
      );
  };

  if (loading) return <div className="py-20 text-center text-gray-500 animate-pulse">Chargement des offres...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-transparent">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-[#104C9E] tracking-tight">Dernières Annonces</h2>
          <p className="text-gray-500 mt-2">Trouvez le transporteur idéal pour vos colis</p>
        </div>
        
        <Link href="/annonces" className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full hover:border-[#104C9E] hover:text-[#104C9E] transition-all shadow-sm">
          <span className="font-semibold text-sm">Tout voir</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* GRILLE */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentAnnonces.map((annonce) => (
          <div key={annonce.id} onClick={() => window.location.href = `/annonces/${annonce.slug}`} className="group cursor-pointer h-full">
            <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
              
              {/* ZONE VISUELLE (FOND DÉGRADÉ + CAPSULE) */}
              <div className="relative w-full h-48 bg-[#F8FAFC] group-hover:bg-[#F1F5F9] transition-colors p-4">
                
                <AnnonceVisual annonce={annonce} />
                
                {/* Badge Type (Flottant en haut à gauche) */}
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase ${annonce.badgeColor}`}>
                  {annonce.badgeLabel}
                </span>
                
                {/* Vérifié (Flottant en haut à droite) */}
                {annonce.verified && (
                  <div className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow-sm" title="Vérifié">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                )}
              </div>

              {/* CONTENU DE LA CARTE */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-[#104C9E] transition-colors">
                        {annonce.title}
                    </h3>
                </div>
                
                <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center"><MapPin className="w-4 h-4 text-gray-400" /></div>
                    <span className="font-medium">{annonce.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center"><ArrowRight className="w-4 h-4 text-gray-400" /></div>
                    <span className="font-medium">{annonce.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 flex justify-center"><Calendar className="w-4 h-4 text-gray-400" /></div>
                    <span className={`${annonce.date === 'Disponible' ? 'text-green-600 font-bold' : ''}`}>{annonce.date}</span>
                  </div>
                </div>

                {/* FOOTER DE LA CARTE */}
                <div className="pt-5 border-t border-gray-100 flex justify-between items-center mt-auto">
                  <div>
                      <span className="block text-xs text-gray-400 font-medium mb-0.5">Tarif</span>
                      <span className="text-xl font-extrabold text-[#FF5722]">{annonce.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className="w-9 h-9 rounded-full bg-gray-50 hover:bg-red-50 flex items-center justify-center transition-colors group/btn"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Heart className="w-4 h-4 text-gray-400 group-hover/btn:text-red-500 group-hover/btn:fill-red-500 transition-all" />
                    </button>
                    <button 
                      className="w-9 h-9 rounded-full bg-gray-50 hover:bg-[#104C9E] flex items-center justify-center transition-colors group/btn"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <Mail className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-all" />
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