import {
  Check,
  MapPin,
  Package,
  ShieldCheck,
  AlertCircle,
  CalendarDays,
  Weight,
  Plane,
  UserCheck
} from 'lucide-react';
import Flag from 'react-world-flags';

interface AnnonceData {
    id: number;
    slug: string;
    title: string;
    location: string;
    destination: string;
    date: string;
    departureTime: string;
    price: string;
    type: string;
    verified: boolean;
    departureCountryCode: string;
    arrivalCountryCode: string;
    description: string;
    deliveryTime: string;
    availableWeight: string;
    conditions: string[];
    publishedBy: string;
    stats: {
      completedDeliveries: number;
      rating: number;
      responseTime: string;
    };
    traveler: {
      name: string;
      phone: string;
      verified: boolean;
    };
  }

interface AnnonceMainCardProps {
  annonce: AnnonceData;
}

export const AnnonceMainCard = ({ annonce }: AnnonceMainCardProps) => {
  return (
    <div className="space-y-8">
      {/* EN-TÊTE DE L'ANNONCE AVEC BADGES */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Vérifié par <span className="font-bold text-blue-900">{annonce.publishedBy}</span></span>
        </div>
        <span className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-sm ${
            annonce.type === 'GP' 
            ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
        }`}>
            {annonce.type}
        </span>
      </div>

      {/* CARTE TRAJET STYLE "BILLET" */}
      <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 relative">
         {/* Background décoratif */}
         <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-r from-[#104C9E]/5 to-blue-600/5"></div>
         
         <div className="p-8 lg:p-10 relative z-10">
            {/* VISUALISATION DU TRAJET */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                {/* Départ */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[120px]">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Départ</span>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{annonce.location}</h2>
                    {annonce.departureCountryCode && (
                        <div className="rounded-lg overflow-hidden shadow-md rotate-[-3deg] transform transition hover:rotate-0">
                             <Flag code={annonce.departureCountryCode} style={{ width: '50px', height: '35px', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>

                {/* Ligne de vol animée */}
                <div className="flex-1 w-full px-4 flex flex-col items-center justify-center">
                    <div className="flex items-center w-full space-x-3">
                        <div className="h-[2px] w-full bg-gray-200 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-1/2 animate-shimmer"></div>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-full text-blue-600 rotate-90 md:rotate-0 shadow-sm">
                            <Plane className="w-6 h-6" />
                        </div>
                        <div className="h-[2px] w-full bg-gray-200"></div>
                    </div>
                    <div className="mt-3 bg-gray-100 px-3 py-1 rounded-full text-xs font-semibold text-gray-600">
                        Durée estimée : {annonce.deliveryTime}
                    </div>
                </div>

                {/* Arrivée */}
                <div className="flex flex-col items-center md:items-end text-center md:text-right min-w-[120px]">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Arrivée</span>
                    <h2 className="text-3xl font-black text-gray-900 mb-2">{annonce.destination}</h2>
                    {annonce.arrivalCountryCode && (
                        <div className="rounded-lg overflow-hidden shadow-md rotate-[3deg] transform transition hover:rotate-0">
                             <Flag code={annonce.arrivalCountryCode} style={{ width: '50px', height: '35px', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-100 my-8"></div>

            {/* INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date */}
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4 hover:bg-blue-50 transition-colors group cursor-default border border-transparent hover:border-blue-100">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                        <CalendarDays className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Date de départ</p>
                        <p className="text-lg font-bold text-gray-900">{annonce.date}</p>
                        <p className="text-sm text-gray-500">{annonce.departureTime}</p>
                    </div>
                </div>

                {/* Poids */}
                <div className="bg-gray-50 rounded-2xl p-4 flex items-center space-x-4 hover:bg-orange-50 transition-colors group cursor-default border border-transparent hover:border-orange-100">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-orange-500 group-hover:scale-110 transition-transform">
                        <Weight className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase">Kilos Dispo</p>
                        <p className="text-lg font-bold text-gray-900">{annonce.availableWeight}</p>
                        <p className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md inline-block mt-1">Garanti</p>
                    </div>
                </div>

                 {/* Conditions */}
                 <div className="bg-gray-50 rounded-2xl p-4 md:col-span-1 hover:bg-gray-100 transition-colors border border-transparent">
                    <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-xs text-gray-500 font-semibold uppercase">Conditions</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {annonce.conditions.length > 0 ? annonce.conditions.slice(0,3).map((c, i) => (
                            <span key={i} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600 shadow-sm">
                                {c}
                            </span>
                        )) : <span className="text-sm text-gray-400 italic">Aucune restriction</span>}
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* SECTION DESCRIPTION & PROFIL VOYAGEUR (Split View) */}
      <div className="grid md:grid-cols-12 gap-8">
          {/* Description */}
          <div className="md:col-span-7 lg:col-span-8 bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-2 text-[#104C9E]" />
                Détails du voyageur
             </h3>
             <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                {annonce.description || "Aucune description supplémentaire fournie par le voyageur."}
             </div>
          </div>

          {/* Profil Voyageur */}
          <div className="md:col-span-5 lg:col-span-4 bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-gray-50 to-transparent"></div>
              
              <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-white rounded-full p-1 shadow-lg mb-4">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-blue-600">
                          {annonce.traveler.name.charAt(0)}
                      </div>
                  </div>
                  
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{annonce.traveler.name}</h4>
                  
                  {annonce.traveler.verified && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold mb-4">
                        <UserCheck className="w-3 h-3 mr-1" /> Identité vérifiée
                    </span>
                  )}

                  <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="block text-xl font-bold text-gray-900">{annonce.stats.rating} <span className="text-yellow-400 text-sm">★</span></span>
                          <span className="text-xs text-gray-500">Note moyenne</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-xl">
                          <span className="block text-xl font-bold text-gray-900">{annonce.stats.completedDeliveries}</span>
                          <span className="text-xs text-gray-500">Livraisons</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};