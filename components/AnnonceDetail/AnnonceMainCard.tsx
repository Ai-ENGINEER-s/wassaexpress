import {
  Check,
  Clock,
  MapPin,
  Package,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
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
    <div className="space-y-6">
      {/* BADGE ANNONCE OFFICIELLE */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 flex items-center space-x-3 shadow-md">
        <ShieldCheck className="w-6 h-6" />
        <div>
          <p className="font-semibold">
            Annonce vérifiée par {annonce.publishedBy}
          </p>
          <p className="text-sm text-blue-100">
            Voyageur sélectionné et validé par notre équipe
          </p>
        </div>
      </div>

      {/* CARTE PRINCIPALE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* HEADER IMAGE AVEC DRAPEAUX */}
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative p-6">
          <span
            className={`
              absolute top-4 left-4 px-4 py-2 text-sm font-bold rounded-full shadow-sm
              ${
                annonce.type === 'GP'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }
            `}
          >
            {annonce.type}
          </span>

          {annonce.verified && (
            <div className="absolute top-4 right-4">
              <Check className="w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
            </div>
          )}

          {/* Drapeaux */}
          {annonce.departureCountryCode && annonce.arrivalCountryCode && (
            <div className="flex items-center justify-center space-x-3">
              <div className="relative">
                <Flag
                  code={annonce.departureCountryCode}
                  className="w-20 h-16 rounded-md shadow-md object-cover"
                  style={{ width: '80px', height: '60px' }}
                />
              </div>

              <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2.5">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>

              <div className="relative">
                <Flag
                  code={annonce.arrivalCountryCode}
                  className="w-20 h-16 rounded-md shadow-md object-cover"
                  style={{ width: '80px', height: '60px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* CONTENU */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {annonce.title}
          </h1>

          {/* INFOS PRINCIPALES */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Départ</p>
                <p className="font-semibold text-gray-900">{annonce.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-500 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-semibold text-gray-900">
                  {annonce.destination}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Date de départ</p>
                <p className="font-semibold text-gray-900">{annonce.date}</p>
                <p className="text-sm text-gray-600">{annonce.departureTime}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Package className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Poids disponible</p>
                <p className="font-semibold text-gray-900">
                  {annonce.availableWeight}
                </p>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">{annonce.description}</p>
          </div>

          {/* CONDITIONS */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Conditions
            </h2>
            <div className="space-y-2">
              {annonce.conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{condition}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DÉLAI DE LIVRAISON */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Délai de livraison
              </p>
              <p className="text-sm text-blue-700">{annonce.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* INFORMATIONS SUR LE VOYAGEUR */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          À propos du voyageur
        </h2>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{annonce.traveler.name}</p>
            {annonce.traveler.verified && (
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <Check className="w-4 h-4" />
                <span>Identité vérifiée</span>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#104C9E]">
              {annonce.stats.completedDeliveries}
            </div>
            <div className="text-sm text-gray-500">Livraisons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {annonce.stats.rating} ⭐
            </div>
            <div className="text-sm text-gray-500">Note</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {annonce.stats.responseTime}
            </div>
            <div className="text-sm text-gray-500">Réponse</div>
          </div>
        </div>
      </div>
    </div>
  );
};