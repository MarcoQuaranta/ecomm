'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/categories';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const router = useRouter();
  const category = getCategoryBySlug(params.slug);

  useEffect(() => {
    // Redirect to catalogo with category filter
    if (category) {
      router.replace(`/catalogo?categoria=${params.slug}`);
    } else {
      router.replace('/catalogo');
    }
  }, [category, params.slug, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Caricamento...</p>
      </div>
    </div>
  );
}
