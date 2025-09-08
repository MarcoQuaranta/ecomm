'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';

interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  pageContent?: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  inStock: boolean;
  shippingCost: number;
  freeShipping: boolean;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  // Stati per paginazione
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Form state per nuovo/modifica prodotto
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pageContent: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: 'giardinaggio',
    inStock: true,
    shippingCost: '0',
    freeShipping: true
  });

  // Check authentication
  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      router.push('/admin');
    } else {
      loadProducts();
    }
  }, [router]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  // Calcolo automatico prezzi
  const calculatePrices = (field: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    
    if (field === 'price' && formData.discount) {
      // Se inserisco prezzo finale e ho sconto, calcolo prezzo originale
      const discount = parseFloat(formData.discount) || 0;
      const originalPrice = numValue / (1 - discount / 100);
      setFormData(prev => ({ ...prev, price: value, originalPrice: originalPrice.toFixed(2) }));
    } else if (field === 'originalPrice' && formData.discount) {
      // Se inserisco prezzo originale e ho sconto, calcolo prezzo finale
      const discount = parseFloat(formData.discount) || 0;
      const price = numValue * (1 - discount / 100);
      setFormData(prev => ({ ...prev, originalPrice: value, price: price.toFixed(2) }));
    } else if (field === 'discount') {
      // Se cambio sconto e ho prezzo originale, ricalcolo prezzo finale
      if (formData.originalPrice) {
        const originalPrice = parseFloat(formData.originalPrice) || 0;
        const price = originalPrice * (1 - numValue / 100);
        setFormData(prev => ({ ...prev, discount: value, price: price.toFixed(2) }));
      } else if (formData.price) {
        // Se ho solo prezzo finale, calcolo prezzo originale
        const price = parseFloat(formData.price) || 0;
        const originalPrice = price / (1 - numValue / 100);
        setFormData(prev => ({ ...prev, discount: value, originalPrice: originalPrice.toFixed(2) }));
      }
    } else if (field === 'shippingCost') {
      // Se il costo spedizione è 0, attiva spedizione gratuita
      const cost = parseFloat(value) || 0;
      setFormData(prev => ({ 
        ...prev, 
        shippingCost: value,
        freeShipping: cost === 0 
      }));
    } else if (field === 'freeShipping') {
      // Se attivo spedizione gratuita, metto costo a 0
      const isFree = value === 'true';
      setFormData(prev => ({ 
        ...prev, 
        freeShipping: isFree,
        shippingCost: isFree ? '0' : prev.shippingCost 
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async () => {
    try {
      let imageUrl = formData.image || 'https://via.placeholder.com/400';
      
      // Se c'è un'immagine caricata, prima la salviamo
      if (uploadedImage) {
        const formDataImage = new FormData();
        formDataImage.append('image', uploadedImage);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataImage
        });
        
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          imageUrl = url;
        }
      }
      
      const productData = {
        name: formData.name,
        description: formData.description,
        pageContent: formData.pageContent,
        price: parseFloat(formData.price),
        originalPrice: parseFloat(formData.originalPrice),
        discount: parseFloat(formData.discount) || 0,
        image: imageUrl,
        category: formData.category,
        inStock: formData.inStock,
        shippingCost: parseFloat(formData.shippingCost) || 0,
        freeShipping: formData.freeShipping
      };

      if (editingProduct) {
        // Modifica prodotto esistente
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          await loadProducts();
          setEditingProduct(null);
          resetForm();
        }
      } else if (isAddingNew) {
        // Aggiungi nuovo prodotto
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        
        if (response.ok) {
          await loadProducts();
          setIsAddingNew(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Errore nel salvataggio del prodotto');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          await loadProducts();
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
    setFormData({
      name: product.name,
      description: product.description || '',
      pageContent: product.pageContent || '',
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      discount: product.discount.toString(),
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      shippingCost: product.shippingCost.toString(),
      freeShipping: product.freeShipping
    });
  };

  const startAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      pageContent: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: 'giardinaggio',
      inStock: true,
      shippingCost: '0',
      freeShipping: true
    });
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setIsAddingNew(false);
    resetForm();
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Caricamento...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestione Prodotti</h1>
          <p className="text-gray-600 mt-2">Gestisci i prodotti del tuo negozio</p>
        </div>

        {/* Form modifica/aggiungi */}
        {(editingProduct || isAddingNew) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Prodotto *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrizione Prodotto
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Inserisci una descrizione dettagliata del prodotto..."
                />
              </div>
              
              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenuto Pagina Prodotto (HTML/JSX)
                </label>
                <textarea
                  value={formData.pageContent}
                  onChange={(e) => setFormData({ ...formData, pageContent: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                  rows={8}
                  placeholder={'Inserisci il contenuto HTML/JSX personalizzato per la pagina prodotto...\nEsempio:\n<div className="bg-blue-100 p-6 rounded-lg">\n  <h3 className="text-2xl font-bold mb-4">Caratteristiche Speciali</h3>\n  <ul className="space-y-2">\n    <li>✓ Garanzia 5 anni</li>\n    <li>✓ Materiali premium</li>\n  </ul>\n</div>'}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Puoi usare classi Tailwind CSS e struttura HTML/JSX. Il contenuto verrà renderizzato nella pagina prodotto.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prezzo Originale (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => calculatePrices('originalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sconto (%)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => calculatePrices('discount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prezzo Finale (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => calculatePrices('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="giardinaggio">Giardinaggio</option>
                  <option value="utensili">Utensili</option>
                  <option value="per-la-casa">Per la Casa</option>
                  <option value="elettronica">Elettronica</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Costi Spedizione (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.shippingCost}
                  onChange={(e) => calculatePrices('shippingCost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Immagine Prodotto
                </label>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setUploadedImage(file);
                            // Preview dell'immagine
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, image: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                        id="file-upload"
                      />
                      <label 
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span>Carica Immagine</span>
                      </label>
                      {uploadedImage && (
                        <div className="mt-2 text-sm text-gray-600">
                          File selezionato: {uploadedImage.name}
                        </div>
                      )}
                    </div>
                    {formData.image && (
                      <div className="flex-shrink-0">
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">oppure</span>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Inserisci URL immagine (es: https://esempio.com/immagine.jpg)"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Disponibile</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.freeShipping}
                    onChange={(e) => calculatePrices('freeShipping', e.target.checked.toString())}
                    className="mr-2"
                  />
                  <span className="text-sm">Spedizione Gratuita</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Salva
              </button>
              <button
                onClick={cancelEdit}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md"
              >
                Annulla
              </button>
            </div>
          </div>
        )}

        {/* Lista prodotti */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Prodotti ({products.length})</h2>
            <button
              onClick={startAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              + Aggiungi Prodotto
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prodotto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prezzo Orig.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sconto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prezzo Finale
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spedizione
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(() => {
                  // Calcola indici per paginazione
                  const indexOfLastProduct = currentPage * productsPerPage;
                  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
                  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
                  
                  return currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]" title={product.name}>
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">€{product.originalPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.discount}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-green-600">€{product.price.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {product.freeShipping ? 'Gratis' : `€${product.shippingCost.toFixed(2)}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'Disponibile' : 'Esaurito'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ));
                })()}
              </tbody>
            </table>
          </div>
          
          {/* Controlli Paginazione */}
          {products.length > productsPerPage && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Precedente
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))}
                  disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Successiva
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Mostrando{' '}
                    <span className="font-medium">{((currentPage - 1) * productsPerPage) + 1}</span>
                    {' '}a{' '}
                    <span className="font-medium">
                      {Math.min(currentPage * productsPerPage, products.length)}
                    </span>
                    {' '}di{' '}
                    <span className="font-medium">{products.length}</span>
                    {' '}risultati
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Precedente</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Numeri pagine */}
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)))}
                      disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Successiva</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}