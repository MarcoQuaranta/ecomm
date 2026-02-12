// Sistema prodotti completamente automatico
// I prodotti vengono scansionati e estratti automaticamente dalle landing pages
// Non serve definire nulla manualmente!

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  category: string;
  inStock: boolean;
  freeShipping: boolean;
  landingPath: string;
  source: 'facebook' | 'google';
  nation: string;
}

interface ProductInfo {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  images: string[];
}

// Importa dati generati automaticamente dallo script di scansione
import landingFoldersJson from './landing-folders.json';
import productsDataJson from './products-data.json';

const landingFolders: string[] = landingFoldersJson;
const productInfo: Record<string, ProductInfo> = productsDataJson as Record<string, ProductInfo>;

// Funzione per estrarre info dalla cartella landing
function parseLandingFolder(folder: string): {
  source: 'facebook' | 'google';
  productKey: string;
  nation: string;
  isUnc: boolean;
} | null {
  // Pattern: (fb|gg)-nomeprodotto-nazione(-unc)?
  const match = folder.match(/^(fb|gg)-(.+?)-([a-z]{2})(-unc)?$/);
  if (!match) return null;

  return {
    source: match[1] === 'fb' ? 'facebook' : 'google',
    productKey: match[2],
    nation: match[3],
    isUnc: !!match[4]
  };
}

// Genera prodotti dalle cartelle landing
function generateProducts(): Product[] {
  const products: Product[] = [];

  for (const folder of landingFolders) {
    const parsed = parseLandingFolder(folder);
    if (!parsed) continue;

    const info = productInfo[parsed.productKey];
    if (!info) {
      console.warn(`Prodotto non trovato per: ${parsed.productKey} (${folder})`);
      continue;
    }

    // Salta le versioni -unc per la visualizzazione nel catalogo
    if (parsed.isUnc) continue;

    const discount = Math.round((1 - info.price / info.originalPrice) * 100);

    products.push({
      id: folder,
      slug: `${parsed.productKey}-${parsed.nation}`,
      name: info.name,
      description: info.description,
      price: info.price,
      originalPrice: info.originalPrice,
      discount,
      image: info.image,
      images: info.images,
      category: info.category,
      inStock: true,
      freeShipping: true,
      landingPath: `/${folder}`,
      source: parsed.source,
      nation: parsed.nation
    });
  }

  return products;
}

// Genera la lista prodotti
export const landingProducts: Product[] = generateProducts();

// Estrae il nome base del prodotto (senza prefisso fb-/gg- e senza sigla nazione)
export function getProductBaseName(id: string): string {
  let name = id.replace(/^(fb|gg)-/, '');
  name = name.replace(/-unc$/, '');
  name = name.replace(/-[a-z]{2}$/, '');
  return name;
}

// Filtra prodotti per mostrare solo uno per nome base
export function getFilteredProducts(countryCode: string = 'it'): Product[] {
  const grouped: Record<string, Product[]> = {};

  for (const product of landingProducts) {
    const baseName = getProductBaseName(product.id);
    if (!grouped[baseName]) {
      grouped[baseName] = [];
    }
    grouped[baseName].push(product);
  }

  const result: Product[] = [];

  for (const baseName in grouped) {
    const products = grouped[baseName];
    let selected: Product | undefined;

    // Priorità: 1) gg- con nazione utente, 2) fb- con nazione utente, 3) gg- qualsiasi, 4) fb- qualsiasi
    selected = products.find(p => p.source === 'google' && p.nation === countryCode);
    if (!selected) selected = products.find(p => p.source === 'facebook' && p.nation === countryCode);
    if (!selected) selected = products.find(p => p.source === 'google');
    if (!selected) selected = products.find(p => p.source === 'facebook');
    if (!selected && products.length > 0) selected = products[0];

    if (selected) result.push(selected);
  }

  return result;
}

// Funzioni helper
export function getAllProducts(): Product[] {
  return landingProducts;
}

export function getDisplayProducts(countryCode: string = 'it'): Product[] {
  return getFilteredProducts(countryCode);
}

export function getProductBySlug(slug: string): Product | undefined {
  return landingProducts.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return landingProducts.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return getFilteredProducts().filter(p => p.category === category);
}

export function getProductsBySource(source: 'facebook' | 'google'): Product[] {
  return landingProducts.filter(p => p.source === source);
}

export function getFeaturedProducts(count: number = 6): Product[] {
  return getFilteredProducts().slice(0, count);
}

export function getDiscountedProducts(countryCode: string = 'it', count: number = 4): Product[] {
  return getFilteredProducts(countryCode)
    .filter(p => p.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, count);
}

// Categorie statiche
export const categories = [
  {
    slug: 'giardinaggio',
    name: 'Giardinaggio',
    image: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#22c55e'
  },
  {
    slug: 'utensili',
    name: 'Utensili',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#f97316'
  },
  {
    slug: 'per-la-casa',
    name: 'Per la Casa',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#3b82f6'
  },
  {
    slug: 'elettronica',
    name: 'Elettronica',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#8b5cf6'
  }
];

export function getAllCategories() {
  return categories;
}

export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug);
}
