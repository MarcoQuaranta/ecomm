'use client';

import { useEffect } from 'react';
import TyTemplateMirko from '../TyTemplateMirko';
import content from '../content.json';

export default function TyPage() {
  useEffect(() => {
    const orderNumber = sessionStorage.getItem('orderNumber') || '';
    const alreadyFired = sessionStorage.getItem(`cf_${orderNumber}`);
    if (alreadyFired) return;

    // Google Ads gtag.js
    const w = window as any;
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16697430619';
    document.head.appendChild(gtagScript);

    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    w.gtag('config', 'AW-16697430619');

    gtagScript.onload = () => {
      w.gtag('event', 'conversion', {
        send_to: 'AW-16697430619/pX2oCOToov8bENuk-pk-',
        value: 2099,
        currency: 'CZK',
        transaction_id: orderNumber,
      });
    };

    if (orderNumber) {
      sessionStorage.setItem(`cf_${orderNumber}`, '1');
    }
  }, []);

  return <TyTemplateMirko content={content} />;
}
