'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight, BookOpen, Users, FileText } from 'lucide-react';
import { ThemeForOtherPages, ModuleForOtherPages } from '@/types/index';

interface EtudeDetailPageProps {
  theme: ThemeForOtherPages;
  module: ModuleForOtherPages;
  setCurrentPage: (page: string) => void;
}

export default function EtudeDetailPage({ theme, module, setCurrentPage }: EtudeDetailPageProps) {
  // Utiliser l'image du module en priorité, sinon celle du thème
  const heroImage = module.image || theme.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop';

  return (
    <>
      {/* Hero Section avec image du module */}
      <div className="relative pt-32 pb-64 overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={module.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          <button 
            onClick={() => setCurrentPage('etude')}
            className="text-white mb-8 flex items-center hover:text-red-400 transition-colors group"
          >
            <ChevronRight className="w-5 h-5 rotate-180 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour au catalogue d'études
          </button>

          {/* Badge du code */}
          <div className="inline-block px-5 py-2 bg-red-600 text-white rounded-lg font-bold text-sm shadow-xl mb-6">
            {module.code}
          </div>

          {/* Titre du module */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 max-w-4xl leading-tight">
            {module.title}
          </h1>

          {/* Catégorie */}
          <div className="flex items-center text-gray-200 text-lg">
            <FileText className="w-5 h-5 mr-2" />
            <span className="font-semibold">{theme.title}</span>
          </div>
        </div>
      </div>

      {/* Section Description - Chevauche le hero */}
      <div className="relative -mt-48 pb-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          {/* Card principale de description */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-red-50 rounded-xl">
                <FileText className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">À propos de cette étude</h2>
                <div className="w-16 h-1 bg-red-600 rounded-full"></div>
              </div>
            </div>
            
            <div 
              className="text-lg text-gray-700 leading-relaxed border-l-4 border-red-300 pl-6 py-2 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: module.themeDetail }}
            />
          </div>

          {/* Card informations complémentaires */}
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 mb-12 border border-gray-200">
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-red-600" />
              Détails de l'étude
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Code de référence</div>
                <div className="text-xl font-bold text-gray-900">{module.code}</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Domaine</div>
                <div className="text-xl font-bold text-gray-900">{theme.title}</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Intéressé par cette étude ?</h3>
                <p className="text-red-100">Contactez-nous pour obtenir plus d'informations ou commander cette étude</p>
              </div>
              <button 
                // ========================================
                // ============ CORRECTION ICI ============
                onClick={() => {
                  window.scrollTo(0, 0); // <-- CORRECTION AJOUTÉE
                  setCurrentPage('contact');
                }} 
                // ========================================
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition duration-300 shadow-lg transform hover:scale-105 whitespace-nowrap flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}