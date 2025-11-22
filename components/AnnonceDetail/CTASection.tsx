import { MessageCircle, ArrowRight, Plane } from 'lucide-react';

interface CTASectionProps {
  platformName: string;
  phone: string;
  onWhatsAppContact: () => void;
  onPhoneContact: () => void;
}

export const CTASection = ({
  platformName,
  onWhatsAppContact,
}: CTASectionProps) => {
  return (
    <div className="mt-20 relative overflow-hidden rounded-[2.5rem] bg-[#104C9E] shadow-2xl shadow-blue-900/20">
      {/* Formes d'arrière-plan */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 opacity-20 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
      
      <div className="relative z-10 px-8 py-16 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
        <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-blue-800/50 rounded-full px-4 py-1.5 text-blue-100 text-sm font-medium mb-6 border border-blue-700/50">
                <Plane className="w-4 h-4" />
                <span>Voyageurs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Vous voyagez bientôt ?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl leading-relaxed opacity-90">
                Rentabilisez vos kilos inutilisés en toute sécurité. Publiez votre trajet sur {platformName} en moins de 2 minutes.
            </p>
        </div>

        <button
            onClick={onWhatsAppContact}
            className="group bg-white text-[#104C9E] hover:bg-blue-50 font-bold text-lg py-5 px-10 rounded-2xl shadow-xl transition-all transform hover:scale-105 flex items-center space-x-3 whitespace-nowrap"
        >
            <span>Proposer mon voyage</span>
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};