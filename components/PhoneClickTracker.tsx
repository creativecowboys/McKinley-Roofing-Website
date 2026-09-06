'use client';

import { useEffect } from 'react';
import { trackPhoneClick } from '@/lib/analytics';

/**
 * Sends a GA4 `phone_click` event whenever a tel: link is tapped.
 *
 * Mounted once in the root layout and implemented as a single delegated listener on
 * document rather than an onClick on each link — there are ~19 tel: links spread across
 * the header, footer, hero, service pages and location pages, and any new one picks this
 * up automatically.
 *
 * The listener is passive and never calls preventDefault, so the dialer still opens
 * exactly as before; if gtag is missing the event call is a no-op.
 */
export default function PhoneClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!link) return;

      // Normalise for reporting: the markup uses both tel:+16789834455 and
      // tel:6789834455, which would otherwise split into two rows in GA4.
      const raw = link.getAttribute('href')?.slice(4) ?? '';
      const digits = raw.replace(/\D/g, '');
      const normalised = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;

      trackPhoneClick(normalised);
    }

    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
