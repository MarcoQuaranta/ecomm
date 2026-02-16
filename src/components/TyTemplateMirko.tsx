'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '@/styles/landing-mirko.css';

interface TyProps {
  content?: any;
}

export default function TyTemplateMirko({ content = {} }: TyProps) {
  const ty = content?.ty;
  const pricing = content?.pricing;
  const priceBox = content?.priceBox;
  const gallery = content?.gallery;
  const orderForm = content?.orderForm;
  const tracking = content?.tracking;
  const firstSlide = gallery?.slides?.[0];

  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const data = sessionStorage.getItem('orderData');
    const parsed = data ? JSON.parse(data) : { name: '', phone: '', address: '' };
    setOrderData(parsed);
    setOrderNumber(`ORD-${Date.now().toString().slice(-8)}`);

    const w = window as any;

    // Google Ads Conversion
    if (tracking?.googleAdsId && tracking?.conversionLabel) {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${tracking.googleAdsId}`;
      document.head.appendChild(gtagScript);

      w.dataLayer = w.dataLayer || [];
      w.gtag = function () { w.dataLayer.push(arguments); };
      w.gtag('js', new Date());
      w.gtag('config', tracking.googleAdsId);
      w.gtag('event', 'conversion', {
        send_to: `${tracking.googleAdsId}/${tracking.conversionLabel}`,
        value: tracking.conversionValue || pricing?.currentPrice || 0,
        currency: tracking.conversionCurrency || pricing?.currency || 'EUR',
      });
    }

    // Meta Pixel Purchase
    if (tracking?.facebookPixelId) {
      w.fbq = w.fbq || function () { (w.fbq.q = w.fbq.q || []).push(arguments); };
      w.fbq.loaded = true;
      w.fbq.version = '2.0';
      w.fbq.queue = w.fbq.q || [];

      const fbScript = document.createElement('script');
      fbScript.async = true;
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(fbScript);

      w.fbq('init', tracking.facebookPixelId);
      w.fbq('track', 'PageView');
      w.fbq('track', 'Purchase', {
        value: tracking.conversionValue || pricing?.currentPrice || 0,
        currency: tracking.conversionCurrency || pricing?.currency || 'EUR',
      });
    }

    // Network API Call
    if (tracking?.network?.apiEndpoint) {
      const payload: any = {
        offerId: tracking.network.offerId || '',
        name: parsed.name || '',
        phone: parsed.phone || '',
        address: parsed.address || '',
        product: priceBox?.productName || '',
        price: pricing?.currentPrice || 0,
        currency: pricing?.currency || 'EUR',
        ...tracking.network.params,
      };

      fetch(tracking.network.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  }, []);

  const currencySymbol = pricing?.currencySymbol || '€';
  const totalPrice = pricing?.currentPrice?.toFixed(2)?.replace('.', ',') || '0,00';

  return (
    <div className="ty-mirko">
      <div className="ty-card">

        {/* Header */}
        <div className="ty-header">
          <div className="ty-check">✓</div>
          <h1>{ty?.title || 'Ordine Confermato!'}</h1>
          <p className="ty-subtitle">{ty?.subtitle || 'Il tuo ordine è stato ricevuto con successo.'}</p>
          <span className="ty-order-number">N° ordine: {orderNumber}</span>
        </div>

        {/* Riepilogo Ordine */}
        <div className="ty-section">
          <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>Riepilogo Ordine</h3>
          <div className="ty-product-row">
            {firstSlide && (
              <div className="ty-thumb">
                <Image src={firstSlide.src} alt={firstSlide.alt || ''} width={80} height={80} quality={70} />
              </div>
            )}
            <div className="ty-product-info">
              <strong>{priceBox?.productName || 'Prodotto'}</strong>
              <span>+ Accessori inclusi</span>
            </div>
            <div className="ty-product-price">
              {currencySymbol}{totalPrice}
            </div>
          </div>
          <div className="ty-summary-lines">
            {orderForm?.summaryLines?.map((line: any, i: number) => (
              <div key={i} className="ty-line">
                <span>{line.label}</span>
                <span className={line.type === 'free' ? 'ty-free' : ''}>{line.value}</span>
              </div>
            ))}
          </div>
          <div className="ty-total-row">
            <span>TOTALE DA PAGARE</span>
            <span>{currencySymbol}{totalPrice}</span>
          </div>
          <div className="ty-payment-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>Pagamento in contanti al corriere — nessun anticipo
          </div>
        </div>

        {/* Dati Utente */}
        {(orderData.name || orderData.phone || orderData.address) && (
          <div className="ty-section">
            <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>I Tuoi Dati</h3>
            <div className="ty-data-grid">
              {orderData.name && (
                <div className="ty-data-row">
                  <span className="ty-data-label">Nome</span>
                  <span className="ty-data-value">{orderData.name}</span>
                </div>
              )}
              {orderData.phone && (
                <div className="ty-data-row">
                  <span className="ty-data-label">Telefono</span>
                  <span className="ty-data-value">{orderData.phone}</span>
                </div>
              )}
              {orderData.address && (
                <div className="ty-data-row">
                  <span className="ty-data-label">Indirizzo</span>
                  <span className="ty-data-value">{orderData.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cosa succede ora */}
        <div className="ty-section">
          <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>Cosa succede ora?</h3>
          <p className="ty-next-steps">
            {ty?.message || 'Sarai contattato telefonicamente o tramite WhatsApp per confermare l\'ordine e organizzare la consegna.'}
          </p>
          <div className="ty-steps-list">
            <div className="ty-step">
              <span className="ty-step-num">1</span>
              <span>Riceverai una chiamata o un messaggio WhatsApp di conferma</span>
            </div>
            <div className="ty-step">
              <span className="ty-step-num">2</span>
              <span>Il pacco verrà spedito in 24/48h</span>
            </div>
            <div className="ty-step">
              <span className="ty-step-num">3</span>
              <span>Paghi in contanti al corriere alla consegna</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="ty-footer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>Garanzia 2 Anni · 30 Giorni di Reso · Assistenza Dedicata
        </div>
      </div>
    </div>
  );
}
