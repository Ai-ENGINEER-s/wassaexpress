'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LivreurDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/livreurs" className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour à la liste</span>
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-[#104C9E] mb-6">Profil du Livreur</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-gray-700 mb-2">Détails pour le livreur ID :</p>
            <p className="text-4xl font-bold text-[#104C9E]">{id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}