import React from 'react';
import { Package, FileText, Heart, Home, ArrowRight } from 'lucide-react';

const Service = () => { 
  // On simplifie la liste des services. Plus besoin de gradients, badges, etc.
  const services = [
    {
      icon: Package,
      title: "Envoi de Colis",
      description: "Expédition express du Maroc vers le Mali et toute l'Afrique. Suivi en temps réel inclus.",
      link: "/services/envoi-colis"
    },
    {
      icon: FileText,
      title: "AEVM Express",
      description: "Obtenez votre autorisation de voyage rapidement avec notre accompagnement expert.",
      link: "/services/aevm-express"
    },
    {
      icon: Heart,
      title: "Assistance Médicale",
      description: "Accès aux meilleurs établissements médicaux avec accompagnement personnalisé.",
      link: "/services/assistance-medicale"
    },
    {
      icon: Home,
      title: "Logement Garanti",
      description: "Trouvez le logement parfait au Maroc adapté à vos besoins et votre budget.",
      link: "/services/logement"
    }
  ];

  return (
    <section id="services" className="bg-white py-24 relative overflow-hidden">
      {/* Éléments décoratifs (conservés car subtils) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Services WassaExpress
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Pour Vous</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des solutions complètes et innovantes pour répondre à tous vos besoins avec excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a 
                href={service.link}
                key={index} 
                className="group relative bg-white rounded-3xl p-8 transition-all duration-300 border border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 block"
              >
                {/* Contenu */}
                <div className="relative">

                  {/* Icône simplifiée */}
                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center transition-all duration-300 group-hover:bg-orange-600 group-hover:text-white">
                      <Icon className="w-8 h-8" /> 
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* CTA "Découvrir" simplifié */}
                  <div className="mt-6 font-semibold text-orange-600 flex items-center space-x-2 transition-all duration-300 group-hover:text-orange-700">
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

     
      </div>
    </section>
  );
}

export default Service;