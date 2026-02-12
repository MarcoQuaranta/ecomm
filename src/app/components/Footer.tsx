import Link from "next/link";
import siteConfig from "../../../site.config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-3">{siteConfig.siteName}</h3>
            <p className="text-gray-400 text-sm mb-3">
              {siteConfig.siteDescription}
            </p>
            <div className="text-gray-400 text-sm space-y-1">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.legalAddress}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Prodotti</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/catalogo" className="hover:text-rose-400">Catalogo</Link></li>
              <li><Link href="/offerte" className="hover:text-rose-400">Offerte</Link></li>
              <li><Link href="/categorie" className="hover:text-rose-400">Categorie</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Azienda</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/chi-siamo" className="hover:text-rose-400">Chi Siamo</Link></li>
              <li><Link href="/assistenza" className="hover:text-rose-400">Contattaci</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legale</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-rose-400">Privacy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-rose-400">Cookie</Link></li>
              <li><Link href="/termini-e-condizioni" className="hover:text-rose-400">Termini</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {year} {siteConfig.companyName}. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            <span>P.IVA: {siteConfig.vatNumber}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
