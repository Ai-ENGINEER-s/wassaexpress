// app/a-propos/page.tsx
'use client';

import React from 'react';
import VisionMissionValues from '@/components/VisionMissionValues';
import MotDuDG from "@/components/MotDuDG"; 
import PolesExpertise from '@/components/PolesExpertise';
import CTASection from '@/components/CTASection';

// Définition des props simplifiée
interface AboutPageProps {
    setCurrentPage: (page: string) => void;
}

export default function AboutPage({ setCurrentPage }: AboutPageProps) {
  return (
    <>
      <div className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold text-white mb-6">Qui sommes-nous ?</h1>
          <p className="text-xl text-gray-200">Partenaire de confiance pour l'excellence institutionnelle.</p>
        </div>
      </div>
      
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xl text-gray-700 mb-12 text-center max-w-4xl mx-auto">
            DIEBENU & PARTNERS est un cabinet international spécialisé dans le conseil stratégique, les études, la formation professionnelle et la recherche de financement. Fort de notre expertise et de notre réseau à travers le monde, nous nous engageons à délivrer des solutions à fort impact.
          </p>
          
          <VisionMissionValues />
          {/* <MotDuDG />  */}

          <div className="mt-20">
            <PolesExpertise setCurrentPage={setCurrentPage} />
          </div>

        </div>
      </section>
      
      <CTASection setCurrentPage={setCurrentPage} />
    </>
  );
}