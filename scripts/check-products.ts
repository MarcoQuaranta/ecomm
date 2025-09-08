import { sql } from '@vercel/postgres';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config({ path: '.env.local' });

async function checkProducts() {
  console.log('🔍 Controllo prodotti nel database e nel JSON...\n');
  
  try {
    // 1. Conta prodotti nel database
    const { rows: dbCount } = await sql`SELECT COUNT(*) as count FROM products`;
    console.log(`📊 Prodotti nel DATABASE: ${dbCount[0].count}`);
    
    // 2. Lista prodotti nel database
    const { rows: dbProducts } = await sql`SELECT id, name, category FROM products ORDER BY created_at DESC`;
    console.log('\n📋 Lista prodotti nel DATABASE:');
    dbProducts.forEach((p, i) => {
      console.log(`   ${i + 1}. [${p.category}] ${p.name} (${p.id})`);
    });
    
    // 3. Conta prodotti nel JSON
    const jsonPath = path.join(process.cwd(), 'src/data/products.json');
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const { products: jsonProducts } = JSON.parse(jsonData);
    console.log(`\n📄 Prodotti nel JSON originale: ${jsonProducts.length}`);
    
    // 4. Lista prodotti nel JSON
    console.log('\n📋 Lista prodotti nel JSON:');
    jsonProducts.forEach((p: any, i: number) => {
      console.log(`   ${i + 1}. [${p.category}] ${p.name} (${p.id})`);
    });
    
    // 5. Trova differenze
    const dbIds = new Set(dbProducts.map(p => p.id));
    const jsonIds = new Set(jsonProducts.map((p: any) => p.id));
    
    const missingInDb = jsonProducts.filter((p: any) => !dbIds.has(p.id));
    const extraInDb = dbProducts.filter(p => !jsonIds.has(p.id));
    
    if (missingInDb.length > 0) {
      console.log('\n⚠️  Prodotti MANCANTI nel database:');
      missingInDb.forEach((p: any) => {
        console.log(`   - ${p.name} (${p.id})`);
      });
    }
    
    if (extraInDb.length > 0) {
      console.log('\n➕ Prodotti EXTRA nel database (non nel JSON):');
      extraInDb.forEach(p => {
        console.log(`   - ${p.name} (${p.id})`);
      });
    }
    
    if (missingInDb.length === 0 && extraInDb.length === 0) {
      console.log('\n✅ Database e JSON sono sincronizzati!');
    } else {
      console.log('\n💡 Suggerimento: Usa "npm run db:migrate:force" per sincronizzare dal JSON');
    }
    
  } catch (error) {
    console.error('❌ Errore:', error);
  }
  
  process.exit(0);
}

checkProducts();