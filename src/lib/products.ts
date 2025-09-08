// Questo file è deprecato - usa direttamente le funzioni da db.ts
// Manteniamo questo file temporaneamente per compatibilità
import { getProducts as getProductsFromDB } from './db';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images?: string[];
  image?: string; // per compatibilità con JSON
  category: string;
  subcategory?: string;
  brand?: string;
  features?: string[];
  specifications?: Record<string, string>;
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviews?: number;
  tags?: string[];
  landingPageComponent?: string;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
  shipping?: {
    freeShipping: boolean;
    estimatedDays: number;
    cashOnDelivery: boolean;
  };
  shippingCost?: number;
  freeShipping?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Carichiamo i prodotti dal database in modo sincrono per compatibilità
// NOTA: Questo approccio non è ideale ma mantiene la compatibilità
let cachedProducts: Product[] = [];

// Funzione per inizializzare i prodotti (chiamata server-side)
export async function initProducts() {
  const dbProducts = await getProductsFromDB();
  cachedProducts = dbProducts.map(p => ({
  ...p,
  description: p.name + ' - Prodotto professionale di alta qualità',
  shortDescription: 'Prodotto di qualità superiore',
  images: [p.image || 'https://via.placeholder.com/400'],
  features: ['Alta qualità', 'Durevole', 'Professionale'],
  tags: [p.category, 'professionale'],
  shipping: {
    freeShipping: p.freeShipping || false,
    estimatedDays: 3,
    cashOnDelivery: true
  },
  rating: 4.5,
  // Uso un numero fisso basato sull'ID per evitare hydration mismatch
  reviews: parseInt(p.id.replace(/\D/g, '').slice(-3)) || 150,
  landingPageComponent: p.slug || '',
  seo: {
    title: p.name,
    description: p.name + ' al miglior prezzo',
    keywords: [p.category, p.name.toLowerCase()]
  },
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
}));
  return cachedProducts;
}

// Export dei prodotti cached (per componenti client)
export const products: Product[] = cachedProducts;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getAvailableProducts(): Product[] {
  return products.filter(product => product.inStock);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    (product.description && product.description.toLowerCase().includes(lowerQuery)) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
}

// Funzioni per home page
export function getRandomProducts(count: number): Product[] {
  const availableProducts = products.filter(p => p.inStock);
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getDiscountedProducts(count: number): Product[] {
  const discountedProducts = products.filter(p => p.discount && p.discount > 0 && p.inStock);
  const shuffled = [...discountedProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}