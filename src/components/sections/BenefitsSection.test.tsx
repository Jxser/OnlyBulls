import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import BenefitsSection from './BenefitsSection';

describe('BenefitsSection Component', () => {
  describe('Content Presence - All Four Key Benefits', () => {
    it('should display "Always-on market scanning" benefit', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Always-on market scanning')).toBeInTheDocument();
      expect(
        screen.getByText(/Our AI continuously monitors market conditions/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/so you never miss a potential trade/)
      ).toBeInTheDocument();
    });

    it('should display "Contextualized alerts + recommendations" benefit', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText('Contextualized alerts + recommendations')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Receive intelligent notifications with actionable insights/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /tailored to your portfolio, risk tolerance, and trading strategy/
        )
      ).toBeInTheDocument();
    });

    it('should display "Automated trade execution" benefit', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Automated trade execution')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Let AI execute trades based on your predefined strategies/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/removing emotion from your trading decisions/)
      ).toBeInTheDocument();
    });

    it('should display "Personalized risk profiles and signal refinement" benefit', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText('Personalized risk profiles and signal refinement')
      ).toBeInTheDocument();
      expect(
        screen.getByText(/AI learns from your trading patterns and preferences/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/to provide increasingly personalized recommendations/)
      ).toBeInTheDocument();
    });
  });

  describe('Coming Soon Badge - Automated Execution', () => {
    it('should display "Coming Soon" badge for automated trade execution', () => {
      render(<BenefitsSection />);

      // Check for Coming Soon badges (there should be 2 - one in the card and one in the visual demo)
      const comingSoonBadges = screen.getAllByText('Coming Soon');
      expect(comingSoonBadges).toHaveLength(2);

      // Verify the badge is associated with the automated execution benefit
      const automatedExecutionCard = screen
        .getByText('Automated trade execution')
        .closest('.bg-white');
      expect(automatedExecutionCard).toContainElement(comingSoonBadges[0]);
    });

    it('should style Coming Soon badge with purple background', () => {
      render(<BenefitsSection />);

      const comingSoonBadges = screen.getAllByText('Coming Soon');
      comingSoonBadges.forEach(badge => {
        expect(badge).toHaveClass('bg-purple-600', 'text-white');
      });
    });
  });

  describe('Visual Demonstrations', () => {
    it('should display pulse animation for market scanning', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Scanning 24/7')).toBeInTheDocument();

      // Check for pulse animation class
      const pulseElement =
        screen.getByText('Scanning 24/7').previousElementSibling;
      expect(pulseElement).toHaveClass('animate-pulse');
    });

    it('should display smart alert notification mockup', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Smart Alert')).toBeInTheDocument();
      expect(
        screen.getByText(
          /AAPL showing bullish pattern - Consider entry at \$175/
        )
      ).toBeInTheDocument();
    });

    it('should display auto-execution ready indicator', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Auto-execution ready')).toBeInTheDocument();
    });

    it('should display personalized risk profile visualization', () => {
      render(<BenefitsSection />);

      expect(screen.getByText('Risk Tolerance')).toBeInTheDocument();
      expect(screen.getByText('Moderate')).toBeInTheDocument();
      expect(screen.getByText('AI Learning')).toBeInTheDocument();
      expect(screen.getByText('85% Complete')).toBeInTheDocument();
    });
  });

  describe('Section Header', () => {
    it('should display main section heading', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText('Four Key Benefits That Transform Your Trading')
      ).toBeInTheDocument();
    });

    it('should display section description', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText(
          /Experience the power of AI-driven market intelligence/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/with features designed to give you an edge/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout and Styling', () => {
    it('should have responsive grid layout', () => {
      render(<BenefitsSection />);

      const gridContainer = screen
        .getByText('Always-on market scanning')
        .closest('.grid');
      expect(gridContainer).toHaveClass(
        'grid',
        'md:grid-cols-2',
        'lg:grid-cols-2',
        'gap-8'
      );
    });

    it('should have proper section background and spacing', () => {
      render(<BenefitsSection />);

      const section = screen
        .getByText('Four Key Benefits That Transform Your Trading')
        .closest('section');
      expect(section).toHaveClass(
        'py-20',
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'bg-gray-50'
      );
    });

    it('should have hover effects on benefit cards', () => {
      render(<BenefitsSection />);

      const benefitCard = screen
        .getByText('Always-on market scanning')
        .closest('.bg-white');
      expect(benefitCard).toHaveClass(
        'hover:shadow-xl',
        'transition-all',
        'duration-300'
      );
    });

    it('should have group hover effects', () => {
      render(<BenefitsSection />);

      const benefitCard = screen
        .getByText('Always-on market scanning')
        .closest('.group');
      expect(benefitCard).toHaveClass('group');

      // Check for group-hover effects in child elements
      const iconContainer = benefitCard?.querySelector(
        '.group-hover\\:scale-110'
      );
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Icons and Visual Elements', () => {
    it('should render benefit icons', () => {
      render(<BenefitsSection />);

      // Check that SVG icons are present (Heroicons render as SVG elements)
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should have proper icon styling', () => {
      render(<BenefitsSection />);

      const iconContainers = document.querySelectorAll(
        '.w-16.h-16.bg-white.rounded-xl.shadow-md'
      );
      expect(iconContainers.length).toBe(4); // One for each benefit
    });
  });

  describe('Call-to-Action Section', () => {
    it('should display bottom CTA section', () => {
      render(<BenefitsSection />);

      expect(
        screen.getByText('Ready to experience these benefits for yourself?')
      ).toBeInTheDocument();
    });

    it('should have CTA buttons with proper styling', () => {
      render(<BenefitsSection />);

      const startTrialButton = screen.getByText('Start Your Free Trial');
      expect(startTrialButton).toHaveClass(
        'bg-blue-600',
        'text-white',
        'min-h-[44px]'
      );

      const learnMoreButton = screen.getByText('Learn More');
      expect(learnMoreButton).toHaveClass(
        'border',
        'border-gray-300',
        'text-gray-700',
        'min-h-[44px]'
      );
    });

    it('should have responsive CTA button layout', () => {
      render(<BenefitsSection />);

      const ctaContainer = screen
        .getByText('Start Your Free Trial')
        .closest('.flex');
      expect(ctaContainer).toHaveClass(
        'flex',
        'flex-col',
        'sm:flex-row',
        'gap-4',
        'justify-center',
        'items-center'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<BenefitsSection />);

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent(
        'Four Key Benefits That Transform Your Trading'
      );

      const benefitHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(benefitHeadings).toHaveLength(4);
      expect(benefitHeadings[0]).toHaveTextContent('Always-on market scanning');
      expect(benefitHeadings[1]).toHaveTextContent(
        'Contextualized alerts + recommendations'
      );
      expect(benefitHeadings[2]).toHaveTextContent('Automated trade execution');
      expect(benefitHeadings[3]).toHaveTextContent(
        'Personalized risk profiles and signal refinement'
      );
    });

    it('should have touch-friendly button sizes', () => {
      render(<BenefitsSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('min-h-[44px]');
      });
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<BenefitsSection className="custom-test-class" />);

      const section = screen
        .getByText('Four Key Benefits That Transform Your Trading')
        .closest('section');
      expect(section).toHaveClass('custom-test-class');
    });

    it('should maintain default classes when custom className is provided', () => {
      render(<BenefitsSection className="custom-test-class" />);

      const section = screen
        .getByText('Four Key Benefits That Transform Your Trading')
        .closest('section');
      expect(section).toHaveClass(
        'py-20',
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'bg-gray-50',
        'custom-test-class'
      );
    });
  });

  describe('Color Coding and Visual Hierarchy', () => {
    it('should use different colors for each benefit icon', () => {
      render(<BenefitsSection />);

      // Check that different colored icons are present
      const blueIcon = document.querySelector('.text-blue-600');
      const greenIcon = document.querySelector('.text-green-600');
      const purpleIcon = document.querySelector('.text-purple-600');
      const indigoIcon = document.querySelector('.text-indigo-600');

      expect(blueIcon).toBeInTheDocument();
      expect(greenIcon).toBeInTheDocument();
      expect(purpleIcon).toBeInTheDocument();
      expect(indigoIcon).toBeInTheDocument();
    });

    it('should have consistent visual demo styling', () => {
      render(<BenefitsSection />);

      // Check for visual demo containers with proper styling
      const greenDemo = document.querySelector('.bg-green-50.border-green-200');
      const purpleDemo = document.querySelector(
        '.bg-purple-50.border-purple-200'
      );

      expect(greenDemo).toBeInTheDocument();
      expect(purpleDemo).toBeInTheDocument();
    });
  });
});
