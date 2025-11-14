// app/layout.tsx
import FooterE from '@/components/FooterE';
import './globals.css';
import WassaNavbar from '@/components/Navbar';

export const metadata = {
 title: "Wassa Express — Expédition, Mobilité, Logement & Accompagnement",
description: "Plateforme innovante dédiée à l’expédition, à la mobilité, au logement et à l’accompagnement entre l’Afrique et l’international."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <WassaNavbar />   {/* ✅ maintenant dans <body> */}
        {children}
          <FooterE />
      </body>
    </html>
  );
}
