'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  name: string;
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

  // Form state per nuovo/modifica prodotto
  const [formData, setFormData] = useState({
    name: '',
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Caricamento...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Dashboard Amministrazione</h1>
            <div className="flex gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                Vai al sito
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form modifica/aggiungi */}
        {(editingProduct || isAddingNew) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}