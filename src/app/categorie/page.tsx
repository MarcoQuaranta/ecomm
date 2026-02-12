import { categories, getProductCountByCategory } from '@/lib/categories';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import siteConfig from '../../../site.config';

export const metadata = {
  title: `Categorie - ${siteConfig.siteName}`,
  description: 'Esplora tutte le categorie di prodotti disponibili',
};

export default function CategoriesPage() {
  return (
    <SiteLayout className="bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Tutte le Categorie</h1>
            <p className="text-lg opacity-90">
              Esplora i nostri prodotti per categoria
            </p>
          </div>
        </div>

        {/* Griglia categorie */}
        <div className="container mx-auto px-4 py-12">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nessuna categoria disponibile al momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/catalogo?categoria=${category.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white opacity-90">
                        {getProductCountByCategory(category.slug)} prodotti
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
    </SiteLayout>
  );
}
