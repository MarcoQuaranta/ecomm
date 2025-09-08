import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addAdvancedAnalytics() {
  try {
    console.log('Adding advanced analytics columns and tables...');
    
    // Aggiungi colonne alla tabella site_visits per tracciare sessioni
    await sql`
      ALTER TABLE site_visits 
      ADD COLUMN IF NOT EXISTS session_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS device_type VARCHAR(20),
      ADD COLUMN IF NOT EXISTS browser VARCHAR(50),
      ADD COLUMN IF NOT EXISTS os VARCHAR(50),
      ADD COLUMN IF NOT EXISTS screen_width INTEGER,
      ADD COLUMN IF NOT EXISTS screen_height INTEGER,
      ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      ADD COLUMN IF NOT EXISTS session_duration INTEGER DEFAULT 0
    `;
    console.log('Updated site_visits table');

    // Tabella per tracciare eventi (apertura form, chiusura, etc.)
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100),
        ip_address VARCHAR(45),
        event_type VARCHAR(50),
        event_data JSONB,
        product_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Created analytics_events table');

    // Tabella per tracciare form abandonment
    await sql`
      CREATE TABLE IF NOT EXISTS form_abandonment (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100),
        ip_address VARCHAR(45),
        product_id VARCHAR(255),
        product_slug VARCHAR(255),
        form_opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        form_closed_at TIMESTAMP,
        completed BOOLEAN DEFAULT FALSE,
        time_spent_seconds INTEGER,
        device_type VARCHAR(20)
      )
    `;
    console.log('Created form_abandonment table');

    // Aggiungi colonne alla tabella orders per device tracking
    await sql`
      ALTER TABLE orders 
      ADD COLUMN IF NOT EXISTS device_type VARCHAR(20),
      ADD COLUMN IF NOT EXISTS session_id VARCHAR(100),
      ADD COLUMN IF NOT EXISTS time_to_purchase INTEGER
    `;
    console.log('Updated orders table');

    // Indici per migliorare le performance
    await sql`CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_events_type ON analytics_events(event_type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_abandonment_session ON form_abandonment(session_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_visits_session ON site_visits(session_id)`;
    
    console.log('Indexes created successfully');
    console.log('Advanced analytics tables updated successfully!');
    
  } catch (error) {
    console.error('Error adding advanced analytics:', error);
  }
}

addAdvancedAnalytics();