import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Aerial TV - Canali TV Gratuiti in Alta Definizione | Ketronica",
  description: "Goditi la TV gratuita in qualità 4K/Full HD senza canoni mensili. Smart Aerial TV con captazione omnidirezionale a 360°, setup rapido in 2 minuti. Consegna veloce gratuita, paghi alla consegna.",
};

export default function DongleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
