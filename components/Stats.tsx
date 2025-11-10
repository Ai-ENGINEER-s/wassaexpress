import { Package, Users, Star, Clock } from "lucide-react";

const Stats = () => {
    return (
        <section className="bg-[#F9F8F6] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10,000+", label: "Colis Livrés", icon: Package },
              { number: "5,000+", label: "Clients Satisfaits", icon: Users },
              { number: "98%", label: "Taux de Satisfaction", icon: Star },
              { number: "24/7", label: "Support Client", icon: Clock }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="relative group">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:shadow-orange-100 hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 w-14 h-14 rounded-2xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl font-bold text-gray-900">
                          {stat.number}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );  
}

export default Stats;