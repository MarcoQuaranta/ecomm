// Categorie dinamiche per il catalogo
import { getFilteredProducts, type Product } from './products';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
}

// Nuove categorie dinamiche
export const categories: Category[] = [
  {
    id: 'offerte',
    name: 'Offerte',
    slug: 'offerte',
    description: 'Tutti i prodotti in offerta speciale',
    image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#ef4444'
  },
  {
    id: 'ultimi-arrivi',
    name: 'Ultimi Arrivi',
    slug: 'ultimi-arrivi',
    description: 'Le ultime novità appena arrivate',
    image: 'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#3b82f6'
  },
  {
    id: 'bestseller',
    name: 'BestSeller',
    slug: 'bestseller',
    description: 'I prodotti più venduti e amati dai clienti',
    image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#f59e0b'
  },
  {
    id: 'scelti-da-noi',
    name: 'Scelti da Noi',
    slug: 'scelti-da-noi',
    description: 'La nostra selezione dei migliori prodotti',
    image: 'https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    color: '#8b5cf6'
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

// Fisher-Yates shuffle per randomizzazione vera
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Conta i prodotti per categoria
export function getProductCountByCategory(categorySlug: string): number {
  const products = getProductsByCategory(categorySlug);
  return products.length;
}

// Ottieni prodotti per categoria dinamica
export function getProductsByCategory(categorySlug: string): Product[] {
  const allProducts = getFilteredProducts();

  switch (categorySlug) {
    case 'offerte':
      // Tutti i prodotti
      return allProducts;

    case 'ultimi-arrivi':
      // Ultimi 4 prodotti (in ordine inverso di come sono stati aggiunti)
      return allProducts.slice(-4).reverse();

    case 'bestseller':
      // 4 prodotti random (davvero random con shuffle)
      return shuffleArray(allProducts).slice(0, 4);

    case 'scelti-da-noi':
      // 4 prodotti random diversi (davvero random con shuffle)
      return shuffleArray(allProducts).slice(0, 4);

    default:
      // Fallback: cerca per categoria prodotto originale
      return allProducts.filter((p: Product) => p.category === categorySlug);
  }
}
