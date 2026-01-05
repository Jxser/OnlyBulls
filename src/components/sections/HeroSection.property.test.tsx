import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import HeroSection from './HeroSection';

describe('HeroSection Property-Based Tests', () => {
  describe('Property 1: Hero Section Content Validation', () => {
    it('should display transformation-focused subheadline content that emphasizes user outcomes rather than technical features', () => {
      // Feature: landing-page, Property 1: Hero Section Content Validation
      // **Validates: Requirements 1.2**

      const callbackArbitrary = fc.option(fc.func(fc.constant(undefined)), {
        nil: undefined,
      });

      fc.assert(
        fc.property(
          callbackArbitrary,
          callbackArbitrary,
          (onPrimaryCTAClick, onSecondaryCTAClick) => {
            const { container } = render(
              <HeroSection
                onPrimaryCTAClick={onPrimaryCTAClick}
                onSecondaryCTAClick={onSecondaryCTAClick}
              />
            );

            // Verify the exact headline text from requirements is present
            const headlines = container.querySelectorAll('h1');
            const mainHeadline = Array.from(headlines).find(
              h =>
                h.textContent?.includes(
                  '24/7 AI Market Agent That Helps You'
                ) && h.classList.contains('text-4xl')
            );
            expect(mainHeadline).toBeInTheDocument();
            expect(mainHeadline?.textContent).toContain(
              '24/7 AI Market Agent That Helps You Spot Opportunities and Execute Trades Smarter'
            );

            // Find the subheadline element
            const subheadline = container.querySelector('p');
            expect(subheadline).toBeInTheDocument();

            const subheadlineText = subheadline?.textContent || '';

            // Verify transformation-focused messaging - should emphasize user outcomes
            const userOutcomeKeywords = [
              'transform',
              'confident',
              'save time',
              'reduce anxiety',
              'better performance',
              'stressed',
              'decisions',
            ];

            // At least 3 user outcome keywords should be present
            const outcomeKeywordsFound = userOutcomeKeywords.filter(keyword =>
              subheadlineText.toLowerCase().includes(keyword.toLowerCase())
            );
            expect(outcomeKeywordsFound.length).toBeGreaterThanOrEqual(3);

            // Verify it focuses on transformation (from problem to solution)
            const transformationIndicators = ['from', 'to', 'transform'];
            const hasTransformationLanguage = transformationIndicators.some(
              indicator =>
                subheadlineText.toLowerCase().includes(indicator.toLowerCase())
            );
            expect(hasTransformationLanguage).toBe(true);

            // Verify it avoids technical jargon and focuses on benefits
            const technicalTerms = [
              'algorithm',
              'api',
              'machine learning',
              'neural network',
              'database',
              'server',
              'cloud',
              'infrastructure',
            ];

            const technicalTermsFound = technicalTerms.filter(term =>
              subheadlineText.toLowerCase().includes(term.toLowerCase())
            );

            // Should have minimal or no technical terms (max 1 allowed)
            expect(technicalTermsFound.length).toBeLessThanOrEqual(1);

            // Verify emotional/outcome language is present
            const emotionalOutcomeWords = [
              'confident',
              'anxiety',
              'stressed',
              'better',
              'improve',
              'save',
              'reduce',
              'achieve',
              'personal',
            ];

            const emotionalWordsFound = emotionalOutcomeWords.filter(word =>
              subheadlineText.toLowerCase().includes(word.toLowerCase())
            );

            // Should have at least 2 emotional/outcome words
            expect(emotionalWordsFound.length).toBeGreaterThanOrEqual(2);

            // Verify the subheadline is properly positioned and styled
            expect(subheadline).toHaveClass('text-xl');
            expect(subheadline).toHaveClass('sm:text-2xl');
            expect(subheadline).toHaveClass('text-gray-600');
            expect(subheadline).toHaveClass('leading-relaxed');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain consistent content structure and messaging across all render states', () => {
      // Feature: landing-page, Property 1: Hero Section Content Validation (Extended)
      // **Validates: Requirements 1.2**

      const callbackArbitrary = fc.option(fc.func(fc.constant(undefined)), {
        nil: undefined,
      });

      fc.assert(
        fc.property(
          callbackArbitrary,
          callbackArbitrary,
          (onPrimaryCTAClick, onSecondaryCTAClick) => {
            const { container } = render(
              <HeroSection
                onPrimaryCTAClick={onPrimaryCTAClick}
                onSecondaryCTAClick={onSecondaryCTAClick}
              />
            );

            // Verify all required content elements are present
            const section = container.querySelector('section');
            expect(section).toBeInTheDocument();

            // Check for Only Bulls logo/brand
            const brandElement = container.querySelector('h1');
            expect(brandElement).toBeInTheDocument();
            expect(brandElement?.textContent).toContain('Only Bulls');

            // Check for main headline
            const headlines = container.querySelectorAll('h1');
            const mainHeadline = Array.from(headlines).find(h =>
              h.textContent?.includes('24/7 AI Market Agent')
            );
            expect(mainHeadline).toBeInTheDocument();

            // Check for subheadline
            const subheadline = container.querySelector('p');
            expect(subheadline).toBeInTheDocument();
            expect(subheadline?.textContent?.length).toBeGreaterThan(50); // Substantial content

            // Check for CTA buttons
            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBeGreaterThanOrEqual(2);

            // Verify trust signals are present
            const trustSignals = container.querySelectorAll(
              '[class*="animate-pulse"], [class*="bg-green-500"], [class*="bg-blue-500"], [class*="bg-indigo-500"]'
            );
            expect(trustSignals.length).toBeGreaterThan(0);

            // Verify responsive design classes
            expect(section).toHaveClass('py-20');
            expect(section).toHaveClass('px-4');
            expect(section).toHaveClass('sm:px-6');
            expect(section).toHaveClass('lg:px-8');

            // Verify background styling for visual appeal
            expect(section).toHaveClass('bg-gradient-to-br');
            expect(section).toHaveClass('from-blue-50');
            expect(section).toHaveClass('via-white');
            expect(section).toHaveClass('to-indigo-50');
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2: CTA Navigation Behavior', () => {
    it('should navigate to appropriate signup, trial, or early access form for any primary CTA button click', () => {
      // Feature: landing-page, Property 2: CTA Navigation Behavior
      // **Validates: Requirements 1.5**

      const callbackArbitrary = fc.option(fc.func(fc.constant(undefined)), {
        nil: undefined,
      });

      fc.assert(
        fc.property(
          callbackArbitrary,
          callbackArbitrary,
          (onPrimaryCTAClick, onSecondaryCTAClick) => {
            // Mock scrollIntoView since it's not available in jsdom
            const mockScrollIntoView = vi.fn();
            Object.defineProperty(Element.prototype, 'scrollIntoView', {
              value: mockScrollIntoView,
              writable: true,
            });

            // Mock getElementById to simulate form sections existing
            const mockGetElementById = vi.fn();
            const mockSignupForm = { scrollIntoView: mockScrollIntoView };
            const mockEarlyAccess = { scrollIntoView: mockScrollIntoView };

            mockGetElementById.mockImplementation((id: string) => {
              if (id === 'signup-form') return mockSignupForm;
              if (id === 'early-access') return mockEarlyAccess;
              return null;
            });

            Object.defineProperty(document, 'getElementById', {
              value: mockGetElementById,
              writable: true,
            });

            const { container } = render(
              <HeroSection
                onPrimaryCTAClick={onPrimaryCTAClick}
                onSecondaryCTAClick={onSecondaryCTAClick}
              />
            );

            // Find CTA buttons
            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBeGreaterThanOrEqual(2);

            const primaryCTA = Array.from(buttons).find(button =>
              button.textContent?.includes('Start Free Trial')
            );
            const secondaryCTA = Array.from(buttons).find(button =>
              button.textContent?.includes('Request Early Access')
            );

            expect(primaryCTA).toBeInTheDocument();
            expect(secondaryCTA).toBeInTheDocument();

            // Test primary CTA click behavior
            if (primaryCTA) {
              primaryCTA.click();

              // Should attempt to find and scroll to signup form
              expect(mockGetElementById).toHaveBeenCalledWith('signup-form');
              expect(mockScrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
              });

              // Note: We can't test callback invocation with fast-check generated functions
              // as they are not spies. The callback behavior is tested through DOM interactions.
            }

            // Reset mocks for secondary CTA test
            mockGetElementById.mockClear();
            mockScrollIntoView.mockClear();

            // Test secondary CTA click behavior
            if (secondaryCTA) {
              secondaryCTA.click();

              // Should attempt to find and scroll to early access form
              expect(mockGetElementById).toHaveBeenCalledWith('early-access');
              expect(mockScrollIntoView).toHaveBeenCalledWith({
                behavior: 'smooth',
              });

              // Note: We can't test callback invocation with fast-check generated functions
              // as they are not spies. The callback behavior is tested through DOM interactions.
            }

            // Cleanup mocks
            vi.restoreAllMocks();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain consistent CTA behavior across all button configurations', () => {
      // Feature: landing-page, Property 2: CTA Navigation Behavior (Extended)
      // **Validates: Requirements 1.5**

      const callbackArbitrary = fc.option(fc.func(fc.constant(undefined)), {
        nil: undefined,
      });

      fc.assert(
        fc.property(
          callbackArbitrary,
          callbackArbitrary,
          (onPrimaryCTAClick, onSecondaryCTAClick) => {
            const { container } = render(
              <HeroSection
                onPrimaryCTAClick={onPrimaryCTAClick}
                onSecondaryCTAClick={onSecondaryCTAClick}
              />
            );

            // Verify both CTA buttons are present and properly configured
            const buttons = container.querySelectorAll('button');
            expect(buttons.length).toBe(2);

            const primaryCTA = Array.from(buttons).find(button =>
              button.textContent?.includes('Start Free Trial')
            );
            const secondaryCTA = Array.from(buttons).find(button =>
              button.textContent?.includes('Request Early Access')
            );

            // Both buttons should exist
            expect(primaryCTA).toBeInTheDocument();
            expect(secondaryCTA).toBeInTheDocument();

            // Both buttons should be clickable (not disabled)
            expect(primaryCTA).not.toBeDisabled();
            expect(secondaryCTA).not.toBeDisabled();

            // Both buttons should have proper button type
            expect(primaryCTA).toHaveAttribute('type', 'button');
            expect(secondaryCTA).toHaveAttribute('type', 'button');

            // Primary CTA should have primary styling
            expect(primaryCTA).toHaveClass('bg-blue-600');
            expect(primaryCTA).toHaveClass('text-white');

            // Secondary CTA should have outline styling
            expect(secondaryCTA).toHaveClass('border');
            expect(secondaryCTA).toHaveClass('border-gray-300');
            expect(secondaryCTA).toHaveClass('bg-white');

            // Both should have proper touch-friendly sizing
            expect(primaryCTA).toHaveClass('min-h-[52px]');
            expect(secondaryCTA).toHaveClass('min-h-[52px]');
            expect(primaryCTA).toHaveClass('min-w-[44px]');
            expect(secondaryCTA).toHaveClass('min-w-[44px]');

            // Both should have touch manipulation for mobile
            expect(primaryCTA).toHaveClass('touch-manipulation');
            expect(secondaryCTA).toHaveClass('touch-manipulation');

            // Both should have proper focus styles for accessibility
            expect(primaryCTA).toHaveClass('focus:ring-2');
            expect(secondaryCTA).toHaveClass('focus:ring-2');
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
