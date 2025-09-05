'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import Button from './components/ui/buttons';
import Card from './components/ui/card';
import Input from './components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import Link from 'next/link';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1920&h=800&fit=crop',
    title: 'Utensili Professionali',
    subtitle: 'Fino al -50% su trapani e avvitatori',
    cta: 'Scopri le offerte',
    badge: 'OFFERTA LIMITATA'
  },
  {
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&h=800&fit=crop',
    title: 'Rinnova la Tua Casa',
    subtitle: 'Tutto per dipingere e decorare',
    cta: 'Acquista ora',
    badge: 'NUOVO ARRIVO'
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop',
    title: 'Giardinaggio e Outdoor',
    subtitle: 'Preparati alla primavera con sconti fino al -40%',
    cta: 'Esplora catalogo',
    badge: 'BESTSELLER'
  },
  {
    image: 'https://images.unsplash.com/photo-1606676539940-12768ce0e762?w=1920&h=800&fit=crop',
    title: 'Sicurezza e Protezione',
    subtitle: 'Tutto per lavorare in sicurezza',
    cta: 'Vedi prodotti',
    badge: 'QUALITÀ TOP'
  },
  {
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&h=800&fit=crop',
    title: 'Illuminazione LED Smart',
    subtitle: 'Risparmia energia con stile',
    cta: 'Scopri di più',
    badge: 'ECO FRIENDLY'
  }
];

