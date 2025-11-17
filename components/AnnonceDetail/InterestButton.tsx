import { Package, Send } from 'lucide-react';

interface InterestButtonProps {
  onClick: () => void;
}

export const InterestButton = ({ onClick }: InterestButtonProps) => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center shadow-lg">
      <Package className="w-12 h-12 text-white mx-auto mb-3" />
      <h3 className="text-2xl font-bold text-white mb-3">
        Intéressé par cette annonce ?
      </h3>
      <p className="text-orange-50 mb-6">
        Contactez-nous avec vos informations
      </p>
      <button
        onClick={onClick}
        className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg mx-auto"
      >
        <Send className="w-5 h-5" />
        <span>Je suis intéressé(e)</span>
      </button>
    </div>
  );
};