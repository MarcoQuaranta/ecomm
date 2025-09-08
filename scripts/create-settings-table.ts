import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function createSettingsTable() {
  try {
    console.log('Creating settings table...');
    
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id VARCHAR(50) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Settings table created successfully');
    
    // Insert default color scheme
    const defaultColors = {
      primary: '#ea580c', // Orange
      secondary: '#1e293b', // Dark slate
      header: '#0f172a', // Slate 900
      footer: '#1e293b', // Slate 800
      buttonPrimary: '#16a34a', // Green 600
      buttonSecondary: '#ea580c', // Orange
      success: '#16a34a', // Green
      danger: '#dc2626', // Red
      warning: '#f59e0b', // Amber
      info: '#3b82f6', // Blue
      text: '#1f2937', // Gray 800
      textLight: '#6b7280', // Gray 500
      background: '#f9fafb', // Gray 50
      cardBg: '#ffffff' // White
    };
    
    await sql`
      INSERT INTO settings (id, value)
      VALUES ('color_scheme', ${JSON.stringify(defaultColors)})
      ON CONFLICT (id) DO NOTHING
    `;
    
    console.log('Default color scheme inserted');
    
  } catch (error) {
    console.error('Error creating settings table:', error);
  }
}

createSettingsTable();