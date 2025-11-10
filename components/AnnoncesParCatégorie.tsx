import Image from "next/image";
import { ShoppingBag, Package, Truck, Users, Motorbike, TruckElectric, Bike, MotorbikeIcon } from "lucide-react";

const AnnoncesParCategorie = () => {
  const categories = [
    { id: 'all', name: 'Tout', count: 53, icon: ShoppingBag },
    { id: 'gp', name: 'GP', count: 26, icon: Package, image: "/images/AnnoncesParCategories/GP.png" },
    { id: 'livreur', name: 'Livreur', count: 27, icon: MotorbikeIcon, image: "/images/AnnoncesParCategories/livreur1.png" },
    { id: 'particuliers', name: 'Particuliers', count: 8, icon: Truck, image: "/images/AnnoncesParCategories/transportterestre.png" }
  ];

  return (
    <section className="bg-[#F7F9F6] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-3">Annonces Par Catégories</h2>
          <p className="text-gray-600 text-lg">Choisissez votre catégorie et trouvez ce qu'il vous faut</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.filter(cat => cat.id !== 'all').map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                
                {/* Image avec Next.js Image */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={category.image || "/images/placeholder.png"}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                {/* Badge nombre d’annonces */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-bold">
                    {category.count} annonces
                  </span>
                </div>

                {/* Footer info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white">{category.name}</h3>
                    </div>
                    <button className="w-full mt-3 bg-white text-gray-900 py-3 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
                      Explorer →
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnnoncesParCategorie;
