'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';

export default function PagamentoAllaConsegnaPage() {
  return (
    <SiteLayout className="bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="max-w-[1200px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                <span className="text-4xl">💵</span>
                <span className="text-lg font-bold">CONTRASSEGNO GRATUITO</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pagamento alla Consegna
              </h1>
              <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto">
                Il modo più sicuro e comodo per acquistare online. 
                Paghi solo quando ricevi il prodotto direttamente al corriere.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1200px] mx-auto px-4 py-12">
          {/* Come Funziona */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Come Funziona il Pagamento alla Consegna
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🛒</span>
                </div>
                <h3 className="font-bold text-lg mb-2">1. Ordina Online</h3>
                <p className="text-gray-600">
                  Scegli i tuoi prodotti e seleziona "Pagamento alla Consegna"
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📦</span>
                </div>
                <h3 className="font-bold text-lg mb-2">2. Preparazione</h3>
                <p className="text-gray-600">
                  Prepariamo il tuo ordine con cura e lo spediamo rapidamente
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="font-bold text-lg mb-2">3. Consegna</h3>
                <p className="text-gray-600">
                  Il corriere ti consegna il pacco a casa o al punto di ritiro
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💵</span>
                </div>
                <h3 className="font-bold text-lg mb-2">4. Pagamento</h3>
                <p className="text-gray-600">
                  Paghi direttamente al corriere in contanti (il corriere non dà resto)
                </p>
              </div>
            </div>
          </motion.section>

          {/* Vantaggi */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              I Vantaggi del Contrassegno
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Completamente Gratuito</h3>
                  <p className="text-gray-600">
                    Nessun costo aggiuntivo per il servizio di contrassegno. È completamente gratuito!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Massima Sicurezza</h3>
                  <p className="text-gray-600">
                    Non devi inserire dati bancari online. Paghi solo dopo aver ricevuto e verificato il prodotto.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Zero Rischi</h3>
                  <p className="text-gray-600">
                    Se il prodotto non arriva, non paghi, evitando potenziali truffe.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Ideale per Tutti</h3>
                  <p className="text-gray-600">
                    Perfetto per chi non ha carte di credito o preferisce non usarle online.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Informazioni Importanti */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
              <span className="text-3xl">⚠️</span>
              Informazioni Importanti sul Pagamento
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">1</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Preparare l'Importo Esatto</h3>
                  <p className="text-gray-700">
                    <strong className="text-red-600">Il corriere NON dà resto.</strong> È necessario avere l'importo esatto in contanti. 
                    Prepara i soldi contati prima dell'arrivo del corriere per evitare inconvenienti.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">2</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Solo Pagamento in Contanti</h3>
                  <p className="text-gray-700">
                    Il pagamento alla consegna è accettato esclusivamente in contanti. 
                    Non sono accettate carte di credito, bancomat o assegni al momento della consegna.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white font-bold text-xs">3</span>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Ricevuta via Email</h3>
                  <p className="text-gray-700">
                    Dopo il pagamento, riceverai automaticamente la ricevuta all'indirizzo email inserito nell'ordine. 
                    Conservala come prova dell'avvenuto pagamento.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            id="faq"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-900">
              Domande Frequenti
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Quanto costa il servizio di contrassegno?
                </h3>
                <p className="text-gray-600">
                  Il servizio è completamente gratuito! Non ci sono costi aggiuntivi per il pagamento alla consegna.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Cosa succede se non ho i soldi contati?
                </h3>
                <p className="text-gray-600">
                  Il corriere non può dare resto. Se non hai l'importo esatto, dovrai riprogrammare la consegna 
                  o trovare un modo per procurarti i soldi contati al momento.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Posso pagare con carta al corriere?
                </h3>
                <p className="text-gray-600">
                  No, il pagamento alla consegna è accettato solo in contanti. Se preferisci pagare con carta, 
                  devi effettuare il pagamento online al momento dell'ordine.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">
                  È disponibile per tutti gli ordini?
                </h3>
                <p className="text-gray-600">
                  Sì, il pagamento alla consegna è disponibile per tutti i prodotti del nostro catalogo 
                  senza limiti di importo minimo o massimo.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2">
                  Posso rifiutare la consegna?
                </h3>
                <p className="text-gray-600">
                  Puoi rifiutare la consegna SOLO se il pacco è evidentemente danneggiato. 
                  Se rifiuti per altri motivi, ti verranno addebitati i costi di gestione del contrassegno rifiutato.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Inizia a Comprare in Totale Sicurezza
            </h2>
            <p className="text-xl mb-8 text-green-50">
              Scegli il contrassegno gratuito e paga solo quando ricevi il tuo ordine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalogo"
                className="inline-block px-8 py-4 bg-white text-green-700 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Scopri il Catalogo
              </Link>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-400 transition-colors"
              >
                Torna alla Home
              </Link>
            </div>
          </motion.section>

          {/* Note di Sicurezza */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-bold text-lg mb-2">Nota sulla Sicurezza</h3>
                <p className="text-gray-700">
                  Il pagamento alla consegna è uno dei metodi più sicuri per acquistare online. 
                  Non dovrai mai fornire dati sensibili come numeri di carta di credito o coordinate bancarie. 
                  Tutti i nostri corrieri sono identificati e autorizzati. In caso di dubbi sull'identità 
                  del corriere, puoi sempre verificare contattando il nostro servizio clienti.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
    </SiteLayout>
  );
}