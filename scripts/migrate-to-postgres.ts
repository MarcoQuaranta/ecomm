import { sql } from '@vercel/postgres';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config({ path: '.env.local' });

interface OldProduct {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  inStock: boolean;
  shippingCost: number;
  freeShipping: boolean;
}

async function migrate() {
  console.log('🚀 Inizio migrazione da JSON a PostgreSQL...');
  
  try {
    // 1. Crea la tabella se non esiste
    console.log('📋 Creazione tabella products...');
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2) NOT NULL,
        discount INTEGER DEFAULT 0,
        image TEXT,
        category VARCHAR(100) NOT NULL,
        in_stock BOOLEAN DEFAULT true,
        shipping_cost DECIMAL(10, 2) DEFAULT 0,
        free_shipping BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella creata/verificata');
    
    // 2. Leggi i prodotti dal JSON
    console.log('📖 Lettura prodotti dal file JSON...');
    const jsonPath = path.join(process.cwd(), 'src/data/products.json');
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const { products }: { products: OldProduct[] } = JSON.parse(jsonData);
    console.log(`📦 Trovati ${products.length} prodotti da migrare`);
    
    // 3. Controlla se ci sono già prodotti nel database
    const { rows: existing } = await sql`SELECT COUNT(*) as count FROM products`;
    if (existing[0].count > 0) {
      console.log(`⚠️  Il database contiene già ${existing[0].count} prodotti`);
      const answer = process.argv.includes('--force');
      if (!answer) {
        console.log('Usa --force per sovrascrivere i dati esistenti');
        console.log('Oppure usa --append per aggiungere solo i nuovi prodotti');
        process.exit(0);
      }
      if (process.argv.includes('--force')) {
        console.log('🗑️  Pulizia database...');
        await sql`DELETE FROM products`;
      }
    }
    
    // 4. Inserisci i prodotti nel database
    console.log('💾 Inserimento prodotti nel database...');
    let successCount = 0;
    let skipCount = 0;
    
    for (const product of products) {
      try {
        // Controlla se il prodotto esiste già (per --append)
        if (process.argv.includes('--append')) {
          const { rows } = await sql`SELECT id FROM products WHERE id = ${product.id}`;
          if (rows.length > 0) {
            console.log(`⏭️  Prodotto ${product.id} già esistente, salto...`);
            skipCount++;
            continue;
          }
        }
        
        await sql`
          INSERT INTO products (
            id, slug, name, price, original_price, discount, 
            image, category, in_stock, shipping_cost, free_shipping
          ) VALUES (
            ${product.id}, 
            ${product.slug}, 
            ${product.name}, 
            ${product.price}, 
            ${product.originalPrice}, 
            ${product.discount}, 
            ${product.image}, 
            ${product.category}, 
            ${product.inStock}, 
            ${product.shippingCost}, 
            ${product.freeShipping}
          )
        `;
        successCount++;
        console.log(`✅ Migrato: ${product.name}`);
      } catch (error: any) {
        console.error(`❌ Errore migrando ${product.name}:`, error.message);
      }
    }
    
    // 5. Verifica finale
    const { rows: final } = await sql`SELECT COUNT(*) as count FROM products`;
    console.log(`\n📊 Riepilogo migrazione:`);
    console.log(`   - Prodotti nel JSON: ${products.length}`);
    console.log(`   - Prodotti migrati con successo: ${successCount}`);
    console.log(`   - Prodotti saltati: ${skipCount}`);
    console.log(`   - Totale prodotti nel database: ${final[0].count}`);
    console.log('\n✨ Migrazione completata!');
    
  } catch (error) {
    console.error('❌ Errore durante la migrazione:', error);
    process.exit(1);
  }
  
  process.exit(0);
}

// Esegui la migrazione
migrate();