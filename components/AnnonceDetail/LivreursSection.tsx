import { Check, Star, MessageCircle, Phone, Bike, Truck } from 'lucide-react';
import Image from 'next/image';

// ... (Interfaces identiques au code précédent)
// Copier-coller les interfaces AnnonceDetail ici si besoin, 
// mais pour la clarté je mets juste le composant.

interface Livreur {
  id: number;
  name: string;
  profileImage: string;
  destination: string;
  rating: number;
  completedDeliveries: number;
  responseTime: string;
  transportFee: string;
  verified: boolean;
  specialties: string[];
  phone: string;
  whatsapp: string;
  available: boolean;
  arrivalCountryCode: string;
  description: string;
}

interface LivreursSectionProps {
  livreurs: Livreur[];
  destination: string;
  annonceTitle: string;
  onWhatsAppContact: (phone: string, name: string) => void;
  onPhoneContact: (phone: string) => void;
}

export const LivreursSection = ({
  livreurs,
  destination,
  onWhatsAppContact,
  onPhoneContact,
}: LivreursSectionProps) => {
  return (
    <div className="pt-8 border-t border-gray-200/60">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Bike className="w-6 h-6 text-[#104C9E]" />
                Livreurs à l'arrivée
            </h2>
            <p className="text-gray-500 mt-1">Professionnels vérifiés pour la livraison finale à {destination}</p>
        </div>
        {livreurs.length > 0 && (
             <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                {livreurs.length} disponibles
             </span>
        )}
      </div>

      {livreurs.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {livreurs.map((livreur) => (
            <div key={livreur.id} className="group bg-white rounded-3xl p-5 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative overflow-hidden">
              {/* Indicateur Dispo */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${livreur.available ? 'from-green-400/20' : 'from-gray-400/20'} to-transparent rounded-bl-[100%] -mr-4 -mt-4 transition-colors`}></div>

              <div className="flex items-start gap-4 mb-4 relative z-10">
                 <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                        <Image 
                            src={livreur.profileImage} 
                            alt={livreur.name} 
                            width={64} height={64} 
                            className="object-cover w-full h-full transition-transform group-hover:scale-110"
                            unoptimized 
                        />
                    </div>
                    {livreur.verified && (
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                            <Check className="w-4 h-4 text-white bg-blue-500 rounded-full p-0.5" />
                        </div>
                    )}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate text-lg">{livreur.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current mr-1" />
                        <span className="font-bold text-gray-800 mr-1">{livreur.rating}</span>
                        <span className="text-gray-300">•</span>
                        <span className="ml-1">{livreur.completedDeliveries} liv.</span>
                    </div>
                    <div className="text-xs text-[#104C9E] font-bold bg-blue-50 inline-block px-2 py-0.5 rounded-md">
                        {livreur.transportFee}
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {livreur.specialties.slice(0, 2).map((s, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        {s}
                    </span>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => onWhatsAppContact(livreur.whatsapp, livreur.name)}
                  disabled={!livreur.available}
                  className={`col-span-3 py-3 rounded-xl flex items-center justify-center space-x-2 font-bold text-sm transition-all shadow-sm ${
                      livreur.available 
                      ? 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{livreur.available ? 'Contacter' : 'Occupé'}</span>
                </button>
                <button
                    onClick={() => onPhoneContact(livreur.phone)}
                    disabled={!livreur.available}
                    className="col-span-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                >
                    <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
          <Truck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Aucun livreur disponible dans cette zone.</p>
        </div>
      )}
    </div>
  );
};