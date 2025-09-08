import { sql } from '@vercel/postgres';

// Traccia una visita al sito
export async function trackSiteVisit(data: {
  ip: string;
  userAgent?: string;
  pageUrl?: string;
  referrer?: string;
}) {
  try {
    await sql`
      INSERT INTO site_visits (ip_address, user_agent, page_url, referrer)
      VALUES (${data.ip}, ${data.userAgent || ''}, ${data.pageUrl || ''}, ${data.referrer || ''})
      ON CONFLICT (ip_address) DO NOTHING
    `;
    return true;
  } catch (error) {
    console.error('Error tracking site visit:', error);
    return false;
  }
}

// Traccia una visualizzazione prodotto
export async function trackProductView(productId: string, productSlug: string, ip: string) {
  try {
    await sql`
      INSERT INTO product_views (product_id, product_slug, ip_address)
      VALUES (${productId}, ${productSlug}, ${ip})
      ON CONFLICT (product_id, ip_address) DO UPDATE SET viewed_at = CURRENT_TIMESTAMP
    `;
    return true;
  } catch (error) {
    console.error('Error tracking product view:', error);
    return false;
  }
}

// Registra un ordine
export async function createOrder(orderData: {
  orderNumber: string;
  productId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  ip?: string;
}) {
  try {
    await sql`
      INSERT INTO orders (
        order_number, product_id, product_name, product_price,
        customer_name, customer_email, customer_phone, customer_address,
        ip_address, status
      ) VALUES (
        ${orderData.orderNumber}, ${orderData.productId}, ${orderData.productName}, ${orderData.productPrice},
        ${orderData.customerName}, ${orderData.customerEmail}, ${orderData.customerPhone}, ${orderData.customerAddress},
        ${orderData.ip || ''}, 'pending'
      )
    `;
    return true;
  } catch (error) {
    console.error('Error creating order:', error);
    return false;
  }
}

// Ottieni statistiche generali
export async function getGeneralStats() {
  try {
    // Visite uniche al sito
    const visitsResult = await sql`SELECT COUNT(DISTINCT ip_address) as total FROM site_visits`;
    const totalVisits = parseInt(visitsResult.rows[0]?.total || '0');

    // Totale ordini
    const ordersResult = await sql`SELECT COUNT(*) as total FROM orders`;
    const totalOrders = parseInt(ordersResult.rows[0]?.total || '0');

    // Tasso di conversione
    const conversionRate = totalVisits > 0 ? ((totalOrders / totalVisits) * 100).toFixed(2) : '0';

    // Visite oggi
    const todayVisitsResult = await sql`
      SELECT COUNT(DISTINCT ip_address) as total 
      FROM site_visits 
      WHERE DATE(created_at) = CURRENT_DATE
    `;
    const todayVisits = parseInt(todayVisitsResult.rows[0]?.total || '0');

    // Ordini oggi
    const todayOrdersResult = await sql`
      SELECT COUNT(*) as total 
      FROM orders 
      WHERE DATE(created_at) = CURRENT_DATE
    `;
    const todayOrders = parseInt(todayOrdersResult.rows[0]?.total || '0');

    // Fatturato totale
    const revenueResult = await sql`
      SELECT COALESCE(SUM(product_price), 0) as total 
      FROM orders 
      WHERE status != 'cancelled'
    `;
    const totalRevenue = parseFloat(revenueResult.rows[0]?.total || '0');

    return {
      totalVisits,
      totalOrders,
      conversionRate,
      todayVisits,
      todayOrders,
      totalRevenue
    };
  } catch (error) {
    console.error('Error getting general stats:', error);
    return {
      totalVisits: 0,
      totalOrders: 0,
      conversionRate: '0',
      todayVisits: 0,
      todayOrders: 0,
      totalRevenue: 0
    };
  }
}

// Ottieni statistiche per prodotto
export async function getProductStats() {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        p.image,
        COALESCE(v.view_count, 0) as views,
        COALESCE(o.order_count, 0) as orders,
        COALESCE(o.revenue, 0) as revenue,
        CASE 
          WHEN COALESCE(v.view_count, 0) > 0 
          THEN ROUND((COALESCE(o.order_count, 0)::numeric / v.view_count) * 100, 2)
          ELSE 0 
        END as conversion_rate
      FROM products p
      LEFT JOIN (
        SELECT product_id, COUNT(DISTINCT ip_address) as view_count
        FROM product_views
        GROUP BY product_id
      ) v ON p.id = v.product_id
      LEFT JOIN (
        SELECT product_id, COUNT(*) as order_count, SUM(product_price) as revenue
        FROM orders
        WHERE status != 'cancelled'
        GROUP BY product_id
      ) o ON p.id = o.product_id
      ORDER BY COALESCE(v.view_count, 0) DESC
    `;

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      price: parseFloat(row.price),
      image: row.image,
      views: parseInt(row.views),
      orders: parseInt(row.orders),
      revenue: parseFloat(row.revenue),
      conversionRate: parseFloat(row.conversion_rate)
    }));
  } catch (error) {
    console.error('Error getting product stats:', error);
    return [];
  }
}

// Ottieni ordini recenti
export async function getRecentOrders(limit: number = 10) {
  try {
    const result = await sql`
      SELECT * FROM orders 
      ORDER BY created_at DESC 
      LIMIT ${limit}
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting recent orders:', error);
    return [];
  }
}

// Ottieni grafico visite ultimi 7 giorni
export async function getVisitsChart() {
  try {
    const result = await sql`
      SELECT 
        DATE(created_at) as date,
        COUNT(DISTINCT ip_address) as visits
      FROM site_visits
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;
    
    return result.rows.map(row => ({
      date: row.date,
      visits: parseInt(row.visits)
    }));
  } catch (error) {
    console.error('Error getting visits chart:', error);
    return [];
  }
}

// Ottieni top prodotti per visualizzazioni
export async function getTopProductsByViews(limit: number = 5) {
  try {
    const result = await sql`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.image,
        COUNT(DISTINCT pv.ip_address) as views
      FROM product_views pv
      JOIN products p ON p.id = pv.product_id
      GROUP BY p.id, p.name, p.slug, p.image
      ORDER BY views DESC
      LIMIT ${limit}
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      image: row.image,
      views: parseInt(row.views)
    }));
  } catch (error) {
    console.error('Error getting top products by views:', error);
    return [];
  }
}

// Ottieni top prodotti per vendite
export async function getTopProductsBySales(limit: number = 5) {
  try {
    const result = await sql`
      SELECT 
        product_id,
        product_name,
        COUNT(*) as sales,
        SUM(product_price) as revenue
      FROM orders
      WHERE status != 'cancelled'
      GROUP BY product_id, product_name
      ORDER BY sales DESC
      LIMIT ${limit}
    `;
    
    return result.rows.map(row => ({
      productId: row.product_id,
      productName: row.product_name,
      sales: parseInt(row.sales),
      revenue: parseFloat(row.revenue)
    }));
  } catch (error) {
    console.error('Error getting top products by sales:', error);
    return [];
  }
}