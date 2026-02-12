'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { FB_CONFIG } from '@/app/config/facebook';
import { generateEventId, trackPageView, trackViewContent, trackPurchase } from '@/app/lib/facebook/pixel';
import { getUserDataFromStorage, trackPurchaseCAPI } from '@/app/lib/facebook/capi';

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Aspetta che fbq sia disponibile
    const waitForFbq = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof window !== 'undefined' && typeof win.fbq === 'function') {
        clearInterval(waitForFbq);
        
        const pageViewEventId = generateEventId();

        // Traccia PageView su tutte le pagine
        trackPageView(pageViewEventId);
        console.log('[FB Pixel] PageView tracked on:', pathname);

        // Se siamo su una landing page (/fb-airwave-*), traccia ViewContent
        if (pathname.startsWith('/fb-airwave')) {
          const viewContentEventId = generateEventId();
          console.log('[FB Pixel] Landing page detected, tracking ViewContent...');
          trackViewContent({
            content_name: 'Airwave Air Conditioner',
            content_category: 'Electronics',
            content_type: 'product',
          }, viewContentEventId);
          console.log('[FB Pixel] ViewContent tracked');
        }

        // Se siamo su una thank you page (/ty/*), traccia Purchase
        if (pathname.startsWith('/ty')) {
          const purchaseEventId = generateEventId();
          console.log('[FB Pixel] Thank you page detected, tracking Purchase...');

          const userData = getUserDataFromStorage();

          const purchaseData = {
            content_name: 'Airwave Air Conditioner',
            content_category: 'Electronics',
            content_type: 'product',
            currency: 'EUR',
            value: 89.00,
          };

          // Traccia Purchase via Pixel (client-side)
          trackPurchase(purchaseData, purchaseEventId);

          // Traccia Purchase via CAPI (server-side via N8N)
          trackPurchaseCAPI(purchaseEventId, userData, purchaseData).then((success) => {
            if (success) {
              console.log('[FB CAPI] Purchase event sent successfully');
            } else {
              console.error('[FB CAPI] Failed to send Purchase event');
            }
          });
        }
      }
    }, 100);

    // Cleanup dopo 10 secondi se fbq non viene mai caricato
    const timeout = setTimeout(() => clearInterval(waitForFbq), 10000);

    return () => {
      clearInterval(waitForFbq);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_CONFIG.PIXEL_ID}');
            console.log('[FB Pixel] Initialized with ID: ${FB_CONFIG.PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_CONFIG.PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
