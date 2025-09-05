import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/products.json');

export interface ProductDB {
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

export async function getProducts(): Promise<ProductDB[]> {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data).products;
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductDB | undefined> {
  const products = await getProducts();
  return products.find(p => p.slug === slug);
}

export async function getProductById(id: string): Promise<ProductDB | undefined> {
  const products = await getProducts();
  return products.find(p => p.id === id);
}

export async function updateProduct(id: string, updates: Partial<ProductDB>): Promise<ProductDB | null> {
  try {
    const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
    const index = data.products.findIndex((p: ProductDB) => p.id === id);
    
    if (index !== -1) {
      data.products[index] = { ...data.products[index], ...updates };
      
      // Only write in development
      if (process.env.NODE_ENV === 'development') {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
      }
      
      return data.products[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
}

export async function addProduct(product: Omit<ProductDB, 'id' | 'slug'>): Promise<ProductDB> {
  try {
    const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
    
    // Generate ID and slug
    const id = `product-${Date.now()}`;
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newProduct: ProductDB = {
      ...product,
      id,
      slug
    };
    
    data.products.push(newProduct);
    
    // Only write in development
    if (process.env.NODE_ENV === 'development') {
      await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
    }
    
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const data = JSON.parse(await fs.readFile(dbPath, 'utf-8'));
    const initialLength = data.products.length;
    data.products = data.products.filter((p: ProductDB) => p.id !== id);
    
    if (data.products.length < initialLength) {
      // Only write in development
      if (process.env.NODE_ENV === 'development') {
        await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

// Get random products for home page
export async function getRandomProducts(count: number): Promise<ProductDB[]> {
  const products = await getProducts();
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<ProductDB[]> {
  const products = await getProducts();
  return products.filter(p => p.category === category);
}