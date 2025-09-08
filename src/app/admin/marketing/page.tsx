'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

interface GeneralStats {
  totalVisits: number;
  totalOrders: number;
  conversionRate: string;
  todayVisits: number;
  todayOrders: number;
  totalRevenue: number;
}

interface ProductStat {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  views: number;
  orders: number;
  revenue: number;
  conversionRate: number;
}

interface SessionStats {
  avgDurationMinutes: number;
  avgDurationSeconds: number;
  totalSessions: number;
}

interface TimeToPurchaseStats {
  avgTimeMinutes: number;
  avgTimeSeconds: number;
  totalPurchases: number;
}

interface FormAbandonmentStats {
  totalOpens: number;
  completed: number;
  abandoned: number;
  abandonmentRate: string;
  completionRate: string;
}

interface DeviceStats {
  visits: {
    desktop: { count: number; percentage: string };
    mobile: { count: number; percentage: string };
    tablet: { count: number; percentage: string };
    total: number;
  };
  orders: {
    desktop: { count: number; percentage: string };
    mobile: { count: number; percentage: string };
    tablet: { count: number; percentage: string };
    total: number;
  };
}

export default function MarketingPage() {
  const [generalStats, setGeneralStats] = useState<GeneralStats>({
    totalVisits: 0,
    totalOrders: 0,
    conversionRate: '0',
    todayVisits: 0,
    todayOrders: 0,
    totalRevenue: 0
  });
  
  const [productStats, setProductStats] = useState<ProductStat[]>([]);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ avgDurationMinutes: 0, avgDurationSeconds: 0, totalSessions: 0 });
  const [timeToPurchase, setTimeToPurchase] = useState<TimeToPurchaseStats>({ avgTimeMinutes: 0, avgTimeSeconds: 0, totalPurchases: 0 });
  const [formAbandonment, setFormAbandonment] = useState<FormAbandonmentStats>({
    totalOpens: 0,
    completed: 0,
    abandoned: 0,
    abandonmentRate: '0',
    completionRate: '0'
  });
  const [deviceStats, setDeviceStats] = useState<DeviceStats | null>(null);
  const [topViews, setTopViews] = useState<any[]>([]);
  const [topSales, setTopSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      
      // Carica tutte le statistiche in parallelo
      const [
        generalRes,
        productsRes,
        topViewsRes,
        topSalesRes,
        sessionRes,
        purchaseTimeRes,
        abandonmentRes,
        deviceRes
      ] = await Promise.all([
        fetch('/api/analytics/stats?type=general'),
        fetch('/api/analytics/stats?type=products'),
        fetch('/api/analytics/stats?type=top-views'),
        fetch('/api/analytics/stats?type=top-sales'),
        fetch('/api/analytics/stats?type=session-duration'),
        fetch('/api/analytics/stats?type=time-to-purchase'),
        fetch('/api/analytics/stats?type=form-abandonment'),
        fetch('/api/analytics/stats?type=device-stats')
      ]);

      setGeneralStats(await generalRes.json());
      setProductStats(await productsRes.json());
      setTopViews(await topViewsRes.json());
      setTopSales(await topSalesRes.json());
      setSessionStats(await sessionRes.json());
      setTimeToPurchase(await purchaseTimeRes.json());
      setFormAbandonment(await abandonmentRes.json());
      setDeviceStats(await deviceRes.json());

    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}m ${secs}s`;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Caricamento analytics...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Marketing & Analytics</h1>
          <p className="text-gray-600 mt-2">Monitora le performance del tuo negozio</p>
        </div>

        {/* Statistiche Generali - Prima riga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Visite Totali</span>
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{generalStats.totalVisits.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1">+{generalStats.todayVisits} oggi</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Ordini Totali</span>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{generalStats.totalOrders.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1">+{generalStats.todayOrders} oggi</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tasso Conversione</span>
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{generalStats.conversionRate}%</div>
            <div className="text-sm text-gray-600 mt-1">Ordini/Visite</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Fatturato Totale</span>
              <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">€{generalStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 mt-1">Totale vendite</div>
          </div>
        </div>

        {/* Nuove Metriche Avanzate - Seconda riga */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tempo Medio sul Sito</span>
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{sessionStats.avgDurationMinutes}m</div>
            <div className="text-sm text-gray-600 mt-1">{sessionStats.totalSessions} sessioni</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tempo Medio Acquisto</span>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{timeToPurchase.avgTimeMinutes}m</div>
            <div className="text-sm text-gray-600 mt-1">dalla prima visita</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Form Aperto</span>
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{formAbandonment.totalOpens}</div>
            <div className="text-sm text-gray-600 mt-1">volte totali</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tasso Abbandono</span>
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-gray-900">{formAbandonment.abandonmentRate}%</div>
            <div className="text-sm text-red-600 mt-1">{formAbandonment.abandoned} abbandoni</div>
          </div>
        </div>

        {/* Grafico Device */}
        {deviceStats && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">📱 Dispositivi Utilizzati</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Visite per Device */}
              <div>
                <h4 className="text-md font-medium mb-3 text-gray-700">Visite per Dispositivo</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">💻 Desktop</span>
                      <span className="text-sm font-semibold">{deviceStats.visits.desktop.percentage}% ({deviceStats.visits.desktop.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.visits.desktop.percentage}%` }}
                      >
                        {deviceStats.visits.desktop.percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">📱 Mobile</span>
                      <span className="text-sm font-semibold">{deviceStats.visits.mobile.percentage}% ({deviceStats.visits.mobile.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-green-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.visits.mobile.percentage}%` }}
                      >
                        {deviceStats.visits.mobile.percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">📟 Tablet</span>
                      <span className="text-sm font-semibold">{deviceStats.visits.tablet.percentage}% ({deviceStats.visits.tablet.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-purple-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.visits.tablet.percentage}%` }}
                      >
                        {deviceStats.visits.tablet.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Acquisti per Device */}
              <div>
                <h4 className="text-md font-medium mb-3 text-gray-700">Acquisti per Dispositivo</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">💻 Desktop</span>
                      <span className="text-sm font-semibold">{deviceStats.orders.desktop.percentage}% ({deviceStats.orders.desktop.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.orders.desktop.percentage}%` }}
                      >
                        {deviceStats.orders.desktop.percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">📱 Mobile</span>
                      <span className="text-sm font-semibold">{deviceStats.orders.mobile.percentage}% ({deviceStats.orders.mobile.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-green-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.orders.mobile.percentage}%` }}
                      >
                        {deviceStats.orders.mobile.percentage}%
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">📟 Tablet</span>
                      <span className="text-sm font-semibold">{deviceStats.orders.tablet.percentage}% ({deviceStats.orders.tablet.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-purple-600 h-6 rounded-full flex items-center justify-center text-xs text-white font-semibold"
                        style={{ width: `${deviceStats.orders.tablet.percentage}%` }}
                      >
                        {deviceStats.orders.tablet.percentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Panoramica
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Analisi Prodotti
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Prodotti per Visualizzazioni */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">🔥 Prodotti Più Visti</h3>
                  <div className="space-y-3">
                    {topViews.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                          {product.image && (
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                          )}
                          <div>
                            <Link href={`/prodotti/${product.slug}`} className="font-medium hover:text-blue-600">
                              {product.name}
                            </Link>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{product.views}</div>
                          <div className="text-xs text-gray-500">visualizzazioni</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Prodotti per Vendite */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">💰 Prodotti Più Venduti</h3>
                  <div className="space-y-3">
                    {topSales.map((product, index) => (
                      <div key={product.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                          <div>
                            <div className="font-medium">{product.productName}</div>
                            <div className="text-sm text-gray-500">€{product.revenue.toFixed(2)} fatturato</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{product.sales}</div>
                          <div className="text-xs text-gray-500">vendite</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Analisi Dettagliata Prodotti</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prodotto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prezzo
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Visualizzazioni
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ordini
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tasso Conv.
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Fatturato
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {productStats.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {product.image && (
                                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded mr-3" />
                              )}
                              <div>
                                <Link href={`/prodotti/${product.slug}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                  {product.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            €{product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-semibold text-blue-600">{product.views}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className="text-sm font-semibold text-green-600">{product.orders}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.conversionRate > 5
                                ? 'bg-green-100 text-green-800'
                                : product.conversionRate > 2
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.conversionRate.toFixed(1)}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                            €{product.revenue.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}