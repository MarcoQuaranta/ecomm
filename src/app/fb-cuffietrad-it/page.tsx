'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, Battery, ChevronDown, ChevronLeft, ChevronRight, Globe, Headphones, Mic, Plane } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function TranslatorEarbudsLanding() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('translator-offer-end');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('translator-offer-end', endTime.toString());
        return 57 * 60;
      }
    }
    return 57 * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);

  const languages = [
    "Afrikaans", "Albanese", "Amarico", "Arabo", "Armeno", "Assamese", "Azero",
    "Bambara", "Basco", "Bengalese", "Bielorusso", "Birmano", "Bosniaco", "Bulgaro",
    "Cambogiano", "Cantonese", "Catalano", "Ceco", "Cebuano", "Chichewa", "Cinese Mandarino",
    "Cingalese", "Coreano", "Corso", "Creolo Haitiano", "Croato", "Curdo", "Danese",
    "Dari", "Dhivehi", "Dogri", "Ebraico", "Esperanto", "Estone", "Ewe",
    "Filippino", "Finlandese", "Francese", "Frisone", "Gaelico Scozzese", "Galiziano", "Gallese",
    "Georgiano", "Giapponese", "Giavanese", "Greco", "Groenlandese", "Guaranì", "Gujarati",
    "Hausa", "Hawaiano", "Hindi", "Hmong", "Igbo", "Ilocano", "Indonesiano",
    "Inglese", "Irlandese", "Islandese", "Italiano", "Kannada", "Kazako", "Khmer",
    "Kinyarwanda", "Kirghiso", "Konkani", "Krio", "Lao", "Latino", "Lettone",
    "Lingala", "Lituano", "Luganda", "Lussemburghese", "Macedone", "Maithili", "Malayalam",
    "Malese", "Malgascio", "Maltese", "Maori", "Marathi", "Meitei", "Mongolo",
    "Nepalese", "Norvegese", "Odia", "Olandese", "Oromo", "Pashto", "Persiano",
    "Polacco", "Portoghese", "Punjabi", "Quechua", "Romeno", "Russo", "Samoano",
    "Sanscrito", "Sepedi", "Serbo", "Sesotho", "Shona", "Sindhi", "Slovacco",
    "Sloveno", "Somalo", "Spagnolo", "Sundanese", "Svedese", "Swahili", "Tagico",
    "Tamil", "Tartaro", "Tedesco", "Telugu", "Thai", "Tigrino", "Tsonga",
    "Turco", "Turkmeno", "Twi", "Ucraino", "Uiguro", "Ungherese", "Urdu",
    "Uzbeco", "Vietnamita", "Xhosa", "Yiddish", "Yoruba", "Zulu"
  ];

  const slides = [
    '/images/cuffie/1.png',
    '/images/cuffie/2.png',
    '/images/cuffie/3.png',
    '/images/cuffie/4.png',
    '/images/cuffie/5.png',
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-slide
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
          product: 'Translator Earbuds Pro',
          price: 89,
          source: 'cuffie-trad',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/translator',
            value: 89,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-translator';
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Errore durante l\'invio. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Lingue parlate", translator: "✓ 144 lingue", without: "✗ Solo la tua" },
    { feature: "Comunicare all'estero", translator: "✓ Conversazioni fluide", without: "✗ Gesti e frustrazione" },
    { feature: "Corsi di lingua", translator: "✓ Non servono più", without: "✗ €500-2.000/anno" },
    { feature: "Opportunità perse", translator: "✓ Zero", without: "✗ Business, amicizie, amori" },
    { feature: "Tempo per imparare", translator: "✓ Funziona subito", without: "✗ Anni di studio" },
    { feature: "Investimento", translator: "€89 una tantum", without: "€5.000+ in corsi" },
  ];

  const faqs = [
    {
      question: "Come funziona la traduzione?",
      answer: "Parli nella tua lingua, gli auricolari traducono istantaneamente nella lingua del tuo interlocutore. Lui risponde, e tu senti la traduzione nel tuo orecchio. Conversazione naturale e fluida, come se parlassi la stessa lingua."
    },
    {
      question: "Posso usarli come normali cuffie?",
      answer: "Assolutamente sì! Sono auricolari premium a tutti gli effetti. Bluetooth 5.4 per musica senza ritardi, cancellazione rumore ENC per chiamate cristalline, audio Hi-Fi per podcast e musica. Li userai tutti i giorni, non solo per tradurre."
    },
    {
      question: "Quante lingue supporta?",
      answer: "144 lingue e dialetti. Dall'inglese al cinese, dall'arabo al giapponese, dallo spagnolo al russo. Praticamente ogni lingua parlata sul pianeta. E gli aggiornamenti aggiungono continuamente nuove lingue."
    },
    {
      question: "Serve connessione internet?",
      answer: "Funziona in entrambi i modi: online con connessione, oppure offline scaricando le lingue che ti servono. Le lingue occupano pochissimo spazio e puoi tradurre ovunque, anche senza internet."
    },
    {
      question: "Quanto dura la batteria?",
      answer: "Gli auricolari singoli durano quasi 2 giorni, e la custodia li ricarica fino a 3 volte, per un totale di circa 5 giorni ad uso medio. Si ricarica completamente in soli 30 minuti."
    },
    {
      question: "Devo pagare subito?",
      answer: "No, paghi al corriere alla consegna. Contanti o carta. Zero rischi per te."
    },
    {
      question: "E se non mi piace?",
      answer: "Hai 30 giorni per restituirlo e riavere i soldi, senza domande. Ma dopo averlo provato, non vorrai più separartene."
    }
  ];

  const reviews = [
    { nome: 'Marco R.', testo: 'Ho appena chiuso un contratto da €30.000 con un cliente giapponese. Senza questi auricolari non sarebbe MAI successo. L\'interprete mi aveva chiesto €350 all\'ora con minimo 3 ore, data l\'importanza della trattativa. Ho speso €89 e ho risolto per sempre. Non ho parole.', stelle: 5, data: '14 Dicembre 2025', risposta: 'Marco, storie come la tua ci riempiono di orgoglio! Il business non ha più confini con la tecnologia giusta. Congratulazioni per l\'affare!' },
    { nome: 'Elena K.', testo: 'Viaggio da sola e avevo sempre paura di perdermi o di non farmi capire. A Bangkok mi sono persa e grazie a questi auricolari un signore del posto mi ha aiutata a tornare in hotel. Mi hanno letteralmente salvata.', stelle: 5, data: '10 Dicembre 2025' },
    { nome: 'Giovanni T.', testo: 'Mia moglie è straniera e i suoi genitori non parlano la mia lingua. Per 5 anni abbiamo comunicato a gesti. Adesso ceniamo insieme e parliamo per ore. Mia suocera ha pianto di gioia. Vale ogni centesimo.', stelle: 5, data: '3 Dicembre 2025', risposta: 'Giovanni, questa storia ci ha commosso. Le barriere linguistiche separano le famiglie da troppo tempo. Siamo felici di avervi riunito!' },
    { nome: 'Sofia M.', testo: 'Ho conosciuto il mio ragazzo in vacanza a Barcellona. Parlavamo due lingue diverse. Senza questi auricolari non ci saremmo mai parlati. Adesso viviamo insieme. Grazie per avermi dato l\'amore della mia vita.', stelle: 5, data: '27 Novembre 2025', risposta: 'Sofia, WOW! Questa è la recensione più bella che abbiamo mai ricevuto. Vi auguriamo tutta la felicità del mondo!' },
    { nome: 'Andreas B.', testo: 'Lavoro nel turismo e ricevo clienti da tutto il mondo. Prima dovevo limitarmi a inglese e tedesco. Adesso parlo con russi, cinesi, arabi... Il mio fatturato è aumentato del 40%. Non è un gadget, è un investimento.', stelle: 5, data: '19 Novembre 2025' },
    { nome: 'Laura P.', testo: 'Ho speso migliaia di euro in corsi di inglese. Anni di lezioni, app, viaggi studio. Mai imparato davvero. Con €89 ho risolto il problema in 5 minuti. Mi sento una stupida per non averli comprati prima.', stelle: 5, data: '8 Novembre 2025', risposta: 'Laura, non sentirti stupida! I corsi di lingua funzionano per alcuni, ma questa tecnologia è una rivoluzione per tutti gli altri. L\'importante è che ora sei libera di comunicare!' },
    { nome: 'Thomas H.', testo: 'Sono medico e ho pazienti stranieri che non parlano la mia lingua. Prima era un incubo, dovevo chiamare interpreti e i pazienti aspettavano ore. Adesso li visito subito e capisco esattamente i sintomi. Salvavita letteralmente.', stelle: 5, data: '25 Ottobre 2025', risposta: 'Thomas, l\'uso in ambito medico è qualcosa che ci sta particolarmente a cuore. Sapere che aiutiamo a salvare vite ci dà un senso profondo. Grazie!' },
    { nome: 'Francesca D.', testo: 'In aeroporto a Dubai il mio volo è stato cancellato. Non capivo niente, tutti parlavano arabo. Ho tirato fuori gli auricolari e in 10 minuti avevo risolto tutto con il personale. Senza sarei ancora lì.', stelle: 5, data: '12 Ottobre 2025' },
    { nome: 'Roberto V.', testo: 'Li ho regalati a mio padre di 72 anni che va spesso in Croazia. Era terrorizzato di non farsi capire. Adesso parte tranquillo e mi manda foto mentre chiacchiera con i pescatori del posto. Non ha prezzo.', stelle: 5, data: '3 Ottobre 2025', risposta: 'Roberto, i regali più belli sono quelli che danno libertà. Tuo padre ora può viaggiare senza limiti. Splendido!' },
    { nome: 'Luca M.', testo: 'Studio all\'estero e i primi mesi sono stati durissimi: non capivo le lezioni, non riuscivo a fare amicizia. Da quando ho questi auricolari è cambiato tutto. Seguo i corsi, parlo coi compagni, mi sento finalmente parte del gruppo.', stelle: 5, data: '18 Settembre 2025', risposta: 'Luca, sappiamo quanto può essere difficile studiare all\'estero senza parlare la lingua. Siamo felici di averti aiutato a vivere questa esperienza al meglio!' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-500 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer whitespace-nowrap"
          >
            <span>ORDINA ORA - €89</span>
            <span className="text-xs sm:text-sm bg-white/20 px-2 py-1 rounded">Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        Spedito in 48h – Pagamento alla Consegna
      </div>

      {/* Hero Title Section */}
      <section className="bg-white pt-6 pb-4 md:py-8 px-4 border-b">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-black text-[#0f1c3f] mb-4 leading-tight tracking-tight">
            <span className="text-orange-500">144 LINGUE</span> NEL TUO ORECCHIO: PARLA CON <span className="text-orange-500">CHIUNQUE</span>, OVUNQUE NEL MONDO
          </h1>
          <p className="text-xl md:text-2xl font-bold text-red-600 mb-4">
            Basta sentirsi muti all'estero. Basta opportunità perse. Basta scuse.
          </p>
          <p className="text-lg md:text-xl text-gray-700 bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 inline-block">
            <strong>Auricolari con traduzione simultanea</strong>: parli nella tua lingua, l'altro sente la sua. Lui risponde, tu capisci tutto.
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
                alt="Translator Earbuds"
                className="w-full h-full object-cover"
              />
              {/* Badge Ultimi Pezzi */}
              <div className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                Ultimi 12 pezzi disponibili
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
                    i === currentSlide ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Bullet Points sotto la galleria - SOLO MOBILE */}
            <div className="bg-blue-50/50 rounded-xl p-5 text-left lg:hidden">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">144 Lingue Istantanee:</strong> Dall'inglese al cinese, dall'arabo al giapponese. Ogni lingua del pianeta nel tuo orecchio.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Traduzione Bidirezionale:</strong> Tu parli, lui capisce. Lui risponde, tu capisci. Conversazione naturale e fluida.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Battery className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">5 Giorni di Autonomia:</strong> Batteria che dura quasi una settimana intera. Ricarica completa in soli 30 minuti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Headphones className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Non Solo Traduzioni:</strong> Usali come normali auricolari per musica, chiamate, podcast. Audio nitido, zero ritardi, isolano dai rumori esterni.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Funziona Subito:</strong> Nessun corso, nessuno studio. Li indossi e parli con il mondo intero. Fine.</span>
                </li>
              </ul>
              <button
                onClick={() => setShowLanguages(true)}
                className="mt-4 w-full text-blue-600 font-semibold text-sm underline hover:text-blue-800 transition-colors cursor-pointer"
              >
                Visualizza lista 144 lingue
              </button>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-blue-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-sm font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center text-center leading-tight">
                -65%
              </div>

              {/* Titolo e Recensioni */}
              <h2 className="text-xl font-bold text-[#0f1c3f] text-center mb-2">
                Translator Earbuds Pro - 144 Lingue
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
                <span className="text-gray-500 text-sm underline">(2.847 recensioni)</span>
              </div>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <span className="text-gray-400 line-through text-xl" style={{ fontFamily: 'var(--font-montserrat)' }}>€259</span>
                <span className="text-5xl font-black text-blue-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€89</span>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                Ordina Ora - Paghi alla Consegna
              </button>

              <p className="text-center text-green-600 font-semibold mt-3 text-sm">
                Nessun abbonamento. Paghi una volta, usi per sempre.
              </p>

              <p className="text-center text-red-600 font-bold mt-2">
                Offerta scade tra: {formatTime(timeLeft)}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-gray-700">Garanzia 24 mesi</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-gray-700">Reso 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-blue-600" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>

            {/* Bullet Points - SOLO DESKTOP */}
            <div className="hidden lg:block bg-blue-50/50 rounded-xl p-5 text-left">
              <ul className="space-y-4 text-slate-800 text-base">
                <li className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">144 Lingue Istantanee:</strong> Dall'inglese al cinese, dall'arabo al giapponese. Ogni lingua del pianeta nel tuo orecchio.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mic className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Traduzione Bidirezionale:</strong> Tu parli, lui capisce. Lui risponde, tu capisci. Conversazione naturale e fluida.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Battery className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">5 Giorni di Autonomia:</strong> Batteria che dura quasi una settimana intera. Ricarica completa in soli 30 minuti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Headphones className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Non Solo Traduzioni:</strong> Usali come normali auricolari per musica, chiamate, podcast. Audio nitido, zero ritardi, isolano dai rumori esterni.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-slate-900">Funziona Subito:</strong> Nessun corso, nessuno studio. Li indossi e parli con il mondo intero. Fine.</span>
                </li>
              </ul>
              <button
                onClick={() => setShowLanguages(true)}
                className="mt-4 w-full text-blue-600 font-semibold text-sm underline hover:text-blue-800 transition-colors cursor-pointer"
              >
                Visualizza lista 144 lingue
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Striscia Spedizione Assicurata */}
      <div className="bg-slate-800 text-white py-3 text-center text-sm font-medium">
        <strong>Spedizione Express Assicurata</strong> - se il pacco è danneggiato, lo sostituiamo senza farti sborsare un euro.
      </div>

      {/* SEZIONE FRUSTRAZIONE VS SERENITÀ */}
      <section className="py-8 md:py-12 bg-red-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-red-700 tracking-tight">
            TI È MAI SUCCESSO?
          </h2>
          <p className="text-lg text-gray-700 text-center mb-4 md:mb-8">
            Quella sensazione di <strong className="text-red-900">impotenza</strong> quando non capisci e non ti capiscono. L'abbiamo provata tutti.
          </p>

          {/* Grid Frustrazioni */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Frustrazione 1 - Vacanza */}
            <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
              <h4 className="font-bold text-red-700 mb-1">Perso all'estero</h4>
              <p className="text-gray-600 text-[15px]">Devi chiedere indicazioni ma <strong>nessuno ti capisce</strong>. Scrivi sul telefono, mostri lo schermo... l'altro ti guarda confuso.</p>
            </div>

            {/* Frustrazione 2 - Ristorante */}
            <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
              <h4 className="font-bold text-red-700 mb-1">Al ristorante punti a caso</h4>
              <p className="text-gray-600 text-[15px]">Vorresti chiedere cosa c'è nel piatto, ma <strong>rinunci</strong>. Punti qualcosa e speri bene.</p>
            </div>

            {/* Frustrazione 3 - Vivi all'estero */}
            <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
              <h4 className="font-bold text-red-700 mb-1">All'estero ti senti isolato</h4>
              <p className="text-gray-600 text-[15px]">I vicini ti salutano, ma dopo "ciao" non sai andare avanti. <strong>Solo in mezzo alla gente.</strong></p>
            </div>

            {/* Frustrazione 4 - Call di lavoro */}
            <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-md">
              <h4 className="font-bold text-red-700 mb-1">In call annuisci senza capire</h4>
              <p className="text-gray-600 text-[15px]">Colleghi stranieri parlano veloce, tu sorridi. Poi ti chiedono un'opinione e <strong>vai nel panico</strong>.</p>
            </div>
          </div>

          {/* Trasformazione */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 md:p-8 text-white text-center shadow-xl">
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              E SE TUTTO QUESTO SPARISSE?
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl mb-1">🛡️</div>
                <p className="font-bold text-[15px]">SICUREZZA</p>
                <p className="text-[13px] text-white/80">Ti fai capire sempre</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl mb-1">😌</div>
                <p className="font-bold text-[15px]">TRANQUILLITÀ</p>
                <p className="text-[13px] text-white/80">Zero ansia da lingua</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl mb-1">🎯</div>
                <p className="font-bold text-[15px]">AUTONOMIA</p>
                <p className="text-[13px] text-white/80">Nessuno ti deve aiutare</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <div className="text-2xl mb-1">✨</div>
                <p className="font-bold text-[15px]">SEMPLICITÀ</p>
                <p className="text-[13px] text-white/80">Indossi e parli</p>
              </div>
            </div>
            <p className="text-lg md:text-xl font-medium">
              Immagina di poter parlare tutte le lingue del mondo: <strong>tu capisci tutti, tutti ti capiscono.</strong>
            </p>
          </div>

          {/* Box Regalo */}
          <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-5 mt-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎁</span>
              <div>
                <p className="text-amber-900">
                  <strong>Il regalo perfetto per chi viaggia o vive all'estero.</strong> Genitori che vanno in vacanza, figli che studiano fuori, amici che si trasferiscono. Regala <strong>tranquillità e sicurezza</strong>: sapranno sempre farsi capire, ovunque nel mondo.
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
            COSA CAMBIA NELLA TUA VITA<br />CON QUESTI AURICOLARI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Box 1 - Viaggio Sereno */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-viaggio.png" alt="Mai più perso all'estero" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">MAI PIÙ PERSO ALL'ESTERO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  In vacanza o trasferito in un altro paese: <strong>vivi senza barriere.</strong> Chiedi indicazioni, ordina al ristorante, parla coi vicini, fai amicizia. <strong>Sentiti a casa ovunque nel mondo.</strong>
                </p>
              </div>
            </div>

            {/* Box 2 - Testi e Video */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-testi.png" alt="Traduci testi e video" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">TRADUCI TESTI E VIDEO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Non solo conversazioni: <strong>traduci qualsiasi testo</strong> da siti web, email, documenti. Guarda video e film in qualsiasi lingua, online e offline. <strong>Tutto il mondo diventa comprensibile.</strong>
                </p>
              </div>
            </div>

            {/* Box 3 - Sicurezza */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-sicurezza.png" alt="Mai più in panico" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">MAI PIÙ IN PANICO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Emergenza medica? Volo cancellato? Problema con la polizia? <strong>Ti fai capire sempre.</strong> Sapere di poter comunicare in ogni situazione ti dà una sicurezza che non ha prezzo.
                </p>
              </div>
            </div>

            {/* Box 4 - Offline */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-offline.png" alt="Funziona offline" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">NIENTE CONNESSIONE? ZERO PROBLEMI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Scarica le lingue che ti servono, <strong>occupano pochissimo spazio.</strong> Traduci ovunque, anche offline. In aereo, in montagna, in zone senza segnale. <strong>Sempre operativo.</strong>
                </p>
              </div>
            </div>

            {/* Box 5 - Semplicità */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-semplicita.png" alt="Pronto in 5 secondi" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">PRONTO IN 5 SECONDI</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Li indossi e parli. <strong>Fine.</strong> Niente corsi, niente app complicate, niente ore di studio. Funziona da subito, funziona sempre. <strong>Semplice come fare una telefonata.</strong>
                </p>
              </div>
            </div>

            {/* Box 6 - Audio Premium */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-blue-500 transition-all">
              <div className="p-5 pb-0">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img src="/images/cuffie/box-musica.png" alt="Usali per musica e video" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#0f1c3f] mb-2 tracking-wide">USALI ANCHE PER MUSICA, FILM E VIDEO</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Non solo traduttori: <strong>auricolari premium per tutti i giorni.</strong> Musica con audio perfetto, chiamate cristalline, podcast. Zero ritardi, isolano dai rumori esterni. <strong>Due dispositivi in uno.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Come Funziona */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 md:mb-4 text-[#0f1c3f] tracking-wide">
            SEMPLICISSIMO. GUARDA.
          </h2>
          <p className="text-lg text-gray-600 text-center mb-5 md:mb-10">
            Se sai usare le cuffie Bluetooth, sai già usare il traduttore.
          </p>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4 md:p-8 border-2 border-blue-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">INDOSSA</h3>
                <p className="text-gray-700">
                  Metti gli auricolari, collegali al telefono via Bluetooth. <strong>5 secondi.</strong>
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">SELEZIONA</h3>
                <p className="text-gray-700">
                  Scegli la lingua del tuo interlocutore dall'app. <strong>144 opzioni disponibili.</strong>
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 shadow-lg">
                  <span className="text-white text-2xl md:text-3xl font-black">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-[#0f1c3f] mb-1 md:mb-2">PARLA</h3>
                <p className="text-gray-700">
                  Tu parli, lui capisce. Lui risponde, tu capisci. <strong>Magia.</strong>
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-8 text-center bg-white rounded-xl p-3 md:p-4 border-2 border-blue-400">
              <p className="text-base md:text-xl font-black text-blue-700">
                Zero curve di apprendimento. Zero studio. Zero fatica. Solo comunicazione istantanea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-[#0f1c3f] tracking-tight">
            FATTI DUE CONTI
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Quanto ti costa NON avere questi auricolari?
          </p>
          <div className="mb-8 overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden text-sm md:text-base">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-left w-[40%]"></th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-blue-600 w-[30%]">
                    <div className="font-bold text-sm md:text-base">Con il Traduttore</div>
                  </th>
                  <th className="px-3 md:px-6 py-2 md:py-3 text-center bg-red-500 w-[30%]">
                    <div className="font-bold text-sm md:text-base">Senza Traduttore</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-3 md:px-6 py-2 md:py-3 font-semibold text-slate-900 text-sm md:text-base">{row.feature}</td>
                    <td className="px-3 md:px-6 py-2 md:py-3 text-center font-bold text-sm md:text-base text-blue-700 bg-blue-50">
                      {row.translator}
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
            Solo 12 pezzi rimasti - SCONTO 65%: Translator Earbuds a soli €89
          </p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-blue-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            Li voglio, ordina ora
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-[#035aa6]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2 tracking-wide">
            COSA DICONO I CLIENTI
          </h2>
          <p className="text-center text-white/80 mb-8">2.847 recensioni verificate</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-4 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
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
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded block mb-1">✓ Verificato</span>
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
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">3</div>
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
            Compila per ricevere gli Translator Earbuds Pro al 65% di sconto
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            {/* Product Summary */}
            <div className="bg-slate-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-[#0f1c3f]">Translator Earbuds Pro</span>
                  <p className="text-sm text-gray-600">144 lingue • Bluetooth 5.4</p>
                  <div className="mt-1">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">SCONTO 65%</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block" style={{ fontFamily: 'var(--font-montserrat)' }}>€259</span>
                  <span className="text-2xl font-black text-blue-700" style={{ fontFamily: 'var(--font-montserrat)' }}>€89</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-5 text-center">
              <p className="text-red-700 font-medium">
                L'offerta scade tra: <span className="font-bold">{formatTime(timeLeft)}</span>
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
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white cursor-pointer shadow-lg'
              }`}
            >
              {isSubmitting ? 'INVIO IN CORSO...' : <><span>CONFERMA ORDINE</span><ChevronRight className="w-5 h-5" /></>}
            </button>

            {/* Data Protection */}
            <p className="text-center text-gray-500 text-xs mt-4">
              I tuoi dati sono al sicuro e verranno usati solo per la spedizione
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

      {/* Modal Lista Lingue */}
      {showLanguages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowLanguages(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">144 Lingue Supportate</h3>
              <button
                onClick={() => setShowLanguages(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {languages.map((lang, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-700 border border-slate-200">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
