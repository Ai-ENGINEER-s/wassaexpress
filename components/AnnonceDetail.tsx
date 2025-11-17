'use client';
import {
  ArrowLeft,
  Check,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
  MessageCircle,
  Heart,
  Share2,

  Star,
  ShieldCheck,
  ArrowRight,
  Send,
  X,
  ShoppingCart,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { useState } from 'react';
import Flag from 'react-world-flags';
import Image from 'next/image';
import Link from 'next/link';

const AnnonceDetail = ({ slug }: { slug: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    whatsapp: '',
    adresseDepart: '',
    adresseLivraison: '',
    poidsEstime: '',
    descriptionColis: '',
    avecLivreur: false,
    livreurId: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // TODO: Remplacer par fetch API avec slug
  const annonce = {
    id: 1,
    slug: slug,
    title: "Dakar/Paris le 11 Novembre 2025",
    location: "Dakar/M'bour",
    destination: 'Paris',
    date: 'novembre 11, 2025',
    departureTime: '14:00',
    price: '10€/Kg',
    type: 'GP',
    verified: true,
    departureCountryCode: 'SN',
    arrivalCountryCode: 'FR',
    description:
      'Transport de colis entre Dakar et Paris. Espace disponible pour environ 30kg. Livraison rapide et sécurisée. Documents nécessaires pour le passage en douane.',
    deliveryTime: '2-3 jours',
    availableWeight: '30 Kg',
    conditions: [
      'Pas de produits interdits',
      'Emballage sécurisé requis',
      'Paiement avant expédition',
    ],
    publishedBy: 'Wassa Express',
    contact: {
      platformName: 'Wassa Express',
      phone: '+212 663-833056',
      whatsapp: '+212663833056',
      email: 'contact@wassaexpress.com',
    },
    traveler: {
      name: 'Fatou Body Senegal',
      phone: '+221776543210',
      verified: true,
    },
    stats: {
      completedDeliveries: 45,
      rating: 4.8,
      responseTime: '< 2h',
    },
  };

  // TODO: Remplacer par fetch API filtrés par destination
  const livreurs = [
    {
      id: 1,
      name: 'Ahmed El Mansouri',
      profileImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      location: 'Casablanca',
      destination: 'Paris',
      rating: 4.9,
      completedDeliveries: 156,
      responseTime: '< 1h',
      price: '8€/Kg',
      verified: true,
      specialties: ['Documents', 'Colis fragiles'],
      phone: '+212612345678',
      whatsapp: '+212612345678',
      available: true,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'FR',
      description: "Livreur professionnel avec plus de 5 ans d'expérience",
    },
    {
      id: 2,
      name: 'Mohammed Benali',
      profileImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      location: 'Casablanca',
      destination: 'Paris',
      rating: 4.7,
      completedDeliveries: 89,
      responseTime: '< 2h',
      price: '9€/Kg',
      verified: true,
      specialties: ['Vêtements', 'Alimentaire'],
      phone: '+212623456789',
      whatsapp: '+212623456789',
      available: true,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'FR',
      description: 'Spécialiste des envois alimentaires et textiles',
    },
    {
      id: 3,
      name: 'Fatima Zahra',
      profileImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      location: 'Rabat',
      destination: 'Paris',
      rating: 4.8,
      completedDeliveries: 203,
      responseTime: '< 30min',
      price: '10€/Kg',
      verified: true,
      specialties: ['Express', 'Volumineux'],
      phone: '+212634567890',
      whatsapp: '+212634567890',
      available: false,
      departureCountryCode: 'MA',
      arrivalCountryCode: 'FR',
      description: 'Service express garanti, livraison rapide et sécurisée',
    },
  ];

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé(e) par l'annonce: ${annonce.title}. Pouvez-vous me mettre en relation avec le voyageur ?`
    );
    window.open(
      `https://wa.me/${annonce.contact.whatsapp}?text=${message}`,
      '_blank'
    );
  };

  const handlePhoneContact = () => {
    window.location.href = `tel:${annonce.contact.phone}`;
  };

  const handleEmailContact = () => {
    window.location.href = `mailto:${annonce.contact.email}?subject=Demande de contact pour: ${annonce.title}`;
  };

  const handleWhatsAppContactLivreur = (
    e: React.MouseEvent,
    phone: string,
    name: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const message = encodeURIComponent(
      `Bonjour ${name}, je souhaite envoyer un colis suite à l'annonce: ${annonce.title}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handlePhoneContactLivreur = (e: React.MouseEvent, phone: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `tel:${phone}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: annonce.title,
        text: `Découvrez cette annonce sur ${annonce.contact.platformName}: ${annonce.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Envoyer les données à votre API
    console.log('Commande reçue:', formData);

    // Simulation d'envoi réussi
    setFormSubmitted(true);

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setShowForm(false);
      setFormSubmitted(false);
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        whatsapp: '',
        adresseDepart: '',
        adresseLivraison: '',
        poidsEstime: '',
        descriptionColis: '',
        avecLivreur: false,
        livreurId: '',
        message: '',
      });
    }, 3000);
  };

  const selectedLivreur = livreurs.find(l => l.id === parseInt(formData.livreurId));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER FIXE */}
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
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <Share2 className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLONNE PRINCIPALE */}
          <div className="lg:col-span-2 space-y-6">
            {/* BADGE ANNONCE OFFICIELLE */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 flex items-center space-x-3 shadow-md">
              <ShieldCheck className="w-6 h-6" />
              <div>
                <p className="font-semibold">
                  Annonce vérifiée par {annonce.publishedBy}
                </p>
                <p className="text-sm text-blue-100">
                  Voyageur sélectionné et validé par notre équipe
                </p>
              </div>
            </div>

            {/* CARTE PRINCIPALE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* HEADER IMAGE AVEC DRAPEAUX */}
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative p-6">
                <span
                  className={`
                    absolute top-4 left-4 px-4 py-2 text-sm font-bold rounded-full shadow-sm
                    ${
                      annonce.type === 'GP'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }
                  `}
                >
                  {annonce.type}
                </span>

                {annonce.verified && (
                  <div className="absolute top-4 right-4">
                    <Check className="w-6 h-6 text-green-500 bg-white rounded-full shadow-sm" />
                  </div>
                )}

                {/* Drapeaux */}
                {annonce.departureCountryCode && annonce.arrivalCountryCode && (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="relative">
                      <Flag
                        code={annonce.departureCountryCode}
                        className="w-20 h-16 rounded-md shadow-md object-cover"
                        style={{ width: '80px', height: '60px' }}
                      />
                    </div>

                    <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2.5">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>

                    <div className="relative">
                      <Flag
                        code={annonce.arrivalCountryCode}
                        className="w-20 h-16 rounded-md shadow-md object-cover"
                        style={{ width: '80px', height: '60px' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* CONTENU */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  {annonce.title}
                </h1>

                {/* INFOS PRINCIPALES */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Départ</p>
                      <p className="font-semibold text-gray-900">
                        {annonce.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold text-gray-900">
                        {annonce.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date de départ</p>
                      <p className="font-semibold text-gray-900">
                        {annonce.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        {annonce.departureTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Poids disponible</p>
                      <p className="font-semibold text-gray-900">
                        {annonce.availableWeight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {annonce.description}
                  </p>
                </div>

                {/* CONDITIONS */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Conditions
                  </h2>
                  <div className="space-y-2">
                    {annonce.conditions.map((condition, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DÉLAI DE LIVRAISON */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Délai de livraison
                    </p>
                    <p className="text-sm text-blue-700">
                      {annonce.deliveryTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOUTON INTÉRESSÉ - NOUVEAU */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center shadow-lg">
              <Package className="w-12 h-12 text-white mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-3">
                Intéressé par cette annonce ?
              </h3>
              <p className="text-orange-50 mb-6">
                Contactez-nous avec vos informations
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-4 px-8 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg mx-auto"
              >
                <Send className="w-5 h-5" />
                <span>Je suis intéressé(e)</span>
              </button>
            </div>

            {/* INFORMATIONS SUR LE VOYAGEUR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                À propos du voyageur
              </h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {annonce.traveler.name}
                  </p>
                  {annonce.traveler.verified && (
                    <div className="flex items-center space-x-1 text-sm text-green-600">
                      <Check className="w-4 h-4" />
                      <span>Identité vérifiée</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#104C9E]">
                    {annonce.stats.completedDeliveries}
                  </div>
                  <div className="text-sm text-gray-500">Livraisons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {annonce.stats.rating} ⭐
                  </div>
                  <div className="text-sm text-gray-500">Note</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {annonce.stats.responseTime}
                  </div>
                  <div className="text-sm text-gray-500">Réponse</div>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR CONTACT */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              {/* PRIX */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Tarif</p>
                <p className="text-4xl font-extrabold text-orange-500">
                  {annonce.price}
                </p>
              </div>

              {/* INFOS CONTACT PLATEFORME */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Contactez-nous
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">
                      {annonce.contact.platformName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Nous vous répondons rapidement</span>
                  </div>
                </div>
              </div>

              {/* MESSAGE INFO */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900 leading-relaxed">
                  💬 <strong>Comment ça marche ?</strong>
                  <br />
                  Contactez-nous et nous vous mettrons en relation directe avec
                  le voyageur vérifié.
                </p>
              </div>

              {/* BOUTONS DE CONTACT */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={handlePhoneContact}
                  className="w-full bg-[#104C9E] hover:bg-[#0d3d7f] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <Phone className="w-5 h-5" />
                  <span>Appeler</span>
                </button>

                <button
                  onClick={handleEmailContact}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </button>
              </div>

              {/* AVERTISSEMENT */}
              <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-xs text-green-800 leading-relaxed">
                  ✅ <strong>Sécurité garantie</strong>
                  <br />
                  Tous nos voyageurs sont vérifiés. Nous assurons la mise en
                  relation et le suivi de votre envoi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION LIVREURS DISPONIBLES */}
        <div className="mt-12">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#104C9E] mb-2">
              Livreurs disponibles pour cette destination
            </h2>
            <p className="text-gray-600 text-lg">
              Choisissez un livreur professionnel pour votre colis vers{' '}
              {annonce.destination}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livreurs.map((livreur) => (
              <Link
                key={livreur.id}
                href={`/livreurs/${livreur.id}`}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 relative group-hover:from-blue-100 group-hover:to-orange-100 transition-colors">
                  {livreur.verified && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  {!livreur.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Occupé
                      </span>
                    </div>
                  )}

                  {livreur.available && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow animate-pulse">
                        Disponible
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={livreur.profileImage}
                          alt={livreur.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {livreur.name}
                    </h3>
                    <div className="flex items-center justify-center space-x-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{livreur.location}</span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium">{livreur.destination}</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      {livreur.description}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900">
                          {livreur.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Note</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 mb-1">
                        {livreur.completedDeliveries}
                      </div>
                      <p className="text-xs text-gray-500">Livraisons</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-600 mb-1">
                        {livreur.responseTime}
                      </div>
                      <p className="text-xs text-gray-500">Réponse</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-medium">
                      Spécialités:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {livreur.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-3 mb-4 text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">
                      Tarif
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {livreur.price}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={(e) =>
                        handleWhatsAppContactLivreur(
                          e,
                          livreur.whatsapp,
                          livreur.name
                        )
                      }
                      disabled={!livreur.available}
                      className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
                        livreur.available
                          ? 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={(e) =>
                        handlePhoneContactLivreur(e, livreur.phone)
                      }
                      disabled={!livreur.available}
                      className={`w-full py-3 px-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all ${
                        livreur.available
                          ? 'bg-[#104C9E] hover:bg-[#0d3d7f] text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Appeler</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* MESSAGE SI AUCUN LIVREUR */}
          {livreurs.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Aucun livreur disponible pour le moment
              </h3>
              <p className="text-gray-500">
                Revenez plus tard ou contactez directement l'annonceur
              </p>
            </div>
          )}
        </div>

        {/* MODAL FORMULAIRE DE COMMANDE - VERSION COMPLÈTE */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
              
              {/* HEADER MODAL */}
              <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center space-x-2">
                    <Package className="w-6 h-6" />
                    <span>Je suis intéressé(e)</span>
                  </h3>
                  <p className="text-orange-100 text-sm truncate">{annonce.title}</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* CONTENU MODAL */}
              <div className="p-6">
                {!formSubmitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* SECTION INFORMATIONS PERSONNELLES */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span>Vos coordonnées</span>
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Pour que nous puissions vous recontacter rapidement</p>
                    </div>

                    {/* NOM & PRÉNOM */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {['Nom', 'Prénom'].map((field) => (
                        <div key={field}>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                            {field} *
                          </label>
                         <input
  type="text"
  name={field.toLowerCase()}
  value={
    (formData[field.toLowerCase() as keyof typeof formData] ?? "").toString()
  }
  onChange={handleFormChange}
  required
  placeholder={`Votre ${field.toLowerCase()}`}
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
/>

                        </div>
                      ))}
                    </div>

                    {/* EMAIL & TÉLÉPHONE */}
                    {['Email', 'Téléphone'].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                          {field} *
                        </label>
                      <input
  type={field === "Email" ? "email" : "tel"}
  name={field.toLowerCase()}
  value={
    (formData[field.toLowerCase() as keyof typeof formData] ?? "").toString()
  }
  onChange={handleFormChange}
  required
  placeholder={
    field === "Email"
      ? "votre.email@exemple.com"
      : "+212 6XX-XXXXXX"
  }
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
/>

                      </div>
                    ))}

                    {/* WHATSAPP */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        WhatsApp (optionnel)
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleFormChange}
                        placeholder="+212 6XX-XXXXXX"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* SECTION DÉTAILS DU COLIS */}
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                        <Package className="w-5 h-5 text-orange-600" />
                        <span>Informations sur votre colis</span>
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Détails du colis que vous souhaitez envoyer</p>
                    </div>

                    {/* ADRESSE DÉPART */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Adresse de départ (enlèvement) *
                      </label>
                      <input
                        type="text"
                        name="adresseDepart"
                        value={formData.adresseDepart}
                        onChange={handleFormChange}
                        required
                        placeholder="Adresse complète d'enlèvement du colis"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* ADRESSE LIVRAISON */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Adresse de livraison *
                      </label>
                      <input
                        type="text"
                        name="adresseLivraison"
                        value={formData.adresseLivraison}
                        onChange={handleFormChange}
                        required
                        placeholder="Adresse complète de livraison"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* POIDS ESTIMÉ */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Poids estimé du colis (Kg) *
                      </label>
                      <input
                        type="number"
                        name="poidsEstime"
                        value={formData.poidsEstime}
                        onChange={handleFormChange}
                        required
                        min="0.5"
                        step="0.5"
                        placeholder="Ex: 5"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                      <p className="text-xs text-gray-500 mt-1">Poids disponible: {annonce.availableWeight}</p>
                    </div>

                    {/* DESCRIPTION COLIS */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Description du colis *
                      </label>
                      <textarea
                        name="descriptionColis"
                        value={formData.descriptionColis}
                        onChange={handleFormChange}
                        required
                        rows={3}
                        placeholder="Ex: Vêtements, documents, cadeaux..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                      />
                    </div>

                    {/* SECTION LIVREUR (OPTION) */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center space-x-2">
                        <Truck className="w-5 h-5 text-green-600" />
                        <span>Livraison à domicile (optionnel)</span>
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Une fois le colis arrivé à destination, un livreur peut le livrer à l'adresse finale</p>
                    </div>

                    {/* CHECKBOX LIVREUR */}
                    <div className="flex items-start space-x-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <input
                        type="checkbox"
                        id="avecLivreur"
                        name="avecLivreur"
                        checked={formData.avecLivreur}
                        onChange={handleFormChange}
                        className="mt-1 w-5 h-5 text-orange-600 focus:ring-2 focus:ring-orange-500 rounded"
                      />
                      <label htmlFor="avecLivreur" className="flex-1 cursor-pointer">
                        <span className="block font-semibold text-gray-900 dark:text-white mb-1">
                          Je souhaite une livraison à domicile à l'arrivée
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          Un livreur récupérera le colis une fois arrivé et le livrera à l'adresse de destination finale
                        </span>
                      </label>
                    </div>

                    {/* SÉLECTION LIVREUR (SI CHECKBOX ACTIVÉE) */}
                    {formData.avecLivreur && (
                      <div className="bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-700 rounded-xl p-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          Choisir un livreur *
                        </label>
                        <select
                          name="livreurId"
                          value={formData.livreurId}
                          onChange={handleFormChange}
                          required={formData.avecLivreur}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        >
                          <option value="">-- Sélectionner un livreur --</option>
                          {livreurs.filter(l => l.available).map((livreur) => (
                            <option key={livreur.id} value={livreur.id}>
                              {livreur.name} - {livreur.price} ({livreur.location} → {livreur.destination})
                            </option>
                          ))}
                        </select>
                        
                        {selectedLivreur && (
                          <div className="mt-3 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
                                <Image
                                  src={selectedLivreur.profileImage}
                                  alt={selectedLivreur.name}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                  unoptimized
                                />
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 dark:text-white">{selectedLivreur.name}</p>
                                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-300">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span>{selectedLivreur.rating}</span>
                                  <span>•</span>
                                  <span>{selectedLivreur.completedDeliveries} livraisons</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Tarif livreur</p>
                              <p className="text-lg font-bold text-green-600">{selectedLivreur.price}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* MESSAGE ADDITIONNEL */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
                        Message additionnel (optionnel)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={2}
                        placeholder="Questions ou instructions particulières..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                      />
                    </div>

                    {/* INFO FINALE */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3 text-xs text-blue-900 dark:text-blue-200">
                      <strong>📞 Nous vous recontacterons</strong>
                      <p>Notre équipe vous contactera rapidement pour finaliser votre demande et organiser l'envoi de votre colis avec le voyageur.</p>
                    </div>

                    {/* BOUTONS */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                        <span>Envoyer ma demande</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  // MESSAGE DE SUCCÈS
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      Demande envoyée avec succès !
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      Merci pour votre intérêt. Notre équipe vous contactera très prochainement pour organiser l'envoi de votre colis.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-4 text-sm text-green-800 dark:text-green-200">
                      <p className="font-semibold mb-2">✅ Prochaines étapes :</p>
                      <ul className="text-left space-y-1 text-xs">
                        <li>• Nous vous appellerons pour confirmer les détails</li>
                        <li>• Organisation de l'envoi avec le voyageur</li>
                        <li>• Paiement et remise du colis</li>
                        {formData.avecLivreur && <li>• Livraison à domicile une fois arrivé à destination</li>}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION VOUS VOYAGEZ ? */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Vous voyagez bientôt ?</h2>
            <p className="text-lg mb-6 text-orange-50">
              Rentabilisez votre voyage en transportant des colis !
              Contactez-nous pour publier votre disponibilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsAppContact}
                className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-xl flex items-center space-x-2 transition shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Nous contacter sur WhatsApp</span>
              </button>
              <button
                onClick={handlePhoneContact}
                className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-8 rounded-xl flex items-center space-x-2 transition"
              >
                <Phone className="w-5 h-5" />
                <span>{annonce.contact.phone}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDetail;