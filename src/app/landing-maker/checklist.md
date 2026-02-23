# Checklist Validazione Landing

Prima di considerare completata una landing, verifica tutti i seguenti punti:

---

## FASE 0 - Raccolta Dati
- [ ] Nome prodotto raccolto
- [ ] Angle principale definito
- [ ] Dati aggiuntivi ricevuti (link, info, specifiche)

---

## FASE 1 - Analisi + Copy (Italiano)
- [ ] Punti di forza del prodotto identificati
- [ ] Target e pain points analizzati
- [ ] Obiezioni anticipate
- [ ] Headline create (2-3 varianti)
- [ ] Subheadline create
- [ ] Benefici (5-8)
- [ ] Features (5-6)
- [ ] Testimonianze (5) con nomi e citta italiane
- [ ] FAQ (5-8)
- [ ] CTA (2 varianti)
- [ ] Testi urgenza/scarsita
- [ ] Testi garanzia
- [ ] Testi form (label, placeholder, bottoni)
- [ ] TUTTI i testi visibili inclusi (nessun testo hardcodato nel componente)
- [ ] Copy approvato dall'utente

---

## FASE 2 - Creazione Cartelle

### Per ogni media buyer verificare:

#### Struttura
- [ ] Cartella `[prodotto]-ita/` creata
- [ ] `page.tsx` presente (Server Component, NO 'use client')
- [ ] `content.json` presente e compilato
- [ ] `ty/page.tsx` presente
- [ ] LandingTemplate copiato da riferimento (import CSS relativo)
- [ ] TyTemplate copiato da riferimento (import CSS relativo)
- [ ] CSS copiato nella cartella
- [ ] Cartella `public/images/[prodotto]/` creata

#### Content.json
- [ ] Tutti i campi copy compilati
- [ ] Path immagini corretti (`/images/[prodotto]/`)
- [ ] Prezzi inseriti
- [ ] SEO compilato
- [ ] Sezione TY compilata
- [ ] Tracking vuoto (sara compilato in Fase 4)
- [ ] Copy adattato allo stile del media buyer
- [ ] Nessun placeholder rimasto (`[nome]`, `TODO`, `XXX`)
- [ ] JSON valido

#### Approvazione
- [ ] Landing approvata dall'utente per ogni media buyer

---

## FASE 3 - Traduzioni

### Pre-traduzione
- [ ] Nazioni richieste dall'utente
- [ ] Prezzi per ogni nazione ricevuti (valuta locale)
- [ ] Piattaforme per nazione definite (GG / FB / entrambe)

### Per ogni nazione e media buyer verificare:

#### Struttura
- [ ] Cartella `[prodotto]-[lang]-[gg|fb]/` creata (con suffisso piattaforma)
- [ ] Se entrambe le piattaforme: varianti -gg e -fb create
- [ ] `page.tsx` copiato (Server Component, senza networkConfig per ora)
- [ ] `content.json` tradotto
- [ ] `ty/page.tsx` copiato (senza tracking per ora)
- [ ] LandingTemplate e TyTemplate copiati da riferimento (MAI modificati)
- [ ] CSS copiato nella cartella

#### Traduzione content.json
- [ ] Tutti i testi tradotti nella lingua corretta
- [ ] Nessun testo in italiano rimasto
- [ ] Testimonianze: nomi adattati al paese
- [ ] Testimonianze: citta adattate al paese
- [ ] Prezzi nella valuta locale corretta
- [ ] Simbolo valuta corretto
- [ ] Nome prodotto NON tradotto
- [ ] Link immagini invariati
- [ ] Chiavi JSON invariate (in inglese)
- [ ] JSON valido

---

## FASE 4 - Tracciamento

### Dati raccolti
- [ ] Google Ads ID ricevuto (per cartelle -gg)
- [ ] Conversion Label ricevuto (per cartelle -gg)
- [ ] Facebook Pixel ID ricevuto (per cartelle -fb)
- [ ] Dati network ricevuti PER OGNI NAZIONE (endpoint, uid, key, offer, lp)
- [ ] Endpoint URL copiato ESATTAMENTE come fornito dall'utente

