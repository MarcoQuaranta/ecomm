'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrderConfirmedPage() {
  const searchParams = useSearchParams();
  const productSlug = searchParams.get('product');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Genera numero ordine casuale
    const num = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`ORD-${num}`);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            {/* Icona di successo */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ordine Confermato!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Grazie per il tuo acquisto. Abbiamo ricevuto il tuo ordine.
            </p>

            {/* Numero ordine */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Numero Ordine:</p>
              <p className="text-xl font-bold text-gray-900">{orderNumber}</p>
            </div>

            {/* Info pagamento */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-2xl">💵</span>
                <span className="font-bold text-gray-900">Pagamento alla Consegna</span>
              </div>
              <p className="text-sm text-gray-600">
                Ricorda di preparare l'importo esatto in contanti per il corriere.
              </p>
            </div>

            {/* Prossimi passi */}
            <div className="text-left mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Cosa succede ora?</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Riceverai un'email di conferma all'indirizzo fornito</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Il tuo ordine verrà preparato entro 24 ore</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Riceverai un SMS quando il pacco sarà in consegna</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Consegna prevista in 2-3 giorni lavorativi</span>
                </li>
              </ol>
            </div>

            {/* Contatti */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Per qualsiasi domanda sul tuo ordine, contatta il nostro{' '}
                <Link href="/assistenza" className="text-blue-600 hover:underline font-semibold">
                  Servizio Clienti
                </Link>
              </p>
            </div>

            {/* Pulsanti azione */}
            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold rounded-lg transition"
              >
                Torna alla Home
              </Link>
              
              <Link
                href="/catalogo"
                className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition"
              >
                Continua lo Shopping
              </Link>
            </div>
          </div>

          {/* Info aggiuntive */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Conserva il numero d'ordine per riferimenti futuri.
            </p>
            <p className="mt-2">
              Domande? Scrivici a{' '}
              <a href="mailto:supporto@bricoshop.it" className="text-blue-600 hover:underline">
                supporto@bricoshop.it
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}