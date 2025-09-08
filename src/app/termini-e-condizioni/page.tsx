import { getCompanyInfo } from '@/lib/legal-pages';
import LegalPageLayout from '@/components/LegalPageLayout';

// Forza rendering dinamico
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TerminiCondizioniPage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Termini e Condizioni di Utilizzo">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Informazioni Generali</h2>
        <p className="mb-4">
          I presenti termini e condizioni disciplinano l'utilizzo del sito web {company.company_name} 
          e regolano il rapporto contrattuale tra la società e gli utenti.
        </p>
        <p className="mb-4">
          L'accesso e l'utilizzo del sito comportano l'accettazione incondizionata dei presenti termini.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Dati del Titolare</h2>
        <ul className="space-y-2 mb-4">
          <li><strong>Denominazione sociale:</strong> {company.company_name}</li>
          <li><strong>Sede legale:</strong> {company.legal_address}</li>
          <li><strong>Partita IVA:</strong> {company.vat_number}</li>
          {company.share_capital && <li><strong>Capitale sociale:</strong> {company.share_capital}</li>}
          <li><strong>Email:</strong> {company.email}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Definizioni</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Sito:</strong> Il presente sito web e tutti i suoi contenuti</li>
          <li><strong>Utente:</strong> Qualsiasi soggetto che accede e utilizza il sito</li>
          <li><strong>Contenuti:</strong> Tutti i testi, immagini, video e altri materiali presenti</li>
          <li><strong>Servizi:</strong> I servizi offerti attraverso il sito web</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Condizioni d'Uso del Sito</h2>
        <p className="mb-4">L'utente si impegna a utilizzare il sito:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Nel rispetto della legge vigente</li>
          <li>Senza danneggiare, disabilitare o compromettere il funzionamento del sito</li>
          <li>Senza utilizzare sistemi automatizzati per accedere al sito</li>
          <li>Senza tentare di accedere ad aree riservate</li>
          <li>Fornendo informazioni veritiere e aggiornate</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Proprietà Intellettuale</h2>
        <p className="mb-4">
          Tutti i contenuti del sito (testi, immagini, loghi, marchi) sono di proprietà esclusiva 
          di {company.company_name} o dei rispettivi titolari.
        </p>
        <p className="mb-4">
          È vietata la riproduzione, distribuzione o modifica dei contenuti senza autorizzazione scritta.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Processo di Acquisto</h2>
        <h3 className="text-xl font-semibold mb-2 mt-4">Modalità di Ordinazione</h3>
        <p className="mb-4">Gli ordini possono essere effettuati esclusivamente attraverso il sito web.</p>
        
        <h3 className="text-xl font-semibold mb-2 mt-4">Conferma Ordine</h3>
        <p className="mb-4">
          La conferma dell'ordine da parte dell'utente costituisce proposta contrattuale irrevocabile.
          {company.company_name} si riserva il diritto di accettare o rifiutare l'ordine.
        </p>

        <h3 className="text-xl font-semibold mb-2 mt-4">Pagamento</h3>
        <p className="mb-4">
          Il pagamento avviene esclusivamente tramite contrassegno alla consegna. 
          Non sono accettati altri metodi di pagamento.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Prezzi e Disponibilità</h2>
        <p className="mb-4">
          I prezzi indicati si intendono IVA inclusa e possono variare senza preavviso.
        </p>
        <p className="mb-4">
          La disponibilità dei prodotti è indicativa. In caso di indisponibilità, 
          l'utente verrà tempestivamente informato.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Spedizione e Consegna</h2>
        <p className="mb-4">
          Le spedizioni avvengono secondo le modalità indicate nella pagina dedicata.
          I tempi di consegna sono indicativi e non costituiscono impegno contrattuale.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Diritto di Recesso</h2>
        <p className="mb-4">
          L'utente ha diritto di recedere dal contratto entro 14 giorni dalla ricezione, 
          secondo quanto previsto dal Codice del Consumo (D.Lgs. 206/2005).
        </p>
        <p className="mb-4">
          Per i dettagli consultare la pagina "Politiche di Reso".
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">10. Garanzie e Responsabilità</h2>
        <p className="mb-4">
          {company.company_name} garantisce la conformità dei prodotti secondo la normativa vigente.
        </p>
        <p className="mb-4">
          La responsabilità è limitata al valore dell'ordine e non si estende a danni indiretti.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Trattamento Dati Personali</h2>
        <p className="mb-4">
          Il trattamento dei dati personali avviene secondo quanto descritto nell'informativa privacy, 
          in conformità al GDPR (Reg. UE 2016/679).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">12. Comunicazioni</h2>
        <p className="mb-4">
          Le comunicazioni tra le parti avvengono tramite email agli indirizzi indicati.
        </p>
        <p className="mb-4">
          Per questioni legali: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">13. Risoluzione Controversie</h2>
        <p className="mb-4">
          Per la risoluzione di eventuali controversie è competente il foro del consumatore 
          o, in alternativa, può essere attivata la procedura di mediazione.
        </p>
        <p className="mb-4">
          La piattaforma UE per la risoluzione delle controversie online è disponibile su: 
          <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">14. Modifiche ai Termini</h2>
        <p className="mb-4">
          {company.company_name} si riserva il diritto di modificare i presenti termini e condizioni. 
          Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">15. Legge Applicabile</h2>
        <p className="mb-4">
          I presenti termini sono regolati dalla legge italiana.
        </p>
      </section>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Ultima modifica:</strong> {new Date().toLocaleDateString('it-IT')}<br/>
          <strong>Normativa di riferimento:</strong> D.Lgs. 206/2005 (Codice del Consumo), 
          Reg. UE 2016/679 (GDPR), D.Lgs. 70/2003 (E-commerce)
        </p>
      </div>
    </LegalPageLayout>
  );
}