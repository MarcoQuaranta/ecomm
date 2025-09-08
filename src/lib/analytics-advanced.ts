import { sql } from '@vercel/postgres';

// Funzione per determinare il tipo di device
export function getDeviceType(userAgent: string, screenWidth?: number): string {
  const ua = userAgent.toLowerCase();
  
  if (/mobile|android|iphone|ipod/.test(ua)) {
    return 'mobile';
  } else if (/ipad|tablet/.test(ua) || (screenWidth && screenWidth >= 768 && screenWidth < 1024)) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

// Traccia sessione con device info
export async function trackSession(data: {
  sessionId: string;
  ip: string;
  userAgent: string;
  deviceType: string;
  screenWidth?: number;
  screenHeight?: number;
}) {
  try {
    await sql`
      INSERT INTO site_visits (
        session_id, ip_address, user_agent, device_type,
        screen_width, screen_height
      ) VALUES (
        ${data.sessionId}, ${data.ip}, ${data.userAgent}, ${data.deviceType},
        ${data.screenWidth || 0}, ${data.screenHeight || 0}
      )
      ON CONFLICT (ip_address) DO UPDATE SET
        session_id = ${data.sessionId},
        device_type = ${data.deviceType},
        last_activity = CURRENT_TIMESTAMP,
        session_duration = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - site_visits.created_at))
    `;
    return true;
  } catch (error) {
    console.error('Error tracking session:', error);
    return false;
  }
}

// Aggiorna durata sessione
export async function updateSessionDuration(sessionId: string) {
  try {
    await sql`
      UPDATE site_visits 
      SET 
        last_activity = CURRENT_TIMESTAMP,
        session_duration = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - created_at))
      WHERE session_id = ${sessionId}
    `;
    return true;
  } catch (error) {
    console.error('Error updating session:', error);
    return false;
  }
}

// Traccia evento generico
export async function trackEvent(data: {
  sessionId: string;
  ip: string;
  eventType: string;
  eventData?: any;
  productId?: string;
}) {
  try {
    await sql`
      INSERT INTO analytics_events (
        session_id, ip_address, event_type, event_data, product_id
      ) VALUES (
        ${data.sessionId}, ${data.ip}, ${data.eventType}, 
        ${JSON.stringify(data.eventData || {})}, ${data.productId || null}
      )
    `;
    return true;
  } catch (error) {
    console.error('Error tracking event:', error);
    return false;
  }
}

// Traccia apertura form checkout
export async function trackFormOpen(data: {
  sessionId: string;
  ip: string;
  productId: string;
  productSlug: string;
  deviceType: string;
}) {
  try {
    await sql`
      INSERT INTO form_abandonment (
        session_id, ip_address, product_id, product_slug, device_type
      ) VALUES (
        ${data.sessionId}, ${data.ip}, ${data.productId}, 
        ${data.productSlug}, ${data.deviceType}
      )
    `;
    return true;
  } catch (error) {
    console.error('Error tracking form open:', error);
    return false;
  }
}

// Traccia chiusura/completamento form
export async function trackFormClose(sessionId: string, completed: boolean) {
  try {
    await sql`
      UPDATE form_abandonment 
      SET 
        form_closed_at = CURRENT_TIMESTAMP,
        completed = ${completed},
        time_spent_seconds = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - form_opened_at))
      WHERE session_id = ${sessionId} 
      AND form_closed_at IS NULL
    `;
    return true;
  } catch (error) {
    console.error('Error tracking form close:', error);
    return false;
  }
}

// Ottieni statistiche tempo medio sul sito
export async function getAverageSessionDuration() {
  try {
    const result = await sql`
      SELECT 
        AVG(session_duration) as avg_duration,
        MAX(session_duration) as max_duration,
        MIN(session_duration) as min_duration,
        COUNT(*) as total_sessions
      FROM site_visits
      WHERE session_duration > 0
    `;
    
    const avgSeconds = parseFloat(result.rows[0]?.avg_duration || '0');
    const avgMinutes = Math.round(avgSeconds / 60);
    
    return {
      avgDurationSeconds: avgSeconds,
      avgDurationMinutes: avgMinutes,
      maxDuration: parseFloat(result.rows[0]?.max_duration || '0'),
      minDuration: parseFloat(result.rows[0]?.min_duration || '0'),
      totalSessions: parseInt(result.rows[0]?.total_sessions || '0')
    };
  } catch (error) {
    console.error('Error getting session duration:', error);
    return {
      avgDurationSeconds: 0,
      avgDurationMinutes: 0,
      maxDuration: 0,
      minDuration: 0,
      totalSessions: 0
    };
  }
}

// Ottieni tempo medio per acquisto
export async function getAverageTimeToPurchase() {
  try {
    const result = await sql`
      SELECT 
        AVG(EXTRACT(EPOCH FROM (o.created_at - v.created_at))) as avg_time,
        MIN(EXTRACT(EPOCH FROM (o.created_at - v.created_at))) as min_time,
        MAX(EXTRACT(EPOCH FROM (o.created_at - v.created_at))) as max_time,
        COUNT(*) as total_purchases
      FROM orders o
      JOIN site_visits v ON v.ip_address = o.ip_address
      WHERE o.status != 'cancelled'
    `;
    
    const avgSeconds = parseFloat(result.rows[0]?.avg_time || '0');
    const avgMinutes = Math.round(avgSeconds / 60);
    
    return {
      avgTimeSeconds: avgSeconds,
      avgTimeMinutes: avgMinutes,
      minTime: parseFloat(result.rows[0]?.min_time || '0'),
      maxTime: parseFloat(result.rows[0]?.max_time || '0'),
      totalPurchases: parseInt(result.rows[0]?.total_purchases || '0')
    };
  } catch (error) {
    console.error('Error getting time to purchase:', error);
    return {
      avgTimeSeconds: 0,
      avgTimeMinutes: 0,
      minTime: 0,
      maxTime: 0,
      totalPurchases: 0
    };
  }
}

// Ottieni statistiche form abandonment
export async function getFormAbandonmentStats() {
  try {
    const result = await sql`
      SELECT 
        COUNT(*) as total_opens,
        COUNT(CASE WHEN completed = true THEN 1 END) as completed,
        COUNT(CASE WHEN completed = false THEN 1 END) as abandoned,
        AVG(time_spent_seconds) as avg_time_spent
      FROM form_abandonment
    `;
    
    const totalOpens = parseInt(result.rows[0]?.total_opens || '0');
    const completed = parseInt(result.rows[0]?.completed || '0');
    const abandoned = parseInt(result.rows[0]?.abandoned || '0');
    
    return {
      totalOpens,
      completed,
      abandoned,
      abandonmentRate: totalOpens > 0 ? ((abandoned / totalOpens) * 100).toFixed(2) : '0',
      completionRate: totalOpens > 0 ? ((completed / totalOpens) * 100).toFixed(2) : '0',
      avgTimeSpent: parseFloat(result.rows[0]?.avg_time_spent || '0')
    };
  } catch (error) {
    console.error('Error getting form abandonment stats:', error);
    return {
      totalOpens: 0,
      completed: 0,
      abandoned: 0,
      abandonmentRate: '0',
      completionRate: '0',
      avgTimeSpent: 0
    };
  }
}

// Ottieni statistiche device per visite
export async function getDeviceStats() {
  try {
    const visitsResult = await sql`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM site_visits
      WHERE device_type IS NOT NULL
      GROUP BY device_type
    `;
    
    const ordersResult = await sql`
      SELECT 
        device_type,
        COUNT(*) as count
      FROM orders
      WHERE device_type IS NOT NULL
      GROUP BY device_type
    `;
    
    // Calcola totali
    const totalVisits = visitsResult.rows.reduce((sum, row) => sum + parseInt(row.count), 0);
    const totalOrders = ordersResult.rows.reduce((sum, row) => sum + parseInt(row.count), 0);
    
    // Prepara dati per grafici
    const visitsData = {
      desktop: 0,
      mobile: 0,
      tablet: 0
    };
    
    const ordersData = {
      desktop: 0,
      mobile: 0,
      tablet: 0
    };
    
    // Popola dati visite
    visitsResult.rows.forEach(row => {
      if (row.device_type in visitsData) {
        visitsData[row.device_type as keyof typeof visitsData] = parseInt(row.count);
      }
    });
    
    // Popola dati ordini
    ordersResult.rows.forEach(row => {
      if (row.device_type in ordersData) {
        ordersData[row.device_type as keyof typeof ordersData] = parseInt(row.count);
      }
    });
    
    // Calcola percentuali
    return {
      visits: {
        desktop: {
          count: visitsData.desktop,
          percentage: totalVisits > 0 ? ((visitsData.desktop / totalVisits) * 100).toFixed(1) : '0'
        },
        mobile: {
          count: visitsData.mobile,
          percentage: totalVisits > 0 ? ((visitsData.mobile / totalVisits) * 100).toFixed(1) : '0'
        },
        tablet: {
          count: visitsData.tablet,
          percentage: totalVisits > 0 ? ((visitsData.tablet / totalVisits) * 100).toFixed(1) : '0'
        },
        total: totalVisits
      },
      orders: {
        desktop: {
          count: ordersData.desktop,
          percentage: totalOrders > 0 ? ((ordersData.desktop / totalOrders) * 100).toFixed(1) : '0'
        },
        mobile: {
          count: ordersData.mobile,
          percentage: totalOrders > 0 ? ((ordersData.mobile / totalOrders) * 100).toFixed(1) : '0'
        },
        tablet: {
          count: ordersData.tablet,
          percentage: totalOrders > 0 ? ((ordersData.tablet / totalOrders) * 100).toFixed(1) : '0'
        },
        total: totalOrders
      }
    };
  } catch (error) {
    console.error('Error getting device stats:', error);
    return {
      visits: {
        desktop: { count: 0, percentage: '0' },
        mobile: { count: 0, percentage: '0' },
        tablet: { count: 0, percentage: '0' },
        total: 0
      },
      orders: {
        desktop: { count: 0, percentage: '0' },
        mobile: { count: 0, percentage: '0' },
        tablet: { count: 0, percentage: '0' },
        total: 0
      }
    };
  }
}