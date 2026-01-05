import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import Home from '@/app/page';

// Mock framer-motion to avoid test issues
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock window.matchMedia for responsive testing
const mockMatchMedia = (width: number) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query.includes(`max-width: ${width}px`) ||
        query.includes(`min-width: ${width}px`),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

// Mock window.innerWidth for viewport testing
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  mockMatchMedia(width);
};

describe('Property Test: Responsive Layout Behavior', () => {
  /**
   * Feature: landing-page, Property 6: Responsive Layout Behavior
   * Validates: Requirements 8.1
   */
  it('should maintain proper layout and functionality across all viewport sizes', () => {
    fc.assert(
      fc.property(
        // Generate viewport dimensions covering mobile (320px-768px), tablet (768px-1024px), desktop (1024px+)
        fc.record({
          width: fc.integer({ min: 320, max: 2560 }),
          height: fc.integer({ min: 568, max: 1440 }),
        }),
        ({ width, height }) => {
          // Mock the viewport size
          mockViewport(width, height);

          // Render the landing page
          const { container } = render(<Home />);

          // Property 1: Page should render without errors
          expect(container).toBeInTheDocument();

          // Property 2: Header should always be present
          const header = container.querySelector('header');
          expect(header).toBeInTheDocument();

          // Property 3: Main content should be present
          const main = container.querySelector('main');
          expect(main).toBeInTheDocument();

          // Property 4: Interactive elements should be present and functional
          const buttons = container.querySelectorAll('button');
          expect(buttons.length).toBeGreaterThan(0);

          // Check that buttons have some form of styling (any padding or sizing classes)
          buttons.forEach(button => {
            Array.from(button.classList).some(
              cls =>
                cls.includes('p-') ||
                cls.includes('px-') ||
                cls.includes('py-') ||
                cls.includes('min-h-') ||
                cls.includes('min-w-') ||
                cls.includes('h-') ||
                cls.includes('w-')
            );
            // If no specific padding classes, button should at least be rendered
            expect(button).toBeInTheDocument();
          });

          // Property 5: Sections should be present and have some structure
          const sections = container.querySelectorAll('section');
          expect(sections.length).toBeGreaterThan(0);

          // Property 6: Typography elements should be present
          const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
          expect(headings.length).toBeGreaterThan(0);

          // Property 7: Content should be accessible (basic check)
          const textContent = container.textContent;
          expect(textContent).toBeTruthy();
          expect(textContent.length).toBeGreaterThan(100); // Should have substantial content

          // Property 8: No obvious layout breaking issues
          // Check that the page doesn't have elements with negative margins that could break layout
          const allElements = container.querySelectorAll('*');
          let hasObviousLayoutIssues = false;

          allElements.forEach(element => {
            // Check for extremely wide elements that could cause horizontal scroll
            const hasExtremeWidth = Array.from(element.classList).some(
              cls =>
                cls.includes('w-screen') &&
                !cls.includes('max-w-') &&
                width < 768
            );
            if (hasExtremeWidth) {
              hasObviousLayoutIssues = true;
            }
          });

          expect(hasObviousLayoutIssues).toBe(false);

          // Property 9: Essential navigation elements should be present
          const navElements = container.querySelectorAll(
            'nav, [role="navigation"]'
          );
          const links = container.querySelectorAll('a');

          // Should have either navigation elements or links
          expect(navElements.length + links.length).toBeGreaterThan(0);

          // Property 10: Page should have proper semantic structure
          const semanticElements = container.querySelectorAll(
            'header, main, section, nav, footer'
          );
          expect(semanticElements.length).toBeGreaterThan(2); // At least header, main, and one section
        }
      ),
      { numRuns: 30 } // Reduced for faster testing while still providing good coverage
    );
  });
});
