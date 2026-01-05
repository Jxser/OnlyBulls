// Performance monitoring utilities for Core Web Vitals
import { useEffect } from 'react';

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

export interface CoreWebVitals {
  lcp?: PerformanceMetric; // Largest Contentful Paint
  fid?: PerformanceMetric; // First Input Delay
  cls?: PerformanceMetric; // Cumulative Layout Shift
  fcp?: PerformanceMetric; // First Contentful Paint
  ttfb?: PerformanceMetric; // Time to First Byte
}

// Core Web Vitals thresholds (Google's "Good" thresholds)
const THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 },
};

function getRating(
  value: number,
  thresholds: { good: number; poor: number }
): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
}

export function measurePerformance(): Promise<CoreWebVitals> {
  return new Promise(resolve => {
    const metrics: CoreWebVitals = {};

    // Use the web-vitals library approach if available, otherwise fallback to Performance API
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Measure LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            metrics.lcp = {
              name: 'LCP',
              value: lastEntry.startTime,
              rating: getRating(lastEntry.startTime, THRESHOLDS.lcp),
              timestamp: Date.now(),
            };
          }
        });
        lcpObserver.observe({
          type: 'largest-contentful-paint',
          buffered: true,
        });
      } catch {
        console.warn('LCP measurement not supported');
      }

      // Measure FID (First Input Delay)
      try {
        const fidObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              metrics.fid = {
                name: 'FID',
                value: fid,
                rating: getRating(fid, THRESHOLDS.fid),
                timestamp: Date.now(),
              };
            }
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch {
        console.warn('FID measurement not supported');
      }

      // Measure CLS (Cumulative Layout Shift)
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          metrics.cls = {
            name: 'CLS',
            value: clsValue,
            rating: getRating(clsValue, THRESHOLDS.cls),
            timestamp: Date.now(),
          };
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch {
        console.warn('CLS measurement not supported');
      }

      // Measure FCP (First Contentful Paint)
      try {
        const fcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = {
                name: 'FCP',
                value: entry.startTime,
                rating: getRating(entry.startTime, THRESHOLDS.fcp),
                timestamp: Date.now(),
              };
            }
          });
        });
        fcpObserver.observe({ type: 'paint', buffered: true });
      } catch {
        console.warn('FCP measurement not supported');
      }

      // Measure TTFB (Time to First Byte)
      try {
        const navigationEntries = performance.getEntriesByType(
          'navigation'
        ) as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const ttfb =
            navigationEntries[0].responseStart -
            navigationEntries[0].requestStart;
          metrics.ttfb = {
            name: 'TTFB',
            value: ttfb,
            rating: getRating(ttfb, THRESHOLDS.ttfb),
            timestamp: Date.now(),
          };
        }
      } catch {
        console.warn('TTFB measurement not supported');
      }

      // Resolve after a short delay to allow metrics to be collected
      setTimeout(() => resolve(metrics), 1000);
    } else {
      // Fallback for environments without PerformanceObserver
      resolve(metrics);
    }
  });
}

export function logPerformanceMetrics(metrics: CoreWebVitals) {
  console.group('🚀 Core Web Vitals');

  Object.entries(metrics).forEach(([, metric]) => {
    if (metric) {
      const emoji =
        metric.rating === 'good'
          ? '✅'
          : metric.rating === 'needs-improvement'
            ? '⚠️'
            : '❌';
      console.log(
        `${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`
      );
    }
  });

  console.groupEnd();
}

export function getPerformanceScore(metrics: CoreWebVitals): number {
  const scores: number[] = [];

  Object.values(metrics).forEach(metric => {
    if (metric) {
      switch (metric.rating) {
        case 'good':
          scores.push(100);
          break;
        case 'needs-improvement':
          scores.push(75);
          break;
        case 'poor':
          scores.push(50);
          break;
      }
    }
  });

  return scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
}

// Hook for React components to measure performance
export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only run in browser environment
      measurePerformance().then(metrics => {
        logPerformanceMetrics(metrics);

        // Send to analytics if available
        if (typeof (window as any).gtag === 'function') {
          Object.entries(metrics).forEach(([, metric]) => {
            if (metric) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'Performance',
                event_label: metric.name,
                value: Math.round(metric.value),
                custom_map: { metric_rating: metric.rating },
              });
            }
          });
        }
      });
    }
  }, []);
}
