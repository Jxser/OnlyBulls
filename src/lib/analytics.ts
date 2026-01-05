'use client';

import { AnalyticsEvent, ConversionEvent } from '@/types';

// Google Analytics 4 configuration
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

// Declare gtag function type
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || [];

  // Define gtag function
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  // Initialize with current timestamp
  window.gtag('js', new Date());

  // Configure GA with measurement ID
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track CTA click events
export const trackCTAClick = (ctaText: string, location: string) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'cta_click', {
    event_category: 'engagement',
    event_label: ctaText,
    cta_location: location,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track form submission events
export const trackFormSubmission = (
  formType: 'signup' | 'demo_request' | 'waitlist',
  formLocation: string
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'form_submit', {
    event_category: 'conversion',
    event_label: formType,
    form_location: formLocation,
    page_title: document.title,
    page_location: window.location.href,
  });

  // Also track as conversion event
  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'conversion',
    event_label: formType,
    value: 1,
  });
};

// Track scroll depth and engagement
export const trackScrollDepth = (percentage: number) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  // Only track at specific milestones to avoid spam
  const milestones = [25, 50, 75, 90, 100];
  if (milestones.includes(percentage)) {
    window.gtag('event', 'scroll_depth', {
      event_category: 'engagement',
      event_label: `${percentage}%`,
      value: percentage,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page engagement time
export const trackEngagementTime = (timeInSeconds: number) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'engagement_time', {
    event_category: 'engagement',
    value: timeInSeconds,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track conversion funnel steps
export const trackFunnelStep = (
  step: string,
  stepNumber: number,
  conversionType: 'signup' | 'demo_request' | 'waitlist'
) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'funnel_step', {
    event_category: 'funnel',
    event_label: step,
    funnel_step: stepNumber,
    conversion_type: conversionType,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Generic event tracking function
export const trackEvent = (event: Partial<AnalyticsEvent>) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', event.eventName || 'custom_event', {
    event_category: 'custom',
    ...event.properties,
    page_title: document.title,
    page_location: window.location.href,
    timestamp: new Date().toISOString(),
  });
};

// Track conversion events
export const trackConversion = (event: Partial<ConversionEvent>) => {
  if (typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    event_category: 'conversion',
    event_label: event.conversionType,
    value: event.value || 1,
    funnel_step: event.funnel_step,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Hook for scroll depth tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') {
    return;
  }

  let maxScrollPercentage = 0;
  const engagementStartTime = Date.now();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

    if (scrollPercentage > maxScrollPercentage) {
      maxScrollPercentage = scrollPercentage;
      trackScrollDepth(scrollPercentage);
    }
  };

  const handleBeforeUnload = () => {
    const engagementTime = Math.round(
      (Date.now() - engagementStartTime) / 1000
    );
    trackEngagementTime(engagementTime);
  };

  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};
