import { Metadata } from "next";
import siteConfig from "../../../site.config";

export const metadata: Metadata = {
  title: `Contattaci - ${siteConfig.siteName}`,
  description: `Contattaci per informazioni e preventivi su ${siteConfig.siteName}.`,
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-gray-900 to-rose-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">Contattaci</h1>
          <p className="text-gray-300 mt-1">Mettiti in contatto per preventivi e richieste</p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Inviaci un Messaggio</h2>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cognome</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500">
                    <option>Richiesta Informazioni</option>
                    <option>Assistenza Ordine</option>
                    <option>Resi e Rimborsi</option>
                    <option>Altro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                  <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"></textarea>
                </div>
                <button type="submit" className="w-full py-2.5 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-500">
                  Invia Messaggio
                </button>
              </form>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Informazioni di Contatto</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-rose-600">{siteConfig.email}</p>
                    <p className="text-gray-500 text-sm">Risposta entro 24 ore</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">Indirizzo</h3>
                    <p className="text-rose-600">{siteConfig.legalAddress}</p>
                    <p className="text-gray-500 text-sm">{siteConfig.companyName}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900">Orari</h3>
                    <p className="text-rose-600">Lunedi - Venerdi</p>
                    <p className="text-gray-500 text-sm">9:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-rose-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Perche Contattarci?</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Ricevi informazioni sui prodotti</li>
                  <li>• Assistenza su ordini effettuati</li>
                  <li>• Informazioni su resi e rimborsi</li>
                  <li>• Pagamento alla consegna</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
