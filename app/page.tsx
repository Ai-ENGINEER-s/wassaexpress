'use client';

import React, { useState, useEffect } from 'react';
import { Package, FileText, Heart, Home, ChevronRight, Phone, Mail, MapPin, Star, Truck, ShoppingBag, Zap, Shield, Clock, Users, ArrowRight, CheckCircle, Play } from 'lucide-react';
import HeroSectionExtraordinaire from '@/components/HeroSection';
import TopAnnonce from '@/components/TopAnnonce';
import AnnoncesParCategorie from '@/components/AnnoncesParCatégorie';
import AnnoncesRecente from '@/components/AnnoncesRécente';
import Service from '@/components/Service';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import SearchBarHeroSection from '@/components/SearchBarHeroSection';
import FooterE from '@/components/FooterE';

const WassaExpressHomepage = () => {

  
  return (
    <div className="  bg-[#EFECE3] min-h-screen bg-gradient-to-b from-gray-50 to-white">
    

<HeroSectionExtraordinaire/>
      {/* Search Bar Moderne */}
    
<SearchBarHeroSection/>
      {/* Top Annonces */}
      <TopAnnonce />

      {/* Annonces Par Catégories - Design Amazon-like */}
    <AnnoncesParCategorie />

      {/* Annonces Récentes */}
   <AnnoncesRecente />

      {/* Services Section Ultra-Modern */}
   <Service/>



      {/* How It Works Section */}
  {/* <HowItWorks/> */}

      {/* Stats Section with Animation */}
     
 {/* <Stats/> */}

      {/* Footer Ultra-Modern */}
     

  
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all z-50"
      >
        <ChevronRight className="w-6 h-6 text-white -rotate-90" />
      </button>
    </div>
  );
};

export default WassaExpressHomepage;