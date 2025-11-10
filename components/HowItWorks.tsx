import { div } from "framer-motion/client"
import { CheckCircle, FileText, ShoppingBag } from "lucide-react";

const HowItWorks = () => {

    return (
        
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Comment Ça Marche ?</h2>
            <p className="text-gray-600 text-lg">Simple, rapide et efficace en 3 étapes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />

            {[
              {
                step: "01",
                title: "Choisissez votre service",
                description: "Sélectionnez parmi nos services : envoi de colis, AEVM, assistance médicale ou logement",
                icon: ShoppingBag
              },
              {
                step: "02",
                title: "Remplissez le formulaire",
                description: "Donnez-nous les détails de votre demande via notre formulaire simple et rapide",
                icon: FileText
              },
              {
                step: "03",
                title: "Nous nous occupons du reste",
                description: "Suivez votre demande en temps réel et profitez de notre service premium",
                icon: CheckCircle
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100 relative z-10">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 mx-auto">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-black text-orange-500">{item.step}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">{item.title}</h3>
                    <p className="text-gray-600 text-center leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

                    )


                    }


export default HowItWorks;
