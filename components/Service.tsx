'use client';
import React from 'react';
import Link from 'next/link';
import { Package, FileText, Heart, Home, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: "Achat & Expédition",
    description: "Expédition rapide du Maroc vers l’Afrique avec suivi complet.",
    features: ["Suivi en temps réel", "Emballage sécurisé", "Délais garantis", "Assistance douanière"],
    gradient: "from-orange-500 to-red-500",
    iconBg: "bg-gradient-to-br from-orange-400 to-red-500",
    link: "/service/colis"
  },
  {
    icon: FileText,
    title: "Accompagnement AEVM",
    description: "Procédure simplifiée pour obtenir l’Autorisation Électronique de Voyage.",
    features: ["Processus simplifié", "Suivi personnalisé", "Taux de réussite élevé", "Support multilingue"],
    gradient: "from-blue-500 to-indigo-600",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    link: "/service/aevm"
  },
  {
    icon: Heart,
    title: "Assistance Médicale",
    description: "Accompagnement complet pour vos soins au Maroc.",
    features: ["Hôpitaux certifiés", "Traducteurs disponibles", "Gestion hébergement", "Suivi post-traitement"],
    gradient: "from-pink-500 to-rose-600",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    link: "/service/medical"
  },
  {
    icon: Home,
    title: "Recherche de Logement",
    description: "Trouver facilement un logement adapté à vos besoins.",
    features: ["Large sélection", "Visites virtuelles", "Négociation de prix", "Assistance administrative"],
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    link: "/service/logement"
  }
];

const Service = () => {
  return (
    <section id="services" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-20 relative z-10">
      
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AAD] to-blue-600">Wassa</span> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6600] to-orange-500"> Express</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Des solutions complètes et innovantes pour répondre à tous vos besoins avec excellence.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Link key={index} href={service.link} className="group relative block">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 hover:border-transparent overflow-hidden h-full flex flex-col">
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg ${service.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{service.description}</p>

                {/* Features */}
                <ul className="space-y-1 mb-4 text-gray-600 text-sm">
                  {service.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-br ${service.gradient}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <button className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold bg-gradient-to-r ${service.gradient} hover:scale-105 transition-transform duration-300`}>
                    Demander
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
