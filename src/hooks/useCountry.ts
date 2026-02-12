'use client';

import { useState, useEffect } from 'react';

export function useCountry() {
  const [countryCode, setCountryCode] = useState<string>('it');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function detectCountry() {
      try {
        // Usa ip-api.com (gratuito, no API key richiesta)
        const response = await fetch('http://ip-api.com/json/?fields=countryCode');

        if (response.ok) {
          const data = await response.json();
          if (data.countryCode) {
            setCountryCode(data.countryCode.toLowerCase());
          }
        }
      } catch (error) {
        // Errore silenzioso, usa default 'it'
        console.log('Geo detection fallback to IT');
      } finally {
        setLoading(false);
      }
    }

    detectCountry();
  }, []);

  return { countryCode, loading };
}
