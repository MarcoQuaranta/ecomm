import { NextResponse } from 'next/server';
import { 
  getGeneralStats, 
  getProductStats, 
  getVisitsChart,
  getTopProductsByViews,
  getTopProductsBySales,
  getRecentOrders
} from '@/lib/analytics';
import {
  getAverageSessionDuration,
  getAverageTimeToPurchase,
  getFormAbandonmentStats,
  getDeviceStats
} from '@/lib/analytics-advanced';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'general':
        const generalStats = await getGeneralStats();
        return NextResponse.json(generalStats);
      
      case 'products':
        const productStats = await getProductStats();
        return NextResponse.json(productStats);
      
      case 'visits-chart':
        const visitsChart = await getVisitsChart();
        return NextResponse.json(visitsChart);
      
      case 'top-views':
        const topViews = await getTopProductsByViews(5);
        return NextResponse.json(topViews);
      
      case 'top-sales':
        const topSales = await getTopProductsBySales(5);
        return NextResponse.json(topSales);
      
      case 'recent-orders':
        const recentOrders = await getRecentOrders(10);
        return NextResponse.json(recentOrders);
      
      case 'session-duration':
        const sessionDuration = await getAverageSessionDuration();
        return NextResponse.json(sessionDuration);
      
      case 'time-to-purchase':
        const timeToPurchase = await getAverageTimeToPurchase();
        return NextResponse.json(timeToPurchase);
      
      case 'form-abandonment':
        const formAbandonment = await getFormAbandonmentStats();
        return NextResponse.json(formAbandonment);
      
      case 'device-stats':
        const deviceStats = await getDeviceStats();
        return NextResponse.json(deviceStats);
      
      default:
        // Ritorna tutto
        const [general, products, chart, topV, topS, orders] = await Promise.all([
          getGeneralStats(),
          getProductStats(),
          getVisitsChart(),
          getTopProductsByViews(5),
          getTopProductsBySales(5),
          getRecentOrders(10)
        ]);
        
        return NextResponse.json({
          general,
          products,
          chart,
          topViews: topV,
          topSales: topS,
          recentOrders: orders
        });
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}