'use client';

import React from 'react';

interface ProductPageContentProps {
  content: string | undefined;
  productName: string;
  price: number;
  discount?: number;
}

export default function ProductPageContent({ content, productName, price, discount }: ProductPageContentProps) {
  if (!content) return null;

  // Funzione per parsare e renderizzare il contenuto in modo sicuro
  const renderContent = () => {
    try {
      // Sostituisci alcune variabili placeholder che l'utente può usare
      const processedContent = content
        .replace(/\{\{productName\}\}/g, productName)
        .replace(/\{\{price\}\}/g, `€${price.toFixed(2)}`)
        .replace(/\{\{discount\}\}/g, discount ? `${discount}%` : '0%');

      // Per sicurezza, renderizziamo il contenuto come HTML
      // In produzione potresti voler usare una libreria come DOMPurify per sanitizzare l'HTML
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: processedContent }}
          className="product-custom-content"
        />
      );
    } catch (error) {
      console.error('Errore nel rendering del contenuto personalizzato:', error);
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded">
          Errore nel caricamento del contenuto personalizzato
        </div>
      );
    }
  };

  return (
    <div className="py-8">
      {renderContent()}
    </div>
  );
}