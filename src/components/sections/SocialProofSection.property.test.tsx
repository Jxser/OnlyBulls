import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import SocialProofSection from './SocialProofSection';

describe('SocialProofSection Property-Based Tests', () => {
  describe('Property 3: Social Proof Data Display', () => {
    it('should display user statistics in the social proof section when data exists', () => {
      // Feature: landing-page, Property 3: Social Proof Data Display
      // **Validates: Requirements 5.2**

      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(classNameArbitrary, className => {
          const { container } = render(
            <SocialProofSection className={className} />
          );

          // Verify the social proof section exists
          const section = container.querySelector('section');
          expect(section).toBeInTheDocument();

          // Verify user statistics grid exists
          const statsGrid = container.querySelector('.grid.md\\:grid-cols-3');
          expect(statsGrid).toBeInTheDocument();

          // Verify that we have exactly 3 stat cards
          const statCards = Array.from(statsGrid?.children || []);
          expect(statCards.length).toBe(3);

          // Verify each stat card has the required structure
          statCards.forEach(card => {
            // Each card should have an icon
            const icon = card.querySelector('svg');
            expect(icon).toBeInTheDocument();

            // Each card should have a value (large number)
            const value = card.querySelector('.text-3xl.font-bold');
            expect(value).toBeInTheDocument();
            expect(value?.textContent?.length).toBeGreaterThan(0);

            // Each card should have a label
            const label = card.querySelector('.text-lg.font-medium');
            expect(label).toBeInTheDocument();
            expect(label?.textContent?.length).toBeGreaterThan(0);

            // Each card should have a description
            const description = card.querySelector('.text-sm.text-gray-500');
            expect(description).toBeInTheDocument();
            expect(description?.textContent?.length).toBeGreaterThan(0);
          });

          // Verify that statistics show meaningful data patterns
          const values = statCards.map(
            card => card.querySelector('.text-3xl.font-bold')?.textContent || ''
          );

          // Should have numeric values with appropriate formatting
          values.forEach(value => {
            expect(value).toMatch(/[\d,+%]+/); // Should contain numbers, commas, plus signs, or percent
          });

          // Verify proper styling classes are applied
          expect(statsGrid).toHaveClass('grid');
          expect(statsGrid).toHaveClass('md:grid-cols-3');
          expect(statsGrid).toHaveClass('gap-8');
          expect(statsGrid).toHaveClass('mb-16');
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain consistent data display format across all user statistics', () => {
      // Feature: landing-page, Property 3: Social Proof Data Display (Extended)
      // **Validates: Requirements 5.2**

      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(classNameArbitrary, className => {
          const { container } = render(
            <SocialProofSection className={className} />
          );

          // Verify consistent structure for all statistics
          const statsGrid = container.querySelector('.grid.md\\:grid-cols-3');
          expect(statsGrid).toBeInTheDocument();

          const statCards = Array.from(statsGrid?.children || []);
          expect(statCards.length).toBe(3);

          statCards.forEach(card => {
            // Each card should have consistent styling
            expect(card).toHaveClass('text-center');
            expect(card).toHaveClass('p-6');
            expect(card).toHaveClass('bg-gray-50');
            expect(card).toHaveClass('rounded-xl');

            // Each card should have an icon container
            const iconContainer = card.querySelector(
              '.flex.justify-center.mb-4'
            );
            expect(iconContainer).toBeInTheDocument();

            // Each card should have exactly one icon with consistent sizing
            const icon = iconContainer?.querySelector('svg');
            expect(icon).toBeInTheDocument();
            expect(icon).toHaveClass('w-6');
            expect(icon).toHaveClass('h-6');

            // Each card should have a value with consistent styling
            const value = card.querySelector(
              '.text-3xl.font-bold.text-gray-900.mb-2'
            );
            expect(value).toBeInTheDocument();
            expect(value?.textContent?.length).toBeGreaterThan(0);

            // Each card should have a label with consistent styling
            const label = card.querySelector(
              '.text-lg.font-medium.text-gray-700.mb-1'
            );
            expect(label).toBeInTheDocument();
            expect(label?.textContent?.length).toBeGreaterThan(0);

            // Each card should have a description with consistent styling
            const description = card.querySelector('.text-sm.text-gray-500');
            expect(description).toBeInTheDocument();
            expect(description?.textContent?.length).toBeGreaterThan(0);

            // Verify hover effects are applied
            expect(card).toHaveClass('hover:bg-gray-100');
            expect(card).toHaveClass('transition-colors');
            expect(card).toHaveClass('duration-200');
          });

          // Verify that the statistics section has proper spacing and layout
          expect(statsGrid).toHaveClass('grid');
          expect(statsGrid).toHaveClass('md:grid-cols-3');
          expect(statsGrid).toHaveClass('gap-8');
          expect(statsGrid).toHaveClass('mb-16');
        }),
        { numRuns: 100 }
      );
    });

    it('should display testimonials and social proof elements when available', () => {
      // Feature: landing-page, Property 3: Social Proof Data Display (Testimonials)
      // **Validates: Requirements 5.2**

      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(classNameArbitrary, className => {
          const { container } = render(
            <SocialProofSection className={className} />
          );

          // Verify testimonials section exists
          const testimonialsSection = container.querySelector(
            '.bg-gradient-to-br.from-blue-50.to-indigo-50'
          );
          expect(testimonialsSection).toBeInTheDocument();

          // Verify testimonial content is displayed
          const testimonialQuote = container.querySelector('blockquote');
          expect(testimonialQuote).toBeInTheDocument();
          expect(testimonialQuote?.textContent?.length).toBeGreaterThan(50); // Substantial content

          // Verify star ratings are displayed (should have 5 stars total)
          const stars = container.querySelectorAll(
            'svg[class*="text-yellow-400"], svg[class*="text-gray-300"]'
          );
          expect(stars.length).toBe(5);

          // Verify author information is displayed
          const authorName = container.querySelector(
            '.font-semibold.text-gray-900'
          );
          expect(authorName).toBeInTheDocument();
          expect(authorName?.textContent?.length).toBeGreaterThan(0);

          // Verify navigation controls are present
          const prevButton = container.querySelector(
            'button[aria-label="Previous testimonial"]'
          );
          const nextButton = container.querySelector(
            'button[aria-label="Next testimonial"]'
          );
          expect(prevButton).toBeInTheDocument();
          expect(nextButton).toBeInTheDocument();

          // Verify testimonial indicators are present
          const indicators = container.querySelectorAll(
            'button[aria-label*="Go to testimonial"]'
          );
          expect(indicators.length).toBeGreaterThan(0);

          // Verify press mentions section exists by checking for the grid structure
          const pressLogosGrid = container.querySelector(
            '.grid.grid-cols-2.md\\:grid-cols-4'
          );
          expect(pressLogosGrid).toBeInTheDocument();

          // Verify press logos are displayed
          const pressLogos = Array.from(pressLogosGrid?.children || []);
          expect(pressLogos.length).toBeGreaterThan(0);

          // Verify security badges section exists by checking for the specific security grid
          const securityBadgesGrid = container.querySelector(
            '.border-t.border-gray-200.pt-16 .grid.md\\:grid-cols-3.gap-8'
          );
          expect(securityBadgesGrid).toBeInTheDocument();

          const securityBadges = Array.from(securityBadgesGrid?.children || []);
          expect(securityBadges.length).toBe(3);

          // Each security badge should have an icon, name, and description
          securityBadges.forEach(badge => {
            const icon = badge.querySelector('svg');
            expect(icon).toBeInTheDocument();

            const name = badge.querySelector('.font-semibold.text-gray-900');
            expect(name).toBeInTheDocument();

            const description = badge.querySelector('.text-sm.text-gray-600');
            expect(description).toBeInTheDocument();
          });
        }),
        { numRuns: 100 }
      );
    });
  });
});
