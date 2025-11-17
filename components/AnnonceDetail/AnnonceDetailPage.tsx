'use client';
import { useState } from 'react';
import { AnnonceHeader } from '@/components/AnnonceDetail/AnnonceHeader';
import { AnnonceMainCard } from '@/components/AnnonceDetail/AnnonceMainCard';
import { AnnonceSidebar } from '@/components/AnnonceDetail/AnnonceSidebar';
import { InterestButton } from '@/components/AnnonceDetail/InterestButton';
import { LivreursSection } from '@/components/AnnonceDetail/LivreursSection';
import { InterestFormModal } from '@/components/AnnonceDetail/InterestFormModal';
import { CTASection } from '@/components/AnnonceDetail/CTASection';


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
    title: 'Dakar/Paris le 11 Novembre 2025',
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
      destination: 'Paris',
      rating: 4.9,
      completedDeliveries: 156,
      responseTime: '< 1h',
      transportFee: '5€',
      verified: true,
      specialties: ['Documents', 'Colis fragiles'],
      phone: '+212612345678',
      whatsapp: '+212612345678',
      available: true,
      arrivalCountryCode: 'FR',
      description: "Livreur professionnel avec plus de 5 ans d'expérience",
    },
    {
      id: 2,
      name: 'Mohammed Benali',
      profileImage:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
      destination: 'Paris',
      rating: 4.7,
      completedDeliveries: 89,
      responseTime: '< 2h',
      transportFee: '5€',
      verified: true,
      specialties: ['Vêtements', 'Alimentaire'],
      phone: '+212623456789',
      whatsapp: '+212623456789',
      available: true,
      arrivalCountryCode: 'FR',
      description: 'Spécialiste des envois alimentaires et textiles',
    },
    {
      id: 3,
      name: 'Fatima Zahra',
      profileImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      destination: 'Paris',
      rating: 4.8,
      completedDeliveries: 203,
      responseTime: '< 30min',
      transportFee: '10€',
      verified: true,
      specialties: ['Express', 'Volumineux'],
      phone: '+212634567890',
      whatsapp: '+212634567890',
      available: false,
      arrivalCountryCode: 'FR',
      description: 'Service express garanti, livraison rapide et sécurisée',
    },
  ];

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

  const handleWhatsAppContactLivreur = (phone: string, name: string) => {
    const message = encodeURIComponent(
      `Bonjour ${name}, je souhaite envoyer un colis suite à l'annonce: ${annonce.title}`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handlePhoneContactLivreur = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <AnnonceHeader
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
        onShare={handleShare}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLONNE PRINCIPALE */}
          <div className="lg:col-span-2 space-y-6">
            <AnnonceMainCard annonce={annonce} />
            <InterestButton onClick={() => setShowForm(true)} />
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <AnnonceSidebar
              price={annonce.price}
              contact={annonce.contact}
              onWhatsAppContact={handleWhatsAppContact}
              onPhoneContact={handlePhoneContact}
              onEmailContact={handleEmailContact}
            />
          </div>
        </div>

        {/* SECTION LIVREURS */}
        <LivreursSection
          livreurs={livreurs}
          destination={annonce.destination}
          annonceTitle={annonce.title}
          onWhatsAppContact={handleWhatsAppContactLivreur}
          onPhoneContact={handlePhoneContactLivreur}
        />

        {/* MODAL FORMULAIRE */}
        <InterestFormModal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          formData={formData}
          formSubmitted={formSubmitted}
          annonceTitle={annonce.title}
          availableWeight={annonce.availableWeight}
          livreurs={livreurs}
          onChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />

        {/* CTA SECTION */}
        <CTASection
          platformName={annonce.contact.platformName}
          phone={annonce.contact.phone}
          onWhatsAppContact={handleWhatsAppContact}
          onPhoneContact={handlePhoneContact}
        />
      </div>
    </div>
  );
};

export default AnnonceDetail;