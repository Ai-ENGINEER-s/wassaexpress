'use client';

import React from 'react';
import Link from 'next/link';
import { Package, FileText, Heart, Home, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Package,
    title: "Achat & Expédition",
    price: "2000 DH",
    description: "Expédition premium du Maroc vers l’Afrique avec suivi complet.",
    features: ["Suivi en temps réel", "Emballage sécurisé", "Délais garantis", "Assistance douanière"],
    link: "/service/colis"
  },
  {
    icon: FileText,
    title: "Accompagnement AEVM",
    price: "700 DH",
    description: "Procédure simplifiée pour obtenir votre Autorisation Électronique de Voyage.",
    features: ["Processus simplifié", "Suivi personnalisé", "Support multilingue", "Taux élevé de réussite"],
    link: "/service/aevm"
  },
  {
    icon: Heart,
    title: "Assistance Médicale",
    price: "500 DH",
    description: "Accompagnement complet pour vos soins au Maroc.",
    features: ["Hôpitaux certifiés", "Traduction", "Hébergement", "Suivi post-traitement"],
    link: "/service/medical"
  },
  {
    icon: Home,
    title: "Recherche de Logement",
    price: "500 DH",
    description: "Des solutions adaptées pour trouver facilement un logement.",
    features: ["Large sélection", "Visites virtuelles", "Négociation", "Assistance administrative"],
    link: "/service/logement"
  }
];

const Service = () => {
  return (
    <section id="services" className="py-24 bg-gray-50 relative">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
          Nos <span className="text-[#FF6600]">Services</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg mt-4 leading-relaxed">
          Des solutions fiables, professionnelles et adaptées à vos besoins.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <Link key={index} href={service.link} className="group">
              <div className="bg-white rounded-2xl p-7 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">

                {/* ICON */}
                <div className="w-16 h-16 rounded-xl bg-[#FF6600]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6600]/20 transition-all">
                  <Icon className="w-8 h-8 text-[#FF6600]" />
                </div>

                {/* Title */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF6600] transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Price */}
                <p className="text-[#FF6600] font-extrabold text-lg mb-4">{service.price}</p>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 text-gray-600 text-sm mb-6">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6600]" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold bg-[#FF6600] text-white hover:bg-[#e35600] transition-all group-hover:scale-105">
                  Demander <ArrowRight className="w-5 h-5" />
                </button>

              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
