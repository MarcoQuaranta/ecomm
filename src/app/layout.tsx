import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Suspense } from "react";
import siteConfig from "../../site.config";

// Font sans-serif
const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Font monospace
const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultMetaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="light" style={{ colorScheme: 'light' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
