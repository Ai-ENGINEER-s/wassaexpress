// CHEMIN OBLIGATOIRE : app/livreurs/[id]/page.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// "params" est automatiquement passé à la page par Next.js
export default function LivreurDetailPage({ params }: { params: { id: string } }) {

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
        
        <Link 
          href="/livreurs" 
          className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour à la liste</span>
        </Link>
        
        <h1 className="text-3xl font-bold text-[#104C9E] mb-4">
          Profil du Livreur
        </h1>
        
        <p className="text-lg text-gray-700">
          Détails pour le livreur ID :
        </p>
        
        <div className="mt-4 p-4 bg-gray-100 rounded-xl inline-block">
          <span className="font-mono text-xl font-semibold text-gray-900">
            {params.id}
          </span>
        </div>

      </div>
    </div>
  );
}