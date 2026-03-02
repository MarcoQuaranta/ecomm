import Footer from '@/components/Footer';

export default function LandmirkoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
