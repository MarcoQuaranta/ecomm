import { Product } from './products';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  color: string;
  productIds: string[];
}

export const categories: Category[] = [
  {
    id: 'giardinaggio',
    name: 'Giardinaggio',
    slug: 'giardinaggio',
    description: 'Attrezzature professionali per la cura del giardino e degli spazi esterni',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    color: 'from-green-500 to-green-600',
    productIds: ['soffiatore-1', 'decespugliatore-1', 'motosega-1', 'cesoia-1']
  },
  {
    id: 'utensili',
    name: 'Utensili',
    slug: 'utensili',
    description: 'Utensili elettrici e manuali per ogni tipo di lavoro',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-blue-600',
    productIds: ['smerigliatrice-1']
  },
  {
    id: 'per-la-casa',
    name: 'Per la casa',
    slug: 'per-la-casa',
    description: 'Tutto per il comfort e il benessere della tua casa',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    color: 'from-orange-500 to-orange-600',
    productIds: ['condizionatore-1', 'soffiatore-1'] // soffiatore anche per pulizia interni
  },
  {
    id: 'elettronica',
    name: 'Elettronica',
    slug: 'elettronica',
    description: 'Dispositivi elettronici di ultima generazione',
    image: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=400&h=300&fit=crop',
    color: 'from-purple-500 to-purple-600',
    productIds: ['drone-1']
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(category => category.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(category => category.id === id);
}

export function getProductIdsByCategory(categorySlug: string): string[] {
  const category = getCategoryBySlug(categorySlug);
  return category ? category.productIds : [];
}

export function getCategoriesForProduct(productId: string): Category[] {
  return categories.filter(category => category.productIds.includes(productId));
}

export function getCategoryCount(categoryId: string): number {
  const category = getCategoryById(categoryId);
  return category ? category.productIds.length : 0;
}