import { NextResponse } from 'next/server';
import { getProducts, getRandomProducts, getCategories } from '@/lib/db';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    // Carica tutti i prodotti dal database
    const allProducts = await getProducts();
    
    // Prepara i dati per la homepage
    const featuredProducts = allProducts.slice(0, 6).map(product => ({
      id: product.id,
      slug: product.slug,
      title: product.name,
      price: `€${product.price.toFixed(2)}`,
      originalPrice: product.originalPrice ? `€${product.originalPrice.toFixed(2)}` : undefined,
      discount: product.discount ? `-${product.discount}%` : undefined,
      image: product.image || 'https://via.placeholder.com/400',
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50,
      badge: product.discount && product.discount > 35 ? 'Super Offerta' : undefined,
      prime: product.freeShipping || false
    }));

    // Seleziona 4 prodotti per le offerte lampo
    // Prima prova con prodotti con sconto alto, poi prendi qualsiasi prodotto
    let dealsProducts = allProducts.filter(product => product.discount && product.discount >= 20);
    
    // Se non ci sono abbastanza prodotti con sconto, prendi da tutti i prodotti
    if (dealsProducts.length < 4) {
      dealsProducts = allProducts;
    }
    
    // Mescola l'array e prendi i primi 4
    const shuffled = [...dealsProducts].sort(() => Math.random() - 0.5);
    
    const hotDeals = shuffled
      .slice(0, 4)
      .map(product => ({
        slug: product.slug,
        title: product.name,
        price: `€${product.price.toFixed(2)}`,
        originalPrice: `€${product.originalPrice?.toFixed(2)}`,
        image: product.image || 'https://via.placeholder.com/400',
        timeLeft: '23:45:12',
        savings: `€${((product.originalPrice || 0) - product.price).toFixed(2)}`,
        soldPercentage: Math.floor(Math.random() * 40) + 40
      }));

    // Ottieni categorie dal database con conteggio prodotti
    const categories = await getCategories();
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const { rows } = await sql`
          SELECT COUNT(*) as count FROM products WHERE category = ${category.slug}
        `;
        return {
          ...category,
          count: parseInt(rows[0].count)
        };
      })
    );

    return NextResponse.json({
      featuredProducts,
      hotDeals,
      categories: categoriesWithCount,
      totalProducts: allProducts.length
    });
  } catch (error) {
    console.error('Error fetching home data:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch home data',
      featuredProducts: [],
      hotDeals: [],
      categories: [],
      totalProducts: 0
    }, { status: 500 });
  }
}