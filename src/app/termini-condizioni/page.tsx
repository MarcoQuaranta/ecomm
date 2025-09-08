import { sql } from '@vercel/postgres';
import LegalPageLayout from '@/components/LegalPageLayout';

async function getCompanyInfo() {
  try {
    const result = await sql`SELECT * FROM company_info ORDER BY id DESC LIMIT 1`;
    if (result.rows.length > 0) return result.rows[0];
  } catch (error) {
    console.error('Error fetching company info:', error);
  }
  return {
    company_name: 'Il Mio E-commerce',
    email: 'info@example.com',
    legal_address: 'Via Roma 1, 00100 Roma, Italia',
    vat_number: 'IT12345678901',
    share_capital: '',
    phone: '',
    pec_email: ''
  };
}

export default async function TerminiCondizioniPage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Termini e Condizioni">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Informazioni Generali</h2>
        <p className="mb-4">
          I presenti Termini e Condizioni regolano l'acquisto di prodotti sul sito di <strong>{company.company_name}</strong>,
          con sede in {company.legal_address}, P.IVA {company.vat_number}.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Prodotti e Prezzi</h2>
        <p className="mb-4">Tutti i prezzi sono espressi in Euro e includono l'IVA. {company.company_name} si riserva il diritto di modificare i prezzi in qualsiasi momento.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Ordini e Pagamenti</h2>
        <p className="mb-4">Gli ordini si intendono accettati solo dopo conferma via email. Accettiamo pagamento alla consegna (contrassegno).</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Spedizione e Consegna</h2>
        <p className="mb-4">Le spedizioni avvengono in 2-3 giorni lavorativi. Costo spedizione: €4,99. Spedizione gratuita per ordini superiori a €49.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Diritto di Recesso</h2>
        <p className="mb-4">Il cliente ha diritto di recedere entro 14 giorni dal ricevimento della merce, secondo la normativa europea.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Garanzia</h2>
        <p className="mb-4">Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Foro Competente</h2>
        <p className="mb-4">Per qualsiasi controversia è competente il Foro del consumatore.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contatti</h2>
        <p>Email: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></p>
        {company.phone && <p>Telefono: {company.phone}</p>}
        {company.pec_email && <p>PEC: {company.pec_email}</p>}
      </section>
    </LegalPageLayout>
  );
}