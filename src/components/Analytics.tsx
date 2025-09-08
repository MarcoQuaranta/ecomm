'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export default function Analytics() {
  const pathname = usePathname();
  const sessionId = useRef<string>();
  const lastActivity = useRef<number>(Date.now());
  const activityInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Inizializza o recupera session ID
    let storedSessionId = sessionStorage.getItem('analytics_session_id');
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      sessionStorage.setItem('analytics_session_id', storedSessionId);
    }
    sessionId.current = storedSessionId;

    // Traccia visita al sito con device info
    const trackSiteVisit = async () => {
      try {
        const tracked = sessionStorage.getItem('site_visit_tracked');
        if (!tracked) {
          // Rileva device type
          const screenWidth = window.screen.width;
          const screenHeight = window.screen.height;
          
          await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'site_visit',
              sessionId: sessionId.current,
              pageUrl: window.location.href,
              screenWidth,
              screenHeight
            })
          });
          sessionStorage.setItem('site_visit_tracked', 'true');
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackSiteVisit();

    // Traccia attività utente per calcolare durata sessione
    const updateActivity = () => {
      lastActivity.current = Date.now();
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'update_session',
          sessionId: sessionId.current
        })
      }).catch(console.error);
    };

    // Aggiorna attività ogni 30 secondi se l'utente è attivo
    activityInterval.current = setInterval(() => {
      if (Date.now() - lastActivity.current < 60000) { // Se attivo negli ultimi 60 secondi
        updateActivity();
      }
    }, 30000);

    // Traccia eventi di attività
    const handleActivity = () => {
      lastActivity.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    return () => {
      if (activityInterval.current) {
        clearInterval(activityInterval.current);
      }
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, []);

  useEffect(() => {
    // Traccia visualizzazione prodotto
    const trackProductView = async () => {
      // Controlla se siamo su una pagina prodotto
      const productMatch = pathname.match(/^\/prodotti\/(.+)$/);
      if (productMatch) {
        const productSlug = productMatch[1];
        
        try {
          // Ottieni l'ID del prodotto dal DOM o da un'API
          // Per ora usiamo lo slug come ID temporaneo
          await fetch('/api/analytics/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'product_view',
              sessionId: sessionId.current,
              productId: productSlug, // In produzione, usa l'ID reale
              productSlug: productSlug
            })
          });
        } catch (error) {
          console.error('Error tracking product view:', error);
        }
      }
    };

    trackProductView();
  }, [pathname]);

  // Traccia quando viene aperto il form di checkout
  useEffect(() => {
    if (pathname.startsWith('/checkout/')) {
      const productSlug = pathname.split('/')[2];
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'form_open',
          sessionId: sessionId.current,
          productSlug
        })
      }).catch(console.error);

      // Traccia chiusura del form quando l'utente lascia la pagina
      return () => {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'form_close',
            sessionId: sessionId.current,
            completed: false
          })
        }).catch(console.error);
      };
    }
  }, [pathname]);

  return null; // Questo componente non renderizza nulla
}