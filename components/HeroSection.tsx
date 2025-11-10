import { useState, useEffect } from 'react';
import { Sparkles} from 'lucide-react';

const heroImages = [
  {
    url: '/images/envoie-colis/4.png', 
  },
  {
    url: '/images/envoie-colis/2.png', 
  },
  {
    url: '/images/envoie-colis/1.png', 
  },
];



export default function HeroSectionSearch() {
  const [currentSlide, setCurrentSlide] = useState(0);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);



  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[750px] overflow-hidden">
      
      {/* Background Slider avec images plus sombres */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
            style={{ 
              backgroundImage: `url(${image.url})`,
              transform: index === currentSlide ? 'scale(1.08)' : 'scale(1)',
              filter: 'brightness(0.75) contrast(1.05)'
            }}
          />
          {/* Overlay gradient plus prononcé */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-orange-900/55" />
          
          {/* Effet de lumière dynamique */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
        </div>
      ))}

      {/* Contenu Principal */}
      <div className="relative h-full flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Badge animé */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-down">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-medium text-white">Plateforme N°1 au Mali </span>
        </div>

        {/* Titre avec effet gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight animate-fade-in-down bg-gradient-to-r from-white via-white to-orange-200 bg-clip-text text-transparent">
          Trouvez tout ce dont
          <br />
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            vous avez besoin
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 mb-12 max-w-2xl animate-fade-in-up font-light">
          Recherchez des services, des transporteurs et des solutions 
          <span className="font-semibold text-white"> sur une seule plateforme</span>
        </p>

   

      </div>
      
      {/* Indicateurs de Slide modernes */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50' 
                : 'bg-white/40 w-1 hover:bg-white/60 hover:w-4'
            }`}
          />
        ))}
      </div>

 
    </section>
  );
}