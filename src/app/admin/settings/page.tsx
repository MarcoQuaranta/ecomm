'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface CompanyInfo {
  company_name: string;
  email: string;
  legal_address: string;
  vat_number: string;
  share_capital: string;
  pec_email: string;
  phone?: string; // Opzionale per compatibilità
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    company_name: '',
    email: '',
    legal_address: '',
    vat_number: '',
    share_capital: '',
    pec_email: ''
  });

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      // Aggiungi cache busting
      const timestamp = Date.now();
      const res = await fetch(`/api/company-info?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      const data = await res.json();
      setCompanyInfo(data);
    } catch (error) {
      console.error('Error loading company info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/company-info', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companyInfo)
      });

      if (res.ok) {
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 3000);
        // Ricarica i dati per assicurarsi che siano sincronizzati
        await loadCompanyInfo();
      }
    } catch (error) {
      console.error('Error saving company info:', error);
    }
  };

  const handleChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
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
          <h1 className="text-3xl font-bold text-gray-900">Impostazioni</h1>
          <p className="text-gray-600 mt-2">Configura le impostazioni del tuo negozio</p>
        </div>

        {saved && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✅ Informazioni salvate con successo!
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informazioni Aziendali */}
          <div className="border rounded-lg p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">🏢 Informazioni Aziendali</h2>
              {!editing && (
                <button 
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Modifica
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Azienda *
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={companyInfo.company_name}
                    onChange={(e) => handleChange('company_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.company_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sede Legale *
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={companyInfo.legal_address}
                    onChange={(e) => handleChange('legal_address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.legal_address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  P.IVA *
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={companyInfo.vat_number}
                    onChange={(e) => handleChange('vat_number', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.vat_number}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capitale Sociale (opzionale)
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={companyInfo.share_capital}
                    onChange={(e) => handleChange('share_capital', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="es. € 10.000,00 i.v."
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.share_capital || '-'}</p>
                )}
              </div>


              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PEC (opzionale)
                </label>
                {editing ? (
                  <input
                    type="email"
                    value={companyInfo.pec_email}
                    onChange={(e) => handleChange('pec_email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="pec@azienda.it"
                  />
                ) : (
                  <p className="font-semibold py-2">{companyInfo.pec_email || '-'}</p>
                )}
              </div>
            </div>

            {editing && (
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Salva
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    loadCompanyInfo(); // Ricarica i dati originali
                  }}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Annulla
                </button>
              </div>
            )}
          </div>

          {/* Personalizzazione */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🎨 Personalizzazione</h2>
            <div className="space-y-3">
              <Link href="/admin/colors" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Colori del Tema</p>
                    <p className="text-sm text-gray-600">Personalizza i colori del sito</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-semibold">Logo</p>
                <p className="text-sm text-gray-600">Carica il logo del negozio</p>
                <button className="mt-2 text-sm text-blue-600 hover:underline">Carica Logo</button>
              </div>
            </div>
          </div>

          {/* Pagine Legali */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📜 Pagine Legali</h2>
            <div className="space-y-2">
              <Link href="/privacy-policy" target="_blank" className="block p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="text-blue-600 hover:underline">Privacy Policy →</span>
              </Link>
              <Link href="/termini-condizioni" target="_blank" className="block p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="text-blue-600 hover:underline">Termini e Condizioni →</span>
              </Link>
              <Link href="/politiche-reso" target="_blank" className="block p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="text-blue-600 hover:underline">Politiche di Reso →</span>
              </Link>
              <Link href="/politiche-spedizione" target="_blank" className="block p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="text-blue-600 hover:underline">Politiche di Spedizione →</span>
              </Link>
              <Link href="/cookie-policy" target="_blank" className="block p-2 hover:bg-gray-50 rounded transition-colors">
                <span className="text-blue-600 hover:underline">Cookie Policy →</span>
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Queste pagine utilizzano automaticamente i dati aziendali inseriti sopra
            </p>
          </div>

          {/* Spedizione */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">🚚 Impostazioni Spedizione</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Costo Spedizione Standard</label>
                <p className="font-semibold">€4,99</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Spedizione Gratuita sopra</label>
                <p className="font-semibold">€49,00</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Tempi di Consegna</label>
                <p className="font-semibold">2-3 giorni lavorativi</p>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Modifica Spedizione
            </button>
          </div>

          {/* Pagamenti */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">💳 Metodi di Pagamento</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2">
                <span>💵 Contrassegno</span>
                <span className="text-green-600 font-semibold">Attivo</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span>💳 Carte di Credito</span>
                <span className="text-gray-400">Non configurato</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span>🏦 PayPal</span>
                <span className="text-gray-400">Non configurato</span>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Configura Pagamenti
            </button>
          </div>
        </div>

        <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-900 mb-2">⚠️ Impostazioni Avanzate</h3>
          <p className="text-yellow-700 text-sm mb-4">
            Queste impostazioni richiedono conoscenze tecniche. Modifica con cautela.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-4 py-2 bg-white border border-yellow-400 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
              Backup Database
            </button>
            <button className="px-4 py-2 bg-white border border-yellow-400 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
              Cache e Performance
            </button>
          </div>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}