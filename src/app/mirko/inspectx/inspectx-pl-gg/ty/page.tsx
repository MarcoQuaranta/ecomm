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
    script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17935147002';
    document.head.appendChild(script);

    script.onload = () => {
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag('js', new Date());
      w.gtag('config', 'AW-17935147002');

      w.gtag('event', 'conversion', {
        send_to: 'AW-17935147002/rlpjCIqIzvcbEPq_kuhC',
        value: 249,
        currency: 'PLN',
        transaction_id: transactionId,
      });
    };
  }, []);

  return <TyTemplateMirko content={content} />;
}
