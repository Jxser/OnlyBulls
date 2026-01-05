import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

describe('Responsive Design', () => {
  it('should have mobile-friendly header layout', () => {
    render(<Home />);

    const header = document.querySelector('header');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');

    // Check mobile menu button container has md:hidden class
    const mobileMenuContainer = document.querySelector('.md\\:hidden');
    expect(mobileMenuContainer).toBeInTheDocument();

    // Check desktop navigation is hidden on mobile
    const desktopNav = document.querySelector('nav');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });

  it('should have proper spacing and layout classes', () => {
    render(<Home />);

    // Check main content has proper padding for fixed header
    const main = document.querySelector('main');
    expect(main).toHaveClass('pt-16');

    // Check sections have responsive padding
    const heroSection = document.querySelector('section');
    expect(heroSection).toHaveClass('py-20', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  it('should have touch-friendly button sizes', () => {
    render(<Home />);

    // Check CTA buttons have minimum touch target size
    const headerCTA = screen.getByTestId('header-cta-button');
    expect(headerCTA).toHaveClass(
      'min-h-[44px]',
      'min-w-[44px]',
      'touch-manipulation'
    );

    // Check mobile menu toggle has proper touch target
    const mobileToggle = screen.getByTestId('mobile-menu-toggle');
    expect(mobileToggle).toHaveClass('min-h-[44px]', 'min-w-[44px]');
  });

  it('should have responsive text sizing', () => {
    render(<Home />);

    // Check hero headline has responsive text classes
    const heroHeadline = document.querySelector('h1.text-4xl');
    expect(heroHeadline).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl');
  });

  it('should have proper container max-widths', () => {
    render(<Home />);

    // Check header container
    const headerContainer = document.querySelector('header .max-w-7xl');
    expect(headerContainer).toHaveClass('max-w-7xl', 'mx-auto');

    // Check hero container
    const heroContainer = document.querySelector('.relative.max-w-7xl');
    expect(heroContainer).toHaveClass('max-w-7xl', 'mx-auto');
  });
});
