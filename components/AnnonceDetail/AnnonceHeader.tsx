import { ArrowLeft, Heart, Share2 } from 'lucide-react';

interface AnnonceHeaderProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}


export const AnnonceHeader = ({
  isFavorite,
  onToggleFavorite,
  onShare,
}: AnnonceHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition-colors py-2 px-3 rounded-full hover:bg-blue-50"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium text-sm">Retour aux annonces</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleFavorite}
            className="p-2.5 rounded-full hover:bg-red-50 transition-colors group"
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className={`w-6 h-6 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-400 group-hover:text-red-500'
              }`}
            />
          </button>
          <button
            onClick={onShare}
            className="p-2.5 rounded-full hover:bg-blue-50 transition-colors group"
            aria-label="Partager"
          >
            <Share2 className="w-6 h-6 text-gray-400 group-hover:text-[#104C9E]" />
          </button>
        </div>
      </div>
    </header>
  );
};