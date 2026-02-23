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

    // Google Ads Conversion
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'conversion', {
        send_to: 'AW-17935147002/2HnoCOeazvcbEPq_kuhC',
        value: 69,
        currency: 'EUR',
        transaction_id: transactionId,
      });
    }
  }, []);

  return <TyTemplateMirko content={content} />;
}
