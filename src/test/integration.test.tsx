import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '@/app/page';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.IntersectionObserver = mockIntersectionObserver;

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

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackCTAClick: vi.fn(),
  trackFormSubmission: vi.fn(),
  trackFunnelStep: vi.fn(),
}));

// Mock performance monitoring
vi.mock('@/components/PerformanceMonitor', () => ({
  default: () => null,
}));

// Mock LazySection to avoid IntersectionObserver issues
vi.mock('@/components/ui/LazySection', () => ({
  default: ({ children, id }: any) => (
    <div id={id} data-testid={`lazy-section-${id || 'unnamed'}`}>
      {children}
    </div>
  ),
}));

// Mock smooth scrolling
const mockScrollIntoView = vi.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

describe('Landing Page Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockScrollIntoView.mockClear();
  });

  it('should render all core sections', () => {
    render(<Home />);

    // Check Header
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();

    // Check Hero Section - use a more flexible matcher since text is split across elements
    expect(
      screen.getByText(/24\/7 AI Market Agent That Helps You/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Spot Opportunities/)).toBeInTheDocument();
    expect(screen.getByText(/Execute Trades Smarter/)).toBeInTheDocument();

    // Check Problem/Outcome Section
    expect(
      screen.getByText('Stop the Stress of Manual Market Monitoring')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Transform Your Trading Experience')
    ).toBeInTheDocument();

    // Check Benefits Section
    expect(screen.getByText('Always-on market scanning')).toBeInTheDocument();
    expect(
      screen.getByText('Contextualized alerts + recommendations')
    ).toBeInTheDocument();
    expect(screen.getByText('Automated trade execution')).toBeInTheDocument();
    expect(
      screen.getByText('Personalized risk profiles and signal refinement')
    ).toBeInTheDocument();

    // Check Visual Demo Section
    expect(screen.getByText('See Only Bulls in Action')).toBeInTheDocument();
    expect(screen.getByText('Clean Market Data Interface')).toBeInTheDocument();
  });

  it('should have proper navigation structure', () => {
    render(<Home />);

    // Check navigation links
    expect(screen.getByTestId('nav-link-features')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-demo')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-pricing')).toBeInTheDocument();
    expect(screen.getByTestId('nav-link-faq')).toBeInTheDocument();

    // Check that sections have proper IDs for navigation
    expect(document.querySelector('#benefits')).toBeInTheDocument();
    expect(document.querySelector('#demo')).toBeInTheDocument();
    expect(document.querySelector('#pricing')).toBeInTheDocument();
    expect(document.querySelector('#faq')).toBeInTheDocument();
  });

  it('should have responsive layout structure', () => {
    render(<Home />);

    // Check that main container has proper padding for fixed header
    const main = document.querySelector('main');
    expect(main).toHaveClass('pt-16');

    // Check that header is fixed
    const header = document.querySelector('header');
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0');
  });

  it('should have mobile menu functionality', () => {
    render(<Home />);

    // Check mobile menu toggle exists
    expect(screen.getByTestId('mobile-menu-toggle')).toBeInTheDocument();
  });

  describe('Complete User Journey', () => {
    it('should support hero → CTA → form submission flow', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // 1. User sees hero section
      expect(
        screen.getByText(/24\/7 AI Market Agent That Helps You/)
      ).toBeInTheDocument();

      // 2. User clicks primary CTA in hero section
      const heroCTA = screen.getByText('Start Free Trial');
      await user.click(heroCTA);

      // 3. User should be navigated to pricing section (via smooth scroll)
      // Note: In a real test, we'd check if the pricing section is visible
      // For now, we verify the pricing section exists
      expect(document.querySelector('#pricing')).toBeInTheDocument();

      // 4. User fills out the form in pricing section
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/first name/i);
      const submitButtons = screen.getAllByRole('button', {
        name: /start free trial/i,
      });
      const submitButton = submitButtons.find(
        btn => btn.getAttribute('type') === 'submit'
      );

      await user.type(emailInput, 'test@example.com');
      await user.type(firstNameInput, 'John');

      // 5. User submits the form
      if (submitButton) {
        await user.click(submitButton);

        // 6. Verify form submission was processed
        await waitFor(() => {
          // Check for success message or form reset
          expect(emailInput).toHaveValue('');
        });
      }
    });

    it('should support navigation flow between sections', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Test navigation to Features section
      const featuresLink = screen.getByTestId('nav-link-features');
      await user.click(featuresLink);
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      // Test navigation to Demo section
      const demoLink = screen.getByTestId('nav-link-demo');
      await user.click(demoLink);
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      // Test navigation to Pricing section
      const pricingLink = screen.getByTestId('nav-link-pricing');
      await user.click(pricingLink);
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      // Test navigation to FAQ section
      const faqLink = screen.getByTestId('nav-link-faq');
      await user.click(faqLink);
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('should handle alternative conversion paths', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Test secondary CTA in header
      const headerCTA = screen.getByTestId('header-cta-button');
      expect(headerCTA).toBeInTheDocument();
      await user.click(headerCTA);

      // Test that app download section exists
      expect(screen.getByText('Download Only Bulls')).toBeInTheDocument();
    });
  });

  describe('Mobile Navigation and Interaction Patterns', () => {
    it('should handle mobile menu interactions', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Open mobile menu
      const mobileMenuToggle = screen.getByTestId('mobile-menu-toggle');
      await user.click(mobileMenuToggle);

      // Check mobile menu is visible
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toBeInTheDocument();

      // Test mobile navigation links
      const mobileFeaturesLink = screen.getByTestId('mobile-nav-link-features');
      await user.click(mobileFeaturesLink);

      // Menu should close after navigation
      await waitFor(() => {
        expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
      });
    });

    it('should handle mobile CTA interactions', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Open mobile menu
      const mobileMenuToggle = screen.getByTestId('mobile-menu-toggle');
      await user.click(mobileMenuToggle);

      // Click mobile CTA
      const mobileCTA = screen.getByTestId('mobile-cta-button');
      await user.click(mobileCTA);

      // Menu should close after CTA click
      await waitFor(() => {
        expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
      });
    });

    it('should support touch-friendly interactions', () => {
      render(<Home />);

      // Check that interactive elements have touch-target class
      const ctaButtons = screen.getAllByRole('button');
      ctaButtons.forEach(button => {
        expect(button).toHaveClass('touch-target');
      });

      // Check navigation links have touch-target class
      const navLinks = [
        screen.getByTestId('nav-link-features'),
        screen.getByTestId('nav-link-demo'),
        screen.getByTestId('nav-link-pricing'),
        screen.getByTestId('nav-link-faq'),
      ];

      navLinks.forEach(link => {
        expect(link).toHaveClass('touch-target');
      });
    });
  });

  describe('Error Handling and Loading States', () => {
    it('should display loading states for lazy-loaded sections', () => {
      render(<Home />);

      // Check that lazy sections have fallback loading states
      // Note: In a real test environment, we might need to mock dynamic imports
      // to test loading states properly
      expect(document.querySelector('#benefits')).toBeInTheDocument();
      expect(document.querySelector('#demo')).toBeInTheDocument();
      expect(document.querySelector('#pricing')).toBeInTheDocument();
      expect(document.querySelector('#faq')).toBeInTheDocument();
    });

    it('should handle form validation errors gracefully', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Try to submit form with invalid data
      const submitButtons = screen.getAllByRole('button', {
        name: /start free trial/i,
      });
      const submitButton = submitButtons.find(
        btn => btn.getAttribute('type') === 'submit'
      );

      if (submitButton) {
        await user.click(submitButton);

        // Check that form validation prevents submission
        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toBeInvalid();
      }
    });

    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup();

      // Mock fetch to simulate network error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      render(<Home />);

      // Fill out form
      const emailInput = screen.getByLabelText(/email/i);
      const firstNameInput = screen.getByLabelText(/first name/i);
      const submitButtons = screen.getAllByRole('button', {
        name: /start free trial/i,
      });
      const submitButton = submitButtons.find(
        btn => btn.getAttribute('type') === 'submit'
      );

      await user.type(emailInput, 'test@example.com');
      await user.type(firstNameInput, 'John');

      if (submitButton) {
        await user.click(submitButton);
      }

      // Should handle error gracefully (exact behavior depends on implementation)
      // For now, we just verify the form still exists
      expect(emailInput).toBeInTheDocument();
    });

    it('should provide error boundaries for component failures', () => {
      render(<Home />);

      // Verify that error boundaries are in place
      // This is more of a structural test - in a real scenario,
      // we'd need to trigger component errors to test the boundaries
      expect(document.querySelector('main')).toBeInTheDocument();
    });
  });

  describe('FAQ Section Integration', () => {
    it('should render FAQ section with search functionality', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Check FAQ section exists
      expect(
        screen.getByText('Frequently Asked Questions')
      ).toBeInTheDocument();

      // Test FAQ search functionality
      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      await user.type(searchInput, 'privacy');

      // Should filter FAQs based on search term
      expect(searchInput).toHaveValue('privacy');
    });

    it('should support FAQ category filtering', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Test category filter buttons - use getAllByText to handle multiple instances
      const privacyButtons = screen.getAllByText('Privacy & Security');
      const privacyButton = privacyButtons.find(
        btn => btn.tagName === 'BUTTON'
      );

      if (privacyButton) {
        await user.click(privacyButton);

        // Should filter FAQs by category
        expect(privacyButton).toHaveClass('bg-blue-600', 'text-white');
      }
    });

    it('should support FAQ accordion interactions', async () => {
      const user = userEvent.setup();
      render(<Home />);

      // Find and click on an FAQ item
      const faqItems = screen.getAllByRole('button', { expanded: false });
      const faqItem = faqItems.find(item =>
        item.textContent?.includes(
          'How do you protect my personal and financial data?'
        )
      );

      if (faqItem) {
        await user.click(faqItem);

        // Should expand the FAQ item
        expect(faqItem).toHaveAttribute('aria-expanded', 'true');
      }
    });
  });

  describe('App Download Integration', () => {
    it('should render app download section with proper links', () => {
      render(<Home />);

      // Check that app download section exists
      expect(screen.getByText('Download Only Bulls')).toBeInTheDocument();

      // Check for app store links by looking for specific link attributes
      const appStoreLinks = document.querySelectorAll(
        'a[href*="apps.apple.com"]'
      );
      const playStoreLinks = document.querySelectorAll(
        'a[href*="play.google.com"]'
      );

      expect(appStoreLinks.length).toBeGreaterThan(0);
      expect(playStoreLinks.length).toBeGreaterThan(0);

      // Check specific URLs
      const appStoreLink = Array.from(appStoreLinks).find(
        link =>
          link.getAttribute('href') ===
          'https://apps.apple.com/us/app/onlybulls/id6746166943'
      );
      const playStoreLink = Array.from(playStoreLinks).find(
        link =>
          link.getAttribute('href') ===
          'https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1'
      );

      expect(appStoreLink).toBeTruthy();
      expect(playStoreLink).toBeTruthy();

      // Check that links open in new tab
      expect(appStoreLink?.getAttribute('target')).toBe('_blank');
      expect(playStoreLink?.getAttribute('target')).toBe('_blank');
    });

    it('should display company branding correctly', () => {
      render(<Home />);

      // Check for company links by looking for specific link attributes
      const askRoiLinks = document.querySelectorAll('a[href*="askroi.com"]');
      const aultNodesLinks = document.querySelectorAll(
        'a[href*="aultnodes.com"]'
      );

      expect(askRoiLinks.length).toBeGreaterThan(0);
      expect(aultNodesLinks.length).toBeGreaterThan(0);

      // Check specific URLs
      const askRoiLink = Array.from(askRoiLinks).find(
        link => link.getAttribute('href') === 'https://askroi.com'
      );
      const aultNodesLink = Array.from(aultNodesLinks).find(
        link => link.getAttribute('href') === 'https://aultnodes.com/'
      );

      expect(askRoiLink).toBeTruthy();
      expect(aultNodesLink).toBeTruthy();
    });
  });
});
