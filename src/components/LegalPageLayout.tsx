import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LegalPageLayoutProps {
  title: string;
  lastUpdate?: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, lastUpdate, children }: LegalPageLayoutProps) {
  const currentDate = lastUpdate || new Date().toLocaleDateString('it-IT', { 
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
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <p className="text-sm text-gray-600 mb-8">Ultimo aggiornamento: {currentDate}</p>
            <div className="prose prose-gray max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}