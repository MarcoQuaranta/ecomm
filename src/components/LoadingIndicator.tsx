'use client';

import { useEffect, useState } from 'react';

export default function LoadingIndicator() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Mostra il loading solo dopo 500ms per evitare flash su caricamenti veloci
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">Caricamento...</p>
      </div>
    </div>
  );
}