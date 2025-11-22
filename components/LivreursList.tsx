'use client';

import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Check, MapPin, Star, Filter, Search, MessageCircle, Phone, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Flag from 'react-world-flags';

// VOTRE URL API LOCALE
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json/wp/v2';

const LivreursList = () => {
  const router = useRouter();
  
  // États
  const [allLivreurs, setAllLivreurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // États de filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedDestination, setSelectedDestination] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  // 1. CHARGEMENT DES DONNÉES
  useEffect(() => {
    const fetchLivreurs = async () => {
      try {
        const decodeHtml = (html: string) => {
            const txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        };

        const res = await fetch(`${WP_API_URL}/livreur?per_page=100&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {};
          
          return {
            id: item.id,
            name: decodeHtml(item.title.rendered),
            profileImage: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/150',
            
            location: acf.location || "", 
            countryCode: acf.arrivalcountrycode || "", 
            
            destination: acf.destination || "",
            destinationCountry: acf.arrivalcountrycode || "",
            
            rating: acf.rating || 5.0,
            completedDeliveries: acf.completeddeliveries || 0,
            responseTime: acf.responsetime || "Rapide",
            price: acf.transportfee || "Sur devis",
            
            verified: acf.verified === true,
            specialties: acf.specialties ? acf.specialties.split('\n') : [],
            phone: acf.phone,
            whatsapp: acf.whatsapp,
            available: acf.available === true,
          };
        });

        setAllLivreurs(formattedData);
      } catch (error) {
        console.error("Erreur chargement livreurs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLivreurs();
  }, []);

  // 2. LOGIQUE DE FILTRAGE
  const countries = useMemo(() => {
    const countriesSet = new Set<string>();
    allLivreurs.forEach(livreur => {
      if (livreur.locationCountry) countriesSet.add(livreur.locationCountry);
    });
    return Array.from(countriesSet).sort();
  }, [allLivreurs]);

  const filteredLivreurs = useMemo(() => {
    return allLivreurs.filter(livreur => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        (livreur.name && livreur.name.toLowerCase().includes(searchLower)) ||
        (livreur.location && livreur.location.toLowerCase().includes(searchLower));
      
      const matchesAvailable = !availableOnly || livreur.available;

      return matchesSearch && matchesAvailable;
    });
  }, [allLivreurs, searchQuery, availableOnly]);

  // 3. HANDLERS
  const handleWhatsAppContact = (e: React.MouseEvent, phone: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phone) return alert("Numéro WhatsApp non disponible");
    const message = encodeURIComponent(`Bonjour ${name}, je souhaite envoyer un colis via Wassa Express.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handlePhoneContact = (e: React.MouseEvent, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!phone) return alert("Numéro de téléphone non disponible");
    window.location.href = `tel:${phone}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button onClick={() => router.back()} className="flex items-center space-x-2 text-gray-500 hover:text-black transition mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Livreurs</h1>
              <p className="text-gray-500 text-sm mt-1">
                {filteredLivreurs.length} professionnels disponibles
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* FILTRES */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input
               type="text"
               placeholder="Rechercher un nom, une ville..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
             />
          </div>
          
          <label className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
             <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="rounded border-gray-300 text-black focus:ring-0" />
             <span className="text-sm text-gray-600">Disponibles</span>
          </label>
        </div>

        {/* GRILLE DES LIVREURS */}
        {filteredLivreurs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">Aucun livreur trouvé.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLivreurs.map((livreur) => (
              <Link
                key={livreur.id}
                href={`/livreurs/${livreur.id}`}
                className="bg-white rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col"
              >
                {/* HEADER CARTE */}
                <div className="p-6 flex flex-col items-center relative">
                   
                   {/* Badge Statut */}
                   <div className="absolute top-4 left-4">
                      {livreur.available ? (
                         <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Disponible</span>
                      ) : (
                         <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">Occupé</span>
                      )}
                   </div>

                   {/* Badge Vérifié */}
                   {livreur.verified && (
                      <div className="absolute top-4 right-4 text-emerald-500">
                         <Check className="w-5 h-5" />
                      </div>
                   )}

                   {/* Avatar */}
                   <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50">
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

                   {/* Nom */}
                   <h3 className="text-lg font-bold text-gray-900 mb-1">{livreur.name}</h3>
                   
                   {/* LOCALISATION + DRAPEAU (AVEC MAP PIN FORCÉ) */}
                   <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-1">
                      
                      {/* L'icône MapPin est maintenant TOUJOURS visible pour indiquer la localisation */}
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      
                      {/* Si la ville existe, on l'affiche */}
                      {livreur.location && (
                         <span>{livreur.location}</span>
                      )}

                      {/* Si le pays existe, on affiche le drapeau */}
                      {livreur.countryCode && (
                         <div className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            <Flag code={livreur.countryCode} className="w-5 h-3.5 object-cover rounded-[2px]" />
                         </div>
                      )}

                   </div>
                </div>

                {/* STATS */}
                <div className="border-t border-gray-100 grid grid-cols-3 divide-x divide-gray-100 bg-gray-50/50">
                   <div className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1 font-bold text-gray-900">
                         <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                         {livreur.rating}
                      </div>
                      <p className="text-[10px] text-gray-400 uppercase mt-0.5">Avis</p>
                   </div>
                   <div className="py-3 text-center">
                      <div className="font-bold text-gray-900">{livreur.completedDeliveries}</div>
                      <p className="text-[10px] text-gray-400 uppercase mt-0.5">Colis</p>
                   </div>
                   <div className="py-3 text-center">
                      <div className="font-bold text-green-600">{livreur.responseTime}</div>
                      <p className="text-[10px] text-gray-400 uppercase mt-0.5">Réponse</p>
                   </div>
                </div>

                {/* TARIF */}
                <div className="py-4 text-center">
                   <p className="text-xs text-gray-400 font-bold uppercase">Tarif de base</p>
                   <p className="text-xl font-black text-orange-500">{livreur.price}</p>
                </div>

                {/* BOUTONS */}
                <div className="p-4 pt-0 mt-auto grid grid-cols-2 gap-3">
                   <button
                      onClick={(e) => handleWhatsAppContact(e, livreur.whatsapp, livreur.name)}
                      disabled={!livreur.available}
                      className={`py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                         livreur.available ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                   >
                      <MessageCircle className="w-4 h-4" /> WhatsApp
                   </button>
                   <button
                      onClick={(e) => handlePhoneContact(e, livreur.phone)}
                      disabled={!livreur.available}
                      className={`py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors ${
                         livreur.available ? "bg-[#104C9E] hover:bg-[#0d3d7f] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                   >
                      <Phone className="w-4 h-4" /> Appeler
                   </button>
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