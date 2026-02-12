'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, Battery, ChevronDown, ChevronLeft, ChevronRight, AlertTriangle, Leaf, TrendingDown, Plug } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function EnergySaverLanding() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('energysaver-offer-end');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('energysaver-offer-end', endTime.toString());
        return 57 * 60;
      }
    }
    return 57 * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/energy-saver/device-main.webp',
    '/images/energy-saver/plugged-in.webp',
    '/images/energy-saver/savings-chart.webp',
    '/images/energy-saver/protection.webp',
    '/images/energy-saver/green-light.webp',
  ];

  // Timer countdown (sempre attivo)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide (si ferma quando utente interagisce)
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, autoSlide]);

  const stopAutoSlide = () => setAutoSlide(false);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openOrderPopup = () => {
    document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Compila tutti i campi!');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: orderData.name.split(' ')[0] || orderData.name,
          lastName: orderData.name.split(' ').slice(1).join(' ') || '',
          phone: orderData.phone,
          address: orderData.address,
          product: 'Energy Saver Pro',
          price: 49,
          source: 'energy-saver',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/energysaver',
            value: 49,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-energysaver';
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Bolletta media mensile", energysaver: "€60-80", without: "€120-160" },
    { feature: "Sprechi di tensione", energysaver: "✓ Eliminati", without: "✗ 50% sprecato" },
    { feature: "Durata elettrodomestici", energysaver: "✓ Fino a 3x", without: "✗ Si rovinano" },
    { feature: "Rischio sbalzi tensione", energysaver: "✓ Neutralizzato", without: "✗ Alto" },
    { feature: "Danni da temporali", energysaver: "✓ Protetto", without: "✗ A rischio" },
    { feature: "Costo impianto nuovo", energysaver: "€49 una tantum", without: "€3.000-8.000" },
  ];

  const faqs = [
    {
      question: "Come fa a ridurre la bolletta?",
      answer: "Stabilizza la tensione ed elimina gli sprechi. Il 50% della bolletta sono perdite dovute a sbalzi e fluttuazioni. Energy Saver Pro le elimina alla fonte."
    },
    {
      question: "Come funziona?",
      answer: "Inserisci i 2 dispositivi nelle prese delle stanze con più consumi. Aspetta la luce verde. Fatto. Lavorano 24/7 senza bisogno di configurazione."
    },
    {
      question: "Perché non lo sapevo prima?",
      answer: "Chi ti vende energia guadagna di più se consumi di più. Non hanno interesse a farti risparmiare."
    },
    {
      question: "Devo pagare subito?",
      answer: "No, paghi al corriere alla consegna. Contanti o carta."
    },
    {
      question: "E se non mi piace?",
      answer: "Hai 30 giorni per restituirlo e riavere i soldi, senza domande."
    },
    {
      question: "Funziona con tutti gli impianti?",
      answer: "Sì, compatibile con qualsiasi impianto europeo (220-240V). Funziona ancora meglio con impianti datati."
    }
  ];

  const reviews = [
    { nome: 'Henrik S.', testo: 'Ero scettico ma i numeri parlano chiaro. Prima bolletta dopo 30 giorni: da 156€ a 71€. Ho ordinato altri 2 per la casa al mare e per mio figlio. Tecnologia americana che funziona davvero.', stelle: 5, data: '14 Dicembre 2025', risposta: 'Grazie Henrik! Risultati come i tuoi ci riempiono di orgoglio. Ottima scelta prenderne altri, ogni casa dovrebbe averne uno!' },
    { nome: 'Marta K.', testo: 'Da quando uso questo apparecchio non ho più avuto problemi con il frigorifero che si bloccava durante i temporali. Prima dovevo staccare tutto quando c\'era brutto tempo. Ora non ci penso più.', stelle: 5, data: '10 Dicembre 2025' },
    { nome: 'Johann P.', testo: 'Il mio impianto ha 25 anni e il tecnico mi aveva detto che servivano 5000€ per rifarlo. Con 49€ ho risolto il problema degli sprechi. Bolletta scesa da 180€ a 89€ al mese. Matematica semplice.', stelle: 5, data: '3 Dicembre 2025', risposta: 'Johann, la tua storia è esattamente il motivo per cui abbiamo creato Energy Saver Pro. Impianti vecchi = sprechi enormi, ma non serve spendere migliaia di euro. Grazie per la fiducia!' },
    { nome: 'Ingrid L.', testo: 'Ho 68 anni e vivo di pensione. Ogni euro conta. Questo dispositivo mi fa risparmiare circa 60€ al mese. Lo consiglio a tutti i pensionati che faticano a pagare le bollette sempre più care.', stelle: 5, data: '27 Novembre 2025', risposta: 'Cara Ingrid, ci hai commosso. Sapere che aiutiamo persone come te a risparmiare ci dà la forza di continuare. Un abbraccio!' },
    { nome: 'Lars B.', testo: 'Comprato per curiosità dopo aver letto un articolo online. Risultato: in 3 mesi si è già ripagato e ora sto guadagnando. La lavatrice e la lavastoviglie sembrano anche funzionare meglio.', stelle: 5, data: '19 Novembre 2025' },
    { nome: 'Anna W.', testo: 'Il televisore si è rotto due volte per colpa degli sbalzi di tensione. 400€ buttati. Se avessi avuto questo dispositivo prima... Ora sono tranquilla, protegge tutto. E risparmio anche in bolletta.', stelle: 5, data: '8 Novembre 2025', risposta: 'Anna, purtroppo sentiamo storie così ogni giorno. Gli sbalzi di tensione sono killer silenziosi per gli elettrodomestici. Siamo felici che ora tu sia protetta!' },
    { nome: 'Erik T.', testo: 'Gestisco 3 appartamenti in affitto. Ho messo Energy Saver Pro in tutti e 3. Gli inquilini sono contentissimi delle bollette più basse e io non devo più preoccuparmi dei danni agli elettrodomestici.', stelle: 5, data: '25 Ottobre 2025', risposta: 'Ottima strategia Erik! Inquilini felici = meno problemi. E proteggere gli elettrodomestici significa meno spese impreviste. Business smart!' },
    { nome: 'Katrin M.', testo: 'Prima credevo che le bollette alte dipendessero dal costo dell\'energia. Ora so che metà erano sprechi puri. Questo dispositivo me l\'ha fatto capire. Semplice, economico, efficace.', stelle: 4, data: '12 Ottobre 2025' },
    { nome: 'Olaf D.', testo: 'Mia moglie non ci credeva. L\'ho comprato di nascosto. Quando ha visto la bolletta mi ha chiesto cosa avevo fatto. Ora lei stessa lo consiglia a tutte le amiche. €52 risparmiati il primo mese.', stelle: 5, data: '3 Ottobre 2025', risposta: 'Olaf, questa storia ci ha fatto sorridere! Quando i risultati parlano, anche gli scettici si convincono. Salutaci tua moglie!' },
    { nome: 'Birgit H.', testo: 'Vivo in una vecchia casa di campagna con impianto elettrico degli anni \'70. Il tecnico voleva 8000€ per rifare tutto. Con Energy Saver Pro ho speso 49€ e risolto il problema. Bolletta dimezzata.', stelle: 5, data: '18 Settembre 2025', risposta: 'Birgit, la tua è una storia che dovrebbero sentire tutti! Gli impianti vecchi non vanno necessariamente rifatti, basta ottimizzarli. Grazie per averci scelto!' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-green-500 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <span>ORDINA ORA - €49</span>
            <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded">💳 Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        📦 Spedito in 48h – Pagamento alla Consegna
      </div>

      {/* Hero Title Section */}
      <section className="bg-white pt-6 pb-4 md:py-8 px-4 border-b">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-black text-[#0f1c3f] mb-4 leading-tight tracking-tight">
            STAI <span className="text-orange-500">BUTTANDO METÀ</span> DI OGNI BOLLETTA: ECCO COME <span className="text-orange-500">SMETTERE SUBITO</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-red-600 mb-4">
            Ogni mese paghi il doppio del necessario. Ti spieghiamo perché.
          </p>
          <p className="text-lg md:text-xl text-gray-700 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 inline-block">
            <strong>Tecnologia americana</strong> che <strong>stabilizza la tensione</strong>, elimina gli sprechi e <strong>protegge i tuoi elettrodomestici</strong> dai danni.
          </p>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden relative">
              <img
                src={slides[currentSlide]}
                alt="Energy Saver Pro"
                className="w-full h-full object-cover"
              />
              {/* Badge Ultimi Pezzi */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                🔥 Ultimi 7 kit disponibili
              </div>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                    i === currentSlide ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Bullet Points sotto la galleria - SOLO MOBILE */}
            <div className="bg-orange-100/20 rounded-xl p-5 text-left lg:hidden">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Bolletta Dimezzata:</strong> Elimina il 50% degli sprechi di tensione. Risultati visibili dalla prima bolletta.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Protegge gli Elettrodomestici:</strong> Neutralizza gli sbalzi di tensione che danneggiano e distruggono TV, frigoriferi, lavatrici.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Plug className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Installazione: 10 Secondi:</strong> Li inserisci nelle prese, aspetti la luce verde. Fatto. Nessun tecnico, nessun cavo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Tecnologia Americana:</strong> Sistema avanzato di stabilizzazione usato da anni negli USA, finalmente disponibile in Europa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Battery className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Si Ripaga in 2-3 Mesi:</strong> Con €50+ di risparmio mensile, Energy Saver Pro si ripaga da solo. Poi è tutto guadagno.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-green-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-sm font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center text-center leading-tight">
                -70%
              </div>

              {/* Titolo e Recensioni */}
              <h2 className="text-xl font-bold text-[#0f1c3f] text-center mb-2">
                Energy Saver Pro - 2 Stabilizzatori di Tensione
              </h2>
              <div
                className="flex items-center justify-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm underline">(3.241 recensioni)</span>
              </div>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-gray-400 line-through text-xl" style={{ fontFamily: 'var(--font-montserrat)' }}>€159</span>
                <span className="text-5xl font-black text-green-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€49</span>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                Ordina Ora - Paghi alla Consegna
              </button>

              <p className="text-center text-red-600 font-bold mt-3">
                ⏱️ Scade tra: {formatTime(timeLeft)}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Garanzia 24 mesi</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Reso 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>

            {/* Bullet Points - SOLO DESKTOP */}
            <div className="hidden lg:block bg-orange-100/20 rounded-xl p-5 text-left">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Bolletta Dimezzata:</strong> Elimina il 50% degli sprechi di tensione. Risultati visibili dalla prima bolletta.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Protegge gli Elettrodomestici:</strong> Neutralizza gli sbalzi di tensione che danneggiano e distruggono TV, frigoriferi, lavatrici.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Plug className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Installazione: 10 Secondi:</strong> Li inserisci nelle prese, aspetti la luce verde. Fatto. Nessun tecnico, nessun cavo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Tecnologia Americana:</strong> Sistema avanzato di stabilizzazione usato da anni negli USA, finalmente disponibile in Europa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Battery className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Si Ripaga in 2-3 Mesi:</strong> Con €50+ di risparmio mensile, Energy Saver Pro si ripaga da solo. Poi è tutto guadagno.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Striscia Spedizione Assicurata */}
      <div className="bg-slate-800 text-white py-3 text-center text-sm font-medium">
        📦 <strong>Spedizione Express Assicurata</strong> - se il pacco è danneggiato, lo sostituiamo senza farti sborsare un euro.
      </div>

      {/* SEZIONE SHOCK: IL PROBLEMA CHE NON TI DICONO */}
      <section className="py-8 md:py-12 bg-red-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-red-700 tracking-tight">
            DOVE FINISCONO I TUOI SOLDI?
          </h2>
          <p className="text-lg text-gray-700 text-center mb-4 md:mb-8">
            <strong className="text-red-900">Il 50% della tua bolletta sono sprechi</strong>. Non è un complotto, sono <strong>impianti vecchi</strong>; i fornitori di energia <strong>non hanno nessun vantaggio</strong> nel darti una soluzione.
          </p>

          {/* Schema Visivo Sprechi */}
          <div className="bg-white rounded-2xl p-4 md:p-8 shadow-xl border-2 border-red-200 mb-4 md:mb-8">
            <h3 className="text-xl md:text-2xl font-black text-center text-[#0f1c3f] mb-4 md:mb-6">
              ECCO DOVE FINISCONO I TUOI SOLDI
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 items-center">
              {/* Senza Energy Saver */}
              <div className="bg-red-100 rounded-xl p-3 md:p-5 text-center border-2 border-red-300">
                <div className="text-5xl md:text-6xl font-black text-red-600 mb-1 md:mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>€2</div>
                <p className="text-red-800 font-bold text-base md:text-lg mb-1 md:mb-2">PAGHI</p>
                <div className="space-y-1 text-sm text-red-700">
                  <p>€1 = Energia usata</p>
                  <p className="font-bold text-red-600">€1 = SPRECHI DI TENSIONE</p>
                </div>
                <div className="mt-2 md:mt-3 bg-red-200 rounded-lg p-2">
                  <p className="text-xs font-bold text-red-800">SENZA ENERGY SAVER</p>
                </div>
              </div>

              {/* Freccia Mobile (verso il basso) */}
              <div className="flex md:hidden flex-col items-center justify-center py-1">
                <p className="text-green-700 font-bold text-sm mb-1">TRASFORMA</p>
                <div className="text-4xl font-black text-green-600">↓</div>
              </div>

              {/* Freccia Desktop (verso destra) */}
              <div className="hidden md:flex flex-col items-center justify-center">
                <p className="text-green-700 font-bold text-sm mb-2">TRASFORMA</p>
                <div className="text-4xl font-black text-green-600">→</div>
              </div>

              {/* Con Energy Saver */}
              <div className="bg-green-100 rounded-xl p-3 md:p-5 text-center border-2 border-green-400">
                <div className="text-5xl md:text-6xl font-black text-green-600 mb-1 md:mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>€1</div>
                <p className="text-green-800 font-bold text-base md:text-lg mb-1 md:mb-2">PAGHI</p>
                <div className="space-y-1 text-sm text-green-700">
                  <p>€1 = Energia usata</p>
                  <p className="font-bold text-green-600">€0 = ZERO SPRECHI</p>
                </div>
                <div className="mt-2 md:mt-3 bg-green-200 rounded-lg p-2">
                  <p className="text-xs font-bold text-green-800">CON ENERGY SAVER PRO</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-8 text-center">
              <p className="text-xl md:text-2xl font-black text-[#0f1c3f]">
                Per ogni <span className="text-green-600">€1 di corrente</span> che usi, ne stai <span className="text-red-600">buttando un altro</span> in sprechi.
              </p>
            </div>
          </div>

          {/* Box Impianto Vecchio */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-amber-900">
                  <strong>Il tuo impianto è vecchio</strong> e non gestisce i consumi moderni. Rifare l'impianto costa <strong>€3.000 - €8.000</strong>. Energy Saver Pro risolve il problema con <strong>€49</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCOPRI I BENEFICI - 6 Box */}
      <section className="py-12 bg-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-[#0f1c3f] tracking-tight">
            ECCO COSA OTTIENI<br />CON ENERGY SAVER PRO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Box 1 - Bolletta Dimezzata */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/bolletta-risparmio.webp" alt="Risparmio bolletta" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">BOLLETTA DIMEZZATA</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Elimina gli sprechi di tensione che ti fanno pagare il <strong>doppio del necessario</strong>. Clienti reali riportano risparmi da <strong>€30 a €50 al mese</strong>. Risultati dalla prima bolletta.
                </p>
              </div>
            </div>

            {/* Box 2 - Elettrodomestici Durano il Triplo */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/elettrodomestici.webp" alt="Elettrodomestici protetti" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ELETTRODOMESTICI DURANO IL TRIPLO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Gli sbalzi di tensione <strong>uccidono silenziosamente</strong> i tuoi elettrodomestici. TV, frigoriferi, lavatrici: <strong>un temporale e devi ricomprarli</strong>. Con Energy Saver Pro durano fino a 3 volte di più.
                </p>
              </div>
            </div>

            {/* Box 3 - Installazione */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/installazione-presa.webp" alt="Installazione facile" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ATTACCA E VIA</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Zero installazione, zero tecnici, zero complicazioni.</strong> Inserisci nella presa, aspetta la luce verde, dimenticati delle bollette alte. Funziona in 5 secondi.
                </p>
              </div>
            </div>

            {/* Box 4 - Batteria Cellulare */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/smartphone-carica.webp" alt="Smartphone in carica" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">BATTERIA DEL CELLULARE 3x</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Ogni volta che carichi il telefono con tensione instabile, <strong>la batteria si degrada</strong>. Senza sbalzi di tensione, la batteria del tuo smartphone <strong>dura fino a 3 volte di più</strong>. Addio sostituzioni.
                </p>
              </div>
            </div>

            {/* Box 5 - Protezione Temporali */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/temporale.webp" alt="Protezione temporali" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">ADDIO PANICO DA TEMPORALE</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Basta correre a <strong>staccare tutto quando c'è maltempo</strong>. Energy Saver Pro protegge dai picchi di tensione. <strong>Dormi tranquillo</strong> anche durante i temporali.
                </p>
              </div>
            </div>

            {/* Box 6 - Ecologia */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-green-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/energy-saver/ecologia.webp" alt="Sostenibilità ambientale" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">FAI LA TUA PARTE</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Meno sprechi = meno energia prodotta = <strong>meno CO2 nell'atmosfera</strong>. Non solo risparmi: <strong>contribuisci a un pianeta più pulito</strong>. Fai qualcosa di cui essere fiero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Installazione Semplicissima */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 md:mb-4 text-[#0f1c3f] tracking-wide">
            INSTALLAZIONE? 5 SECONDI. SUL SERIO.
          </h2>
          <p className="text-lg text-gray-600 text-center mb-5 md:mb-10">
            Non servono tecnici, non servono competenze. Lo fa chiunque.
          </p>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-4 md:p-8 border-2 border-green-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">INSERISCI</h3>
                <p className="text-gray-700">
                  Inserisci i <strong>2 Energy Saver Pro</strong> nelle stanze con più elettrodomestici e consumi (cucina, soggiorno, lavanderia).
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">ASPETTA</h3>
                <p className="text-gray-700">
                  Attendi <strong>qualche secondo</strong> che si attivino. Vedrai accendersi la <strong>luce verde</strong>: sono pronti.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">RISPARMIA</h3>
                <p className="text-gray-700">
                  <strong>Finito.</strong> Lavorano 24/7 silenziosamente. Tu aspetti la <strong>bolletta dimezzata</strong>.
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-8 text-center bg-white rounded-xl p-3 md:p-4 border-2 border-green-400">
              <p className="text-base md:text-xl font-black text-green-700">
                Tempo totale: 10 secondi. Nessun tecnico. Nessun cavo. Nessuna complicazione.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            I NUMERI NON MENTONO
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Guarda tu stesso quanto stai perdendo ogni mese
          </p>
          <div className="mb-8 overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden text-sm md:text-base">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left w-[40%]"></th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-green-600 w-[30%]">
                    <div className="font-bold text-sm md:text-base">Con Energy Saver</div>
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-red-500 w-[30%]">
                    <div className="font-bold text-sm md:text-base">Senza Energy Saver</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-3 md:px-6 py-2 md:py-3 font-semibold text-slate-900 text-sm md:text-base">{row.feature}</td>
                    <td className="px-3 md:px-6 py-2 md:py-3 text-center font-bold text-sm md:text-base text-green-700 bg-green-50">
                      {row.energysaver}
                    </td>
                    <td className="px-3 md:px-6 py-2 md:py-3 text-center text-red-600 text-sm md:text-base bg-red-50">{row.without}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency Strip */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            🔥 Solo 7 kit rimasti - SCONTO 70%: 2 Energy Saver Pro a soli €49
          </p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-green-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            Lo voglio, ordina ora
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-[#035aa6]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2 tracking-wide">
            COSA DICONO I CLIENTI
          </h2>
          <p className="text-center text-white/80 mb-8">3.241 recensioni verificate</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {review.nome[0]}
                  </div>
                  <div>
                    <p className="font-bold text-[#0f1c3f]">{review.nome}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(review.stelle)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded block mb-1">✓ Verificato</span>
                    <span className="text-xs text-gray-500">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.testo}</p>
                {review.risposta && (
                  <div className="mt-3 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
                    <p className="text-xs font-semibold text-blue-700 mb-1">Risposta del venditore:</p>
                    <p className="text-gray-600 text-sm">{review.risposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 3, reviews.length))}
                className="bg-white text-[#035aa6] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Vedi altre recensioni
              </button>
            </div>
          )}

          <p className={`text-center text-white/70 mt-6 text-sm ${visibleReviews >= reviews.length ? 'block' : 'hidden'} md:block`}>
            La lista completa delle recensioni è disponibile sul sito ufficiale.
          </p>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-[#0f1c3f] mb-6 text-center tracking-wide">
            COME ORDINARE
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">1</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo con i tuoi dati</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">2</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per confermare l'ordine</p>
            </div>
            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">3</div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h e paghi alla consegna</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modulo d'Ordine */}
      <section id="order-form-section" className="bg-[#035aa6] py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center tracking-wide">
            MODULO D'ORDINE
          </h2>
          <p className="text-white/80 mb-6 text-center">
            Compila per ricevere il kit 2x Energy Saver Pro al 70% di sconto
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0f1c3f]">2x Energy Saver Pro</span>
                  <div className="mt-1">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">🎁 SCONTO 70%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block" style={{ fontFamily: 'var(--font-montserrat)' }}>€159</span>
                  <span className="text-2xl font-black text-green-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€49</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-center">
              <p className="text-red-700 font-medium">
                ⏱️ L'offerta scade tra: <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <div className="space-y-4 mb-5">
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="Mario Rossi"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Telefono (Cellulare) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="333 1234567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-[#0f1c3f] font-semibold mb-2">Indirizzo Completo *</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#035aa6] focus:border-[#035aa6] text-lg"
                  placeholder="Via, Numero Civico, CAP, Città"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Payment Badge */}
            <div className="flex items-center justify-center gap-2 mb-5 text-gray-600">
              <span>💳</span>
              <span className="font-medium">Pagamento alla consegna</span>
              <span className="text-green-500">✓</span>
              <span>Nessun anticipo</span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-4 rounded-xl font-bold text-lg transition duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white cursor-pointer shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : <><span>CONFERMA ORDINE</span><ChevronRight className="w-5 h-5" /></>}
            </button>

            {/* Data Protection */}
            <p className="text-center text-gray-500 text-xs mt-4">
              🔒 I tuoi dati sono al sicuro e verranno usati solo per la spedizione
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#035aa6] py-8 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-white tracking-wide">
            DOMANDE FREQUENTI
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-[#0f1c3f]">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
