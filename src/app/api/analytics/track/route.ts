import { NextRequest, NextResponse } from 'next/server';
import { trackSiteVisit, trackProductView } from '@/lib/analytics';
import { 
  getDeviceType, 
  trackSession, 
  updateSessionDuration,
  trackEvent,
  trackFormOpen,
  trackFormClose 
} from '@/lib/analytics-advanced';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type, sessionId, productId, productSlug, pageUrl, screenWidth, screenHeight } = data;
    
    // Ottieni l'IP dall'header o usa un fallback
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';
    const referrer = request.headers.get('referer') || '';

    // Determina device type
    const deviceType = getDeviceType(userAgent, screenWidth);

    switch (type) {
      case 'site_visit':
        // Traccia sia visita che sessione
        await Promise.all([
          trackSiteVisit({
            ip,
            userAgent,
            pageUrl: pageUrl || '',
            referrer
          }),
          sessionId && trackSession({
            sessionId,
            ip,
            userAgent,
            deviceType,
            screenWidth,
            screenHeight
          })
        ]);
        break;

      case 'update_session':
        if (sessionId) {
          await updateSessionDuration(sessionId);
        }
        break;

      case 'product_view':
        if (productId && productSlug) {
          await Promise.all([
            trackProductView(productId, productSlug, ip),
            sessionId && trackEvent({
              sessionId,
              ip,
              eventType: 'product_view',
              productId
            })
          ]);
        }
        break;

      case 'form_open':
        if (sessionId && productSlug) {
          await trackFormOpen({
            sessionId,
            ip,
            productId: productSlug,
            productSlug,
            deviceType
          });
        }
        break;

      case 'form_close':
        if (sessionId) {
          await trackFormClose(sessionId, data.completed || false);
        }
        break;

      case 'event':
        if (sessionId) {
          await trackEvent({
            sessionId,
            ip,
            eventType: data.eventType,
            eventData: data.eventData,
            productId: data.productId
          });
        }
        break;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}