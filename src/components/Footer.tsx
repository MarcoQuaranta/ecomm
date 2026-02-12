'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import siteConfig from '../../site.config';

export default function Footer() {
  const [isScanning, setIsScanning] = useState(false);

  const handleRefresh = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/scan-landings', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        // Ricarica la pagina per vedere i nuovi prodotti
        window.location.reload();
      } else {
        alert('Errore durante l\'aggiornamento');
      }
    } catch {
      alert('Errore di connessione');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <footer className="w-full text-gray-300 bg-slate-900">
      <div className="py-2 text-center bg-slate-700">
        <a href="#" className="text-white hover:underline">Torna su</a>
      </div>
      <div className="max-w-[1500px] mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4">Conoscici</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/chi-siamo" className="hover:text-white">Chi siamo</Link></li>
              <li><Link href="/assistenza" className="hover:text-white">Contattaci</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Informative</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/termini-e-condizioni" className="hover:text-white">Termini e Condizioni</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
              <li><Link href="/politiche-spedizione" className="hover:text-white">Politiche di Spedizione</Link></li>
              <li><Link href="/politiche-reso" className="hover:text-white">Politiche di Reso</Link></li>
              <li><Link href="/garanzia" className="hover:text-white">Garanzia</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Pagamenti</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pagamento-alla-consegna" className="hover:text-white">Modalita di pagamento</Link></li>
              <li><Link href="/pagamento-alla-consegna" className="hover:text-white font-bold text-green-400">Contrassegno</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Bisogno di aiuto?</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/assistenza" className="hover:text-white">Traccia il tuo ordine</Link></li>
              <li><Link href="/politiche-spedizione" className="hover:text-white">Spedizioni</Link></li>
              <li><Link href="/politiche-reso" className="hover:text-white">Resi e sostituzioni</Link></li>
              <li><Link href="/assistenza" className="hover:text-white">Servizio Clienti</Link></li>
              <li><Link href="/assistenza" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 py-6">
        <div className="max-w-[1500px] mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt={siteConfig.siteName}
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} {siteConfig.companyName} - P.IVA {siteConfig.vatNumber}</p>
          <button
            onClick={handleRefresh}
            disabled={isScanning}
            className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-50"
          >
            {isScanning ? 'Aggiornamento...' : 'Aggiorna sito'}
          </button>
        </div>
      </div>
    </footer>
  );
}
