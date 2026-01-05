import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import * as fc from 'fast-check';
import PricingCTASection from '@/components/sections/PricingCTASection';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  trackFormSubmission: vi.fn(),
  trackFunnelStep: vi.fn(),
}));

import { trackFormSubmission, trackFunnelStep } from '@/lib/analytics';

describe('Form Submission Analytics Property-Based Tests', () => {
  beforeEach(() => {
    // Mock window.gtag to ensure analytics functions execute
    const mockGtag = vi.fn();
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true,
      configurable: true,
    });

    // Mock window.dataLayer
    Object.defineProperty(window, 'dataLayer', {
      value: [],
      writable: true,
      configurable: true,
    });

    // Mock document.title for analytics
    Object.defineProperty(document, 'title', {
      value: 'Test Page',
      writable: true,
      configurable: true,
    });

    // Clear all mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up window mocks
    delete (window as any).gtag;
    delete (window as any).dataLayer;

    // Reset document.title
    Object.defineProperty(document, 'title', {
      value: '',
      writable: true,
      configurable: true,
    });
  });

  describe('Property 16: Form Submission Analytics', () => {
    it('should track form submission completion events with appropriate conversion categorization for any form submission', () => {
      // Feature: landing-page, Property 16: Form Submission Analytics
      // **Validates: Requirements 11.2**

      fc.assert(
        fc.property(
          fc.record({
            mode: fc.constantFrom('free-trial', 'beta-access', 'waitlist'),
            email: fc.emailAddress(),
            firstName: fc
              .string({ minLength: 1, maxLength: 50 })
              .filter(s => s.trim().length > 0),
            lastName: fc.option(
              fc
                .string({ minLength: 1, maxLength: 50 })
                .filter(s => s.trim().length > 0)
            ),
          }),
          async ({ mode, email, firstName, lastName }) => {
            // Clear any previous calls
            vi.clearAllMocks();

            // Mock successful form submission
            const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

            const { container } = render(
              <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
            );

            // Fill out the form
            const emailInput = container.querySelector('input[type="email"]');
            const firstNameInput = container.querySelector(
              'input[id="firstName"]'
            );
            const lastNameInput = container.querySelector(
              'input[id="lastName"]'
            );
            const submitButton = container.querySelector(
              'button[type="submit"]'
            );

            expect(emailInput).toBeInTheDocument();
            expect(firstNameInput).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();

            // Fill form fields
            fireEvent.change(emailInput!, { target: { value: email } });
            fireEvent.change(firstNameInput!, { target: { value: firstName } });
            if (lastNameInput && lastName) {
              fireEvent.change(lastNameInput, { target: { value: lastName } });
            }

            // Submit the form
            fireEvent.click(submitButton!);

            // Wait for form submission to complete
            await waitFor(() => {
              expect(mockOnSubmit).toHaveBeenCalledTimes(1);
            });

            // Wait for analytics calls to be made
            await waitFor(
              () => {
                expect(trackFormSubmission).toHaveBeenCalled();
              },
              { timeout: 2000 }
            );

            // Debug: Check if any analytics functions were called at all
            console.log(
              'trackFormSubmission calls:',
              (trackFormSubmission as any).mock.calls
            );
            console.log(
              'trackFunnelStep calls:',
              (trackFunnelStep as any).mock.calls
            );
            console.log('window.gtag exists:', typeof (window as any).gtag);
            console.log('mockOnSubmit calls:', mockOnSubmit.mock.calls);

            // Determine expected conversion type
            const expectedConversionType =
              mode === 'free-trial'
                ? 'signup'
                : mode === 'beta-access'
                  ? 'demo_request'
                  : 'waitlist';

            // Verify form submission tracking was called
            expect(trackFormSubmission).toHaveBeenCalledWith(
              expectedConversionType,
              'pricing-cta'
            );

            // Verify funnel step tracking was called
            expect(trackFunnelStep).toHaveBeenCalledWith(
              'form_started',
              1,
              expectedConversionType
            );
            expect(trackFunnelStep).toHaveBeenCalledWith(
              'form_completed',
              2,
              expectedConversionType
            );
          }
        ),
        { numRuns: 50 } // Increased back to proper property testing
      );
    });

    it('should track form submission errors with appropriate error categorization', () => {
      // Test error handling in form submission analytics
      fc.assert(
        fc.property(
          fc.record({
            mode: fc.constantFrom('free-trial', 'beta-access', 'waitlist'),
            email: fc.emailAddress(),
            firstName: fc
              .string({ minLength: 1, maxLength: 50 })
              .filter(s => s.trim().length > 0),
          }),
          async ({ mode, email, firstName }) => {
            // Mock failed form submission
            const mockOnSubmit = vi
              .fn()
              .mockRejectedValue(new Error('Submission failed'));

            const { container } = render(
              <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
            );

            // Clear any previous calls
            vi.clearAllMocks();

            // Fill out the form
            const emailInput = container.querySelector('input[type="email"]');
            const firstNameInput = container.querySelector(
              'input[id="firstName"]'
            );
            const submitButton = container.querySelector(
              'button[type="submit"]'
            );

            expect(emailInput).toBeInTheDocument();
            expect(firstNameInput).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();

            // Fill form fields
            fireEvent.change(emailInput!, { target: { value: email } });
            fireEvent.change(firstNameInput!, { target: { value: firstName } });

            // Submit the form
            fireEvent.click(submitButton!);

            // Wait for form submission to fail
            await waitFor(() => {
              expect(mockOnSubmit).toHaveBeenCalledTimes(1);
            });

            // Determine expected conversion type
            const expectedConversionType =
              mode === 'free-trial'
                ? 'signup'
                : mode === 'beta-access'
                  ? 'demo_request'
                  : 'waitlist';

            // Verify error funnel step tracking was called
            expect(trackFunnelStep).toHaveBeenCalledWith(
              'form_error',
              -1,
              expectedConversionType
            );
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should track different form modes with correct conversion categorization', () => {
      // Test that different form modes are tracked with correct categories
      fc.assert(
        fc.property(
          fc.record({
            email: fc.emailAddress(),
            firstName: fc
              .string({ minLength: 1, maxLength: 50 })
              .filter(s => s.trim().length > 0),
          }),
          async ({ email, firstName }) => {
            const modes = ['free-trial', 'beta-access', 'waitlist'] as const;
            const expectedConversions = [
              'signup',
              'demo_request',
              'waitlist',
            ] as const;

            for (let i = 0; i < modes.length; i++) {
              const mode = modes[i];
              const expectedConversion = expectedConversions[i];

              // Mock successful form submission
              const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

              const { container, unmount } = render(
                <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
              );

              // Clear any previous calls
              vi.clearAllMocks();

              // Fill out and submit the form
              const emailInput = container.querySelector('input[type="email"]');
              const firstNameInput = container.querySelector(
                'input[id="firstName"]'
              );
              const submitButton = container.querySelector(
                'button[type="submit"]'
              );

              fireEvent.change(emailInput!, { target: { value: email } });
              fireEvent.change(firstNameInput!, {
                target: { value: firstName },
              });
              fireEvent.click(submitButton!);

              // Wait for form submission to complete
              await waitFor(() => {
                expect(mockOnSubmit).toHaveBeenCalledTimes(1);
              });

              // Verify correct conversion type was tracked
              expect(trackFormSubmission).toHaveBeenCalledWith(
                expectedConversion,
                'pricing-cta'
              );

              // Clean up for next iteration
              unmount();
            }
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should track form submissions with consistent location parameter', () => {
      // Test that all form submissions use consistent location tracking
      fc.assert(
        fc.property(
          fc.record({
            mode: fc.constantFrom('free-trial', 'beta-access', 'waitlist'),
            email: fc.emailAddress(),
            firstName: fc
              .string({ minLength: 1, maxLength: 50 })
              .filter(s => s.trim().length > 0),
          }),
          async ({ mode, email, firstName }) => {
            // Mock successful form submission
            const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

            const { container } = render(
              <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
            );

            // Clear any previous calls
            vi.clearAllMocks();

            // Fill out and submit the form
            const emailInput = container.querySelector('input[type="email"]');
            const firstNameInput = container.querySelector(
              'input[id="firstName"]'
            );
            const submitButton = container.querySelector(
              'button[type="submit"]'
            );

            fireEvent.change(emailInput!, { target: { value: email } });
            fireEvent.change(firstNameInput!, { target: { value: firstName } });
            fireEvent.click(submitButton!);

            // Wait for form submission to complete
            await waitFor(() => {
              expect(mockOnSubmit).toHaveBeenCalledTimes(1);
            });

            // Verify consistent location parameter
            expect(trackFormSubmission).toHaveBeenCalledWith(
              expect.any(String),
              'pricing-cta'
            );
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should not track form submission when form validation fails', () => {
      // Test that invalid form submissions don't trigger analytics
      fc.assert(
        fc.property(
          fc.record({
            mode: fc.constantFrom('free-trial', 'beta-access', 'waitlist'),
            invalidEmail: fc
              .string({ minLength: 1, maxLength: 20 })
              .filter(s => !s.includes('@')),
          }),
          async ({ mode, invalidEmail }) => {
            const { container } = render(<PricingCTASection mode={mode} />);

            // Clear any previous calls
            vi.clearAllMocks();

            // Fill out form with invalid data
            const emailInput = container.querySelector('input[type="email"]');
            const submitButton = container.querySelector(
              'button[type="submit"]'
            );

            expect(emailInput).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();

            // Fill with invalid email (no firstName to also trigger validation error)
            fireEvent.change(emailInput!, { target: { value: invalidEmail } });

            // Try to submit the form
            fireEvent.click(submitButton!);

            // Wait a bit to ensure no async operations are triggered
            await new Promise(resolve => setTimeout(resolve, 100));

            // Verify no analytics tracking was called for invalid submission
            expect(trackFormSubmission).not.toHaveBeenCalled();
            // Note: form_started might still be called, but form_completed should not
            if ((trackFunnelStep as any).mock.calls.length > 0) {
              expect(trackFunnelStep).not.toHaveBeenCalledWith(
                'form_completed',
                expect.any(Number),
                expect.any(String)
              );
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});
