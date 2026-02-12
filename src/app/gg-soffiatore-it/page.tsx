'use client';
import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle, Shield, Zap, Battery, ChevronDown, X, ChevronLeft, ChevronRight, Wind, Leaf, Timer } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Dichiarazioni TypeScript per Google Ads - CORRETTE
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Estendere dataLayer globale di Google Analytics
declare var dataLayer: any[];

export default function GreenWindPW250Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(57 * 60); // 57 minuti in secondi
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [conversionTracked, setConversionTracked] = useState<boolean>(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
  const [bannerFading, setBannerFading] = useState<boolean>(false);
  const [enlargedImageIndex, setEnlargedImageIndex] = useState<number | null>(null);
  const [carouselAutoPlay, setCarouselAutoPlay] = useState<boolean>(true);

  // Dati del modulo d'ordine
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Array delle immagini del carosello
  const carouselImages = [
    '/images/soffiatore/carosello_1.png',
    '/images/soffiatore/carosello_2.png',
    '/images/soffiatore/carosello_3.png',
    '/images/soffiatore/carosello_4.png',
    '/images/soffiatore/carosello_5.png',
  ];

  // Array delle frasi del banner
  const bannerTexts = [
    "Pagamento alla Consegna",
    "Spedizione rapida",
    "Soddisfatti o Rimborsati"
  ];

  // Carica Google Ads script quando il componente si monta
  useEffect(() => {
    // Evita doppio caricamento in sviluppo
    if (typeof window === 'undefined') return;

    // Verifica se lo script è già caricato
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (existingScript && window.gtag) return;

    // Carica Google Ads Global Site Tag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17104994752';
    document.head.appendChild(gtagScript);

    // Inizializza gtag
    gtagScript.onload = () => {
      if (typeof window !== 'undefined') {
        dataLayer = dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          dataLayer.push(args);
        };

        if (window.gtag) {
          window.gtag('js', new Date());
          window.gtag('config', 'AW-17104994752');
        }
      }
    };

    return () => {
      // Cleanup script quando il componente si smonta
      const scriptToRemove = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  // Auto-scroll del carosello
  useEffect(() => {
    if (!carouselAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 3000); // Cambia ogni 3 secondi

    return () => clearInterval(interval);
  }, [carouselImages.length, carouselAutoPlay]);

  // Auto-fade del banner
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerFading(true);
      
      setTimeout(() => {
        setCurrentBannerIndex((prevIndex) =>
          (prevIndex + 1) % bannerTexts.length
        );
        setBannerFading(false);
      }, 300); // Durata del fade out
    }, 2000); // Cambia ogni 2 secondi

    return () => clearInterval(interval);
  }, [bannerTexts.length]);

  // Gestione tasti freccia per navigazione nell'overlay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (enlargedImageIndex !== null) {
        if (event.key === 'ArrowRight') {
          nextEnlargedImage();
        } else if (event.key === 'ArrowLeft') {
          prevEnlargedImage();
        } else if (event.key === 'Escape') {
          handleCloseEnlarged();
        }
      }
    };

    if (enlargedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [enlargedImageIndex]);

  // Funzione per tracciare la conversione
  const trackConversion = () => {
    if (conversionTracked) {
      return;
    }

    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17104994752/jZlCPqKod4aEMCDptw',
          'value': 74.00,
          'currency': 'EUR',
          'transaction_id': `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        });

        setConversionTracked(true);
        console.log('✅ Conversione tracciata con successo');
      } catch (error) {
        console.error('❌ Errore nel tracciamento conversione:', error);
      }
    }
  };

  // Gestore del conto alla rovescia
  useEffect(() => {
    if (!showOrderPopup) return;

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showOrderPopup]);

  // Carica lo script per il fingerprint quando si apre il popup
  useEffect(() => {
    if (showOrderPopup && typeof window !== 'undefined') {
      // Verifica se lo script è già presente
      const existingScript = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = 'https://offers.uncappednetwork.com/forms/tmfp/';
      script.crossOrigin = 'anonymous';
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        // Cleanup: rimuovi lo script quando il popup si chiude
        const scriptToRemove = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [showOrderPopup]);

  // Formatta il tempo in MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Validazione dei campi
  const validateForm = (): boolean => {
    if (!orderData.name.trim()) {
      setSubmitError('Il nome è obbligatorio');
      return false;
    }
    if (!orderData.phone.trim()) {
      setSubmitError('Il numero di telefono è obbligatorio');
      return false;
    }
    if (!orderData.address.trim()) {
      setSubmitError('L\'indirizzo è obbligatorio');
      return false;
    }

    // Validazione formato telefono (semplice)
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!phoneRegex.test(orderData.phone.trim())) {
      setSubmitError('Inserisci un numero di telefono valido');
      return false;
    }

    setSubmitError('');
    return true;
  };

  // Gestisci l'invio del modulo
  const handleSubmitOrder = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepara i dati per l'API
      const params = new URLSearchParams();
      params.append('uid', '0191b25c-22d2-7f55-9d9b-79b67cebbff3');
      params.append('key', 'e0fe8e75c501eccab21f8d');
      params.append('offer', '678');
      params.append('lp', '692');
      params.append('name', orderData.name.trim());
      params.append('tel', orderData.phone.trim());
      params.append('street-address', orderData.address.trim());

      // Gestione fingerprint
      const tmfpElement = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpElement && tmfpElement.value) {
        params.append('tmfp', tmfpElement.value);
      } else if (typeof navigator !== 'undefined') {
        params.append('ua', navigator.userAgent);
      }

      console.log('=== DEBUG API CALL ===');
      console.log('Dati da inviare:', Object.fromEntries(params));

      // URL dell'API originale
      const apiUrl = 'https://offers.uncappednetwork.com/forms/api/';

      try {
        console.log('Tentativo chiamata API a:', apiUrl);

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
          },
          body: params.toString(),
          mode: 'cors',
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Array.from(response.headers.entries()));

        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (response.ok || response.status === 200) {
          console.log('✅ API SUCCESS - Tracciamento conversione e redirect');

          // 🎯 TRACCIA LA CONVERSIONE PRIMA DEL REDIRECT
          trackConversion();

          // Attendi un momento per essere sicuri che il tracciamento venga inviato
          await new Promise(resolve => setTimeout(resolve, 500));

          // Reset form
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);

          // Redirect con parametro per evitare re-tracciamento
          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-soffiatore?converted=1&t=${timestamp}`;
          }
          return;
        }

        // MODALITÀ TEST: Per testare il tracciamento anche senza API funzionante
        if (response.status === 404 || !response.ok) {
          console.warn('⚠️ API Error - Attivo MODALITÀ TEST per testare il tracciamento');

          // 🧪 MODALITÀ TEST: Traccia la conversione anche in caso di errore API
          trackConversion();

          // Attendi per il tracciamento
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Reset form e redirect per test
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);

          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-soffiatore?converted=1&test=1&t=${timestamp}`;
          }
          return;
        }

        throw new Error(`HTTP ${response.status}: ${responseText}`);

      } catch (fetchError: any) {
        console.error('❌ Errore nella fetch:', fetchError);

        if (fetchError.name === 'TypeError') {
          setSubmitError('Errore di connessione. Verifica la connessione internet.');
        } else if (fetchError.message.includes('CORS')) {
          setSubmitError('Errore CORS. Il server non accetta richieste da questo dominio.');
        } else {
          setSubmitError(`Errore tecnico: ${fetchError.message}`);
        }
      }

    } catch (error: any) {
      console.error('❌ Errore generale:', error);
      setSubmitError('Errore imprevisto durante l\'invio dell\'ordine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestisci le modifiche ai campi del modulo
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Navigazione carosello
  const goToCarouselSlide = (index: number) => {
    setCurrentCarouselIndex(index);
  };

  const nextCarouselSlide = () => {
    setCarouselAutoPlay(false); // Ferma l'autoplay quando si usa la navigazione manuale
    setCurrentCarouselIndex((prevIndex) =>
      (prevIndex + 1) % carouselImages.length
    );
  };

  const prevCarouselSlide = () => {
    setCarouselAutoPlay(false); // Ferma l'autoplay quando si usa la navigazione manuale
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  // Funzioni per gestire l'ingrandimento delle immagini
  const handleImageClick = (index: number) => {
    setEnlargedImageIndex(index);
  };

  const handleCloseEnlarged = () => {
    setEnlargedImageIndex(null);
  };

  // Navigazione nell'overlay ingrandito
  const nextEnlargedImage = () => {
    if (enlargedImageIndex !== null) {
      const nextIndex = (enlargedImageIndex + 1) % carouselImages.length;
      setEnlargedImageIndex(nextIndex);
      setCurrentCarouselIndex(nextIndex); // Sincronizza con il carosello principale
    }
  };

  const prevEnlargedImage = () => {
    if (enlargedImageIndex !== null) {
      const prevIndex = enlargedImageIndex === 0 ? carouselImages.length - 1 : enlargedImageIndex - 1;
      setEnlargedImageIndex(prevIndex);
      setCurrentCarouselIndex(prevIndex); // Sincronizza con il carosello principale
    }
  };

  const benefits = [
    {
      icon: <Wind className="w-8 h-8 text-blue-600" />,
      title: "3 modalità in 1: Soffia, Aspira, Tritura",
      description: "Versatilità totale per ogni esigenza: soffia via le foglie dai vialetti, le aspira dal prato e le tritura automaticamente riducendo il volume dell'80%. Un solo strumento per tutte le operazioni."
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Velocità regolabile + Cruise Control",
      description: "Controllo preciso della potenza con modalità Turbo per lavori intensivi. Il Cruise Control mantiene la velocità costante senza affaticare le mani durante lunghe sessioni di lavoro."
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Eco-friendly e silenzioso",
      description: "Alimentazione 100% a batteria: zero emissioni inquinanti, niente benzina, niente olio. Ultra-silenzioso per lavorare senza disturbare i vicini, anche la domenica mattina."
    },
    {
      icon: <Timer className="w-8 h-8 text-red-600" />,
      title: "Giardino pulito in pochi minuti",
      description: "Dimentica ore di fatica con rastrelli scomodi. GreenWind PW250 pulisce completamente un giardino medio in soli 10-15 minuti. Efficienza professionale alla portata di tutti."
    }
  ];

  const faqs = [
    {
      question: "Il GreenWind PW250 è adatto anche per chi non ha esperienza?",
      answer: "Assolutamente sì! È progettato per essere intuitivo e facile da usare. Il design ergonomico ultraleggero, i controlli semplici e le diverse modalità lo rendono perfetto anche per principianti. Niente più mal di schiena con i rastrelli!"
    },
    {
      question: "Quanto tempo ci vuole per pulire un giardino?",
      answer: "Con GreenWind PW250 e la sua velocità di 250 km/h un giardino medio (200-300 mq) viene pulito completamente in 10-15 minuti. La funzione di triturazione riduce le foglie dell'80%, quindi il sacchetto da 20L si riempie molto lentamente."
    },
    {
      question: "Quanto durano le batterie?",
      answer: "Le batterie da 48V (2x24V) garantiscono fino a 18 ore di utilizzo continuo. La ricarica rapida richiede solo 30 minuti per essere completa, non 2 ore come i vecchi modelli!"
    },
    {
      question: "È davvero silenzioso?",
      answer: "Sì! Essendo elettrico non produce il rumore assordante dei soffiatori a benzina. Puoi usarlo anche la domenica mattina senza disturbare i vicini. Il livello di rumore è paragonabile a quello di un aspirapolvere domestico."
    },
    {
      question: "Cosa include la garanzia?",
      answer: "Hai 30 giorni per testarlo: se non sei soddisfatto, rimborso completo. Inoltre include 5 anni di garanzia completa su tutti i componenti con sostituzione gratuita in caso di difetti."
    }
  ];

  const comparisonData = [
    { feature: "Modalità Operative", greenwind: "3 in 1 (Soffia/Aspira/Tritura)", competitor1: "Solo Soffia", competitor2: "Soffia/Aspira" },
    { feature: "Velocità Aria", greenwind: "250 km/h", competitor1: "180 km/h", competitor2: "150 km/h" },
    { feature: "Batteria", greenwind: "48V (2x24V)", competitor1: "18V singola", competitor2: "24V singola" },
    { feature: "Autonomia", greenwind: "18 ore", competitor1: "45 min", competitor2: "1.5 ore" },
    { feature: "Ricarica", greenwind: "30 minuti", competitor1: "2 ore", competitor2: "3 ore" },
    { feature: "Capacità Sacchetto", greenwind: "20 litri", competitor1: "Nessun sacchetto", competitor2: "12 litri" },
    { feature: "Controllo Velocità", greenwind: "Regolabile + Cruise Control", competitor1: "Fisso", competitor2: "2 Velocità" },
    { feature: "Modalità Turbo", greenwind: "✓", competitor1: "✗", competitor2: "✗" },
    { feature: "Triturazione Foglie", greenwind: "✓ (-80% volume)", competitor1: "✗", competitor2: "✗" },
    { feature: "Peso", greenwind: "Ultraleggero", competitor1: "4.5 kg", competitor2: "3.2 kg" },
    { feature: "Garanzia", greenwind: "5 anni", competitor1: "1 anno", competitor2: "2 anni" },
    { feature: "Prezzo", greenwind: "€74,00", competitor1: "€249,90", competitor2: "€199,90" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
      <style jsx>{`
        .banner-text {
          transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          opacity: 1;
          transform: translateY(0);
        }
        .banner-text.fade-out {
          opacity: 0;
          transform: translateY(-10px);
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background-color: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .carousel-container {
          scroll-snap-type: x mandatory;
        }
        .carousel-item {
          scroll-snap-align: center;
        }
        .image-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          cursor: pointer;
        }
        .enlarged-image {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-green-500 shadow-2xl">
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={() => setShowOrderPopup(true)}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>ORDINA ORA - €74,00</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">💳 Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Popup dell'ordine */}
      {showOrderPopup && (
        <div className="popup-overlay">
          <div className="popup-content p-6">
            <button
              onClick={() => setShowOrderPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Completa per ordinare</h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(1.924 recensioni)</span>
              </div>

              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-lg text-gray-900">GreenWind PW250 - Soffiatore/Aspiratore Professionale + Kit Completo</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-gray-500 line-through text-sm">€559,00</span>
                    <span className="text-xl font-bold text-green-600 ml-2">€74,00</span>
                  </div>
                  <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                    Spedizione rapida
                  </div>
                </div>
              </div>

              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 font-medium flex items-center justify-center">
                  <span className="mr-2">⏱️</span>
                  Offerta speciale scade in:
                  <span className="font-bold ml-1">{formatTime(timeLeft)}</span>
                </p>
              </div>
            </div>

            <div>
              {/* Input hidden per fingerprint */}
              <input type="hidden" name="tmfp" />

              {submitError && (
                <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                  <p className="text-red-700 text-sm">{submitError}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                    Nome e Cognome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Inserisci il tuo nome completo"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="phone">
                    Numero di Telefono *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Inserisci il tuo numero di telefono"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="address">
                    Indirizzo di Spedizione *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Inserisci il tuo indirizzo completo"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="text-center mb-4 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-medium">Le spese di spedizione, di pochi euro, sono calcolate al checkout e ti saranno comunicate insieme al messaggio di conferma.</p>
              </div>

              <div className="text-center mb-4">
                <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 mb-4">
                  <p className="text-amber-800 font-bold text-base">
                    💳 Pagamento alla consegna - Non è necessario inserire i dati della carta
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-bold transition duration-300 ${isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
              >
                {isSubmitting ? 'INVIO IN CORSO...' : 'CONFERMA ORDINE - €74,00'}
              </button>

              <div className="mt-4 text-center text-xs text-gray-500">
                I tuoi dati personali sono protetti e sicuri. Acquistando accetti i nostri termini e condizioni.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Overlay for Enlarged View */}
      {enlargedImageIndex !== null && (
        <div className="image-overlay" onClick={handleCloseEnlarged}>
          {/* Pulsante Precedente */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevEnlargedImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 text-xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Immagine Ingrandita */}
          <img
            src={carouselImages[enlargedImageIndex]}
            alt={`GreenWind PW250 vista ${enlargedImageIndex + 1} - Ingrandita`}
            className="enlarged-image"
            onClick={(e) => e.stopPropagation()} // Previene la chiusura quando si clicca sull'immagine
          />

          {/* Pulsante Successivo */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextEnlargedImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 text-xl backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pulsante Chiudi */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseEnlarged();
            }}
            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Indicatore Immagine Corrente */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
            {enlargedImageIndex + 1} / {carouselImages.length}
          </div>
        </div>
      )}

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        📦 Spedito in 24/48h – Consegna garantita in 3-4 giorni
      </div>

      {/* Green Fade Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 shadow-lg">
        <div className="text-center">
          <span className={`banner-text ${bannerFading ? 'fade-out' : ''}`}>
            {bannerTexts[currentBannerIndex]}
          </span>
        </div>
      </div>

      {/* Product Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src="/images/soffiatore/greenwind.png"
                alt="GreenWind PW250 soffiatore aspiratore"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mini Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out carousel-container"
                  style={{ transform: `translateX(-${currentCarouselIndex * (100 / 3)}%)` }}
                >
                  {carouselImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-1/3 px-1 carousel-item">
                      <div
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${index === currentCarouselIndex ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => handleImageClick(index)}
                      >
                        <img
                          src={image}
                          alt={`GreenWind PW250 vista ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <button
                onClick={prevCarouselSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextCarouselSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-3 space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCarouselSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentCarouselIndex ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-2">
                <span style={{ color:"green", }}>GreenWind PW250</span> - Soffiatore/Aspiratore Professionale + Kit Completo
              </h2>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-slate-500">(1.924 recensioni verificate)</span>
              </div>
              <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-4">
                <p className="text-orange-800 font-medium">
                  🍂 Niente più mal di schiena con i rastrelli! Soffia, aspira e tritura le foglie in modalità eco-friendly. Giardino pulito in pochi minuti.
                </p>
              </div>
            </div>

            {/* Kit Incluso Section */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 border border-slate-600 rounded-xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  🎁 INCLUSO NELL&apos;OFFERTA - VALORE €200!
                </h3>
                <p className="text-slate-200 text-lg">
                  Tutto quello che ti serve per un giardino perfetto, senza costi aggiuntivi!
                </p>
              </div>

              {/* Grid con icone e benefici */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Battery className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Batterie Premium</h4>
                      <p className="text-sm text-slate-200">48V (2x24V) • 18 ore autonomia</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Caricabatterie Rapido</h4>
                      <p className="text-sm text-slate-200">Ricarica completa in soli 30 minuti</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sacchetto Raccolta</h4>
                      <p className="text-sm text-slate-200">20L capacità • Triturazione integrata</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Wind className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Tubo Aspirazione</h4>
                      <p className="text-sm text-slate-200">Flessibile • Facile aggancio</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Kit Sicurezza</h4>
                      <p className="text-sm text-slate-200">Occhiali protettivi • Guanti</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all border border-white/20">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-6 h-4 bg-white rounded-sm relative">
                        <div className="w-1 h-1 bg-purple-500 rounded-full absolute -top-0.5 left-1/2 transform -translate-x-1/2"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Manuale + Video Tutorial</h4>
                      <p className="text-sm text-slate-200">Guida completa per l&apos;uso ottimale</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonus aggiuntivi */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/30">
                <h4 className="text-xl font-bold mb-4 text-center">🎯 BONUS ESCLUSIVI</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-400" />
                    <p className="font-semibold">30 giorni Soddisfatti o Rimborsati</p>
                    <p className="text-xs text-slate-200">Garanzia totale sul tuo acquisto</p>
                  </div>
                  <div className="text-center">
                    <Award className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <p className="font-semibold">Garanzia 5 anni</p>
                    <p className="text-xs text-slate-200">Sostituzione gratuita completa</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">💬</span>
                    </div>
                    <p className="font-semibold">Supporto WhatsApp 7/7</p>
                    <p className="text-xs text-slate-200">Assistenza sempre disponibile</p>
                  </div>
                </div>
              </div>

              {/* Call to action finale */}
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">VALORE TOTALE: €800,00</p>
                <p className="text-lg mb-4">
                  <span className="line-through text-slate-300">€559,00</span>
                  <span className="ml-2 text-3xl font-bold text-green-400">OGGI SOLO €74,00</span>
                </p>
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-6">
                  ⚡ RISPARMI €485,00 - SCONTO 87% ⚡
                </div>

                {/* Pulsante di acquisto */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowOrderPopup(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-5 rounded-xl font-bold text-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-2xl border-2 border-green-500"
                  >
                    Ordina Ora - Paghi alla Consegna
                  </button>
                </div>

                {/* Garanzie aggiuntive */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-center">
                  <span className="bg-white/20 backdrop-blur-sm py-2 px-3 rounded-lg border border-white/30">✓ Spedizione rapida</span>
                  <span className="bg-white/20 backdrop-blur-sm py-2 px-3 rounded-lg border border-white/30">✓ Reso gratuito 30 giorni</span>
                  <span className="bg-white/20 backdrop-blur-sm py-2 px-3 rounded-lg border border-white/30">✓ Garanzia 2 anni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* GIF Section with Text */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* GIF */}
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-2xl shadow-xl border border-slate-200">
                <img
                  src="/images/soffiatore/soffiatore_gif.gif"
                  alt="GreenWind PW250 in azione - Dimostrazione"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-emerald-900">
                  Guarda GreenWind PW250 in Azione
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-emerald-800 text-lg">
                      <strong>Soffia via</strong> tutte le foglie dai vialetti e dalle superfici in pochi secondi
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-emerald-800 text-lg">
                      <strong>Aspira e tritura</strong> automaticamente riducendo il volume dell'80%
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-emerald-800 text-lg">
                      <strong>Cruise Control</strong> per lavorare senza affaticare le mani
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <p className="text-green-800 font-medium text-lg text-center">
                    🍂 "Finalmente un giardino pulito in 10 minuti, non più ore di fatica!" - Simone R.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              Perché scegliere GreenWind PW250?
            </h2>
            <p className="text-xl text-slate-500 mb-8">
              La soluzione definitiva per un giardino sempre pulito e ordinato, senza fatica
            </p>

            {/* Action Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 lg:p-4 rounded-2xl shadow-xl border border-slate-200">
                <img
                  src="/images/soffiatore/body_1.png"
                  alt="GreenWind PW250 in azione - Modalità soffiatore"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="mt-4 lg:mt-3 text-center">
                  <p className="text-base lg:text-sm font-semibold text-emerald-800 italic">
                   Niente gasolio, niente olio: riduci costi ed emissioni al minimo
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 lg:p-4 rounded-2xl shadow-xl border border-slate-200">
                <img
                  src="/images/soffiatore/body_2.png"
                  alt="GreenWind PW250 in azione - Modalità aspiratore"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="mt-4 lg:mt-3 text-center">
                  <p className="text-base lg:text-sm font-semibold text-emerald-800 italic">
                    Raccoglie e tritura istantaneamente le foglie: le getti facilmente in un attimo
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-slate-100 p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-emerald-800 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              Confronto con la Concorrenza
            </h2>
            <p className="text-xl text-slate-500">
              Scopri perché GreenWind PW250 è la scelta migliore
            </p>
          </div>
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden min-w-[600px]">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Caratteristiche</th>
                  <th className="px-6 py-4 text-center bg-orange-600">
                    <div>
                      <div className="font-bold">GreenWind PW250</div>
                      <div className="text-xs text-orange-100 font-normal">Il nostro prodotto</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div>
                      <div className="font-bold">Soffiatore a Benzina</div>
                      <div className="text-xs text-slate-300 font-normal">Il più venduto nei centri giardinaggio</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div>
                      <div className="font-bold">Soffiatore Elettrico</div>
                      <div className="text-xs text-slate-300 font-normal">Il più venduto online</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-emerald-900">{row.feature}</td>
                    <td className={`px-6 py-4 text-center font-bold ${row.feature === 'Prezzo' ? 'text-green-700 bg-green-50' : 'text-orange-700 bg-orange-50'
                      }`}>
                      {row.greenwind}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.competitor1}</td>
                    <td className="px-6 py-4 text-center text-slate-500">{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* GreenWind vs Rastrello Comparison */}
      <section className="py-16 bg-gradient-to-r from-green-50/40 to-green-100/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-900 mb-4">
              GreenWind PW250 vs Rastrello Tradizionale
            </h2>
            <p className="text-xl text-slate-500">
              Scopri la differenza che fa la tecnologia moderna
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* GreenWind PW250 Column */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/soffiatore/icona1.jpg" 
                    alt="GreenWind PW250 icona" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-green-800">GreenWind PW250</h3>
                <p className="text-green-600 font-semibold">La soluzione moderna</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Leggero e maneggevole</p>
                    <p className="text-sm text-slate-500">Ultraleggero, facile da usare per tutti</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Pulisce in 10-15 minuti</p>
                    <p className="text-sm text-slate-500">Giardino medio completato velocemente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Tritura automaticamente</p>
                    <p className="text-sm text-slate-500">Riduce il volume delle foglie dell'80%</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Raccolta diretta nel sacchetto</p>
                    <p className="text-sm text-slate-500">Aspira e raccoglie automaticamente</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Nessun danno a prato e superfici</p>
                    <p className="text-sm text-slate-500">Delicato su erba, pavimenti e auto</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Garanzia 5 anni</p>
                    <p className="text-sm text-slate-500">Sostituzione completa inclusa</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200">
                <p className="text-center font-bold text-green-800">💚 ZERO FATICA, MASSIMO RISULTATO</p>
              </div>
            </div>
            
            {/* Rastrello Tradizionale Column */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/soffiatore/icona2.jpg" 
                    alt="Rastrello tradizionale icona" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-red-800">Rastrello Tradizionale</h3>
                <p className="text-red-600 font-semibold">Il metodo del passato</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Pesante e scomodo</p>
                    <p className="text-sm text-slate-500">Affatica schiena, braccia e mani</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Richiede 1-2 ore di lavoro</p>
                    <p className="text-sm text-slate-500">Fatica estrema per giardini medi</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Servono molti sacchetti</p>
                    <p className="text-sm text-slate-500">Le foglie occupano molto volume</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Raccogli a mano con la paletta</p>
                    <p className="text-sm text-slate-500">Continuoi piegamenti in avanti</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Si impiglia e graffia</p>
                    <p className="text-sm text-slate-500">Danneggia prato, auto e pavimenti</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="font-semibold text-emerald-900">Si rompe facilmente</p>
                    <p className="text-sm text-slate-500">Da buttare quando si danneggia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-red-200">
                <p className="text-center font-bold text-red-800">😫 MASSIMA FATICA, RISULTATO SCARSO</p>
              </div>
            </div>
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                Fai la scelta intelligente oggi
              </h3>
              <p className="text-lg text-slate-500 mb-6">
                Passa dalla fatica di ore al piacere di 15 minuti. Il tuo giardino (e la tua schiena) ti ringrazieranno!
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-500 mb-6">
                <span className="flex items-center"><Timer className="w-4 h-4 mr-1 text-green-500" /> 15 minuti</span>
                <span className="flex items-center"><Zap className="w-4 h-4 mr-1 text-blue-500" /> Zero fatica</span>
                <span className="flex items-center"><Leaf className="w-4 h-4 mr-1 text-green-500" /> Eco-friendly</span>
              </div>
              <button
                onClick={() => setShowOrderPopup(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg"
              >
                Scegli GreenWind PW250 - €74,00
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#1B364F] reviews-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recensioni</h2>
            <p className="text-xl text-white font-bold">1.924 recensioni verificate</p>
            <p className="text-xl text-gray-300">Puoi vedere tutte le altre recensioni sul sito ufficiale di TrustPilot</p>
          </div>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-orange-600 hover:bg-orange-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl"
              onClick={() => {
                const container = document.querySelector('.reviews-container');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-orange-600 hover:bg-orange-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl"
              onClick={() => {
                const container = document.querySelector('.reviews-container');
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
            >
              ›
            </button>
            <div className="overflow-hidden">
              <div className="reviews-container flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x snap-x snap-mandatory py-4 px-4 md:px-16">
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <p className="font-bold text-gray-900">Marco P.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">Fantastico questo soffiatore! L'ho provato domenica scorsa e ho pulito tutto il giardino di casa mia in 15 minuti, quando prima con il rastrello ci mettevo almeno un'ora. La funzione aspiratore poi è comodissima, non devo più chinarmi a raccogliere. Consigliatissimo davvero!</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/1.jpg" alt="Foto recensione Marco P." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">L</div>
                    <div>
                      <p className="font-bold text-gray-900">Lucia R.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">Super silenzioso rispetto al vecchio soffiatore a benzina che avevo! Ora posso usarlo anche la domenica mattina senza che i vicini si lamentino. Mia moglie è contentissima perché non fa più quel rumore assordante. Batteria che dura parecchio, io ho un giardino medio e ne uso circa la metà.</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/2.jpg" alt="Foto recensione Lucia R." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">A</div>
                    <div>
                      <p className="font-bold text-gray-900">Antonio V.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">La funzione triturazione è geniale, non ci credevo quando l'ho letto ma è vero! Il sacchetto si riempie pochissimo, prima dovevo svuotarlo 4-5 volte ora massimo una volta. Mio figlio adolescente riesce ad usarlo senza problemi, è leggerissimo.</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/3.jpg" alt="Foto recensione Antonio V." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">G</div>
                    <div>
                      <p className="font-bold text-gray-900">Giuseppe M.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">Potentissimo ma leggerissimo, non me lo aspettavo. Io ho 65 anni e problemi alla schiena, con questo soffiatore riesco a fare tutto il lavoro in giardino senza fatica. Prima dovevo chiedere aiuto a mio genero. Lo consiglio soprattutto a chi ha la mia età.</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/1.jpg" alt="Foto recensione Giuseppe M." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">F</div>
                    <div>
                      <p className="font-bold text-gray-900">Francesca B.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Il Cruise Control è fantastico! Finalmente non devo più tenere premuto il pulsante per tutto il tempo, mi facevano male le dita. Ora imposto la velocità e vado tranquilla. Anche la modalità turbo è ottima per le foglie bagnate che prima non riuscivo a spostare.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">R</div>
                    <div>
                      <p className="font-bold text-gray-900">Roberto S.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">La batteria dura davvero 45 minuti come promesso, l'ho cronometrata! Zero emissioni è perfetto per me che sono ambientalista. Non puzza di benzina e non inquina. Mia figlia piccola può stare in giardino mentre lo uso, prima doveva rientrare in casa per i fumi.</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/2.jpg" alt="Foto recensione Roberto S." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">C</div>
                    <div>
                      <p className="font-bold text-gray-900">Carla T.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">La modalità turbo è incredibile, riesce a spostare anche le foglie bagnate e appiccicate che prima erano un incubo. Non si blocca mai, anche con rametti piccoli li aspira tranquillamente. L'ho usato anche per pulire i garage dalle ragnatele, funziona benissimo.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">D</div>
                    <div>
                      <p className="font-bold text-gray-900">Davide L.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">La velocità regolabile è perfetta, per le foglie leggere uso la minima e per quelle pesanti o bagnate la massima. Il kit è completo, non manca proprio nulla, anche gli occhiali protettivi sono inclusi. Arrivato in 2 giorni, imballaggio perfetto.</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/3.jpg" alt="Foto recensione Davide L." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="font-bold text-gray-900">Simona F.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Facilissimo da usare, molto intuitivo. L'ho comprato per aiutare mia nonna di 80 anni e anche lei riesce ad usarlo senza problemi! È così leggero che non le pesa e i comandi sono semplicissimi. Finalmente può tenere pulito il suo giardino da sola senza chiedere aiuto.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">E</div>
                    <div>
                      <p className="font-bold text-gray-900">Enrico G.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed mb-4">Arrivato puntualissimo in 48 ore, imballato benissimo. La qualità è sorprendente per questo prezzo, sembra un prodotto da 200 euro! Mio cognato che lavora in un negozio di giardinaggio mi ha detto che è uguale a quelli professionali che vendono a prezzo doppio. Affare!</p>
                  <div className="rounded-lg overflow-hidden">
                    <img src="/images/soffiatore/recensioni/1.jpg" alt="Foto recensione Enrico G." className="w-full h-auto" />
                  </div>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">P</div>
                    <div>
                      <p className="font-bold text-gray-900">Paolo D.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Avere 3 funzioni in 1 strumento è geniale! Prima avevo soffiatore, aspiratore e dovevo tritare a mano. Ora tutto automatico e conveniente. Ho liberato spazio nel garage e risparmiato un sacco di soldi. Mia moglie contenta perché c'è meno roba in giro.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-green-50/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Domande Frequenti
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-emerald-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === index ? 'transform rotate-180' : ''
                      }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-emerald-800 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-2xl border border-green-500 text-white">
            <h2 className="text-2xl font-bold mb-4">
              3 livelli di Garanzia
            </h2>
            <p className="text-lg text-green-100 mb-6">
              Protezione completa del tuo investimento: garanzia prodotto a lungo termine, reso senza rischi e supporto tecnico continuo per la tua totale tranquillità.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30">
                <Shield className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="font-semibold text-white">Garanzia 5 Anni</p>
                <p className="text-xs text-green-100 mt-1">Sostituzione gratuita per qualsiasi problema</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30">
                <CheckCircle className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="font-semibold text-white">Reso Gratuito 30 Giorni</p>
                <p className="text-xs text-green-100 mt-1">Non soddisfatto? Rimborso totale</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg border border-white/30">
                <div className="w-8 h-8 mx-auto mb-2 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">💬</span>
                </div>
                <p className="font-semibold text-white">Supporto WhatsApp 7/7</p>
                <p className="text-xs text-green-100 mt-1">Assistenza tecnica sempre disponibile</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-800 py-16 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            GreenWind PW250
          </h2>

          {/* GreenWind Image */}
          <div className="text-center mb-8">
            <div className="max-w-md lg:max-w-sm mx-auto">
              <img
                src="/images/soffiatore/greenwind.png"
                alt="GreenWind PW250"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          <p className="text-xl text-slate-200 mb-8">
            Include: Batteria 20V, Caricabatterie Rapido, Sacchetto 45L, Tubo Aspirazione, Kit Sicurezza, Manuale + Video Tutorial e Garanzia 2 Anni
          </p>
          <div className="bg-white p-6 rounded-xl inline-block mb-8">
            <div className="text-3xl font-bold text-green-600 mb-2">€74,00</div>
            <div className="text-slate-500 line-through text-lg">€559,00</div>
            <div className="text-red-600 font-semibold">SCONTO 87% - OFFERTA LIMITATA</div>
          </div>
          <div>
            <button
              onClick={() => setShowOrderPopup(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg mb-6"
            >
              Ordina Ora GreenWind PW250
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-200 text-sm">
            <span>✓ Spedizione rapida in 48h</span>
            <span>✓ Garanzia 5 anni completa</span>
            <span>✓ Reso gratuito entro 30 giorni</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">GreenWind PW250</div>
            <p className="text-slate-400">
              Il soffiatore elettrico che rivoluziona il giardinaggio
            </p>
            <p className="text-sm text-slate-500 mt-4">
              Potente • Ecologico • Silenzioso • Professionale
            </p>
          </div>
        </div>
      </footer>
    </div>
    <Footer />
    </>
  );
}