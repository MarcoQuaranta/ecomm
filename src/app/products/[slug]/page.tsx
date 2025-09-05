import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import SoffiatoreLP from '@/app/soffiatore/page';
import CondizioLP from '@/app/condizio/page';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const landingComponents: Record<string, React.ComponentType> = {
  SoffiatoreLP: SoffiatoreLP,
  CondizioLP: CondizioLP,
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const LandingComponent = landingComponents[product.landingPageComponent];

  if (!LandingComponent) {
    notFound();
  }

  return <LandingComponent />;
}

export async function generateStaticParams() {
  const { products } = await import('@/lib/products');
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Prodotto non trovato',
      description: 'Il prodotto richiesto non è disponibile.',
    };
  }

  return {
    title: product.seo.title,
    description: product.seo.description,
    keywords: product.seo.keywords.join(', '),
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}