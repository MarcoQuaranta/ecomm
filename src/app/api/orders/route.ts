import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/analytics';
import { getProductBySlug } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { 
      productSlug,
      customerName,
      customerEmail, 
      customerPhone,
      customerAddress,
      customerCity,
      customerPostalCode,
      customerProvince
    } = data;

    // Ottieni informazioni prodotto
    const product = await getProductBySlug(productSlug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Genera numero ordine
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Ottieni IP
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    // Registra ordine nelle analytics
    const fullAddress = `${customerAddress}, ${customerCity} ${customerPostalCode} (${customerProvince})`;
    
    const success = await createOrder({
      orderNumber,
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      customerName: `${customerName}`,
      customerEmail,
      customerPhone,
      customerAddress: fullAddress,
      ip
    });

    if (success) {
      return NextResponse.json({ 
        success: true, 
        orderNumber,
        message: 'Ordine creato con successo'
      });
    } else {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}