### Per ogni page.tsx verificare (INVIO LEAD):
- [ ] NO 'use client' (e' un Server Component)
- [ ] networkConfig presente con endpoint, uid, key, offerId, lpId
- [ ] endpoint URL ESATTAMENTE come fornito dall'utente
- [ ] uid, key, offerId, lpId corretti per la nazione/piattaforma

### Per ogni ty/page.tsx -gg verificare (CONVERSIONE GOOGLE):
- [ ] 'use client' presente
- [ ] useEffect con guardia sessionStorage `cf_{orderNumber}`
- [ ] gtag('event', 'conversion', { send_to, value, currency, transaction_id })
- [ ] send_to: formato 'AW-ID/LABEL'
- [ ] value: prezzo scontato NUMERICO (es: 299, non "299")
- [ ] currency: codice ISO (es: 'PLN', 'EUR', 'CZK')
- [ ] transaction_id presente (anti-duplicazione server-side)

### Per ogni ty/page.tsx -fb verificare (CONVERSIONE FACEBOOK):
- [ ] 'use client' presente
- [ ] useEffect con guardia sessionStorage `cf_{orderNumber}`
- [ ] fbq('track', 'Purchase', { value, currency }, { eventID })
- [ ] value: prezzo scontato NUMERICO
- [ ] currency: codice ISO
- [ ] eventID presente (anti-duplicazione server-side)

### Per ogni content.json verificare (SCRIPT LOADING):
- [ ] Cartelle -gg: googleAdsId presente, facebookPixelId == ""
- [ ] Cartelle -fb: facebookPixelId presente, googleAdsId == ""
- [ ] conversionValue = prezzo scontato locale
- [ ] conversionCurrency = valuta locale
- [ ] network.fingerprintScript compilato (se fornito)
- [ ] network.clickPixel compilato (se fornito)
- [ ] JSON valido dopo inserimento

### Test curl OBBLIGATORIO:
- [ ] Ogni endpoint network testato con curl
- [ ] Tutti rispondono HTTP 200 con code:200
- [ ] Se un endpoint NON risponde, URL SBAGLIATO → chiedere all'utente

### Coerenza cross-piattaforma:
- [ ] value UGUALE tra -gg e -fb della stessa nazione
- [ ] currency UGUALE tra -gg e -fb della stessa nazione

### Report finale
- [ ] Riepilogo prodotto completo
- [ ] Tabella network per nazione
- [ ] Tabella tracking per nazione
- [ ] Check finale positivo

---

## VALIDAZIONE FINALE (dopo Fase 4)

### Coerenza prezzi
- [ ] Prezzi coerenti ovunque (priceBox, comparison, package, orderForm, stickyCta)
- [ ] Nessun prezzo hardcodato diverso da pricing
- [ ] discountPercent coerente con originalPrice e currentPrice

### Coerenza social proof
- [ ] hero.socialProof.count == reviews.totalCount
- [ ] hero.socialProof.rating == reviews.rating

### Qualita contenuto
- [ ] Nessun placeholder rimasto ([nome], TODO, XXX, Lorem)
- [ ] Nessun riferimento a nazioni specifiche
- [ ] Nessun nome di brand/negozio terzo
- [ ] Nessun testo in lingua sbagliata nelle traduzioni
- [ ] Nomi/citta recensioni adattati alla nazione
- [ ] Nome prodotto NON tradotto
- [ ] Accenti corretti (no apostrofi al posto di accenti)
- [ ] Nessun tag HTML nelle recensioni

### Struttura file
- [ ] Ogni cartella: page.tsx + content.json + ty/page.tsx + template + CSS
- [ ] page.tsx: Server Component (NO 'use client') con networkConfig
- [ ] ty/page.tsx: Client Component ('use client') con tracking hardcodato
- [ ] Cartella immagini esiste
- [ ] Path immagini nel JSON puntano a file esistenti
- [ ] JSON valido (nessun errore parsing)

### Risultato
- [ ] Validazione superata (zero errori)

---

## STORICO
- [ ] File `storico.json` aggiornato con nuova entry

---

**Data completamento:** _______________
**Creato da:** Claude AI
**Revisione umana:** [ ] Completata
