import React from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'Inspectra™ 360 Ultra - Kamera inspekcyjna z obrotową końcówką 360°',
  description: 'Profesjonalna kamera inspekcyjna z końcówką 360° Flex-Lock, podwójnym obiektywem i ekranem 5" IPS HD.',
};

export default function Inspectra360PlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Ads Tracking */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17261661993"
        strategy="afterInteractive"
      />
      {/* Network Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Script id="google-ads-inspectra-pl" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17261661993');
        `}
      </Script>
      {children}
    </>
  );
}
