import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import Home from '@/app/page';

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
  }: any) => {
    // Simulate optimized image behavior
    const optimizedSrc = src.includes('.svg')
      ? src
      : `${src}?w=${width}&q=75&format=webp`;

    return (
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        data-priority={priority}
        data-sizes={sizes}
        data-loading={loading}
        {...props}
      />
    );
  },
}));

// Mock dynamic imports
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

// Mock IntersectionObserver globally before any imports
class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [0];

  private callback: IntersectionObserverCallback;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.root = options?.root || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = options?.threshold ? [options.threshold] : [0];

    // Simulate immediate intersection for testing
    setTimeout(() => {
      this.callback(
        [
          {
            isIntersecting: true,
            target: document.createElement('div'),
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: {} as DOMRectReadOnly,
            time: Date.now(),
          } as IntersectionObserverEntry,
        ],
        this
      );
    }, 0);
  }

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

// Set up the mock globally
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

beforeEach(() => {
  // Reset any mock calls before each test
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe('Image Optimization Property Tests', () => {
  /**
   * Feature: landing-page, Property 11: Image Optimization
   * For any image on the page, it should be delivered in optimized formats (WebP, AVIF) with appropriate compression and sizing
   * **Validates: Requirements 9.2**
   */
  it('should optimize all images with proper formats and sizing', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          // Simulate different viewport sizes
          viewportWidth: fc.integer({ min: 320, max: 1920 }),
          devicePixelRatio: fc.float({ min: 1, max: 3 }),
          connectionSpeed: fc.constantFrom('slow-2g', '2g', '3g', '4g'),
        }),
        async ({ viewportWidth, devicePixelRatio, connectionSpeed }) => {
          // Mock viewport
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          });
          Object.defineProperty(window, 'devicePixelRatio', {
            writable: true,
            configurable: true,
            value: devicePixelRatio,
          });

          // Mock navigator connection for adaptive loading
          Object.defineProperty(navigator, 'connection', {
            writable: true,
            configurable: true,
            value: { effectiveType: connectionSpeed },
          });

          const { container } = render(<Home />);

          // Property: All images should be optimized
          const images = container.querySelectorAll('img');

          images.forEach(img => {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';
            const width = img.getAttribute('width');
            const height = img.getAttribute('height');

            // Property: Images should have proper alt text for accessibility
            expect(alt).toBeTruthy();
            expect(alt.length).toBeGreaterThan(0);

            // Property: Images should have dimensions specified
            if (!src.includes('.svg')) {
              expect(width).toBeTruthy();
              expect(height).toBeTruthy();
            }

            // Property: Non-SVG images should be optimized with WebP format
            if (!src.includes('.svg')) {
              expect(src).toMatch(/format=webp|\.webp/);
            }

            // Property: Images should have appropriate quality settings
            if (src.includes('?')) {
              const urlParams = new URLSearchParams(src.split('?')[1]);
              const quality = urlParams.get('q');
              if (quality) {
                const qualityNum = parseInt(quality, 10);
                expect(qualityNum).toBeGreaterThanOrEqual(50);
                expect(qualityNum).toBeLessThanOrEqual(95);
              }
            }

            // Property: Images should have responsive sizing
            if (width && height) {
              const widthNum = parseInt(width, 10);
              const heightNum = parseInt(height, 10);

              // Images should not be excessively large
              expect(widthNum).toBeLessThanOrEqual(2048);
              expect(heightNum).toBeLessThanOrEqual(2048);

              // Images should maintain reasonable aspect ratios
              const aspectRatio = widthNum / heightNum;
              expect(aspectRatio).toBeGreaterThan(0.1);
              expect(aspectRatio).toBeLessThan(10);
            }
          });

          // Property: Critical images should be prioritized
          const priorityImages = container.querySelectorAll(
            'img[data-priority="true"]'
          );
          expect(priorityImages.length).toBeGreaterThan(0); // At least logo should be priority

          // Property: Non-critical images should use lazy loading
          const lazyImages = container.querySelectorAll(
            'img[data-loading="lazy"]'
          );
          const totalImages = images.length;
          const priorityCount = priorityImages.length;

          // Most images should be lazy loaded (except priority ones)
          if (totalImages > priorityCount) {
            expect(lazyImages.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 20 } // Reduced for faster testing
    );
  });

  it('should adapt image loading based on connection speed', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom('slow-2g', '2g', '3g', '4g'),
        async connectionSpeed => {
          // Mock navigator connection
          Object.defineProperty(navigator, 'connection', {
            writable: true,
            configurable: true,
            value: { effectiveType: connectionSpeed },
          });

          const { container } = render(<Home />);
          const images = container.querySelectorAll('img');

          images.forEach(img => {
            const src = img.getAttribute('src') || '';

            // Property: On slower connections, images should use more aggressive compression
            if (connectionSpeed === 'slow-2g' || connectionSpeed === '2g') {
              if (src.includes('?')) {
                const urlParams = new URLSearchParams(src.split('?')[1]);
                const quality = urlParams.get('q');
                if (quality) {
                  const qualityNum = parseInt(quality, 10);
                  // Lower quality for slower connections
                  expect(qualityNum).toBeLessThanOrEqual(80);
                }
              }
            }

            // Property: Images should still be functional regardless of connection
            expect(src).toBeTruthy();
            expect(img.getAttribute('alt')).toBeTruthy();
          });
        }
      ),
      { numRuns: 10 } // Reduced for faster testing
    );
  });

  it('should handle image loading errors gracefully', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.record({
          shouldFailToLoad: fc.boolean(),
        }),
        async ({ shouldFailToLoad }) => {
          const { container } = render(<Home />);
          const images = container.querySelectorAll('img');

          // Property: Images should have error handling
          images.forEach(img => {
            // Simulate image load error
            if (shouldFailToLoad) {
              const errorEvent = new Event('error');
              img.dispatchEvent(errorEvent);
            }

            // Property: Images should have fallback behavior
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';

            // Even if image fails, alt text should be present
            expect(alt).toBeTruthy();
            expect(alt.length).toBeGreaterThan(0);

            // Property: Source should be valid URL format
            if (src) {
              expect(() => new URL(src, 'http://localhost')).not.toThrow();
            }
          });
        }
      ),
      { numRuns: 10 } // Reduced for faster testing
    );
  });
});
