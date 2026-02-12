'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import '../airwave/airwave.css';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';

// Hook dla animacji przewijania
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function LandingPage() {
  const router = useRouter();

  // --- Main Product Slider State ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;
  const mainSliderRef = useRef<HTMLDivElement>(null);


  const changeSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // --- Sticky Scroll Logic (Shopify Style) ---
  const productImagesRef = useRef<HTMLDivElement>(null);
  const productSectionRef = useRef<HTMLElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [imagesStyle, setImagesStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleStickyScroll = () => {
      if (window.innerWidth < 1024) {
        setImagesStyle({});
        setPlaceholderHeight(0);
        return;
      }

      if (!productSectionRef.current || !productImagesRef.current) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionRect = productSectionRef.current.getBoundingClientRect();
      const sectionTop = productSectionRef.current.offsetTop;
      const sectionHeight = productSectionRef.current.offsetHeight;
      const imagesHeight = productImagesRef.current.offsetHeight || 600;
      const headerOffset = 80;
      const sectionPaddingTop = 48;

      const containerWidth = productSectionRef.current.offsetWidth;
      const imageWidth = (containerWidth - 64) / 2;
      const imageLeft = productSectionRef.current.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);

      const sectionBottom = sectionTop + sectionHeight;
      const limitBottom = sectionBottom - imagesHeight - sectionPaddingTop;

      if (scrollTop >= sectionTop - headerOffset && scrollTop < limitBottom - headerOffset) {
        setImagesStyle({
          position: 'fixed',
          top: `${headerOffset + sectionPaddingTop}px`,
          left: `${imageLeft}px`,
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else if (scrollTop >= limitBottom - headerOffset) {
        setImagesStyle({
          position: 'absolute',
          top: `${limitBottom - sectionTop}px`,
          left: '0',
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else {
        setImagesStyle({
          position: 'relative',
          zIndex: 20
        });
        setPlaceholderHeight(0);
      }
    };

    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    window.addEventListener('resize', handleStickyScroll);
    handleStickyScroll();

    return () => {
      window.removeEventListener('scroll', handleStickyScroll);
      window.removeEventListener('resize', handleStickyScroll);
    };
  }, []);

  // --- Why Choose Slider State ---
  const [currentWhyChoose, setCurrentWhyChoose] = useState(0);
  const totalWhyChoose = 5;
  const [isWhyChooseSliding, setIsWhyChooseSliding] = useState(false);
  const [isWhyChooseAutoplaying, setIsWhyChooseAutoplaying] = useState(true);

  const nextWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const prevWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev - 1 + totalWhyChoose) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const goToWhyChooseSlide = (index: number) => {
    setCurrentWhyChoose(index);
    setIsWhyChooseAutoplaying(false);
  };

  useEffect(() => {
    if (!isWhyChooseAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentWhyChoose, isWhyChooseAutoplaying]);

  // --- Reviews Slider State ---
  const [currentReview, setCurrentReview] = useState(0);
  const totalReviews = 10;
  const [isReviewAutoplaying, setIsReviewAutoplaying] = useState(true);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalReviews) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  useEffect(() => {
    if (!isReviewAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % totalReviews);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview, isReviewAutoplaying]);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Form State ---
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Form Handler ---
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const nomeCompleto = (formData.get('nome_completo') as string) || '';
    const [nome, ...cognomeParts] = nomeCompleto.trim().split(' ');
    const cognome = cognomeParts.join(' ');
    const telefono = (formData.get('telefono') as string) || '';
    const indirizzo = (formData.get('indirizzo') as string) || '';

    // Save user data for Facebook CAPI
    saveUserDataToStorage({
      nome: nome || '',
      cognome: cognome || '',
      telefono,
      indirizzo,
    });

    console.log('[Form] User data saved:', { nome, cognome });

    // Network API call
    try {
      const tmfpInput = event.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
        key: 'ec15cab563da6cf51f0c7c',
        offer: '66',
        lp: '66',
        name: nomeCompleto,
        tel: telefono,
        'street-address': indirizzo,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

      // Add UTM parameters if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmContent = urlParams.get('utm_content');
      const utmTerm = urlParams.get('utm_term');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      console.log('[Network API] Response status:', response.status);

      router.push('/ty/ty-gg-airwave-pl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-gg-airwave-pl');
    }
  };

  // --- Scroll To Form ---
  const scrollToForm = () => {
    const formSection = document.getElementById('ordina');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Scroll Animations ---
  const whyItem1 = useScrollAnimation();
  const whyItem2 = useScrollAnimation();
  const whyItem3 = useScrollAnimation();
  const techSpecsSection = useScrollAnimation();

  return (
    <>
      {/* Google Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17321474795"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17321474795');
        `}
      </Script>

      {/* Fingerprint Script */}
      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Pixel */}
      <img
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=66&uid=0198088f-a4bc-7ed8-89aa-83089fe0180e&lp=66"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Product Section */}
      <section className="product-section" id="productSection" ref={productSectionRef}>
        <div className="product-container">

          {placeholderHeight > 0 && <div style={{ height: placeholderHeight, width: '100%' }} />}

          {/* Product Images */}
          <div className="product-images" id="productImages" ref={productImagesRef} style={imagesStyle}>
            <div className="product-image-main">
              <div className="black-friday-ribbon">
                <span>BLACK</span>
                <span>FRIDAY</span>
              </div>

              <div className="slider-container">
                <div className="slider-images" id="mainSlider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {[
                    "/images/condizionatore/specifiche.webp",
                    "/images/condizionatore/caldo-freddo.webp",
                    "/images/condizionatore/installazione.webp",
                    "/images/condizionatore/riscaldamento.webp",
                    "/images/condizionatore/risparmio.webp",
                    "/images/condizionatore/silenzioso.webp"
                  ].map((src, index) => (
                    <div className="slider-image" key={index}>
                      <img src={src} alt={`Klimatyzator Air Wave Smart widok ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="thumbnails">
              {[
                 "/images/condizionatore/specifiche.webp",
                 "/images/condizionatore/caldo-freddo.webp",
                 "/images/condizionatore/installazione.webp",
                 "/images/condizionatore/riscaldamento.webp",
                 "/images/condizionatore/risparmio.webp",
                 "/images/condizionatore/silenzioso.webp"
              ].map((src, index) => (
                <div
                  key={index}
                  className={`thumbnail ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => changeSlide(index)}
                >
                  <img src={src} alt={`Podgląd klimatyzatora ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="black-friday-badge" style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                color: 'white',
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                Black Friday
              </span>
            </div>

            {/* Header */}
            <div className="product-header">
              <h1 className="product-title">Przenośny Klimatyzator Air Wave Smart™ 3w1 - Ogrzewa, Schładza i Osusza</h1>
              <p className="product-subtitle">Ogrzewa, Schładza i Osusza • System ThermoPanel eliminujący CO2 • Bez Zewnętrznego Agregatu • 12 000 BTU • Wyjątkowo Cicha Praca</p>
            </div>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <span className="rating-text">4.9 (312 recenzji)</span>
            </div>

            {/* Price */}
            <div className="product-price">
              <div className="price-row">
                <span className="price-current">299 zł</span>
                <span className="price-original">399 zł</span>
                <span className="price-save">-60%</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="product-cta">
              <button className="btn-add-to-cart btn-add-to-cart-mobile" onClick={scrollToForm}>
                <span style={{ display: 'block', fontWeight: 700 }} className="btn-text-main">
                  Kup Teraz
                </span>
                <span style={{ display: 'block', fontWeight: 400 }} className="btn-text-sub">
                  Zapłać przy Dostawie - Bezpłatna Przesyłka
                </span>
              </button>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />
            </div>

            {/* Description */}
            <div className="product-description">
              <h3>Kluczowe Zalety</h3>
              <ul>
                <li><span className="icon">✓</span><span><strong>Moc 12 000 BTU</strong> – Błyskawicznie ogrzewa, schładza i usuwa wilgoć przestrzenie do 60 m²</span></li>
                <li><span className="icon">✓</span><span><strong>Trzy tryby w jednym</strong> – Tryb grzania zimą, chłodzenia latem oraz usuwa wilgoćnia</span></li>
                <li><span className="icon">✓</span><span><strong>Dokładna regulacja temperatury 16-32°C</strong> – Elektroniczny termostat zapewniający optymalny komfort</span></li>
                <li><span className="icon">✓</span><span><strong>Klasa energetyczna A+++</strong> – Redukcja rachunków o 60% względem konwencjonalnych systemów</span></li>
                <li><span className="icon">✓</span><span><strong>System ThermoPanel bez agregatu zewnętrznego</strong> – Recyrkulacja powietrza z filtracją CO2, bez jednostki na zewnątrz</span></li>
                <li><span className="icon">✓</span><span><strong>Obsługa przez telefon</strong> – Specjalna aplikacja na iOS i Android, uruchom ogrzewanie zdalnie</span></li>
                <li><span className="icon">✓</span><span><strong>Regulacja wilgotności</strong> – Zmniejsza dolegliwości reumatyczne i grzyby, zdrowa atmosfera</span></li>
                <li><span className="icon">✓</span><span><strong>Prosty montaż</strong> – Instalacja ścienna lub podłogowa, bez fachowca</span></li>
                <li><span className="icon">✓</span><span><strong>Bardzo cichy</strong> – Doskonały również do pokoju sypialnego</span></li>
              </ul>
            </div>

            {/* Trust Section */}
            <div className="trust-section">
              <h3 className="trust-title">Zabezpieczenia i Serwis</h3>
              <div className="trust-items">
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>BEZPŁATNA Dostawa w 48h</h4>
                    <p>Ekspresowa przesyłka kurierska ze śledzeniem. Bez opłat za dostawę.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Zapłata przy Dostawie</h4>
                    <p>Bez zaliczki. Płacisz dopiero po otrzymaniu towaru od kuriera</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Bezpłatny Zwrot do 30 Dni</h4>
                    <p>Nie jesteś zadowolony? Zwróć towar w ciągu 30 dni i odzyskaj całą kwotę</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Gwarancja 24 Miesiące</h4>
                    <p>Całkowita ochrona przed wadami produkcyjnymi przez 2 lata</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="info-boxes">
              <div className="info-box">
                <span className="icon">⚡</span>
                <div className="info-box-content">
                  <p>Zaledwie 1,70 zł na dzień</p>
                  <span>Przeciętne użycie 4-5 godzin w trybie oszczędnym</span>
                </div>
              </div>
              <div className="info-box green">
                <span className="icon">🏠</span>
                <div className="info-box-content">
                  <p>Bez Zgód</p>
                  <span>Montaż bez zgody wspólnoty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ThermoPanel Works Section */}
      <section id="whyItWorks" style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.375rem', color: '#111827' }}>
            Jak działa Air Wave Smart™
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.8125rem', lineHeight: 1.4 }}>
            Innowacyjne rozwiązanie zapewniające oszczędności i doskonały komfort całoroczny
          </p>

          <div className="timeline-container" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #FFB800, #FF8C00)', transform: 'translateX(-50%)' }}></div>

            {/* Item 1 */}
            <div ref={whyItem1.ref} className="timeline-item timeline-item-left" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{
                textAlign: 'right',
                opacity: whyItem1.isVisible ? 1 : 0,
                transform: whyItem1.isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>System ThermoPanel</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  Bez <strong style={{ color: '#663300' }}>zewnętrznej jednostki</strong>, bez zezwoleń. Filtruje i odzyskuje powietrze usuwając CO2 oraz zanieczyszczenia.
                </p>
              </div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem1.isVisible ? 1 : 0,
                transform: whyItem1.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5264 4 16.7792 5.17108 18.2454 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12C20 16.4183 16.4183 20 12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 4L18 7L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20L6 17L9 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>

            {/* Item 2 */}
            <div ref={whyItem2.ref} className="timeline-item timeline-item-right" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-spacer"></div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem2.isVisible ? 1 : 0,
                transform: whyItem2.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-content timeline-content-right" style={{
                textAlign: 'left',
                opacity: whyItem2.isVisible ? 1 : 0,
                transform: whyItem2.isVisible ? 'translateX(0)' : 'translateX(50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>Rzeczywiste Oszczędności Prądu</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Sprytny termostat</strong> kontrolujący temperaturę. <strong style={{ color: '#663300' }}>Redukcja kosztów do 60%</strong> na fakturach.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div ref={whyItem3.ref} className="timeline-item timeline-item-left timeline-item-last" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{
                textAlign: 'right',
                opacity: whyItem3.isVisible ? 1 : 0,
                transform: whyItem3.isVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>Trzy Funkcje w Jednym Sprzęcie</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Ogrzewa</strong> w zimie, <strong style={{ color: '#663300' }}>schładza</strong> w lecie i <strong style={{ color: '#663300' }}>usuwa wilgoć</strong>. Perfekcyjny komfort przez wszystkie pory roku.
                </p>
              </div>
              <div className="timeline-circle" style={{
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)',
                zIndex: 1,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '120px',
                height: '120px',
                opacity: whyItem3.isVisible ? 1 : 0,
                transform: whyItem3.isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(0 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(120 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(240 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Slider */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', color: '#111827' }}>
            Czemu Warto Wybrać <span style={{ color: '#FF8C00' }}>Air Wave Smart™</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1rem' }}>
            Ogrzej mieszkanie wydajnie bez wad zwykłych klimatyzatorów
          </p>

          {/* Slider Container */}
          <div className="slider-container-why-choose" style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto 1rem', padding: '0 70px' }}>
            <div
              className="why-choose-slider-track"
              style={{
                borderRadius: '16px'
              }}
            >
              <div
                id="whyChooseSlider"
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentWhyChoose * 100}%)`
                }}
              >

                {/* Slide 1 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Wydajne i Mocne Ogrzewanie</h3>
                            <p>System ThermoPanel, która <strong>błyskawicznie nagrzewa</strong> Twoje mieszkanie bez zewnętrznej jednostki. <strong>Niezmienne ciepło</strong>, bez ubytków, <strong>pewne oszczędności</strong> na fakturach.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/riscaldamento.webp" alt="Funkcja ogrzewania Air Wave" />
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Z Montażem lub Bez</h3>
                            <p><strong>Nieskomplikowany montaż</strong> na ścianie albo podłodze. <strong>Bez instalatora</strong>, <strong>podłącz i używaj</strong>. Zacznij korzystać w parę minut.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/installazione.webp" alt="Montaż klimatyzatora Air Wave" />
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Schładza Latem, Ogrzewa Zimą</h3>
                            <p><strong>Trzy tryby w jednym</strong>: mocne ogrzewanie zimą, schładzanie latem, usuwa wilgoćnie przez cały rok. <strong>Bez pozwoleń</strong> wspólnotowych.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/caldo-freddo.webp" alt="Klimatyzator trzy w jednym" />
                        </div>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Redukcja kosztów do 60% na Rachunkach</h3>
                            <p><strong>Wydajność A+++</strong> i sprytny termostat: zużywasz jedynie tyle ile trzeba. <strong>Bez strat</strong>, <strong>największe oszczędności</strong> względem instalacji gazowych.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/risparmio.webp" alt="Oszczędność energii Air Wave" />
                        </div>
                    </div>
                </div>

                {/* Slide 5 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Bardzo cichy: Śpij Spokojnie</h3>
                            <p>Idealny do <strong>sypialni</strong>. <strong>Niezwykle cicha</strong> praca, bez głośnego zewnętrznej jednostki. Ciesz się <strong>maksymalnym komfortem</strong> bez zakłóceń.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/silenzioso.webp" alt="Cicha praca klimatyzatora" />
                        </div>
                    </div>
                </div>

              </div>
            </div>

            <button id="prevWhyChoose" onClick={prevWhyChoose} style={{ position: 'absolute', left: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M15 18l-6-6 6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button id="nextWhyChoose" onClick={nextWhyChoose} style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M9 18l6-6-6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>

          {/* Indicators */}
          <div id="whyChooseIndicator" style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            <button
              className="indicator-prev"
              onClick={prevWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="dots-container" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {Array.from({ length: totalWhyChoose }).map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentWhyChoose ? 'active' : ''}`}
                  onClick={() => goToWhyChooseSlide(i)}
                  style={{
                    width: i === currentWhyChoose ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: i === currentWhyChoose ? 'linear-gradient(135deg, #FFB800, #FF8C00)' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: i === currentWhyChoose ? '0 2px 8px rgba(255, 140, 0, 0.4)' : 'none'
                  }}
                ></span>
              ))}
            </div>

            <button
              className="indicator-next"
              onClick={nextWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section ref={techSpecsSection.ref} style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Dane Techniczne
          </h2>

          <div className="tech-specs-container">
            {/* Desktop */}
            <div className="tech-specs-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
               <div className="tech-specs-row-3">
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Maksymalna powierzchnia</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>12 000</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Wydajność BTU</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Przedział temperatur</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FF8C00' }}>Oszczędzanie Energii</h3>
                        </div>
                        <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            <strong>Do 60% niższe koszty</strong> w stosunku do innych klimatyzatorów i ogrzewania gazowego dzięki systemowi ThermoPanel i klasie efektywności A+++.
                        </p>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>A+++</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Klasa energetyczna</div>
                    </div>
                </div>

                <div className="tech-cost-box" style={{
                  background: '#F5F5F5',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  opacity: techSpecsSection.isVisible ? 1 : 0,
                  transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out 1s, transform 0.6s ease-out 1s'
                }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00' }}>1,70 zł dziennie</div>
                        <div style={{ height: '30px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Przy średnim użytkowaniu 4-5 godzin w trybie Eco</div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="tech-specs-mobile" style={{ display: 'none', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Maksymalna powierzchnia</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>12 000</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Wydajność BTU</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Przedział temperatur</div>
                    </div>
                    <div style={{
                      background: '#F5F5F5',
                      border: '2px solid transparent',
                      backgroundClip: 'padding-box',
                      borderRadius: '12px',
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      position: 'relative',
                      opacity: techSpecsSection.isVisible ? 1 : 0,
                      transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>A+++</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Klasa energetyczna</div>
                    </div>
                </div>

                <div style={{
                  background: '#F5F5F5',
                  border: '2px solid transparent',
                  backgroundClip: 'padding-box',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  position: 'relative',
                  opacity: techSpecsSection.isVisible ? 1 : 0,
                  transform: techSpecsSection.isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out 0.8s, transform 0.6s ease-out 0.8s'
                }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FF8C00', margin: 0 }}>Oszczędzanie Energii</h3>
                    </div>
                    <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                        <strong>Do 60% niższe koszty</strong> w stosunku do innych klimatyzatorów i ogrzewania gazowego dzięki systemowi ThermoPanel i klasie efektywności A+++.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF8C00' }}>1,70 zł dziennie</div>
                        <div style={{ height: '20px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Przeciętne użycie 4-5 godzin w trybie oszczędnym</div>
                    </div>
                </div>
            </div>

            <div className="tech-specs-image" style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)', border: '2px solid #FFD966', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <img src="/images/condizionatore/specifiche.webp" alt="Parametry techniczne Air Wave Smart" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Co Zawiera <span style={{ color: '#FF8C00' }}>Nasza Oferta</span>
          </h2>

          <div style={{ background: 'linear-gradient(135deg, #FFF4E6, #FFE8CC)', borderRadius: '16px', padding: '2rem', border: '1px solid #FFDAA3' }}>
            <div className="include-grid">
              <img src="/images/condizionatore/include.webp" alt="Kompletny zestaw Air Wave Smart" className="include-img" />
              <div className="include-list">
                 {[
                    "1× urządzenie Air Wave Smart™ 12 000 BTU",
                    "1× Pilot wraz z bateriami",
                    "1× Komplet do montażu na ścianie",
                    "2× Zapasowe filtry HEPA (na 2 lata)",
                    "Podręcznik użytkownika + gwarancja 24 miesiące",
                    "Darmowy dostęp do aplikacji mobilnej (iOS i Android)"
                 ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: '#CC7A00', fontSize: '1.25rem' }}>✓</div>
                        <span style={{ color: '#B86800', fontSize: '0.9375rem', fontWeight: 700 }}>{item}</span>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={scrollToForm} style={{ background: '#16a34a', color: 'white', padding: '1rem 2.5rem', border: 'none', borderRadius: '12px', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(22,163,74,0.3)', transition: 'all 0.3s' }}>
              Kup Teraz - 299 zł
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #FFFCF5 10%, #FFFCF5 90%, #ffffff 100%)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Potwierdzone Recenzje
          </h2>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto 2rem' }}>
            <div id="reviewsSlider" style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div id="reviewsTrack" style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentReview * 100}%)` }}>
                {[
                    { t: 'Wreszcie widzę realne oszczędności', d: 'Korzystam z niego od mniej więcej 2 miesięcy i muszę powiedzieć, że rachunki zmniejszyły się wyraźnie. Wcześniej ze starym klimatyzatorem płaciłem sporo, teraz dużo mniej. Grzeje solidnie i funkcjonuje znakomicie.', a: 'Piotr K.', stars: 5 },
                    { t: 'Błyskawiczna przesyłka!', d: 'Złożyłem zamówienie w poniedziałek, dotarło w środę. Kurier również uprzejmy. Produkt doskonały, sam zainstalowałem na ścianie bez wzywania kogokolwiek. Funkcjonuje dobrze i błyskawicznie nagrzewa pomieszczenie.', a: 'Tomasz W.', stars: 5 },
                    { t: 'Świetny do sypialni', d: 'Zamontowałem w sypialni i niemal nie słyszę, ledwie go słyszę. Ze starym nie dawałem rady spać, a ten jest perfekcyjny. Pobiera też niewiele energii.', a: 'Anna M.', stars: 5 },
                    { t: 'Jak dotąd jest dobrze', d: 'Jestem bardzo zadowolona, szybko nagrzewa i mieszkanie pozostaje ciepłe. Nie wiem jak dawałam radę wcześniej z kaloryferami, które rozgrzewały się godzinami. To całkowicie inna klasa. Daję 4 gwiazdki, zobaczę jak będzie dalej.', a: 'Katarzyna P.', stars: 4 },
                    { t: 'Prosty montaż', d: 'Ja i mój syn zainstalowaliśmy go w pół godziny, są kołki i wszystko, wystarczy zawiesić i działa natychmiast. Nie trzeba fachowca i oszczędzasz też te pieniądze. Super.', a: 'Robert S.', stars: 5 },
                    { t: 'Ekspresowa wysyłka', d: 'Dotarło w 2 dni, solidnie zapakowane. Kurier nawet pomógł wnieść na piętro bo mieszkam na trzecim bez windy! Produkt doskonały, grzeje świetnie i zużywa mniej niż stary.', a: 'Monika B.', stars: 5 },
                    { t: 'Doskonała relacja jakości do ceny', d: 'W tej cenie jest naprawdę świetny. Ogrzewa w zimie i temperatura jest zawsze taka jaką chcę. Nie wrócę do poprzedniego.', a: 'Łukasz D.', stars: 5 },
                    { t: 'Mieszkanie zawsze ciepłe', d: 'Kupiłem do salonu który ma koło 50 m² i nagrzewa całość. Nawet gdy jest mróz na zewnątrz, w 10 minut mieszkanie jest ciepłe. Zużywa dużo mniej niż poprzedni i widać to na fakturach.', a: 'Maria G.', stars: 5 },
                    { t: 'Szybka przesyłka i świetny produkt', d: 'Zamówiłem we wtorek, otrzymałem w czwartek, kurier na czas. Produkt jest znakomity, ogrzewa i schładza, używam go przez cały rok. Bardzo cichy i prosty w obsłudze nawet dla mnie który się nie orientuję.', a: 'Antoni C.', stars: 5 },
                    { t: 'Naprawdę usatysfakcjonowana', d: 'Obawiałam się zamawiać przez internet ale wszystko dotarło perfekcyjnie w kilka dni. Działa znakomicie i zużywa bardzo mało w porównaniu z moim poprzednim klimatyzatorem. Rachunki obniżyły się znacząco. Jestem bardzo zadowolona.', a: 'Stefania L.', stars: 5 }
                ].map((review, i) => (
                    <div key={i} className="review-slide" style={{ minWidth: '100%', background: 'linear-gradient(135deg, #FFFEFA, #FFF9F0)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(255, 184, 0, 0.1)', border: '1px solid #FFE5D3', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem', color: '#fbbf24', fontSize: '1rem' }}>
                            {review.stars === 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐'}
                        </div>
                        <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem', fontSize: '1rem' }}>{review.t}</p>
                        <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{review.d}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>{review.a}</p>
                    </div>
                ))}
              </div>
            </div>

            <button id="prevReview" onClick={prevReview} style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M15 18l-6-6 6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="nextReview" onClick={nextReview} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M9 18l6-6-6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div id="reviewDots" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Array.from({ length: totalReviews }).map((_, i) => (
                <span
                    key={i}
                    className="review-dot"
                    onClick={() => setCurrentReview(i)}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentReview ? '#FFB800' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }}
                ></span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Wszystkie recenzje możesz zobaczyć na oficjalnej stronie <strong style={{ color: '#FFB800' }}>Feedaty</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: '#FFB800', padding: '0.875rem 2rem', border: '2px solid #FFB800', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
              Dodaj Recenzję
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div id="reviewModal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                        ⚠️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Wyłącznie Potwierdzone Zakupy</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                        Aby uniknąć nieprawdziwych opinii, tylko klienci którzy nabyli ten produkt mogą dodać recenzję.
                    </p>
                    <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1.5rem', background: '#16a34a', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                        Zrozumiałem
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Order Form Section */}
      <section id="ordina" style={{ background: '#1E293B', padding: '5rem 1.5rem', color: 'white', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#FFB800', filter: 'blur(150px)', opacity: 0.1 }}></div>

        <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Limitowana Ilość</h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>Wykorzystaj promocję Black Friday póki trwa</p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="/images/condizionatore/specifiche.webp" alt="Klimatyzator Air Wave Smart produkt" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Air Wave Smart™ + Zestaw</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Zawiera aplikację na smartfon</div>
                </div>
              </div>
              <ul style={{ color: '#cbd5e1', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Cena regularna</span> <span style={{ textDecoration: 'line-through' }}>399 zł</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Zniżka Black Friday</span> <span style={{ color: '#FFB800' }}>-100 zł</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Dostawa</span> <span style={{ color: '#4ADE80' }}>GRATIS</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  <span>Suma</span> <span>299 zł</span>
                </li>
              </ul>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <span>🛡️ gwarancja 24 miesiące w pakiecie</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', color: '#1E293B' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Bezpieczna Transakcja</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Bez zaliczki.</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <input type="hidden" name="tmfp" />

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>IMIĘ ORAZ NAZWISKO</label>
                <input required type="text" name="nome_completo" placeholder="Jan Kowalski" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>KOMPLETNY ADRES</label>
                <input required type="text" name="indirizzo" placeholder="ul. Główna 123, 00-001 Warszawa" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELEFON</label>
                <input required type="tel" name="telefono" placeholder="+48 123 456 789" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              {/* Guarantees */}
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Zapłata przy odbiorze</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Bezpłatna dostawa 24-48h</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 dni na bezpłatny zwrot</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>gwarancja 24 miesiące w pakiecie</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #FFB800 0%, #FF7A00 100%)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(255, 122, 0, 0.4)',
                transition: 'all 0.3s ease'
              }}>
                <span>Zatwierdź Zamówienie</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="sticky-bottom-container" style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        padding: '0 1rem',
        zIndex: 1000
      }}>
        <div className="sticky-bottom-bar" style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div className="sticky-info" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flex: '1'
          }}>
            <div>
              <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 700, opacity: 0.95 }}>
                Air Wave Smart™
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>299 zł</span>
                <span style={{ fontSize: '0.875rem', textDecoration: 'line-through', color: 'white', opacity: 0.8 }}>399 zł</span>
              </div>
            </div>
          </div>
          <button
            className="sticky-button"
            onClick={scrollToForm}
            style={{
              background: '#16a34a',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            Kup Teraz
          </button>
        </div>
      </div>

    </>
  );
}
