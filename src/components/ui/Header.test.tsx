import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

const mockNavigationItems = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const mockCTAButton = {
  text: 'Sign In',
  variant: 'secondary' as const,
  onClick: vi.fn(),
};

const defaultProps = {
  logo: '/logo.png',
  navigationItems: mockNavigationItems,
  ctaButton: mockCTAButton,
};

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Logo Display', () => {
    it('should display the Only Bulls logo', () => {
      render(<Header {...defaultProps} />);

      const logo = screen.getByTestId('header-logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo.png');
      expect(logo).toHaveAttribute('alt', 'Only Bulls');
    });
  });

  describe('Navigation Functionality', () => {
    it('should render all navigation items in desktop view', () => {
      render(<Header {...defaultProps} />);

      mockNavigationItems.forEach(item => {
        const navLink = screen.getByTestId(
          `nav-link-${item.label.toLowerCase()}`
        );
        expect(navLink).toBeInTheDocument();
        expect(navLink).toHaveAttribute('href', item.href);
        expect(navLink).toHaveTextContent(item.label);
      });
    });

    it('should highlight active navigation item', () => {
      const propsWithActiveItem = {
        ...defaultProps,
        navigationItems: [
          { label: 'Features', href: '#features', isActive: true },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
        ],
      };

      render(<Header {...propsWithActiveItem} />);

      const activeLink = screen.getByTestId('nav-link-features');
      expect(activeLink).toHaveClass('text-blue-600');
    });

    it('should render CTA button with correct text and variant', () => {
      render(<Header {...defaultProps} />);

      const ctaButton = screen.getByTestId('header-cta-button');
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton).toHaveTextContent('Sign In');
      expect(ctaButton).toHaveClass('bg-gray-100', 'text-gray-900');
    });

    it('should call onClick handler when CTA button is clicked', () => {
      render(<Header {...defaultProps} />);

      const ctaButton = screen.getByTestId('header-cta-button');
      fireEvent.click(ctaButton);

      expect(mockCTAButton.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Mobile Menu Toggle Behavior', () => {
    it('should show mobile menu toggle button', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-label', 'Toggle mobile menu');
    });

    it('should toggle mobile menu when toggle button is clicked', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');

      // Initially, mobile menu should not be visible
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

      // Click to open mobile menu
      fireEvent.click(toggleButton);
      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

      // Click to close mobile menu
      fireEvent.click(toggleButton);
      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

    it('should render navigation items in mobile menu', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(toggleButton);

      mockNavigationItems.forEach(item => {
        const mobileNavLink = screen.getByTestId(
          `mobile-nav-link-${item.label.toLowerCase()}`
        );
        expect(mobileNavLink).toBeInTheDocument();
        expect(mobileNavLink).toHaveAttribute('href', item.href);
        expect(mobileNavLink).toHaveTextContent(item.label);
      });
    });

    it('should render CTA button in mobile menu', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(toggleButton);

      const mobileCTAButton = screen.getByTestId('mobile-cta-button');
      expect(mobileCTAButton).toBeInTheDocument();
      expect(mobileCTAButton).toHaveTextContent('Sign In');
    });

    it('should close mobile menu when mobile navigation link is clicked', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(toggleButton);

      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

      const mobileNavLink = screen.getByTestId('mobile-nav-link-features');
      fireEvent.click(mobileNavLink);

      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
    });

    it('should close mobile menu when mobile CTA button is clicked', () => {
      render(<Header {...defaultProps} />);

      const toggleButton = screen.getByTestId('mobile-menu-toggle');
      fireEvent.click(toggleButton);

      expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();

      const mobileCTAButton = screen.getByTestId('mobile-cta-button');
      fireEvent.click(mobileCTAButton);

      expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
      expect(mockCTAButton.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Loading States', () => {
    it('should show loading spinner when CTA button is in loading state', () => {
      const propsWithLoading = {
        ...defaultProps,
        ctaButton: {
          ...mockCTAButton,
          loading: true,
        },
      };

      render(<Header {...propsWithLoading} />);

      const ctaButton = screen.getByTestId('header-cta-button');
      expect(ctaButton).toBeDisabled();

      // Check for loading spinner (div with animate-spin class)
      const spinner = ctaButton.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should disable CTA button when in loading state', () => {
      const propsWithLoading = {
        ...defaultProps,
        ctaButton: {
          ...mockCTAButton,
          loading: true,
        },
      };

      render(<Header {...propsWithLoading} />);

      const ctaButton = screen.getByTestId('header-cta-button');
      fireEvent.click(ctaButton);

      // Should not call onClick when disabled
      expect(mockCTAButton.onClick).not.toHaveBeenCalled();
    });
  });
});
