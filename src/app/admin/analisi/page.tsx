'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

interface PerformanceMetrics {
  desktop: {
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    score: number;
  };
  mobile: {
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    score: number;
  };
  totalPageSize: number;
  totalRequests: number;
  imagesSize: number;
  scriptsSize: number;
  stylesSize: number;
}

interface SEOAnalysis {
  score: number;
  issues: {
    critical: SEOIssue[];
    warnings: SEOIssue[];
    passed: SEOCheck[];
  };
  meta: {
    title: boolean;
    description: boolean;
    keywords: boolean;
    ogTags: boolean;
    twitterCards: boolean;
  };
  content: {
    headingsStructure: boolean;
    imagesWithAlt: number;
    imagesWithoutAlt: number;
    linksWithTitle: number;
    linksWithoutTitle: number;
    textLength: number;
    keywordDensity: number;
  };
  technical: {
    robots: boolean;
    sitemap: boolean;
    canonical: boolean;
    schema: boolean;
    ssl: boolean;
    mobileResponsive: boolean;
  };
}

interface SEOIssue {
  type: string;
  message: string;
  affected: string[];
}

interface SEOCheck {
  type: string;
  message: string;
}

export default function AnalisiPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('performance');
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null);
  const [seo, setSeo] = useState<SEOAnalysis | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = async () => {
    try {
      setLoading(true);
      
      const [perfRes, seoRes] = await Promise.all([
        fetch('/api/analysis/performance'),
        fetch('/api/analysis/seo')
      ]);

      const perfData = await perfRes.json();
      const seoData = await seoRes.json();

      setPerformance(perfData);
      setSeo(seoData);
    } catch (error) {
      console.error('Error loading analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      await fetch('/api/analysis/run', { method: 'POST' });
      await loadAnalysis();
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Caricamento analisi...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analisi Performance & SEO</h1>
            <p className="text-gray-600 mt-2">Monitora le performance e l'ottimizzazione SEO del sito</p>
          </div>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {analyzing ? 'Analisi in corso...' : '🔄 Esegui Analisi'}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'performance'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ⚡ Performance
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'seo'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🔍 SEO
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'performance' && performance && (
              <div>
                {/* Performance Score Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Desktop Performance */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">💻 Desktop Performance</h3>
                      <div className={`text-3xl font-bold ${getScoreColor(performance.desktop.score)}`}>
                        {performance.desktop.score}/100
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Load Time</span>
                        <span className="font-semibold">{performance.desktop.loadTime}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">First Contentful Paint</span>
                        <span className="font-semibold">{performance.desktop.firstContentfulPaint}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Largest Contentful Paint</span>
                        <span className="font-semibold">{performance.desktop.largestContentfulPaint}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Blocking Time</span>
                        <span className="font-semibold">{performance.desktop.totalBlockingTime}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Cumulative Layout Shift</span>
                        <span className="font-semibold">{performance.desktop.cumulativeLayoutShift}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Speed Index</span>
                        <span className="font-semibold">{performance.desktop.speedIndex}s</span>
                      </div>
                    </div>

                    {/* Performance Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            performance.desktop.score >= 90 ? 'bg-green-600' :
                            performance.desktop.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${performance.desktop.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Performance */}
                  <div className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">📱 Mobile Performance</h3>
                      <div className={`text-3xl font-bold ${getScoreColor(performance.mobile.score)}`}>
                        {performance.mobile.score}/100
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Load Time</span>
                        <span className="font-semibold">{performance.mobile.loadTime}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">First Contentful Paint</span>
                        <span className="font-semibold">{performance.mobile.firstContentfulPaint}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Largest Contentful Paint</span>
                        <span className="font-semibold">{performance.mobile.largestContentfulPaint}s</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Blocking Time</span>
                        <span className="font-semibold">{performance.mobile.totalBlockingTime}ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Cumulative Layout Shift</span>
                        <span className="font-semibold">{performance.mobile.cumulativeLayoutShift}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Speed Index</span>
                        <span className="font-semibold">{performance.mobile.speedIndex}s</span>
                      </div>
                    </div>

                    {/* Performance Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            performance.mobile.score >= 90 ? 'bg-green-600' :
                            performance.mobile.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                          }`}
                          style={{ width: `${performance.mobile.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resource Breakdown */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">📊 Analisi Risorse</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {(performance.totalPageSize / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <div className="text-sm text-gray-600">Dimensione Totale</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {performance.totalRequests}
                      </div>
                      <div className="text-sm text-gray-600">Richieste Totali</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {(performance.imagesSize / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <div className="text-sm text-gray-600">Immagini</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {(performance.scriptsSize / 1024).toFixed(0)} KB
                      </div>
                      <div className="text-sm text-gray-600">JavaScript</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {(performance.stylesSize / 1024).toFixed(0)} KB
                      </div>
                      <div className="text-sm text-gray-600">CSS</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'seo' && seo && (
              <div>
                {/* SEO Score */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Punteggio SEO Complessivo</h3>
                    <div className={`text-4xl font-bold ${getScoreColor(seo.score)}`}>
                      {seo.score}/100
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${
                        seo.score >= 90 ? 'bg-green-600' :
                        seo.score >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${seo.score}%` }}
                    />
                  </div>
                </div>

                {/* SEO Checks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Meta Tags */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">📝 Meta Tags</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Title Tag</span>
                        <span className={seo.meta.title ? 'text-green-600' : 'text-red-600'}>
                          {seo.meta.title ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Meta Description</span>
                        <span className={seo.meta.description ? 'text-green-600' : 'text-red-600'}>
                          {seo.meta.description ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Keywords</span>
                        <span className={seo.meta.keywords ? 'text-green-600' : 'text-red-600'}>
                          {seo.meta.keywords ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Open Graph</span>
                        <span className={seo.meta.ogTags ? 'text-green-600' : 'text-red-600'}>
                          {seo.meta.ogTags ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Twitter Cards</span>
                        <span className={seo.meta.twitterCards ? 'text-green-600' : 'text-red-600'}>
                          {seo.meta.twitterCards ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Analysis */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">📄 Contenuti</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Struttura Heading</span>
                        <span className={seo.content.headingsStructure ? 'text-green-600' : 'text-red-600'}>
                          {seo.content.headingsStructure ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Immagini con Alt</span>
                        <span className="font-semibold">
                          {seo.content.imagesWithAlt}/{seo.content.imagesWithAlt + seo.content.imagesWithoutAlt}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Link con Title</span>
                        <span className="font-semibold">
                          {seo.content.linksWithTitle}/{seo.content.linksWithTitle + seo.content.linksWithoutTitle}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Lunghezza Testo</span>
                        <span className="font-semibold">{seo.content.textLength} parole</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Densità Keywords</span>
                        <span className="font-semibold">{seo.content.keywordDensity}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Technical SEO */}
                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">⚙️ SEO Tecnico</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Robots.txt</span>
                        <span className={seo.technical.robots ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.robots ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sitemap XML</span>
                        <span className={seo.technical.sitemap ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.sitemap ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Canonical URLs</span>
                        <span className={seo.technical.canonical ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.canonical ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Schema Markup</span>
                        <span className={seo.technical.schema ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.schema ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">HTTPS/SSL</span>
                        <span className={seo.technical.ssl ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.ssl ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mobile Responsive</span>
                        <span className={seo.technical.mobileResponsive ? 'text-green-600' : 'text-red-600'}>
                          {seo.technical.mobileResponsive ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues Section */}
                <div className="space-y-6">
                  {/* Critical Issues */}
                  {seo.issues.critical.length > 0 && (
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <h3 className="text-lg font-semibold text-red-800 mb-4">
                        🚨 Problemi Critici ({seo.issues.critical.length})
                      </h3>
                      <div className="space-y-3">
                        {seo.issues.critical.map((issue, index) => (
                          <div key={index} className="bg-white p-3 rounded border border-red-200">
                            <div className="font-medium text-red-700">{issue.type}</div>
                            <div className="text-sm text-gray-600 mt-1">{issue.message}</div>
                            {issue.affected.length > 0 && (
                              <div className="text-xs text-gray-500 mt-2">
                                Elementi interessati: {issue.affected.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Warnings */}
                  {seo.issues.warnings.length > 0 && (
                    <div className="border border-yellow-200 rounded-lg p-6 bg-yellow-50">
                      <h3 className="text-lg font-semibold text-yellow-800 mb-4">
                        ⚠️ Avvisi ({seo.issues.warnings.length})
                      </h3>
                      <div className="space-y-3">
                        {seo.issues.warnings.map((issue, index) => (
                          <div key={index} className="bg-white p-3 rounded border border-yellow-200">
                            <div className="font-medium text-yellow-700">{issue.type}</div>
                            <div className="text-sm text-gray-600 mt-1">{issue.message}</div>
                            {issue.affected.length > 0 && (
                              <div className="text-xs text-gray-500 mt-2">
                                Elementi interessati: {issue.affected.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Passed Checks */}
                  {seo.issues.passed.length > 0 && (
                    <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                      <h3 className="text-lg font-semibold text-green-800 mb-4">
                        ✅ Controlli Superati ({seo.issues.passed.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {seo.issues.passed.map((check, index) => (
                          <div key={index} className="flex items-center text-green-700">
                            <span className="text-green-600 mr-2">✓</span>
                            <span className="text-sm">{check.message}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}