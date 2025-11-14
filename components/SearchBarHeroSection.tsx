'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ArrowRight, Package, Truck, Users } from 'lucide-react';

const categories = [
  { id: 'gp', label: 'GP', icon: Users },
  { id: 'produits', label: 'Produits', icon: Package },
  { id: 'livreurs', label: 'Livreurs', icon: Truck },
];

const popularTags = ['Transport', 'Coursier', 'Déménagement', 'Livraison Express'];

export default function SearchBarHeroSection() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('gp');

  const [sliderStyle, setSliderStyle] = useState({});
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // --- Fix TypeScript + déplacement fluide ---
  const setCategoryRef = (index: number) => (el: HTMLButtonElement | null) => {
    categoryRefs.current[index] = el;
  };

  useEffect(() => {
    const index = categories.findIndex((c) => c.id === selectedCategory);
    const tab = categoryRefs.current[index];

    if (tab) {
      setSliderStyle({
        left: `${tab.offsetLeft}px`,
        width: `${tab.offsetWidth}px`,
      });
    }
  }, [selectedCategory]);

  const handleSearch = () => {
    console.log('Recherche:', { category: selectedCategory, keyword, location });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-10">

      {/* --- Bloc principal --- */}
      <div className="
        relative w-full rounded-2xl overflow-hidden
        backdrop-blur-xl bg-white/70
        border border-[#4B352A]/20
        shadow-[0_8px_25px_rgba(75,53,42,0.18)]
        transition-all duration-500
      ">

        {/* --- Catégories --- */}
        <div className="relative flex p-2 bg-gradient-to-r from-orange-50 to-orange-100/70">

          {/* Slider animé */}
          <span
            style={sliderStyle}
            className="
              absolute top-2 bottom-2
              bg-white rounded-lg
              shadow-md shadow-[#4B352A]/25
              transition-all duration-300 ease-out
            "
          />

          {categories.map((cat, index) => {
            const Icon = cat.icon;
            const selected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                ref={setCategoryRef(index)}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  relative z-10 flex-1 flex items-center justify-center
                  gap-2 px-3 sm:px-4 py-3 font-semibold rounded-lg
                  transition-all duration-300 
                  ${selected ? 'text-[#4B352A]' : 'text-gray-600 hover:text-[#4B352A]'}
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* --- Inputs --- */}
        <div className="p-4 flex flex-col sm:flex-row gap-4 items-stretch">

          {/* Champ Keyword + Location */}
          <div
            className="
              flex-grow flex flex-col sm:flex-row items-center
              bg-orange-50/50 rounded-xl
              shadow-inner shadow-orange-200/30
              transition-all duration-300
              focus-within:bg-white focus-within:ring-2
              focus-within:ring-[#4B352A] focus-within:shadow-lg
            "
          >

            {/* Keyword */}
            <div className="relative flex-grow group w-full">
              <Search className="
                absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 
                text-gray-400 group-focus-within:text-[#4B352A]
                transition-colors z-10
              " />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Que recherchez-vous ?"
                className="
                  w-full bg-transparent pl-12 pr-4 py-4
                  text-gray-900 placeholder-gray-500 font-medium
                  rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none
                  focus:outline-none
                "
              />
            </div>

            {/* Séparateur */}
            <div className="w-full sm:w-px h-px sm:h-10 bg-gray-300" />

            {/* Location */}
            <div className="relative flex-grow group w-full">
              <MapPin className="
                absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 
                text-gray-400 group-focus-within:text-[#4B352A]
                transition-colors z-10
              " />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Où ?"
                className="
                  w-full bg-transparent pl-12 pr-4 py-4
                  text-gray-900 placeholder-gray-500 font-medium
                  rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none
                  focus:outline-none
                "
              />
            </div>
          </div>

          {/* Bouton Search */}
          <button
            onClick={handleSearch}
            className="
              px-7 sm:px-8 py-4 bg-[#104C9E] text-white rounded-xl font-bold
              shadow-lg shadow-[#4B352A]/40
              hover:shadow-xl hover:shadow-[#4B352A]/60
              transition-all duration-300
              flex items-center justify-center gap-2
              transform hover:scale-[1.04] active:scale-95
            "
          >
            <span className="hidden sm:inline">Rechercher</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* --- Tags populaires --- */}
      <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
        <span className="text-sm text-gray-600 mr-2 font-medium hidden sm:inline">
          Populaire :
        </span>

        {popularTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setKeyword(tag)}
            className="
              px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm
              border border-[#4B352A]/30 text-sm font-medium text-[#4B352A]
              hover:bg-white hover:border-[#4B352A] hover:shadow-lg
              transition-all duration-200 transform hover:-translate-y-0.5 hover:scale-105
            "
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
