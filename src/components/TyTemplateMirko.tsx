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
  const firstSlide = gallery?.slides?.[0];

  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const data = sessionStorage.getItem('orderData');
    setOrderData(data ? JSON.parse(data) : { name: '', phone: '', address: '' });
    setOrderNumber(sessionStorage.getItem('orderNumber') || '');
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
          <span className="ty-order-number">{ty?.orderNumberLabel || 'N° ordine:'} {orderNumber}</span>
        </div>

        {/* Riepilogo Ordine */}
        <div className="ty-section">
          <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>{ty?.summaryTitle || 'Riepilogo Ordine'}</h3>
          <div className="ty-product-row">
            {firstSlide && (
              <div className="ty-thumb">
                <Image src={firstSlide.src} alt={firstSlide.alt || ''} width={80} height={80} quality={70} />
              </div>
            )}
            <div className="ty-product-info">
              <strong>{priceBox?.productName || 'Prodotto'}</strong>
              <span>{ty?.accessoriesLabel || '+ Accessori inclusi'}</span>
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
            <span>{ty?.totalLabel || 'TOTALE DA PAGARE'}</span>
            <span>{currencySymbol}{totalPrice}</span>
          </div>
          <div className="ty-payment-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>{ty?.paymentNote || 'Pagamento in contanti al corriere — nessun anticipo'}
          </div>
        </div>

        {/* Dati Utente */}
        {(orderData.name || orderData.phone || orderData.address) && (
          <div className="ty-section">
            <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>{ty?.yourDataTitle || 'I Tuoi Dati'}</h3>
            <div className="ty-data-grid">
              {orderData.name && (
                <div className="ty-data-row">
                  <span className="ty-data-label">{ty?.nameLabel || 'Nome'}</span>
                  <span className="ty-data-value">{orderData.name}</span>
                </div>
              )}
              {orderData.phone && (
                <div className="ty-data-row">
                  <span className="ty-data-label">{ty?.phoneLabel || 'Telefono'}</span>
                  <span className="ty-data-value">{orderData.phone}</span>
                </div>
              )}
              {orderData.address && (
                <div className="ty-data-row">
                  <span className="ty-data-label">{ty?.addressLabel || 'Indirizzo'}</span>
                  <span className="ty-data-value">{orderData.address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cosa succede ora */}
        <div className="ty-section">
          <h3><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>{ty?.nextStepsTitle || 'Cosa succede ora?'}</h3>
          <p className="ty-next-steps">
            {ty?.message || 'Sarai contattato telefonicamente o tramite WhatsApp per confermare l\'ordine e organizzare la consegna.'}
          </p>
          <div className="ty-steps-list">
            {(ty?.steps || [
              'Riceverai una chiamata o un messaggio WhatsApp di conferma',
              'Il pacco verrà spedito in 24/48h',
              'Paghi in contanti al corriere alla consegna'
            ]).map((step: string, i: number) => (
              <div key={i} className="ty-step">
                <span className="ty-step-num">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="ty-footer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg>{ty?.footerText || 'Garanzia 2 Anni · 30 Giorni di Reso · Assistenza Dedicata'}
        </div>
      </div>
    </div>
  );
}
