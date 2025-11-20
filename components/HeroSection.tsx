'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      <AnimatePresence>
        {heroImages.map((image, index) =>
          index === currentSlide ? (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 z-10"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="absolute inset-0 bg-cover bg-center filter brightness-75 contrast-110"
                style={{ backgroundImage: `url(${image.url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <div className="relative h-full flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight text-white"
        >
          Trouvez tout ce dont
          <br />
          <span className="bg-[#FF6900] from-orange-400 to-orange-600 bg-clip-text text-transparent">
            vous avez besoin
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl font-light"
        >
          Recherchez des services, des transporteurs et des solutions
          <span className="font-semibold text-white"> sur une seule plateforme</span>
        </motion.p>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          href="#services"
          className="relative inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-orange-500/50 transition-all overflow-hidden"
        >
          <span className="relative z-10">Explorer Nos Services</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <ArrowRight className="w-5 h-5 z-10" />
          </motion.div>
          {/* Micro animation glow */}
          <span className="absolute top-0 left-0 w-full h-full rounded-full bg-white/10 animate-pulse" />
        </motion.a>
      </div>

      {/* Indicateurs de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {heroImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50'
                : 'bg-white/40 w-2 hover:bg-white/60 hover:w-4'
            }`}
            animate={{ scale: index === currentSlide ? 1.3 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    </section>
  );
}
