'use client';

import {
  X,
  Package,
  User,
  Mic,
  Square,
  Trash2,
  FileText,
  AudioWaveform
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface AnnonceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Callback pour déclencher le toast dans le parent
}

export default function AnnonceModal({ isOpen, onClose, onSuccess }: AnnonceModalProps) {
  const [loading, setLoading] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<'form' | 'voice'>('form');

  // --- ÉTATS POUR L'AUDIO ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    typeService: 'GP',
    depart: '',
    destination: '',
    dateDepart: '',
    poids: '',
    description: ''
  });

  // Gestion du scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Nettoyage de l'audio
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [audioUrl]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- FONCTIONS AUDIO ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Erreur d'accès au micro", err);
      alert("Impossible d'accéder au micro. Vérifiez vos permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (submissionMode === 'voice' && !audioBlob) {
        alert("Veuillez enregistrer un message vocal avant d'envoyer.");
        return;
    }

    setLoading(true);

    // Simulation d'envoi API
    setTimeout(() => {
      console.log('--- SOUMISSION ---');
      console.log('Mode:', submissionMode);
      
      setLoading(false);
      
      // Reset total
      setFormData({
        nom: '', prenom: '', telephone: '', email: '',
        typeService: 'GP', depart: '', destination: '',
        dateDepart: '', poids: '', description: ''
      });
      deleteRecording();
      setSubmissionMode('form');

      // Déclenche le succès dans le parent
      onSuccess();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in flex flex-col">
        
        {/* Header du Modal */}
        <div className="bg-orange-600 text-white p-6 rounded-t-2xl shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Publier une annonce</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Onglets */}
          <div className="bg-orange-800/50 p-1.5 rounded-xl flex shadow-inner">
            <button
              onClick={() => {setSubmissionMode('form'); deleteRecording();}}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                submissionMode === 'form' 
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-orange-100 hover:bg-orange-700/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              Remplir Formulaire
            </button>
            <button
              onClick={() => setSubmissionMode('voice')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                submissionMode === 'voice' 
                  ? 'bg-white text-orange-600 shadow-md'
                  : 'text-orange-100 hover:bg-orange-700/60'
              }`}
            >
              <Mic className="w-4 h-4" />
              Note Vocale
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          
          {/* Informations personnelles */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-orange-500" />
              Vos Coordonnées
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['nom', 'prenom', 'telephone', 'email'].map((field, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'telephone' ? 'tel' : 'text'}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    required
                    placeholder={field === 'telephone' ? "Pour qu'on vous rappelle" : ''}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-100 my-6"></div>

          {/* CONTENU DYNAMIQUE */}
          {submissionMode === 'form' && (
            <div className="animate-fade-in space-y-5">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Détails de l'annonce
              </h3>

              <select
                name="typeService"
                value={formData.typeService}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="GP">Par voie aérienne</option>
                <option value="LIVREUR">Par voie terrestre</option>
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['depart', 'destination'].map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field === 'depart' ? 'Ville de départ *' : 'Ville de destination *'}
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Date de départ *
                  </label>
                  <input
                    type="date"
                    name="dateDepart"
                    value={formData.dateDepart}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Poids estimé (kg)
                  </label>
                  <input
                    type="number"
                    name="poids"
                    value={formData.poids}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Détails supplémentaires..."
                />
              </div>
            </div>
          )}

          {submissionMode === 'voice' && (
            <div className="animate-fade-in text-center py-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center justify-center gap-2">
                <AudioWaveform className="w-5 h-5 text-orange-500" />
                Expliquez-nous tout de vive voix
              </h3>
              <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
                Pas envie d'écrire ? Dites-nous simplement ce que vous voulez envoyer, d'où et vers où. On s'occupe du reste.
              </p>

              <div className="flex flex-col items-center justify-center gap-6 mb-4">
                {!audioUrl ? (
                    <>
                          <button
                            type="button"
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`relative w-24 h-24 flex items-center justify-center rounded-full shadow-2xl transition-all transform hover:scale-105 ${
                              isRecording 
                                ? 'bg-red-500 ring-4 ring-red-200 animate-pulse' 
                                : 'bg-gradient-to-br from-orange-500 to-red-600 ring-4 ring-orange-100'
                            }`}
                          >
                            {isRecording ? (
                                <Square className="w-8 h-8 text-white fill-current" />
                            ) : (
                                <Mic className="w-10 h-10 text-white" />
                            )}
                          </button>
                          
                          <div>
                            <p className="text-sm font-bold text-slate-700 mb-1">
                                {isRecording ? "Enregistrement..." : "Appuyez pour parler"}
                            </p>
                            {isRecording && (
                                <p className="text-lg font-mono text-orange-600">{formatTime(recordingDuration)}</p>
                            )}
                          </div>
                    </>
                ) : (
                    <div className="w-full bg-orange-50 p-4 rounded-2xl border border-orange-100 animate-fade-in">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-600">
                                <Mic className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <audio controls src={audioUrl} className="w-full h-8" />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={deleteRecording}
                            className="text-sm text-red-500 font-medium hover:underline flex items-center justify-center gap-2 w-full py-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Supprimer et recommencer
                        </button>
                    </div>
                )}
              </div>
            </div>
          )}

          {/* Buttons Action */}
          <div className="flex gap-3 pt-8 mt-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-slate-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading || (submissionMode === 'voice' && !audioBlob) || (submissionMode === 'form' && (!formData.nom || !formData.prenom || !formData.telephone || !formData.email || !formData.depart || !formData.destination || !formData.dateDepart))}
              className={`flex-1 px-6 py-3.5 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                loading || (submissionMode === 'voice' && !audioBlob) || (submissionMode === 'form' && (!formData.nom || !formData.prenom || !formData.telephone || !formData.email || !formData.depart || !formData.destination || !formData.dateDepart))
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:scale-[1.02] hover:shadow-orange-200'
              }`}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                submissionMode === 'voice' ? 'Envoyer le vocal' : 'Envoyer ma demande'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Styles CSS pour l'animation du modal */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}