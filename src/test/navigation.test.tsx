import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Navigation Functionality', () => {
  it('should have working navigation links', () => {
    render(<Home />);

    // Check that navigation links have correct href attributes
    const featuresLink = screen.getByTestId('nav-link-features');
    const demoLink = screen.getByTestId('nav-link-demo');
    const pricingLink = screen.getByTestId('nav-link-pricing');

    expect(featuresLink).toHaveAttribute('href', '#benefits');
    expect(demoLink).toHaveAttribute('href', '#demo');
    expect(pricingLink).toHaveAttribute('href', '#pricing');
  });

  it('should have target sections with correct IDs', () => {
    render(<Home />);

    // Check that target sections exist
    expect(document.querySelector('#benefits')).toBeInTheDocument();
    expect(document.querySelector('#demo')).toBeInTheDocument();
    expect(document.querySelector('#pricing')).toBeInTheDocument();
  });

  it('should have mobile menu toggle functionality', () => {
    render(<Home />);

    const mobileToggle = screen.getByTestId('mobile-menu-toggle');

    // Initially mobile menu should not be visible
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    // Click to open mobile menu
    fireEvent.click(mobileToggle);

    // Mobile menu should now be visible
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

    // Check mobile navigation links
    expect(screen.getByTestId('mobile-nav-link-features')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-link-demo')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-nav-link-pricing')).toBeInTheDocument();
  });

  it('should have CTA buttons that trigger callbacks', () => {
    // Mock console.log to verify CTA click
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<Home />);

    // Test header CTA button
    const headerCTA = screen.getByTestId('header-cta-button');
    fireEvent.click(headerCTA);

    expect(consoleSpy).toHaveBeenCalledWith('Sign in clicked');

    consoleSpy.mockRestore();
  });
});
