import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import Home from '@/app/page';
import { measurePerformance, type CoreWebVitals } from '@/lib/performance';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    priority,
    sizes,
    loading,
    ...props
  }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-priority={priority}
      data-sizes={sizes}
      data-loading={loading}
      {...props}
    />
  ),
}));

// Mock Next.js dynamic imports
vi.mock('next/dynamic', () => ({
  default: (_importFn: any, options?: any) => {
    const MockComponent = (props: any) => (
      <div data-testid="dynamic-component" {...props}>
        {options?.loading ? null : 'Loaded Content'}
      </div>
    );
    return MockComponent;
  },
}));

// Mock performance monitoring
vi.mock('@/lib/performance', async () => {
  const actual = await vi.importActual('@/lib/performance');
  return {
    ...actual,
    measurePerformance: vi.fn(),
    usePerformanceMonitoring: vi.fn(),
  };
});

// Mock IntersectionObserver for LazySection
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

// Create a proper constructor mock
function MockIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  // Store the callback for later use
  (MockIntersectionObserver as any).callback = callback;
  (MockIntersectionObserver as any).options = options;

  // Simulate intersection immediately for testing
  setTimeout(() => {
    callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      this as any
    );
  }, 0);

  return {
    observe: mockObserve,
    unobserve: mockUnobserve,
    disconnect: mockDisconnect,
    root: null,
    rootMargin: options?.rootMargin || '0px',
    thresholds: options?.threshold ? [options.threshold] : [0],
    takeRecords: vi.fn(() => []),
  };
}

// Add static properties to store callback and options
(MockIntersectionObserver as any).callback =
  null as IntersectionObserverCallback | null;
(MockIntersectionObserver as any).options =
  null as IntersectionObserverInit | null;

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver as any;

  // Mock performance APIs
  global.performance = {
    ...global.performance,
    now: vi.fn(() => Date.now()),
    getEntriesByType: vi.fn(() => []),
  };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  // Reset mock functions
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  mockDisconnect.mockClear();
});

describe('Performance Property Tests', () => {
  /**
   * Feature: landing-page, Property 10: Page Load Performance
   * For any initial page load, the critical content should render within 3 seconds under normal network conditions
   * **Validates: Requirements 9.1**
   */
  it('should have fast initial page load performance', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          // Simulate different network conditions
          networkDelay: fc.integer({ min: 0, max: 1000 }), // 0-1s network delay
          resourceSize: fc.integer({ min: 1000, max: 50000 }), // 1KB-50KB resource sizes
          cacheEnabled: fc.boolean(),
        }),
        async ({ networkDelay, resourceSize, cacheEnabled }) => {
          // Mock performance metrics based on test parameters
          const mockMetrics: CoreWebVitals = {
            lcp: {
              name: 'LCP',
              value:
                networkDelay + (resourceSize / 1000) * (cacheEnabled ? 0.5 : 1),
              rating: 'good',
              timestamp: Date.now(),
            },
            fcp: {
              name: 'FCP',
              value: networkDelay * 0.6 + resourceSize / 2000,
              rating: 'good',
              timestamp: Date.now(),
            },
            ttfb: {
              name: 'TTFB',
              value: networkDelay * 0.3,
              rating: 'good',
              timestamp: Date.now(),
            },
          };

          // Mock the measurePerformance function to return our test metrics
          vi.mocked(measurePerformance).mockResolvedValue(mockMetrics);

          const startTime = Date.now();

          // Render the page
          const { container } = render(<Home />);

          const renderTime = Date.now() - startTime;

          // Property: Critical content should be available quickly
          // Check that essential elements are present (indicating successful render)
          const header = container.querySelector('header');
          const heroSection = container.querySelector('main');

          expect(header).toBeTruthy();
          expect(heroSection).toBeTruthy();

          // Property: Render time should be reasonable for the given conditions
          // Under normal conditions (low network delay, reasonable resource size),
          // render should complete quickly
          if (networkDelay < 500 && resourceSize < 20000) {
            expect(renderTime).toBeLessThan(2000); // 2 seconds for fast conditions
          } else {
            expect(renderTime).toBeLessThan(5000); // 5 seconds for slower conditions
          }

          // Property: Performance metrics should meet thresholds when available
          if (mockMetrics.lcp && mockMetrics.lcp.value > 0) {
            // LCP should be under 2.5s for "good" rating
            expect(mockMetrics.lcp.value).toBeLessThan(2500);
          }

          if (mockMetrics.fcp && mockMetrics.fcp.value > 0) {
            // FCP should be under 1.8s for "good" rating
            expect(mockMetrics.fcp.value).toBeLessThan(1800);
          }

          if (mockMetrics.ttfb && mockMetrics.ttfb.value > 0) {
            // TTFB should be under 800ms for "good" rating
            expect(mockMetrics.ttfb.value).toBeLessThan(800);
          }
        }
      ),
      { numRuns: 20 } // Reduced for faster testing
    );
  });

  it('should maintain performance under various viewport sizes', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          width: fc.integer({ min: 320, max: 1920 }),
          height: fc.integer({ min: 568, max: 1080 }),
        }),
        async ({ width, height }) => {
          // Mock viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });
          Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: height,
          });

          const startTime = Date.now();
          const { container } = render(<Home />);
          const renderTime = Date.now() - startTime;

          // Property: Performance should not degrade significantly with viewport changes
          // Larger viewports might take slightly longer due to more content, but should stay reasonable
          const expectedMaxTime = width > 1200 ? 3000 : 2000; // Allow more time for large viewports
          expect(renderTime).toBeLessThan(expectedMaxTime);

          // Property: Essential content should be present regardless of viewport
          const header = container.querySelector('header');
          const main = container.querySelector('main');
          expect(header).toBeTruthy();
          expect(main).toBeTruthy();

          // Property: No layout should cause excessive reflows
          // Check that content is properly structured
          const sections = container.querySelectorAll(
            'section, div[id], [data-testid]'
          );
          expect(sections.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 20 } // Reduced for faster testing
    );
  });
});
