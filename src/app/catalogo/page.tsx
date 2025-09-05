'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import { categories } from '@/lib/categories';

export default function CatalogoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('tutti');
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'tutti' 
    ? products
    : products.filter(product => {
        const category = categories.find(cat => cat.slug === selectedCategory);
        return category?.productIds.includes(product.id);
      });

  // Apply price filter
  const priceFilteredProducts = filteredProducts.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
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
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Filtri</h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categorie</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value="tutti"
                        checked={selectedCategory === 'tutti'}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-blue-600"
                      />
                      <span>Tutti i prodotti</span>
                      <span className="text-sm text-gray-500">({products.length})</span>
                    </label>
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.slug}
                          checked={selectedCategory === category.slug}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-blue-600"
                        />
                        <span>{category.name}</span>
                        <span className="text-sm text-gray-500">({category.productIds.length})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Prezzo</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>€{priceRange[0]}</span>
                      <span>€{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Caratteristiche</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-blue-600" />
                      <span>Spedizione gratuita</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-blue-600" />
                      <span>In offerta</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="text-blue-600" />
                      <span>Pagamento alla consegna</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-gray-600">
                    Trovati <span className="font-semibold text-gray-900">{sortedProducts.length}</span> prodotti
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
                      <option value="price-asc">Prezzo: più basso</option>
                      <option value="price-desc">Prezzo: più alto</option>
                      <option value="discount">Maggior sconto</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Filtri</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Categorie</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="radio"
                          name="mobile-category"
                          value="tutti"
                          checked={selectedCategory === 'tutti'}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-blue-600 scale-90"
                        />
                        <span className="truncate">Tutti ({products.length})</span>
                      </label>
                      {categories.map(category => (
                        <label key={category.id} className="flex items-center gap-1 text-sm">
                          <input
                            type="radio"
                            name="mobile-category"
                            value={category.slug}
                            checked={selectedCategory === category.slug}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="text-blue-600 scale-90"
                          />
                          <span className="truncate">{category.name} ({category.productIds.length})</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Prezzo massimo</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>€{priceRange[0]}</span>
                        <span className="font-semibold">€{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Caratteristiche</h4>
                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="text-blue-600" defaultChecked />
                        <span>Spedizione gratuita</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="text-blue-600" />
                        <span>In offerta</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="text-blue-600" defaultChecked />
                        <span>Pagamento alla consegna</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('tutti');
                        setPriceRange([0, 1000]);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Applica filtri
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
                    Prova a modificare i filtri o la ricerca
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('tutti');
                      setPriceRange([0, 1000]);
                    }}
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
                      <Link href={`/products/${product.slug}`}>
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col">
                          <div className="aspect-square relative bg-gray-50">
                            <img
                              src={product.images?.[0] || product.image || 'https://via.placeholder.com/400'}
                              alt={product.name}
                              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                            />
                            {product.discount && (
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
                            <div className="text-xs text-gray-500 mb-1">
                              {product.category}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {product.shortDescription}
                            </p>
                            
                            {product.rating && (
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex text-yellow-400">
                                  {'★'.repeat(Math.floor(product.rating))}
                                  {'☆'.repeat(5 - Math.floor(product.rating))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  ({product.reviews} recensioni)
                                </span>
                              </div>
                            )}
                            
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-2xl font-bold text-gray-900">
                                €{product.price.toFixed(2)}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  €{product.originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <div className="space-y-1 text-sm">
                              {product.shipping?.freeShipping && (
                                <div className="flex items-center gap-1 text-green-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Spedizione gratuita</span>
                                </div>
                              )}
                              {product.shipping?.cashOnDelivery && (
                                <div className="flex items-center gap-1 text-blue-600">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  <span>Contrassegno</span>
                                </div>
                              )}
                            </div>
                            
                            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors">
                              💵 Paga alla Consegna
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
      </div>
      <Footer />
    </>
  );
}