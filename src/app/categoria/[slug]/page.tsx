'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';
import { getCategoryBySlug } from '@/lib/categories';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  if (!category) {
    notFound();
  }

  // Get products for this category
  const categoryProducts = products.filter(product => 
    category.productIds.includes(product.id)
  );

  // Apply price filter
  const priceFilteredProducts = categoryProducts.filter(
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
        <div className={`bg-gradient-to-r ${category.color} text-white py-12`}>
          <div className="max-w-[1500px] mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl opacity-90">
              {category.description}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/catalogo" className="hover:underline">Catalogo</Link>
              <span>/</span>
              <span>{category.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-600">
                Trovati <span className="font-semibold text-gray-900">{sortedProducts.length}</span> prodotti in {category.name}
              </div>
              
              <div className="flex items-center gap-4">
                {/* Price Range */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Max prezzo:</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-24"
                  />
                  <span className="text-sm font-medium">€{priceRange[1]}</span>
                </div>
                
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
              <Link
                href="/catalogo"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Torna al catalogo
              </Link>
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

          {/* Related Categories */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Altre categorie</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/catalogo"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
              >
                Tutti i prodotti
              </Link>
              <Link
                href="/categoria/giardinaggio"
                className={`px-4 py-2 ${params.slug === 'giardinaggio' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm font-medium transition-colors`}
              >
                Giardinaggio
              </Link>
              <Link
                href="/categoria/utensili"
                className={`px-4 py-2 ${params.slug === 'utensili' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm font-medium transition-colors`}
              >
                Utensili
              </Link>
              <Link
                href="/categoria/per-la-casa"
                className={`px-4 py-2 ${params.slug === 'per-la-casa' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm font-medium transition-colors`}
              >
                Per la casa
              </Link>
              <Link
                href="/categoria/elettronica"
                className={`px-4 py-2 ${params.slug === 'elettronica' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg text-sm font-medium transition-colors`}
              >
                Elettronica
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}