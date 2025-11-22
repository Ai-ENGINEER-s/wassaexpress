'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Check,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  X,
  Mail,
  Phone,
  Send,
  Star,
  Plane,
  Calendar,
  Weight,
  MessageCircle,
  Truck, // Import du camion
  ChevronRight,
  User,
  Wallet
} from 'lucide-react';
import Flag from 'react-world-flags';
import Image from 'next/image';
import Link from 'next/link';

// URL DE VOTRE API LOCALE
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json';

const AnnonceDetail = ({ slug }: { slug: string }) => {
  // --- STATES ---
  const [annonce, setAnnonce] = useState<any>(null);
  const [livreurs, setLivreurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UX States
  const [isFavorite, setIsFavorite] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    whatsapp: '',
    descriptionColis: '',
    avecLivreur: false,
    livreurId: '',
    message: '',
  });

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodeHtml = (html: string) => {
          const txt = document.createElement("textarea");
          txt.innerHTML = html;
          return txt.value;
        };

        // 1. Annonce
        const resAnnonce = await fetch(`${WP_API_URL}/wp/v2/annonce?slug=${slug}&_embed`);
        const dataAnnonce = await resAnnonce.json();

        if (dataAnnonce.length === 0) {
          setLoading(false);
          return;
        }

        const item = dataAnnonce[0];
        const acf = item.acf || {};

        // DÉTECTION DU TYPE DE TRANSPORT
        const typeString = acf.type ? acf.type.toString() : 'GP';
        const typeLower = typeString.toLowerCase();
        const isTerrestre = typeLower.includes('terrestre') || typeLower.includes('camion');

        const formattedAnnonce = {
          id: item.id,
          slug: item.slug,
          title: decodeHtml(item.title.rendered),
          location: acf.location,
          destination: acf.destination,
          date: acf.date,
          departureTime: acf.departuretime,
          price: acf.price,
          type: typeString,
          isTerrestre: isTerrestre, // On stocke l'info ici
          verified: acf.verified === true,
          departureCountryCode: acf.departurecountrycode,
          arrivalCountryCode: acf.arrivalcountrycode,
          description: decodeHtml(item.content.rendered.replace(/<[^>]+>/g, '')),
          deliveryTime: acf.deliverytime,
          availableWeight: acf.availableweight,
          conditions: acf.conditions ? acf.conditions.split('\n').filter((c: string) => c.trim() !== '') : [],
          publishedBy: acf.contact_platformname || 'Wassa Express',
          contact: {
            platformName: acf.contact_platformname || 'Wassa Express',
            phone: acf.contact_phone,
            whatsapp: acf.contact_whatsapp,
            email: acf.contact_email,
          },
          traveler: {
            name: acf.traveler_name,
            phone: acf.traveler_phone,
            verified: acf.traveler_verified === true,
          },
          stats: {
            completedDeliveries: acf.stats_completeddeliveries,
            rating: acf.stats_rating,
            responseTime: acf.stats_responsetime,
          },
        };
        setAnnonce(formattedAnnonce);

        // 2. Livreurs
        const resLivreurs = await fetch(`${WP_API_URL}/wp/v2/livreur?_embed&per_page=100`);
        const dataLivreurs = await resLivreurs.json();

        const allLivreurs = dataLivreurs.map((l: any) => ({
          id: l.id,
          name: decodeHtml(l.title.rendered),
          profileImage: l._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/150',
          destination: l.acf.destination,
          rating: l.acf.rating,
          transportFee: l.acf.transportfee,
          verified: l.acf.verified === true,
          available: l.acf.available === true,
          arrivalCountryCode: l.acf.arrivalcountrycode,
          description: l.content.rendered.replace(/<[^>]+>/g, ''),
        }));

        const filteredLivreurs = allLivreurs.filter((livreur: any) => {
          if (!formattedAnnonce.arrivalCountryCode) return true;
          if (!livreur.arrivalCountryCode) return false;
          return livreur.arrivalCountryCode.toLowerCase().trim() === formattedAnnonce.arrivalCountryCode.toLowerCase().trim();
        });
        setLivreurs(filteredLivreurs);

      } catch (error) {
        console.error('Erreur chargement:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  // --- HANDLERS ---
  const handleShare = () => {
    if (!annonce) return;
    if (navigator.share) {
      navigator.share({
        title: annonce.title,
        text: `Annonce sur ${annonce.contact.platformName}: ${annonce.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié !');
    }
  };

  const handleWhatsAppContact = () => {
    if (!annonce) return;
    const message = encodeURIComponent(`Bonjour, je suis intéressé(e) par l'annonce: ${annonce.title}.`);
    window.open(`https://wa.me/${annonce.contact.whatsapp}?text=${message}`, '_blank');
  };

  const handlePhoneContact = () => annonce && window.open(`tel:${annonce.contact.phone}`);

  // --- GESTION DU FORMULAIRE ---
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const getSelectedLivreurPrice = () => {
      if (!formData.avecLivreur || !formData.livreurId) return null;
      const l = livreurs.find(liv => liv.id.toString() === formData.livreurId);
      return l ? l.transportFee : null;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      annonce_id: annonce.id,
      ...formData,
      livreur_choisi: formData.avecLivreur ? formData.livreurId : null,
      cout_livraison_estime: getSelectedLivreurPrice()
    };

    try {
      const res = await fetch(`${WP_API_URL}/wassa/v1/demande`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setShowForm(false);
          setFormSubmitted(false);
          setFormData({ ...formData, nom: '', prenom: '', descriptionColis: '', message: '' });
        }, 3000);
      } else {
        alert("Erreur lors de l'envoi.");
      }
    } catch (error) {
      console.error('Erreur technique:', error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#104C9E]">Chargement...</div>;
  if (!annonce) return <div className="min-h-screen flex items-center justify-center">Annonce introuvable</div>;

  const selectedLivreurFee = getSelectedLivreurPrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => window.history.back()} className="flex items-center space-x-2 text-gray-600 hover:text-[#104C9E] transition font-medium">
            <ArrowLeft className="w-5 h-5" /> <span>Retour</span>
          </button>
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsFavorite(!isFavorite)} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
            <button onClick={handleShare} className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Share2 className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Badge */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-4 flex items-start space-x-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Annonce vérifiée par {annonce.publishedBy}</p>
                <p className="text-sm text-gray-600 mt-1">Voyageur sélectionné et validé par notre équipe</p>
              </div>
            </div>

            {/* CARTE PRINCIPALE TRAJET */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header Bleu */}
              <div className="bg-gradient-to-br from-[#104C9E] to-[#0d3d7f] px-8 py-12 text-white relative">
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${annonce.type.toLowerCase().includes('gp') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {annonce.type}
                  </span>
                  {annonce.verified && <div className="bg-white/20 p-2 rounded-full"><Check className="w-5 h-5 text-white" /></div>}
                </div>

                <div className="flex items-center justify-between gap-4 relative z-10">
                  <div className="text-right flex-1">
                    <p className="text-blue-100 text-sm mb-2">Départ</p>
                    <p className="text-2xl font-bold">{annonce.location}</p>
                  </div>

                  {/* PARTIE CENTRALE DYNAMIQUE (AVION ou CAMION) */}
                  <div className="relative flex flex-col items-center justify-center mx-4 flex-shrink-0">
                     <div className="flex items-center space-x-3">
                        {/* Drapeau Départ */}
                        <div className="w-10 h-8 rounded overflow-hidden shadow-lg ring-2 ring-white/20">
                            <Flag code={annonce.departureCountryCode} className="w-full h-full object-cover" />
                        </div>

                        {/* Ligne + Icone */}
                        <div className="flex flex-col items-center justify-center w-24 relative">
                            {/* Ligne pointillée */}
                            <div className="w-full h-px border-t-2 border-dashed border-white/40 absolute"></div>
                            
                            {/* Icone Centrale */}
                            <div className="bg-[#104C9E] p-2 rounded-full relative z-10 shadow-lg border border-white/20">
                                {annonce.isTerrestre ? (
                                    <Truck className="w-6 h-6 text-white" />
                                ) : (
                                    <Plane 
                                        className="w-6 h-6 text-white" 
                                        style={{ transform: 'rotate(45deg)' }} 
                                    />
                                )}
                            </div>
                        </div>

                        {/* Drapeau Arrivée */}
                        <div className="w-10 h-8 rounded overflow-hidden shadow-lg ring-2 ring-white/20">
                            <Flag code={annonce.arrivalCountryCode} className="w-full h-full object-cover" />
                        </div>
                     </div>
                     
                     <div className="mt-2">
                        <span className="text-xs bg-blue-900/50 px-2 py-1 rounded text-blue-100 border border-white/10">
                            {annonce.deliveryTime}
                        </span>
                     </div>
                  </div>

                  <div className="text-left flex-1">
                    <p className="text-blue-100 text-sm mb-2">Destination</p>
                    <p className="text-2xl font-bold">{annonce.destination}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{annonce.title}</h1>

                {/* GRILLE INFOS */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <Clock className="w-5 h-5 text-[#104C9E] mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Date de départ</p>
                      <p className="text-lg font-bold text-gray-900">{annonce.date}</p>
                      <p className="text-sm text-gray-600">{annonce.departureTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <Package className="w-5 h-5 text-[#104C9E] mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Poids disponible</p>
                      <p className="text-lg font-bold text-gray-900">{annonce.availableWeight}</p>
                      <p className="text-sm text-gray-600">maximum</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Délai livraison</p>
                      <p className="text-lg font-bold text-gray-900">{annonce.deliveryTime}</p>
                      <p className="text-sm text-gray-600">estimation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Arrivée</p>
                      <p className="text-lg font-bold text-gray-900">{annonce.destination}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{annonce.description}</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                   <h2 className="text-lg font-semibold text-gray-900 mb-4">À propos du voyageur</h2>
                   <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-[#104C9E] flex items-center justify-center text-white font-bold text-2xl shadow-md">
                         {annonce.traveler.name?.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-gray-900 text-lg">{annonce.traveler.name}</p>
                         <div className="flex items-center space-x-2 mt-1">
                            <span className="text-orange-500 font-bold flex items-center"><Star className="w-4 h-4 fill-current mr-1"/> {annonce.stats.rating}</span>
                            <span className="text-gray-500 text-sm">• {annonce.stats.completedDeliveries} livraisons</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* LIVREURS DISPONIBLES */}
            <div>
               <h2 className="text-2xl font-bold text-[#104C9E] mb-2">Livreurs disponibles à l'arrivée</h2>
               <p className="text-gray-600 text-lg mb-6">Option disponible lors de votre demande.</p>
               
               {livreurs.length > 0 ? (
                 <div className="grid md:grid-cols-2 gap-6">
                   {livreurs.map((livreur) => (
                     <Link key={livreur.id} href={`/livreurs/${livreur.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition p-4 flex items-center space-x-4">
                        <Image src={livreur.profileImage} width={60} height={60} alt={livreur.name} className="rounded-full object-cover border border-gray-100" unoptimized />
                        <div className="flex-1">
                           <h3 className="font-bold text-gray-900">{livreur.name}</h3>
                           <p className="text-orange-600 font-bold text-sm">+ {livreur.transportFee}</p>
                           <div className="flex items-center text-xs text-gray-500 mt-1">
                              <MapPin className="w-3 h-3 mr-1"/> {livreur.destination}
                           </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                     </Link>
                   ))}
                 </div>
               ) : (
                 <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-500">
                    Aucun livreur listé pour cette destination pour le moment.
                 </div>
               )}
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24 space-y-6">
               <div className="text-center pb-6 border-b border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Tarif</p>
                  <p className="text-4xl font-extrabold text-orange-500">{annonce.price}</p>
                  <p className="text-gray-400 text-sm mt-1">par Kilo</p>
               </div>

               <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
                  💬 <strong>Comment ça marche ?</strong><br/>
                  Cliquez sur "Je suis intéressé", remplissez vos infos et nous vous recontacterons pour la pesée et le paiement.
               </div>

               <button onClick={() => setShowForm(true)} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg transform hover:-translate-y-0.5">
                 <Send className="w-5 h-5" />
                 <span>Je suis intéressé(e)</span>
               </button>

               <div className="space-y-3">
                 <button onClick={handleWhatsAppContact} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm">
                    <MessageCircle className="w-5 h-5" /> <span>WhatsApp</span>
                 </button>
                 <button onClick={handlePhoneContact} className="w-full bg-[#104C9E] hover:bg-[#0d3d7f] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm">
                    <Phone className="w-5 h-5" /> <span>Appeler</span>
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>

{/* MODAL FORMULAIRE */}
{showForm && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-orange-100 animate-in fade-in zoom-in duration-200">

      {/* HEADER */}
      <div className="sticky top-0 bg-white border-b border-orange-200 p-6 rounded-t-3xl flex items-center justify-between z-10">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-orange-500" />
            Mise en relation
          </h3>
          <p className="text-orange-500 text-sm font-medium mt-1">{annonce.title}</p>
        </div>

        <button
          onClick={() => setShowForm(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="p-6">
        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit} className="space-y-6">

            {/* MESSAGE INFO */}
            <div className="bg-orange-50 p-4 rounded-xl text-sm text-orange-700 border border-orange-100 shadow-sm">
              Remplissez vos informations. Nous vous contacterons pour la pesée et le paiement.
            </div>

            {/* INPUTS */}
            <div className="space-y-5">

              <div className="grid grid-cols-2 gap-4">
                {/* NOM */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nom *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleFormChange}
                      required
                      placeholder="Votre nom"
                      className="w-full pl-10 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white outline-none transition"
                    />
                  </div>
                </div>

                {/* PRENOM */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Prénom *</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleFormChange}
                    required
                    placeholder="Votre prénom"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white outline-none transition"
                  />
                </div>
              </div>

              {/* TELEPHONE */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Téléphone / WhatsApp *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleFormChange}
                    required
                    placeholder="+212 6..."
                    className="w-full pl-10 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-orange-500 focus:bg-white outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* LIVRAISON FINALE */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-orange-600" />
                  Livraison finale ?
                </span>

                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="avecLivreur"
                    checked={formData.avecLivreur}
                    onChange={handleFormChange}
                    className="mr-2 h-5 w-5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700 font-medium">Oui, ajouter un livreur</span>
                </label>
              </div>

              {formData.avecLivreur && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <select
                    name="livreurId"
                    value={formData.livreurId}
                    onChange={handleFormChange}
                    required
                    className="w-full p-3 bg-white rounded-xl border border-orange-200 outline-none focus:border-orange-500 text-sm"
                  >
                    <option value="">-- Sélectionner un livreur --</option>
                    {livreurs.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name} (Frais: {l.transportFee})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* TARIFS */}
            <div className="bg-white border border-orange-200 p-5 rounded-2xl shadow-sm">
              <h4 className="text-xs font-bold text-orange-700 uppercase mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-orange-600" /> Tarifs appliqués
              </h4>

              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-700">Transport GP</span>
                <span className="font-mono text-gray-900 font-bold">{annonce.price} / Kg</span>
              </div>

              {selectedLivreurFee ? (
                <div className="flex justify-between items-center mb-3 text-sm text-orange-600 font-medium">
                  <span>+ Frais Livraison (Fixe)</span>
                  <span className="font-mono font-bold">{selectedLivreurFee}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center mb-3 text-sm text-gray-500 italic">
                  <span>Livraison</span>
                  <span>Non incluse</span>
                </div>
              )}

              <div className="border-t border-orange-100 pt-3 text-xs text-gray-500">
                * Le montant final sera calculé après pesée du colis.
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Envoyer ma demande
            </button>

          </form>
        ) : (
          /* SUCCESS */
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande reçue !</h3>
            <p className="text-gray-600 mb-6">
              Merci <strong>{formData.prenom}</strong>. Nous allons vous contacter au{" "}
              <strong>{formData.telephone}</strong>.
            </p>
            <button onClick={() => setShowForm(false)} className="text-orange-600 font-bold hover:underline">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AnnonceDetail;