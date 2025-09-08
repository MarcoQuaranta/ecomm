'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';

interface Category {
  id: string;
  slug: string;
  name: string;
  image: string;
  color: string;
  order_index: number;
  count?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    image: '',
    color: 'from-blue-500 to-blue-600',
    order_index: '0'
  });

  const colorOptions = [
    { value: 'from-green-500 to-green-600', label: 'Verde', preview: 'bg-gradient-to-r from-green-500 to-green-600' },
    { value: 'from-blue-500 to-blue-600', label: 'Blu', preview: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { value: 'from-orange-500 to-orange-600', label: 'Arancione', preview: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    { value: 'from-purple-500 to-purple-600', label: 'Viola', preview: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { value: 'from-red-500 to-red-600', label: 'Rosso', preview: 'bg-gradient-to-r from-red-500 to-red-600' },
    { value: 'from-yellow-500 to-yellow-600', label: 'Giallo', preview: 'bg-gradient-to-r from-yellow-500 to-yellow-600' },
    { value: 'from-gray-500 to-gray-600', label: 'Grigio', preview: 'bg-gradient-to-r from-gray-500 to-gray-600' },
    { value: 'from-pink-500 to-pink-600', label: 'Rosa', preview: 'bg-gradient-to-r from-pink-500 to-pink-600' },
  ];

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      router.push('/admin');
    } else {
      loadCategories();
    }
  }, [router]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('slug', formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'));
    formDataToSend.append('color', formData.color);
    formDataToSend.append('order_index', formData.order_index);
    
    if (uploadedImage) {
      formDataToSend.append('image', uploadedImage);
    } else if (formData.image) {
      formDataToSend.append('imageUrl', formData.image);
    }
    
    if (editingCategory) {
      formDataToSend.append('id', editingCategory.id);
    }

    try {
      const response = await fetch('/api/categories', {
        method: editingCategory ? 'PUT' : 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        await loadCategories();
        resetForm();
      } else {
        alert('Errore nel salvataggio della categoria');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Errore nel salvataggio della categoria');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa categoria?')) return;

    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadCategories();
      } else {
        alert('Errore nell\'eliminazione della categoria');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Errore nell\'eliminazione della categoria');
    }
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      image: category.image,
      color: category.color,
      order_index: category.order_index.toString()
    });
    setIsAddingNew(true);
    setUploadedImage(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      image: '',
      color: 'from-blue-500 to-blue-600',
      order_index: '0'
    });
    setEditingCategory(null);
    setIsAddingNew(false);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="text-lg">Caricamento...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestione Categorie</h1>
          <p className="text-gray-600 mt-2">Gestisci le categorie del tuo negozio</p>
        </div>

        {/* Form Aggiungi/Modifica */}
        {isAddingNew && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? 'Modifica Categoria' : 'Nuova Categoria'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Categoria *
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="auto-generato dal nome"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colore Tema
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className={`mt-2 h-8 rounded ${colorOptions.find(c => c.value === formData.color)?.preview}`} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ordine Visualizzazione
                  </label>
                  <input
                    type="number"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Immagine
                </label>
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={uploadedImage ? '' : formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Oppure inserisci URL immagine"
                    disabled={!!uploadedImage}
                  />
                </div>
                {formData.image && (
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="mt-2 h-32 w-48 object-cover rounded"
                  />
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                >
                  {editingCategory ? 'Aggiorna' : 'Aggiungi'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista Categorie */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Categorie ({categories.length})</h2>
            <button
              onClick={() => setIsAddingNew(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              + Aggiungi Categoria
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prodotti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colore
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={category.image}
                          alt={category.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{category.slug}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{category.count || 0}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`h-6 w-20 rounded bg-gradient-to-r ${category.color}`} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{category.order_index}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => startEdit(category)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
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
    </AdminLayout>
  );
}