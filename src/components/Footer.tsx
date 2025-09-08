import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full text-gray-300" style={{ backgroundColor: 'var(--color-footer)' }}>
      <div className="py-2 text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <a href="#" className="text-white hover:underline">Torna su</a>
      </div>
      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Conoscici meglio</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Chi siamo</Link></li>
              <li><Link href="#" className="hover:text-white">Lavora con noi</Link></li>
              <li><Link href="#" className="hover:text-white">Informazioni aziendali</Link></li>
              <li><Link href="#" className="hover:text-white">Il nostro impegno</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Guadagna con noi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Vendi su BricoShop</Link></li>
              <li><Link href="#" className="hover:text-white">Diventa affiliato</Link></li>
              <li><Link href="#" className="hover:text-white">Logistica di BricoShop</Link></li>
              <li><Link href="#" className="hover:text-white">Promuovi i tuoi prodotti</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Metodi di pagamento</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Carte di credito e debito</Link></li>
              <li><Link href="#" className="hover:text-white">PayPal</Link></li>
              <li><Link href="#" className="hover:text-white">Apple Pay</Link></li>
              <li><Link href="#" className="hover:text-white">Buoni regalo</Link></li>
              <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold" style={{ color: 'var(--color-success)' }}>💵 Contrassegno Gratuito</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Bisogno di aiuto?</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white">Visualizza o traccia ordini</Link></li>
              <li><Link href="/politiche-spedizione" className="hover:text-white">Costi e modalità di spedizione</Link></li>
              <li><Link href="/politiche-reso" className="hover:text-white">Restituisci o sostituisci articoli</Link></li>
              <li><Link href="#" className="hover:text-white">Servizio Clienti</Link></li>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-[1500px] mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>BricoShop</div>
          <div className="flex justify-center gap-4 text-xs text-gray-400">
            <Link href="/termini-e-condizioni" className="hover:text-white">Condizioni d&apos;uso</Link>
            <Link href="/privacy-policy" className="hover:text-white">Informativa sulla privacy</Link>
            <Link href="/cookie-policy" className="hover:text-white">Cookie</Link>
            <Link href="/politiche-spedizione" className="hover:text-white">Spedizioni</Link>
            <Link href="/politiche-reso" className="hover:text-white">Resi</Link>
            <Link href="/garanzia" className="hover:text-white">Garanzia</Link>
          </div>
          <p className="text-xs text-gray-400 mt-4">© {new Date().getFullYear()} BricoShop - P.IVA 01234567890</p>
        </div>
      </div>
    </footer>
  );
}