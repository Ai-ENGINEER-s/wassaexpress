'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  MapPin,
  Euro,
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';
import { Etude_CATALOGUE } from '@/data/catalogue';
import { ThemeForOtherPages, ModuleForOtherPages } from '@/types/index';
import Tarifs from '@/components/Tarifs';

interface EtudePageProps {
  setCurrentPage: (page: string) => void;
  setSelectedTheme: (theme: ThemeForOtherPages) => void;
  setSelectedModule: (module: ModuleForOtherPages) => void;
}

// --- COMPOSANT THEMEROW ---
function ThemeRow({
  theme,
  setCurrentPage,
  setSelectedTheme,
  setSelectedModule,
}: {
  theme: ThemeForOtherPages;
  setCurrentPage: (page: string) => void;
  setSelectedTheme: (theme: ThemeForOtherPages) => void;
  setSelectedModule: (module: ModuleForOtherPages) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);

      const cardWidth = 340;
      const visibleCards = Math.floor(clientWidth / cardWidth);
      const pages = Math.ceil(theme.modules.length / visibleCards);
      setTotalPages(Math.max(pages, 1));
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [theme.modules.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const currentPage = Math.min(
    Math.floor(scrollProgress * totalPages),
    totalPages - 1
  );
  const themeImage =
    theme.image ||
    theme.modules[0]?.image ||
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop';

  return (
    <div className="mb-10 group/row">
      {/* Theme Header - Modern Style */}
      <div className="mb-6 px-4 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Modern Icon Badge */}
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 transition-all cursor-pointer group-hover/row:text-red-600">
              {theme.title}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">{theme.modules.length} études disponibles</p>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="hidden md:flex gap-2 items-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? 'w-8 bg-red-600'
                    : 'w-2 bg-gray-300 hover:bg-red-400'
                }`}
                onClick={() => {
                  if (scrollRef.current) {
                    const { scrollWidth, clientWidth } = scrollRef.current;
                    const maxScroll = scrollWidth - clientWidth;
                    const targetScrollLeft =
                      totalPages > 1 ? (i / (totalPages - 1)) * maxScroll : 0;
                    scrollRef.current.scrollTo({
                      left: targetScrollLeft,
                      behavior: 'smooth',
                    });
                  }
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative group/slider px-4 md:px-12">
        {/* Modern Navigation Buttons */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-red-600 text-red-600 hover:text-white shadow-xl hover:shadow-2xl rounded-full transition-all duration-300 flex items-center justify-center border-2 border-red-100 hover:border-red-600 group/btn"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 group-hover/btn:scale-110 transition-transform" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-red-600 text-red-600 hover:text-white shadow-xl hover:shadow-2xl rounded-full transition-all duration-300 flex items-center justify-center border-2 border-red-100 hover:border-red-600 group/btn"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 group-hover/btn:scale-110 transition-transform" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden pt-10 md:pt-12 pb-10 md:pb-12 scroll-smooth hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {theme.modules.map((module, index) => (
            <div
              key={module.code}
              className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] cursor-pointer"
              onMouseEnter={() => setHoveredModule(module.code)}
              onMouseLeave={() => setHoveredModule(null)}
              onClick={() => {
                window.scrollTo(0, 0);
                setSelectedTheme(theme);
                setSelectedModule(module);
                setCurrentPage('etude-detail');
              }}
            >
              <div
                className={`relative rounded-2xl overflow-visible bg-white transition-all duration-500 ${
                  hoveredModule === module.code
                    ? 'scale-105 md:scale-110 z-50 shadow-2xl -translate-y-3 md:-translate-y-6'
                    : 'scale-100 z-0 shadow-lg hover:shadow-xl'
                }`}
                style={{
                  transformOrigin:
                    index === 0
                      ? 'left'
                      : index === theme.modules.length - 1
                      ? 'right'
                      : 'center',
                }}
              >
                {/* Card Normal State */}
                <div
                  className={`relative rounded-2xl overflow-hidden transition-opacity duration-300 border border-gray-100 ${
                    hoveredModule === module.code
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={module.image || themeImage}
                      alt={module.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 340px"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    {/* Modern Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-red-600 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      {module.code}
                    </div>
                    
                    {index === 0 && (
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        Top
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-2 mb-2">
                        {module.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-xs">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Étude complète</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Hover State - Modern Design */}
                {hoveredModule === module.code && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white shadow-2xl border-2 border-red-600/20">
                    <div className="relative aspect-video">
                      <Image
                        src={module.image || themeImage}
                        alt={module.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 260px, (max-width: 768px) 300px, 340px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
                      
                      {/* Animated Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1 animate-pulse">
                        <Sparkles className="w-3 h-3" />
                        {module.code}
                      </div>
                    </div>

                    <div className="p-5 bg-white">
                      <h3 className="text-gray-900 font-bold text-base md:text-lg mb-3 line-clamp-2 leading-tight">
                        {module.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm line-clamp-3 mb-4 leading-relaxed">
                        {module.themeDetail}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">
                            Étude complète
                          </span>
                        </div>
                        
                        <div className="flex items-center text-red-600 font-bold text-sm hover:text-red-700 transition-colors group/link">
                          <span>Voir détails</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant principal
export default function EtudePage({
  setCurrentPage,
  setSelectedTheme,
  setSelectedModule,
}: EtudePageProps) {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 150);
        }
      }
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash, false);

    return () => {
      window.removeEventListener('hashchange', scrollToHash, false);
    };
  }, []);

  return (
    <>
      {/* Hero - Modern Design */}
      <div className="pt-28 pb-20 bg-gradient-to-br from-gray-50 via-red-50/30 to-white relative overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-700 text-sm font-semibold mb-6 shadow-sm">
            <Star className="w-4 h-4 fill-red-600 text-red-600" />
            <span>Nouveau Catalogue 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          Pôle  Étude
            <span className="block text-red-600 mt-2">2026</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez nos études et analyses approfondies pour éclairer vos décisions stratégiques
          </p>
          
          {/* Decorative Elements */}
          <div className="flex justify-center gap-3 mt-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <BookOpen className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Études Approfondies</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
              <Check className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-gray-700">Analyses Expertes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catalogue des Thèmes */}
      <section className="pt-12 md:pt-16 pb-8 md:pb-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1920px] mx-auto">
          {Etude_CATALOGUE.map((theme) => (
            <div
              id={`theme-${theme.slug}`}
              key={theme.slug}
              style={{ scrollMarginTop: '120px' }}
            >
              <ThemeRow
                theme={theme}
                setCurrentPage={setCurrentPage}
                setSelectedTheme={setSelectedTheme}
                setSelectedModule={setSelectedModule}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Tarifs */}
      <section className="py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-black relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(220,38,38,0.08),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Tarifs setCurrentPage={setCurrentPage} />
        </div>
      </section>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}