import { MessageCircle, Phone, Mail, ShieldCheck, Zap } from 'lucide-react';

interface ContactInfo {
  platformName: string;
  phone: string;
  whatsapp: string;
  email: string;
}

interface AnnonceSidebarProps {
  price: string;
  contact: ContactInfo;
  onWhatsAppContact: () => void;
  onPhoneContact: () => void;
  onEmailContact: () => void;
}

export const AnnonceSidebar = ({
  price,
  contact,
  onWhatsAppContact,
  onPhoneContact,
  onEmailContact,
}: AnnonceSidebarProps) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/60 border border-gray-100 p-6 lg:p-8 relative overflow-hidden">
      {/* Effet brillant en haut */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

      {/* PRIX */}
      <div className="text-center mb-8 mt-2">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">Prix par Kilo</p>
        <div className="flex items-start justify-center">
            <span className="text-5xl font-black text-gray-900 tracking-tight">{price}</span>
            <span className="text-xl font-medium text-gray-400 mt-2 ml-1">/kg</span>
        </div>
      </div>

      {/* CALL TO ACTIONS */}
      <div className="space-y-4">
        <button
          onClick={onWhatsAppContact}
          className="w-full group bg-[#25D366] hover:bg-[#1ebc57] text-white py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-green-200 active:scale-95"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="font-bold text-lg">Discuter WhatsApp</span>
        </button>

        <div className="grid grid-cols-2 gap-3">
             <button
                onClick={onPhoneContact}
                className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-white hover:shadow-md border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all"
             >
                <Phone className="w-4 h-4" />
                <span>Appeler</span>
             </button>
             <button
                onClick={onEmailContact}
                className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-white hover:shadow-md border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all"
             >
                <Mail className="w-4 h-4" />
                <span>Email</span>
             </button>
        </div>
      </div>

      {/* SÉCURITÉ & INFO */}
      <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
         <div className="flex items-start space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm">Paiement Sécurisé</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Ne payez jamais en avance sans passer par {contact.platformName}.
                </p>
            </div>
         </div>

         <div className="flex items-start space-x-3">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                <Zap className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm">Réponse Rapide</h4>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                    Ce vendeur répond généralement en moins de 2h.
                </p>
            </div>
         </div>
      </div>
    </div>
  );
};