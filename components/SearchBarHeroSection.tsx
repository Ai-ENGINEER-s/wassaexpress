import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Package, Truck, Users } from 'lucide-react';

// --- Configuration des catégories (inchangée) ---
const categories = [
  { id: 'gp', label: 'GP', icon: Users },
  { id: 'produits', label: 'Produits', icon: Package },
  { id: 'livreurs', label: 'Livreurs', icon: Truck },
];

// --- Tags de recherche populaire (inchangés) ---
const popularTags = ['Transport', 'Coursier', 'Déménagement', 'Livraison Express'];

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('gp');

  // --- NOUVEAU: Refs et State pour le slider animé ---
  const [sliderStyle, setSliderStyle] = useState({});
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Met à jour la position du slider quand la catégorie change
  useEffect(() => {
    const selectedIndex = categories.findIndex((c) => c.id === selectedCategory);
    const selectedTab = categoryRefs.current[selectedIndex];

    if (selectedTab) {
      setSliderStyle({
        left: `${selectedTab.offsetLeft}px`,
        width: `${selectedTab.offsetWidth}px`,
      });
    }
  }, [selectedCategory]);
  // --- FIN NOUVEAU ---

  const handleSearch = () => {
    console.log('Recherche:', { category: selectedCategory, keyword, location });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto -mt-2 px-4">
        {/* --- Box principale (fond bleu clair gardé) --- */}
        <div
          className="relative w-full 
          bg-orange-50 /* ✅ CHANGÉ */
          backdrop-blur-xl 
        
          border border-[#4B352A]/20 /* ✅ CHANGÉ */
          shadow-[0_8px_25px_rgba(75,53,42,0.15)] /* ✅ CHANGÉ (RGB de 4B352A) */
          hover:shadow-[0_8px_35px_rgba(75,53,42,0.22)] /* ✅ CHANGÉ */
          overflow-hidden 
          transition-all duration-500"
        >
          {/* --- Catégories AMÉLIORÉES avec Slider --- */}
          <div className="relative flex p-2 bg-orange-100/60"> {/* ✅ CHANGÉ */}
            
            {/* Le Slider Animé */}
            <span
              className="absolute top-2 bottom-2 
              bg-white 
              rounded-lg 
              shadow-md shadow-[#4B352A]/20 /* ✅ CHANGÉ */
              transition-all duration-300 ease-out"
              style={sliderStyle}
            />

            {categories.map((category, index) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  // NOUVEAU: Ajout de la ref
                  ref={(el) => (categoryRefs.current[index] = el)}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative z-10 flex-1 flex items-center justify-center 
                  gap-2 px-3 sm:px-4 py-3 text-sm font-semibold rounded-lg 
                  transition-all duration-300 ${
                    isSelected
                      ? 'text-[#4B352A]' // Couleur du texte actif // ✅ CHANGÉ
                      : 'text-gray-600 hover:text-[#4B352A]' // Couleur inactive // ✅ CHANGÉ
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* --- Inputs AMÉLIORÉS --- */}
          {/* L'espacement est géré par le 'gap' du flex-col */}
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Bloc unifié pour les inputs */}
            <div className="flex-grow flex flex-col sm:flex-row items-center 
                            bg-orange-100/40  /* ✅ FOND NON-BLANC PAR DÉFAUT */ /* ✅ CHANGÉ */
                            hover:bg-orange-50/60 /* ✅ CHANGÉ */
                            rounded-xl 
                            shadow-inner shadow-orange-200/30 /* ✅ CHANGÉ */
                            transition-all duration-300
                            group  /* 'group' pour le focus-within */
                            focus-within:bg-white 
                            focus-within:ring-2 
                            focus-within:ring-[#4B352A] /* ✅ CHANGÉ */
                            focus-within:shadow-lg focus-within:shadow-[#4B352A]/20" /* ✅ CHANGÉ */
            >
              
              {/* Mot-clé */}
              <div className="relative flex-grow group w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 
                                text-gray-400 group-focus-within:text-[#4B352A] /* ✅ CHANGÉ */
                                transition-colors pointer-events-none z-10">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Que recherchez-vous ?"
                  className="w-full bg-transparent /* ✅ INPUT TRANSPARENT */
                             pl-12 pr-4 py-4 text-base sm:text-lg text-gray-900 
                             placeholder-gray-500 font-medium 
                             rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none
                             focus:outline-none 
                             transition-all duration-300"
                />
              </div>

              {/* Séparateur */}
              <div className="w-full sm:w-px h-px sm:h-10 bg-gray-300" />

              {/* Localisation */}
              <div className="relative flex-grow group w-full">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 
                                text-gray-400 group-focus-within:text-[#4B352A] /* ✅ CHANGÉ */
                                transition-colors pointer-events-none z-10">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Où ?"
                  className="w-full bg-transparent /* ✅ INPUT TRANSPARENT */
                             pl-12 pr-4 py-4 text-base sm:text-lg text-gray-900 
                             placeholder-gray-500 font-medium 
                             rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none
                             focus:outline-none 
                             transition-all duration-300"
                />
              </div>
            </div>

            {/* Bouton (inchangé, juste ajustement du margin) */}
            <button
              onClick={handleSearch}
              className="group sm:ml-2 px-6 sm:px-8 py-4 
                         bg-[#104C9E] /* ✅ CHANGÉ */
                         text-white rounded-xl font-bold text-base 
                         shadow-lg shadow-[#4B352A]/40 /* ✅ CHANGÉ */
                         hover:shadow-xl hover:shadow-[#4B352A]/60 /* ✅ CHANGÉ */
                         transition-all duration-300 
                         flex items-center justify-center gap-2 
                         transform hover:scale-[1.03] active:scale-95"
            >
              <span className="hidden sm:inline">Rechercher</span>
              <ArrowRight className="w-5 h-5 sm:group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- Tags populaires (Hover affiné) --- */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
          <span className="text-sm text-gray-600 mr-2 font-medium hidden sm:inline">Populaire :</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setKeyword(tag)}
              className="px-4 py-2 rounded-full 
                         bg-white/90 backdrop-blur-sm 
                         border border-[#4B352A]/30 /* ✅ CHANGÉ */
                         text-sm font-medium text-[#4B352A] /* ✅ CHANGÉ */
                         hover:bg-white hover:shadow-lg hover:border-[#4B352A] /* Hover affiné */ /* ✅ CHANGÉ */
                         transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}