const categories = [
  { name: 'Giardinaggio', slug: 'giardinaggio', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', count: '4 prodotti', color: 'from-green-500 to-green-600' },
  { name: 'Utensili', slug: 'utensili', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop', count: '1 prodotto', color: 'from-blue-500 to-blue-600' },
  { name: 'Per la casa', slug: 'per-la-casa', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', count: '2 prodotti', color: 'from-orange-500 to-orange-600' },
  { name: 'Elettronica', slug: 'elettronica', image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=400&h=300&fit=crop', count: '1 prodotto', color: 'from-purple-500 to-purple-600' },
];

const featuredProducts = products.slice(0, 6).map(product => ({
  id: product.id,
  slug: product.slug,
  title: product.name,
  price: `€${product.price.toFixed(2)}`,
  originalPrice: product.originalPrice ? `€${product.originalPrice.toFixed(2)}` : undefined,
  discount: product.discount ? `-${product.discount}%` : undefined,
  image: product.images?.[0] || product.image || 'https://via.placeholder.com/400',
  rating: product.rating || 4.5,
  reviews: product.reviews || 100,
  badge: product.id === 'soffiatore-1' ? 'Bestseller' : 
         product.id === 'drone-1' ? 'Top Tech' :
         product.id === 'condizionatore-1' ? 'Eco A+++' : 
         product.discount && product.discount > 35 ? 'Super Offerta' : undefined,
  prime: product.shipping?.freeShipping || product.freeShipping || false
}));

const hotDeals = products
  .filter(product => product.discount && product.discount >= 30)
  .slice(0, 3)
  .map(product => ({
    slug: product.slug,
    title: product.name,
    price: `€${product.price.toFixed(2)}`,
    originalPrice: `€${product.originalPrice?.toFixed(2)}`,
    image: product.images?.[0] || product.image || 'https://via.placeholder.com/400',
    timeLeft: '23:45:12',
    savings: `€${((product.originalPrice || 0) - product.price).toFixed(2)}`,
    soldPercentage: 65
  }));

const brands = [
  { name: 'BOSEK', displayName: 'BOSEK', color: '#2563eb' },
  { name: 'STANLER', displayName: 'STANLER', color: '#dc2626' },
  { name: 'MAKITO', displayName: 'MAKITO', color: '#16a34a' },
  { name: 'DeWolt', displayName: 'DeWolt', color: '#eab308' },
  { name: 'GARDENIX', displayName: 'GARDENIX', color: '#7c3aed' },
  { name: 'POWERTEK', displayName: 'POWERTEK', color: '#ea580c' },
];

const testimonials = [
  { name: 'Giuseppe M.', feedback: 'Ottima qualità e prezzi competitivi. Consegna rapidissima!', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5 },
  { name: 'Laura R.', feedback: 'Vastissima scelta di prodotti per la casa. Servizio clienti eccellente.', avatar: 'https://i.pravatar.cc/150?img=48', rating: 5 },
  { name: 'Francesco G.', feedback: 'Ho trovato tutto quello che cercavo per il mio progetto fai-da-te.', avatar: 'https://i.pravatar.cc/150?img=52', rating: 4 },
];

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 10);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 10);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Transform values for hero fade effect
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 300], [0, -50]);

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
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(sliderTimer);
  }, []);

  return (
    <>
      <Header />
      <main className="flex flex-col items-center bg-gray-100">

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
                {heroSlides[currentSlide].badge}
              </motion.span>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white text-base md:text-lg font-bold rounded-md shadow-xl transform hover:scale-105 transition-all">
                  {heroSlides[currentSlide].cta}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
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

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all backdrop-blur-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.section>

      {/* Container for all content */}
      <div className="w-full max-w-[1500px] mx-auto px-2 sm:px-4">
        
        {/* Categories Section */}
        <section className="py-6 md:py-12 bg-white rounded-lg my-3 md:my-6 shadow-sm">
          <div className="px-3 md:px-6">
            <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Acquista per categoria</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, index) => (
                <Link key={cat.slug} href={`/categoria/${cat.slug}`}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group cursor-pointer"
                    whileHover={{ y: -5 }}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all">
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-xs font-semibold text-center">{cat.name}</h3>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hot Deals Section */}
        <section className="bg-white rounded-lg shadow-sm my-3 md:my-6">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white p-4 rounded-t-lg">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              ⚡ Offerte Lampo
              <span className="text-lg font-normal">- Termina tra {`${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`}</span>
            </h2>
          </div>
          <div className="p-3 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotDeals.map((deal, index) => (
                <Link key={deal.slug} href={`/products/${deal.slug}`}>
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
                        alt={deal.title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                        Risparmi {deal.savings}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{deal.title}</h3>
                      <div className="mb-3">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-orange-500 h-full transition-all duration-1000"
                            style={{ width: `${deal.soldPercentage}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{deal.soldPercentage}% venduto</p>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl font-bold text-red-600">{deal.price}</span>
                        <span className="text-gray-500 line-through text-sm">{deal.originalPrice}</span>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
                        💵 Paga alla Consegna
                      </Button>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-white rounded-lg shadow-sm my-3 md:my-6 p-3 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">I più venduti in Bricolage</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((prod, index) => (
              <Link key={prod.id} href={`/products/${prod.slug}`}>
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
                    alt={prod.title} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" 
                  />
                  {prod.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {prod.discount}
                    </div>
                  )}
                  {prod.badge && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {prod.badge}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">{prod.title}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {'★'.repeat(Math.floor(prod.rating))}
                      {'☆'.repeat(5 - Math.floor(prod.rating))}
                    </div>
                    <span className="text-xs text-blue-600 hover:text-orange-500 cursor-pointer">({prod.reviews})</span>
                  </div>
                  {prod.prime && (
                    <div className="text-xs font-bold text-blue-600 mb-2">Prime</div>
                  )}
                  <div className="mb-2">
                    <span className="text-lg font-bold">{prod.price}</span>
                    {prod.originalPrice && (
                      <div className="text-xs text-gray-500 line-through">{prod.originalPrice}</div>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">
                    Consegna <span className="font-bold">GRATUITA</span>
                  </div>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Pagamento in Contrassegno */}
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
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">Nessun Pagamento Anticipato</div>
                    <div className="text-green-100 text-sm">Paghi solo dopo aver verificato il prodotto</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">100% Sicuro e Garantito</div>
                    <div className="text-green-100 text-sm">Nessun rischio di frodi online</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">Servizio Completamente Gratuito</div>
                    <div className="text-green-100 text-sm">Nessun costo aggiuntivo per il contrassegno</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">Consegna in 24/48 ore</div>
                    <div className="text-green-100 text-sm">Ricevi rapidamente il tuo ordine</div>
                  </div>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/pagamento-alla-consegna" className="inline-block">
                  <Button className="bg-white hover:bg-gray-100 text-green-800 px-8 py-3 rounded-md font-bold text-lg shadow-lg">
                    Scopri Come Funziona
                  </Button>
                </Link>
                <Link href="/pagamento-alla-consegna#faq" className="inline-block">
                  <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-green-800 text-white px-8 py-3 rounded-md font-bold text-lg">
                    Vedi FAQ
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=400&fit=crop" 
                alt="Consegna e pagamento" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-xl font-bold">
                <div className="text-2xl">🚚 + 💵</div>
                <div className="text-sm">Paga alla Consegna!</div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="bg-white rounded-lg shadow-sm my-3 md:my-6 p-3 md:p-6">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">I nostri marchi</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {brands.map((brand, index) => (
              <motion.div 
                key={brand.name} 
                className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer bg-white"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="font-bold text-2xl tracking-wider"
                  style={{ color: brand.color }}
                >
                  {brand.displayName}
                </div>
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
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) {
                    setIsSubscribed(true);
                    setTimeout(() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }, 5000);
                  }
                }}
                className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto"
              >
                <Input 
                  type="email"
                  placeholder="Inserisci la tua email" 
                  className="flex-1 px-4 py-3 rounded-md border border-gray-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold"
                >
                  Iscriviti
                </Button>
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
                <span className="text-2xl font-bold">Grazie per la fiducia, non ti deluderemo.</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}