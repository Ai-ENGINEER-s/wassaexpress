// app/layout.tsx
import Footer from '@/components/Footer';
import './globals.css';
import WassaNavbar from '@/components/Navbar';

export const metadata = {
 title: "Wassa Express Expédition, Mobilité, Logement & Accompagnement",
description: "Plateforme innovante dédiée à l’expédition, à la mobilité, au logement et à l’accompagnement entre l’Afrique et l’international."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <WassaNavbar />  

        {children}
      <Footer />
      </body>
    </html>
  );
}
