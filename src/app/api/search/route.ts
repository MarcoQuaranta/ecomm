import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    // Get all products from database
    const allProducts = await getProducts();
    
    // Filter by search query
    let results = allProducts;
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Filter by category
    if (category && category !== 'tutti') {
      results = results.filter(product => product.category === category);
    }
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json({ error: 'Failed to search products' }, { status: 500 });
  }
}