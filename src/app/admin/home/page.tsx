'use client';

import React from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

export default function AdminHomePage() {
  const menuItems = [
    {
      title: 'Prodotti',
      description: 'Gestisci i prodotti del tuo negozio',
      href: '/admin/dashboard',
      icon: '📦',
      color: 'bg-blue-500'
    },
    {
      title: 'Categorie',
      description: 'Organizza le categorie dei prodotti',
      href: '/admin/categories',
      icon: '🏷️',
      color: 'bg-green-500'
    },
    {
      title: 'Colori',
      description: 'Personalizza i colori del sito',
      href: '/admin/colors',
      icon: '🎨',
      color: 'bg-purple-500'
    },
    {
      title: 'Ordini',
      description: 'Visualizza e gestisci gli ordini',
      href: '/admin/orders',
      icon: '📋',
      color: 'bg-orange-500'
    },
    {
      title: 'Clienti',
      description: 'Gestisci i tuoi clienti',
      href: '/admin/customers',
      icon: '👥',
      color: 'bg-indigo-500'
    },
    {
      title: 'Impostazioni',
      description: 'Configura le impostazioni del negozio',
      href: '/admin/settings',
      icon: '⚙️',
      color: 'bg-gray-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Benvenuto Databrandino, naviga nel menu per iniziare a modificare il tuo E-commerce</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-blue-300"
            >
              <div className="flex items-center mb-4">
                <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 ml-4">
                  {item.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            💡 Suggerimento
          </h2>
          <p className="text-blue-700">
            Inizia aggiungendo nuovi prodotti al tuo catalogo o personalizza l'aspetto del tuo negozio 
            modificando i colori del tema. Tutte le modifiche sono salvate automaticamente nel database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">0</div>
            <div className="text-gray-600 text-sm mt-1">Prodotti Totali</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">0</div>
            <div className="text-gray-600 text-sm mt-1">Categorie Attive</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-800">0</div>
            <div className="text-gray-600 text-sm mt-1">Ordini Oggi</div>
          </div>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}