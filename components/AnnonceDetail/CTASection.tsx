import { MessageCircle, Phone } from 'lucide-react';

interface CTASectionProps {
  platformName: string;
  phone: string;
  onWhatsAppContact: () => void;
  onPhoneContact: () => void;
}

export const CTASection = ({
  platformName,
  phone,
  onWhatsAppContact,
  onPhoneContact,
}: CTASectionProps) => {
  return (
    <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Vous voyagez bientôt ?</h2>
        <p className="text-lg mb-6 text-orange-50">
          Rentabilisez votre voyage en transportant des colis ! Contactez-nous
          pour publier votre disponibilité.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onWhatsAppContact}
            className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-xl flex items-center space-x-2 transition shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Nous contacter sur WhatsApp</span>
          </button>
          <button
            onClick={onPhoneContact}
            className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-8 rounded-xl flex items-center space-x-2 transition"
          >
            <Phone className="w-5 h-5" />
            <span>{phone}</span>
          </button>
        </div>
      </div>
    </div>
  );
};