'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { initGA, initScrollTracking } from '@/lib/analytics';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialize scroll tracking
    const cleanup = initScrollTracking();
    return cleanup;
  }, []);

  // Don't render anything if GA_MEASUREMENT_ID is not set
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          initGA();
        }}
      />
    </>
  );
}
