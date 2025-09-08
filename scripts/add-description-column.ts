import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config({ path: '.env.local' });

async function addDescriptionColumn() {
  console.log('🔧 Aggiungendo colonna descrizione al database...\n');
  
  try {
    // Aggiungi la colonna description se non esiste
    await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT
    `;
    
    console.log('✅ Colonna descrizione aggiunta con successo!');
    
    // Verifica che la colonna sia stata aggiunta
    const { rows } = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      AND column_name = 'description'
    `;
    
    if (rows.length > 0) {
      console.log('✅ Verifica: la colonna description esiste nel database');
    } else {
      console.log('⚠️  La colonna description non è stata trovata');
    }
    
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  
  process.exit(0);
}

addDescriptionColumn();