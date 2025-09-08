import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL!);

async function createCompanyInfoTable() {
  try {
    // Crea tabella per informazioni aziendali
    await sql`
      CREATE TABLE IF NOT EXISTS company_info (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) DEFAULT 'Il Mio E-commerce',
        email VARCHAR(255) DEFAULT 'info@example.com',
        legal_address TEXT DEFAULT 'Via Roma 1, 00100 Roma, Italia',
        vat_number VARCHAR(50) DEFAULT 'IT12345678901',
        share_capital VARCHAR(100),
        phone VARCHAR(50),
        pec_email VARCHAR(255),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Tabella company_info creata con successo');

    // Inserisci dati di default se non esistono
    const existing = await sql`SELECT COUNT(*) as count FROM company_info`;
    
    if (existing && existing[0] && parseInt(existing[0].count) === 0) {
      await sql`
        INSERT INTO company_info (
          company_name,
          email,
          legal_address,
          vat_number,
          share_capital,
          phone,
          pec_email
        ) VALUES (
          'Il Mio E-commerce',
          'info@example.com',
          'Via Roma 1, 00100 Roma, Italia',
          'IT12345678901',
          '€ 10.000,00 i.v.',
          '+39 06 12345678',
          'pec@example.com'
        )
      `;
      console.log('✅ Dati aziendali di default inseriti');
    }

  } catch (error) {
    console.error('Errore nella creazione della tabella company_info:', error);
  }
}

createCompanyInfoTable();