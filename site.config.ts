/**
 * CONFIGURAZIONE SITO
 *
 * Questo file contiene TUTTI i dati specifici del sito.
 * Modifica questi valori per personalizzare il sito.
 *
 * IMPORTANTE: Tutti i dati aziendali devono essere definiti qui
 * e non hardcodati nelle pagine.
 */

export const siteConfig = {
  // ==========================================
  // IDENTITA' DEL SITO
  // ==========================================

  /** Nome del sito (mostrato nel logo e titoli) */
  siteName: 'BrightHome',

  /** Slogan / descrizione breve */
  siteDescription: 'Quality Home & Garden Products',

  /** URL del sito (senza slash finale) */
  siteUrl: 'https://www.brighthome.co.uk',

  // ==========================================
  // DATI AZIENDALI / LEGALI
  // ==========================================

  /** Ragione sociale completa */
  companyName: 'BrightHome Trading Ltd',

  /** Partita IVA (VAT Number UK) */
  vatNumber: 'GB 412 7593 86',

  /** Sede legale */
  legalAddress: '47 Commerce Street, Manchester, M2 4PW, United Kingdom',

  /** Capitale sociale (opzionale) */
  shareCapital: '',

  /** PEC aziendale (opzionale) */
  pecEmail: '',

  /** Numero REA / Company Number */
  reaNumber: '14829365',

  /** Codice fiscale (opzionale, se diverso da P.IVA) */
  fiscalCode: '',

  // ==========================================
  // CONTATTI
  // ==========================================

  /** Email principale / info */
  email: 'info@brighthome.co.uk',

  /** Email supporto clienti */
  supportEmail: 'support@brighthome.co.uk',

  /** Email assistenza */
  assistanceEmail: 'help@brighthome.co.uk',

  // ==========================================
  // METADATI SEO
  // ==========================================

  /** Titolo default per le pagine */
  defaultTitle: 'BrightHome - Quality Home & Garden Products',

  /** Descrizione meta default */
  defaultMetaDescription: 'Discover amazing deals on quality home and garden products. Cash on delivery, fast shipping across Europe.',

  // ==========================================
  // CONFIGURAZIONE SPEDIZIONI E RESI
  // ==========================================

  /** Giorni per il reso */
  returnDays: 30,

  /** Tempo di spedizione */
  shippingTime: '48h',

  /** Costo spedizione standard */
  shippingCost: 0,

  // ==========================================
  // COLORI BRAND (opzionale)
  // ==========================================

  /** Colore primario */
  primaryColor: '#F97316', // orange-500

  /** Colore secondario */
  secondaryColor: '#1E293B', // slate-800
};

// Tipo per TypeScript
export type SiteConfig = typeof siteConfig;

// Export default per compatibilità
export default siteConfig;
