// Questo file ora fa da bridge tra il vecchio sistema e PostgreSQL
// Mantiene la compatibilità con il codice esistente

import {
  getProducts as getProductsDB,
  getProductBySlug as getProductBySlugDB,
  getProductById as getProductByIdDB,
  updateProduct as updateProductDB,
  addProduct as addProductDB,
  deleteProduct as deleteProductDB,
  getRandomProducts as getRandomProductsDB,
  getProductsByCategory as getProductsByCategoryDB,
  getCategories as getCategoriesDB,
  getCategoryBySlug as getCategoryBySlugDB,
  addCategory as addCategoryDB,
  updateCategory as updateCategoryDB,
  deleteCategory as deleteCategoryDB,
  getColorScheme as getColorSchemeDB,
  updateColorScheme as updateColorSchemeDB,
  initDatabase,
  type ColorScheme
} from './db-postgres';

export interface ProductDB {
  id: string;
  slug: string;
  name: string;
  description?: string;
  pageContent?: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  inStock: boolean;
  shippingCost: number;
  freeShipping: boolean;
}

// Converte da snake_case (DB) a camelCase (app)
function convertFromDB(product: any): ProductDB {
  if (!product) return product;
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    pageContent: product.page_content || product.pageContent,
    price: product.price,
    originalPrice: product.original_price || product.originalPrice,
    discount: product.discount,
    image: product.image,
    category: product.category,
    inStock: product.in_stock !== undefined ? product.in_stock : product.inStock,
    shippingCost: product.shipping_cost !== undefined ? product.shipping_cost : product.shippingCost,
    freeShipping: product.free_shipping !== undefined ? product.free_shipping : product.freeShipping
  };
}

// Converte da camelCase (app) a snake_case (DB)
function convertToDB(product: any): any {
  if (!product) return product;
  return {
    name: product.name,
    description: product.description,
    page_content: product.pageContent || product.page_content,
    price: product.price,
    original_price: product.originalPrice || product.original_price,
    discount: product.discount,
    image: product.image,
    category: product.category,
    in_stock: product.inStock !== undefined ? product.inStock : product.in_stock,
    shipping_cost: product.shippingCost !== undefined ? product.shippingCost : product.shipping_cost,
    free_shipping: product.freeShipping !== undefined ? product.freeShipping : product.free_shipping
  };
}

export async function getProducts(): Promise<ProductDB[]> {
  try {
    await initDatabase(); // Assicura che la tabella esista
    const products = await getProductsDB();
    return products.map(convertFromDB);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductDB | undefined> {
  const product = await getProductBySlugDB(slug);
  return product ? convertFromDB(product) : undefined;
}

export async function getProductById(id: string): Promise<ProductDB | undefined> {
  const product = await getProductByIdDB(id);
  return product ? convertFromDB(product) : undefined;
}

export async function updateProduct(id: string, updates: Partial<ProductDB>): Promise<ProductDB | null> {
  const dbUpdates = convertToDB(updates);
  const result = await updateProductDB(id, dbUpdates);
  return result ? convertFromDB(result) : null;
}

export async function addProduct(product: Omit<ProductDB, 'id' | 'slug'>): Promise<ProductDB> {
  const dbProduct = convertToDB(product);
  const result = await addProductDB(dbProduct);
  return convertFromDB(result);
}

export async function deleteProduct(id: string): Promise<boolean> {
  return await deleteProductDB(id);
}

export async function getRandomProducts(count: number): Promise<ProductDB[]> {
  const products = await getRandomProductsDB(count);
  return products.map(convertFromDB);
}

export async function getProductsByCategory(category: string): Promise<ProductDB[]> {
  const products = await getProductsByCategoryDB(category);
  return products.map(convertFromDB);
}

// Esporta le funzioni per le categorie
export const getCategories = getCategoriesDB;
export const getCategoryBySlug = getCategoryBySlugDB;
export const addCategory = addCategoryDB;
export const updateCategory = updateCategoryDB;
export const deleteCategory = deleteCategoryDB;

// Esporta le funzioni per i colori
export const getColorScheme = getColorSchemeDB;
export const updateColorScheme = updateColorSchemeDB;
export type { ColorScheme };