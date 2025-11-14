'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Package, Truck, MotorbikeIcon } from "lucide-react";

const AnnoncesParCategorie = () => {
  const router = useRouter();

  const categories = [
    { 
      id: 'gp', 
      name: 'GP', 
      count: 6, 
      icon: Package, 
      image: "/images/AnnoncesParCategories/GP.png",
      description: "Transport aérien de colis"
    },
    { 
      id: 'livreur', 
      name: 'Livreur', 
      count: 5, 
      icon: MotorbikeIcon, 
      image: "/images/AnnoncesParCategories/livreur1.png",
      description: "Livreurs professionnels"
    },
    { 
      id: 'transport-terrestre', 
      name: 'Transport Terrestre', 
      count: 5, 
      icon: Truck, 
      image: "/images/AnnoncesParCategories/transportterestre.png",
      description: "Transport par camion"
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log('Navigation vers:', categoryId); 
    if (categoryId === 'livreur') {
      router.push('/livreurs');
    } else {
      router.push(`/annonces/categorie/${categoryId}`);
    }
  };

  return (
    <section className="bg-[#F7F9F6] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#104C9E] mb-3">
            Annonces Par Catégories
          </h2>
          <p className="text-gray-600 text-lg">
            Choisissez votre catégorie et trouvez ce qu'il vous faut
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                // === SEULE MODIFICATION ICI ===
                className="group relative h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer" // h-80 -> h-96
              >
                {/* Image avec Next.js Image */}
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                {/* Badge nombre d'annonces */}
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-bold">
                    {category.count} annonces
                  </span>
                </div>

                {/* Footer "Harmonisé" (ni trop gros, ni trop petit) */}
                <div className="absolute bottom-0 left-0 right-0 p-6"> 
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl border border-white/20">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-black text-white">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-white/80 text-sm mb-4">
                      {category.description}
                    </p>
                    <button className="w-full mt-2 bg-white text-gray-900 py-2.5 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
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