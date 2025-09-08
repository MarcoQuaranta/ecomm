'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ColorScheme } from '@/lib/db';

export default function ColorsPage() {
  const [colors, setColors] = useState<ColorScheme>({
    primary: '#ea580c',
    secondary: '#1e293b',
    header: '#0f172a',
    footer: '#1e293b',
    buttonPrimary: '#16a34a',
    buttonSecondary: '#ea580c',
    success: '#16a34a',
    danger: '#dc2626',
    warning: '#f59e0b',
    info: '#3b82f6',
    text: '#1f2937',
    textLight: '#6b7280',
    background: '#f9fafb',
    cardBg: '#ffffff'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Preset color schemes
  const presets = [
    {
      name: 'Default',
      colors: {
        primary: '#ea580c',
        secondary: '#1e293b',
        header: '#0f172a',
        footer: '#1e293b',
        buttonPrimary: '#16a34a',
        buttonSecondary: '#ea580c',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#f59e0b',
        info: '#3b82f6',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#f9fafb',
        cardBg: '#ffffff'
      }
    },
    {
      name: 'Blue Professional',
      colors: {
        primary: '#2563eb',
        secondary: '#1e3a8a',
        header: '#1e3a8a',
        footer: '#1e293b',
        buttonPrimary: '#2563eb',
        buttonSecondary: '#3b82f6',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#06b6d4',
        text: '#111827',
        textLight: '#6b7280',
        background: '#f0f9ff',
        cardBg: '#ffffff'
      }
    },
    {
      name: 'Green Nature',
      colors: {
        primary: '#16a34a',
        secondary: '#14532d',
        header: '#14532d',
        footer: '#166534',
        buttonPrimary: '#16a34a',
        buttonSecondary: '#22c55e',
        success: '#16a34a',
        danger: '#dc2626',
        warning: '#eab308',
        info: '#0ea5e9',
        text: '#0f172a',
        textLight: '#64748b',
        background: '#f0fdf4',
        cardBg: '#ffffff'
      }
    },
    {
      name: 'Purple Elegant',
      colors: {
        primary: '#9333ea',
        secondary: '#581c87',
        header: '#581c87',
        footer: '#4c1d95',
        buttonPrimary: '#9333ea',
        buttonSecondary: '#a855f7',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        text: '#1f2937',
        textLight: '#6b7280',
        background: '#faf5ff',
        cardBg: '#ffffff'
      }
    },
    {
      name: 'Dark Mode',
      colors: {
        primary: '#f59e0b',
        secondary: '#1f2937',
        header: '#111827',
        footer: '#0f172a',
        buttonPrimary: '#f59e0b',
        buttonSecondary: '#ef4444',
        success: '#10b981',
        danger: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        text: '#f9fafb',
        textLight: '#d1d5db',
        background: '#1f2937',
        cardBg: '#374151'
      }
    }
  ];

  useEffect(() => {
    loadColors();
  }, []);

  const loadColors = async () => {
    try {
      const response = await fetch('/api/settings/colors');
      if (response.ok) {
        const data = await response.json();
        setColors(data);
      }
    } catch (error) {
      console.error('Error loading colors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (key: keyof ColorScheme, value: string) => {
    setColors(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/settings/colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(colors),
      });

      if (response.ok) {
        setMessage('Colori salvati con successo! Ricarica la pagina per vedere le modifiche.');
        // Force reload after a short delay to apply new colors
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage('Errore nel salvataggio dei colori');
      }
    } catch (error) {
      console.error('Error saving colors:', error);
      setMessage('Errore nel salvataggio dei colori');
    } finally {
      setSaving(false);
    }
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setColors(preset.colors as ColorScheme);
  };

  const colorGroups = [
    {
      title: 'Colori Principali',
      items: [
        { key: 'primary', label: 'Primario', description: 'Colore principale del brand' },
        { key: 'secondary', label: 'Secondario', description: 'Colore secondario' }
      ]
    },
    {
      title: 'Layout',
      items: [
        { key: 'header', label: 'Header', description: 'Colore intestazione' },
        { key: 'footer', label: 'Footer', description: 'Colore piè di pagina' },
        { key: 'background', label: 'Sfondo', description: 'Colore sfondo principale' },
        { key: 'cardBg', label: 'Sfondo Card', description: 'Colore sfondo delle card' }
      ]
    },
    {
      title: 'Pulsanti',
      items: [
        { key: 'buttonPrimary', label: 'Pulsante Primario', description: 'Pulsanti principali (acquista, conferma)' },
        { key: 'buttonSecondary', label: 'Pulsante Secondario', description: 'Pulsanti secondari' }
      ]
    },
    {
      title: 'Stati e Feedback',
      items: [
        { key: 'success', label: 'Successo', description: 'Messaggi di successo' },
        { key: 'danger', label: 'Errore', description: 'Messaggi di errore' },
        { key: 'warning', label: 'Avviso', description: 'Messaggi di avviso' },
        { key: 'info', label: 'Info', description: 'Messaggi informativi' }
      ]
    },
    {
      title: 'Testo',
      items: [
        { key: 'text', label: 'Testo Principale', description: 'Colore testo principale' },
        { key: 'textLight', label: 'Testo Secondario', description: 'Colore testo secondario' }
      ]
    }
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Caricamento...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header principale */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestione Colori</h1>
          <p className="text-gray-600 mt-2">Personalizza i colori del tuo sito</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">

        {/* Preset Schemes */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Schemi Predefiniti</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="p-3 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-2 justify-center">
                  <div 
                    className="w-6 h-6 rounded" 
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <div 
                    className="w-6 h-6 rounded" 
                    style={{ backgroundColor: preset.colors.secondary }}
                  />
                  <div 
                    className="w-6 h-6 rounded" 
                    style={{ backgroundColor: preset.colors.buttonPrimary }}
                  />
                </div>
                <div className="text-sm font-medium">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Groups */}
        <div className="space-y-8">
          {colorGroups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b">{group.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {group.items.map((item) => (
                  <div key={item.key} className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {item.label}
                      </label>
                      <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={colors[item.key as keyof ColorScheme]}
                          onChange={(e) => handleColorChange(item.key as keyof ColorScheme, e.target.value)}
                          className="h-10 w-20 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={colors[item.key as keyof ColorScheme]}
                          onChange={(e) => handleColorChange(item.key as keyof ColorScheme, e.target.value)}
                          className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                    <div 
                      className="w-24 h-24 rounded-lg border-2 border-gray-200"
                      style={{ backgroundColor: colors[item.key as keyof ColorScheme] }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Anteprima</h2>
          <div className="space-y-4">
            <div 
              className="p-4 rounded"
              style={{ backgroundColor: colors.header, color: colors.cardBg }}
            >
              Header Preview
            </div>
            <div className="flex gap-4">
              <button 
                className="px-4 py-2 rounded font-semibold"
                style={{ backgroundColor: colors.buttonPrimary, color: colors.cardBg }}
              >
                Pulsante Primario
              </button>
              <button 
                className="px-4 py-2 rounded font-semibold"
                style={{ backgroundColor: colors.buttonSecondary, color: colors.cardBg }}
              >
                Pulsante Secondario
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div 
                className="p-2 rounded text-center text-white text-sm"
                style={{ backgroundColor: colors.success }}
              >
                Successo
              </div>
              <div 
                className="p-2 rounded text-center text-white text-sm"
                style={{ backgroundColor: colors.danger }}
              >
                Errore
              </div>
              <div 
                className="p-2 rounded text-center text-white text-sm"
                style={{ backgroundColor: colors.warning }}
              >
                Avviso
              </div>
              <div 
                className="p-2 rounded text-center text-white text-sm"
                style={{ backgroundColor: colors.info }}
              >
                Info
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {message && (
              <div className={`text-sm ${message.includes('successo') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? 'Salvataggio...' : 'Salva Modifiche'}
          </button>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}