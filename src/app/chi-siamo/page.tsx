'use client';

import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';
import siteConfig from '../../../site.config';

export default function ChiSiamoPage() {
  return (
    <SiteLayout className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Chi Siamo</h1>
          <p className="text-xl opacity-90">
            Scopri la nostra storia e i valori che ci guidano
          </p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Nostra Storia</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {siteConfig.siteName} nasce dalla passione per i prodotti di qualita e dal desiderio di offrire
              ai nostri clienti le migliori soluzioni per la casa e il fai da te. Da anni siamo
              presenti sul mercato italiano con un obiettivo chiaro: rendere accessibili a tutti
              prodotti innovativi a prezzi competitivi.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La nostra selezione viene curata attentamente, scegliendo solo articoli che rispettano
              i nostri standard di qualita e che possono realmente migliorare la vita quotidiana
              dei nostri clienti.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Nostra Missione</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Crediamo che ogni cliente meriti un&apos;esperienza d&apos;acquisto semplice, sicura e soddisfacente.
              Per questo ci impegniamo ogni giorno a:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Selezionare prodotti di qualita testati e garantiti</li>
              <li>Offrire prezzi competitivi e promozioni esclusive</li>
              <li>Garantire spedizioni rapide in tutta Italia</li>
              <li>Fornire un servizio clienti attento e disponibile</li>
              <li>Permettere il pagamento alla consegna per la massima sicurezza</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">I Nostri Valori</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-semibold text-gray-900 mb-2">Qualita</h3>
                <p className="text-sm text-gray-600">
                  Solo prodotti selezionati che superano i nostri rigorosi controlli
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="font-semibold text-gray-900 mb-2">Fiducia</h3>
                <p className="text-sm text-gray-600">
                  Pagamento alla consegna e politiche di reso trasparenti
                </p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-semibold text-gray-900 mb-2">Velocita</h3>
                <p className="text-sm text-gray-600">
                  Spedizioni rapide per ricevere i tuoi ordini in breve tempo
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perche Sceglierci</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pagamento alla Consegna</h4>
                  <p className="text-gray-600 text-sm">Paga comodamente quando ricevi il tuo ordine, senza rischi</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Spedizione Rapida 48h</h4>
                  <p className="text-gray-600 text-sm">Consegne veloci in tutta Italia con corriere espresso</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Assistenza Dedicata</h4>
                  <p className="text-gray-600 text-sm">Il nostro team e sempre pronto ad aiutarti prima e dopo l&apos;acquisto</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Garanzia Soddisfatti</h4>
                  <p className="text-gray-600 text-sm">Politiche di reso chiare e trasparenti per la tua tranquillita</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-8 border-t">
            <p className="text-gray-600 mb-4">
              Hai domande o vuoi saperne di piu?
            </p>
            <Link
              href="/assistenza"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
