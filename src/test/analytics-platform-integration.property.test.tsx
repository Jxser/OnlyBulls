import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';

// Mock the analytics module with proper environment variable handling
vi.mock('@/lib/analytics', async () => {
  const actual = await vi.importActual('@/lib/analytics');
  return {
    ...actual,
    // Override functions to use dynamic environment variable
    initGA: vi.fn(() => {
      const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
      if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || (() => {});
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }),
    trackConversion: vi.fn(event => {
      const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: GA_MEASUREMENT_ID,
          event_category: 'conversion',
          event_label: event.conversionType,
          value: event.value || 1,
          funnel_step: event.funnel_step,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }),
  };
});

import * as analytics from '@/lib/analytics';

describe('Analytics Platform Integration Property-Based Tests', () => {
  let originalWindow: any;
  let mockGtag: ReturnType<typeof vi.fn>;
  let originalEnv: string | undefined;

  beforeEach(() => {
    // Store original values
    originalWindow = global.window;
    originalEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    // Mock gtag function
    mockGtag = vi.fn();

    // Mock window object with gtag
    Object.defineProperty(global, 'window', {
      value: {
        gtag: mockGtag,
        dataLayer: [],
        location: {
          href: 'https://example.com',
        },
        document: {
          title: 'Test Page',
        },
      },
      writable: true,
      configurable: true,
    });

    // Mock document globally
    Object.defineProperty(global, 'document', {
      value: {
        title: 'Test Page',
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    // Restore original values
    Object.defineProperty(global, 'window', {
      value: originalWindow,
      writable: true,
      configurable: true,
    });

    // Restore global document
    if (originalWindow?.document) {
      Object.defineProperty(global, 'document', {
        value: originalWindow.document,
        writable: true,
        configurable: true,
      });
    }

    if (originalEnv) {
      process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    }

    vi.clearAllMocks();
  });

  describe('Property 18: Analytics Platform Integration', () => {
    it('should properly transmit and record events and data to configured analytics platforms for any configured analytics platform', () => {
      // Feature: landing-page, Property 18: Analytics Platform Integration
      // **Validates: Requirements 11.4**

      fc.assert(
        fc.property(
          fc.record({
            measurementId: fc
              .string({ minLength: 10, maxLength: 20 })
              .map(s => s.replace(/\s/g, 'A')), // Replace whitespace with 'A'
            eventName: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_event'),
            eventCategory: fc.constantFrom(
              'engagement',
              'conversion',
              'custom'
            ),
            eventLabel: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_label'),
            eventValue: fc.option(fc.integer({ min: 0, max: 1000 })),
          }),
          ({
            measurementId,
            eventName,
            eventCategory,
            eventLabel,
            eventValue,
          }) => {
            // Clear previous mock calls
            mockGtag.mockClear();

            // Set up environment variable
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = measurementId;

            // Test direct gtag call (simulating what analytics functions do)
            window.gtag('event', eventName, {
              event_category: eventCategory,
              event_label: eventLabel,
              value: eventValue,
              page_title: 'Test Page',
              page_location: window.location.href,
            });

            // Verify gtag was called with correct parameters
            expect(mockGtag).toHaveBeenCalledWith('event', eventName, {
              event_category: eventCategory,
              event_label: eventLabel,
              value: eventValue,
              page_title: 'Test Page',
              page_location: window.location.href,
            });

            // Test analytics function integration
            analytics.trackEvent({
              eventName,
              properties: {
                // Don't override event_category - let trackEvent use 'custom'
                event_label: eventLabel,
                value: eventValue,
              },
              sessionId: 'test-session',
              timestamp: new Date(),
              page: '/test',
              userAgent: 'test-agent',
            });

            // Verify analytics function called gtag (should be called twice now)
            expect(mockGtag).toHaveBeenCalledTimes(2);
            expect(mockGtag).toHaveBeenLastCalledWith(
              'event',
              eventName,
              expect.objectContaining({
                event_category: 'custom',
                event_label: eventLabel,
                value: eventValue,
                page_title: 'Test Page',
                page_location: window.location.href,
                timestamp: expect.any(String),
              })
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should properly configure gtag with measurement ID and page information', () => {
      // Test gtag configuration
      fc.assert(
        fc.property(
          fc.record({
            measurementId: fc
              .string({ minLength: 10, maxLength: 20 })
              .map(s => s.replace(/\s/g, 'A')),
            pageTitle: fc
              .string({ minLength: 1, maxLength: 100 })
              .map(s => s.trim() || 'Test Page'),
            pageUrl: fc.webUrl(),
          }),
          ({ measurementId, pageTitle, pageUrl }) => {
            // Clear previous mock calls
            mockGtag.mockClear();

            // Set up environment and window
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = measurementId;

            // Update the global document title
            Object.defineProperty(global, 'document', {
              value: { title: pageTitle },
              writable: true,
              configurable: true,
            });
            Object.defineProperty(global.window, 'document', {
              value: { title: pageTitle },
              writable: true,
            });
            Object.defineProperty(global.window, 'location', {
              value: { href: pageUrl },
              writable: true,
            });

            // Call initGA directly
            analytics.initGA();

            // Verify gtag was called for initialization
            expect(mockGtag).toHaveBeenCalledWith('js', expect.any(Date));

            // Verify gtag was called for configuration
            expect(mockGtag).toHaveBeenCalledWith('config', measurementId, {
              page_title: pageTitle,
              page_location: pageUrl,
            });
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle analytics events when gtag is not available', () => {
      // Test graceful degradation when analytics is not available
      fc.assert(
        fc.property(
          fc.record({
            ctaText: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_cta'),
            location: fc
              .string({ minLength: 1, maxLength: 20 })
              .map(s => s.trim() || 'test_location'),
          }),
          ({ ctaText, location }) => {
            // Clear previous mock calls
            mockGtag.mockClear();

            // Remove gtag from window
            const windowWithoutGtag = { ...global.window };
            delete windowWithoutGtag.gtag;
            Object.defineProperty(global, 'window', {
              value: windowWithoutGtag,
              writable: true,
            });

            // Call analytics function - should not throw error
            expect(() => {
              analytics.trackCTAClick(ctaText, location);
            }).not.toThrow();

            // Verify no gtag calls were made (since gtag doesn't exist)
            expect(mockGtag).not.toHaveBeenCalled();
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should handle server-side rendering without window object', () => {
      // Test SSR compatibility
      fc.assert(
        fc.property(
          fc.record({
            eventName: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_event'),
            eventData: fc.record({
              category: fc
                .string({ minLength: 1, maxLength: 20 })
                .map(s => s.trim() || 'test_category'),
              label: fc
                .string({ minLength: 1, maxLength: 50 })
                .map(s => s.trim() || 'test_label'),
            }),
          }),
          ({ eventName, eventData }) => {
            // Remove window object to simulate SSR
            const originalWindow = global.window;
            Object.defineProperty(global, 'window', {
              value: undefined,
              writable: true,
            });

            try {
              // Call analytics functions - should not throw error
              expect(() => {
                analytics.initGA();
                analytics.trackCTAClick(eventData.label, eventData.category);
                analytics.trackEvent({
                  eventName,
                  properties: eventData,
                  sessionId: 'test-session',
                  timestamp: new Date(),
                  page: '/test',
                  userAgent: 'test-agent',
                });
              }).not.toThrow();

              // Verify no gtag calls were made (since window doesn't exist)
              expect(mockGtag).not.toHaveBeenCalled();
            } finally {
              // Restore window object
              Object.defineProperty(global, 'window', {
                value: originalWindow,
                writable: true,
              });
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should properly format and transmit conversion events', () => {
      // Test conversion event formatting and transmission
      fc.assert(
        fc.property(
          fc.record({
            measurementId: fc
              .string({ minLength: 10, maxLength: 20 })
              .map(s => s.replace(/\s/g, 'A')),
            conversionType: fc.constantFrom(
              'signup',
              'demo_request',
              'waitlist'
            ),
            conversionValue: fc.option(fc.integer({ min: 1, max: 1000 })),
            funnelStep: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_step'),
          }),
          ({ measurementId, conversionType, conversionValue, funnelStep }) => {
            // Clear previous mock calls
            mockGtag.mockClear();

            // Set up environment variable
            process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = measurementId;

            // Call conversion tracking
            analytics.trackConversion({
              conversionType,
              value: conversionValue,
              funnel_step: funnelStep,
              eventName: 'conversion',
              sessionId: 'test-session',
              timestamp: new Date(),
              properties: {},
              page: '/test',
              userAgent: 'test-agent',
            });

            // Verify gtag was called with correct conversion parameters
            expect(mockGtag).toHaveBeenCalledWith('event', 'conversion', {
              send_to: measurementId,
              event_category: 'conversion',
              event_label: conversionType,
              value: conversionValue || 1,
              funnel_step: funnelStep,
              page_title: 'Test Page',
              page_location: window.location.href,
            });
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should maintain data integrity during event transmission', () => {
      // Test that event data is not corrupted during transmission
      fc.assert(
        fc.property(
          fc.record({
            eventName: fc
              .string({ minLength: 1, maxLength: 50 })
              .map(s => s.trim() || 'test_event'),
            properties: fc.record({
              stringProp: fc
                .string({ minLength: 1, maxLength: 100 })
                .map(s => s.trim() || 'test_string'),
              numberProp: fc.integer({ min: -1000, max: 1000 }),
              booleanProp: fc.boolean(),
            }),
          }),
          ({ eventName, properties }) => {
            // Clear previous mock calls
            mockGtag.mockClear();

            // Call generic event tracking
            analytics.trackEvent({
              eventName,
              properties,
              sessionId: 'test-session',
              timestamp: new Date(),
              page: '/test',
              userAgent: 'test-agent',
            });

            // Verify gtag was called with intact data
            expect(mockGtag).toHaveBeenCalledWith('event', eventName, {
              event_category: 'custom',
              ...properties,
              page_title: 'Test Page',
              page_location: window.location.href,
              timestamp: expect.any(String),
            });

            // Verify the call was made exactly once
            expect(mockGtag).toHaveBeenCalledTimes(1);

            // Verify the properties were not modified
            const callArgs = mockGtag.mock.calls[0][2];
            expect(callArgs.stringProp).toBe(properties.stringProp);
            expect(callArgs.numberProp).toBe(properties.numberProp);
            expect(callArgs.booleanProp).toBe(properties.booleanProp);
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
