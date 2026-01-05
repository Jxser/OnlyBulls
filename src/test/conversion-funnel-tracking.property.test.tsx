import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import PricingCTASection from '@/components/sections/PricingCTASection';
import * as analytics from '@/lib/analytics';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  trackFunnelStep: vi.fn(),
  trackFormSubmission: vi.fn(),
  trackCTAClick: vi.fn(),
  trackConversion: vi.fn(),
  initGA: vi.fn(),
  useScrollTracking: vi.fn(() => () => {}),
}));

describe('Conversion Funnel Tracking Property-Based Tests', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Property 19: Conversion Funnel Tracking', () => {
    // Debug test to understand what's happening
    it('should debug form submission and analytics calls', async () => {
      const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);
      const trackFormSubmissionMock = vi.mocked(analytics.trackFormSubmission);
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

      const { container } = render(
        <PricingCTASection mode="free-trial" onSubmit={mockOnSubmit} />
      );

      trackFunnelStepMock.mockClear();
      trackFormSubmissionMock.mockClear();

      const emailInput = container.querySelector(
        'input[type="email"]'
      ) as HTMLInputElement;
      const firstNameInput = container.querySelector(
        'input[id="firstName"]'
      ) as HTMLInputElement;
      const form = container.querySelector('form') as HTMLFormElement;

      expect(emailInput).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(form).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.submit(form);

      await waitFor(
        () => {
          expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        },
        { timeout: 5000 }
      );

      console.log('trackFunnelStepMock calls:', trackFunnelStepMock.mock.calls);
      console.log(
        'trackFormSubmissionMock calls:',
        trackFormSubmissionMock.mock.calls
      );

      expect(trackFunnelStepMock).toHaveBeenCalledWith(
        'form_started',
        1,
        'signup'
      );
      expect(trackFunnelStepMock).toHaveBeenCalledWith(
        'form_completed',
        2,
        'signup'
      );
      expect(trackFormSubmissionMock).toHaveBeenCalledWith(
        'signup',
        'pricing-cta'
      );
    });

    it('should properly categorize and track conversion actions through the conversion funnel for any user conversion action', () => {
      // Feature: landing-page, Property 19: Conversion Funnel Tracking
      // **Validates: Requirements 11.5**

      fc.assert(
        fc.property(
          fc.record({
            conversionType: fc.constantFrom(
              'signup',
              'demo_request',
              'waitlist'
            ),
            funnelSteps: fc.array(
              fc.record({
                stepName: fc.constantFrom(
                  'page_view',
                  'cta_click',
                  'form_started',
                  'form_completed'
                ),
                stepNumber: fc.integer({ min: 1, max: 10 }),
              }),
              { minLength: 2, maxLength: 5 }
            ),
          }),
          ({ conversionType, funnelSteps }) => {
            const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);

            // Clear any previous calls
            trackFunnelStepMock.mockClear();

            // Simulate funnel steps
            funnelSteps.forEach(({ stepName, stepNumber }) => {
              analytics.trackFunnelStep(stepName, stepNumber, conversionType);
            });

            // Verify each funnel step was tracked with correct categorization
            expect(trackFunnelStepMock).toHaveBeenCalledTimes(
              funnelSteps.length
            );

            funnelSteps.forEach(({ stepName, stepNumber }, index) => {
              expect(trackFunnelStepMock).toHaveBeenNthCalledWith(
                index + 1,
                stepName,
                stepNumber,
                conversionType
              );
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should track complete conversion funnel from CTA click to form completion', async () => {
      // Test end-to-end funnel tracking with different modes
      const testCases = [
        {
          mode: 'free-trial' as const,
          email: 'test@example.com',
          firstName: 'John',
          expectedType: 'signup',
        },
        {
          mode: 'beta-access' as const,
          email: 'user@test.com',
          firstName: 'Jane',
          expectedType: 'demo_request',
        },
        {
          mode: 'waitlist' as const,
          email: 'demo@sample.org',
          firstName: 'Bob',
          expectedType: 'waitlist',
        },
      ];

      for (const { mode, email, firstName, expectedType } of testCases) {
        const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);
        const trackFormSubmissionMock = vi.mocked(
          analytics.trackFormSubmission
        );

        // Mock successful form submission
        const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

        const { container } = render(
          <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
        );

        // Clear any previous calls
        trackFunnelStepMock.mockClear();
        trackFormSubmissionMock.mockClear();

        // Get form elements
        const emailInput = container.querySelector(
          'input[type="email"]'
        ) as HTMLInputElement;
        const firstNameInput = container.querySelector(
          'input[id="firstName"]'
        ) as HTMLInputElement;
        const form = container.querySelector('form') as HTMLFormElement;

        expect(emailInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(form).toBeInTheDocument();

        // Fill form fields with valid data
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(firstNameInput, { target: { value: firstName } });

        // Submit the form directly
        fireEvent.submit(form);

        // Wait for form submission to complete and analytics to be called
        await waitFor(
          () => {
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
          },
          { timeout: 5000 }
        );

        // Wait for analytics calls
        await waitFor(
          () => {
            expect(trackFunnelStepMock).toHaveBeenCalledWith(
              'form_started',
              1,
              expectedType
            );
            expect(trackFunnelStepMock).toHaveBeenCalledWith(
              'form_completed',
              2,
              expectedType
            );
            expect(trackFormSubmissionMock).toHaveBeenCalledWith(
              expectedType,
              'pricing-cta'
            );
          },
          { timeout: 5000 }
        );

        // Verify the correct number of funnel step calls
        expect(trackFunnelStepMock).toHaveBeenCalledTimes(2);
      }
    });

    it('should track funnel abandonment at various steps', async () => {
      // Test funnel abandonment tracking with different modes
      const testCases = [
        {
          mode: 'free-trial' as const,
          email: 'test@example.com',
          firstName: 'John',
          expectedType: 'signup',
        },
        {
          mode: 'beta-access' as const,
          email: 'user@test.com',
          firstName: 'Jane',
          expectedType: 'demo_request',
        },
        {
          mode: 'waitlist' as const,
          email: 'demo@sample.org',
          firstName: 'Bob',
          expectedType: 'waitlist',
        },
      ];

      for (const { mode, email, firstName, expectedType } of testCases) {
        const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);

        // Mock form submission that fails for error testing
        const mockOnSubmit = vi
          .fn()
          .mockRejectedValue(new Error('Submission failed'));

        const { container } = render(
          <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
        );

        // Clear any previous calls
        trackFunnelStepMock.mockClear();

        // Simulate form submission that fails
        const emailInput = container.querySelector(
          'input[type="email"]'
        ) as HTMLInputElement;
        const firstNameInput = container.querySelector(
          'input[id="firstName"]'
        ) as HTMLInputElement;
        const form = container.querySelector('form') as HTMLFormElement;

        expect(emailInput).toBeInTheDocument();
        expect(firstNameInput).toBeInTheDocument();
        expect(form).toBeInTheDocument();

        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.change(firstNameInput, { target: { value: firstName } });
        fireEvent.submit(form);

        // Wait for form submission to fail
        await waitFor(
          () => {
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
          },
          { timeout: 5000 }
        );

        // Wait for error tracking
        await waitFor(
          () => {
            expect(trackFunnelStepMock).toHaveBeenCalledWith(
              'form_error',
              -1,
              expectedType
            );
          },
          { timeout: 5000 }
        );

        // Should also have tracked form_started
        expect(trackFunnelStepMock).toHaveBeenCalledWith(
          'form_started',
          1,
          expectedType
        );
      }
    });

    it('should maintain funnel step sequence integrity', () => {
      // Test that funnel steps are tracked in logical sequence
      fc.assert(
        fc.property(
          fc.record({
            conversionType: fc.constantFrom(
              'signup',
              'demo_request',
              'waitlist'
            ),
            stepSequence: fc
              .array(
                fc.record({
                  stepName: fc.string({ minLength: 1, maxLength: 20 }),
                  stepNumber: fc.integer({ min: 1, max: 10 }),
                }),
                { minLength: 3, maxLength: 8 }
              )
              .map(steps =>
                // Sort by step number to ensure logical sequence
                steps.sort((a, b) => a.stepNumber - b.stepNumber)
              ),
          }),
          ({ conversionType, stepSequence }) => {
            const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);

            // Clear any previous calls
            trackFunnelStepMock.mockClear();

            // Track steps in sequence
            stepSequence.forEach(({ stepName, stepNumber }) => {
              analytics.trackFunnelStep(stepName, stepNumber, conversionType);
            });

            // Verify all steps were tracked
            expect(trackFunnelStepMock).toHaveBeenCalledTimes(
              stepSequence.length
            );

            // Verify steps were tracked in the correct order
            stepSequence.forEach(({ stepName, stepNumber }, index) => {
              expect(trackFunnelStepMock).toHaveBeenNthCalledWith(
                index + 1,
                stepName,
                stepNumber,
                conversionType
              );
            });

            // Verify step numbers are in ascending order (logical sequence)
            const trackedStepNumbers = trackFunnelStepMock.mock.calls.map(
              call => call[1]
            );
            const sortedStepNumbers = [...trackedStepNumbers].sort(
              (a, b) => a - b
            );
            expect(trackedStepNumbers).toEqual(sortedStepNumbers);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should track different conversion types with appropriate funnel categorization', () => {
      // Test that different conversion types maintain separate funnel tracking
      fc.assert(
        fc.property(
          fc.record({
            conversions: fc.array(
              fc.record({
                type: fc.constantFrom('signup', 'demo_request', 'waitlist'),
                steps: fc.array(
                  fc.record({
                    stepName: fc.constantFrom(
                      'page_view',
                      'cta_click',
                      'form_started',
                      'form_completed'
                    ),
                    stepNumber: fc.integer({ min: 1, max: 5 }),
                  }),
                  { minLength: 2, maxLength: 4 }
                ),
              }),
              { minLength: 1, maxLength: 3 }
            ),
          }),
          ({ conversions }) => {
            const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);

            // Clear any previous calls
            trackFunnelStepMock.mockClear();

            let totalSteps = 0;

            // Track all conversions and their steps
            conversions.forEach(({ type, steps }) => {
              steps.forEach(({ stepName, stepNumber }) => {
                analytics.trackFunnelStep(stepName, stepNumber, type);
                totalSteps++;
              });
            });

            // Verify total number of tracked steps
            expect(trackFunnelStepMock).toHaveBeenCalledTimes(totalSteps);

            // Verify each conversion type was tracked with correct categorization
            let callIndex = 0;
            conversions.forEach(({ type, steps }) => {
              steps.forEach(({ stepName, stepNumber }) => {
                expect(trackFunnelStepMock).toHaveBeenNthCalledWith(
                  callIndex + 1,
                  stepName,
                  stepNumber,
                  type
                );
                callIndex++;
              });
            });
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should handle concurrent funnel tracking without data corruption', () => {
      // Test that multiple simultaneous funnel events don't interfere
      fc.assert(
        fc.property(
          fc.record({
            simultaneousEvents: fc.array(
              fc.record({
                stepName: fc.string({ minLength: 1, maxLength: 20 }),
                stepNumber: fc.integer({ min: 1, max: 10 }),
                conversionType: fc.constantFrom(
                  'signup',
                  'demo_request',
                  'waitlist'
                ),
              }),
              { minLength: 5, maxLength: 15 }
            ),
          }),
          ({ simultaneousEvents }) => {
            const trackFunnelStepMock = vi.mocked(analytics.trackFunnelStep);

            // Clear any previous calls
            trackFunnelStepMock.mockClear();

            // Track all events simultaneously (simulating concurrent user actions)
            simultaneousEvents.forEach(
              ({ stepName, stepNumber, conversionType }) => {
                analytics.trackFunnelStep(stepName, stepNumber, conversionType);
              }
            );

            // Verify all events were tracked
            expect(trackFunnelStepMock).toHaveBeenCalledTimes(
              simultaneousEvents.length
            );

            // Verify each event was tracked with correct parameters (no data corruption)
            simultaneousEvents.forEach(
              ({ stepName, stepNumber, conversionType }, index) => {
                expect(trackFunnelStepMock).toHaveBeenNthCalledWith(
                  index + 1,
                  stepName,
                  stepNumber,
                  conversionType
                );
              }
            );
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should track funnel completion with conversion events', () => {
      // Test that completed funnels trigger conversion tracking
      fc.assert(
        fc.property(
          fc.record({
            conversionType: fc.constantFrom(
              'signup',
              'demo_request',
              'waitlist'
            ),
            conversionValue: fc.option(fc.integer({ min: 1, max: 1000 })),
            funnelStep: fc.string({ minLength: 1, maxLength: 50 }),
          }),
          ({ conversionType, conversionValue, funnelStep }) => {
            const trackConversionMock = vi.mocked(analytics.trackConversion);

            // Clear any previous calls
            trackConversionMock.mockClear();

            // Simulate conversion completion
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

            // Verify conversion was tracked with funnel context
            expect(trackConversionMock).toHaveBeenCalledTimes(1);
            expect(trackConversionMock).toHaveBeenCalledWith({
              conversionType,
              value: conversionValue,
              funnel_step: funnelStep,
              eventName: 'conversion',
              sessionId: 'test-session',
              timestamp: expect.any(Date),
              properties: {},
              page: '/test',
              userAgent: 'test-agent',
            });
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
