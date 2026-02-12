import { getCompanyInfo } from '@/lib/legal-pages';
import LegalPageLayout from '@/components/LegalPageLayout';

export default async function PoliticheResoPage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Politiche di Reso">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Diritto di Recesso</h2>
        <p className="mb-4">
          Hai diritto di recedere dal contratto entro 30 giorni dal ricevimento dei prodotti, senza dover fornire alcuna motivazione.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Come Richiedere un Reso</h2>
        <p className="mb-4">
          <strong>Per richiedere un reso, contatta il nostro servizio assistenza tramite il pulsante "Assistenza" 
          presente nel menu principale del sito, specificando chiaramente il problema riscontrato.</strong>
        </p>
        <p className="mb-4">Il nostro team ti guiderà attraverso la procedura di reso più adatta alla tua situazione.</p>
        <p className="mb-4">
          <em>Non hai il dovere di fornirci la motivazione del reso, tuttavia la chiediamo gentilmente 
          per aiutarci ad ottimizzare i nostri servizi e offrirti un'esperienza sempre migliore.</em>
        </p>
        
        <p className="mb-4">Alternativamente, puoi contattarci direttamente a:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Email: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></li>
          <li>Indirizzo: {company.legal_address}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Condizioni per il Reso</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>I prodotti devono essere integri e nella confezione originale</li>
          <li>Non devono presentare segni di usura o danneggiamento</li>
          <li>Devono essere completi di tutti gli accessori e documentazione</li>
          <li>Le etichette devono essere ancora attaccate</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Spese di Restituzione</h2>
        <p className="mb-4">
          Le spese di spedizione per la restituzione sono a carico di {company.company_name}, 
          salvo nei casi di reso "per aver cambiato idea" dove le spese sono a carico del cliente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Rimborso</h2>
        <p className="mb-4">
          Il rimborso verrà effettuato entro 14 giorni dalla ricezione dei prodotti restituiti, utilizzando lo stesso metodo di pagamento usato per l'acquisto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Garanzia Legale</h2>
        <p className="mb-4">
          Indipendentemente dal diritto di recesso, tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi prevista dal Codice del Consumo.
        </p>
      </section>
    </LegalPageLayout>
  );
}