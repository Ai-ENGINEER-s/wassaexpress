import { Send } from 'lucide-react';

interface InterestButtonProps {
  onClick: () => void;
}

export const InterestButton = ({ onClick }: InterestButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl p-4 flex items-center justify-center space-x-3 shadow-lg shadow-orange-200 transition-all transform active:scale-95"
    >
      <Send className="w-5 h-5" />
      <span className="font-bold text-lg">Envoyer ma demande</span>
    </button>
  );
};