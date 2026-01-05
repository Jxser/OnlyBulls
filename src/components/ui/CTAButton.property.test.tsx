import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import CTAButton from './CTAButton';

describe('CTAButton Property-Based Tests', () => {
  describe('Property 7: Mobile CTA Accessibility', () => {
    it('should maintain touch-friendly sizing across all variants and sizes', () => {
      // Feature: landing-page, Property 7: Mobile CTA Accessibility
      // **Validates: Requirements 8.3**

      const variantArbitrary = fc.constantFrom(
        'primary',
        'secondary',
        'outline'
      );
      const sizeArbitrary = fc.constantFrom('sm', 'md', 'lg');
      const textArbitrary = fc.string({ minLength: 1, maxLength: 50 });
      const loadingArbitrary = fc.boolean();
      const fullWidthArbitrary = fc.boolean();
      const disabledArbitrary = fc.boolean();

      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          textArbitrary,
          loadingArbitrary,
          fullWidthArbitrary,
          disabledArbitrary,
          (variant, size, text, loading, fullWidth, disabled) => {
            const { container } = render(
              <CTAButton
                variant={variant}
                size={size}
                loading={loading}
                fullWidth={fullWidth}
                disabled={disabled}
              >
                {text}
              </CTAButton>
            );

            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Extract minimum width and height from classes
            const classList = Array.from(button!.classList);

            // Check for minimum touch target width (44px)
            const hasMinWidth44 = classList.includes('min-w-[44px]');
            expect(hasMinWidth44).toBe(true);

            // Check for touch-manipulation class
            const hasTouchManipulation =
              classList.includes('touch-manipulation');
            expect(hasTouchManipulation).toBe(true);

            // Check minimum height based on size
            let expectedMinHeight: string;
            switch (size) {
              case 'sm':
                expectedMinHeight = 'min-h-[36px]';
                break;
              case 'lg':
                expectedMinHeight = 'min-h-[52px]';
                break;
              default: // 'md'
                expectedMinHeight = 'min-h-[44px]';
                break;
            }

            const hasExpectedMinHeight = classList.includes(expectedMinHeight);
            expect(hasExpectedMinHeight).toBe(true);

            // Verify button is properly styled for touch interaction
            const hasPaddingX = classList.some(cls => cls.includes('px-'));
            const hasPaddingY = classList.some(cls => cls.includes('py-'));
            const hasProperPadding = hasPaddingX && hasPaddingY;
            expect(hasProperPadding).toBe(true);

            // Verify button has proper focus styles for accessibility
            const hasFocusStyles = classList.some(
              cls =>
                cls.includes('focus:ring-') || cls.includes('focus:outline-')
            );
            expect(hasFocusStyles).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain accessibility features across all button configurations', () => {
      // Feature: landing-page, Property 7: Mobile CTA Accessibility (Extended)
      // **Validates: Requirements 8.3**

      const variantArbitrary = fc.constantFrom(
        'primary',
        'secondary',
        'outline'
      );
      const sizeArbitrary = fc.constantFrom('sm', 'md', 'lg');
      const textArbitrary = fc.string({ minLength: 1, maxLength: 100 });
      const propsArbitrary = fc.record({
        loading: fc.boolean(),
        disabled: fc.boolean(),
        fullWidth: fc.boolean(),
      });

      fc.assert(
        fc.property(
          variantArbitrary,
          sizeArbitrary,
          textArbitrary,
          propsArbitrary,
          (variant, size, text, props) => {
            const { container } = render(
              <CTAButton variant={variant} size={size} {...props}>
                {text}
              </CTAButton>
            );

            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();

            // Button should always be focusable (unless disabled)
            if (!props.disabled && !props.loading) {
              expect(button).not.toHaveAttribute('tabindex', '-1');
            }

            // Button should have proper ARIA attributes
            expect(button).toHaveAttribute('type', 'button');

            // Button should have proper disabled state handling
            if (props.disabled || props.loading) {
              expect(button).toBeDisabled();
            } else {
              expect(button).not.toBeDisabled();
            }

            // Button should maintain consistent styling structure
            const classList = Array.from(button!.classList);

            // Should have base button styles
            expect(classList).toContain('inline-flex');
            expect(classList).toContain('items-center');
            expect(classList).toContain('justify-center');
            expect(classList).toContain('font-medium');
            expect(classList).toContain('rounded-lg');

            // Should have transition styles
            const hasTransition = classList.some(cls =>
              cls.includes('transition')
            );
            expect(hasTransition).toBe(true);

            // Should have proper variant-specific styles
            switch (variant) {
              case 'primary':
                expect(classList).toContain('bg-blue-600');
                expect(classList).toContain('text-white');
                break;
              case 'secondary':
                expect(classList).toContain('bg-gray-100');
                expect(classList).toContain('text-gray-900');
                break;
              case 'outline':
                expect(classList).toContain('border');
                expect(classList).toContain('border-gray-300');
                expect(classList).toContain('text-gray-700');
                expect(classList).toContain('bg-white');
                break;
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
