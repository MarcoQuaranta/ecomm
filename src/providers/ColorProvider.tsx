'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ColorScheme } from '@/lib/db';

interface ColorContextType {
  colors: ColorScheme;
  loadColors: () => Promise<void>;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
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

  const loadColors = async () => {
    try {
      const response = await fetch('/api/settings/colors');
      if (response.ok) {
        const data = await response.json();
        setColors(data);
        applyColors(data);
      }
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  };

  const applyColors = (colorScheme: ColorScheme) => {
    // Apply colors as CSS variables
    const root = document.documentElement;
    Object.entries(colorScheme).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  useEffect(() => {
    loadColors();
  }, []);

  return (
    <ColorContext.Provider value={{ colors, loadColors }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColors() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
}