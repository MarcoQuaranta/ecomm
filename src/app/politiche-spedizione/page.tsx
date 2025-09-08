import { getCompanyInfo } from '@/lib/legal-pages';
import LegalPageLayout from '@/components/LegalPageLayout';

export default async function PoliticheSpedizionePage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Politiche di Spedizione">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Tempi di Spedizione</h2>
        <p className="mb-4">
          Gli ordini vengono processati entro 24 ore lavorative. La consegna avviene normalmente in:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Italia:</strong> 2-3 giorni lavorativi</li>
          <li><strong>Isole:</strong> 3-5 giorni lavorativi</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Costi di Spedizione</h2>
        <p className="mb-4">
          <strong>Il costo di spedizione dipende dal prodotto specifico.</strong> 
          Controlla sempre la pagina del prodotto per conoscere il prezzo preciso della spedizione 
          prima di completare l'ordine.
        </p>
        <p className="mb-4">
          I costi di spedizione vengono calcolati in base a dimensioni, peso e destinazione del prodotto.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Corrieri Utilizzati</h2>
        <p className="mb-4">
          {company.company_name} si affida ai migliori corrieri nazionali per garantire consegne rapide e sicure:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>BRT</li>
          <li>GLS</li>
          <li>SDA</li>
          <li>Poste Italiane</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Consegna</h2>
        <p className="mb-4">La consegna avviene al piano strada dal lunedì al venerdì, dalle 9:00 alle 18:00.</p>
        <p className="mb-4">In caso di assenza:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Il corriere lascerà un avviso di giacenza</li>
          <li>Verrà tentata una seconda consegna</li>
          <li>Il pacco rimarrà in giacenza per 5 giorni lavorativi</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Imballaggio</h2>
        <p className="mb-4">
          Tutti i prodotti sono imballati con cura utilizzando materiali protettivi e, quando possibile, eco-sostenibili.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Danni Durante il Trasporto</h2>
        <p className="mb-4">
          In caso di danni evidenti al pacco, è importante:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Accettare con riserva scritta sul documento di consegna</li>
          <li>Fotografare il danno</li>
          <li>Contattarci entro 24 ore a {company.email}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contatti per Assistenza</h2>
        <p>Per qualsiasi domanda sulla spedizione:</p>
        <p>Email: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></p>
      </section>
    </LegalPageLayout>
  );
}