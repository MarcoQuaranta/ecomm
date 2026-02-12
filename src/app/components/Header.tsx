"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import siteConfig from "../../../site.config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/catalogo", label: "Catalogo" },
    { href: "/chi-siamo", label: "Chi Siamo" },
    { href: "/assistenza", label: "Contatti" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-orange-500">{siteConfig.siteName}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-orange-600"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assistenza"
              className="ml-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-500"
            >
              Contattaci
            </Link>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-3 border-t">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? "text-orange-600" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/assistenza"
              onClick={() => setIsOpen(false)}
              className="block mt-2 py-2 text-sm font-medium text-orange-600"
            >
              Contattaci
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
