'use client';

import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import '@/styles/landing-mirko.css';

/* ------------------------------------------------------------------ */
/*  Review data                                                        */
/* ------------------------------------------------------------------ */

interface Review {
  id: number;
  initials: string;
  name: string;
  location: string;
  stars: number;
  text: ReactNode;
  verified: boolean;
  sellerReply: string | null;
}

const reviews: Review[] = [
  {
    id: 1,
    initials: 'MR',
    name: 'Marco R.',
    location: 'Milano, Impiegato',
    stars: 5,
    text: (
      <>
        Dopo anni di dolore cervicale causato dal lavoro al computer, ho provato di tutto. <strong>Questo massaggiatore ha fatto quello che nemmeno il fisioterapista riusciva a fare.</strong> Già dalla prima seduta ho sentito un sollievo incredibile. Lo uso ogni sera e mi sveglio senza rigidità.
      </>
    ),
    verified: true,
    sellerReply: 'Grazie Marco! Siamo felici che NeckRelax Pro ti stia aiutando. Il suo utilizzo costante porta risultati sempre migliori!',
  },
  {
    id: 2,
    initials: 'LB',
    name: 'Laura B.',
    location: 'Roma, Insegnante',
    stars: 5,
    text: (
      <>
        Ero scettica, lo ammetto. Ma dopo una settimana di utilizzo <strong>il dolore al collo che mi portavo dietro da mesi è praticamente sparito.</strong> Il calore terapeutico è una goduria. Lo consiglio a tutte le mie colleghe!
      </>
    ),
    verified: true,
    sellerReply: null,
  },
  {
    id: 3,
    initials: 'GP',
    name: 'Giuseppe P.',
    location: 'Napoli, Autista',
    stars: 5,
    text: (
      <>
        Guido 8 ore al giorno e la cervicale era diventata un incubo. <strong>Con NeckRelax Pro bastano 15 minuti la sera e il giorno dopo sono come nuovo.</strong> La batteria dura tantissimo e posso usarlo anche in pausa pranzo nel camion.
      </>
    ),
    verified: true,
    sellerReply: 'Ciao Giuseppe! Ottimo sapere che riesci ad usarlo anche durante le pause. La portabilità è uno dei punti di forza!',
  },
  {
    id: 4,
    initials: 'FC',
    name: 'Francesca C.',
    location: 'Torino, Freelance',
    stars: 4,
    text: (
      <>
        Lo uso da due settimane e <strong>i miglioramenti sono evidenti</strong>. Il dolore si è ridotto notevolmente. Unica nota: ci vuole un po&apos; per trovare il livello di intensità giusto, ma una volta trovato è fantastico. <strong>Molto meglio dei cerotti antidolorifici</strong> che usavo prima.
      </>
    ),
    verified: true,
    sellerReply: null,
  },
  {
    id: 5,
    initials: 'AG',
    name: 'Antonio G.',
    location: 'Bologna, Pensionato',
    stars: 5,
    text: (
      <>
        A 68 anni pensavo di dover convivere con il dolore cervicale per sempre. <strong>Mia figlia me lo ha regalato e dopo un mese posso dire che è stato il regalo migliore di sempre.</strong> Facile da usare anche per chi non è pratico di tecnologia.
      </>
    ),
    verified: true,
    sellerReply: 'Grazie Antonio! È bello sapere che la semplicità d&apos;uso è apprezzata. Un saluto alla sua figlia per l&apos;ottima scelta!',
  },
  {
    id: 6,
    initials: 'SR',
    name: 'Sara R.',
    location: 'Firenze, Studentessa',
    stars: 5,
    text: (
      <>
        Studio per ore sui libri e la cervicale era diventata insopportabile. <strong>NeckRelax Pro è diventato il mio compagno di studio.</strong> Lo accendo, studio 15 minuti e il dolore sparisce. Prezzo ottimo considerando che un fisioterapista mi costava 50&euro; a seduta.
      </>
    ),
    verified: true,
    sellerReply: null,
  },
  {
    id: 7,
    initials: 'DM',
    name: 'Davide M.',
    location: 'Verona, Personal Trainer',
    stars: 5,
    text: (
      <>
        Come personal trainer lo consiglio ai miei clienti per il recupero post-allenamento. <strong>La combinazione EMS + calore è quello che serve per sciogliere le contratture cervicali.</strong> Ne ho comprati 3: uno per me e due come regalo.
      </>
    ),
    verified: true,
    sellerReply: 'Grazie Davide! È fantastico avere il parere di un professionista del settore. Sconto speciale per ordini multipli sempre disponibile!',
  },
  {
    id: 8,
    initials: 'EM',
    name: 'Elena M.',
    location: 'Palermo, Mamma',
    stars: 4,
    text: (
      <>
        Tra lavoro e gestione dei bambini, il collo era sempre contratto. <strong>Finalmente qualcosa che funziona davvero e che posso usare comodamente sul divano.</strong> Tolgo una stella solo perché il libretto istruzioni potrebbe essere più dettagliato.
      </>
    ),
    verified: true,
    sellerReply: null,
  },
  {
    id: 9,
    initials: 'RC',
    name: 'Roberto C.',
    location: 'Genova, Ingegnere',
    stars: 5,
    text: (
      <>
        Da ingegnere apprezzo la tecnologia dietro questo prodotto. <strong>Gli impulsi EMS sono precisi e ben calibrati, il calore si distribuisce uniformemente.</strong> La qualità costruttiva è superiore a prodotti simili che costano il doppio. Rapporto qualità-prezzo eccezionale.
      </>
    ),
    verified: true,
    sellerReply: null,
  },
  {
    id: 10,
    initials: 'VA',
    name: 'Valentina A.',
    location: 'Bari, Farmacista',
    stars: 5,
    text: (
      <>
        Come farmacista vedo ogni giorno persone cercare soluzioni per la cervicale. <strong>Ho provato NeckRelax Pro su me stessa prima di consigliarlo e i risultati parlano chiaro.</strong> Niente effetti collaterali, niente farmaci. Lo tengo anche in farmacia per farlo provare ai clienti.
      </>
    ),
    verified: true,
    sellerReply: 'Grazie Valentina! La sua approvazione professionale significa molto per noi. Contattateci per una convenzione farmacia!',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LandingTemplateMirko() {
  /* ---- state ---- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [offerOpen, setOfferOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);
  const [reviewsShown, setReviewsShown] = useState(3);
  const [reviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [starHover, setStarHover] = useState(0);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  /* countdown */
  const [countdown, setCountdown] = useState(14 * 60 + 59); // 14:59

  /* refs */
  const orderFormRef = useRef<HTMLDivElement>(null);

  /* ---- callbacks ---- */
  const scrollToOrder = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    orderFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* ---- effects ---- */

  // countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 14 * 60 + 59 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // sticky CTA scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
        // hide when order form is in viewport
        if (orderFormRef.current) {
          const rect = orderFormRef.current.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          setStickyVisible(!inView);
        } else {
          setStickyVisible(true);
        }
      } else {
        setStickyVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---- derived values ---- */
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  const countdownStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalSlides = 5;

  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  const nextSlide = () => setCurrentSlide((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));

  const showMoreReviews = () => {
    setReviewsShown((prev) => Math.min(prev + 3, reviews.length));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitted(true);
  };

  /* ---- FAQ data ---- */
  const faqs = [
    {
      question: 'Come funziona NeckRelax Pro?',
      answer:
        'NeckRelax Pro utilizza la tecnologia EMS (Elettrostimolazione Muscolare) combinata con il calore terapeutico a 42°C. Gli impulsi elettrici a bassa frequenza stimolano i muscoli del collo, alleviando tensioni e contratture. Il calore migliora la circolazione sanguigna, accelerando il processo di guarigione naturale. Basta indossarlo, scegliere il programma e rilassarsi per 15 minuti.',
    },
    {
      question: 'È sicuro da usare? Ha effetti collaterali?',
      answer:
        'Sì, NeckRelax Pro è completamente sicuro. È certificato CE e RoHS. Non ha effetti collaterali noti. La tecnologia EMS è utilizzata da fisioterapisti e professionisti medici in tutto il mondo. Tuttavia, è sconsigliato l\'uso a portatori di pacemaker, donne in gravidanza e bambini sotto i 12 anni.',
    },
    {
      question: 'Quanto dura la batteria?',
      answer:
        'La batteria ricaricabile dura fino a 5 sessioni complete (circa 75 minuti di utilizzo continuo) con una singola carica. La ricarica completa tramite USB-C richiede circa 1.5 ore. Il dispositivo si spegne automaticamente dopo 15 minuti per una gestione ottimale della batteria.',
    },
    {
      question: 'Posso restituirlo se non sono soddisfatto?',
      answer:
        'Assolutamente sì! Offriamo una garanzia soddisfatti o rimborsati di 30 giorni. Se per qualsiasi motivo non sei soddisfatto del prodotto, puoi restituirlo entro 30 giorni dalla ricezione per un rimborso completo. Inoltre, il prodotto è coperto da garanzia di 2 anni contro difetti di fabbricazione.',
    },
    {
      question: 'Come avviene il pagamento e la spedizione?',
      answer:
        'Il pagamento avviene comodamente in contrassegno: paghi direttamente al corriere quando ricevi il pacco. Non serve carta di credito. La spedizione è GRATUITA con corriere espresso e la consegna avviene in 24/48 ore lavorative in tutta Italia. Riceverai un codice di tracciamento via SMS.',
    },
  ];

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="landing-mirko">
      {/* ============================================================ */}
      {/* 1. TOP BAR                                                    */}
      {/* ============================================================ */}
      <div className="top-bar">
        <div className="container">
          <p>Spedizione Gratuita 24/48h &middot; Pagamento alla Consegna &middot; Garanzia 2 Anni</p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. NAVBAR                                                     */}
      {/* ============================================================ */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="brand" onClick={(e) => e.preventDefault()}>
            Neck<em>Relax</em> Pro&trade;
          </a>
          <a href="tel:" className="nav-phone">
            <span role="img" aria-label="phone">&#128222;</span> Assistenza Clienti 24/7
          </a>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 3. URGENCY BANNER                                             */}
      {/* ============================================================ */}
      <div className="urgency-banner">
        ⚠️ Attenzione: Forte richiesta — <strong>Ultimi 8 pezzi disponibili</strong> a questo prezzo
      </div>

      {/* ============================================================ */}
      {/* 4. HERO SECTION                                               */}
      {/* ============================================================ */}
      <section className="hero-section">
        <div className="container">
          <span className="hero-badge">Tecnologia 2026</span>
          <h1 className="hero-title">
            Elimina il Dolore Cervicale <em>in 10 Minuti</em> Senza Farmaci e Senza Fisioterapista
          </h1>
          <p className="hero-subtitle">
            Il massaggiatore cervicale a impulsi EMS che scioglie tensioni, contratture e rigidità &mdash; comodamente da casa tua.
          </p>
          <div className="social-proof-line">
            <span className="stars">★★★★★</span>
            4.9/5 · 12.847 clienti soddisfatti in Italia
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PRODUCT HERO                                               */}
      {/* ============================================================ */}
      <section className="product-hero">
        <div className="container">
          {/* LEFT: Gallery */}
          <div className="gallery">
            <div className="gallery-main">
              <span className="gallery-tag">-50%</span>
              <div className="gallery-image">
                {/* SVG placeholder for main image */}
                <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="600" height="600" fill="#f0f0f0" />
                  <text x="300" y="290" textAnchor="middle" fill="#999" fontSize="24" fontFamily="sans-serif">
                    Immagine Prodotto
                  </text>
                  <text x="300" y="320" textAnchor="middle" fill="#999" fontSize="16" fontFamily="sans-serif">
                    {currentSlide + 1} / {totalSlides}
                  </text>
                </svg>
              </div>
              <button className="gallery-arrow gallery-arrow-prev" onClick={prevSlide} aria-label="Immagine precedente">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="gallery-arrow gallery-arrow-next" onClick={nextSlide} aria-label="Immagine successiva">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <div className="gallery-thumbs">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  className={`gallery-thumb${currentSlide === i ? ' active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Miniatura ${i + 1}`}
                >
                  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="80" fill="#f0f0f0" />
                    <text x="40" y="44" textAnchor="middle" fill="#999" fontSize="12" fontFamily="sans-serif">
                      {i + 1}
                    </text>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="product-info">
            {/* Benefits */}
            <ul className="benefits-list">
              <li className="benefit-item">
                <span className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benefit-text"><strong>Sollievo in 10 minuti</strong> &mdash; risultati dalla prima seduta</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benefit-text"><strong>Zero farmaci</strong> &mdash; tecnologia EMS professionale</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benefit-text"><strong>Calore terapeutico 42&deg;C</strong> &mdash; scioglie contratture profonde</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benefit-text"><strong>Usalo ovunque</strong> &mdash; wireless, leggero e portatile</span>
              </li>
              <li className="benefit-item">
                <span className="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="benefit-text"><strong>15 livelli di intensit&agrave;</strong> &mdash; personalizza il trattamento</span>
              </li>
            </ul>

            {/* Price Box */}
            <div className="price-box">
              <div className="price-row">
                <span className="price-old">&euro;118</span>
                <span className="price-new">&euro;59</span>
                <span className="price-badge">-50%</span>
              </div>
              <div className="price-shipping">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Spedizione GRATUITA</span>
              </div>
            </div>

            {/* Offer Reveal Toggle */}
            <div className="offer-reveal">
              <button className="offer-toggle" onClick={() => setOfferOpen(!offerOpen)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
                <span>Scopri cosa include l&apos;offerta</span>
                <svg
                  className={`offer-toggle-arrow${offerOpen ? ' open' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {offerOpen && (
                <div className="offer-contents">
                  <ul>
                    <li>1x NeckRelax Pro&trade; &mdash; Massaggiatore Cervicale EMS</li>
                    <li>1x Cavo di Ricarica USB-C</li>
                    <li>1x Guida Completa al Sollievo Cervicale (PDF)</li>
                    <li>2x Gel Pad di Ricambio</li>
                    <li>1x Custodia da Viaggio Premium</li>
                  </ul>
                </div>
              )}
            </div>

            {/* CTA */}
            <a href="#order-form" className="cta-button cta-primary" onClick={scrollToOrder}>
              ORDINA ORA
              <span className="cta-sub">Pagamento Contanti alla Consegna</span>
            </a>
            <p className="cta-reassurance">
              <span role="img" aria-label="lock">&#128274;</span> Zero rischio: paghi solo quando ricevi il pacco
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TRUST BADGES                                               */}
      {/* ============================================================ */}
      <section className="trust-badges">
        <div className="container trust-badges-grid">
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <h3 className="trust-badge-title">Pagamento alla Consegna</h3>
            <p className="trust-badge-text">Paghi comodamente in contanti al corriere</p>
          </div>
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h3 className="trust-badge-title">Spedizione 24/48h</h3>
            <p className="trust-badge-text">Consegna rapida con corriere espresso gratuito</p>
          </div>
          <div className="trust-badge">
            <div className="trust-badge-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3 className="trust-badge-title">Garanzia 2 Anni</h3>
            <p className="trust-badge-text">Soddisfatti o rimborsati entro 30 giorni</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. PROBLEMS SECTION                                           */}
      {/* ============================================================ */}
      <section className="problems-section">
        <div className="container">
          <span className="section-eyebrow negative">Ti riconosci?</span>
          <h2 className="section-title">Questi problemi ti sono familiari?</h2>

          <div className="problems-compact">
            <div className="problem-row">
              <div className="problem-bullet">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
                  <path d="M8 14s-4 2-4 6v1h16v-1c0-4-4-6-4-6" />
                  <line x1="12" y1="10" x2="12" y2="14" />
                  <line x1="10" y1="12" x2="14" y2="12" />
                </svg>
              </div>
              <div className="problem-content">
                <h3>Ti svegli con il collo rigido e dolorante</h3>
                <p>Ogni mattina inizia con dolore e difficolt&agrave; a muovere la testa, rovinando la giornata prima ancora di iniziare.</p>
              </div>
            </div>

            <div className="problem-row">
              <div className="problem-bullet">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M6 8l4 3-4 3" />
                </svg>
              </div>
              <div className="problem-content">
                <h3>Ore al computer che ti distruggono il collo</h3>
                <p>Lo smart working e le lunghe ore alla scrivania causano tensioni muscolari croniche che peggiorano giorno dopo giorno.</p>
              </div>
            </div>

            <div className="problem-row">
              <div className="problem-bullet">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2h8l-1 7H9L8 2z" />
                  <path d="M12 9v4" />
                  <circle cx="12" cy="17" r="4" />
                  <line x1="10" y1="17" x2="14" y2="17" />
                  <line x1="12" y1="15" x2="12" y2="19" />
                </svg>
              </div>
              <div className="problem-content">
                <h3>Farmaci che non risolvono il problema</h3>
                <p>Antidolorifici, cerotti e creme danno solo sollievo temporaneo e possono avere effetti collaterali con l&apos;uso prolungato.</p>
              </div>
            </div>
          </div>

          <div className="problems-cta-box">
            <p className="problems-cta-text">Esiste una soluzione migliore.</p>
            <a href="#order-form" className="cta-button cta-secondary" onClick={scrollToOrder}>
              SCOPRI NECKRELAX PRO
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FEATURES SECTION                                           */}
      {/* ============================================================ */}
      <section className="features-section">
        <div className="container">
          <span className="section-eyebrow">Perch&eacute; &egrave; diverso</span>
          <h2 className="section-title">Tecnologia professionale, comfort di casa</h2>

          {/* Feature 1 */}
          <div className="feature-block feature-block-left">
            <div className="feature-visual">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" rx="16" fill="#f0fdf4" />
                <text x="200" y="150" textAnchor="middle" fill="#16a34a" fontSize="18" fontFamily="sans-serif">
                  Impulsi EMS
                </text>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-tag">Tecnologia EMS</span>
              <h3>Impulsi EMS professionali</h3>
              <p>
                Gli impulsi elettrici a bassa frequenza stimolano i muscoli del collo in profondit&agrave;, alleviando tensioni e contratture in modo naturale. La stessa tecnologia usata dai fisioterapisti, ora a casa tua.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-block feature-block-right">
            <div className="feature-visual">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" rx="16" fill="#fef9f0" />
                <text x="200" y="150" textAnchor="middle" fill="#f59e0b" fontSize="18" fontFamily="sans-serif">
                  Calore 42&deg;C
                </text>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-tag">Calore Terapeutico</span>
              <h3>Calore costante a 42&deg;C</h3>
              <p>
                Il calore terapeutico migliora la circolazione sanguigna locale, scioglie le contratture profonde e accelera il recupero muscolare. La temperatura ottimale di 42&deg;C &egrave; quella usata nelle migliori cliniche.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-block feature-block-left">
            <div className="feature-visual">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" rx="16" fill="#f0f0ff" />
                <text x="200" y="150" textAnchor="middle" fill="#6366f1" fontSize="18" fontFamily="sans-serif">
                  Batteria Wireless
                </text>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-tag">Wireless &amp; Portatile</span>
              <h3>Batteria ricaricabile, zero fili</h3>
              <p>
                Fino a 5 sessioni con una singola carica. Ricarica rapida USB-C in soli 90 minuti. Usalo ovunque: a casa, in ufficio, in viaggio. Pesa solo 190g, leggero come uno smartphone.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-block feature-block-right">
            <div className="feature-visual">
              <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" rx="16" fill="#fdf0f0" />
                <text x="200" y="150" textAnchor="middle" fill="#ef4444" fontSize="18" fontFamily="sans-serif">
                  Design Adattabile
                </text>
              </svg>
            </div>
            <div className="feature-content">
              <span className="feature-tag">Design Ergonomico</span>
              <h3>Si adatta a ogni collo</h3>
              <p>
                Il design flessibile in silicone medicale si adatta perfettamente alla curvatura del tuo collo. I 4 elettrodi in acciaio inox garantiscono un contatto ottimale per un trattamento efficace su ogni corporatura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. HOW IT WORKS                                               */}
      {/* ============================================================ */}
      <section className="how-section">
        <div className="container">
          <span className="section-eyebrow">Semplicissimo</span>
          <h2 className="section-title">Come funziona? 3 gesti e via.</h2>

          <div className="steps-row">
            <div className="step-card">
              <div className="step-visual">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
                  <text x="100" y="90" textAnchor="middle" fill="#16a34a" fontSize="48" fontFamily="sans-serif">
                    1
                  </text>
                  <text x="100" y="130" textAnchor="middle" fill="#16a34a" fontSize="14" fontFamily="sans-serif">
                    Indossa
                  </text>
                </svg>
              </div>
              <div className="step-number">
                <span>1</span>
              </div>
              <h3 className="step-title">Indossalo</h3>
              <p className="step-desc">
                Posiziona NeckRelax Pro intorno al collo. Il design ergonomico si adatta automaticamente alla tua corporatura.
              </p>
            </div>

            <div className="step-card">
              <div className="step-visual">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
                  <text x="100" y="90" textAnchor="middle" fill="#16a34a" fontSize="48" fontFamily="sans-serif">
                    2
                  </text>
                  <text x="100" y="130" textAnchor="middle" fill="#16a34a" fontSize="14" fontFamily="sans-serif">
                    Programma
                  </text>
                </svg>
              </div>
              <div className="step-number">
                <span>2</span>
              </div>
              <h3 className="step-title">Scegli il Programma</h3>
              <p className="step-desc">
                Seleziona tra 6 modalit&agrave; e 15 livelli di intensit&agrave;. Premi un pulsante e il dispositivo fa tutto il lavoro.
              </p>
            </div>

            <div className="step-card">
              <div className="step-visual">
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" fill="#f0fdf4" />
                  <text x="100" y="90" textAnchor="middle" fill="#16a34a" fontSize="48" fontFamily="sans-serif">
                    3
                  </text>
                  <text x="100" y="130" textAnchor="middle" fill="#16a34a" fontSize="14" fontFamily="sans-serif">
                    Rilassati
                  </text>
                </svg>
              </div>
              <div className="step-number">
                <span>3</span>
              </div>
              <h3 className="step-title">Rilassati</h3>
              <p className="step-desc">
                In soli 15 minuti sentirai il dolore sciogliersi. Il timer automatico spegne il dispositivo per te.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. MID CTA                                                   */}
      {/* ============================================================ */}
      <section className="mid-cta">
        <div className="container mid-cta-inner">
          <a href="#order-form" className="cta-button cta-primary cta-large" onClick={scrollToOrder}>
            ORDINA ORA CON IL 50% DI SCONTO
          </a>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. SPECS SECTION                                             */}
      {/* ============================================================ */}
      <section className="specs-section">
        <div className="container">
          <h2 className="section-title">Specifiche Tecniche</h2>
          <div className="specs-table-wrapper">
            <table className="specs-table">
              <tbody>
                <tr>
                  <td className="spec-label">Tecnologia</td>
                  <td className="spec-value">EMS (Elettrostimolazione Muscolare)</td>
                </tr>
                <tr>
                  <td className="spec-label">Elettrodi</td>
                  <td className="spec-value">4 pad in acciaio inox</td>
                </tr>
                <tr>
                  <td className="spec-label">Livelli</td>
                  <td className="spec-value">15 livelli di intensit&agrave;</td>
                </tr>
                <tr>
                  <td className="spec-label">Modalit&agrave;</td>
                  <td className="spec-value">6 modalit&agrave; di massaggio</td>
                </tr>
                <tr>
                  <td className="spec-label">Calore</td>
                  <td className="spec-value">Terapeutico costante a 42&deg;C</td>
                </tr>
                <tr>
                  <td className="spec-label">Batteria</td>
                  <td className="spec-value">Li-ion 500mAh (5 sessioni)</td>
                </tr>
                <tr>
                  <td className="spec-label">Ricarica</td>
                  <td className="spec-value">USB-C, ~1.5 ore</td>
                </tr>
                <tr>
                  <td className="spec-label">Peso</td>
                  <td className="spec-value">190g</td>
                </tr>
                <tr>
                  <td className="spec-label">Materiale</td>
                  <td className="spec-value">Silicone medicale + ABS</td>
                </tr>
                <tr>
                  <td className="spec-label">Timer</td>
                  <td className="spec-value">Auto-spegnimento 15 minuti</td>
                </tr>
                <tr>
                  <td className="spec-label">Certificazioni</td>
                  <td className="spec-value">CE, RoHS, FCC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. COMPARISON SECTION                                        */}
      {/* ============================================================ */}
      <section className="comparison-section">
        <div className="container">
          <h2 className="section-title">Confronto Onesto</h2>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="comparison-winner">
                    <span className="winner-badge">Vincitore</span>
                    NeckRelax Pro
                  </th>
                  <th>Fisioterapista</th>
                  <th>Farmaci</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="comparison-label">Prezzo</td>
                  <td className="comparison-winner-cell">&euro;59 (una tantum)</td>
                  <td>&euro;50+ a seduta</td>
                  <td>&euro;15-30/mese</td>
                </tr>
                <tr>
                  <td className="comparison-label">Comodit&agrave;</td>
                  <td className="comparison-winner-cell">Ovunque, sempre</td>
                  <td>Solo in studio</td>
                  <td>Dipende dal farmaco</td>
                </tr>
                <tr>
                  <td className="comparison-label">Effetti collaterali</td>
                  <td className="comparison-winner-cell">Nessuno</td>
                  <td>Nessuno</td>
                  <td>Possibili</td>
                </tr>
                <tr>
                  <td className="comparison-label">Tempo</td>
                  <td className="comparison-winner-cell">15 min/giorno</td>
                  <td>30-60 min + viaggio</td>
                  <td>Variabile</td>
                </tr>
                <tr>
                  <td className="comparison-label">Risultato duraturo</td>
                  <td className="comparison-winner-cell">S&igrave;, con uso costante</td>
                  <td>S&igrave;, con sedute regolari</td>
                  <td>Temporaneo</td>
                </tr>
                <tr>
                  <td className="comparison-label">Disponibilit&agrave;</td>
                  <td className="comparison-winner-cell">24/7</td>
                  <td>Su appuntamento</td>
                  <td>In farmacia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13. PACKAGE SECTION                                           */}
      {/* ============================================================ */}
      <section className="package-section">
        <div className="container">
          <div className="package-box">
            <div className="package-ribbon">SUPER OFFERTA</div>

            <h2 className="package-title">Ecco tutto quello che ricevi:</h2>

            <ul className="package-items">
              <li className="package-item">
                <span className="package-item-name">NeckRelax Pro&trade; &mdash; Massaggiatore Cervicale EMS</span>
                <span className="package-item-price">&euro;118</span>
              </li>
              <li className="package-item">
                <span className="package-item-name">Cavo di Ricarica USB-C</span>
                <span className="package-item-price package-item-included">INCLUSO</span>
              </li>
              <li className="package-item">
                <span className="package-item-name">Guida Completa al Sollievo Cervicale (PDF)</span>
                <span className="package-item-price package-item-gift">REGALO</span>
              </li>
              <li className="package-item">
                <span className="package-item-name">2x Gel Pad di Ricambio</span>
                <span className="package-item-price package-item-gift">REGALO</span>
              </li>
              <li className="package-item">
                <span className="package-item-name">Custodia da Viaggio Premium</span>
                <span className="package-item-price package-item-gift">REGALO</span>
              </li>
            </ul>

            <div className="package-total">
              <div className="package-total-row">
                <span className="package-total-label">Valore totale:</span>
                <span className="package-total-old">&euro;197</span>
              </div>
              <div className="package-total-row package-total-final">
                <span className="package-total-label">Oggi paghi solo:</span>
                <span className="package-total-new">&euro;59</span>
              </div>
              <div className="package-save">
                Risparmi <strong>&euro;138</strong>
              </div>
            </div>

            <a href="#order-form" className="cta-button cta-primary" onClick={scrollToOrder}>
              ORDINA ORA
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 14. REVIEWS SECTION                                           */}
      {/* ============================================================ */}
      <section className="reviews-section">
        <div className="container">
          <div className="reviews-header">
            <div className="reviews-score">
              <span className="reviews-score-number">4.9</span>
              <div className="reviews-score-stars">
                <span className="star-full">&starf;</span>
                <span className="star-full">&starf;</span>
                <span className="star-full">&starf;</span>
                <span className="star-full">&starf;</span>
                <span className="star-full">&starf;</span>
              </div>
              <span className="reviews-count">12.847 recensioni</span>
            </div>
            <p className="reviews-verified-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Tutte le recensioni sono verificate e provengono da acquisti reali
            </p>
          </div>

          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`review-card${index < reviewsShown ? ' visible' : ''}`}
              >
                <div className="review-header">
                  <div className="review-avatar">
                    <span>{review.initials}</span>
                  </div>
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <span className="review-location">{review.location}</span>
                  </div>
                  {review.verified && (
                    <span className="review-verified">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Acquisto verificato
                    </span>
                  )}
                </div>
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className={s < review.stars ? 'star-full' : 'star-empty'}>
                      &starf;
                    </span>
                  ))}
                </div>
                <div className="review-text">
                  <p>{review.text}</p>
                </div>
                {review.sellerReply && (
                  <div className="review-seller-reply">
                    <span className="seller-reply-label">Risposta del venditore:</span>
                    <p>{review.sellerReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {reviewsShown < reviews.length && (
            <div className="reviews-actions">
              <button className="btn-show-more" onClick={showMoreReviews}>
                Mostra altre recensioni
              </button>
            </div>
          )}

          <div className="reviews-actions">
            <button
              className="btn-leave-review"
              onClick={() => {
                setReviewPopupOpen(true);
                setReviewSubmitted(false);
                setStarRating(0);
              }}
            >
              Lascia una recensione
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 15. REVIEW POPUP                                              */}
      {/* ============================================================ */}
      {reviewPopupOpen && (
        <div className="review-popup-overlay" onClick={() => setReviewPopupOpen(false)}>
          <div className="review-popup" onClick={(e) => e.stopPropagation()}>
            <button className="review-popup-close" onClick={() => setReviewPopupOpen(false)} aria-label="Chiudi">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {!reviewSubmitted ? (
              <>
                <h3 className="review-popup-title">Lascia la tua recensione</h3>
                <form className="review-popup-form" onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <label htmlFor="review-name">Nome</label>
                    <input type="text" id="review-name" placeholder="Il tuo nome" required />
                  </div>
                  <div className="form-group">
                    <label>Valutazione</label>
                    <div className="star-picker">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`star-pick${i < (starHover || starRating) ? ' active' : ''}`}
                          onMouseEnter={() => setStarHover(i + 1)}
                          onMouseLeave={() => setStarHover(0)}
                          onClick={() => setStarRating(i + 1)}
                          aria-label={`${i + 1} stelle`}
                        >
                          &starf;
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="review-text">La tua esperienza</label>
                    <textarea
                      id="review-text"
                      rows={4}
                      placeholder="Racconta la tua esperienza con NeckRelax Pro..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="cta-button cta-primary">
                    Invia Recensione
                  </button>
                </form>
              </>
            ) : (
              <div className="review-popup-success">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Grazie per la tua recensione!</h3>
                <p>La tua recensione verr&agrave; pubblicata dopo la verifica.</p>
                <button className="cta-button cta-secondary" onClick={() => setReviewPopupOpen(false)}>
                  Chiudi
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 16. ORDER SECTION                                             */}
      {/* ============================================================ */}
      <section className="order-section" id="order-form" ref={orderFormRef}>
        <div className="container">
          <div className="order-box">
            <div className="order-timer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>
                Offerta scade tra: <strong>{countdownStr}</strong>
              </span>
            </div>

            <div className="order-stock-warning">
              <span role="img" aria-label="warning">&#9888;&#65039;</span> Solo <strong>8 pezzi</strong> rimasti a questo prezzo
            </div>

            <div className="order-summary">
              <h2 className="order-summary-title">Riepilogo Ordine</h2>
              <div className="order-summary-row">
                <span>NeckRelax Pro&trade; + Accessori</span>
                <span>&euro;59</span>
              </div>
              <div className="order-summary-row">
                <span>Spedizione Espressa</span>
                <span className="order-free">GRATIS</span>
              </div>
              <div className="order-summary-row order-summary-total">
                <span>Totale</span>
                <span>&euro;59</span>
              </div>
            </div>

            <form className="order-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="order-name">Nome e Cognome</label>
                <input type="text" id="order-name" placeholder="Mario Rossi" required />
              </div>
              <div className="form-group">
                <label htmlFor="order-phone">Numero di Telefono</label>
                <input type="tel" id="order-phone" placeholder="+39 333 1234567" required />
                <span className="form-note">Il corriere ti chiamer&agrave; per confermare la consegna</span>
              </div>
              <div className="form-group">
                <label htmlFor="order-address">Indirizzo di Consegna</label>
                <input type="text" id="order-address" placeholder="Via Roma 1, 20100 Milano (MI)" required />
              </div>

              <div className="order-payment-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                <span>Pagamento in Contrassegno &mdash; Paghi alla Consegna</span>
              </div>

              <button type="submit" className="cta-button cta-primary cta-large">
                CONFERMA ORDINE
              </button>

              <p className="order-reassurance">
                <span role="img" aria-label="lock">&#128274;</span> I tuoi dati sono protetti e usati solo per la spedizione. Nessun pagamento anticipato richiesto.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 17. FAQ SECTION                                               */}
      {/* ============================================================ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Domande Frequenti</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item${openFaqIndex === index ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  <span className="faq-toggle">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 18. STICKY CTA                                                */}
      {/* ============================================================ */}
      <div className={`sticky-cta${stickyVisible ? ' visible' : ''}`}>
        <div className="container sticky-cta-inner">
          <div className="sticky-cta-price">
            <span className="sticky-price-old">&euro;118</span>
            <span className="sticky-price-new">&euro;59</span>
          </div>
          <a href="#order-form" className="cta-button cta-primary sticky-cta-button" onClick={scrollToOrder}>
            ORDINA ORA -50%
          </a>
        </div>
      </div>
    </div>
  );
}
