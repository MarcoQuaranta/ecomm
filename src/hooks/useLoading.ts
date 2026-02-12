'use client';

import { useState, useCallback } from 'react';

// Global loading state management
let globalLoadingCount = 0;
let loadingListeners: Set<(loading: boolean) => void> = new Set();

const notifyListeners = (loading: boolean) => {
  loadingListeners.forEach(listener => listener(loading));
};

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    globalLoadingCount++;
    setIsLoading(true);
    notifyListeners(true);
  }, []);

  const stopLoading = useCallback(() => {
    globalLoadingCount--;
    if (globalLoadingCount <= 0) {
      globalLoadingCount = 0;
      setIsLoading(false);
      
      // Delay slightly to ensure UI updates
      setTimeout(() => {
        if (globalLoadingCount === 0) {
          notifyListeners(false);
        }
      }, 100);
    }
  }, []);

  const withLoading = useCallback(async <T,>(promise: Promise<T>): Promise<T> => {
    startLoading();
    try {
      const result = await promise;
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
}