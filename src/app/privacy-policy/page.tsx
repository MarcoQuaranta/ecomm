import { getCompanyInfo } from '@/lib/legal-pages';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Forza rendering dinamico
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PrivacyPolicyPage() {
  const company = await getCompanyInfo();
  const currentDate = new Date().toLocaleDateString('it-IT', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-8">Ultimo aggiornamento: {currentDate}</p>

            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Titolare del Trattamento</h2>
                <p className="mb-4">
                  Il Titolare del trattamento dei dati personali è <strong>{company.company_name}</strong>, 
                  con sede legale in {company.legal_address}, P.IVA {company.vat_number}
                  {company.share_capital && `, Capitale Sociale ${company.share_capital}`}.
                </p>
                <p className="mb-4">
                  Per qualsiasi informazione relativa al trattamento dei dati personali, è possibile contattare il Titolare:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Email: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></li>
                  {company.pec_email && <li>PEC: {company.pec_email}</li>}
                  <li>Indirizzo: {company.legal_address}</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Tipologia di Dati Raccolti</h2>
                <p className="mb-4">
                  {company.company_name} raccoglie le seguenti categorie di dati personali:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Dati di navigazione:</strong> indirizzi IP, tipo di browser, sistema operativo, pagine visitate</li>
                  <li><strong>Dati forniti volontariamente:</strong> nome, cognome, email, indirizzo, telefono</li>
                  <li><strong>Dati di pagamento:</strong> necessari per processare gli ordini (gestiti da provider esterni sicuri)</li>
                  <li><strong>Cookie e tecnologie simili:</strong> per migliorare l'esperienza di navigazione</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Finalità del Trattamento</h2>
                <p className="mb-4">I dati personali sono trattati per le seguenti finalità:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Gestione degli ordini e delle spedizioni</li>
                  <li>Assistenza clienti e gestione reclami</li>
                  <li>Adempimenti fiscali e contabili</li>
                  <li>Invio di comunicazioni commerciali (previo consenso)</li>
                  <li>Analisi statistiche e miglioramento dei servizi</li>
                  <li>Prevenzione frodi e sicurezza del sito</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Base Giuridica del Trattamento</h2>
                <p className="mb-4">Il trattamento dei dati si basa su:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Contratto:</strong> per l'esecuzione di ordini e servizi richiesti</li>
                  <li><strong>Obbligo legale:</strong> per adempimenti fiscali e normativi</li>
                  <li><strong>Consenso:</strong> per l'invio di comunicazioni marketing</li>
                  <li><strong>Legittimo interesse:</strong> per la sicurezza e prevenzione frodi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Modalità di Trattamento</h2>
                <p className="mb-4">
                  Il trattamento dei dati avviene mediante strumenti informatici e telematici, con modalità 
                  organizzative e logiche strettamente correlate alle finalità indicate. I dati sono protetti 
                  da misure di sicurezza tecniche e organizzative adeguate per garantire un livello di sicurezza 
                  adeguato al rischio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Comunicazione e Diffusione dei Dati</h2>
                <p className="mb-4">I dati personali potranno essere comunicati a:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li>Corrieri e spedizionieri per la consegna dei prodotti</li>
                  <li>Istituti bancari e di pagamento per le transazioni</li>
                  <li>Consulenti fiscali e commercialisti per adempimenti di legge</li>
                  <li>Autorità competenti per obblighi di legge</li>
                  <li>Provider di servizi IT e hosting</li>
                </ul>
                <p className="mb-4">
                  I dati non saranno diffusi o venduti a terzi per finalità di marketing senza esplicito consenso.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Trasferimento Dati Extra-UE</h2>
                <p className="mb-4">
                  Alcuni servizi utilizzati (come servizi cloud) potrebbero comportare il trasferimento di dati 
                  al di fuori dell'Unione Europea. In tal caso, ci assicuriamo che i fornitori garantiscano 
                  adeguate misure di protezione conformi al GDPR.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Periodo di Conservazione</h2>
                <p className="mb-4">I dati personali saranno conservati per:</p>
                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Dati di ordini:</strong> 10 anni per obblighi fiscali</li>
                  <li><strong>Dati di marketing:</strong> fino a revoca del consenso</li>
                  <li><strong>Dati di navigazione:</strong> massimo 12 mesi</li>
                  <li><strong>Cookie tecnici:</strong> durata della sessione</li>
                  <li><strong>Cookie analitici:</strong> massimo 14 mesi</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Diritti dell'Interessato</h2>
                <p className="mb-4">
                  Ai sensi del Regolamento UE 2016/679 (GDPR), l'interessato ha diritto di:
                </p>
                <ul className="list-disc ml-6 mb-4">
                  <li><strong>Accesso:</strong> ottenere conferma e informazioni sul trattamento</li>
                  <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
                  <li><strong>Cancellazione:</strong> richiedere la cancellazione dei dati ("diritto all'oblio")</li>
                  <li><strong>Limitazione:</strong> limitare il trattamento in determinate circostanze</li>
                  <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato</li>
                  <li><strong>Opposizione:</strong> opporsi al trattamento per motivi legittimi</li>
                  <li><strong>Revoca del consenso:</strong> revocare il consenso in qualsiasi momento</li>
                </ul>
                <p className="mb-4">
                  Per esercitare questi diritti, contattare il Titolare all'indirizzo email {company.email}.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Cookie Policy</h2>
                <p className="mb-4">
                  Il sito utilizza cookie tecnici necessari al funzionamento e cookie analitici per migliorare 
                  l'esperienza utente. Per maggiori informazioni, consultare la nostra 
                  {' '}<a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Minori</h2>
                <p className="mb-4">
                  I servizi di {company.company_name} non sono destinati a minori di 18 anni. 
                  Non raccogliamo consapevolmente dati personali di minori senza il consenso dei genitori.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Modifiche alla Privacy Policy</h2>
                <p className="mb-4">
                  Il Titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento. 
                  Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Reclami</h2>
                <p className="mb-4">
                  L'interessato ha diritto di proporre reclamo all'Autorità Garante per la Protezione dei 
                  Dati Personali (www.garanteprivacy.it) qualora ritenga che il trattamento violi il GDPR.
                </p>
              </section>

              <div className="mt-12 p-6 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Riferimenti normativi:</strong> Regolamento UE 2016/679 (GDPR), 
                  D.Lgs. 196/2003 (Codice Privacy) come modificato dal D.Lgs. 101/2018
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}