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

    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'conversion', {
        send_to: 'AW-17935100960/pDqaCOj18_sbEKDYj-hC',
        value: 299,
        currency: 'PLN',
        transaction_id: transactionId,
      });
    }
  }, []);

  return <TyTemplateMirko content={content} />;
}
