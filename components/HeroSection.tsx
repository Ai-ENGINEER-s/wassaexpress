'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const heroImages = [
  { url: '/images/envoie-colis/4.png' },
  { url: '/images/envoie-colis/2.png' },
  { url: '/images/envoie-colis/1.png' },
];

export default function HeroSectionSearch() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[750px] overflow-hidden">
      
      {/* Background Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
            style={{
              backgroundImage: `url(${image.url})`,
              transform: index === currentSlide ? 'scale(1.08)' : 'scale(1)',
              filter: 'brightness(0.6) contrast(1.1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        </div>
      ))}

      {/* Contenu principal */}
      <div className="relative h-full flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
     

      

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight text-white"
        >
          Trouvez tout ce dont
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            vous avez besoin
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light"
        >
          Recherchez des services, des transporteurs et des solutions 
          <span className="font-semibold text-white"> sur une seule plateforme</span>
        </motion.p>

        {/* Bouton CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          href="#services"
          className="inline-flex items-center gap-2 bg-orange-500  text-white font-semibold px-6 py-3 rounded-full shadow-lg  transition-all"
        >
          Explorer Nos Services
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>

      {/* Indicateurs de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50'
                : 'bg-white/40 w-2 hover:bg-white/60 hover:w-4'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
