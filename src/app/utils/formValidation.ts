export function validateForm(data: {
  name: string;
  phone: string;
  address: string;
  countryCode?: string;
  productKey?: string;
  pageLoadTime?: number;
}): { isValid: boolean; error?: string } {
  if (!data.name || data.name.trim().length < 2) {
    return { isValid: false, error: 'Inserisci un nome valido.' };
  }
  if (!data.phone || data.phone.trim().length < 6) {
    return { isValid: false, error: 'Inserisci un numero di telefono valido.' };
  }
  if (!data.address || data.address.trim().length < 5) {
    return { isValid: false, error: 'Inserisci un indirizzo valido.' };
  }
  return { isValid: true };
}
