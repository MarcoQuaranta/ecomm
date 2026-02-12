'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SiteLayout from '@/components/SiteLayout';
import Link from 'next/link';
import { getDisplayProducts, type Product } from '@/lib/products';
import { categories } from '@/lib/categories';
import { useCountry } from '@/hooks/useCountry';

// Hero slides statici
const heroSlides = [
  {
    image: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Attrezzi da Giardino Professionali',
    subtitle: 'Scopri la nostra selezione di utensili di alta qualità',
    cta: 'Scopri Ora',
    badge: 'NUOVA COLLEZIONE'
  },
  {
    image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Utensili per Ogni Lavoro',
    subtitle: 'Qualità professionale a prezzi accessibili',
    cta: 'Vedi Offerte',
    badge: 'SCONTI FINO AL 50%'
  },
  {
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Per la Tua Casa',
    subtitle: 'Tutto ciò che ti serve per il comfort domestico',
    cta: 'Esplora',
    badge: 'SPEDIZIONE RAPIDA'
  }
];

// Brands statici (nomi di fantasia)
const brands = [
  { name: 'bosek', displayName: 'BOSEK', color: '#E30613' },
  { name: 'makito', displayName: 'MAKITO', color: '#00A0D2' },
  { name: 'dewolt', displayName: 'DEWOLT', color: '#FEBD17' },
  { name: 'stanlex', displayName: 'STANLEX', color: '#FFE600' },
  { name: 'blacker', displayName: 'BLACKER', color: '#F7941D' },
  { name: 'einhall', displayName: 'EINHALL', color: '#E30613' }
];

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();

  // Rileva nazione visitatore
  const { countryCode } = useCountry();

  // Carica prodotti filtrati per nazione (mostra solo 1 per nome, preferendo gg- e nazione utente)
  const products = getDisplayProducts(countryCode);
  // Hot deals: prendi i prodotti filtrati con sconto > 0
  const hotDeals = products.filter(p => p.discount > 0).sort((a, b) => b.discount - a.discount).slice(0, 4);

  // Transform values for hero fade effect
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(sliderTimer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <SiteLayout className="flex flex-col items-center bg-gray-100">

        {/* Hero Slider - Full Width */}
        <motion.section
          ref={heroRef}
          className="w-full h-[500px] md:h-[600px] relative overflow-hidden"
          style={{
            opacity: heroOpacity,
            y: heroY
          }}
        >
          {/* Slider Images */}
          <motion.div
            className="absolute inset-0"
            style={{ scale: heroScale }}
          >
            {heroSlides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.1
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
              </motion.div>
            ))}
          </motion.div>

          {/* Slider Content */}
          <div className="relative h-full max-w-[1500px] mx-auto px-4">
            <div className="h-full flex items-center">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-white max-w-2xl"
              >
                <motion.span
                  className="inline-block bg-orange-500 text-white px-4 py-2 rounded-md text-xs md:text-sm font-bold mb-4"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {heroSlides[currentSlide]?.badge}
                </motion.span>
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide]?.title}
                </motion.h1>
                <motion.p
                  className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {heroSlides[currentSlide]?.subtitle}
                </motion.p>
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link href="/catalogo">
                    <button className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white text-base md:text-lg font-bold rounded-md shadow-xl transform hover:scale-105 transition-all">
                      {heroSlides[currentSlide]?.cta}
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Slider Controls Container */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {/* Navigation Arrow Left - Mobile */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
              className="md:hidden bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slider Indicators */}
            <div className="flex gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-12 h-2 bg-white'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                  } rounded-full`}
                />
              ))}
            </div>

            {/* Navigation Arrow Right - Mobile */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
              className="md:hidden bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.section>

        {/* Blue Strip - Soddisfatto o rimborsato */}
        <div className="w-full bg-blue-600 py-3 text-center">
          <p className="text-white font-semibold text-sm md:text-base px-4">
            Soddisfatto o rimborsato: 30 giorni per reso e rimborso gratuito
          </p>
        </div>

        <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4">

          {/* Categories Section with Images */}
          <section className="py-6 md:py-12 bg-white rounded-lg my-3 md:my-6 shadow-sm">
            <div className="px-3 md:px-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Esplora le Collezioni</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, index) => (
                  <Link key={cat.slug} href={`/catalogo?categoria=${cat.slug}`}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group cursor-pointer"
                      whileHover={{ y: -5 }}
                    >
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                        <div className="aspect-square relative overflow-hidden bg-gray-100">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                            style={{ backgroundColor: cat.color }}
                          />
                        </div>
                        <div className="p-3" style={{ borderTop: `3px solid ${cat.color}` }}>
                          <h3 className="text-sm font-semibold text-center">{cat.name}</h3>
                          <p className="text-xs text-gray-500 text-center mt-1 line-clamp-1">{cat.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Hot Deals Section */}
          {hotDeals.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm my-3 md:my-6 border-2 border-orange-600">
              <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-t-lg">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 flex-wrap">
                  <span>Offerte Lampo</span>
                  <span className="text-base font-normal">
                    - Termina tra {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </h2>
              </div>
              <div className="p-3 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {hotDeals.map((deal, index) => (
                    <Link key={deal.id} href={deal.landingPath}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group cursor-pointer h-full"
                      >
                        <div className="relative">
                          <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-32 md:h-48 object-cover"
                          />
                          <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-600 text-white px-1 md:px-2 py-0.5 md:py-1 rounded text-[10px] md:text-xs font-bold">
                            -{deal.discount}%
                          </div>
                        </div>
                        <div className="p-2 md:p-4">
                          <h3 className="font-semibold mb-2 md:mb-3 line-clamp-2 text-xs md:text-base">{deal.name}</h3>
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 md:py-2 rounded font-semibold text-xs md:text-base transition-colors">
                            Paga alla Consegna
                          </button>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Featured Products */}
          {products.length > 0 && (
            <section className="bg-white rounded-lg shadow-sm my-3 md:my-6 p-3 md:p-6">
              <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">I nostri prodotti</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((prod, index) => (
                  <Link key={prod.id} href={prod.landingPath}>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group bg-white cursor-pointer h-full"
                    >
                      <div className="relative aspect-square bg-gray-50">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                        />
                        {prod.discount > 0 && (
                          <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                            -{prod.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-2 md:p-4">
                        <h3 className="font-semibold mb-2 md:mb-3 line-clamp-2 text-xs md:text-base">{prod.name}</h3>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 md:py-2 rounded font-semibold text-xs md:text-base transition-colors">
                          Paga alla Consegna
                        </button>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Pagamento alla Consegna Banner with Image */}
          <section className="bg-gradient-to-r from-green-600 to-green-800 rounded-lg shadow-sm my-3 md:my-6 p-4 md:p-8 text-white">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl">💵</span>
                  <span className="text-sm font-bold">PAGAMENTO SICURO</span>
                </div>
                <h2 className="text-xl md:text-3xl font-bold mb-4">Paga Comodamente alla Consegna</h2>
                <p className="text-lg mb-6 text-green-50">
                  Con il contrassegno gratuito paghi solo quando ricevi la merce. Zero rischi, massima tranquillità!
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Nessun Pagamento Anticipato</div>
                      <div className="text-green-100 text-sm">Paghi solo dopo aver verificato il prodotto</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">100% Sicuro</div>
                      <div className="text-green-100 text-sm">Nessun rischio di frodi online</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Consegna in 24/48 ore</div>
                      <div className="text-green-100 text-sm">Ricevi rapidamente il tuo ordine</div>
                    </div>
                  </li>
                </ul>
                <Link href="/pagamento-alla-consegna">
                  <button className="bg-white hover:bg-gray-100 text-green-800 px-6 py-3 rounded-md font-bold shadow-lg transition-colors">
                    Scopri Come Funziona
                  </button>
                </Link>
              </div>
              <div className="relative mt-6 md:mt-0">
                <img
                  src="https://images.pexels.com/photos/4246120/pexels-photo-4246120.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="Consegna e pagamento"
                  className="rounded-lg shadow-2xl w-full"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-3 md:px-6 py-2 md:py-3 rounded-lg shadow-xl font-bold">
                  <div className="text-lg md:text-2xl">🚚 + 💵</div>
                  <div className="text-xs md:text-sm">Paga alla Consegna!</div>
                </div>
              </div>
            </div>
          </section>

          {/* Brands Section */}
          <section className="bg-white rounded-lg shadow-sm my-3 md:my-6 p-3 md:p-6">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">I nostri marchi</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand.name}
                  className="flex items-center justify-center p-3 md:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer bg-white aspect-[3/2] overflow-hidden"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className="font-bold text-xs md:text-lg tracking-wide text-center truncate max-w-full"
                    style={{ color: brand.color }}
                  >
                    {brand.displayName}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* Newsletter */}
        <section className="w-full bg-slate-100 py-12">
          <div className="max-w-[1500px] mx-auto px-4 text-center">
            {!isSubscribed ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Non perderti le nostre offerte!</h2>
                <p className="mb-6 text-gray-600">Iscriviti alla newsletter e ricevi sconti esclusivi ogni mese.</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Inserisci la tua email"
                    className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition-colors"
                  >
                    Iscriviti
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8"
              >
                <div className="inline-flex items-center gap-3 text-green-600">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold">Grazie per la fiducia!</span>
                </div>
              </motion.div>
            )}
          </div>
        </section>
    </SiteLayout>
  );
}
