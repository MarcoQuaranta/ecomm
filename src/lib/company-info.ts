export async function getCompanyInfo() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3003'}/api/company-info`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch company info');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Error fetching company info:', error);
    // Ritorna dati di default in caso di errore
    return {
      company_name: 'Il Mio E-commerce',
      email: 'info@example.com',
      legal_address: 'Via Roma 1, 00100 Roma, Italia',
      vat_number: 'IT12345678901',
      share_capital: '',
      phone: '',
      pec_email: ''
    };
  }
}