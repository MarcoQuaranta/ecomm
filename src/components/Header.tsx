'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tutti');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Show header when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } 
        // Hide header when scrolling down
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
    if (searchQuery.trim()) {
      const categoryParam = selectedCategory !== 'tutti' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${categoryParam}`);
    }
  };

  return (
    <>
      <header 
        className={`w-full text-white fixed top-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ backgroundColor: 'var(--color-header)' }}
      >
        <div className="max-w-[1500px] mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-4 py-3">
            <Link href="/" className="text-2xl font-bold shrink-0" style={{ color: 'var(--color-primary)' }}>
              BricoShop
            </Link>
            
            {/* Search Bar Desktop - Now takes all available space */}
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
                  <option value="giardinaggio">Giardinaggio</option>
                  <option value="utensili">Utensili</option>
                  <option value="per-la-casa">Per la casa</option>
                  <option value="elettronica">Elettronica</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Cerca prodotti, marche e altro..."
                  className="flex-1 px-4 py-2 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-6 rounded-r-md hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-buttonSecondary)' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
            
            {/* Header Actions Desktop - Now on the right */}
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-sm">
                <div className="text-gray-300">Supporto</div>
                <div className="font-bold">24/7</div>
              </div>
              <Link 
                href="/assistenza" 
                className="text-white px-4 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: 'var(--color-buttonPrimary)' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Ricevi assistenza
              </Link>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden">
            {/* Mobile Top Row - Logo and Assistance */}
            <div className="flex items-center justify-between py-3">
              <Link href="/" className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                BricoShop
              </Link>
              <Link 
                href="/assistenza" 
                className="text-white px-3 py-1.5 rounded-lg font-semibold text-xs transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-buttonPrimary)' }}
              >
                Assistenza
              </Link>
            </div>
            
            {/* Mobile Search Bar - Category selector and search in one row */}
            <div className="pb-3">
              <form onSubmit={handleSearch} className="flex">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-200 text-gray-800 px-1 py-2 rounded-l-md text-xs border-r border-gray-400 appearance-none pr-4 bg-no-repeat flex-shrink-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.1rem center',
                    backgroundSize: '1em 1em',
                    width: '85px'
                  }}
                >
                  <option value="tutti">Tutte</option>
                  <option value="giardinaggio">Giard.</option>
                  <option value="utensili">Utens.</option>
                  <option value="per-la-casa">Casa</option>
                  <option value="elettronica">Elettr.</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Cerca..."
                  className="flex-1 px-2 py-2 text-gray-900 text-xs min-w-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-3 rounded-r-md flex-shrink-0 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: 'var(--color-buttonSecondary)' }}
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

      {/* Spacer to push content below fixed header */}
      <div className="h-[120px] md:h-[92px]"></div>

      {/* Sub Header */}
      <div 
        className={`w-full text-white py-2 overflow-x-hidden fixed z-40 transition-transform duration-300 ${
          isVisible ? 'top-[88px] md:top-[60px]' : '-top-[40px]'
        }`}
        style={{ backgroundColor: 'var(--color-secondary)' }}>
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