import { sql } from '@vercel/postgres';

export interface CategoryDB {
  id: string;
  slug: string;
  name: string;
  image: string;
  count?: number;
  color: string;
  order_index: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProductDB {
  id: string;
  slug: string;
  name: string;
  description?: string;
  page_content?: string;
  price: number;
  original_price: number;
  discount: number;
  image: string;
  category: string;
  in_stock: boolean;
  shipping_cost: number;
  free_shipping: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Inizializza il database (crea la tabella se non esiste)
export async function initDatabase() {
  try {
    // Crea la tabella categories se non esiste
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
    
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        page_content TEXT,
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
    
    // Aggiungi le colonne se non esistono (per tabelle esistenti)
    await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT
    `;
    await sql`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS page_content TEXT
    `;
    console.log('Database initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    return false;
  }
}

// Ottieni tutti i prodotti
export async function getProducts(): Promise<ProductDB[]> {
  try {
    const { rows } = await sql<ProductDB>`
      SELECT * FROM products ORDER BY created_at DESC
    `;
    return rows.map(row => ({
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Se la tabella non esiste, proviamo a crearla
    await initDatabase();
    return [];
  }
}

// Ottieni prodotto per slug
export async function getProductBySlug(slug: string): Promise<ProductDB | undefined> {
  try {
    const { rows } = await sql<ProductDB>`
      SELECT * FROM products WHERE slug = ${slug} LIMIT 1
    `;
    if (rows.length === 0) return undefined;
    const row = rows[0];
    return {
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return undefined;
  }
}

// Ottieni prodotto per ID
export async function getProductById(id: string): Promise<ProductDB | undefined> {
  try {
    const { rows } = await sql<ProductDB>`
      SELECT * FROM products WHERE id = ${id} LIMIT 1
    `;
    if (rows.length === 0) return undefined;
    const row = rows[0];
    return {
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    };
  } catch (error) {
    console.error('Error fetching product by id:', error);
    return undefined;
  }
}

// Aggiungi prodotto
export async function addProduct(product: Omit<ProductDB, 'id' | 'slug' | 'created_at' | 'updated_at'>): Promise<ProductDB> {
  try {
    // Genera ID e slug
    const id = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const { rows } = await sql<ProductDB>`
      INSERT INTO products (
        id, slug, name, description, page_content, price, original_price, discount, 
        image, category, in_stock, shipping_cost, free_shipping
      ) VALUES (
        ${id}, ${slug}, ${product.name}, ${product.description || null}, 
        ${product.page_content || null}, ${product.price}, 
        ${product.original_price}, ${product.discount}, ${product.image}, 
        ${product.category}, ${product.in_stock}, ${product.shipping_cost}, 
        ${product.free_shipping}
      )
      RETURNING *
    `;
    
    const row = rows[0];
    return {
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Aggiorna prodotto
export async function updateProduct(id: string, updates: Partial<Omit<ProductDB, 'id' | 'created_at' | 'updated_at'>>): Promise<ProductDB | null> {
  try {
    // Se il nome è cambiato, rigenera lo slug
    let slug = undefined;
    if (updates.name) {
      slug = updates.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const { rows } = await sql<ProductDB>`
      UPDATE products 
      SET 
        name = COALESCE(${updates.name}, name),
        slug = COALESCE(${slug}, slug),
        description = COALESCE(${updates.description}, description),
        page_content = COALESCE(${updates.page_content}, page_content),
        price = COALESCE(${updates.price}, price),
        original_price = COALESCE(${updates.original_price}, original_price),
        discount = COALESCE(${updates.discount}, discount),
        image = COALESCE(${updates.image}, image),
        category = COALESCE(${updates.category}, category),
        in_stock = COALESCE(${updates.in_stock}, in_stock),
        shipping_cost = COALESCE(${updates.shipping_cost}, shipping_cost),
        free_shipping = COALESCE(${updates.free_shipping}, free_shipping),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

// Elimina prodotto
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM products WHERE id = ${id}
    `;
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

// Ottieni prodotti random per home page
export async function getRandomProducts(count: number): Promise<ProductDB[]> {
  try {
    const { rows } = await sql<ProductDB>`
      SELECT * FROM products 
      WHERE in_stock = true 
      ORDER BY RANDOM() 
      LIMIT ${count}
    `;
    return rows.map(row => ({
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    }));
  } catch (error) {
    console.error('Error fetching random products:', error);
    return [];
  }
}

// ============= FUNZIONI PER CATEGORIE =============

// Ottieni tutte le categorie
export async function getCategories(): Promise<CategoryDB[]> {
  try {
    const { rows } = await sql<CategoryDB>`
      SELECT * FROM categories ORDER BY order_index ASC, name ASC
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Se la tabella non esiste, proviamo a crearla
    await initDatabase();
    return [];
  }
}

// Ottieni categoria per slug
export async function getCategoryBySlug(slug: string): Promise<CategoryDB | undefined> {
  try {
    const { rows } = await sql<CategoryDB>`
      SELECT * FROM categories WHERE slug = ${slug} LIMIT 1
    `;
    return rows[0];
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return undefined;
  }
}

// Aggiungi categoria
export async function addCategory(category: Omit<CategoryDB, 'id' | 'created_at' | 'updated_at'>): Promise<CategoryDB | null> {
  try {
    const { rows } = await sql<CategoryDB>`
      INSERT INTO categories (slug, name, image, color, order_index)
      VALUES (${category.slug}, ${category.name}, ${category.image}, ${category.color}, ${category.order_index})
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error adding category:', error);
    return null;
  }
}

// Aggiorna categoria
export async function updateCategory(id: string, updates: Partial<CategoryDB>): Promise<CategoryDB | null> {
  try {
    const { rows } = await sql<CategoryDB>`
      UPDATE categories
      SET 
        name = COALESCE(${updates.name}, name),
        slug = COALESCE(${updates.slug}, slug),
        image = COALESCE(${updates.image}, image),
        color = COALESCE(${updates.color}, color),
        order_index = COALESCE(${updates.order_index}, order_index),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return rows[0];
  } catch (error) {
    console.error('Error updating category:', error);
    return null;
  }
}

// Elimina categoria
export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM categories WHERE id = ${id}
    `;
    return result.rowCount > 0;
  } catch (error) {
    console.error('Error deleting category:', error);
    return false;
  }
}

// Ottieni prodotti per categoria
export async function getProductsByCategory(category: string): Promise<ProductDB[]> {
  try {
    const { rows } = await sql<ProductDB>`
      SELECT * FROM products 
      WHERE category = ${category} 
      ORDER BY created_at DESC
    `;
    return rows.map(row => ({
      ...row,
      price: Number(row.price),
      original_price: Number(row.original_price),
      shipping_cost: Number(row.shipping_cost)
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Color Settings Functions
export interface ColorScheme {
  primary: string;
  secondary: string;
  header: string;
  footer: string;
  buttonPrimary: string;
  buttonSecondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  text: string;
  textLight: string;
  background: string;
  cardBg: string;
}

export async function getColorScheme(): Promise<ColorScheme> {
  try {
    const { rows } = await sql`SELECT value FROM settings WHERE id = 'color_scheme'`;
    
    if (rows.length > 0) {
      return JSON.parse(rows[0].value);
    }
    
    // Return default colors if not found
    return {
      primary: '#ea580c',
      secondary: '#1e293b',
      header: '#0f172a',
      footer: '#1e293b',
      buttonPrimary: '#16a34a',
      buttonSecondary: '#ea580c',
      success: '#16a34a',
      danger: '#dc2626',
      warning: '#f59e0b',
      info: '#3b82f6',
      text: '#1f2937',
      textLight: '#6b7280',
      background: '#f9fafb',
      cardBg: '#ffffff'
    };
  } catch (error) {
    console.error('Error fetching color scheme:', error);
    // Return default on error
    return {
      primary: '#ea580c',
      secondary: '#1e293b',
      header: '#0f172a',
      footer: '#1e293b',
      buttonPrimary: '#16a34a',
      buttonSecondary: '#ea580c',
      success: '#16a34a',
      danger: '#dc2626',
      warning: '#f59e0b',
      info: '#3b82f6',
      text: '#1f2937',
      textLight: '#6b7280',
      background: '#f9fafb',
      cardBg: '#ffffff'
    };
  }
}

export async function updateColorScheme(colors: ColorScheme): Promise<ColorScheme> {
  try {
    await sql`
      INSERT INTO settings (id, value, updated_at)
      VALUES ('color_scheme', ${JSON.stringify(colors)}, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET 
        value = ${JSON.stringify(colors)},
        updated_at = CURRENT_TIMESTAMP
    `;
    
    return colors;
  } catch (error) {
    console.error('Error updating color scheme:', error);
    throw error;
  }
}