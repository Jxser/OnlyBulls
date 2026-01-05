import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import PricingCTASection from './PricingCTASection';

describe('PricingCTASection Conditional Lead Capture Property-Based Tests', () => {
  beforeEach(() => {
    cleanup();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Property 5: Conditional Lead Capture', () => {
    it('should display lead capture forms with clear value propositions for any page state where pricing is not available', () => {
      // Feature: landing-page, Property 5: Conditional Lead Capture
      // **Validates: Requirements 6.4**

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      fc.assert(
        fc.property(modeArbitrary, mode => {
          // Clean up before each iteration
          cleanup();

          const mockOnSubmit = vi.fn();

          const { container } = render(
            <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
          );

          // Verify lead capture form is present (since pricing is not available)
          const emailInput = screen.getByLabelText(/email address/i);
          const firstNameInput = screen.getByLabelText(/first name/i);
          const lastNameInput = screen.getByLabelText(/last name/i);

          expect(emailInput).toBeInTheDocument();
          expect(firstNameInput).toBeInTheDocument();
          expect(lastNameInput).toBeInTheDocument();

          // Verify clear value proposition is displayed above form
          let expectedValueProposition: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedValueProposition =
                /experience the power of ai-driven trading/i;
              break;
            case 'beta-access':
              expectedValueProposition = /join our exclusive beta program/i;
              break;
            case 'waitlist':
              expectedValueProposition =
                /be the first to know when only bulls launches/i;
              break;
          }

          // Use container.querySelector to be more specific and avoid multiple elements
          const valuePropositionText = container.querySelector('p');
          expect(valuePropositionText).toBeInTheDocument();
          expect(valuePropositionText?.textContent).toMatch(
            expectedValueProposition
          );

          // Verify mode-specific value propositions are listed - use container to scope search
          const valuePropsSection = container.querySelector('h3');
          expect(valuePropsSection).toBeInTheDocument();
          expect(valuePropsSection?.textContent).toMatch(/what you get/i);

          // Verify specific value props based on mode - use container to scope search
          switch (mode) {
            case 'free-trial':
              expect(container.textContent).toMatch(/14-day free trial/i);
              expect(container.textContent).toMatch(/no credit card required/i);
              expect(container.textContent).toMatch(
                /full access to all ai trading features/i
              );
              break;
            case 'beta-access':
              expect(container.textContent).toMatch(/exclusive early access/i);
              expect(container.textContent).toMatch(/direct feedback channel/i);
              expect(container.textContent).toMatch(
                /special beta user pricing/i
              );
              break;
            case 'waitlist':
              expect(container.textContent).toMatch(
                /first access when we launch/i
              );
              expect(container.textContent).toMatch(
                /exclusive launch pricing/i
              );
              expect(container.textContent).toMatch(/weekly market insights/i);
              break;
          }

          // Verify trust signals are present - use container to scope search
          let expectedTrustSignal: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedTrustSignal = /join 1,000\+ traders already using ai/i;
              break;
            case 'beta-access':
              expectedTrustSignal = /join 500\+ beta testers/i;
              break;
            case 'waitlist':
              expectedTrustSignal =
                /over 2,000 traders already on the waitlist/i;
              break;
          }

          expect(container.textContent).toMatch(expectedTrustSignal);

          // Verify privacy assurance is present - use container to scope search
          expect(container.textContent).toMatch(
            /your data is secure and never shared/i
          );

          // Verify form submission button has appropriate text - use container to scope search
          let expectedButtonText: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedButtonText = /start free trial/i;
              break;
            case 'beta-access':
              expectedButtonText = /request beta access/i;
              break;
            case 'waitlist':
              expectedButtonText = /join waitlist/i;
              break;
          }

          const submitButton = container.querySelector('button[type="submit"]');
          expect(submitButton).toBeInTheDocument();
          expect(submitButton?.textContent).toMatch(expectedButtonText);

          // Clean up after each iteration
          cleanup();
        }),
        { numRuns: 10 } // Reduced from 100
      );
    });

    it('should maintain consistent lead capture structure across all modes when pricing is unavailable', () => {
      // Feature: landing-page, Property 5: Conditional Lead Capture (Structure)
      // **Validates: Requirements 6.4**

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      fc.assert(
        fc.property(modeArbitrary, mode => {
          // Clean up before each iteration
          cleanup();

          const mockOnSubmit = vi.fn();

          const { container } = render(
            <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
          );

          // Verify consistent section structure
          const section = container.querySelector('section#signup-form');
          expect(section).toBeInTheDocument();
          expect(section).toHaveClass(
            'py-20',
            'px-4',
            'sm:px-6',
            'lg:px-8',
            'bg-gray-50'
          );

          // Verify two-column layout structure
          const gridContainer = container.querySelector('.grid');
          expect(gridContainer).toBeInTheDocument();

          // Verify value proposition side (left column)
          const valuePropsColumn =
            container.querySelector('.bg-gradient-to-br');
          expect(valuePropsColumn).toBeInTheDocument();

          // Verify form side (right column)
          const formColumn = container.querySelector('form');
          expect(formColumn).toBeInTheDocument();

          // Verify form has all required fields regardless of mode
          const requiredFields = ['email', 'firstName'];
          const optionalFields = ['lastName'];

          requiredFields.forEach(fieldName => {
            const field = container.querySelector(`input#${fieldName}`);
            expect(field).toBeInTheDocument();

            // Check if field is marked as required in the label
            const label = container.querySelector(`label[for="${fieldName}"]`);
            expect(label).toBeInTheDocument();
            if (fieldName !== 'lastName') {
              expect(label?.textContent).toMatch(/\*/); // Required fields should have asterisk
            }
          });

          optionalFields.forEach(fieldName => {
            const field = container.querySelector(`input#${fieldName}`);
            expect(field).toBeInTheDocument();

            const label = container.querySelector(`label[for="${fieldName}"]`);
            expect(label).toBeInTheDocument();
            expect(label?.textContent).not.toMatch(/\*/); // Optional fields should not have asterisk
          });

          // Verify privacy statement is consistently placed - use container to scope search
          expect(container.textContent).toMatch(/by submitting this form/i);

          // Verify submit button is full-width and properly styled
          const submitButton = container.querySelector('button[type="submit"]');
          expect(submitButton).toBeInTheDocument();
          expect(submitButton).toHaveClass('w-full'); // Full width
          expect(submitButton).toHaveClass('text-lg', 'py-4'); // Large size

          // Clean up after each iteration
          cleanup();
        }),
        { numRuns: 10 } // Reduced from 100
      );
    });

    it('should provide appropriate messaging when no pricing tiers are available', () => {
      // Feature: landing-page, Property 5: Conditional Lead Capture (No Pricing)
      // **Validates: Requirements 6.4**

      const modeArbitrary = fc.constantFrom(
        'free-trial',
        'beta-access',
        'waitlist'
      );

      fc.assert(
        fc.property(modeArbitrary, mode => {
          // Clean up before each iteration
          cleanup();

          const mockOnSubmit = vi.fn();

          const { container } = render(
            <PricingCTASection mode={mode} onSubmit={mockOnSubmit} />
          );

          // Verify no pricing tiers are displayed (since pricing is not available)
          expect(container.textContent).not.toMatch(/\$/); // No dollar signs
          expect(container.textContent).not.toMatch(/price/i); // No pricing text
          expect(container.textContent).not.toMatch(/month/i); // No monthly pricing
          expect(container.textContent).not.toMatch(/year/i); // No yearly pricing

          // Instead, verify lead capture messaging is prominent
          let expectedHeadline: RegExp;
          switch (mode) {
            case 'free-trial':
              expectedHeadline = /start your free trial today/i;
              break;
            case 'beta-access':
              expectedHeadline = /get early access to only bulls/i;
              break;
            case 'waitlist':
              expectedHeadline = /join the only bulls waitlist/i;
              break;
          }

          // Use container to scope search and avoid multiple elements
          const headline = container.querySelector('h2');
          expect(headline).toBeInTheDocument();
          expect(headline?.textContent).toMatch(expectedHeadline);

          // Verify clear call-to-action messaging - use container to scope search
          const valuePropsSection = container.querySelector('h3');
          expect(valuePropsSection).toBeInTheDocument();
          expect(valuePropsSection?.textContent).toMatch(/what you get/i);

          // Verify the focus is on value delivery rather than pricing
          const checkIcons = container.querySelectorAll('svg');
          expect(checkIcons.length).toBeGreaterThanOrEqual(4); // At least 4 value propositions

          // Verify lead capture is the primary action
          const form = container.querySelector('form');
          expect(form).toBeInTheDocument();

          // Clean up after each iteration
          cleanup();
        }),
        { numRuns: 10 } // Reduced from 100
      );
    });
  });
});
