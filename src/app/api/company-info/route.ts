import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Forza lettura dal master con una transazione
    await sql`BEGIN`;
    const result = await sql`
      SELECT * FROM company_info 
      ORDER BY updated_at DESC 
      LIMIT 1
    `;
    await sql`COMMIT`;
    
    if (result.rows.length === 0) {
      // Ritorna dati di default se non trovati
      return NextResponse.json({
        company_name: 'Il Mio E-commerce',
        email: 'info@example.com',
        legal_address: 'Via Roma 1, 00100 Roma, Italia',
        vat_number: 'IT12345678901',
        share_capital: '',
        pec_email: ''
      });
    }
    
    // Assicurati che i campi null vengano convertiti in stringhe vuote per il frontend
    const company = result.rows[0];
    
    const response = {
      ...company,
      company_name: company.company_name || 'Il Mio E-commerce',
      email: company.email || 'info@example.com',
      legal_address: company.legal_address || 'Via Roma 1, 00100 Roma, Italia',
      vat_number: company.vat_number || 'IT12345678901',
      share_capital: company.share_capital || '',
      pec_email: company.pec_email || ''
    };
    
    return NextResponse.json(response);
  } catch (error) {
    // Rollback in caso di errore
    try { await sql`ROLLBACK`; } catch {}
    console.error('Error fetching company info:', error);
    return NextResponse.json({ error: 'Failed to fetch company info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Controlla se esiste già un record
    const existing = await sql`SELECT id FROM company_info LIMIT 1`;
    
    if (existing.rows.length > 0) {
      // Aggiorna il record esistente
      await sql`
        UPDATE company_info 
        SET 
          company_name = ${data.company_name},
          email = ${data.email},
          legal_address = ${data.legal_address},
          vat_number = ${data.vat_number},
          share_capital = ${data.share_capital && data.share_capital.trim() ? data.share_capital : null},
          pec_email = ${data.pec_email && data.pec_email.trim() ? data.pec_email : null},
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${existing.rows[0].id}
      `;
    } else {
      // Crea nuovo record
      await sql`
        INSERT INTO company_info (
          company_name, email, legal_address, vat_number, 
          share_capital, pec_email
        ) VALUES (
          ${data.company_name},
          ${data.email},
          ${data.legal_address},
          ${data.vat_number},
          ${data.share_capital && data.share_capital.trim() ? data.share_capital : null},
          ${data.pec_email && data.pec_email.trim() ? data.pec_email : null}
        )
      `;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating company info:', error);
    return NextResponse.json({ error: 'Failed to update company info' }, { status: 500 });
  }
}