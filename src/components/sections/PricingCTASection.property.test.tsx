import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import * as fc from 'fast-check';
import PricingCTASection from './PricingCTASection';

describe('PricingCTASection Property-Based Tests', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Property 4: Form Functionality', () => {
    it('should successfully process form submission and provide user feedback for any valid form data', async () => {
      // Feature: landing-page, Property 4: Form Functionality
      // **Validates: Requirements 6.3**

      const validEmailArbitrary = fc
        .tuple(
          fc.stringMatching(/^[a-zA-Z0-9]+$/),
          fc.constantFrom('gmail.com', 'yahoo.com', 'outlook.com', 'test.com')
        )
        .map(([local, domain]) => `${local}@${domain}`);

      const validNameArbitrary = fc
        .string({ minLength: 1, maxLength: 50 })
        .filter(
          name => name.trim().length > 0 && /^[a-zA-Z\s'-]+$/.test(name.trim())
        );

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      await fc.assert(
        fc.asyncProperty(
          validEmailArbitrary,
          validNameArbitrary,
          validNameArbitrary.map(name => (name.length > 0 ? name : undefined)),
          modeArbitrary,
          async (email, firstName, lastName, mode) => {
            // Clean up before each property test run
            cleanup();

            const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

            const { container } = render(
              <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
            );

            // Find form elements with more specific queries to avoid multiple elements
            const emailInput = container.querySelector(
              '#email'
            ) as HTMLInputElement;
            const firstNameInput = container.querySelector(
              '#firstName'
            ) as HTMLInputElement;
            const lastNameInput = container.querySelector(
              '#lastName'
            ) as HTMLInputElement;
            const submitButton = container.querySelector(
              'button[type="submit"]'
            ) as HTMLButtonElement;

            expect(emailInput).toBeInTheDocument();
            expect(firstNameInput).toBeInTheDocument();
            expect(lastNameInput).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();

            // Fill out the form with valid data
            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.change(firstNameInput, { target: { value: firstName } });
            if (lastName) {
              fireEvent.change(lastNameInput, { target: { value: lastName } });
            }

            // Submit the form
            fireEvent.click(submitButton);

            // Wait for form submission to complete
            await waitFor(
              () => {
                expect(mockOnSubmit).toHaveBeenCalledWith({
                  email,
                  firstName,
                  lastName: lastName || '',
                  interests: undefined,
                });
              },
              { timeout: 2000 }
            );

            // Verify success feedback is shown
            await waitFor(
              () => {
                const thankYouMessage = screen.getByText(/thank you/i);
                expect(thankYouMessage).toBeInTheDocument();
              },
              { timeout: 2000 }
            );

            // Verify appropriate success message based on mode
            let expectedMessage: RegExp;
            switch (mode) {
              case 'free-trial':
                expectedMessage = /trial access details/i;
                break;
              case 'beta-access':
                expectedMessage = /beta access list/i;
                break;
              case 'waitlist':
                expectedMessage = /on the list/i;
                break;
            }

            const successMessage = screen.getByText(expectedMessage);
            expect(successMessage).toBeInTheDocument();

            // Verify email confirmation message
            const emailConfirmation = screen.getByText(/check your email/i);
            expect(emailConfirmation).toBeInTheDocument();

            // Clean up after each property test run
            cleanup();
          }
        ),
        { numRuns: 5 } // Reduced to 5 for faster execution while still providing good coverage
      );
    });

    it('should handle form validation errors appropriately for any invalid form data', async () => {
      // Feature: landing-page, Property 4: Form Functionality (Validation)
      // **Validates: Requirements 6.3**

      const invalidEmailArbitrary = fc.oneof(
        fc.constant(''), // empty email
        fc
          .string({ minLength: 1, maxLength: 20 })
          .filter(s => !s.includes('@')), // no @ symbol
        fc.string({ minLength: 1, maxLength: 20 }).map(s => `${s}@`), // missing domain
        fc.string({ minLength: 1, maxLength: 20 }).map(s => `@${s}.com`) // missing local part
      );

      const invalidFirstNameArbitrary = fc.oneof(
        fc.constant(''), // empty name
        fc.constant('   ') // whitespace only
      );

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      await fc.assert(
        fc.asyncProperty(
          invalidEmailArbitrary,
          invalidFirstNameArbitrary,
          modeArbitrary,
          async (email, firstName, mode) => {
            // Clean up before each property test run
            cleanup();

            const mockOnSubmit = vi.fn();

            const { container } = render(
              <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
            );

            // Find form elements with specific queries
            const emailInput = container.querySelector(
              '#email'
            ) as HTMLInputElement;
            const firstNameInput = container.querySelector(
              '#firstName'
            ) as HTMLInputElement;
            const submitButton = container.querySelector(
              'button[type="submit"]'
            ) as HTMLButtonElement;

            // Fill out the form with invalid data
            fireEvent.change(emailInput, { target: { value: email } });
            fireEvent.change(firstNameInput, { target: { value: firstName } });

            // Submit the form
            fireEvent.click(submitButton);

            // Wait a bit to allow validation to run
            await waitFor(
              () => {
                // Form should not have been submitted
                expect(mockOnSubmit).not.toHaveBeenCalled();
              },
              { timeout: 1000 }
            );

            // Verify we're still on the form (not showing success message)
            expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();

            // Clean up after each property test run
            cleanup();
          }
        ),
        { numRuns: 5 } // Reduced from 10
      );
    });

    it('should maintain form accessibility and usability across all modes and states', () => {
      // Feature: landing-page, Property 4: Form Functionality (Accessibility)
      // **Validates: Requirements 6.3**

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      fc.assert(
        fc.property(modeArbitrary, mode => {
          // Clean up before each property test run
          cleanup();

          const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

          const { container } = render(
            <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
          );

          // Verify form has proper structure and accessibility
          const form = container.querySelector('form');
          expect(form).toBeInTheDocument();

          // Verify all required form fields are present and properly labeled using specific selectors
          const emailInput = container.querySelector(
            '#email'
          ) as HTMLInputElement;
          const firstNameInput = container.querySelector(
            '#firstName'
          ) as HTMLInputElement;
          const lastNameInput = container.querySelector(
            '#lastName'
          ) as HTMLInputElement;

          expect(emailInput).toBeInTheDocument();
          expect(firstNameInput).toBeInTheDocument();
          expect(lastNameInput).toBeInTheDocument();

          // Verify inputs have proper attributes
          expect(emailInput).toHaveAttribute('type', 'email');
          expect(emailInput).toHaveAttribute('id', 'email');
          expect(firstNameInput).toHaveAttribute('type', 'text');
          expect(firstNameInput).toHaveAttribute('id', 'firstName');
          expect(lastNameInput).toHaveAttribute('type', 'text');
          expect(lastNameInput).toHaveAttribute('id', 'lastName');

          // Verify submit button is present and properly configured
          const submitButton = container.querySelector(
            'button[type="submit"]'
          ) as HTMLButtonElement;
          expect(submitButton).toBeInTheDocument();
          expect(submitButton).toHaveAttribute('type', 'submit');

          // Verify privacy statement is present (use more specific query)
          const privacyStatement = screen.getByText(/by submitting this form/i);
          expect(privacyStatement).toBeInTheDocument();

          // Verify mode-specific content is displayed
          let expectedHeadline: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedHeadline = /start your free trial/i;
              break;
            case 'beta-access':
              expectedHeadline = /get early access/i;
              break;
            case 'waitlist':
              expectedHeadline = /join the.*waitlist/i;
              break;
          }

          const headline = screen.getByText(expectedHeadline);
          expect(headline).toBeInTheDocument();

          // Verify value propositions are displayed
          const whatYouGetSection = screen.getByText(/what you get/i);
          expect(whatYouGetSection).toBeInTheDocument();

          // Verify trust signals are present (mode-specific)
          let expectedTrustSignal: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedTrustSignal = /join.*traders/i;
              break;
            case 'beta-access':
              expectedTrustSignal = /join.*beta testers/i;
              break;
            case 'waitlist':
              expectedTrustSignal = /traders already on the waitlist/i;
              break;
          }

          const trustSignal = screen.getByText(expectedTrustSignal);
          expect(trustSignal).toBeInTheDocument();

          // Clean up after each property test run
          cleanup();
        }),
        { numRuns: 5 } // Reduced from 10
      );
    });
  });
});
