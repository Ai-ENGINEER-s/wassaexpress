// FooterDark.tsx - AVEC ICÔNES DE RÉSEAUX SOCIAUX
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Linkedin, X } from "lucide-react";

const FooterDark = () => {
  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden border-t border-slate-800">
      
      {/* Fond animé subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      
      {/* Grille (légèrement visible) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        
        {/* Section Top - Logo & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-slate-700">
          
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <div className="inline-block">
              <img 
                src="images/logo/logo.png" // Assurez-vous d'avoir une version blanche/claire de votre logo si besoin
                alt="Wassa Express" 
                className="h-12 mb-2"
              />
              <div className="h-0.5 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            </div>
            
            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 max-w-lg">
              L'avenir de la logistique
              <span className="block mt-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent font-semibold">
                Maroc • Afrique
              </span>
            </p>

            {/* Liens Sociaux - MAINTENANT AVEC DES ICÔNES */}
            <div className="flex items-center gap-3 pt-2"> {/* J'ai augmenté le gap ici pour les icônes */}
              {[
                { name: 'Facebook', icon: Facebook, href: '#' },
                { name: 'Instagram', icon: Instagram, href: '#' },
                { name: 'LinkedIn', icon: Linkedin, href: '#' },
                { name: 'Twitter', icon: X, href: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-slate-800 backdrop-blur-sm border border-slate-700 shadow-sm hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 text-slate-300 hover:text-orange-400"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" /> {/* Remplacement du label par l'icône */}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter - Adaptée au thème sombre */}
          <div className="flex items-center">
            <div className="w-full max-w-md ml-auto">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
                Newsletter
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                Restez informé de nos dernières actualités
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="w-full px-5 py-3 bg-slate-800 backdrop-blur-sm border border-slate-700 rounded-xl shadow-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 text-white placeholder:text-slate-500 text-sm"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 text-white">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Milieu - Grille de liens */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {['Accueil', 'Services', 'Produits', 'À Propos', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {['Envoi Colis', 'AEVM', 'Assistance', 'Logement'].map((service) => (
                <li key={service}>
                  <a 
                    href="#" 
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="w-0 h-px bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Légal
            </h3>
            <ul className="space-y-4">
              {['Confidentialité', 'Conditions', 'Mentions', 'Cookies'].map((legal) => (
                <li key={legal}>
                  <a 
                    href="#" 
                    className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {legal}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cartes de Contact (style sombre) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Contact
            </h3>
            
            <a href="#" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <MapPin className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                Casablanca, Maroc
              </p>
            </a>

            <a href="tel:+212" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <Phone className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
               +212 663-833056
              </p>
            </a>

            <a href="mailto:contact@wassaexpress.com" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <Mail className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors break-all">
                contact@wassa.com
              </p>
            </a>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="pt-6 border-t border-slate-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 Wassa Express — Designed for the future
            </p>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-slate-400">Tous systèmes opérationnels</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Éléments Flottants */}
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-600/10 to-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-orange-600/5 rounded-full blur-3xl" />
    </footer>
  );
}

export default FooterDark;