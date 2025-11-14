'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, Package, ShoppingCart, Phone, Mail, ArrowRight, Star } from 'lucide-react';

const ProduitsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const categories = [
    'Tous',
    'Électronique',
    'Mode & Textile',
    'Cosmétiques',
    'Alimentation',
    'Artisanat',
    'Maroquinerie'
  ];

  const produits = [
    {
      id: 1,
      nom: 'Smartphone Samsung Galaxy',
      categorie: 'Électronique',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
      description: 'Smartphone dernière génération, disponible en plusieurs coloris',
      fournisseur: 'Casa Electronics',
      ville: 'Casablanca',
      rating: 4.8,
      badge: 'Populaire'
    },
    {
      id: 2,
      nom: 'Caftan Marocain Traditionnel',
      categorie: 'Mode & Textile',
      image: 'https://images.unsplash.com/photo-1583391733981-5aff4a3e6c48?auto=format&fit=crop&w=800&q=80',
      description: 'Caftan traditionnel fait main, broderie premium',
      fournisseur: 'Artisans de Fès',
      ville: 'Fès',
      rating: 5.0,
      badge: 'Artisanal'
    },
    {
      id: 3,
      nom: 'Huile d\'Argan Bio',
      categorie: 'Cosmétiques',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      description: 'Huile d\'argan 100% pure et bio, certifiée',
      fournisseur: 'Coopérative Féminine',
      ville: 'Essaouira',
      rating: 4.9,
      badge: 'Bio'
    },
    {
      id: 4,
      nom: 'Sac en Cuir Marocain',
      categorie: 'Maroquinerie',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      description: 'Sac en cuir véritable, fait main par artisans',
      fournisseur: 'Leather Masters',
      ville: 'Marrakech',
      rating: 4.7,
      badge: 'Nouveau'
    },
    {
      id: 5,
      nom: 'Épices Marocaines Premium',
      categorie: 'Alimentation',
      image: 'https://images.unsplash.com/photo-1596040033229-a0b3b144b330?auto=format&fit=crop&w=800&q=80',
      description: 'Assortiment d\'épices authentiques, qualité premium',
      fournisseur: 'Souk des Épices',
      ville: 'Marrakech',
      rating: 4.8,
      badge: 'Premium'
    },
    {
      id: 6,
      nom: 'Montre Connectée',
      categorie: 'Électronique',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      description: 'Montre connectée avec suivi santé et sport',
      fournisseur: 'Tech Store',
      ville: 'Casablanca',
      rating: 4.6,
      badge: 'Tendance'
    },
    {
      id: 7,
      nom: 'Djellaba Moderne',
      categorie: 'Mode & Textile',
      image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=800&q=80',
      description: 'Djellaba moderne pour homme, coupe élégante',
      fournisseur: 'Mode & Tradition',
      ville: 'Rabat',
      rating: 4.5,
      badge: 'Nouveau'
    },
    {
      id: 8,
      nom: 'Tajine en Céramique',
      categorie: 'Artisanat',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80',
      description: 'Tajine traditionnel peint à la main',
      fournisseur: 'Poterie Fassi',
      ville: 'Fès',
      rating: 4.9,
      badge: 'Artisanal'
    },
    {
      id: 9,
      nom: 'Savon Noir Beldi',
      categorie: 'Cosmétiques',
      image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
      description: 'Savon noir traditionnel pour hammam',
      fournisseur: 'Hammam Products',
      ville: 'Marrakech',
      rating: 4.7,
      badge: 'Traditionnel'
    }
  ];

  const filteredProducts = produits.filter(produit => {
    const matchesSearch = produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          produit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || produit.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactProduct = (produit: any) => {
    window.location.href = `/contact?produit=${produit.id}&nom=${encodeURIComponent(produit.nom)}`;
  };

  const getBadgeColor = (badge: string) => {
    const colors: any = {
      'Populaire': 'bg-red-500',
      'Artisanal': 'bg-purple-500',
      'Bio': 'bg-green-500',
      'Nouveau': 'bg-blue-500',
      'Premium': 'bg-yellow-500',
      'Tendance': 'bg-pink-500',
      'Traditionnel': 'bg-orange-500'
    };
    return colors[badge] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative text-white pb-16 pt-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("images/envoie-colis/6.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin size={20} />
              <span className="text-sm font-medium">Produits du Maroc</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Notre Catalogue
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10">
              Découvrez nos produits marocains de qualité, livrés directement chez vous au Mali
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-white text-gray-900 shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter (Maintenant hors du Hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="text-gray-600 flex-shrink-0" size={20} />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        {/* Info Banner */}
        <div className="mb-12 bg-white border-l-4 border-orange-500 rounded-lg p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <Package className="text-orange-600 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Comment ça marche ?</h3>
              <p className="text-gray-700">
                Trouvez le produit qui vous intéresse, contactez-nous, et nous nous occupons de tout ! 
                Nous récupérons le produit auprès de nos fournisseurs locaux au Maroc et l'expédions directement 
                à votre adresse au Mali ou dans votre pays.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6 text-gray-600">
          <span className="font-semibold">{filteredProducts.length}</span> produit(s) disponible(s)
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((produit, index) => (
            <div
              key={produit.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image (hauteur réduite à h-52) */}
              <div className="relative h-52 overflow-hidden"> 
                <img
                  src={produit.image}
                  alt={produit.nom}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Badge */}
                <div className={`absolute top-3 left-3 ${getBadgeColor(produit.badge)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {produit.badge}
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content (padding ajusté à p-5) */}
              <div className="p-5">
                <span className="inline-block text-orange-600 text-sm font-medium mb-1"> {/* mb-1 au lieu de mb-2 */}
                  {produit.categorie}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors"> {/* mb-1 au lieu de mb-2 */}
                  {produit.nom}
                </h3>

                {/* Description (maintenant line-clamp-1) */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-1"> {/* mb-3 au lieu de mb-4, et line-clamp-1 */}
                  {produit.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3"> {/* mb-3 au lieu de mb-4 */}
                  <MapPin size={16} className="text-orange-500" />
                  <span>{produit.fournisseur} • {produit.ville}</span>
                </div>

                <div className="flex items-center gap-1 mb-5"> {/* mb-5 au lieu de mb-6 */}
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(produit.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{produit.rating}</span>
                </div>

                <button
                  onClick={() => handleContactProduct(produit)}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Je suis intéressé(e)</span>
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Contact Section (Identique) */}
      <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white py-16 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1
        }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-xl text-orange-50 mb-8">
            Contactez-nous ! Nous pouvons sourcer presque n'importe quel produit disponible au Maroc
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 font-bold py-4 px-8 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Mail size={20} />
              <span>Nous Écrire</span>
            </a>
            <a
              href="tel:+212663833056"
              className="inline-flex items-center justify-center gap-2 bg-orange-800 text-white font-bold py-4 px-8 rounded-full hover:bg-orange-900 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone size={20} />
              <span>+212 663-833056</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1; /* Limite à une seule ligne */
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis; /* Ajoute des points de suspension si le texte est tronqué */
        }

        .line-clamp-2 { /* Garde la définition pour d'autres usages potentiels */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProduitsPage;

