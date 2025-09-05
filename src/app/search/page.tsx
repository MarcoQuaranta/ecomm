'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts, Product, products } from '@/lib/products';
import { categories } from '@/lib/categories';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let searchResults = searchProducts(query);
    
    // Apply category filter if selected
    if (categoryFilter && categoryFilter !== 'tutti') {
      const category = categories.find(cat => cat.slug === categoryFilter);
      if (category) {
        searchResults = searchResults.filter(product => 
          category.productIds.includes(product.id)
        );
      }
    }
    
    setResults(searchResults);
    setLoading(false);
  }, [query, categoryFilter]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Risultati di ricerca per: "{query}"
            {categoryFilter && categoryFilter !== 'tutti' && (
              <span className="text-lg font-normal text-gray-600 ml-2">
                in {categories.find(cat => cat.slug === categoryFilter)?.name}
              </span>
            )}
          </h1>
          <p className="text-gray-600">
            {results.length} {results.length === 1 ? 'prodotto trovato' : 'prodotti trovati'}
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            <p className="mt-4 text-gray-600">Ricerca in corso...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Nessun risultato trovato</h2>
            <p className="text-gray-600">
              Prova a modificare i termini di ricerca o esplora le nostre categorie
            </p>
            <Link href="/" className="inline-block mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold transition-colors">
              Torna alla Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
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
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-2 min-h-[3.5rem]">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
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
                      
                      <div className="flex flex-col gap-2 text-sm">
                        {product.shipping?.freeShipping && (
                          <div className="flex items-center gap-1 text-green-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Spedizione GRATUITA</span>
                          </div>
                        )}
                        {product.shipping?.cashOnDelivery && (
                          <div className="flex items-center gap-1 text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Pagamento alla consegna</span>
                          </div>
                        )}
                        <div className="text-gray-600">
                          Consegna in {product.shipping?.estimatedDays || 3} giorni
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold transition-colors">
                        💵 Paga alla Consegna
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Categorie correlate</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(results.map(p => p.category))).map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}