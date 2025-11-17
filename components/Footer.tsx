// FooterDark.tsx - AVEC ICÔNES DE RÉSEAUX SOCIAUX
// ✅ Liens mis à jour pour la navigation
import { Mail, MapPin, Phone, Send, Facebook, Instagram, Linkedin, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FooterDark = () => {
  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Produits", href: "/produits" },
    // { label: "À Propos", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { label: "Envoi Colis", href: "/services/envoi-colis" },
    { label: "AEVM", href: "/services/aevm" },
    { label: "Assistance", href: "/services/assistance" },
    { label: "Logement", href: "/services/logement" },
  ];

  const legalLinks = [
    { label: "Confidentialité", href: "/confidentialite" },
    { label: "Conditions", href: "/conditions" },
    { label: "Mentions", href: "/mentions-legales" },
    { label: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 via-transparent to-blue-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,88,12,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12 pb-12 border-b border-slate-700">
          <div className="space-y-4">
            <div className="inline-block">
              <div className="h-12 w-auto mb-2 relative">
                <Image
                  src="/images/logo/logofooter.png"
                  alt="Wassa Express"
                  width={90}
                  height={33}
                  className="object-contain"
                />
              </div>
              <div className="h-0.5 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            </div>

            <p className="text-lg md:text-xl font-light leading-relaxed text-slate-300 max-w-lg">
              L'avenir de la logistique
              <span className="block mt-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent font-semibold">
                Maroc • Afrique
              </span>
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { name: "Facebook", icon: Facebook, href: "#" },
                { name: "Instagram", icon: Instagram, href: "#" },
                { name: "LinkedIn", icon: Linkedin, href: "#" },
                { name: "Twitter", icon: X, href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-slate-800 backdrop-blur-sm border border-slate-700 shadow-sm hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 text-slate-300 hover:text-orange-400"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                    <span className="w-0 h-px bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200">
                    <span className="w-0 h-px bg-orange-500 group-hover:w-6 transition-all duration-300" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
              Légal
            </h3>
            <ul className="space-y-4">
              {legalLinks.map((legal) => (
                <li key={legal.label}>
                  <Link href={legal.href} className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                    {legal.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
              Contact
            </h3>

            <Link href="#" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <MapPin className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                Casablanca, Maroc
              </p>
            </Link>

            <Link href="tel:+212663833056" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <Phone className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                +212 663-833056
              </p>
            </Link>

            <Link href="mailto:contact@wassaexpress.com" className="block p-3 bg-slate-800 backdrop-blur-sm rounded-lg border border-slate-700 shadow-sm hover:border-orange-500/50 transition-all duration-300 group">
              <Mail className="w-3.5 h-3.5 text-orange-500 mb-1.5" />
              <p className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                contact@wassaexpress.com
              </p>
            </Link>
          </div>
        </div>

        <div className="pt-8 pb-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} WassaExpress — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDark;