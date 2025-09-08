import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createAnalyticsTables() {
  try {
    console.log('Creating analytics tables...');
    
    // Tabella per le visite al sito
    await sql`
      CREATE TABLE IF NOT EXISTS site_visits (
        id SERIAL PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        page_url TEXT,
        referrer TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(ip_address)
      )
    `;
    console.log('Site visits table created');

    // Tabella per le visualizzazioni dei prodotti
    await sql`
      CREATE TABLE IF NOT EXISTS product_views (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(255) NOT NULL,
        product_slug VARCHAR(255),
        ip_address VARCHAR(45) NOT NULL,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(product_id, ip_address)
      )
    `;
    console.log('Product views table created');

    // Tabella per gli ordini/acquisti
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        product_id VARCHAR(255) NOT NULL,
        product_name VARCHAR(255),
        product_price DECIMAL(10, 2),
        customer_name VARCHAR(255),
        customer_email VARCHAR(255),
        customer_phone VARCHAR(50),
        customer_address TEXT,
        ip_address VARCHAR(45),
        status VARCHAR(50) DEFAULT 'pending',
        payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Orders table created');

    // Tabella per statistiche aggregate (cache)
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_cache (
        id VARCHAR(50) PRIMARY KEY,
        data JSONB,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Analytics cache table created');

    // Indici per migliorare le performance
    await sql`CREATE INDEX IF NOT EXISTS idx_site_visits_ip ON site_visits(ip_address)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_site_visits_created ON site_visits(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_product_views_product ON product_views(product_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_product_views_viewed ON product_views(viewed_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_orders_product ON orders(product_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at)`;
    
    console.log('Indexes created successfully');
    console.log('All analytics tables created successfully!');
    
  } catch (error) {
    console.error('Error creating analytics tables:', error);
  }
}

createAnalyticsTables();