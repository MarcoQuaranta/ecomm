'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { categories as staticCategories } from '@/lib/categories';
import siteConfig from '../../site.config';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tutti');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Use static categories
  const categories = staticCategories;

  // Handle sidebar close with slide-out animation
  const closeSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowSidebar(false);
      setIsClosing(false);
    }, 300);
  };

  // Handle sidebar open
  const openSidebar = () => {
    setShowSidebar(true);
  };

  // Block body scroll when popup or sidebar is open
  useEffect(() => {
    if (showCategoryPopup || showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showCategoryPopup, showSidebar]);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        }
        else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlHeader);

      return () => {
        window.removeEventListener('scroll', controlHeader);
      };
    }
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    }
    if (selectedCategory && selectedCategory !== 'tutti') {
      params.set('categoria', selectedCategory);
    }
    const queryString = params.toString();
    router.push(`/catalogo${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <>
      <header
        className={`w-full bg-slate-800 text-white fixed top-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-4 py-3">
            {/* Hamburger Menu Button - Desktop */}
            <button
              onClick={openSidebar}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo.png"
                alt={siteConfig.siteName}
                width={150}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>

            {/* Search Bar Desktop */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="flex">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l-md text-sm border-r border-gray-400 min-w-[180px] appearance-none pr-8 bg-no-repeat"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="tutti">Tutte le categorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Cerca prodotti..."
                  className="flex-1 px-4 py-2 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 rounded-r-md bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Header Actions Desktop */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-sm">
                <div className="text-gray-300">Supporto</div>
                <div className="font-bold">24/7</div>
              </div>
              <Link
                href="/assistenza"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Assistenza
              </Link>
              <button
                onClick={() => setShowCartPopup(true)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors relative"
                aria-label="Carrello"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Mobile Top Row */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={openSidebar}
                  className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <Link href="/">
                  <Image
                    src="/images/logo.png"
                    alt={siteConfig.siteName}
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                    priority
                  />
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/assistenza"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors"
                >
                  Assistenza
                </Link>
                <button
                  onClick={() => setShowCartPopup(true)}
                  className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Carrello"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Search Bar */}
            <div className="pb-3">
              <form onSubmit={handleSearch} className="flex">
                <button
                  type="button"
                  onClick={() => setShowCategoryPopup(true)}
                  className="bg-gray-200 text-gray-800 px-2 py-2.5 rounded-l-md text-xs border-r border-gray-400 flex items-center gap-1 flex-shrink-0"
                  style={{ width: '75px' }}
                >
                  <span className="truncate text-xs">
                    {selectedCategory === 'tutti' ? 'Tutte' :
                     categories.find(c => c.slug === selectedCategory)?.name?.substring(0, 5) || 'Cat'}
                  </span>
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l4 4 4-4" />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Cerca prodotti..."
                  className="flex-1 px-3 py-2.5 text-gray-900 text-sm min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 rounded-r-md flex-shrink-0 bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Menu */}
      {showSidebar && (
        <div className="fixed inset-0 z-[110]">
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isClosing ? 'bg-opacity-0' : 'bg-opacity-50'
            }`}
            onClick={closeSidebar}
          />
          <div className={`absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl overflow-y-auto ${
            isClosing ? 'transition-transform duration-300 -translate-x-full' : 'animate-fade-in-left'
          }`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-orange-500">Menu</h2>
              <button
                onClick={closeSidebar}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Navigation */}
            <div className="p-4">
              {/* Main Navigation */}
              <div className="space-y-1 mb-6">
                <Link
                  href="/catalogo"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-medium">Catalogo</span>
                </Link>
                <Link
                  href="/offerte"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                  <span className="font-medium">Offerte</span>
                </Link>
                <Link
                  href="/pagamento-alla-consegna"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-medium">Pagamento alla Consegna</span>
                </Link>
              </div>

              {/* Categories Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-3 px-3">Categorie</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/catalogo?categoria=${cat.slug}`}
                      onClick={closeSidebar}
                      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: cat.color || '#3B82F6' }}
                      />
                      <span className="text-sm">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Assistance Button */}
              <div className="border-t mt-6 pt-6">
                <Link
                  href="/assistenza"
                  onClick={closeSidebar}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>Assistenza</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Selection Popup for Mobile */}
      {showCategoryPopup && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCategoryPopup(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Seleziona Categoria</h3>
              <button
                onClick={() => setShowCategoryPopup(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory('tutti');
                  setShowCategoryPopup(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === 'tutti'
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
              >
                Tutte le categorie
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setShowCategoryPopup(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Popup */}
      {showCartPopup && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowCartPopup(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl p-6 mx-4 max-w-md animate-fade-in">
            <button
              onClick={() => setShowCartPopup(false)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Carrello non disponibile</h3>
              <p className="text-gray-600 mb-6">
                Il carrello non è configurato su questo sito. È possibile acquistare esclusivamente un prodotto per volta.
              </p>
              <button
                onClick={() => setShowCartPopup(false)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg font-semibold transition-colors"
              >
                Ho capito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push content below fixed header */}
      <div className="h-[135px] md:h-[92px]"></div>

      {/* Sub Header */}
      <div
        className={`w-full bg-slate-700 text-white py-2 overflow-x-hidden fixed z-40 transition-transform duration-300 ${
          isVisible ? 'top-[103px] md:top-[60px]' : '-top-[40px]'
        }`}
      >
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm">
            <Link
              href="/catalogo"
              className={`whitespace-nowrap hover:text-orange-400 shrink-0 transition-colors ${
                pathname === '/catalogo' ? 'font-bold text-orange-400' : ''
              }`}>
              Catalogo
            </Link>
            <Link
              href="/offerte"
              className={`whitespace-nowrap hover:text-orange-400 shrink-0 transition-colors ${
                pathname === '/offerte' ? 'font-bold text-orange-400' : ''
              }`}>
              Offerte
            </Link>
            <Link
              href="/pagamento-alla-consegna"
              className={`whitespace-nowrap hover:text-orange-400 shrink-0 transition-colors ${
                pathname === '/pagamento-alla-consegna' ? 'font-bold text-orange-400' : ''
              }`}>
              Contrassegno
            </Link>
            <Link
              href="/assistenza"
              className={`whitespace-nowrap hover:text-orange-400 shrink-0 transition-colors ${
                pathname === '/assistenza' ? 'font-bold text-orange-400' : ''
              }`}>
              Servizio clienti
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
