'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { products } from '@/lib/products';

export default function OffertePage() {
  const [sortBy, setSortBy] = useState<string>('discount');

  // Filtra solo i prodotti con sconto
  const discountedProducts = products.filter(product => product.discount && product.discount > 0);

  // Ordina i prodotti
  const sortedProducts = [...discountedProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const maxDiscount = Math.max(...discountedProducts.map(p => p.discount || 0));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
          <div className="max-w-[1500px] mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <span className="text-2xl">🔥</span>
                <span className="text-sm font-bold">OFFERTE SPECIALI</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sconti fino al {maxDiscount}%
              </h1>
              <p className="text-xl text-red-50">
                Approfitta delle nostre migliori offerte su prodotti selezionati
              </p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-600">
                <span className="font-semibold text-gray-900">{sortedProducts.length}</span> prodotti in offerta
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="discount">Sconto più alto</option>
                <option value="price-asc">Prezzo: più basso</option>
                <option value="price-desc">Prezzo: più alto</option>
                <option value="name">Nome</option>
              </select>
            </div>
          </div>

          {/* Offerte Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Nessuna offerta disponibile</h3>
              <p className="text-gray-600 mb-4">
                Al momento non ci sono prodotti in offerta
              </p>
              <Link
                href="/catalogo"
                className="inline-block px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
              >
                Vai al catalogo
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
                        {/* Badge Sconto Grande */}
                        <div className="absolute top-2 left-2">
                          <div className="bg-red-600 text-white px-3 py-2 rounded-lg text-lg font-bold shadow-lg">
                            -{product.discount}%
                          </div>
                          <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs font-bold mt-1 text-center">
                            OFFERTA
                          </div>
                        </div>
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
                        
                        <div className="mb-3">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-red-600">
                              €{product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">
                                €{product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.originalPrice && (
                            <div className="text-sm text-green-600 font-semibold mt-1">
                              Risparmi €{(product.originalPrice - product.price).toFixed(2)}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1 text-sm mb-4">
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
                              <span>Contrassegno gratuito</span>
                            </div>
                          )}
                        </div>
                        
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-colors">
                          💵 Paga alla Consegna
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Banner Informativo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">
                🎯 Non Perdere le Nostre Offerte!
              </h2>
              <p className="text-lg mb-6 text-blue-50">
                Le offerte sono a tempo limitato e soggette a disponibilità. 
                I prezzi scontati sono già applicati e visibili nei prodotti.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/catalogo"
                  className="inline-block px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Vedi Tutto il Catalogo
                </Link>
                <Link
                  href="/pagamento-alla-consegna"
                  className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors"
                >
                  Info Pagamento
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}