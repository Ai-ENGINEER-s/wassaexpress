'use client';

import { useState, useEffect } from 'react';
import { AnnonceHeader } from '@/components/AnnonceDetail/AnnonceHeader';
import { AnnonceMainCard } from '@/components/AnnonceDetail/AnnonceMainCard';
import { AnnonceSidebar } from '@/components/AnnonceDetail/AnnonceSidebar';
import { InterestButton } from '@/components/AnnonceDetail/InterestButton';
import { LivreursSection } from '@/components/AnnonceDetail/LivreursSection';
import { InterestFormModal } from '@/components/AnnonceDetail/InterestFormModal';
import { CTASection } from '@/components/AnnonceDetail/CTASection';

// URL DE VOTRE API LOCALE
const WP_API_URL = 'http://wassaexpressbackend.local/wp-json';

const AnnonceDetail = ({ slug }: { slug: string }) => {
  // États des données
  const [annonce, setAnnonce] = useState<any>(null);
  const [livreurs, setLivreurs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // États de l'interface
  const [isFavorite, setIsFavorite] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
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

  // 1. CHARGEMENT ET FILTRAGE DES DONNÉES
  useEffect(() => {
    const fetchData = async () => {
      try {
        // A. Récupérer l'annonce par SLUG
        const resAnnonce = await fetch(`${WP_API_URL}/wp/v2/annonce?slug=${slug}&_embed`);
        const dataAnnonce = await resAnnonce.json();

        if (dataAnnonce.length === 0) {
           setLoading(false);
           return;
        }

        const item = dataAnnonce[0];
        const acf = item.acf || {};

        // Mapping de l'annonce (Attention aux minuscules des champs ACF !)
        const formattedAnnonce = {
          id: item.id,
          slug: item.slug,
          title: item.title.rendered,
          location: acf.location,
          destination: acf.destination,
          date: acf.date,
          departureTime: acf.departuretime,
          price: acf.price,
          type: acf.type || 'GP',
          verified: acf.verified === true,
          // Codes pays importants pour le filtrage
          departureCountryCode: acf.departurecountrycode,
          arrivalCountryCode: acf.arrivalcountrycode, 
          
          description: item.content.rendered.replace(/<[^>]+>/g, ''),
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

        // B. Récupérer TOUS les Livreurs
        // On en demande 100 pour être sûr d'avoir tout le monde avant de filtrer
        const resLivreurs = await fetch(`${WP_API_URL}/wp/v2/livreur?_embed&per_page=100`);
        const dataLivreurs = await resLivreurs.json();

        // Transformation brute des livreurs
        const allLivreurs = dataLivreurs.map((l: any) => ({
            id: l.id,
            name: l.title.rendered,
            profileImage: l._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/150',
            destination: l.acf.destination,
            rating: l.acf.rating,
            completedDeliveries: l.acf.completeddeliveries,
            responseTime: l.acf.responsetime,
            transportFee: l.acf.transportfee,
            verified: l.acf.verified === true,
            specialties: l.acf.specialties ? l.acf.specialties.split('\n') : [],
            phone: l.acf.phone,
            whatsapp: l.acf.whatsapp,
            available: l.acf.available === true,
            // Pour un livreur, "arrivalcountrycode" correspond à sa zone d'action (Pays)
            arrivalCountryCode: l.acf.arrivalcountrycode, 
            description: l.content.rendered.replace(/<[^>]+>/g, ''),
        }));

        // C. FILTRAGE INTELLIGENT (LA PARTIE IMPORTANTE)
        // On ne garde que les livreurs qui sont dans le pays d'arrivée de l'annonce
        const filteredLivreurs = allLivreurs.filter((livreur: any) => {
            
            // Si l'annonce n'a pas de code pays d'arrivée, on affiche tout le monde (sécurité)
            if (!formattedAnnonce.arrivalCountryCode) return true;

            // Si le livreur n'a pas de code pays, on le cache (ou on l'affiche, au choix)
            if (!livreur.arrivalCountryCode) return false;

            // Comparaison (ex: 'FR' === 'FR')
            return livreur.arrivalCountryCode.toLowerCase().trim() === formattedAnnonce.arrivalCountryCode.toLowerCase().trim();
        });

        setLivreurs(filteredLivreurs);

      } catch (error) {
        console.error("Erreur chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  // 2. GESTIONNAIRES D'ACTIONS
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
  const handleEmailContact = () => annonce && window.open(`mailto:${annonce.contact.email}`);

  const handleWhatsAppContactLivreur = (phone: string, name: string) => {
    const message = encodeURIComponent(`Bonjour ${name}, je souhaite envoyer un colis suite à l'annonce: ${annonce.title}`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handlePhoneContactLivreur = (phone: string) => window.open(`tel:${phone}`);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  // 3. ENVOI DU FORMULAIRE VERS L'API
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        annonce_id: annonce.id,
        ...formData
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
                setFormData({
                    nom: '', prenom: '', email: '', telephone: '', whatsapp: '',
                    adresseDepart: '', adresseLivraison: '', poidsEstime: '',
                    descriptionColis: '', avecLivreur: false, livreurId: '', message: '',
                });
            }, 3000);
        } else {
            alert("Erreur lors de l'envoi.");
        }
    } catch (error) {
        console.error("Erreur technique:", error);
    }
  };

  // 4. RENDU CONDITIONNEL
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500">Chargement des détails...</div>;
  if (!annonce) return <div className="min-h-screen flex items-center justify-center">Annonce introuvable</div>;

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* SECTION LIVREURS (Filtrée automatiquement par pays d'arrivée) */}
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