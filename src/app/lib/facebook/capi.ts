// Stub module per Facebook CAPI - da implementare quando richiesto
// Queste funzioni sono placeholder che non fanno nulla

export interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  externalId?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string;
  fbp?: string;
}

// Salva i dati utente in localStorage (stub)
export function saveUserDataToStorage(data: Partial<UserData>): void {
  if (typeof window !== 'undefined') {
    try {
      const existing = getUserDataFromStorage();
      const merged = { ...existing, ...data };
      localStorage.setItem('fb_user_data', JSON.stringify(merged));
    } catch (e) {
      // Silenzioso
    }
  }
}

// Recupera i dati utente da localStorage
export function getUserDataFromStorage(): UserData {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem('fb_user_data');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }
  return {};
}

// Stub per tracking purchase - non fa nulla per ora
export async function trackPurchaseCAPI(
  value: number,
  currency: string,
  contentIds: string[],
  userData?: UserData
): Promise<void> {
  // TODO: Implementare quando richiesto
  console.log('[FB CAPI] Purchase tracking stub called', { value, currency, contentIds });
}

// Stub per tracking eventi generici
export async function trackEventCAPI(
  eventName: string,
  eventData?: Record<string, unknown>,
  userData?: UserData
): Promise<void> {
  // TODO: Implementare quando richiesto
  console.log('[FB CAPI] Event tracking stub called', { eventName, eventData });
}
