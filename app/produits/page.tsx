'use client';

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Send, // Nouvelle icône pour la demande
  Star,
  ArrowUpRight,
  Sparkles,
  Tag,
} from 'lucide-react';

interface Product {
  id: number;
  nom: string;
  categorie: string;
  prix: number;
  image: string;
  description: string;
  fournisseur: string;
  ville: string;
  rating: number;
  badge: 'Populaire' | 'Bio' | 'Artisanal' | 'Nouveau' | 'Premium' | 'Tendance' | 'Traditionnel';
}

const badgeStyles: Record<string, string> = {
  Populaire: 'bg-orange-500 text-white shadow-orange-200',
  Bio: 'bg-emerald-500 text-white shadow-emerald-200',
  Artisanal: 'bg-purple-600 text-white shadow-purple-200',
  Nouveau: 'bg-blue-500 text-white shadow-blue-200',
  Premium: 'bg-slate-900 text-white shadow-slate-300',
  Tendance: 'bg-pink-500 text-white shadow-pink-200',
  Traditionnel: 'bg-amber-600 text-white shadow-amber-200',
};

const categories = [
  'Tous',
  'Électronique',
  'Mode & Textile',
  'Cosmétiques',
  'Alimentation',
  'Artisanat',
  'Maroquinerie',
];

const produits: Product[] = [
  {
    id: 1,
    nom: 'Samsung Galaxy S24 Ultra',
    categorie: 'Électronique',
    prix: 13900,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    description: 'Smartphone dernière génération, disponible en noir fantôme.',
    fournisseur: 'Casa Electronics',
    ville: 'Casablanca',
    rating: 4.8,
    badge: 'Populaire',
  },
  {
    id: 2,
    nom: 'Caftan Marocain Royal',
    categorie: 'Mode & Textile',
    prix: 3500,
    image: 'https://images.unsplash.com/photo-1583391733981-5aff4a3e6c48?auto=format&fit=crop&w=800&q=80',
    description: 'Caftan traditionnel fait main, broderie fil d\'or premium.',
    fournisseur: 'Artisans de Fès',
    ville: 'Fès',
    rating: 5.0,
    badge: 'Artisanal',
  },
  {
    id: 3,
    nom: "Huile d'Argan Bio (1L)",
    categorie: 'Cosmétiques',
    prix: 450,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    description: "Huile d'argan 100% pure, pression à froid certifiée.",
    fournisseur: 'Coopérative Féminine',
    ville: 'Essaouira',
    rating: 4.9,
    badge: 'Bio',
  },
  {
    id: 4,
    nom: 'Service Tajine 6 Personnes',
    categorie: 'Artisanat',
    prix: 280,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?auto=format&fit=crop&w=800&q=80',
    description: 'Ensemble tajine en céramique peinte à la main.',
    fournisseur: 'Artisans Marrakech',
    ville: 'Marrakech',
    rating: 4.7,
    badge: 'Traditionnel',
  },
  {
    id: 5,
    nom: 'Sac Voyage Cuir Veritable',
    categorie: 'Maroquinerie',
    prix: 1200,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    description: 'Cuir de vachette pleine fleur, tannage naturel.',
    fournisseur: 'Leather Masters',
    ville: 'Tanger',
    rating: 4.9,
    badge: 'Premium',
  },
  {
    id: 6,
    nom: 'Tapis Beni Ouarain',
    categorie: 'Artisanat',
    prix: 2800,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description: 'Laine vierge, noué à la main, motifs géométriques.',
    fournisseur: 'Tapis Atlas',
    ville: 'Tazenakht',
    rating: 5.0,
    badge: 'Tendance',
  },
];

