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
    const n: any = w.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    w._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    const fbScript = document.createElement('script');
    fbScript.async = true;
    fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(fbScript, firstScript);
    else document.head.appendChild(fbScript);

    w.fbq('init', '1576025786901423');
    w.fbq('track', 'PageView');
    w.fbq('track', 'Purchase', {
      value: 429,
      currency: 'PLN',
    }, { eventID: eventId });
  }, []);

  return <TyTemplateMirko content={content} />;
}
