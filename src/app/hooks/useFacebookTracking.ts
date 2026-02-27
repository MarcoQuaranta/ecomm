export function useFacebookTracking() {
  const trackLeadEvent = (data?: Record<string, unknown>) => {
    const w = window as any;
    if (w.fbq) {
      w.fbq('track', 'Lead', data || {});
    }
  };

  const saveUserData = (data: Record<string, unknown>) => {
    try {
      sessionStorage.setItem('userData', JSON.stringify(data));
    } catch {}
  };

  return { trackLeadEvent, saveUserData };
}
