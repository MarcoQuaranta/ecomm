import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductsByCategory } from '@/lib/db';
import CategoryClient from './CategoryClient';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

// Metadata per SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryNames: Record<string, string> = {
    'giardinaggio': 'Giardinaggio',
    'utensili': 'Utensili',
    'per-la-casa': 'Per la Casa',
    'elettronica': 'Elettronica'
  };

  const categoryName = categoryNames[params.slug];
  
  return {
    title: `${categoryName || 'Categoria'} - Shop Online`,
    description: `Scopri tutti i prodotti della categoria ${categoryName}. Prezzi competitivi e spedizione gratuita.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Map slug to display name
  const categoryNames: Record<string, string> = {
    'giardinaggio': 'Giardinaggio',
    'utensili': 'Utensili',
    'per-la-casa': 'Per la Casa',
    'elettronica': 'Elettronica'
  };

  const categoryName = categoryNames[params.slug];
  if (!categoryName) {
    notFound();
  }

  // Get products for this category from database
  const categoryProducts = await getProductsByCategory(params.slug);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-[1500px] mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
            <p className="text-xl opacity-90">
              Scopri tutti i prodotti della categoria {categoryName}
            </p>
          </div>
        </div>

        {/* Pass products to client component for filtering/sorting */}
        <CategoryClient 
          products={categoryProducts} 
          categoryName={categoryName}
          categorySlug={params.slug}
        />
      </div>
      <Footer />
    </>
  );
}