import { ArrowRight, Check, Clock, Heart, Mail, MapPin, Package } from "lucide-react";

const TopAnnonce = () => {
  const topAnnonces = [
    {
      title: "Dakar/Paris le 11 Novembre 2025",
      location: "Dakar/M'bour",
      destination: "Paris",
      date: "novembre 11, 2025",
      price: "10€/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "3M BUSINESS GP SENEGAL-CANADA",
      location: "Dakar",
      destination: "Montréal",
      date: "novembre 10, 2025",
      price: "15$/Kg",
      type: "GP",
      verified: true,
    },
    {
      title: "Livreur professionnel",
      location: "Casablanca",
      destination: "-",
      date: "Disponible",
      price: "Sur devis",
      type: "LIVREUR",
      verified: true,
    },
  ];

  return (
    <section className=" max-w-7xl mx-auto px-4 py-16">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">Top Annonces</h2>
          <p className="text-gray-500 mt-1">Les meilleures offres du moment</p>
        </div>

        <button className="text-orange-500 font-semibold hover:text-orange-600 flex items-center space-x-2">
          <span>Voir tout</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {topAnnonces.map((annonce, index) => (
          <div
            key={index}
            className="
              bg-white rounded-3xl shadow-sm border border-gray-100 
              hover:shadow-xl hover:-translate-y-1 transition-all duration-300
              overflow-hidden group
            "
          >
            {/* NEW MINIMAL HEADER */}
            <div
              className="
                h-40 bg-gradient-to-br from-gray-50 to-gray-100 
                flex items-center justify-center relative
                border-b border-gray-200
              "
            >
              {/* BADGE TYPE */}
              <span
                className={`
                  absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full
                  ${
                    annonce.type === "GP"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }
                `}
              >
                {annonce.type}
              </span>

              {/* VERIFIED */}
              {annonce.verified && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
              )}

              {/* ICON */}
              <Package className="w-16 h-16 text-gray-300 group-hover:text-orange-400 transition" />
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition">
                {annonce.title}
              </h3>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 opacity-70 text-orange-500" />
                  {annonce.location}
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Destination :</span>
                  <span className="font-medium text-gray-900">
                    {annonce.destination}
                  </span>
                </div>

                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {annonce.date}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-2xl font-extrabold text-orange-500">
                  {annonce.price}
                </span>

                <div className="flex space-x-2">
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopAnnonce;
