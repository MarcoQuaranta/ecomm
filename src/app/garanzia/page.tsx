import { getCompanyInfo } from '@/lib/legal-pages';
import LegalPageLayout from '@/components/LegalPageLayout';

// Forza rendering dinamico
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GaranziaPage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Garanzia e Assistenza">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. I Nostri Livelli di Garanzia</h2>
        <p className="mb-4">
          In {company.company_name} offriamo diversi livelli di garanzia per garantirti la massima tranquillità 
          e soddisfazione nei tuoi acquisti.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Garanzia "Soddisfatti o Rimborsati"</h2>
        <div className="bg-green-50 p-6 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2 text-green-800">14 giorni - Reso Gratuito</h3>
          <p className="mb-4 text-green-700">
            <strong>Non sei soddisfatto del tuo acquisto?</strong> Hai 14 giorni di tempo per restituire 
            il prodotto senza dover fornire alcuna spiegazione.
          </p>
          <ul className="list-disc ml-6 mb-4 text-green-700">
            <li>Reso completamente gratuito</li>
            <li>Rimborso completo dell'importo pagato</li>
            <li>Ritiro a domicilio gratuito</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Garanzia Standard</h2>
        <div className="bg-blue-50 p-6 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">12 mesi - Su tutti i prodotti</h3>
          <p className="mb-4 text-blue-700">
            <strong>Garanzia minima garantita:</strong> Tutti i nostri prodotti sono coperti da almeno 
            1 anno di garanzia per difetti di fabbricazione e malfunzionamenti.
          </p>
          <ul className="list-disc ml-6 mb-4 text-blue-700">
            <li>Riparazione gratuita</li>
            <li>Sostituzione del prodotto se la riparazione non è possibile</li>
            <li>Assistenza tecnica specializzata</li>
            <li>Copertura per difetti di fabbricazione</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Garanzia Estesa Gratuita</h2>
        <div className="bg-purple-50 p-6 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2 text-purple-800">Fino a 5 anni - Prodotti selezionati</h3>
          <p className="mb-4 text-purple-700">
            <strong>Garanzia estesa gratuita:</strong> Alcuni dei nostri prodotti includono 
            automaticamente garanzie estese fino a 5 anni, completamente gratuite.
          </p>
          <ul className="list-disc ml-6 mb-4 text-purple-700">
            <li>Alcuni elettrodomestici: fino a 5 anni</li>
            <li>Alcuni prodotti elettronici: fino a 3 anni</li>
            <li>Alcuni attrezzi professionali: fino a 5 anni</li>
            <li>Alcuni prodotti per la casa: fino a 2 anni</li>
          </ul>
          <p className="text-sm text-purple-600 mt-2">
            <em>La disponibilità della garanzia estesa gratuita varia per prodotto e viene chiaramente indicata nella descrizione di ogni articolo.</em>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Garanzia Aggiuntiva (Opzionale)</h2>
        <div className="bg-orange-50 p-6 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-2 text-orange-800">Estendi la tua protezione</h3>
          <p className="mb-4 text-orange-700">
            <strong>Vuoi ancora più tranquillità?</strong> Per alcuni prodotti puoi estendere ulteriormente 
            la garanzia pagando un piccolo supplemento al momento dell'acquisto.
          </p>
          <ul className="list-disc ml-6 mb-4 text-orange-700">
            <li>Estensione della garanzia</li>
            <li>Copertura danni accidentali</li>
            <li>Assistenza prioritaria</li>
            <li>Sostituzione immediata</li>
          </ul>
          <p className="text-sm text-orange-600 mt-4">
            <em>Il costo dell'estensione di garanzia può essere calcolato come percentuale del prezzo del prodotto 
            o come importo fisso, e ti verrà mostrato chiaramente durante il processo di acquisto.</em>
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Come Richiedere Assistenza in Garanzia</h2>
        <p className="mb-4">
          Per richiedere assistenza in garanzia, contatta il nostro servizio clienti tramite il pulsante 
          "Assistenza" presente nel menu del sito, indicando:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Numero dell'ordine</li>
          <li>Descrizione del problema</li>
          <li>Foto del prodotto (se necessario)</li>
        </ul>
        <p className="mb-4">
          Il nostro team tecnico valuterà la situazione e ti fornirà la soluzione più rapida.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Condizioni di Garanzia</h2>
        <p className="mb-4">La garanzia copre:</p>
        <ul className="list-disc ml-6 mb-4 text-green-700">
          <li>Difetti di fabbricazione</li>
          <li>Malfunzionamenti non dovuti ad uso improprio</li>
          <li>Componenti difettosi</li>
          <li>Problemi di funzionamento entro l'uso normale</li>
        </ul>
        
        <p className="mb-4 mt-6">La garanzia non copre:</p>
        <ul className="list-disc ml-6 mb-4 text-red-700">
          <li>Danni dovuti ad uso improprio</li>
          <li>Normale usura</li>
          <li>Danni accidentali (salvo garanzia estesa)</li>
          <li>Modifiche non autorizzate</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contatti per Assistenza</h2>
        <p className="mb-4">Per qualsiasi domanda sulla garanzia:</p>
        <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></p>
        <p className="mb-4"><strong>Indirizzo:</strong> {company.legal_address}</p>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>La tua soddisfazione è la nostra priorità.</strong> Il nostro obiettivo è offrirti 
            prodotti di qualità e un servizio eccellente. Se hai qualsiasi problema, contattaci 
            immediatamente e troveremo insieme la soluzione migliore.
          </p>
        </div>
      </section>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Normativa di riferimento:</strong> D.Lgs. 206/2005 (Codice del Consumo), 
          Direttiva UE 2019/771 sulla vendita di beni
        </p>
      </div>
    </LegalPageLayout>
  );
}