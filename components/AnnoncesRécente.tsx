import { ArrowRight, Check, MapPin, Heart, Mail } from "lucide-react";

const AnnoncesRecente = () => {
  const recentAnnonces = [
    {
      title: "FATOU MODY SENEGAL-FRANCE(DAKAR-MARSEILLE-AVIGNON)",
      location: "DAKAR",
      destination: "Marseille",
      date: "novembre 12, 2025",
      price: "12€/Kg",
      type: "GP",
    },
    {
      title: "MARIE GP SENEGAL-FRANCE(DAKAR-PARIS)",
      location: "DAKAR",
      destination: "Paris",
      date: "novembre 9, 2025",
      price: "8€/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "KHADIJA GP MAROC-SENEGAL(CASABLANCA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 8, 2025",
      price: "70 DH/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "GP VOL DIRECT CANADA-SENEGAL(MONTREAL-DAKAR)",
      location: "MONTRÉAL",
      destination: "Dakar",
      date: "novembre 15, 2025",
      price: "20$/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "ADJI GP MAROC-SENEGAL(CASA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 7, 2025",
      price: "70 DH/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "DIATTA GP MAROC-SENEGAL(CASA-DAKAR)",
      location: "CASABLANCA",
      destination: "Dakar",
      date: "novembre 6, 2025",
      price: "55DH/Kg",
      type: "GP",
      verified: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Annonces Récentes
          </h2>
          <p className="text-gray-500 mt-1">
            Les dernières opportunités disponibles
          </p>
        </div>

        <button className="text-orange-500 font-semibold hover:text-orange-600 flex items-center space-x-2">
          <span>Voir toutes les annonces</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {recentAnnonces.map((annonce, index) => (
          <div
            key={index}
            className="
              bg-white rounded-3xl p-7 shadow-sm border border-gray-100 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300
            "
          >
            {/* HEADER BADGE */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="
                  px-4 py-1.5 rounded-full text-xs font-bold 
                  bg-gray-50 border border-gray-200 text-gray-700
                "
              >
                {annonce.type}
              </span>

              {annonce.verified && (
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              )}
            </div>

            {/* TITLE */}
            <h3 className="font-semibold text-lg text-gray-900 mb-4 line-clamp-2 leading-tight hover:text-orange-500 transition">
              {annonce.title}
            </h3>

            {/* LOCATION */}
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-2 opacity-70" />
              {annonce.location}
            </div>

            {/* DESTINATION + DATE */}
            <div className="space-y-2 text-sm text-gray-600 mt-4">
              <div className="flex justify-between">
                <span>Destination :</span>
                <span className="font-medium text-gray-900">
                  {annonce.destination}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Date :</span>
                <span className="font-medium text-gray-900">{annonce.date}</span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
              <span className="text-2xl font-extrabold text-orange-500">
                {annonce.price}
              </span>

              <div className="flex space-x-3">
                <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <Heart className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                  <Mail className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnnoncesRecente;
