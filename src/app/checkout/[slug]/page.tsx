import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Prodotto non trovato',
    };
  }

  return {
    title: `Checkout - ${product.name}`,
    description: `Completa l'acquisto di ${product.name} con pagamento alla consegna.`,
  };
}

export default async function CheckoutPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const shippingCost = product.freeShipping ? 0 : (product.shippingCost || 4.99);
  const total = product.price + shippingCost;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Conferma Ordine</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form di checkout */}
            <div className="lg:col-span-2">
              <CheckoutForm productSlug={product.slug} />
            </div>

            {/* Riepilogo ordine */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Riepilogo Ordine</h2>
                
                {/* Prodotto */}
                <div className="flex gap-4 mb-4 pb-4 border-b">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <p className="text-gray-600 text-sm">Quantità: 1</p>
                    <p className="font-bold text-green-600">€{product.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Totali */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotale:</span>
                    <span>€{product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Spedizione:</span>
                    <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shippingCost === 0 ? 'GRATIS' : `€${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Totale:</span>
                      <span className="text-green-600">€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Metodo di pagamento */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💵</span>
                    <span className="font-bold">Pagamento alla Consegna</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Pagherai in contanti al corriere al momento della consegna.
                  </p>
                </div>

                {/* Sicurezza */}
                <div className="text-center text-xs text-gray-500">
                  <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Transazione sicura
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}