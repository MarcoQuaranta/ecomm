// Rilevamento nazione visitatore da IP

export interface GeoInfo {
  country: string;
  countryCode: string;
}

// Cache della geolocalizzazione
let cachedGeo: GeoInfo | null = null;

export async function getVisitorCountry(): Promise<string> {
  // Se già in cache, restituisci
  if (cachedGeo) {
    return cachedGeo.countryCode.toLowerCase();
  }

  try {
    // Usa ip-api.com (gratuito, no API key)
    const response = await fetch('http://ip-api.com/json/?fields=countryCode', {
      cache: 'no-store'
    });

    if (response.ok) {
      const data = await response.json();
      cachedGeo = {
        country: data.country || '',
        countryCode: data.countryCode || 'it'
      };
      return cachedGeo.countryCode.toLowerCase();
    }
  } catch (error) {
    console.error('Errore rilevamento geo:', error);
  }

  // Default: Italia
  return 'it';
}

// Versione sincrona con fallback (per SSR)
export function getDefaultCountry(): string {
  return 'it';
}
