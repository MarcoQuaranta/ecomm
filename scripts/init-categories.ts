import { sql } from '@vercel/postgres';
import * as dotenv from 'dotenv';
import path from 'path';

// Carica le variabili d'ambiente
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const defaultCategories = [
  {
    slug: 'giardinaggio',
    name: 'Giardinaggio',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    color: 'from-green-500 to-green-600',
    order_index: 1
  },
  {
    slug: 'utensili',
    name: 'Utensili',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-blue-600',
    order_index: 2
  },
  {
    slug: 'per-la-casa',
    name: 'Per la casa',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    color: 'from-orange-500 to-orange-600',
    order_index: 3
  },
  {
    slug: 'elettronica',
    name: 'Elettronica',
    image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=400&h=300&fit=crop',
    color: 'from-purple-500 to-purple-600',
    order_index: 4
  }
];

async function initCategories() {
  console.log('🔄 Inizializzazione categorie predefinite...\n');

  try {
    // Crea la tabella se non esiste
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        image TEXT,
        color VARCHAR(100) DEFAULT 'from-gray-500 to-gray-600',
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Tabella categories verificata');

    // Controlla se ci sono già categorie
    const { rows: existingCategories } = await sql`SELECT COUNT(*) as count FROM categories`;
    
    if (parseInt(existingCategories[0].count) > 0) {
      console.log('ℹ️  Categorie già presenti nel database');
      const { rows: categories } = await sql`SELECT name, slug FROM categories ORDER BY order_index`;
      console.log('\nCategorie esistenti:');
      categories.forEach(cat => console.log(`  - ${cat.name} (${cat.slug})`));
    } else {
      // Inserisci le categorie predefinite
      for (const category of defaultCategories) {
        await sql`
          INSERT INTO categories (slug, name, image, color, order_index)
          VALUES (${category.slug}, ${category.name}, ${category.image}, ${category.color}, ${category.order_index})
        `;
        console.log(`✅ Aggiunta categoria: ${category.name}`);
      }
      console.log('\n🎉 Categorie predefinite create con successo!');
    }

    // Mostra statistiche
    const { rows: stats } = await sql`
      SELECT c.name, c.slug, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category = c.slug
      GROUP BY c.id, c.name, c.slug
      ORDER BY c.order_index
    `;
    
    console.log('\n📊 Statistiche categorie:');
    stats.forEach(stat => {
      console.log(`  ${stat.name}: ${stat.product_count} prodotti`);
    });

  } catch (error) {
    console.error('❌ Errore durante l\'inizializzazione delle categorie:', error);
    process.exit(1);
  }
}

// Esegui lo script
initCategories().then(() => {
  console.log('\n✅ Script completato');
  process.exit(0);
});