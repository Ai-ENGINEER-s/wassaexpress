🚀 Guide de Démarrage Rapide - WassaExpress
✅ Toutes les erreurs ont été corrigées !
Changements effectués :

✅ Suppression de clsx et tailwind-merge - Remplacé par une fonction cn() simple
✅ Typage explicite des variables - Ajout de types Product[], Annonce[], Livreur[]
✅ Correction du type de retour de getAuthHeaders() - Retourne maintenant Record<string, string>

📦 Installation en 5 étapes
Étape 1 : Créer le projet Next.js
bashnpx create-next-app@latest wassaexpress --typescript --tailwind --app --no-src-dir
cd wassaexpress
Étape 2 : Créer la structure de dossiers
bash# Créer les dossiers nécessaires
mkdir -p app/services app/produits app/annonces app/livreurs app/contact app/api/contact app/api/annonces
mkdir -p components/ui
mkdir -p lib
mkdir -p public/images
Étape 3 : Copier les fichiers
Copiez tous les fichiers fournis dans l'artefact dans leur emplacement respectif :
Fichiers de configuration :

next.config.js → racine
tailwind.config.js → racine
tsconfig.json → racine
.env.local → racine (à créer)

Fichiers lib :

lib/types.ts
lib/api.ts
lib/utils.ts

Composants UI :

components/ui/Button.tsx
components/ui/Card.tsx
components/ui/Badge.tsx
components/ui/Container.tsx
components/ui/Section.tsx

Composants principaux :

components/Header.tsx
components/Footer.tsx
components/Hero.tsx
components/ServiceCard.tsx
components/ProductCard.tsx
components/AnnonceCard.tsx
components/LivreurCard.tsx

Pages :

app/layout.tsx
app/page.tsx
app/globals.css
app/services/page.tsx
app/produits/page.tsx
app/annonces/page.tsx
app/livreurs/page.tsx
app/contact/page.tsx

API Routes :

app/api/contact/route.ts
app/api/annonces/route.ts

Étape 4 : Configurer les variables d'environnement
Créez .env.local à la racine :
env# WordPress
NEXT_PUBLIC_WORDPRESS_URL=https://votre-domaine.com
WORDPRESS_API_URL=https://votre-domaine.com/wp-json

# WooCommerce (pour les produits)
WP_CONSUMER_KEY=ck_votre_consumer_key
WP_CONSUMER_SECRET=cs_votre_consumer_secret

# Contact
NEXT_PUBLIC_WHATSAPP_NUMBER=+212600000000
⚠️ IMPORTANT : Pour obtenir vos clés WooCommerce :

Allez dans WordPress → WooCommerce → Paramètres → Avancé → REST API
Cliquez sur "Ajouter une clé"
Permissions : "Lecture seule" (ou "Lecture/Écriture" si besoin)
Copiez les clés générées

Étape 5 : Lancer le projet
bash# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# http://localhost:3000
🔧 Si vous n'avez pas encore WordPress configuré
Option A : Tester sans backend (mode mock)
Modifiez temporairement lib/api.ts pour retourner des données de test :
typescriptexport async function getFeaturedProducts(): Promise<Product[]> {
  // Retourner des données mockées pour le développement
  return [
    {
      id: 1,
      name: 'Produit Test',
      slug: 'produit-test',
      description: 'Description du produit',
      short_description: 'Description courte',
      price: '100',
      regular_price: '100',
      sale_price: '',
      images: [{ id: 1, src: 'https://via.placeholder.com/400', alt: 'Test' }],
      categories: [],
      stock_status: 'instock'
    }
  ]
}
Option B : Configuration WordPress rapide

Installer WordPress + WooCommerce (Local by Flywheel recommandé pour le dev local)
Activer REST API :

php// Dans functions.php
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    return true;
});

Créer le Custom Post Type "Annonces" :

phpfunction wassa_register_annonces() {
  register_post_type('annonces', [
    'label' => 'Annonces',
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt']
  ]);
}
add_action('init', 'wassa_register_annonces');

Ajouter le rôle Livreur :

phpadd_role('livreur', 'Livreur', ['read' => true]);
🎨 Personnalisation
Changer les couleurs
Éditez tailwind.config.js :
javascriptcolors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
  },
}
Modifier le logo
Remplacez le logo dans components/Header.tsx :
tsx<div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
  {/* Ajoutez votre logo ici */}
</div>
📝 Commandes utiles
bash# Développement
npm run dev

# Build production
npm run build

# Vérifier les types TypeScript
npm run type-check

# Linter
npm run lint

# Démarrer en production
npm start
🐛 Résolution des problèmes courants
Erreur "Module not found"
bash# Nettoyer et réinstaller
rm -rf node_modules .next
npm install
Erreur TypeScript
bash# Vérifier les types
npm run type-check
Images ne s'affichent pas
Vérifiez next.config.js :
javascriptimages: {
  domains: ['votre-domaine.com', 'images.unsplash.com'],
}
Erreur CORS avec WordPress
Ajoutez dans .htaccess WordPress :
apacheHeader set Access-Control-Allow-Origin "*"
Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
🚀 Déploiement sur Vercel
bash# 1. Installer Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Déployer
vercel

# 4. Configurer les variables d'environnement dans le dashboard Vercel
✅ Checklist avant déploiement

 .env.local configuré avec les bonnes URLs
 WordPress REST API accessible
 WooCommerce API keys générées
 Custom Post Type "Annonces" créé
 Rôle "Livreur" ajouté
 Images optimisées
 npm run build réussit
 Tests sur mobile/tablette/desktop

📞 Besoin d'aide ?
Si vous rencontrez des problèmes :

Vérifiez que toutes les dépendances sont installées
Vérifiez les URLs dans .env.local
Testez les endpoints WordPress dans le navigateur
Consultez les logs du terminal


Le site est maintenant prêt à être lancé ! 🎉