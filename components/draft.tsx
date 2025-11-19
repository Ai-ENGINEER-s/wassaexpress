'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Mail, 
  CheckCircle, 
  ArrowRight,
  User,
  Package
} from 'lucide-react';
import Flag from 'react-world-flags';

const annonces = [
  {
    id: 1,
    type: 'gp',
    title: "Dakar/Paris le 11 Novembre 2025",
    badge: "GP",
    badgeColor: "bg-blue-100 text-blue-800",
    location: "Dakar/Mbour",
    destination: "Paris",
    date: "novembre 11, 2025",
    price: "10€/Kg",
    departureCountryCode: 'SN',
    arrivalCountryCode: 'FR',
  },
  {
    id: 2,
    type: 'gp',
    title: "3M BUSINESS GP SENEGAL-CANADA",
    badge: "GP",
    badgeColor: "bg-blue-100 text-blue-800",
    location: "Dakar",
    destination: "Montréal",
    date: "novembre 10, 2025",
    price: "15$/Kg",
    departureCountryCode: 'SN',
    arrivalCountryCode: 'CA',
  },
  {
    id: 3,
    type: 'livreur',
    title: "Livreur professionnel",
    badge: "LIVREUR",
    badgeColor: "bg-green-100 text-green-800",
    location: "Casablanca",
    destination: "-",
    date: "Disponible",
    price: "Sur devis",
    departureCountryCode: 'MA',
    arrivalCountryCode: null,
  }
];

const AnnonceVisual = ({ annonce }: { annonce: (typeof annonces)[0] }) => {
  
  // CAS 1: Annonce GP avec les deux codes pays
  if (annonce.type === 'gp' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
    return (
      <div className="flex items-center justify-center space-x-3 w-full h-full">
        {/* Drapeaux plus petits avec effet d'ombre subtile */}
        <div className="relative">
          <Flag 
            code={annonce.departureCountryCode} 
            className="w-16 h-12 rounded-md shadow-sm object-cover"
            style={{ width: '64px', height: '48px' }}
          />
        </div>
        
        {/* Flèche plus élégante */}
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
        
        <div className="relative">
          <Flag 
            code={annonce.arrivalCountryCode} 
            className="w-16 h-12 rounded-md shadow-sm object-cover"
            style={{ width: '64px', height: '48px' }}
          />
        </div>
      </div>
    );
  }

  // CAS 2: Annonce Livreur avec un code pays
  if (annonce.type === 'livreur' && annonce.departureCountryCode) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
        {/* Icône de livreur en arrière-plan */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-gray-200" />
          </div>
          
          {/* Drapeau plus petit superposé */}
          <div className="relative z-10 mt-8">
            <Flag 
              code={annonce.departureCountryCode} 
              className="w-20 h-14 rounded-lg shadow-md object-cover mx-auto"
              style={{ width: '80px', height: '56px' }}
            />
          </div>
        </div>
        
        <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
          Livreur local
        </span>
      </div>
    );
  }

  // CAS 3: Fallback
  if (annonce.type === 'livreur') {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <User className="w-16 h-16 text-gray-300" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Package className="w-16 h-16 text-gray-300" />
    </div>
  );
};

const TopAnnonces = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* En-tête de la section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#104C9E]">
              Top Annonces
            </h2>
            <p className="text-gray-600 text-lg">
              Les meilleures offres du moment
            </p>
          </div>
          <Link 
            href="/annonces" 
            className="text-orange-500 font-semibold flex items-center space-x-1 hover:text-orange-600 transition-colors"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grille des annonces */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {annonces.map((annonce) => (
            
            <Link 
              href={`/annonces/${annonce.id}`}
              key={annonce.id}
              className="group"
            >
              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
              >
                
                {/* Section visuelle avec gradient subtil */}
                <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  
                  <AnnonceVisual annonce={annonce} />
                  
                  {/* Badges */}
                  <span 
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${annonce.badgeColor} shadow-sm`}
                  >
                    {annonce.badge}
                  </span>
                  <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
                </div>

                {/* Corps de la carte */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2" title={annonce.title}>
                    {annonce.title}
                  </h3>
                  
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
                      {annonce.date === 'Disponible' ? (
                        <span className="text-green-600 font-semibold">{annonce.date}</span>
                      ) : (
                        <span>{annonce.date}</span>
                      )}
                    </div>
                  </div>

                  {/* Pied de la carte */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <span className="text-2xl font-extrabold text-orange-500">
                      {annonce.price}
                    </span>
                    <div className="flex space-x-3">
                      <button 
                        className="p-2 rounded-full hover:bg-red-50 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                      </button>
                      <button 
                        className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                      </button>
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