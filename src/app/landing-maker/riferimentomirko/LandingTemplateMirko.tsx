'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import '@/styles/landing-mirko.css';

/* ------------------------------------------------------------------ */
/*  Inline SVG Icon Component                                          */
/* ------------------------------------------------------------------ */

function LandingIcon({ name, size = 20 }: { name: string; size?: number }) {
  const props = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 } as React.CSSProperties,
  };

  switch (name) {
    case 'cash':
      return (<svg {...props}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="3" /><path d="M2 10h2M20 10h2M2 14h2M20 14h2" /></svg>);
    case 'truck':
      return (<svg {...props}><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>);
    case 'return':
      return (<svg {...props}><polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" /><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" /></svg>);
    case 'box':
      return (<svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>);
    case 'leaf':
      return (<svg {...props}><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 20 2 20 2s-1.2 5.4-5 11" /><path d="M4 22c1-6 6-12 8.5-14.5" /></svg>);
    case 'droplet':
      return (<svg {...props}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>);
    case 'shield':
      return (<svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>);
    case 'gift':
      return (<svg {...props}><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>);
    case 'lock':
      return (<svg {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
    case 'warning':
      return (<svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>);
    case 'timer':
      return (<svg {...props}><circle cx="12" cy="14" r="8" /><line x1="12" y1="14" x2="12" y2="10" /><line x1="12" y1="14" x2="15" y2="14" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="10" y1="2" x2="14" y2="2" /></svg>);
    case 'money':
      return (<svg {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>);
    case 'check':
      return (<svg {...props}><circle cx="12" cy="12" r="10" /><polyline points="9 12 11 14 15 10" /></svg>);
    case 'phone':
      return (<svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>);
    case 'pencil':
      return (<svg {...props}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>);
    case 'stiffness':
      return (<svg {...props}><path d="M12 2a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" /><path d="M8 14l-2 8M16 14l2 8M12 10v4" /><path d="M7 11l-2-1M17 11l2-1" /></svg>);
    case 'pain':
      return (<svg {...props}><circle cx="12" cy="4" r="2" /><path d="M12 6v6" /><path d="M8 22l2-6h4l2 6" /><path d="M17 8l2-2M17 12l2 2" /><path d="M7 8L5 6M7 12l-2 2" /></svg>);
    case 'cable':
      return (<svg {...props}><path d="M8 2v4M16 2v4" /><rect x="6" y="6" width="12" height="4" rx="1" /><path d="M12 10v6" /><circle cx="12" cy="18" r="2" /><path d="M12 20v2" /></svg>);
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LandingTemplateMirko({ content = {} }: { content?: any }) {
  const router = useRouter();
  const pathname = usePathname();

  /* ---- extract sections ---- */
  const pricing = content?.pricing;
  const topBar = content?.topBar;
  const urgencyBanner = content?.urgencyBanner;
  const hero = content?.hero;
  const gallery = content?.gallery;
  const benefits = content?.benefits;
  const priceBox = content?.priceBox;
  const cta = content?.cta;
  const trustBadges = content?.trustBadges;
  const problems = content?.problems;
  const features = content?.features;
  const howItWorks = content?.howItWorks;
  const midCta = content?.midCta;
  const specs = content?.specs;
  const comparison = content?.comparison;
  const pkg = content?.package;
  const reviews = content?.reviews;
  const reviewPopupData = content?.reviewPopup;
  const orderForm = content?.orderForm;
  const faq = content?.faq;
  const stickyCta = content?.stickyCta;
  const tracking = content?.tracking;

  /* ---- slides & data ---- */
  const slides = gallery?.slides || [];
  const totalSlides = slides.length;
  const reviewItems = reviews?.items || [];
  const faqs = faq?.items || [];

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
  const [countdown, setCountdown] = useState((orderForm?.countdownMinutes || 118) * 60);

  /* ---- slides derived ---- */
  const thumbsVisible = Math.min(5, totalSlides);
  const thumbStart = totalSlides <= 5 ? 0 : Math.min(Math.max(0, currentSlide - 3), totalSlides - 5);
  const visibleThumbs = slides.slice(thumbStart, thumbStart + thumbsVisible);

  /* ---- refs ---- */
  const orderFormRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef(true);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkoutFiredRef = useRef(false);

  /* ---- begin checkout event (fires once) ---- */
  const fireBeginCheckout = useCallback(() => {
    if (checkoutFiredRef.current) return;
    checkoutFiredRef.current = true;
    const w = window as any;
    if (tracking?.googleAdsId && w.gtag) {
      w.gtag('event', 'begin_checkout', {
        value: tracking.conversionValue || pricing?.currentPrice || 0,
        currency: tracking.conversionCurrency || pricing?.currency || 'EUR',
      });
    }
    if (tracking?.facebookPixelId && w.fbq) {
      w.fbq('track', 'InitiateCheckout', {
        value: tracking.conversionValue || pricing?.currentPrice || 0,
        currency: tracking.conversionCurrency || pricing?.currency || 'EUR',
      });
    }
  }, [tracking, pricing]);

  /* ---- callbacks ---- */
  const scrollToOrder = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    fireBeginCheckout();
    orderFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [fireBeginCheckout]);

  const scrollToReviews = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    document.querySelector('.reviews-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  /* ---- effects ---- */
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? (orderForm?.countdownMinutes || 118) * 60 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 50) {
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

  useEffect(() => {
    if (totalSlides <= 0) return;
    autoplayTimerRef.current = setInterval(() => {
      if (autoplayRef.current) {
        setCurrentSlide((p) => (p >= totalSlides - 1 ? 0 : p + 1));
      }
    }, 3000);
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [totalSlides]);

  /* ---- tracking: Google Ads + Meta Pixel ---- */
  useEffect(() => {
    const w = window as any;

    // Google Ads (gtag.js)
    if (tracking?.googleAdsId) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.googleAdsId}`;
      document.head.appendChild(gtagScript);

      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag('js', new Date());
      w.gtag('config', tracking.googleAdsId);
    }

    // Meta Pixel (fbq)
    if (tracking?.facebookPixelId) {
      w.fbq = w.fbq || function () { (w.fbq.q = w.fbq.q || []).push(arguments); };
      w.fbq.loaded = true;
      w.fbq.version = '2.0';
      w.fbq.queue = w.fbq.q || [];

      const fbScript = document.createElement('script');
      fbScript.async = true;
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(fbScript);

      w.fbq('init', tracking.facebookPixelId);
      w.fbq('track', 'PageView');
    }
  }, []);

  /* ---- derived ---- */
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  const stopAutoplay = useCallback(() => {
    autoplayRef.current = false;
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const prevSlide = () => { stopAutoplay(); setCurrentSlide((p) => (p <= 0 ? totalSlides - 1 : p - 1)); };
  const nextSlide = () => { stopAutoplay(); setCurrentSlide((p) => (p >= totalSlides - 1 ? 0 : p + 1)); };
  const showMoreReviews = () => setReviewsShown((p) => Math.min(p + 3, reviewItems.length));
  const toggleFaq = (i: number) => setOpenFaqIndex(openFaqIndex === i ? -1 : i);
  const handleReviewSubmit = (e: React.FormEvent) => { e.preventDefault(); setReviewSubmitted(true); };

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="landing-mirko">

      {/* 1. TOP BAR */}
      {topBar && (
        <div className="top-bar">
          <div className="container">
            <p>{topBar.text}</p>
          </div>
        </div>
      )}

      {/* 2. URGENCY BANNER */}
      {urgencyBanner && (
        <div className="urgency-banner">
          {urgencyBanner.text} <strong>{urgencyBanner.highlight}</strong> {urgencyBanner.suffix}
        </div>
      )}

      {/* 3. HERO SECTION */}
      {hero && (
        <section className="hero-section">
          <div className="container">
            {hero.badge && <span className="hero-badge">{hero.badge}</span>}
            <h1>
              {hero.title} <em>{hero.titleHighlight}</em> {hero.titleSuffix}
            </h1>
            {hero.subtitle && <p className="hero-subtitle">{hero.subtitle}</p>}
            {hero.socialProof && (
              <div className="social-proof-line" onClick={scrollToReviews} style={{ cursor: 'pointer' }}>
                <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                {hero.socialProof.rating} &middot; {hero.socialProof.count}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. PRODUCT HERO */}
      {(gallery || benefits || priceBox || cta) && (
        <section className="product-hero">
          <div className="container">
            {/* Gallery */}
            {slides.length > 0 && (
              <div className="gallery">
                <div className="gallery-main">
                  {gallery?.discountTag && <span className="gallery-tag">{gallery.discountTag}</span>}
                  <Image src={slides[currentSlide]?.src} alt={slides[currentSlide]?.alt || ''} className="gallery-main-img" width={800} height={800} quality={85} sizes="(max-width: 768px) 100vw, 500px" />
                  <button className="gallery-arrow gallery-prev" onClick={prevSlide} aria-label="Precedente">&#8249;</button>
                  <button className="gallery-arrow gallery-next" onClick={nextSlide} aria-label="Successiva">&#8250;</button>
                </div>
                <div className="gallery-thumbs">
                  {visibleThumbs.map((slide: any, i: number) => {
                    const realIndex = thumbStart + i;
                    return (
                      <button key={realIndex} className={`gallery-thumb${currentSlide === realIndex ? ' active' : ''}`} onClick={() => { stopAutoplay(); setCurrentSlide(realIndex); }} aria-label={`Miniatura ${realIndex + 1}`}>
                        <Image src={slide.src} alt={slide.alt || ''} width={100} height={100} quality={70} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Info */}
            <div className="product-info">
              {benefits?.items?.length > 0 && (
                <ul className="benefit-list">
                  {benefits.items.map((b: any, i: number) => (
                    <li key={i}>
                      <span className="icon">&#10003;</span>
                      <div><strong>{b.title}</strong> <span>{b.description}</span></div>
                    </li>
                  ))}
                </ul>
              )}

              {priceBox && (
                <div className="price-box">
                  {priceBox.productName && <h3 className="price-product-name">{priceBox.productName}</h3>}
                  {priceBox.originalPriceLabel && (
                    <span className="price-original">{priceBox.originalPriceLabel} {content?.pricing?.currencySymbol}{content?.pricing?.originalPrice?.toFixed(2)?.replace('.', ',')}</span>
                  )}
                  <div className="price-current">{content?.pricing?.currencySymbol}{content?.pricing?.currentPrice?.toFixed(2)?.replace('.', ',')}</div>
                  {priceBox.discountLabel && <span className="price-discount">{priceBox.discountLabel}</span>}
                  <div className="price-shipping">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    {priceBox.shippingLabel} <strong>{priceBox.shippingValue}</strong>
                  </div>
                  {priceBox.guaranteeLabel && <div className="price-guarantee">{priceBox.guaranteeLabel}</div>}

                  {priceBox.offerItems?.length > 0 && (
                    <>
                      <button className="offer-toggle" onClick={() => setOfferOpen(!offerOpen)}>
                        {priceBox.offerToggleText} <span className={`arrow${offerOpen ? ' rot' : ''}`}>&#9660;</span>
                      </button>
                      <div className={`offer-reveal${offerOpen ? ' open' : ''}`}>
                        <div className="offer-reveal-inner">
                          <ul className="offer-list">
                            {priceBox.offerItems.map((item: any, i: number) => (
                              <li key={i}>
                                <span className="ol-icon">&#10003;</span> {item.text}
                                {item.badge && <strong style={{ color: 'var(--orange)', marginLeft: '6px' }}>{item.badge}</strong>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {cta && (
                <>
                  <a href="#order-form" className="cta-button" onClick={scrollToOrder}>
                    {cta.mainText}
                    <small>{cta.mainSubtext}</small>
                  </a>
                  {cta.subNote && <p className="cta-sub">{cta.subNote}</p>}
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. TRUST BADGES */}
      {trustBadges?.items?.length > 0 && (
        <section className="trust-badges">
          <div className="container">
            {trustBadges.items.map((badge: any, i: number) => (
              <div key={i} className={`trust-badge badge-${badge.color}`}>
                <div className="badge-icon"><LandingIcon name={badge.icon} /></div>
                <h4>{badge.text}</h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. PROBLEMS */}
      {problems?.items?.length > 0 && (
        <section className="problems-section">
          <div className="container">
            <span className="section-eyebrow negative">{problems.eyebrow}</span>
            <h2 className="section-title">{problems.title}</h2>
            <div className="problems-compact">
              {problems.items.map((p: any, i: number) => (
                <div key={i} className="problem-row">
                  <span className="problem-bullet"></span>
                  <p><strong>{p.titleBold}</strong> {p.text}</p>
                </div>
              ))}
            </div>
            {(problems.solutionTitle || problems.solutionText) && (
              <div className="problems-cta">
                {problems.solutionTitle && <h3>{problems.solutionTitle}</h3>}
                {problems.solutionText && <p>{problems.solutionText}</p>}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. FEATURES */}
      {features?.items?.length > 0 && (
        <section className="features-section">
          <div className="container">
            {features.eyebrow && <span className="section-eyebrow">{features.eyebrow}</span>}
            {features.title && <h2 className="section-title">{features.title}</h2>}
            {features.items.map((f: any, i: number) => (
              <div key={i} className={`feature-block${i % 2 !== 0 ? ' feature-block-right' : ''}`}>
                <div className="feature-media">
                  <Image src={f.image} alt={f.imageAlt || ''} width={600} height={450} quality={80} sizes="(max-width: 768px) 100vw, 500px" />
                </div>
                <div className="feature-text">
                  {f.tag && <span className={`feature-tag tag-${f.tagColor || 'green'}`}>{f.tag}</span>}
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. HOW IT WORKS */}
      {howItWorks?.steps?.length > 0 && (
        <section className="how-section">
          <div className="container">
            {howItWorks.eyebrow && <span className="section-eyebrow">{howItWorks.eyebrow}</span>}
            {howItWorks.title && <h2 className="section-title">{howItWorks.title}</h2>}
            {howItWorks.image && (
              <div className="how-image-wrapper" style={{ display: 'block' }}>
                <Image className="how-image" src={howItWorks.image} alt={howItWorks.imageAlt || ''} width={800} height={500} quality={80} sizes="(max-width: 768px) 100vw, 700px" />
              </div>
            )}
            <div className="steps-row">
              {howItWorks.steps.map((step: any, i: number) => (
                <div key={i} className="step-card">
                  <div className="step-number"><span>{i + 1}</span></div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. MID CTA */}
      {midCta && (
        <section className="mid-cta">
          <a href="#order-form" className="cta-button" onClick={scrollToOrder}>
            {midCta.text}
            <small>{midCta.subtext}</small>
          </a>
        </section>
      )}

      {/* 10. SPECS */}
      {specs?.items?.length > 0 && (
        <section className="specs-section">
          <div className="container">
            {specs.eyebrow && <span className="section-eyebrow">{specs.eyebrow}</span>}
            {specs.title && <h2 className="section-title">{specs.title}</h2>}
            <div className="specs-table">
              {specs.items.map((s: any, i: number) => (
                <div key={i} className="spec-row">
                  <span className="spec-label">{s.label}</span>
                  <span className="spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. COMPARISON */}
      {comparison?.rows?.length > 0 && (
        <section className="comparison-section">
          <div className="container">
            {comparison.eyebrow && <span className="section-eyebrow">{comparison.eyebrow}</span>}
            {comparison.title && <h2 className="section-title">{comparison.title}</h2>}
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Caratteristica</th>
                  <th>{comparison.productColumn} <span className="winner-badge">VINCITORE</span></th>
                  <th>{comparison.competitorColumn}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td>{row.product}</td>
                    <td>{row.competitor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 12. PACKAGE */}
      {pkg?.items?.length > 0 && (
        <section className="package-section">
          <div className="container">
            {pkg.eyebrow && <span className="section-eyebrow">{pkg.eyebrow}</span>}
            {pkg.title && <h2 className="section-title">{pkg.title}</h2>}
            <div className="package-box">
              <ul className="package-items">
                {pkg.items.map((item: any, i: number) => (
                  <li key={i}>
                    <div className="package-item-left">
                      <div className="package-item-icon"><LandingIcon name={item.icon} /></div>
                      <span>{item.text}</span>
                    </div>
                    {item.valueType === 'price' && (
                      <span className="package-item-value">{item.value}</span>
                    )}
                    {item.valueType === 'included' && (
                      <span className="package-item-included">{item.value}</span>
                    )}
                    {item.valueType === 'gift' && (
                      <span className="package-gift">{item.value}</span>
                    )}
                  </li>
                ))}
              </ul>
              <div className="package-total">
                <span className="total-original">{pkg.totalOriginalLabel} <span className="total-original-price">{pkg.totalOriginalValue}</span></span>
                <div className="total-current">{pkg.totalCurrentLabel} {pkg.totalCurrentValue}</div>
                <span className="total-save">{pkg.totalSave}</span>
              </div>
              {pkg.ctaText && (
                <a href="#order-form" className="cta-button" onClick={scrollToOrder}>{pkg.ctaText}</a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 13. REVIEWS */}
      {reviewItems.length > 0 && (
        <section className="reviews-section">
          <div className="container">
            {reviews.eyebrow && <span className="section-eyebrow">{reviews.eyebrow}</span>}
            {reviews.title && <h2 className="section-title">{reviews.title}</h2>}
            <div className="reviews-header">
              <div className="reviews-score">
                <span className="score-num">{reviews.rating}</span>
                <div className="score-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <span className="score-count">{reviews.totalCount}</span>
              </div>
              {reviews.verifiedNote && (
                <p className="reviews-verified-note">{reviews.verifiedNote}</p>
              )}
            </div>

            <div className="reviews-grid">
              {reviewItems.map((review: any, index: number) => (
                <div key={index} className={`review-card${index < reviewsShown ? ' visible' : ''}`}>
                  <div className="review-top">
                    <div className="review-avatar"><span>{review.initials}</span></div>
                    <div className="review-meta">
                      <h4>{review.name}</h4>
                      {review.verified && (
                        <span className="review-badge">&#10003; Acquisto verificato</span>
                      )}
                    </div>
                  </div>
                  <div className="review-stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span key={s} className={s < review.stars ? 'star-full' : 'star-empty'}>&#9733;</span>
                    ))}
                  </div>
                  <div className="review-text">
                    <p>{review.text}</p>
                  </div>
                  {review.sellerReply && (
                    <div className="seller-reply">
                      <span className="seller-reply-header"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> Risposta del venditore:</span>
                      <p>{review.sellerReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {reviewsShown < reviewItems.length && (
              <button className="show-more-btn" onClick={showMoreReviews}>{reviews.showMoreText || 'Mostra altre recensioni'}</button>
            )}
            <button className="leave-review-btn" onClick={() => { setReviewPopupOpen(true); setReviewSubmitted(false); setStarRating(0); }}>
              {reviews.leaveReviewText || <><LandingIcon name="pencil" size={16} /> Lascia una recensione</>}
            </button>
          </div>
        </section>
      )}

      {/* 14. REVIEW POPUP */}
      {reviewPopupData && (
        <div className={`review-popup-overlay${reviewPopupOpen ? ' open' : ''}`} onClick={() => setReviewPopupOpen(false)}>
          <div className="review-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setReviewPopupOpen(false)} aria-label="Chiudi">&times;</button>
            {!reviewSubmitted ? (
              <>
                <h3>{reviewPopupData.title}</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="popup-field">
                    <label htmlFor="review-name">{reviewPopupData.nameLabel}</label>
                    <input type="text" id="review-name" placeholder={reviewPopupData.namePlaceholder} required />
                  </div>
                  <div className="popup-field">
                    <label>{reviewPopupData.ratingLabel}</label>
                    <div className="star-picker">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < (starHover || starRating) ? 'active' : ''} onMouseEnter={() => setStarHover(i + 1)} onMouseLeave={() => setStarHover(0)} onClick={() => setStarRating(i + 1)}>&#9733;</span>
                      ))}
                    </div>
                  </div>
                  <div className="popup-field">
                    <label htmlFor="review-text-input">{reviewPopupData.textLabel}</label>
                    <textarea id="review-text-input" rows={4} placeholder={reviewPopupData.textPlaceholder} required></textarea>
                  </div>
                  <button type="submit" className="popup-submit">{reviewPopupData.submitText}</button>
                </form>
              </>
            ) : (
              <div className="review-success-msg">
                <div className="success-icon"><LandingIcon name="check" size={48} /></div>
                <p>{reviewPopupData.successTitle}</p>
                <p className="success-detail">{reviewPopupData.successText}</p>
                <button className="popup-submit" onClick={() => setReviewPopupOpen(false)}>{reviewPopupData.closeText}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 15. ORDER FORM */}
      {orderForm && (
        <section className="order-section" id="order-form" ref={orderFormRef}>
          <div className="container">
            {orderForm.eyebrow && <span className="section-eyebrow" style={{ display: 'block', textAlign: 'center' }}>{orderForm.eyebrow}</span>}
            {orderForm.title && <h2 className="section-title">{orderForm.title}</h2>}
            <div className="order-wrapper">
              {orderForm.showCountdown !== false && (
                <>
                  <div className="order-timer">
                    <p className="timer-label">{orderForm.timerLabel}</p>
                    <div className="timer-display">
                      <span>{String(hours).padStart(2, '0')}</span>
                      <span className="timer-sep">:</span>
                      <span>{String(minutes).padStart(2, '0')}</span>
                      <span className="timer-sep">:</span>
                      <span>{String(seconds).padStart(2, '0')}</span>
                    </div>
                  </div>
                </>
              )}

              {orderForm.stockWarning && (
                <p className="stock-warning" dangerouslySetInnerHTML={{ __html: orderForm.stockWarning }} />
              )}

              <div className="order-summary">
                {orderForm.summaryTitle && <h4>{orderForm.summaryTitle}</h4>}
                {slides.length > 0 && (
                  <div className="order-thumb">
                    <Image src={slides[0].src} alt={slides[0].alt || ''} width={100} height={100} quality={70} />
                  </div>
                )}
                {orderForm.summaryLines?.map((line: any, i: number) => (
                  <div key={i} className="order-line">
                    <span>{line.label}</span>
                    <span className={line.type === 'free' ? 'line-free' : ''}>{line.value}</span>
                  </div>
                ))}
                <div className="order-line total">
                  <span>{orderForm.totalLabel}</span>
                  <span>{orderForm.totalValue}</span>
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  name: (document.getElementById('order-name') as HTMLInputElement)?.value || '',
                  phone: (document.getElementById('order-phone') as HTMLInputElement)?.value || '',
                  address: (document.getElementById('order-address') as HTMLInputElement)?.value || '',
                };
                sessionStorage.setItem('orderData', JSON.stringify(formData));
                const tyPath = pathname.endsWith('/') ? `${pathname}ty` : `${pathname}/ty`;
                router.push(tyPath);
              }}>
                {orderForm.fields?.name && (
                  <div className="form-group">
                    <label htmlFor="order-name">{orderForm.fields.name.label}</label>
                    <input type="text" id="order-name" placeholder={orderForm.fields.name.placeholder} required onFocus={fireBeginCheckout} />
                  </div>
                )}
                {orderForm.fields?.phone && (
                  <div className="form-group">
                    <label htmlFor="order-phone">{orderForm.fields.phone.label}</label>
                    <input type="tel" id="order-phone" placeholder={orderForm.fields.phone.placeholder} required onFocus={fireBeginCheckout} />
                    {orderForm.phoneNote && <span className="input-note">{orderForm.phoneNote}</span>}
                  </div>
                )}
                {orderForm.fields?.address && (
                  <div className="form-group">
                    <label htmlFor="order-address">{orderForm.fields.address.label}</label>
                    <input type="text" id="order-address" placeholder={orderForm.fields.address.placeholder} required onFocus={fireBeginCheckout} />
                  </div>
                )}

                {orderForm.paymentBadge && <div className="payment-badge">{orderForm.paymentBadge}</div>}

                <button type="submit" className="cta-button-lg">
                  {orderForm.submitText}
                  <small>{orderForm.submitSubtext}</small>
                </button>

                {orderForm.reassurance && <p className="form-reassurance">{orderForm.reassurance}</p>}
              </form>
            </div>
          </div>
        </section>
      )}

      {/* 16. FAQ */}
      {faqs.length > 0 && (
        <section className="faq-section">
          <div className="container">
            {faq.eyebrow && <span className="section-eyebrow">{faq.eyebrow}</span>}
            {faq.title && <h2 className="section-title">{faq.title}</h2>}
            <div className="faq-list">
              {faqs.map((item: any, index: number) => (
                <div key={index} className={`faq-item${openFaqIndex === index ? ' open' : ''}`}>
                  <button className="faq-question" onClick={() => toggleFaq(index)}>
                    <span>{item.question}</span>
                    <span className="faq-toggle">+</span>
                  </button>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 17. STICKY CTA */}
      {stickyCta && (
        <div className={`sticky-cta${stickyVisible ? ' visible' : ''}`}>
          <div className="sticky-price">
            <span className="sp-old">{stickyCta.oldPrice}</span>
            <span className="sp-new">{stickyCta.newPrice}</span>
          </div>
          <a href="#order-form" className="sticky-btn" onClick={scrollToOrder}>
            {stickyCta.buttonText}
            <small>{stickyCta.buttonSubtext}</small>
          </a>
        </div>
      )}

    </div>
  );
}
