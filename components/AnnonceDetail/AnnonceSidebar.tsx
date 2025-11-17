import { Clock, ShieldCheck, MessageCircle, Phone, Mail } from 'lucide-react';

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
      {/* PRIX */}
      <div className="text-center mb-6 pb-6 border-b border-gray-200">
        <p className="text-sm text-gray-500 mb-2">Tarif</p>
        <p className="text-4xl font-extrabold text-orange-500">{price}</p>
      </div>

      {/* INFOS CONTACT PLATEFORME */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Contactez-nous</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="font-medium">{contact.platformName}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Nous vous répondons rapidement</span>
          </div>
        </div>
      </div>

      {/* MESSAGE INFO */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <p className="text-sm text-blue-900 leading-relaxed">
          💬 <strong>Comment ça marche ?</strong>
          <br />
          Contactez-nous et nous vous mettrons en relation directe avec le
          voyageur vérifié.
        </p>
      </div>

      {/* BOUTONS DE CONTACT */}
      <div className="space-y-3">
        <button
          onClick={onWhatsAppContact}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={onPhoneContact}
          className="w-full bg-[#104C9E] hover:bg-[#0d3d7f] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm"
        >
          <Phone className="w-5 h-5" />
          <span>Appeler</span>
        </button>

        <button
          onClick={onEmailContact}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition"
        >
          <Mail className="w-5 h-5" />
          <span>Email</span>
        </button>
      </div>

      {/* AVERTISSEMENT */}
      <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4">
        <p className="text-xs text-green-800 leading-relaxed">
          ✅ <strong>Sécurité garantie</strong>
          <br />
          Tous nos voyageurs sont vérifiés. Nous assurons la mise en relation et
          le suivi de votre envoi.
        </p>
      </div>
    </div>
  );
};