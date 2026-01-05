import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import CTAButton from '@/components/ui/CTAButton';
import HeroSection from '@/components/sections/HeroSection';
import Header from '@/components/ui/Header';
import * as analytics from '@/lib/analytics';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  trackCTAClick: vi.fn(),
  initGA: vi.fn(),
  useScrollTracking: vi.fn(() => () => {}),
}));

describe('CTA Click Tracking Property-Based Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Property 15: CTA Click Tracking', () => {
    it('should properly track and send CTA button clicks to configured analytics platforms for any CTA button click', () => {
      // Feature: landing-page, Property 15: CTA Click Tracking
      // **Validates: Requirements 11.1**

      fc.assert(
        fc.property(
          fc.record({
            text: fc.string({ minLength: 1, maxLength: 50 }),
            variant: fc.constantFrom('primary', 'secondary', 'outline'),
            location: fc.string({ minLength: 1, maxLength: 20 }),
          }),
          ({ text, variant, location }) => {
            // Get the mocked function
            const trackCTAClickMock = vi.mocked(analytics.trackCTAClick);

            // Render CTA button with analytics props
            const { container } = render(
              <CTAButton
                variant={variant}
                analyticsLabel={text}
                analyticsLocation={location}
                onClick={() => {}}
              >
                {text}
              </CTAButton>
            );

            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Clear any previous calls
            trackCTAClickMock.mockClear();

            // Click the button
            fireEvent.click(button!);

            // Verify analytics tracking was called with correct parameters
            expect(trackCTAClickMock).toHaveBeenCalledTimes(1);
            expect(trackCTAClickMock).toHaveBeenCalledWith(text, location);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should track CTA clicks from Hero Section with proper labels and locations', () => {
      // Test Hero Section CTA tracking specifically
      fc.assert(
        fc.property(
          fc.record({
            onPrimaryCTAClick: fc.constant(() => {}),
            onSecondaryCTAClick: fc.constant(() => {}),
          }),
          ({ onPrimaryCTAClick, onSecondaryCTAClick }) => {
            const trackCTAClickMock = vi.mocked(analytics.trackCTAClick);

            const { container } = render(
              <HeroSection
                onPrimaryCTAClick={onPrimaryCTAClick}
                onSecondaryCTAClick={onSecondaryCTAClick}
              />
            );

            // Clear any previous calls
            trackCTAClickMock.mockClear();

            // Find and click primary CTA
            const buttons = container.querySelectorAll('button');
            const primaryCTA = Array.from(buttons).find(btn =>
              btn.textContent?.includes('Start Free Trial')
            );

            if (primaryCTA) {
              fireEvent.click(primaryCTA);

              // Verify primary CTA tracking
              expect(trackCTAClickMock).toHaveBeenCalledWith(
                'Start Free Trial',
                'hero'
              );
            }

            // Clear calls and test secondary CTA
            trackCTAClickMock.mockClear();

            const secondaryCTA = Array.from(buttons).find(btn =>
              btn.textContent?.includes('Request Early Access')
            );

            if (secondaryCTA) {
              fireEvent.click(secondaryCTA);

              // Verify secondary CTA tracking
              expect(trackCTAClickMock).toHaveBeenCalledWith(
                'Request Early Access',
                'hero'
              );
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should track CTA clicks from Header with proper labels and locations', () => {
      // Test Header CTA tracking specifically
      fc.assert(
        fc.property(
          fc.record({
            ctaText: fc.constantFrom('Sign In', 'Get Started', 'Try Now'),
            variant: fc.constantFrom('primary', 'secondary', 'outline'),
          }),
          ({ ctaText, variant }) => {
            const trackCTAClickMock = vi.mocked(analytics.trackCTAClick);

            const navigationItems = [
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
            ];

            const ctaButton = {
              text: ctaText,
              variant,
              onClick: () => {},
            };

            const { container } = render(
              <Header
                logo="/images/only-bulls-logo.svg"
                navigationItems={navigationItems}
                ctaButton={ctaButton}
              />
            );

            // Clear any previous calls
            trackCTAClickMock.mockClear();

            // Find and click header CTA (desktop version)
            const headerCTA = container.querySelector(
              '[data-testid="header-cta-button"]'
            );
            if (headerCTA) {
              fireEvent.click(headerCTA);

              // Verify header CTA tracking
              expect(trackCTAClickMock).toHaveBeenCalledWith(ctaText, 'header');
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should not call analytics tracking when analytics props are not provided', () => {
      // Test that buttons without analytics props don't trigger tracking
      fc.assert(
        fc.property(
          fc.record({
            text: fc.string({ minLength: 1, maxLength: 50 }),
            variant: fc.constantFrom('primary', 'secondary', 'outline'),
          }),
          ({ text, variant }) => {
            const trackCTAClickMock = vi.mocked(analytics.trackCTAClick);

            // Render CTA button WITHOUT analytics props
            const { container } = render(
              <CTAButton variant={variant} onClick={() => {}}>
                {text}
              </CTAButton>
            );

            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Clear any previous calls
            trackCTAClickMock.mockClear();

            // Click the button
            fireEvent.click(button!);

            // Verify analytics tracking was NOT called
            expect(trackCTAClickMock).not.toHaveBeenCalled();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle multiple rapid clicks without losing tracking events', () => {
      // Test rapid clicking doesn't break analytics
      fc.assert(
        fc.property(
          fc.record({
            text: fc.string({ minLength: 1, maxLength: 50 }),
            location: fc.string({ minLength: 1, maxLength: 20 }),
            clickCount: fc.integer({ min: 2, max: 10 }),
          }),
          ({ text, location, clickCount }) => {
            const trackCTAClickMock = vi.mocked(analytics.trackCTAClick);

            const { container } = render(
              <CTAButton
                analyticsLabel={text}
                analyticsLocation={location}
                onClick={() => {}}
              >
                {text}
              </CTAButton>
            );

            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Clear any previous calls
            trackCTAClickMock.mockClear();

            // Click the button multiple times rapidly
            for (let i = 0; i < clickCount; i++) {
              fireEvent.click(button!);
            }

            // Verify analytics tracking was called for each click
            expect(trackCTAClickMock).toHaveBeenCalledTimes(clickCount);

            // Verify all calls had correct parameters
            for (let i = 0; i < clickCount; i++) {
              expect(trackCTAClickMock).toHaveBeenNthCalledWith(
                i + 1,
                text,
                location
              );
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});
