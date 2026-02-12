'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';

const inter = Inter({ subsets: ['latin'] });

export default function AntennaLandingPageHU() {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [isReviewAutoplaying, setIsReviewAutoplaying] = useState(true);
  const totalReviews = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

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

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' });
  };

  const productImages = [
    '/images/dongle/hu/1.png',
    '/images/dongle/hu/2.png',
    '/images/dongle/hu/3.png',
    '/images/dongle/hu/4.png',
    '/images/dongle/hu/5.png',
    '/images/dongle/hu/8.png',
    '/images/dongle/hu/7.png',
  ];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nomeCompleto = (formData.get('nome_completo') as string) || '';
    const [nome, ...cognomeParts] = nomeCompleto.trim().split(' ');
    const cognome = cognomeParts.join(' ');
    const telefono = (formData.get('telefono') as string) || '';
    const indirizzo = (formData.get('indirizzo') as string) || '';

    saveUserDataToStorage({
      nome: nome || '',
      cognome: cognome || '',
      telefono,
      indirizzo,
    });

    // Network API call
    try {
      const params = new URLSearchParams({
        uid: '0198088f-a4bc-7ed8-89aa-83089fe0180e',
        key: 'ec15cab563da6cf51f0c7c',
        offer: '417',
        lp: '417',
        name: nomeCompleto,
        phone: telefono,
        address: indirizzo,
      });

      // Get UTM parameters
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
    } catch (error) {
      console.error('[Network API] Error:', error);
    }

    router.push('/ty/ty-gg-dongle-hu');
  };

  return (
    <div className={`bg-white text-slate-800 ${inter.className}`}>
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
        src="https://offers.supertrendaffiliateprogram.com/forms/api/ck/?o=417&uid=0198088f-a4bc-7ed8-89aa-83089fe0180e&lp=417"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />
      <style jsx>{`
        .beam-box-1 {
          background: linear-gradient(to bottom, rgba(30,64,175,0.05), rgba(30,64,175,0.9) 25%, rgba(30,64,175,0.9));
        }
        .beam-box-2 {
          background: linear-gradient(to bottom, rgba(234,88,12,0.05), rgba(234,88,12,0.9) 25%, rgba(234,88,12,0.9));
        }
        .beam-box-3 {
          background: linear-gradient(to bottom, rgba(22,163,74,0.05), rgba(22,163,74,0.9) 25%, rgba(22,163,74,0.9));
        }
        @media (min-width: 768px) {
          .beam-box-1 {
            background: linear-gradient(to right, rgba(30,64,175,0), rgba(30,64,175,0.45) 30%, rgba(30,64,175,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .beam-box-2 {
            background: linear-gradient(to left, rgba(234,88,12,0), rgba(234,88,12,0.45) 30%, rgba(234,88,12,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .beam-box-3 {
            background: linear-gradient(to right, rgba(22,163,74,0), rgba(22,163,74,0.45) 30%, rgba(22,163,74,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
        }
      `}</style>
      {/* TOP BAR - Fade */}
      <div className="bg-yellow-400 py-3 relative shadow-md">
        <div className="relative h-6 flex items-center justify-center overflow-hidden">
          {[
            { text: '↩️ 30 NAP VISSZAKÜLDÉSI JOG' },
            { text: '💰 FIZETÉS ÁTVÉTELKOR' },
            { text: '🚚 INGYENES SZÁLLÍTÁS 24-48 ÓRA' },
          ].map((item, i) => (
            <span
              key={i}
              className="absolute font-bold text-sm uppercase tracking-wide text-white animate-fade-text"
              style={{ animationDelay: `${i * 3}s` }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-700 to-blue-600 text-white overflow-hidden pb-8">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* Hero Image / Product */}
            <div className="w-full lg:w-1/2 z-10 relative order-1 lg:order-2">
              {/* Product Image - Square */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-[conic-gradient(from_0deg,#3b82f6,#06b6d4,#8b5cf6,#a855f7,#22c55e,#10b981,#f59e0b,#f97316,#3b82f6)] p-[5px]">
              <div className="w-full h-full rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={productImages[currentSlide]}
                  alt="Smart Aerial TV - ingyenes csatornák 4K minőségben"
                  className="w-full h-full object-cover"
                />
                </div>
                {/* Badge */}
                <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  🔥 Korlátozott ideig érvényes ajánlat
                </div>
                {/* Badge távirányító */}
                <div className="absolute bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  🎮 Smart Távirányító Mellékelve
                </div>
              </div>

              {/* Thumbnails - Outside the square */}
              <div className="flex flex-row gap-1 md:gap-2 mt-4 justify-between md:justify-center w-full">
                {productImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="flex-1 md:flex-none aspect-square md:w-16 md:h-16 rounded-md md:rounded-lg overflow-hidden bg-white cursor-pointer"
                  >
                    <img src={src} alt={`Miniatűr ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-1/2 z-10 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 rounded-full px-4 py-1 text-sm font-extrabold mb-4 uppercase tracking-wider shadow-lg">
                ⭐ Smart Aerial TV
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
                4K TV <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Ingyen</span>,{' '}
                <span className="text-white">Kábel nélkül, előfizetés nélkül</span>
              </h1>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0"
              >
                <div className="flex gap-0.5 text-yellow-400">⭐⭐⭐⭐⭐</div>
                <span className="text-white font-semibold">4.8</span>
                <span className="text-slate-300 text-sm">(485 vélemény)</span>
              </button>

              <p className="text-slate-300 text-base mb-4 leading-relaxed">
                <strong>Mondjon búcsút örökre a havi TV-díjaknak.</strong> A Smart Aerial TV-vel foghatja az országos és helyi csatornákat 4K/Full HD minőségben: híradó, időjárás, sport, filmek, sorozatok és gyermekműsorok <span className="text-yellow-400 font-bold">havi díjak nélkül</span>.
              </p>

              <p className="text-slate-300 mb-4 text-sm">
                Csatlakoztassa az antennát, indítsa el a csatornakeresést és… kezdje el nézni kedvenc műsorait.
              </p>

              {/* Price Box */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="bg-white/20 p-3 rounded-lg border border-white/30 backdrop-blur-sm shadow-inner w-full sm:w-auto text-center sm:text-left">
                  <div className="text-white/70 line-through text-sm">Normál ár 33 999 Ft</div>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <span className="text-5xl font-black text-white tracking-tight">23 999 Ft</span>
                    <div className="flex flex-col items-start">
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">Villámajánlat</span>
                      <span className="text-green-400 text-xs font-bold">-29% Kedvezmény</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-[#038218] to-[#05a31f] hover:from-[#02710f] hover:to-[#038218] text-white py-4 px-10 rounded-full shadow-xl shadow-[#038218]/50 transform transition hover:-translate-y-1 hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
                >
                  <span className="text-xl font-black uppercase tracking-wide">RENDELJE MEG MOST</span>
                  <span className="text-sm font-medium opacity-90">Fizetés átvételkor</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl grid grid-cols-3 divide-x divide-white/30 overflow-hidden">
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🚚</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Szállítás</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">Ingyenes 24-48 óra</span>
                </div>
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">💰</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Fizetés</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">Átvételkor</span>
                </div>
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🛡️</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Garancia</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">30 nap</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className={`fade-section py-16 bg-gradient-to-b from-slate-50 to-white transition-all duration-700 ${isVisible['benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-sky-400/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">🎙️</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Hangvezérlés</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Irányítsa a TV-t <span className="font-semibold text-blue-500">hangjával</span>. Váltson csatornát, állítsa a hangerőt és keressen tartalmakat távirányító nélkül.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">📺</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">4K/HD felbontás</h3>
                  <p className="text-slate-600 text-sm leading-relaxed"><span className="font-semibold text-purple-600">Kristálytiszta</span> kép, új generációs gaming 4K-ban, élénk színek és nulla interferencia.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">30 mp alatt kész</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Dugja be a pendrive-ot, <span className="font-semibold text-green-600">kapcsolja be a TV-t</span> és nézze azonnal. Adapter minden TV-hez mellékelve.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">💸</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Nulla havi díj</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Spóroljon <span className="font-semibold text-amber-600">évi 200 000 Ft-ot</span>. Vége az előfizetéseknek.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN WATCH */}
      <section id="watch" className={`fade-section py-16 bg-white transition-all duration-700 ${isVisible['watch'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Mit nézhet <span className="text-blue-500">minden nap</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Kedvenc csatornái, <span className="font-bold">teljesen ingyen</span>.
            </p>
          </div>

          <div className="space-y-16">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text - Desktop */}
              <svg className="hidden md:block absolute left-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="rgba(30,64,175,0.7)" />
                    <stop offset="60%" stopColor="rgba(30,64,175,0.45)" />
                    <stop offset="100%" stopColor="rgba(30,64,175,0.15)" />
                  </linearGradient>
                  <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="0,5 100,42 100,58 0,95" fill="url(#beamGrad1)" filter="url(#blur1)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="/images/dongle/sliderhero/8.png" alt="Ingyenes filmek és sorozatok digitális antennával" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-800/50 to-transparent md:hidden"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-3/5 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-r-[6px] border-blue-700/80 beam-box-1">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">🎬</span> Szórakozás
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Filmek és sorozatok</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Nézzen <span className="font-bold">filmeket, sorozatokat, dokumentumfilmeket</span> az országos csatornákon HD minőségben. M1, RTL, TV2 és még sok más.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Örökre ingyenes.
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text (reversed) - Desktop */}
              <svg className="hidden md:block absolute right-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad2" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="rgba(234,88,12,0.7)" />
                    <stop offset="60%" stopColor="rgba(234,88,12,0.45)" />
                    <stop offset="100%" stopColor="rgba(234,88,12,0.15)" />
                  </linearGradient>
                  <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="100,5 0,42 0,58 100,95" fill="url(#beamGrad2)" filter="url(#blur2)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-3/5 order-2 md:order-1 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-l-[6px] border-orange-700/80 beam-box-2">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">⚽</span> Élő sport
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Sport a világ minden tájáról</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Kövesse a <span className="font-bold">meccseket, sportversenyeket, autóversenyeket</span> az ingyenes csatornákon. Ne hagyjon ki egyetlen pillanatot sem.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Stabil jel még élő közvetítések alatt is.
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5 order-1 md:order-2 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="/images/dongle/sliderhero/5.png" alt="Ingyenes élő sport Smart Aerial TV-vel" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-orange-700/50 to-transparent md:hidden"></div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text - Desktop */}
              <svg className="hidden md:block absolute left-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad3" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="rgba(22,163,74,0.7)" />
                    <stop offset="60%" stopColor="rgba(22,163,74,0.45)" />
                    <stop offset="100%" stopColor="rgba(22,163,74,0.15)" />
                  </linearGradient>
                  <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="0,5 100,42 100,58 0,95" fill="url(#beamGrad3)" filter="url(#blur3)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="/images/dongle/sliderhero/4.png" alt="Gyermekműsorok és játékok Smart Aerial TV-n" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-700/50 to-transparent md:hidden"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-3/5 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-r-[6px] border-green-700/80 beam-box-3">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">🎮</span> Az egész családnak
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Játékok és gyermekműsorok</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Játsszon <span className="font-bold">kedvenc játékaival</span> a nagy képernyőn a <span className="font-bold">mellékelt távirányítóval</span>. Szórakoztassa a gyerekeket mesékkel és oktató műsorokkal.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Szórakozás az egész családnak.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howto" className={`fade-section py-12 md:py-20 bg-slate-900 text-white transition-all duration-700 ${isVisible['howto'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2 block">Maximális egyszerűség</span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">30 másodperc alatt kész</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic font-medium text-sm md:text-base">
              "Nyisd ki, csatlakoztasd, keresd meg a csatornákat. Kész."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-12 relative">
            {/* Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-slate-700 via-yellow-500/50 to-slate-700 rounded-full" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">📦</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">1. Nyissa ki a csomagot</h3>
                <p className="text-slate-400 text-sm max-w-xs">Benne találja az antennát, a prémium koaxiális kábelt és az útmutatót.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">🔌</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">2. Dugja be a Pendrive-ot</h3>
                <p className="text-slate-400 text-sm max-w-xs">Csatlakoztassa a Smart Aerial TV-t az USB porthoz. Használja a mellékelt adaptert ha TV-jén nincs USB bemenet.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">▶️</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">3. Keresse meg a csatornákat</h3>
                <p className="text-slate-400 text-sm max-w-xs">Indítsa el az automatikus keresést és kezdje el ingyen nézni a TV-t!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className={`fade-section py-16 bg-white transition-all duration-700 ${isVisible['specs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-[2.5rem] font-extrabold text-center mb-8 md:mb-10 text-slate-900">
            Maximális teljesítmény, <span className="text-blue-500">nulla bonyodalom</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1260px] mx-auto">
            {/* Specs cards */}
            <div className="grid grid-cols-1 gap-4">
            {/* Row 1 - 3 cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📡</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">360°</div>
                <div className="text-xs md:text-sm text-gray-500">Körkörös vétel</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📏</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">400km</div>
                <div className="text-xs md:text-sm text-gray-500">Maximális hatótáv</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📺</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">4K UHD</div>
                <div className="text-xs md:text-sm text-gray-500">Képminőség</div>
              </div>
            </div>

            {/* Row 2 - Mobile: single combined card / Desktop: 2 cards */}
            {/* Mobile combined card */}
            <div className="md:hidden bg-[#F5F5F5] rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔌</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">Prémium kábel</span>
                    <p className="text-xs text-gray-500">Nagy tisztaságú réz, aranyozott csatlakozók</p>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🎨</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">Karcsú dizájn</span>
                    <p className="text-xs text-gray-500">Vékony, elegáns, bárhova beilleszkedik</p>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">0 Ft havonta</span>
                    <p className="text-xs text-gray-500">Előfizetés nélkül, ingyenes csatornák örökre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 2 cards */}
            <div className="hidden md:grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🔌</span>
                  <h3 className="text-base md:text-lg font-semibold text-blue-500">Prémium kábel a csomagban</h3>
                </div>
                <p className="text-gray-600 text-sm md:text-[0.9375rem] leading-relaxed">
                  <strong>Nagy tisztaságú réz</strong> a minimális jelveszteségért. Aranyozott csatlakozók a stabil és tartós kapcsolatért.
                </p>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">🎨</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">Slim</div>
                <div className="text-xs md:text-sm text-gray-500">Modern dizájn</div>
              </div>
            </div>

            {/* Row 3 - full width (desktop only) */}
            <div className="hidden md:block bg-[#F5F5F5] rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="text-lg md:text-2xl font-bold text-blue-500">0 Ft havonta</div>
                <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
                <div className="text-sm text-gray-500">Előfizetés nélkül, díjak nélkül. Csak ingyenes csatornák örökre.</div>
              </div>
            </div>
            </div>

            {/* Image box */}
            <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl overflow-hidden items-center justify-center min-h-[250px] lg:min-h-[400px] order-last lg:order-none">
              <img src="/images/dongle/sliderhero/7.png" alt="Smart Aerial TV műszaki specifikációk" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews-section" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #F0F7FF 10%, #F0F7FF 90%, #ffffff 100%)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 id="reviews" style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.75rem', color: '#111827' }}>
            Ellenőrzött vásárlói vélemények
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24' }}>⭐⭐⭐⭐⭐</div>
            <span style={{ fontWeight: 700, color: '#111827' }}>4.8</span>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>(485 vélemény)</span>
          </div>

          <div className="relative max-w-[280px] md:max-w-[700px] mx-auto mb-8">
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentReview * 100}%)` }}>
                {[
                    { t: 'Tényleg működik', d: 'Szkeptikus voltam, de el kell ismernem, hogy működik.. lemondtam a kábelt és most mindent ingyen nézek. jó a minőség', a: 'Márk R.', stars: 5 },
                    { t: 'Könnyű felszerelni', d: 'a fiam 5 perc alatt felszerelte. azt hittem nehezebb lesz de nem, csatlakoztatod a kábelt és működik', a: 'Anna M.', stars: 5 },
                    { t: 'Jól fogja', d: 'A 3. emeleten lakom és korábban rossz volt a vétel.. ezzel az antennával minden csatornát jól fogok. még az M2-t is amit sosem kaptam', a: 'József T.', stars: 5 },
                    { t: 'Egyelőre rendben', d: 'tegnap érkezett meg, úgy tűnik jól működik de meg akarom nézni idővel hogy lesz. egyelőre 4 csillag aztán frissítem', a: 'Éva P.', stars: 4 },
                    { t: 'Gyors szállítás', d: '2 nap után megérkezett, a futár telefonált mielőtt jött. jól működik nézem a meccseket fizetés nélkül!!', a: 'Róbert S.', stars: 5 },
                    { t: 'Végre', d: 'vége az előfizetéseknek.. nézem amit akarok anélkül hogy egy forintot költenék. korábban kellett volna megcsinálnom', a: 'Katalin B.', stars: 5 },
                    { t: 'Nem látszik', d: 'A TV mögé tettem és egyáltalán nem látszik. a feleségem boldog hogy nem csúnya mint a régi antennák', a: 'László D.', stars: 5 },
                    { t: 'Jobb mint a tetőn lévő', d: 'volt egy antennám a tetőn ami már nem működött.. ezt beleteszed és ugyanúgy vagy jobban fog', a: 'Mária G.', stars: 5 },
                    { t: 'Fizetés átvételkor', d: 'Nem bízom az online fizetésben de itt fizetsz amikor megérkezik szóval tökéletes. jó termék ajánlom', a: 'Antal C.', stars: 5 },
                    { t: 'Elégedett vagyok', d: 'féltem hogy átverés de mégsem működik. a gyerekek nézik a meséket én meg a műsorokat. így jó', a: 'Stefánia L.', stars: 5 }
                ].map((review, i) => (
                    <div key={i} style={{ minWidth: '100%', background: 'linear-gradient(135deg, #FAFCFF, #F0F7FF)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
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

            <button onClick={prevReview} className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-[50px] bg-white border border-gray-200 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full cursor-pointer shadow-lg flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M15 18l-6-6 6-6" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={nextReview} className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-[50px] bg-white border border-gray-200 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full cursor-pointer shadow-lg flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M9 18l6-6-6-6" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Array.from({ length: totalReviews }).map((_, i) => (
                <span
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentReview ? '#3B82F6' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }}
                ></span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Az összes véleményt elolvashatja a <strong style={{ color: '#3B82F6' }}>Feedaty</strong> hivatalos oldalán.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: '#3B82F6', padding: '0.875rem 2rem', border: '2px solid #3B82F6', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
              Írjon véleményt
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                        ⚠️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Csak ellenőrzött vásárlások</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        A vélemények hitelességének biztosítása érdekében csak azok az ügyfelek hagyhatnak értékelést, akik megvásárolták a terméket.
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        A vásárlás után e-mailben kapja meg a linket az ellenőrzött vélemény írásához.
                    </p>
                    <button onClick={() => setIsModalOpen(false)} style={{ background: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                        Értem
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* GUARANTEE */}
      <section className="py-10 bg-white border-t border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">A Smart Aerial TV-vel maximális védelem jár</h2>
          <div className="flex flex-row justify-center gap-4 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">🛡️</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">30 napos visszaküldés</h4>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">🚚</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">Ingyenes szállítás</h4>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">💬</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">Dedikált támogatás</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="ordina" style={{ background: '#1E293B', padding: '3rem 0.75rem', color: 'white', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#3B82F6', filter: 'blur(150px)', opacity: 0.1 }}></div>

        <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Korlátozott készlet</h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>Ragadja meg az akciót, amíg tart</p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="/images/dongle/hu/1.png" alt="Smart Aerial TV akcióban" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Smart Aerial TV</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Prémium kábel + szerelőkészlet mellékelve</div>
                </div>
              </div>
              <ul style={{ color: '#cbd5e1', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Listaár</span> <span style={{ textDecoration: 'line-through' }}>33 999 Ft</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Különleges kedvezmény</span> <span style={{ color: '#3B82F6' }}>-10 000 Ft</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Szállítás</span> <span style={{ color: '#4ADE80' }}>INGYENES</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  <span>Összesen</span> <span>23 999 Ft</span>
                </li>
              </ul>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <span>🛡️ 2 év garancia az árban</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', color: '#1E293B' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Biztonságos fizetés</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nem kérünk előleget.</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELJES NÉV</label>
                <input required type="text" name="nome_completo" placeholder="Kovács János" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELJES CÍM</label>
                <input required type="text" name="indirizzo" placeholder="Budapest, Fő utca 123, 1011" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELEFONSZÁM</label>
                <input required type="tel" name="telefono" placeholder="+36 30 123 4567" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              {/* Garanzie e Sicurezza */}
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Fizetés átvételkor</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Ingyenes szállítás 24-48 óra</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 napos ingyenes visszaküldés</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>2 év garancia az árban</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease'
              }}>
                <span>Rendelés megerősítése</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`fade-section py-16 bg-slate-50 transition-all duration-700 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Gyakran ismételt kérdések</h2>
          <div className="space-y-4">
            {[
              { q: "Működik minden TV-vel?", a: "Igen, minden koaxiális antenna bemenettel rendelkező TV-vel működik (gyakorlatilag az összes modellel)." },
              { q: "Kell előfizetést fizetnem?", a: "Egyáltalán nem. A földfelszíni digitális TV csatornáit fogja, amelyek törvény szerint ingyenesek." },
              { q: "Bonyolult a telepítés?", a: "Egyáltalán nem! Csak csatlakoztassa a kábelt a TV-hez és indítsa el a csatornakeresést. Maximum 2 perc." },
              { q: "Mi van, ha nem vagyok elégedett?", a: "30 napja van visszaküldeni a terméket és teljes visszatérítést kapni, kérdések nélkül. Ráadásul a termékre 2 év garancia vonatkozik." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50"
                >
                  <span className="font-bold text-slate-800 text-lg pr-4">{item.q}</span>
                  <span className={`text-2xl transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-slate-600">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.15)] z-50 flex items-center justify-between md:justify-center gap-6 transition-transform duration-300 rounded-t-2xl ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-slate-900 font-bold">🔥 Korlátozott ajánlat</span>
          <span className="text-slate-500 line-through text-sm">33 999 Ft</span>
          <span className="text-emerald-700 font-black text-2xl">23 999 Ft</span>
          <span className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded">-29%</span>
        </div>
        <div className="md:hidden flex flex-col">
          <span className="text-xs text-slate-900 font-bold">🔥 Korlátozott ajánlat</span>
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-slate-500 line-through">33 999 Ft</span>
            <span className="font-black text-emerald-700 text-xl">23 999 Ft</span>
            <span className="text-xs font-bold text-blue-500 bg-blue-100 px-1 rounded">-29%</span>
          </div>
        </div>
        <button onClick={scrollToForm} className="bg-gradient-to-r from-[#038218] to-[#05a31f] hover:from-[#02710f] hover:to-[#038218] text-white font-black py-3 px-8 rounded-lg shadow-lg uppercase tracking-wide">
          RENDELJE MEG
        </button>
      </div>

      {/* CSS for fade text animation */}
      <style jsx>{`
        @keyframes fadeText {
          0%, 20% { opacity: 1; }
          25%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-text {
          opacity: 0;
          animation: fadeText 9s infinite;
        }
      `}</style>
    </div>
  );
}
