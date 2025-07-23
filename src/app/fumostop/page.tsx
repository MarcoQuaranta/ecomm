'use client'
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Shield, Users, Star, AlertCircle, ChevronRight, XCircle } from 'lucide-react';

export default function FumoStopAdvertorial() {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 37);
  const [viewCount, setViewCount] = useState(2847);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    const viewTimer = setInterval(() => {
      setViewCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 15000);

    return () => {
      clearInterval(timer);
      clearInterval(viewTimer);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breaking News Bar */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
        🔴 NOTIZIA DELL'ULTIMA ORA • {mounted ? viewCount.toLocaleString() : '2,847'} persone stanno leggendo questo articolo
      </div>

      <div className="max-w-[1350px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="text-left mb-8">
              <div className="text-gray-500 text-sm mb-2">ESCLUSIVA • SALUTE & BENESSERE</div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                "Nuova Ricerca sui Meccanismi Naturali": Studio Evidenzia Potenziale degli Estratti Vegetali nella Cessazione del Fumo
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Ricerca osservazionale mostra risultati promettenti con integratore a base naturale per il supporto nella riduzione della dipendenza da nicotina
              </p>
              <div className="text-sm text-gray-500">
                Pubblicato oggi • Tempo di lettura: 3 min
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
              <span className="text-gray-500">[IMMAGINE: Laboratorio ricerca + FumoStop]</span>
            </div>

            {/* Intro Scoop */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg leading-relaxed mb-6">
                <strong>Roma, 23 Luglio 2025</strong> - Secondo fonti del settore nutraceutico, negli ultimi mesi è emersa una ricerca che sta attirando l'attenzione di esperti e consumatori: alcuni studi preliminari suggeriscono che specifici estratti naturali potrebbero supportare il processo di cessazione del fumo attraverso meccanismi neurobiologici innovativi.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                La ricerca si concentra su <strong>FumoStop</strong>, un integratore alimentare a base di estratti vegetali che, secondo gli sviluppatori, aiuterebbe a ridurre la dipendenza da nicotina in un periodo di 30 giorni attraverso un approccio completamente naturale.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Ma cosa dicono effettivamente gli studi su questo prodotto? E quali sono i meccanismi d'azione proposti?
              </p>

              <p className="text-lg leading-relaxed mb-6">
                In sintesi, la ricerca suggerisce che <strong>FumoStop agirebbe sui recettori dell'acetilcolina</strong>, un neurotrasmettitore che il cervello sostituisce naturalmente con la nicotina nei fumatori. Gli estratti naturali "comunicherebbero" al sistema nervoso che non è più necessario cercare questa sostituzione esterna. <em>Approfondiremo questo meccanismo più avanti nell'articolo.</em>
              </p>

              <p className="text-lg leading-relaxed mb-8">
                Prima però, vediamo concretamente <strong>cosa cambia tra un fumatore e una persona che ha smesso</strong> di fumare.
              </p>
            </div>

            {/* Before/After Creative Comparison */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Cosa cambierà se smetti di fumare?
                </h2>
                <p className="text-lg text-gray-600">
                  Cosa succede se smetti di fumare oggi, grazie a FumoStop?
                </p>
              </div>

              <div className="relative overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-1">
                  {/* QUANDO FUMI */}
                  <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-8 rounded-l-3xl lg:rounded-r-none rounded-r-3xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-800 rounded-full blur-3xl opacity-30"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">⚠️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-red-400">Quando fumi</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start border-l-4 border-red-500 pl-4 py-2">
                          <span className="text-2xl mr-3">🫁</span>
                          <p className="text-gray-300">
                            <strong className="text-red-400">Polmoni neri e malati</strong>, fiato corto, tosse continua
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-red-500 pl-4 py-2">
                          <span className="text-2xl mr-3">💀</span>
                          <p className="text-gray-300">
                            Rischio cancro altissimo: <strong className="text-red-400">3 fumatori su 10</strong> lo sviluppano
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-red-500 pl-4 py-2">
                          <span className="text-2xl mr-3">🦷</span>
                          <p className="text-gray-300">
                            <strong className="text-red-400">Denti gialli</strong>, alito pesante, pelle invecchiata
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-red-500 pl-4 py-2">
                          <span className="text-2xl mr-3">💸</span>
                          <p className="text-gray-300">
                            Sperperi <strong className="text-red-400">centinaia di euro</strong> ogni mese
                          </p>
                        </div>

                        <div className="bg-red-900/30 p-4 rounded-lg mt-6">
                          <p className="text-red-200 font-semibold italic">
                            "Tutto questo per qualcosa di inutile e dannoso da cui pensi di non poter uscire..."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UN MESE DOPO */}
                  <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white p-8 rounded-r-3xl lg:rounded-l-none rounded-l-3xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-yellow-300 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-40"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">✨</span>
                        </div>
                        <h3 className="text-2xl font-bold text-yellow-100">Un mese dopo aver smesso</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start border-l-4 border-yellow-300 pl-4 py-2">
                          <span className="text-2xl mr-3">🌱</span>
                          <p className="text-green-100">
                            <strong className="text-yellow-200">Polmoni che si rigenerano</strong>, respiro libero e profondo
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-yellow-300 pl-4 py-2">
                          <span className="text-2xl mr-3">🛡️</span>
                          <p className="text-green-100">
                            Rischio cancro ridotto del <strong className="text-yellow-200">95%</strong>
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-yellow-300 pl-4 py-2">
                          <span className="text-2xl mr-3">😊</span>
                          <p className="text-green-100">
                            <strong className="text-yellow-200">Denti bianchi</strong>, alito fresco, pelle giovane
                          </p>
                        </div>

                        <div className="flex items-start border-l-4 border-yellow-300 pl-4 py-2">
                          <span className="text-2xl mr-3">💰</span>
                          <p className="text-green-100">
                            Risparmi <strong className="text-yellow-200">migliaia di euro</strong> all'anno
                          </p>
                        </div>

                        <div className="bg-yellow-400/20 p-4 rounded-lg mt-6">
                          <p className="text-yellow-100 font-semibold italic">
                            "La soddisfazione di aver sconfitto ciò che ti stava distruggendo!"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                    <span className="mr-2">🚀</span>
                    Trasformazione in soli 30 giorni
                    <span className="ml-2">🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How FumoStop Works */}
            <div className="bg-blue-50 rounded-2xl p-8 mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Come funziona FumoStop? La ricerca scientifica
                </h2>
                <p className="text-sm text-gray-600 italic">
                  *FumoStop è a base di estratti naturali
                </p>
              </div>

              <div className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  <strong>Studi preliminari</strong> hanno evidenziato come specifici estratti naturali presenti in FumoStop possano supportare la produzione endogena di <strong>acetilcolina</strong>, un neurotrasmettitore fondamentale per il benessere cerebrale.
                </p>
                <p>
                  Il principio teorico è che questi estratti vegetali aiutino a <strong>"comunicare" al cervello</strong> che non necessita della nicotina come sostituto dell'acetilcolina naturale, supportando così il processo fisiologico di disintossicazione.
                </p>
                <p>
                  <strong>Ricerche osservazionali</strong> condotte su un campione di 500 volontari hanno mostrato una riduzione significativa del desiderio di fumare nel 87% dei partecipanti dopo 4 settimane di utilizzo costante.
                </p>
                <p>
                  In più, essendo a base di estratti naturali, FumoStop non presenta i tipici effetti collaterali associati ad altri metodi, come aumento di peso o irritabilità.
                </p>
                <p className="font-semibold text-blue-800 bg-blue-100 p-4 rounded-lg">
                  <strong>Importante:</strong> FumoStop è a base di estratti vegetali. I risultati possono variare da individuo a individuo e si consiglia sempre di consultare un medico prima dell'uso.
                </p>
              </div>
            </div>

            {/* Limited Offer */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  OFFERTA LIMITATA - Solo per i primi 500 ordini
                </div>

                <h2 className="text-3xl font-bold mb-4">Offerta Esclusiva Scade Tra:</h2>

                <div className="text-6xl font-mono font-bold mb-6 text-yellow-300">
                  {mounted ? formatTime(timeLeft) : '14:37'}
                </div>

                <div className="flex items-center justify-center gap-8 text-lg mb-6">
                  <div className="text-red-200 line-through">€79,98</div>
                  <div className="text-5xl font-bold text-yellow-300">€19,99</div>
                  <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">-75%</div>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 px-8 rounded-full text-xl transition-colors">
                  🛒 ORDINA FUMOSTOP ORA - €19,99
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop only */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <div className="border-t-4 border-black mb-4">
                <h3 className="text-2xl font-bold text-black bg-white px-0 py-2">Leggi anche</h3>
              </div>
              <div className="border-t border-gray-300 mb-6"></div>

              <div className="space-y-6">
                <article className="border-b border-gray-200 pb-6">
                  <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
                  <h4 className="font-bold text-lg leading-tight mb-2 hover:text-blue-600 cursor-pointer">
                    Nuova ricerca sui benefici della meditazione per il cuore
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Dr. Marco Rossi</p>
                    <div className="w-16 h-16 bg-blue-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">[IMG]</span>
                    </div>
                  </div>
                </article>

                <article className="border-b border-gray-200 pb-6">
                  <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
                  <h4 className="font-bold text-lg leading-tight mb-2 hover:text-blue-600 cursor-pointer">
                    Alimentazione anti-infiammatoria: la guida completa
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Dott.ssa Elena Bianchi</p>
                    <div className="w-16 h-16 bg-green-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">[IMG]</span>
                    </div>
                  </div>
                </article>

                <article className="border-b border-gray-200 pb-6">
                  <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
                  <h4 className="font-bold text-lg leading-tight mb-2 hover:text-blue-600 cursor-pointer">
                    Sonno e prestazioni cognitive: i risultati sorprendenti
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Prof. Andrea Verdi</p>
                    <div className="w-16 h-16 bg-purple-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">[IMG]</span>
                    </div>
                  </div>
                </article>

                <article className="pb-6">
                  <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
                  <h4 className="font-bold text-lg leading-tight mb-2 hover:text-blue-600 cursor-pointer">
                    Attività fisica dopo i 50: consigli degli esperti
                  </h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Dott. Giuseppe Neri</p>
                    <div className="w-16 h-16 bg-orange-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                      <span className="text-xs text-gray-500">[IMG]</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar - Bottom */}
        <div className="lg:hidden mt-12">
          <div className="border-t-4 border-black mb-4">
            <h3 className="text-2xl font-bold text-black bg-white px-0 py-2">Leggi anche</h3>
          </div>
          <div className="border-t border-gray-300 mb-6"></div>

          <div className="space-y-6">
            <article className="border-b border-gray-200 pb-6">
              <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
              <h4 className="font-bold text-lg leading-tight mb-2">
                Nuova ricerca sui benefici della meditazione per il cuore
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Dr. Marco Rossi</p>
                <div className="w-16 h-16 bg-blue-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">[IMG]</span>
                </div>
              </div>
            </article>

            <article className="border-b border-gray-200 pb-6">
              <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
              <h4 className="font-bold text-lg leading-tight mb-2">
                Alimentazione anti-infiammatoria: la guida completa
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Dott.ssa Elena Bianchi</p>
                <div className="w-16 h-16 bg-green-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">[IMG]</span>
                </div>
              </div>
            </article>

            <article className="border-b border-gray-200 pb-6">
              <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
              <h4 className="font-bold text-lg leading-tight mb-2">
                Sonno e prestazioni cognitive: i risultati sorprendenti
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Prof. Andrea Verdi</p>
                <div className="w-16 h-16 bg-purple-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">[IMG]</span>
                </div>
              </div>
            </article>

            <article className="pb-6">
              <div className="text-xs font-semibold text-blue-600 mb-2">SALUTE & BENESSERE</div>
              <h4 className="font-bold text-lg leading-tight mb-2">
                Attività fisica dopo i 50: consigli degli esperti
              </h4>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Dott. Giuseppe Neri</p>
                <div className="w-16 h-16 bg-orange-100 rounded flex-shrink-0 ml-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">[IMG]</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        {/* Newsletter Section */}
        <div className="bg-green-600 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h3 className="text-3xl font-bold text-white mb-4">
              Rimani Aggiornato
            </h3>
            <p className="text-green-100 text-lg mb-8">
              Iscriviti alla nostra newsletter per offerte esclusive e novità naturali.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="La tua email"
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-green-300 outline-none"
              />
              <button className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors">
                Iscriviti
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="bg-gray-800 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <h4 className="text-xl font-bold mb-4">Erboristeria Urbino</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Via Manzoni 12</p>
                  <p>Email: info@erboristeriaurbin o.com</p>
                </div>
              </div>

              {/* Links */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold mb-4">Link Utili</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Prodotti</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contatti</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                </ul>
              </div>

              {/* Social */}
              <div className="md:col-span-1">
                <h4 className="text-lg font-semibold mb-4">Seguici</h4>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs">FB</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center">
                    <span className="text-xs">TW</span>
                  </div>
                  <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                    <span className="text-xs">IG</span>
                  </div>
                </div>
              </div>

              {/* Empty column for spacing */}
              <div className="md:col-span-1"></div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Erboristeria Agrigento - Tutti i diritti riservati.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}