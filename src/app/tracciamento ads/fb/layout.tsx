import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Inspectra™ 360 Ultra - Kamera inspekcyjna z obrotową końcówką 360°",
  description: "Profesjonalna kamera inspekcyjna z końcówką 360° Flex-Lock, podwójnym obiektywem i ekranem 5\" IPS HD.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalInspectraPlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-inspectra-pl-page">
      {/* Network Fingerprint Script */}
      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {children}
    </div>
  );
}
