// CHEMIN OBLIGATOIRE : app/livreurs/[id]/page.tsx
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    id: string;
  };
}

export default function LivreurDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/livreurs"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour à la liste</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-[#104C9E] mb-6">
            Profil du Livreur
          </h1>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-gray-700 mb-2">
              Détails pour le livreur ID :
            </p>
            <p className="text-4xl font-bold text-[#104C9E]">
              {params.id}
            </p>
          </div>

          <div className="mt-6 text-gray-600">
            <p>Cette page affichera les détails complets du livreur.</p>
            <p className="mt-2 text-sm">
              Vous pouvez maintenant ajouter toutes les informations détaillées du livreur ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}