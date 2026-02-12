// Info aziendali dinamiche per le pagine legali
// Importa da site.config.ts nella root

import siteConfig from '../../site.config';

export interface CompanyInfo {
  company_name: string;
  legal_address: string;
  email: string;
  vat_number: string;
  share_capital?: string;
  pec_email?: string;
  rea_number?: string;
  fiscal_code?: string;
  support_email?: string;
  assistance_email?: string;
  site_name?: string;
  site_url?: string;
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  return {
    company_name: siteConfig.companyName,
    legal_address: siteConfig.legalAddress,
    email: siteConfig.email,
    vat_number: siteConfig.vatNumber,
    share_capital: siteConfig.shareCapital,
    pec_email: siteConfig.pecEmail,
    rea_number: siteConfig.reaNumber,
    fiscal_code: siteConfig.fiscalCode,
    support_email: siteConfig.supportEmail,
    assistance_email: siteConfig.assistanceEmail,
    site_name: siteConfig.siteName,
    site_url: siteConfig.siteUrl
  };
}

// Export sincrono per componenti client
export function getCompanyInfoSync(): CompanyInfo {
  return {
    company_name: siteConfig.companyName,
    legal_address: siteConfig.legalAddress,
    email: siteConfig.email,
    vat_number: siteConfig.vatNumber,
    share_capital: siteConfig.shareCapital,
    pec_email: siteConfig.pecEmail,
    rea_number: siteConfig.reaNumber,
    fiscal_code: siteConfig.fiscalCode,
    support_email: siteConfig.supportEmail,
    assistance_email: siteConfig.assistanceEmail,
    site_name: siteConfig.siteName,
    site_url: siteConfig.siteUrl
  };
}
