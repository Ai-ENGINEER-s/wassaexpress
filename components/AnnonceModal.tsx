'use client';

import { X, Package, User, Mic, Square, Trash2, FileText, AudioWaveform, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface AnnonceModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess: () => void;
}

export default function AnnonceModal({ isOpen, onClose, onSuccess }: AnnonceModalProps) {
  const [loading, setLoading] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<'form' | 'voice'>('form');
  const [step, setStep] = useState<'choice' | 'form'>('choice');

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    nom: '', prenom: '', telephone: '', email: '',
    typeService: 'GP', depart: '', destination: '',
    dateDepart: '', poids: '', description: ''
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      mediaRecorderRef.current.ondataavailable = e => { if(e.data.size > 0) chunks.push(e.data); };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => setRecordingDuration(prev => prev + 1), 1000);
    } catch {
      alert("Impossible d'accéder au micro.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingDuration(0);
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;

  const handleModeSelect = (mode: 'form' | 'voice') => {
    setSubmissionMode(mode);
    setStep('form');
  };

  const handleBackToChoice = () => {
    setStep('choice');
    deleteRecording();
    setFormData({nom:'',prenom:'',telephone:'',email:'',typeService:'GP',depart:'',destination:'',dateDepart:'',poids:'',description:''});
  };

  const handleSubmit = () => {
    if(submissionMode === 'voice' && !audioBlob) return alert("Enregistrez un message vocal");
    setLoading(true);
    setTimeout(() => {
      console.log('Soumission', submissionMode, formData);
      setLoading(false);
      setFormData({nom:'',prenom:'',telephone:'',email:'',typeService:'GP',depart:'',destination:'',dateDepart:'',poids:'',description:''});
      deleteRecording();
      setSubmissionMode('form');
      setStep('choice');
      onSuccess();
    }, 1500);
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col animate-slide-in">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">Publier une annonce</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6"/>
          </button>
        </div>

        {/* Écran de choix */}
        {step === 'choice' ? (
          <div className="p-8 space-y-6 flex flex-col justify-center">
            <p className="text-center text-gray-600 font-medium text-lg">Choisissez comment publier votre annonce</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option Formulaire */}
              <button
                onClick={() => handleModeSelect('form')}
                className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 text-left space-y-4 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition">
                    <FileText className="w-6 h-6 text-orange-600"/>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Formulaire</h3>
                </div>
                <p className="text-sm text-gray-600">Remplissez un formulaire détaillé avec tous les champs nécessaires</p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                  Continuer <ArrowRight className="w-4 h-4"/>
                </div>
              </button>

              {/* Option Note vocale */}
              <button
                onClick={() => handleModeSelect('voice')}
                className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 text-left space-y-4 hover:shadow-lg transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition">
                    <Mic className="w-6 h-6 text-orange-600"/>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Note vocale</h3>
                </div>
                <p className="text-sm text-gray-600">Enregistrez rapidement votre message par la voix</p>
                <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                  Continuer <ArrowRight className="w-4 h-4"/>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Formulaire ou enregistrement audio */
          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            {/* Coordonnées */}
            <div className="p-4 bg-gray-50 rounded-xl shadow-inner space-y-4">
              <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                <User className="w-5 h-5 text-orange-500"/> Vos coordonnées
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['nom','prenom','telephone','email'].map((f,i) => (
                  <input
                    key={i}
                    type={f==='email'?'email':f==='telephone'?'tel':'text'}
                    name={f}
                    value={(formData as any)[f]}
                    onChange={handleInputChange}
                    placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Formulaire ou audio */}
            {submissionMode === 'form' ? (
              <div className="p-4 bg-gray-50 rounded-xl shadow-inner space-y-4">
                <h3 className="flex items-center gap-2 font-semibold text-gray-700">
                  <Package className="w-5 h-5 text-orange-500"/> Détails
                </h3>
                <select
                  name="typeService"
                  value={formData.typeService}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                >
                  <option value="GP">Aérien</option>
                  <option value="LIVREUR">Terrestre</option>
                </select>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['depart','destination'].map((f,i)=>(
                    <input
                      key={i}
                      type="text"
                      name={f}
                      value={(formData as any)[f]}
                      onChange={handleInputChange}
                      placeholder={f==='depart'?'Ville de départ':'Ville de destination'}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="date" name="dateDepart" value={formData.dateDepart} onChange={handleInputChange} required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none" />
                  <input type="number" name="poids" value={formData.poids} onChange={handleInputChange} placeholder="Poids (kg)" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none" />
                </div>
                <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description..." rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none resize-none"/>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 rounded-xl shadow-inner text-center space-y-4">
                <AudioWaveform className="w-6 h-6 mx-auto text-orange-500"/>
                <p className="text-gray-600 font-medium">Enregistrez votre message vocal</p>
                {!audioUrl ? (
                  <button onClick={isRecording?stopRecording:startRecording} className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition transform hover:scale-105 mx-auto ${
                    isRecording ? 'bg-red-500 animate-pulse' : 'bg-orange-500 hover:bg-orange-600'
                  }`}>
                    {isRecording ? <Square className="w-8 h-8"/> : <Mic className="w-10 h-10"/>}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <audio controls src={audioUrl} className="w-full"/>
                    <button onClick={deleteRecording} className="text-red-500 font-semibold flex items-center justify-center gap-2 w-full"> <Trash2 className="w-4 h-4"/> Supprimer</button>
                  </div>
                )}
                {isRecording && <p className="font-mono text-orange-500 text-lg">{formatTime(recordingDuration)}</p>}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-6 pb-4">
              <button onClick={handleBackToChoice} className="flex-1 px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold">Retour</button>
              <button onClick={handleSubmit} disabled={loading} className="flex-1 px-4 py-3 rounded-xl bg-orange-600 text-white font-bold hover:scale-[1.02] transition transform shadow-md disabled:bg-gray-300 disabled:text-gray-500">
                {loading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></span> : (submissionMode==='voice'?'Envoyer vocal':'Envoyer demande')}
              </button>
            </div>

          </div>
        )}
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