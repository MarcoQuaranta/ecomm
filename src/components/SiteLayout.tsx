'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SiteLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Layout wrapper per le pagine del sito.
 * Include automaticamente Header e Footer.
 *
 * Uso:
 * ```tsx
 * import SiteLayout from '@/components/SiteLayout';
 *
 * export default function MiaPagina() {
 *   return (
 *     <SiteLayout>
 *       <div>Contenuto della pagina</div>
 *     </SiteLayout>
 *   );
 * }
 * ```
 */
export default function SiteLayout({ children, className = '' }: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className={`min-h-screen ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
