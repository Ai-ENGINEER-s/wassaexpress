'use client';

import { X, Package, User, Loader2, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// URL API (À ajuster si besoin)
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json';

interface AnnonceModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
}

export default function AnnonceModal({ isOpen, onClose, onSuccess }: AnnonceModalProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nom: '', 
    prenom: '', 
    telephone: '', 
    email: '',
    type: 'GP', // Nom corrigé pour correspondre à ACF ('type')
    ville_depart: '', // Nom corrigé pour correspondre à ACF ('ville_depart')
    ville_destination: '', // Nom corrigé pour correspondre à ACF ('ville_destination')
    date: '', // Nom corrigé ('date')
    poids: '', // Nom corrigé ('poids')
    description: ''
  });

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Validation basique
    if (!formData.nom || !formData.telephone || !formData.ville_depart || !formData.ville_destination) {
      return alert("Veuillez remplir les champs obligatoires");
    }

    setLoading(true);

    try {
        // Envoi vers l'API WordPress
        const response = await fetch(`${WP_API_URL}/wassa/v1/soumission`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Erreur lors de l'envoi");
        }

        // Succès
        setLoading(false);
        setShowSuccess(true);
        
        // Fermeture après 2 secondes
        setTimeout(() => {
            setShowSuccess(false);
            setFormData({
                nom:'', prenom:'', telephone:'', email:'',
                type:'GP', ville_depart:'', ville_destination:'',
                date:'', poids:'', description:''
            });
            onSuccess(); // Notifie le parent
            if (onClose) onClose();
        }, 2000);

    } catch (error) {
        console.error(error);
        setLoading(false);
        alert("Une erreur est survenue. Vérifiez votre connexion.");
    }
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-slide-in">

        {/* Message de succès en overlay */}
        {showSuccess && (
            <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur flex flex-col items-center justify-center text-center p-8 animate-in fade-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Annonce envoyée !</h3>
                <p className="text-gray-500">Notre équipe va examiner votre proposition dans les plus brefs délais.</p>
            </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Soumettre votre annonce
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Remplissez ce formulaire et nous publierons l'annonce pour vous.
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6"/>
          </button>
        </div>

        {/* Contenu du formulaire */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Coordonnées */}
          <div className="p-4 bg-gray-50 rounded-xl shadow-inner space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700">
              <User className="w-5 h-5 text-orange-500"/> Vos coordonnées
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                  type="text" name="nom" value={formData.nom} onChange={handleInputChange}
                  placeholder="Nom" required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              />
              <input
                  type="text" name="prenom" value={formData.prenom} onChange={handleInputChange}
                  placeholder="Prénom"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              />
              <input
                  type="tel" name="telephone" value={formData.telephone} onChange={handleInputChange}
                  placeholder="Téléphone" required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              />
              <input
                  type="email" name="email" value={formData.email} onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Détails de l'annonce */}
          <div className="p-4 bg-gray-50 rounded-xl shadow-inner space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700">
              <Package className="w-5 h-5 text-orange-500"/> Informations du colis
            </h3>
            
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all bg-white"
            >
              <option value="GP">GP (Aérien)</option>
              <option value="Transport Terrestre">Transport Terrestre (Camion)</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text" name="ville_depart" value={formData.ville_depart} onChange={handleInputChange}
                  placeholder="Ville de départ" required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                />
                <input
                  type="text" name="ville_destination" value={formData.ville_destination} onChange={handleInputChange}
                  placeholder="Ville de destination" required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="date" name="date" value={formData.date} onChange={handleInputChange} required 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all" 
              />
              <input 
                type="text" name="poids" value={formData.poids} onChange={handleInputChange} 
                placeholder="Poids estimé (ex: 10 Kg)" 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none transition-all" 
              />
            </div>

            <textarea 
              name="description" value={formData.description} onChange={handleInputChange} 
              placeholder="Description pour l'annonce (contenu, restrictions, infos complémentaires)..." 
              rows={3} 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none resize-none transition-all"
            />
          </div>

          {/* Bouton d'envoi */}
          <div className="pt-2 pb-4">
            <button 
              onClick={handleSubmit} 
              disabled={loading} 
              className="w-full px-4 py-4 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 hover:shadow-lg active:scale-[0.98] transition-all transform disabled:bg-gray-300 disabled:text-gray-500 flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Envoi en cours...</span>
                </>
              ) : (
                'Envoyer la demande'
              )}
            </button>
            <p className="text-xs text-center text-gray-400 mt-3">
              Votre annonce sera examinée par notre équipe avant publication.
            </p>
          </div>

        </div>
      </div>

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.25s ease-out forwards;
        }
        @keyframes slideIn {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}