'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import SiteLayout from '@/components/SiteLayout';
import { categories } from '@/lib/categories';
import { getDisplayProducts } from '@/lib/products';
import { useCountry } from '@/hooks/useCountry';

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function CatalogoPage() {
  const { countryCode } = useCountry();
  const allProducts = getDisplayProducts(countryCode);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';
  const categoryParam = searchParams.get('categoria') || '';

  const [sortBy, setSortBy] = useState<string>('name');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam || null);
  const [filterShipping, setFilterShipping] = useState(false);
  const [filterCOD, setFilterCOD] = useState(false);

  // Sync selected category with URL param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // First filter by search query
  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return allProducts;
    }
    const query = searchQuery.toLowerCase();
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [searchQuery, allProducts]);

  // Filter by category - filtra dai prodotti filtrati per ricerca
  const categoryFilteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return searchFilteredProducts;
    }

    switch (selectedCategory) {
      case 'offerte':
        // Solo prodotti con sconto
        return searchFilteredProducts.filter(p => p.discount > 0);
      case 'ultimi-arrivi':
        // Ultimi 4 prodotti
        return searchFilteredProducts.slice(-4).reverse();
      case 'bestseller':
        // 4 prodotti random
        return shuffleArray(searchFilteredProducts).slice(0, 4);
      case 'scelti-da-noi':
        // 4 prodotti random
        return shuffleArray(searchFilteredProducts).slice(0, 4);
      default:
        return searchFilteredProducts;
    }
  }, [selectedCategory, searchFilteredProducts]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...categoryFilteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });
  }, [categoryFilteredProducts, sortBy]);

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      setSelectedCategory(null); // Deselect if already selected
    } else {
      setSelectedCategory(categorySlug);
    }
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setFilterShipping(false);
    setFilterCOD(false);
    // Clear URL parameters
    router.push('/catalogo');
  };

  return (
    <SiteLayout className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-[1500px] mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Catalogo Prodotti</h1>
          <p className="text-xl opacity-90">
            Scopri tutti i nostri prodotti professionali
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>Catalogo</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-2xl mb-6 text-gray-900">Filtri</h3>

              {/* Category Filters */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-blue-800">Collezioni</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.slug)}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-blue-100 text-blue-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Show Only Filters */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-blue-800">Mostra solo</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterShipping}
                      onChange={(e) => setFilterShipping(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Spedizione Rapida 48h</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterCOD}
                      onChange={(e) => setFilterCOD(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Pagamento alla Consegna</span>
                  </label>
                </div>
              </div>

              {/* Reset Filters */}
              {(selectedCategory || filterShipping || filterCOD) && (
                <button
                  onClick={resetFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  Resetta filtri
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-gray-600">
                  Trovati <span className="font-semibold text-gray-900">{sortedProducts.length}</span> prodotti
                  {searchQuery && (
                    <span className="ml-2 text-sm">
                      per &quot;<span className="font-semibold text-blue-600">{searchQuery}</span>&quot;
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="ml-2 text-sm">
                      in <span className="font-semibold text-blue-600">{categories.find(c => c.slug === selectedCategory)?.name}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Mobile Filters Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Filtri
                  </button>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="name">Nome</option>
                    <option value="price-asc">Prezzo: piu basso</option>
                    <option value="price-desc">Prezzo: piu alto</option>
                    <option value="discount">Maggior sconto</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl text-gray-900">Filtri</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Category Filters - Mobile */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-blue-800">Collezioni</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.slug)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedCategory === category.slug
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Only Filters - Mobile */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-sm text-blue-800">Mostra solo</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterShipping}
                        onChange={(e) => setFilterShipping(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Spedizione Rapida 48h</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filterCOD}
                        onChange={(e) => setFilterCOD(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Pagamento alla Consegna</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  {(selectedCategory || filterShipping || filterCOD) && (
                    <button
                      onClick={resetFilters}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Applica
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Nessun prodotto trovato</h3>
                <p className="text-gray-600 mb-4">
                  Prova a modificare i filtri
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Resetta filtri
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={product.landingPath}>
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col">
                        <div className="aspect-square relative bg-gray-50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                          />
                          {product.discount > 0 && (
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                              -{product.discount}%
                            </div>
                          )}
                          {product.inStock ? (
                            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                              Disponibile
                            </div>
                          ) : (
                            <div className="absolute top-2 right-2 bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold">
                              Esaurito
                            </div>
                          )}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                          </p>

                          <div className="space-y-1 text-sm">
                            {product.freeShipping && (
                              <div className="flex items-center gap-1 text-green-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Spedizione Rapida 48h</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-blue-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>Contrassegno</span>
                            </div>
                          </div>

                          <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                            Paga alla Consegna
                          </button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
