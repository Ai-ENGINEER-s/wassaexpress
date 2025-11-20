'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Mail, 
  CheckCircle, 
  ArrowRight,
  User,
  Package
} from 'lucide-react';
import Flag from 'react-world-flags';

const annonces = [
  {
    id: 1,
    type: 'gp',
    title: "Dakar/Paris le 11 Novembre 2025",
    badge: "GP",
    badgeColor: "bg-blue-100 text-blue-800",
    location: "Dakar/Mbour",
    destination: "Paris",
    date: "novembre 11, 2025",
    price: "10€/Kg",
    departureCountryCode: 'SN',
    arrivalCountryCode: 'FR',
  },
  {
    id: 2,
    type: 'gp',
    title: "3M BUSINESS GP SENEGAL-CANADA",
    badge: "GP",
    badgeColor: "bg-blue-100 text-blue-800",
    location: "Dakar",
    destination: "Montréal",
    date: "novembre 10, 2025",
    price: "15$/Kg",
    departureCountryCode: 'SN',
    arrivalCountryCode: 'CA',
  },
  {
    id: 3,
    type: 'livreur',
    title: "Livreur professionnel",
    badge: "LIVREUR",
    badgeColor: "bg-green-100 text-green-800",
    location: "Casablanca",
    destination: "-",
    date: "Disponible",
    price: "Sur devis",
    departureCountryCode: 'MA',
    arrivalCountryCode: null,
  }
];

const AnnonceVisual = ({ annonce }: { annonce: (typeof annonces)[0] }) => {
  
  // CAS 1: Annonce GP avec les deux codes pays
  if (annonce.type === 'gp' && annonce.departureCountryCode && annonce.arrivalCountryCode) {
    return (
      <div className="flex items-center justify-center space-x-3 w-full h-full">
        {/* Drapeaux plus petits avec effet d'ombre subtile */}
        <div className="relative">
          <Flag 
            code={annonce.departureCountryCode} 
            className="w-16 h-12 rounded-md shadow-sm object-cover"
            style={{ width: '64px', height: '48px' }}
          />
        </div>
        
        {/* Flèche plus élégante */}
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
        
        <div className="relative">
          <Flag 
            code={annonce.arrivalCountryCode} 
            className="w-16 h-12 rounded-md shadow-sm object-cover"
            style={{ width: '64px', height: '48px' }}
          />
        </div>
      </div>
    );
  }

  // CAS 2: Annonce Livreur avec un code pays
  if (annonce.type === 'livreur' && annonce.departureCountryCode) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
        {/* Icône de livreur en arrière-plan */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-24 h-24 text-gray-200" />
          </div>
          
          {/* Drapeau plus petit superposé */}
          <div className="relative z-10 mt-8">
            <Flag 
              code={annonce.departureCountryCode} 
              className="w-20 h-14 rounded-lg shadow-md object-cover mx-auto"
              style={{ width: '80px', height: '56px' }}
            />
          </div>
        </div>
        
        <span className="font-semibold text-gray-600 text-sm uppercase tracking-wide">
          Livreur local
        </span>
      </div>
    );
  }

  // CAS 3: Fallback
  if (annonce.type === 'livreur') {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <User className="w-16 h-16 text-gray-300" />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Package className="w-16 h-16 text-gray-300" />
    </div>
  );
};

