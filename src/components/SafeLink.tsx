'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, MouseEvent, ReactNode } from 'react';

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}

export default function SafeLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  ...props 
}: SafeLinkProps) {
  const router = useRouter();
  const isNavigatingRef = useRef(false);
  const lastClickTimeRef = useRef(0);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now();
    
    // Previeni doppi click rapidi (entro 500ms)
    if (now - lastClickTimeRef.current < 500) {
      e.preventDefault();
      return;
    }
    
    // Previeni navigazione se già in corso
    if (isNavigatingRef.current) {
      e.preventDefault();
      return;
    }

    // Se c'è un onClick custom, eseguilo
    if (onClick) {
      onClick(e);
    }

    // Se non è un link esterno o con target
    if (!props.target && !href.startsWith('http')) {
      lastClickTimeRef.current = now;
      isNavigatingRef.current = true;
      
      // Reset del flag dopo 2 secondi (tempo massimo di navigazione)
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 2000);
    }
  };

  // Per link esterni o con target, usa il Link normale
  if (props.target || href.startsWith('http')) {
    return (
      <Link 
        href={href} 
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Per link interni, usa prefetch e ottimizzazioni
  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
      prefetch={true}
      {...props}
    >
      {children}
    </Link>
  );
}