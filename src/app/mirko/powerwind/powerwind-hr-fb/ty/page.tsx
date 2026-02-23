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

    const eventId = `${orderNumber}_${Date.now()}`;

    const w = window as any;
    if (typeof w.fbq === 'function') {
      w.fbq('track', 'Purchase', {
        value: 69,
        currency: 'EUR',
      }, { eventID: eventId });
    }
  }, []);

  return <TyTemplateMirko content={content} />;
}
