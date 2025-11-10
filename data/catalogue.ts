


// data/catalogue.ts


import { Theme, Session } from '@/types/index';
import {  ThemeForOtherPages } from '@/types/index';
// Fonctions utilitaires basées sur l'interprétation des données fournies
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ↓ ↓ ↓ Ajoutez le type de retour ': Session[]' ici ↓ ↓ ↓
const generateSessions = (date1: string, date2: string, date3: string): Session[] => [
// ↑ ↑ ↑ Ajoutez le type de retour ': Session[]' ici ↑ ↑ ↑
  { date: date1, location: 'Session 1' },
  { date: date2, location: 'Session 2' },
  { date: date3, location: 'Session 3' },
];
const FORMATION_CATALOGUE: Theme[] = [



 // Thème 1 : Gouvernance, Leadership et Management stratégique
{
    slug: 'gouvernance-leadership-strategique',
    title: 'Gouvernance, Leadership et Management stratégique',
    modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]






  },
// Thème 2 : Finance, Comptabilité, audit, contrôle de gestion



{
    slug: 'finance-comptabilite-audit',
    title: 'Finance, Comptabilité, audit, contrôle de gestion',
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

// Thème 3 : Contrats, commande, marchés publics
 {
    slug: 'contrats-marches-publics',
    title: 'Contrats, commande, marchés publics',
 modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
  // Thème 4 : Gestion de Projets/Programmes et Ingénierie de Développement
{
    title: 'Gestion de Projets/Programmes et Ingénierie de Développement',
    slug: slugify('Gestion de Projets/Programmes et Ingénierie de Développement'),
 modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

// Thème 5 : Financement du développement, ingénierie financière et partenariats
{
    title: 'Financement du développement, ingénierie financière et partenariats',
    slug: slugify('Financement du développement, ingénierie financière et partenariats'),
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 6 : Ressources Humaines, Organisation et Développement des Compétences
{
    title: 'Ressources Humaines, Organisation et Développement des Compétences',
    slug: slugify('Ressources Humaines, Organisation et Développement des Compétences'),
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 7 : Secrétariat, assistanat, archivage
{
    title: 'Secrétariat, assistanat, archivage',
    slug: slugify('Secrétariat, assistanat, archivage'),
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 8 : Protocole, diplomatie et relations internationales
{
    title: 'Protocole, diplomatie et relations internationales',
    slug: slugify('Protocole, diplomatie et relations internationales'),
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 9 : Systèmes d'Information, Digitalisation et Intelligence Artificielle
{
    title: 'Systèmes d\'Information, Digitalisation et Intelligence Artificielle',
    slug: slugify('Systèmes d\'Information, Digitalisation et Intelligence Artificielle'),
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },


// Thème 10 : Sécurité, Sûreté, Gestion des Risques et Continuité d'Activité
{
    title: 'Sécurité, Sûreté, Gestion des Risques et Continuité d\'Activité',
    slug: slugify('Sécurité, Sûreté, Gestion des Risques et Continuité d\'Activité'),
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 11 : Développement Durable, Environnement et Responsabilité Sociétale
{
    title: 'Développement Durable, Environnement et Responsabilité Sociétale',
    slug: slugify('Développement Durable, Environnement et Responsabilité Sociétale'),
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

// Thème 12 : Régulation, normes et contrôle de la qualité dans les secteurs stratégiques


{
    title: 'Régulation, normes et contrôle de la qualité dans les secteurs stratégiques',
    slug: slugify('Régulation, normes et contrôle de la qualité dans les secteurs stratégiques'),
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

// Thème 13 : Genre, Inclusion et Gouvernance Participative
 {
    title: 'Genre, Inclusion et Gouvernance Participative',
    slug: slugify('Genre, Inclusion et Gouvernance Participative'),
 modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 14 : Énergie, Géologie, mines, pétrole
 {
     title: 'Énergie, Géologie, mines, pétrole',
    slug: slugify('Énergie, Géologie, mines, pétrole'),
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
// Thème 15 : Hydraulique, sécurité alimentaire, agriculture et élevage
{
    title: 'Hydraulique, sécurité alimentaire, agriculture et élevage',
    slug: slugify('Hydraulique, sécurité alimentaire, agriculture et élevage'),
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

// Thème 16 : Géomatique, Aménagement du Territoire et Infrastructures
 {
    title: 'Géomatique, Aménagement du Territoire et Infrastructures',
    slug: slugify('Géomatique, Aménagement du Territoire et Infrastructures'),
 modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        sessions: generateSessions('Du 05 au 16 Janvier 2026', 'Du 27 Avril au 08 Mai 2026', 'Du 31 Août au 11 Septembre 2026'),
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
];

const Etude_CATALOGUE: ThemeForOtherPages[] = [

  {
    slug: slugify('Les études sectorielles et socio-économiques'),
    title: 'Les études sectorielles et socio-économiques',
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
{
    slug: slugify('Les diagnostics organisationnels et institutionnels'),
    title: 'Les diagnostics organisationnels et institutionnels',
modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
       
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
{
    slug: slugify('Analyse des politiques publiques'),
    title: 'Analyse des politiques publiques',
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
{
    slug: slugify('Les études d\'impact et évaluations de projets/programmes'),
    title: 'Les études d\'impact et évaluations de projets/programmes',
  modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
]


const Financement_CATALOGUE: ThemeForOtherPages[] = [
 {
    slug: slugify('Recherche et mobilisation de financement'),
    title: 'Recherche et mobilisation de financement',
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
       
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
]


const Conseil_CATALOGUE: ThemeForOtherPages[] = [

{
    slug: slugify('Elaboration de plans stratégiques sectoriels ou institutionnels'),
    title: 'Elaboration de plans stratégiques sectoriels ou institutionnels',
    modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

{
    slug: slugify('Le repositionnement organisationnel et la redéfinition des missions'),
    title: 'Le repositionnement organisationnel et la redéfinition des missions',
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },
{
    slug: slugify('Amélioration de la gouvernance, du pilotage de la performance et de la redevabilité'),
    title: 'Amélioration de la gouvernance, du pilotage de la performance et de la redevabilité',
 modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

{
    slug: slugify('Alignement des stratégies avec les Objectifs de Développement Durable (ODD)'),
    title: 'Alignement des stratégies avec les Objectifs de Développement Durable (ODD)',
   modules: [  
 {
        code: 'GLMS 01',
        title: 'Gouvernance stratégique 5.0',
        themeDetail: '<h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626;">Genèse du thème</h3><p style="margin-top: 0.5rem;">Face à la complexité croissante des environnements économiques et institutionnels, les modèles classiques de gouvernance atteignent leurs limites. Le concept de Gouvernance stratégique 5.0 marque une véritable rupture : il allie intelligence artificielle, innovation managériale et vision durable pour instaurer une gouvernance plus intelligente, plus humaine et plus connectée. Cette approche invite les dirigeants à repenser leurs méthodes de pilotage et à inscrire la performance dans une logique d’adaptation continue.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Pourquoi ce thème est essentiel</h3><p style="margin-top: 0.5rem;">Qu’il s’agisse d’une institution publique, d’une entreprise privée, d’une ONG ou d’une organisation internationale, la Gouvernance 5.0 constitue aujourd’hui un levier incontournable pour renforcer l’efficacité, l’agilité et la résilience. Elle aide les décideurs à anticiper les mutations, à intégrer les technologies émergentes dans la stratégie et à développer un leadership collaboratif.</p><p style="margin-top: 1rem;"><strong>Chez DIEBENU & PARTNERS,</strong> nous croyons fermement que la réussite organisationnelle repose sur la capacité à conjuguer vision stratégique, innovation et intelligence collective. C’est pourquoi nous accompagnons les institutions à travers des thématiques actuelles, des outils performants et des approches pédagogiques adaptées aux défis contemporains.</p><h3 style="font-size: 1.25rem; font-weight: 700; color: #DC2626; margin-top: 1.25rem;">Rejoignez la transformation</h3><p style="margin-top: 0.5rem;">Ce thème offre aux dirigeants et cadres l’opportunité de maîtriser les leviers de la Gouvernance stratégique 5.0, d’adopter de nouveaux réflexes de pilotage et de renforcer la durabilité de leurs décisions.<br><strong>Chez DIEBENU & PARTNERS,</strong> nous ne formons pas seulement — nous transformons la manière de gouverner.</p>',
        
        image: '/images/themes/GLMS/photo_1_2025-10-27_12-14-10.jpg',
      },]
  },

]



export const DESTINATIONS = [
  { name: 'Casablanca', country: 'Maroc' },
  { name: 'Abidjan', country: 'Côte d\'Ivoire' },
  { name: 'Dakar', country: 'Sénégal' },
  { name: 'Ouagadougou', country: 'Burkina Faso' },
  { name: 'Dubaï', country: 'Émirats Arabes Unis' }
];

export { FORMATION_CATALOGUE  , Conseil_CATALOGUE ,Financement_CATALOGUE,Etude_CATALOGUE};