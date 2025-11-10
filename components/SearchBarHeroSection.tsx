import { useState } from 'react';
import { Search, MapPin, ArrowRight, Package, Truck, Users } from 'lucide-react';

// --- Configuration des catégories ---
const categories = [
  { id: 'gp', label: 'GP', icon: Users },
  { id: 'produits', label: 'Produits', icon: Package },
  { id: 'livreurs', label: 'Livreurs', icon: Truck },
];

// --- Tags de recherche populaire ---
const popularTags = ['Transport', 'Coursier', 'Déménagement', 'Livraison Express'];

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('gp');

  const handleSearch = () => {
    console.log('Recherche:', { category: selectedCategory, keyword, location });
  };

  const handleKeyDown = (e:any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* --- Conteneur chevauchement --- */}
      <div className="w-full max-w-4xl mx-auto -mt-2 px-4">

        {/* --- Box principale --- */}
        <div
          className="w-full mx-auto bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl shadow-orange-500/10  overflow-hidden transition-all duration-300 focus-within:shadow-2xl focus-within:shadow-orange-500/20"
        >
          {/* --- Catégories --- */}
          <div className="flex p-2 bg-gray-100/50">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                    isSelected
                      ? 'text-orange-700 bg-white shadow-md'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* --- Inputs de recherche --- */}
          <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">

            {/* Mots-clés */}
            <div className="relative flex-grow group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Que recherchez-vous ?"
                className="w-full bg-white/50 hover:bg-white/100 focus:bg-white pl-12 pr-4 py-4 text-base sm:text-lg text-gray-900 placeholder-gray-500 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>

            {/* Séparateur */}
            <div className="hidden sm:block w-px h-10 bg-gray-200 mx-3" />

            {/* Localisation */}
            <div className="relative flex-grow group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                <MapPin className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Où ?"
                className="w-full bg-white/50 hover:bg-white/100 focus:bg-white pl-12 pr-4 py-4 text-base sm:text-lg text-gray-900 placeholder-gray-500 font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
            </div>

            {/* Bouton Rechercher */}
            <button
              onClick={handleSearch}
              className="group ml-0 sm:ml-3 mt-2 sm:mt-0 px-6 sm:px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-base shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
            >
              <span className="hidden sm:inline">Rechercher</span>
              <ArrowRight className="w-5 h-5 sm:group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- Tags populaires --- */}
        <div className="mt-4 flex flex-wrap justify-center items-center gap-3">
          <span className="text-sm text-gray-600 mr-2 font-medium hidden sm:inline">Populaire :</span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setKeyword(tag)}
              className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-300/50 text-sm font-medium text-orange-700 hover:bg-white hover:shadow-md hover:border-orange-300/80 transition-all duration-200 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>

      </div>
    </>
  );
}