export default function ProduitsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const orange = '#ff8c42';

  const filteredProducts = produits.filter((p) => {
    const matchSearch =
      p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === 'Tous' || p.categorie === selectedCategory;
    return matchSearch && matchCategory;
  });

  const handleInterest = (p: Product) => {
    // Exemple d'action : Redirection vers WhatsApp avec un message pré-rempli
    // ou ouverture d'un formulaire de contact
    console.log(`Le client est intéressé par : ${p.nom}`);
    window.location.href = `/contact?product=${p.id}`; 
  };

  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-600 font-sans">
      {/* HERO SECTION */}
      <div className="relative pt-20 pb-12 px-4 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-6">
            <Sparkles size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Logistique & Sourcing</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Vous choisissez, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">nous livrons</span>
          </h1>
          
          <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
             Nous récupérons ces produits directement chez les fournisseurs pour vous les expédier.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8 relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-slate-400" />
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit à faire livrer..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Catalogue Fournisseurs</h2>
          <span className="text-slate-400 text-sm font-medium bg-slate-100 px-3 py-1 rounded-lg">
            {filteredProducts.length} produits
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredProduct(p.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group relative bg-white rounded-[2rem] border border-slate-100 hover:border-orange-100 flex flex-col h-full transition-all duration-500"
                style={{
                  boxShadow: hoveredProduct === p.id 
                    ? '0 25px 50px -12px rgba(255, 140, 66, 0.15)' 
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                  transform: hoveredProduct === p.id ? 'translateY(-8px)' : 'none'
                }}
              >
                {/* 1. IMAGE SECTION */}
                <div className="relative h-72 overflow-hidden rounded-t-[2rem] m-2">
                  <div className="absolute inset-0 bg-slate-100" />
                  <img
                    src={p.image}
                    alt={p.nom}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: hoveredProduct === p.id ? 'scale(1.12)' : 'scale(1)',
                    }}
                  />
                  
                  {/* Badge Categorie */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${badgeStyles[p.badge]}`}>
                        {p.badge}
                     </span>
                  </div>
                </div>

                {/* CONTENT BODY */}
                <div className="px-6 pt-2 pb-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag size={14} className="text-slate-300" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.categorie}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-orange-600 transition-colors">
                    {p.nom}
                  </h3>
                  
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {p.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-4 border-t border-dashed border-slate-100">
                    <MapPin size={14} className="text-orange-400" />
                    <span className="text-xs text-slate-500 font-medium truncate">
                      Disponible à : {p.fournisseur}, {p.ville}
                    </span>
                  </div>
                </div>

                {/* 2. & 3. FOOTER AVEC PRIX ET BOUTON ACTION */}
                <div className="p-4 mx-2 mb-2 bg-slate-50/50 rounded-[1.5rem] flex flex-col sm:flex-row items-center justify-between gap-4 group-hover:bg-orange-50/30 transition-colors duration-300">
                  
                  {/* PRIX (Informationnel) */}
                  <div className="flex flex-col items-start w-full sm:w-auto">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Prix Fournisseur</span>
                    <span className="text-xl font-black text-slate-900">
                      {p.prix.toLocaleString('fr-MA')} <span className="text-sm font-bold text-orange-500">MAD</span>
                    </span>
                  </div>

                  {/* BOUTON "JE SUIS INTÉRESSÉ" */}
                  <button
                    onClick={() => handleInterest(p)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white shadow-lg shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
                    style={{
                      backgroundColor: orange,
                      transform: hoveredProduct === p.id ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    <span>Je suis intéressé</span>
                    <Send size={16} className="text-white" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
             <div className="bg-white p-6 rounded-full inline-flex mb-6 shadow-md">
                <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Aucun produit trouvé</h3>
            <button 
                onClick={() => {setSearchTerm(''); setSelectedCategory('Tous');}}
                className="mt-6 text-orange-600 font-bold hover:underline"
            >
                Réinitialiser la recherche
            </button>
          </div>
        )}
      </div>

      {/* CTA FINAL */}
      <div className="py-20 bg-slate-900 text-white mt-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500 rounded-full blur-[100px]" />
             <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Besoin d'un produit spécifique ?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Dites-nous ce que vous cherchez, nous irons le chercher chez le fournisseur pour vous.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/50">
            Faire une demande spéciale
          </button>
        </div>
      </div>
    </div>
  );
}