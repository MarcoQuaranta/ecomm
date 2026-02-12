'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Inizia il loading quando cambia la route
    handleStart();

    // Ferma il loading quando la pagina è caricata
    const timer = setTimeout(() => {
      handleComplete();
    }, 100);

    return () => {
      clearTimeout(timer);
      handleComplete();
    };
  }, [pathname, searchParams]);

  return isLoading;
}