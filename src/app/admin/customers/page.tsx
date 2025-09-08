'use client';

import React from 'react';
import AdminLayout from '@/components/AdminLayout';

export default function CustomersPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestione Clienti</h1>
          <p className="text-gray-600 mt-2">Visualizza e gestisci i tuoi clienti</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">

        <div className="text-center py-12">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Nessun cliente registrato</h2>
          <p className="text-gray-500">I clienti appariranno qui quando effettueranno ordini.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-600">Clienti Totali</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Nuovi questo mese</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">0</div>
            <div className="text-sm text-gray-600">Clienti Attivi</div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">📊 Statistiche Clienti</h3>
          <p className="text-blue-700 text-sm">
            Le statistiche sui clienti saranno disponibili quando inizierai a ricevere ordini.
            Potrai vedere informazioni come il valore medio degli ordini, la frequenza di acquisto e altro ancora.
          </p>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}