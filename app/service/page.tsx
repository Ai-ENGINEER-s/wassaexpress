'use client';

import React from 'react';
import {
  Package,
  FileCheck,
  Stethoscope,
  Home,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      id: 'expedition',
      icon: Package,
      title: 'Expédition de Colis International',
      description:
        "Service premium d'expédition du Maroc vers le Mali et l'Afrique. Logistique complète, récupération sécurisée et suivi avancé.",
      features: [
        'Suivi en temps réel',
        'Emballage sécurisé',
        'Délais garantis',
        'Assistance douanière',
      ],
      gradient: 'from-blue-600 to-cyan-500',
    },
    {
      id: 'aevm',
      icon: FileCheck,
      title: 'Accompagnement AEVM',
      description:
        "Procédure simplifiée pour obtenir l’Autorisation Électronique de Voyage au Maroc (AEVM).",
      features: [
        'Processus simplifié',
        'Suivi personnalisé',
        'Taux de réussite élevé',
        'Support multilingue',
      ],
      gradient: 'from-fuchsia-500 to-purple-500',
    },
    {
      id: 'medical',
      icon: Stethoscope,
      title: 'Assistance Médicale',
      description:
        'Accompagnement complet pour vos soins au Maroc : hôpitaux partenaires, conseils, gestion des rendez-vous.',
      features: [
        'Hôpitaux partenaires certifiés',
        'Traducteurs disponibles',
        'Gestion de l’hébergement',
        'Suivi post-traitement',
      ],
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 'logement',
      icon: Home,
      title: 'Recherche de Logement',
      description:
        'Trouver facilement un logement adapté à vos besoins au Maroc : étudiants, professionnels, visiteurs.',
      features: [
        'Large sélection',
        'Visites virtuelles',
        'Négociation de prix',
        'Assistance administrative',
      ],
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const handleContactClick = (id: string) => {
    window.location.href = `/contact?service=${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* --- HERO --- */}
<section className="relative py-32 flex flex-col items-center justify-center text-center">
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547483238-2a73767f6c37')]
 bg-cover bg-center opacity-20"></div>
  <div className="absolute inset-0 backdrop-blur-sm"></div>

  <div className="relative z-10 max-w-3xl">
    <div className="inline-flex items-center bg-black backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/20 shadow-sm">
      <CheckCircle size={18} className="text-white" />
      <span className="ml-2 text-white font-medium">Nos Solutions</span>
    </div>

    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 drop-shadow-xl">
      Nos Services
    </h1>

    <p className="text-xl mt-4 text-gray-700">
      Des solutions complètes pour simplifier vos démarches entre le Maroc et l’Afrique
    </p>
  </div>
</section>


      {/* --- SERVICES GRID --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">

        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              className="relative group p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
            >
              {/* gradient circle */}
              <div
                className={`absolute -top-8 -right-10 w-40 h-40 bg-gradient-to-br ${service.gradient} opacity-10 blur-3xl rounded-full`}
              />

              {/* icon section */}
              <div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-md mb-6 transform group-hover:scale-110 transition-all`}
              >
                <Icon size={32} />
              </div>

              {/* title */}
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => handleContactClick(service.id)}
                className={`w-full bg-gradient-to-r ${service.gradient} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg`}
              >
                Demander ce service
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </section>

      {/* --- FAQ --- */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Questions fréquentes</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Quels sont les délais de livraison pour les colis ?',
                a: 'En général entre 5 et 15 jours ouvrables selon la destination.',
              },
              {
                q: "Comment se déroule l'obtention de l'AEVM ?",
                a: "Nous vous assistons pour la constitution du dossier, la demande et le suivi complet.",
              },
              {
                q: 'Quels types de soins médicaux proposez-vous ?',
                a: 'Nos partenaires couvrent chirurgie, dentaire, analyses, ophtalmologie, etc.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white/10 p-5 rounded-xl backdrop-blur-sm cursor-pointer transition-all"
              >
                <summary className="font-medium text-lg">{faq.q}</summary>
                <p className="text-gray-300 mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
