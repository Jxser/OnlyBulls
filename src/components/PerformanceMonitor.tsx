'use client';

import { usePerformanceMonitoring } from '@/lib/performance';

export default function PerformanceMonitor() {
  usePerformanceMonitoring();

  return null; // This component doesn't render anything
}
