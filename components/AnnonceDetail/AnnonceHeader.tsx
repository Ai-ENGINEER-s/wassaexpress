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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleFavorite}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
          <button
            onClick={onShare}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Share2 className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
};