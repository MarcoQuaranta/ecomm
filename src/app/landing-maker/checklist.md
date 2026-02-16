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
- [ ] `page.tsx` statico presente
- [ ] `content.json` presente e compilato
- [ ] `ty/page.tsx` presente
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

### Per ogni nazione e media buyer verificare:

#### Struttura
- [ ] Cartella `[prodotto]-[lang]/` creata
- [ ] `page.tsx` copiato (identico a versione italiana)
- [ ] `content.json` tradotto
- [ ] `ty/page.tsx` tradotto

#### Traduzione content.json
- [ ] Tutti i testi tradotti nella lingua corretta
- [ ] Nessun testo in italiano rimasto
- [ ] Testimonianze: nomi adattati al paese
- [ ] Testimonianze: citta adattate al paese
- [ ] Prezzi nella valuta locale corretta
- [ ] Simbolo valuta corretto
- [ ] Valore di conversione = prezzo scontato locale
- [ ] Nome prodotto NON tradotto
- [ ] Link immagini invariati
- [ ] Chiavi JSON invariate (in inglese)
- [ ] JSON valido

#### Traduzione ty/page.tsx
- [ ] Testi visibili tradotti
- [ ] Nessun testo in italiano rimasto

---

## FASE 4 - Tracciamento

### Dati raccolti
- [ ] Google Ads ID ricevuto
- [ ] Conversion Label ricevuto
- [ ] Facebook Pixel ID ricevuto
- [ ] Dati network ricevuti (API endpoint, offer ID)

### Per ogni content.json verificare:
- [ ] googleAdsId presente e corretto
- [ ] conversionLabel presente e corretto
- [ ] conversionValue = prezzo scontato locale
- [ ] conversionCurrency = valuta locale
- [ ] facebookPixelId presente e corretto
- [ ] network.apiEndpoint presente
- [ ] network.offerId presente
- [ ] JSON valido dopo inserimento

### Report finale
- [ ] Riepilogo prodotto completo
- [ ] Dettaglio per nazione con prezzi e valori conversione
- [ ] Lista cartelle create
- [ ] Check finale positivo

---

## VALIDAZIONE FINALE (dopo Fase 4)

### Formato ID
- [ ] googleAdsId formato AW-XXXXXXXXX (AW- + numeri)
- [ ] conversionLabel non vuoto, alfanumerico
- [ ] facebookPixelId non vuoto, solo numeri
- [ ] network.apiEndpoint URL valido (https://)
- [ ] network.offerId non vuoto

### Coerenza tracking
- [ ] conversionValue == pricing.currentPrice (ogni nazione)
- [ ] conversionCurrency == pricing.currency (ogni nazione)
- [ ] googleAdsId uguale in tutte le nazioni
- [ ] conversionLabel uguale in tutte le nazioni
- [ ] facebookPixelId uguale in tutte le nazioni

### Coerenza prezzi
- [ ] Prezzi coerenti ovunque (priceBox, comparison, package, orderForm, stickyCta)
- [ ] Nessun prezzo hardcodato diverso da pricing
- [ ] discountPercent coerente con originalPrice e currentPrice

### Coerenza social proof
- [ ] hero.socialProof.count == reviews.totalCount
- [ ] hero.socialProof.rating == reviews.rating

### Qualità contenuto
- [ ] Nessun placeholder rimasto ([nome], TODO, XXX, Lorem)
- [ ] Nessun riferimento a nazioni specifiche
- [ ] Nessun nome di brand/negozio terzo
- [ ] Nessun testo in lingua sbagliata nelle traduzioni
- [ ] Nomi/città recensioni adattati alla nazione
- [ ] Nome prodotto NON tradotto
- [ ] Accenti corretti (no apostrofi al posto di accenti)
- [ ] Nessun tag HTML nelle recensioni

### Struttura file
- [ ] Ogni cartella: page.tsx + content.json + ty/page.tsx
- [ ] page.tsx e ty/page.tsx identici tra cartelle
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
