'use client';

import React from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function OrdersPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestione Ordini</h1>
          <p className="text-gray-600 mt-2">Visualizza e gestisci gli ordini del tuo negozio</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">

        <div className="text-center py-12">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Nessun ordine presente</h2>
          <p className="text-gray-500">Gli ordini appariranno qui quando i clienti effettueranno acquisti.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-600">Ordini Totali</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <div className="text-sm text-gray-600">In Attesa</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">In Spedizione</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Completati</div>
          </div>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}