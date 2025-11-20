'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Heart, Mail, CheckCircle, ArrowRight, User, Package } from 'lucide-react';
import Flag from 'react-world-flags';

// URL API (Local)
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json/wp/v2';

const TopAnnonces = () => {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        // ✅ C'EST ICI QUE LA LIMITE SE FAIT : per_page=3
        // WordPress renvoie par défaut les plus récentes en premier.
        const res = await fetch(`${WP_API_URL}/annonce?per_page=3&_embed`);
        const data = await res.json();

        const formattedData = data.map((item: any) => {
          const acf = item.acf || {}; 
          const typeRaw = acf.type ? acf.type.toString().toLowerCase().trim() : 'gp';
          const isLivreur = typeRaw.includes('livreur');

          return {
            id: item.id,
            slug: item.slug,
            type: isLivreur ? 'livreur' : 'gp',
            title: item.title.rendered,
            badge: acf.type || 'GP',
            badgeColor: isLivreur ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800",
            
            location: acf.location || "Lieu non précisé", 
            destination: acf.destination || "-",
            date: acf.date || "Date à définir",
            price: acf.price || "Prix non défini",
            
            verified: acf.verified === true,
            departureCountryCode: acf.departurecountrycode, 
            arrivalCountryCode: acf.arrivalcountrycode, 
          };
        });

        setAnnonces(formattedData);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  const AnnonceVisual = ({ annonce }: { annonce: any }) => {
    if (annonce.type === 'gp' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
      return (
        <div className="flex items-center justify-center space-x-3 w-full h-full">
          <div className="relative"><Flag code={annonce.departureCountryCode} className="w-16 h-12 rounded-md shadow-sm object-cover" style={{ width: '64px', height: '48px' }} /></div>
          <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2"><ArrowRight className="w-5 h-5 text-white" /></div>
          <div className="relative"><Flag code={annonce.arrivalCountryCode} className="w-16 h-12 rounded-md shadow-sm object-cover" style={{ width: '64px', height: '48px' }} /></div>
        </div>
      );
    }
    if (annonce.type === 'livreur' && annonce.departureCountryCode) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
          <div className="relative">
             <div className="absolute inset-0 flex items-center justify-center"><User className="w-24 h-24 text-gray-200" /></div>
             <div className="relative z-10 mt-8"><Flag code={annonce.departureCountryCode} className="w-20 h-14 rounded-lg shadow-md object-cover mx-auto" style={{ width: '80px', height: '56px' }} /></div>
          </div>
          <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">Livreur local</span>
        </div>
      );
    }
    return <div className="flex items-center justify-center w-full h-full flex-col"><Package className="w-16 h-16 text-gray-300 mb-2" /></div>;
  };

  if (loading) return <div className="py-20 text-center">Chargement...</div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#104C9E]">Dernières Annonces</h2>
            <p className="text-gray-600 text-lg">Les 3 offres les plus récentes</p>
          </div>
          {/* Le bouton redirige vers la page qui contient TOUTES les annonces */}
          <Link href="/annonces" className="text-orange-500 font-semibold flex items-center space-x-1"><span>Voir tout</span><ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {annonces.map((annonce) => (
            <Link href={`/annonces/${annonce.slug}`} key={annonce.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02]">
                <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  <AnnonceVisual annonce={annonce} />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${annonce.badgeColor} shadow-sm`}>{annonce.badge}</span>
                  {annonce.verified && <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />}
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 
  className="text-xl font-bold text-gray-900 mb-4 line-clamp-2"
  dangerouslySetInnerHTML={{ __html: annonce.title }}
/>
                  <div className="space-y-3 text-sm text-gray-700 mb-4">
                    <div className="flex items-center"><MapPin className="w-4 h-4 text-gray-500 mr-2" /><span>{annonce.location}</span></div>
                    <div className="flex items-center"><span className="text-gray-500 mr-2 w-24">Destination :</span><span className="font-semibold text-gray-900">{annonce.destination}</span></div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                        {/* Si la date est "Disponible" (pour les livreurs), on la met en vert */}
                        {annonce.date === 'Disponible' ? (
                            <span className="text-green-600 font-bold">{annonce.date}</span>
                        ) : (
                            <span>{annonce.date}</span>
                        )}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <span className="text-2xl font-extrabold text-orange-500">{annonce.price}</span>
                    <div className="flex space-x-3">
                       <button className="p-2 rounded-full hover:bg-red-50"><Heart className="w-5 h-5 text-gray-400" /></button>
                       <button className="p-2 rounded-full hover:bg-blue-50"><Mail className="w-5 h-5 text-gray-400" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </Link> 
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAnnonces;