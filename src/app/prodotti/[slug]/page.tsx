import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductPageContent from '@/components/ProductPageContent';

// Genera le pagine statiche per tutti i prodotti
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Metadata dinamica per SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Prodotto non trovato',
    };
  }

  return {
    title: `${product.name} - Migliori Offerte`,
    description: `Acquista ${product.name} al miglior prezzo. Sconto del ${product.discount}%! Spedizione gratuita disponibile.`,
    openGraph: {
      title: product.name,
      description: `Risparmia ${product.discount}% su ${product.name}`,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const savings = product.originalPrice - product.price;
  const savingsPercentage = Math.round((savings / product.originalPrice) * 100);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-[1500px] mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/prodotti" className="hover:text-blue-600">Prodotti</Link>
          <span>/</span>
          <Link href={`/categoria/${product.category}`} className="hover:text-blue-600 capitalize">
            {product.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Immagine Prodotto */}
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Info Prodotto */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Prezzi */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-green-600">
                    €{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                        Risparmi €{savings.toFixed(2)} ({savingsPercentage}%)
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Disponibilità */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Disponibile</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Non disponibile</span>
                  </div>
                )}
              </div>

              {/* Spedizione */}
              <div className="mb-6 pb-6 border-b">
                {product.freeShipping ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold">Spedizione GRATUITA</span>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    Costo spedizione: <span className="font-semibold">€{product.shippingCost.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Categoria */}
              <div className="mb-6">
                <span className="text-gray-600">Categoria: </span>
                <Link 
                  href={`/categoria/${product.category}`}
                  className="text-blue-600 hover:underline capitalize"
                >
                  {product.category.replace('-', ' ')}
                </Link>
              </div>

              {/* Bottone Acquisto */}
              <div className="mt-auto">
                <Link
                  href={product.inStock ? `/checkout/${product.slug}` : '#'}
                  className={`block w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition text-center ${
                    product.inStock 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg' 
                      : 'bg-gray-400 cursor-not-allowed pointer-events-none'
                  }`}
                >
                  {product.inStock ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="text-2xl">💵</span>
                      <span>Acquista con Pagamento alla Consegna</span>
                    </span>
                  ) : (
                    'Non Disponibile'
                  )}
                </Link>
                {product.inStock && (
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Nessun pagamento anticipato - Paghi solo alla consegna
                  </p>
                )}
              </div>

              {/* Info aggiuntive */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="border rounded-lg p-3">
                  <svg className="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-xs text-gray-600">Paga alla Consegna</span>
                </div>
                <div className="border rounded-lg p-3">
                  <svg className="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs text-gray-600">Reso Facile</span>
                </div>
                <div className="border rounded-lg p-3">
                  <svg className="w-6 h-6 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs text-gray-600">Spedizione Veloce</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrizione */}
          <div className="border-t px-8 py-8">
            <h2 className="text-2xl font-bold mb-4">Descrizione Prodotto</h2>
            <div className="prose max-w-none text-gray-600">
              {product.description ? (
                <div className="whitespace-pre-line">{product.description}</div>
              ) : (
                <>
                  <p>
                    {product.name} è un prodotto di alta qualità della categoria {product.category.replace('-', ' ')}.
                    Approfitta dello sconto del {product.discount}% e risparmia €{savings.toFixed(2)} sul prezzo originale.
                  </p>
                  {product.freeShipping && (
                    <p className="mt-4">
                      <strong>Spedizione gratuita inclusa!</strong> Ricevi il tuo ordine comodamente a casa senza costi aggiuntivi.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Contenuto Personalizzato della Pagina */}
          {product.pageContent && (
            <div className="px-8 py-8">
              <ProductPageContent 
                content={product.pageContent}
                productName={product.name}
                price={product.price}
                discount={product.discount}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}