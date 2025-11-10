// app/layout.tsx
import FooterE from '@/components/FooterE';
import './globals.css';
import WassaNavbar from '@/components/Navbar';

export const metadata = {
  title: 'DIEBENU & PARTNERS - Conseil, Formation & Études Internationales',
  description: "Cabinet international d'études, de conseil et de formation professionnelle. Building a better world, together.",
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