const TopAnnonces = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* En-tête de la section */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#104C9E]">
              Top Annonces
            </h2>
            <p className="text-gray-600 text-lg">
              Les meilleures offres du moment
            </p>
          </div>
          <Link 
            href="/annonces" 
            className="text-orange-500 font-semibold flex items-center space-x-1 hover:text-orange-600 transition-colors"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grille des annonces */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {annonces.map((annonce) => (
            
            <Link 
              href={`/annonces/${annonce.id}`}
              key={annonce.id}
              className="group"
            >
              <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
              >
                
                {/* Section visuelle avec gradient subtil */}
                <div className="relative w-full h-52 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  
                  <AnnonceVisual annonce={annonce} />
                  
                  {/* Badges */}
                  <span 
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${annonce.badgeColor} shadow-sm`}
                  >
                    {annonce.badge}
                  </span>
                  <CheckCircle className="absolute top-3 right-3 w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
                </div>

                {/* Corps de la carte */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2" title={annonce.title}>
                    {annonce.title}
                  </h3>
                  
                  <div className="space-y-3 text-sm text-gray-700 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                      <span>{annonce.location}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2 w-24 flex-shrink-0">Destination :</span>
                      <span className="font-semibold text-gray-900">{annonce.destination}</span>
                    </div>

                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                      {annonce.date === 'Disponible' ? (
                        <span className="text-green-600 font-semibold">{annonce.date}</span>
                      ) : (
                        <span>{annonce.date}</span>
                      )}
                    </div>
                  </div>

                  {/* Pied de la carte */}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                    <span className="text-2xl font-extrabold text-orange-500">
                      {annonce.price}
                    </span>
                    <div className="flex space-x-3">
                      <button 
                        className="p-2 rounded-full hover:bg-red-50 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors" />
                      </button>
                      <button 
                        className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Mail className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </Link> 

          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAnnonces;






















// hero section 


'use client';

import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const heroImages = [
  { url: '/images/envoie-colis/3.png' },
  { url: '/images/envoie-colis/1.png' },
  { url: '/images/envoie-colis/2.png' },
];

export default function HeroSectionSearch() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChoice, setShowChoice] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleChoice = (choice: 'publish' | 'search') => {
    setShowChoice(false);
    if (choice === 'publish') {
      // Déclencher l'ouverture du modal d'annonce
      window.dispatchEvent(new CustomEvent('openAnnonceModal'));
    } else {
      // Scroller vers les services
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] max-h-[750px] overflow-hidden">
      
      {/* Background Slider */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-out"
            style={{
              backgroundImage: `url(${image.url})`,
              transform: index === currentSlide ? 'scale(1.08)' : 'scale(1)',
              filter: 'brightness(0.6) contrast(1.1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10" />
        </div>
      ))}

      {/* Contenu principal */}
      <div className="relative h-full flex flex-col justify-center items-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-20">
        
        {showChoice ? (
          /* Écran de choix */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 w-full"
          >
            {/* Titre principal */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight text-white">
                Bienvenue sur
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  notre plateforme
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 max-w-2xl font-light mx-auto">
                Que souhaitez-vous faire aujourd'hui ?
              </p>
            </motion.div>

            {/* Options de choix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12"
            >
              {/* Bouton Publier une annonce */}
              <button
                onClick={() => handleChoice('publish')}
                className="group relative overflow-hidden p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-orange-400/60 transition-all duration-300 text-left space-y-4 hover:shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="p-4 bg-orange-500/20 w-fit rounded-xl group-hover:bg-orange-500/30 transition">
                    <Plus className="w-8 h-8 text-orange-400"/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Publier une annonce</h3>
                    <p className="text-gray-300 text-sm">Créez une annonce en quelques clics ou par message vocal</p>
                  </div>
                  <div className="flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-3 transition-all">
                    Commencer <ArrowRight className="w-5 h-5"/>
                  </div>
                </div>
              </button>

              {/* Bouton Chercher des services */}
              <button
                onClick={() => handleChoice('search')}
                className="group relative overflow-hidden p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400/60 transition-all duration-300 text-left space-y-4 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-4">
                  <div className="p-4 bg-blue-500/20 w-fit rounded-xl group-hover:bg-blue-500/30 transition">
                    <Search className="w-8 h-8 text-blue-400"/>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Chercher des services</h3>
                    <p className="text-gray-300 text-sm">Trouvez transporteurs et services adaptés à vos besoins</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                    Explorer <ArrowRight className="w-5 h-5"/>
                  </div>
                </div>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* Contenu par défaut */
          <>
            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 leading-tight text-white"
            >
              Trouvez tout ce dont
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                vous avez besoin
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light"
            >
              Recherchez des services, des transporteurs et des solutions 
              <span className="font-semibold text-white"> sur une seule plateforme</span>
            </motion.p>

            {/* Bouton CTA */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              href="#services"
              className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-orange-600 hover:scale-105 transition-all"
            >
              Explorer Nos Services
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </>
        )}
      </div>

      {/* Indicateurs de Slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? 'bg-orange-500 w-8 shadow-lg shadow-orange-500/50'
                : 'bg-white/40 w-2 hover:bg-white/60 hover:w-4'
            }`}
          />
        ))}
      </div>
    </section>
  );
}





/// contact new design : 


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

















// contact old design 


'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section - Avec Image de Fond */}
      <div className="relative bg-slate-900 border-b border-gray-100 overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/contactlandingsection.jpg')",
            filter: 'brightness(0.4)'
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-slate-900/40" />
        
        {/* Contenu */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Une question sur nos services ? Nous sommes là pour vous aider.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info - Épuré */}
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
                    <p className="text-slate-600 text-sm">+212 663-833056²</p>
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

          {/* Contact Form - Simplifié */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
                 <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-red-900 to-orange-900 bg-clip-text text-transparent">
            Envoyez un message
          </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-green-700 text-sm font-medium">Message envoyé avec succès</span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <span>Envoyer</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}