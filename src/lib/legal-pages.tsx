// Funzione helper per ottenere i dati aziendali
import { sql } from '@vercel/postgres';

export async function getCompanyInfo() {
  try {
    // Forza lettura dal master con una transazione
    await sql`BEGIN`;
    const result = await sql`SELECT * FROM company_info ORDER BY updated_at DESC LIMIT 1`;
    await sql`COMMIT`;
    if (result.rows.length > 0) {
      const company = result.rows[0];
      return {
        ...company,
        company_name: company.company_name || 'Il Mio E-commerce',
        email: company.email || 'info@example.com',
        legal_address: company.legal_address || 'Via Roma 1, 00100 Roma, Italia',
        vat_number: company.vat_number || 'IT12345678901',
        share_capital: company.share_capital || '',
        pec_email: company.pec_email || ''
      };
    }
  } catch (error) {
    // Rollback in caso di errore
    try { await sql`ROLLBACK`; } catch {}
    console.error('Error fetching company info:', error);
  }
  return {
    company_name: 'Il Mio E-commerce',
    email: 'info@example.com',
    legal_address: 'Via Roma 1, 00100 Roma, Italia',
    vat_number: 'IT12345678901',
    share_capital: '',
    pec_email: ''
  };
}