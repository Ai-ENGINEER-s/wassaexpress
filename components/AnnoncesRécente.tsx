'use client';


import { ArrowRight, Check, MapPin, Heart, Mail, Calendar, CheckCircle } from "lucide-react";
import Flag from 'react-world-flags';

const AnnoncesRecente = () => {
  const recentAnnonces = [
    {
      id: 1,
      slug: "fatou-mody-senegal-france-dakar-marseille",
      title: "FATOU MODY SENEGAL-FRANCE(DAKAR-MARSEILLE-AVIGNON)",
      location: "DAKAR",
      destination: "Marseille",
      date: "novembre 12, 2025",
      price: "12€/Kg",
      type: "GP",
      verified: false,
      departureCountryCode: 'SN',
      arrivalCountryCode: 'FR',
    },
    {
      id: 2,
      slug: "marie-gp-senegal-france-dakar-paris",
      title: "MARIE GP SENEGAL-FRANCE(DAKAR-PARIS)",
      location: "DAKAR",
      destination: "Paris",
      date: "novembre 9, 2025",
      price: "8€/Kg",
      type: "GP",
      verified: true,
      departureCountryCode: 'SN',
      arrivalCountryCode: 'FR',
    },
    {
      id: 3,
      slug: "khadija-gp-maroc-senegal-casablanca-dakar",
      title: "KHADIJA GP MAROC-SENEGAL(CASABLANCA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 8, 2025",
      price: "70 DH/Kg",
      type: "GP",
      verified: true,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'SN',
    },
    {
      id: 4,
      slug: "gp-vol-direct-canada-senegal-montreal-dakar",
      title: "GP VOL DIRECT CANADA-SENEGAL(MONTREAL-DAKAR)",
      location: "MONTRÉAL",
      destination: "Dakar",
      date: "novembre 15, 2025",
      price: "20$/Kg",
      type: "GP",
      verified: true,
      departureCountryCode: 'CA',
      arrivalCountryCode: 'SN',
    },
    {
      id: 5,
      slug: "adji-gp-maroc-senegal-casa-dakar",
      title: "ADJI GP MAROC-SENEGAL(CASA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 7, 2025",
      price: "70 DH/Kg",
      type: "GP",
      verified: true,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'SN',
    },
    {
      id: 6,
      slug: "diatta-gp-maroc-senegal-casa-dakar",
      title: "DIATTA GP MAROC-SENEGAL(CASA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 6, 2025",
      price: "55DH/Kg",
      type: "GP",
      verified: true,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'SN',
    },
  ];

  // Composant pour afficher les drapeaux
  const AnnonceVisual = ({ annonce }: { annonce: typeof recentAnnonces[0] }) => {
    if (annonce.departureCountryCode && annonce.arrivalCountryCode) {
      return (
        <div className="flex items-center justify-center space-x-3 w-full h-full">
          <div className="relative">
            <Flag 
              code={annonce.departureCountryCode} 
              className="w-16 h-12 rounded-md shadow-sm object-cover"
              style={{ width: '64px', height: '48px' }}
            />
          </div>
          
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
    return null;
  };

  // Fonction pour gérer la navigation
  const handleAnnonceClick = (slug: string) => {
    window.location.href = `/annonces/${slug}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-[#104C9E]">
            Annonces Récentes
          </h2>
          <p className="text-gray-600 text-lg">
            Les dernières opportunités disponibles
          </p>
        </div>

        <button className="text-orange-500 font-semibold hover:text-orange-600 flex items-center space-x-1 transition-colors">
          <span>Voir tout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {recentAnnonces.map((annonce) => (
          <div
            key={annonce.id}
            onClick={() => handleAnnonceClick(annonce.slug)}
            className="group cursor-pointer"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
              
              {/* Section visuelle avec drapeaux */}
              <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                
                <AnnonceVisual annonce={annonce} />
                
                {/* Badge GP */}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 shadow-sm">
                  {annonce.type}
                </span>
                
                {/* Icône de vérification */}
                {annonce.verified && (
                  <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
                )}
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
                    <span>{annonce.date}</span>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Favori ajouté pour:", annonce.title);
                      }}
                    >
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                    <button 
                      className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Message envoyé pour:", annonce.title);
                      }}
                    >
                      <Mail className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
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