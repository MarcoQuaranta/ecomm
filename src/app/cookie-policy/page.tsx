import { getCompanyInfo } from '@/lib/legal-pages';
import LegalPageLayout from '@/components/LegalPageLayout';

export default async function CookiePolicyPage() {
  const company = await getCompanyInfo();

  return (
    <LegalPageLayout title="Cookie Policy">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Cosa sono i Cookie</h2>
        <p className="mb-4">
          I cookie sono piccoli file di testo che i siti web salvano sul tuo dispositivo per memorizzare informazioni sulla tua navigazione.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Tipologie di Cookie Utilizzati</h2>
        
        <h3 className="text-xl font-semibold mb-2 mt-4">Cookie Tecnici (Necessari)</h3>
        <p className="mb-4">Essenziali per il funzionamento del sito:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>sessionId:</strong> Mantiene la sessione utente (durata: sessione)</li>
          <li><strong>cookieConsent:</strong> Memorizza il consenso ai cookie (durata: 12 mesi)</li>
          <li><strong>cartItems:</strong> Salva i prodotti nel carrello (durata: 7 giorni)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-4">Cookie Analitici</h3>
        <p className="mb-4">Per analizzare l'utilizzo del sito:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>_ga:</strong> Google Analytics per statistiche (durata: 2 anni)</li>
          <li><strong>_gid:</strong> Google Analytics per identificazione utenti (durata: 24 ore)</li>
          <li><strong>analytics_session:</strong> Tracciamento sessione (durata: 30 minuti)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2 mt-4">Cookie di Marketing</h3>
        <p className="mb-4">Per mostrare pubblicità pertinenti:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>fbp:</strong> Facebook Pixel (durata: 3 mesi)</li>
          <li><strong>fr:</strong> Facebook per pubblicità (durata: 3 mesi)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Base Giuridica</h2>
        <p className="mb-4">
          L'utilizzo dei cookie si basa su:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Cookie tecnici:</strong> Legittimo interesse (necessari per il funzionamento)</li>
          <li><strong>Cookie analitici e marketing:</strong> Consenso esplicito dell'utente</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Gestione dei Cookie</h2>
        <p className="mb-4">Puoi gestire le tue preferenze sui cookie in diversi modi:</p>
        
        <h3 className="text-lg font-semibold mb-2 mt-4">Banner Cookie</h3>
        <p className="mb-4">Al primo accesso al sito, puoi accettare o rifiutare i cookie non essenziali.</p>
        
        <h3 className="text-lg font-semibold mb-2 mt-4">Impostazioni Browser</h3>
        <p className="mb-4">Puoi configurare il tuo browser per:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Bloccare tutti i cookie</li>
          <li>Accettare solo cookie di prima parte</li>
          <li>Cancellare i cookie alla chiusura del browser</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2 mt-4">Link Utili per la Gestione Cookie</h3>
        <ul className="list-disc ml-6 mb-4">
          <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Chrome</a></li>
          <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Firefox</a></li>
          <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Safari</a></li>
          <li><a href="https://support.microsoft.com/it-it/help/17442" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Edge</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookie di Terze Parti</h2>
        <p className="mb-4">
          Alcuni servizi di terze parti potrebbero installare propri cookie:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Google Analytics: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Privacy Policy</a></li>
          <li>Facebook: <a href="https://www.facebook.com/policy/cookies/" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Cookie Policy</a></li>
          <li>YouTube: <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Privacy Policy</a></li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Conseguenze del Rifiuto</h2>
        <p className="mb-4">
          Il rifiuto dei cookie tecnici potrebbe compromettere la navigazione del sito.
          Il rifiuto dei cookie analitici e di marketing non influisce sulla funzionalità del sito.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Aggiornamenti</h2>
        <p className="mb-4">
          Questa Cookie Policy potrebbe essere aggiornata periodicamente. 
          Ti invitiamo a consultarla regolarmente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Contatti</h2>
        <p className="mb-4">Per informazioni sui cookie utilizzati:</p>
        <p>Email: <a href={`mailto:${company.email}`} className="text-blue-600 hover:underline">{company.email}</a></p>
        <p>Titolare: {company.company_name}</p>
        <p>Sede: {company.legal_address}</p>
      </section>

      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Normativa di riferimento:</strong> Direttiva 2002/58/CE (ePrivacy), 
          Regolamento UE 2016/679 (GDPR), Provvedimento Garante Privacy n. 231/2021
        </p>
      </div>
    </LegalPageLayout>
  );
}