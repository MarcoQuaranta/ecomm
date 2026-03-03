'use client';

import { useEffect } from 'react';
import TyTemplateMirko from '../TyTemplateMirko';
import content from '../content.json';

export default function TyPage() {
  useEffect(() => {
    const orderNumber = sessionStorage.getItem('orderNumber') || '';
    const key = `cf_${orderNumber}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    const transactionId = `${orderNumber}_${Date.now()}`;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16697430619';
    document.head.appendChild(script);

    script.onload = () => {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag('js', new Date());
      w.gtag('config', 'AW-16697430619');

      w.gtag('event', 'conversion', {
        send_to: 'AW-16697430619/Tuh1CNPsov8bENuk-pk-',
        value: 79.99,
        currency: 'EUR',
        transaction_id: transactionId,
      });
    };
  }, []);

  return <TyTemplateMirko content={content} />;
}
