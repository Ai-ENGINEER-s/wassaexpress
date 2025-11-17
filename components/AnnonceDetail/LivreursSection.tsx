import {
  Check,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Package,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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
  annonceTitle,
  onWhatsAppContact,
  onPhoneContact,
}: LivreursSectionProps) => {
  return (
    <div className="mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#104C9E] mb-2">
          Livreurs disponibles pour cette destination
        </h2>
        <p className="text-gray-600 text-lg">
          Choisissez un livreur professionnel pour votre colis vers {destination}
        </p>
      </div>

      {livreurs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {livreurs.map((livreur) => (
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
                    <MapPin className="w-4 h-4 text-blue-500" />
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
                      <span className="font-bold text-gray-900">
                        {livreur.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Note</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-gray-900 mb-1">
                      {livreur.completedDeliveries}
                    </div>
                    <p className="text-xs text-gray-500">Livraisons</p>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600 mb-1">
                      {livreur.responseTime}
                    </div>
                    <p className="text-xs text-gray-500">Réponse</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2 font-medium">
                    Spécialités:
                  </p>
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
                  <p className="text-xs text-gray-600 mb-1 font-medium">
                    Frais de transport
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {livreur.transportFee}
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onWhatsAppContact(livreur.whatsapp, livreur.name);
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onPhoneContact(livreur.phone);
                    }}
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
      ) : (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucun livreur disponible pour le moment
          </h3>
          <p className="text-gray-500">
            Revenez plus tard ou contactez directement l'annonceur
          </p>
        </div>
      )}
    </div>
  );
};