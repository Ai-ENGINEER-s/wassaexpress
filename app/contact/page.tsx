'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, FileText, Mic, ArrowRight, Square, Trash2, AudioWaveform, Undo2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  // --- ETATS GLOBAUX ---
  const [step, setStep] = useState<'choice' | 'content'>('choice');
  const [submissionMode, setSubmissionMode] = useState<'form' | 'voice'>('form');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  // --- ETATS AUDIO ---
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const timerRef = useRef<any>(null);

  // --- NETTOYAGE AUDIO ---
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [audioUrl]);

  // --- LOGIQUE AUDIO ---
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = e => { 
        if(e.data.size > 0) chunks.push(e.data); 
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => setRecordingDuration((prev: number) => prev + 1), 1000);
    } catch {
      alert("Impossible d'accéder au micro. Vérifiez vos permissions.");
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

  // --- NAVIGATION ---
  const handleModeSelect = (mode: 'form' | 'voice') => {
    setSubmissionMode(mode);
    setStep('content');
  };

  const handleBackToChoice = () => {
    setStep('choice');
    deleteRecording();
    setFormData({ ...formData, message: '' });
  };

  // --- GESTION FORMULAIRE ---
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
        alert("Veuillez remplir votre nom et email.");
        return;
    }
    if (submissionMode === 'voice' && !audioBlob) {
        alert("Veuillez enregistrer un message vocal.");
        return;
    }
    if (submissionMode === 'form' && !formData.message) {
        alert("Veuillez écrire un message.");
        return;
    }

    setLoading(true);
    
    setTimeout(() => {
      console.log('Envoi effectué', { mode: submissionMode, data: formData, audio: audioBlob });
      setLoading(false);
      setSubmitted(true);
      setStep('choice');
      setFormData({ name: '', email: '', phone: '', message: '' });
      deleteRecording();
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 border-b border-gray-100 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/contactlandingsection.jpg')",
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-900/40" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une question sur nos services ? Choisissez comment nous contacter.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Contact Info (Gauche) */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Informations</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Adresse</p>
                    <p className="text-slate-600 text-sm">Boulevard Mohammed V</p>
                    <p className="text-slate-600 text-sm">Casablanca, Maroc</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Téléphone</p>
                    <p className="text-slate-600 text-sm">+212 663-833056</p>
                    <p className="text-slate-500 text-xs mt-1">Lun - Sam: 9h - 18h</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 mb-1">Email</p>
                    <p className="text-slate-600 text-sm">contact@wassaexpress.ma</p>
                    <p className="text-slate-500 text-xs mt-1">Réponse sous 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106276.6066733!2d-7.689155!3d33.5731104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sen!2sma!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Zone Dynamique (Droite) */}
          <div className="lg:col-span-2">
            {/* Ajout de h-full et justify-center pour centrer verticalement si le contenu est court */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 h-full flex flex-col justify-center shadow-sm">
              
              {submitted ? (
                <div className="p-8 text-center bg-green-50 border border-green-200 rounded-xl animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message envoyé !</h3>
                  <p className="text-green-700">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <>
                   {/* En-tête dynamique */}
                   <div className="mb-2">
                      {step === 'content' && (
                          <button 
                              onClick={handleBackToChoice}
                              className="mb-4 text-sm text-slate-500 hover:text-orange-600 flex items-center gap-1 font-medium transition-colors"
                          >
                              <Undo2 className="w-4 h-4" /> Retour au choix
                          </button>
                      )}
                   </div>

                   {/* --- ETAPE 1 : LE CHOIX (Design resserré) --- */}
                   {step === 'choice' && (
                      <div className="space-y-6 animate-fade-in">
                         <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900">
                               Comment souhaitez-vous nous contacter ?
                            </h2>
                            <p className="text-slate-600">
                               Sélectionnez l'option qui vous convient le mieux :
                            </p>
                         </div>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                           {/* Option Formulaire */}
                           <button
                             onClick={() => handleModeSelect('form')}
                             className="group p-5 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1"
                           >
                             <div className="flex flex-col h-full justify-between space-y-4">
                               <div>
                                 <div className="flex items-center gap-3 mb-3">
                                   <div className="p-2.5 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                     <FileText className="w-6 h-6 text-orange-600"/>
                                   </div>
                                   <h3 className="text-lg font-bold text-slate-800">Par Écrit</h3>
                                 </div>
                                 <p className="text-sm text-slate-500 leading-relaxed">
                                   Remplissez notre formulaire détaillé classique.
                                 </p>
                               </div>
                               <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:translate-x-1 transition-transform pt-2">
                                 Continuer <ArrowRight className="w-4 h-4"/>
                               </div>
                             </div>
                           </button>

                           {/* Option Note vocale */}
                           <button
                             onClick={() => handleModeSelect('voice')}
                             className="group p-5 rounded-xl border-2 border-gray-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-300 text-left hover:shadow-lg transform hover:-translate-y-1"
                           >
                             <div className="flex flex-col h-full justify-between space-y-4">
                               <div>
                                 <div className="flex items-center gap-3 mb-3">
                                   <div className="p-2.5 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                     <Mic className="w-6 h-6 text-orange-600"/>
                                   </div>
                                   <h3 className="text-lg font-bold text-slate-800">Note Vocale</h3>
                                 </div>
                                 <p className="text-sm text-slate-500 leading-relaxed">
                                   Enregistrez simplement votre message à la voix.
                                 </p>
                               </div>
                               <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:translate-x-1 transition-transform pt-2">
                                 Continuer <ArrowRight className="w-4 h-4"/>
                               </div>
                             </div>
                           </button>
                         </div>
                      </div>
                   )}

                   {/* --- ETAPE 2 : LE CONTENU --- */}
                   {step === 'content' && (
                     <div className="space-y-6 animate-fade-in">
                       <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-orange-900 bg-clip-text text-transparent">
                          {submissionMode === 'voice' ? 'Laissez un message vocal' : 'Écrivez votre message'}
                       </h2>

                       {/* Champs communs */}
                       <div className="space-y-4">
                           <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1.5">Nom complet *</label>
                             <input
                               type="text"
                               name="name"
                               value={formData.name}
                               onChange={handleChange}
                               className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                               placeholder="Votre nom"
                               required
                             />
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                               <input
                                 type="email"
                                 name="email"
                                 value={formData.email}
                                 onChange={handleChange}
                                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                 placeholder="votre@email.com"
                                 required
                               />
                             </div>
                             <div>
                               <label className="block text-sm font-medium text-slate-700 mb-1.5">Téléphone</label>
                               <input
                                 type="tel"
                                 name="phone"
                                 value={formData.phone}
                                 onChange={handleChange}
                                 className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                 placeholder="06..."
                               />
                             </div>
                           </div>
                       </div>

                       {/* CONTENU SPECIFIQUE */}
                       {submissionMode === 'form' ? (
                         <div className="animate-fade-in">
                           <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                           <textarea
                             name="message"
                             value={formData.message}
                             onChange={handleChange}
                             rows={5}
                             className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                             placeholder="Comment pouvons-nous vous aider ?"
                             required
                           ></textarea>
                         </div>
                       ) : (
                         <div className="animate-fade-in p-6 bg-orange-50/50 rounded-xl border border-dashed border-orange-200 text-center space-y-4">
                             <div className="flex justify-center">
                                  <AudioWaveform className={`w-8 h-8 ${isRecording ? 'text-red-500 animate-pulse' : 'text-orange-400'}`}/>
                             </div>

                             {!audioUrl ? (
                               <div className="flex flex-col items-center gap-3">
                                  <button 
                                     onClick={isRecording ? stopRecording : startRecording} 
                                     className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all transform hover:scale-105 ${
                                       isRecording ? 'bg-red-500 ring-4 ring-red-100' : 'bg-orange-500 hover:bg-orange-600 ring-4 ring-orange-100'
                                     }`}
                                  >
                                    {isRecording ? <Square className="w-6 h-6"/> : <Mic className="w-7 h-7"/>}
                                  </button>
                                  <p className="text-sm text-slate-600 font-medium">
                                     {isRecording ? 'Enregistrement...' : 'Appuyez pour parler'}
                                  </p>
                               </div>
                             ) : (
                               <div className="w-full max-w-md mx-auto space-y-3">
                                 <audio controls src={audioUrl} className="w-full h-8"/>
                                 <button 
                                     onClick={deleteRecording} 
                                     className="text-red-500 text-xs font-bold uppercase tracking-wide flex items-center justify-center gap-2 w-full hover:bg-red-50 py-2 rounded transition"
                                 > 
                                     <Trash2 className="w-3 h-3"/> Recommencer
                                 </button>
                               </div>
                             )}
                             
                             {isRecording && (
                                 <p className="font-mono text-xl text-slate-800 font-bold">{formatTime(recordingDuration)}</p>
                             )}
                         </div>
                       )}

                       {/* BOUTON ENVOYER */}
                       <button
                         onClick={handleSubmit}
                         disabled={loading}
                         className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                       >
                         {loading ? (
                             <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                         ) : (
                             <>
                                 <span>{submissionMode === 'voice' ? 'Envoyer le vocal' : 'Envoyer le message'}</span>
                                 <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                             </>
                         )}
                       </button>

                     </div>
                   )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}