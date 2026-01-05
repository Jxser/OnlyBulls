import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProblemOutcomeSection from './ProblemOutcomeSection';

describe('ProblemOutcomeSection Component', () => {
  describe('Content Presence - Financial Stress', () => {
    it('should display problem statement about manual market monitoring stress', () => {
      render(<ProblemOutcomeSection />);

      expect(
        screen.getByText('Stop the Stress of Manual Market Monitoring')
      ).toBeInTheDocument();
      expect(
        screen.getByText(/You're losing sleep, missing opportunities/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/can't watch the markets 24\/7/)
      ).toBeInTheDocument();
    });

    it('should show current reality stress indicators', () => {
      render(<ProblemOutcomeSection />);

      expect(screen.getByText('The Current Reality')).toBeInTheDocument();
      expect(
        screen.getByText(/Constant anxiety about missing market moves/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Hours spent analyzing charts with no clear direction/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/FOMO-driven decisions that hurt your portfolio/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Inconsistent results despite your best efforts/)
      ).toBeInTheDocument();
    });
  });

  describe('Content Presence - Time Savings', () => {
    it('should display time saved outcome with specific metric', () => {
      render(<ProblemOutcomeSection />);

      expect(screen.getByText('Time Saved')).toBeInTheDocument();
      expect(
        screen.getByText(/Stop spending hours analyzing charts and market data/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our AI monitors 24\/7 so you don't have to/)
      ).toBeInTheDocument();
      expect(screen.getByText('Save 4+ hours daily')).toBeInTheDocument();
    });
  });

  describe('Content Presence - Decision Confidence', () => {
    it('should display decision confidence outcome with metric', () => {
      render(<ProblemOutcomeSection />);

      expect(screen.getByText('Decision Confidence')).toBeInTheDocument();
      expect(
        screen.getByText(/Make informed decisions backed by AI analysis/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/instead of gut feelings and FOMO/)
      ).toBeInTheDocument();
      expect(screen.getByText('95% confidence boost')).toBeInTheDocument();
    });
  });

  describe('Content Presence - Better Performance', () => {
    it('should display better performance outcome with metric', () => {
      render(<ProblemOutcomeSection />);

      expect(screen.getByText('Better Performance')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Achieve consistent results with data-driven strategies/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/instead of emotional trading/)
      ).toBeInTheDocument();
      expect(screen.getByText('30% better returns')).toBeInTheDocument();
    });
  });

  describe('Visual Elements - Before/After Scenarios', () => {
    it('should display transformation messaging', () => {
      render(<ProblemOutcomeSection />);

      expect(
        screen.getByText('Transform Your Trading Experience')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Experience the calm confidence that comes with AI-powered market intelligence/
        )
      ).toBeInTheDocument();
    });

    it('should show success indicator with new reality messaging', () => {
      render(<ProblemOutcomeSection />);

      expect(screen.getByText('Your New Reality')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Sleep better knowing your AI agent is watching the markets/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /making informed decisions, and protecting your investments/
        )
      ).toBeInTheDocument();
    });

    it('should display visual stress indicators with red styling', () => {
      render(<ProblemOutcomeSection />);

      const problemSection = screen
        .getByText('The Current Reality')
        .closest('.bg-red-50');
      expect(problemSection).toHaveClass(
        'bg-red-50',
        'border',
        'border-red-200'
      );
    });

    it('should display positive outcome styling with green/blue gradients', () => {
      render(<ProblemOutcomeSection />);

      const timeOutcome = screen
        .getByText('Time Saved')
        .closest('.bg-gradient-to-r');
      expect(timeOutcome).toHaveClass(
        'bg-gradient-to-r',
        'from-green-50',
        'to-blue-50'
      );

      const confidenceOutcome = screen
        .getByText('Decision Confidence')
        .closest('.bg-gradient-to-r');
      expect(confidenceOutcome).toHaveClass(
        'bg-gradient-to-r',
        'from-green-50',
        'to-blue-50'
      );

      const performanceOutcome = screen
        .getByText('Better Performance')
        .closest('.bg-gradient-to-r');
      expect(performanceOutcome).toHaveClass(
        'bg-gradient-to-r',
        'from-green-50',
        'to-blue-50'
      );
    });
  });

  describe('Responsive Layout Behavior', () => {
    it('should have responsive grid layout classes', () => {
      render(<ProblemOutcomeSection />);

      const gridContainer = screen
        .getByText('Stop the Stress of Manual Market Monitoring')
        .closest('.grid');
      expect(gridContainer).toHaveClass(
        'grid',
        'lg:grid-cols-2',
        'gap-16',
        'items-center'
      );
    });

    it('should have responsive text alignment classes', () => {
      render(<ProblemOutcomeSection />);

      const problemHeading = screen
        .getByText('Stop the Stress of Manual Market Monitoring')
        .closest('div');
      expect(problemHeading).toHaveClass('text-center', 'lg:text-left');

      const outcomeHeading = screen
        .getByText('Transform Your Trading Experience')
        .closest('div');
      expect(outcomeHeading).toHaveClass('text-center', 'lg:text-left');
    });

    it('should have responsive typography classes', () => {
      render(<ProblemOutcomeSection />);

      const problemHeading = screen.getByText(
        'Stop the Stress of Manual Market Monitoring'
      );
      expect(problemHeading).toHaveClass('text-3xl', 'sm:text-4xl');

      const outcomeHeading = screen.getByText(
        'Transform Your Trading Experience'
      );
      expect(outcomeHeading).toHaveClass('text-3xl', 'sm:text-4xl');
    });

    it('should have responsive padding and spacing', () => {
      render(<ProblemOutcomeSection />);

      const section = screen
        .getByText('Stop the Stress of Manual Market Monitoring')
        .closest('section');
      expect(section).toHaveClass('py-20', 'px-4', 'sm:px-6', 'lg:px-8');
    });
  });

  describe('Icons and Visual Elements', () => {
    it('should render outcome icons', () => {
      render(<ProblemOutcomeSection />);

      // Check that SVG icons are present (Heroicons render as SVG elements with aria-hidden)
      const svgElements = document.querySelectorAll('svg[aria-hidden="true"]');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should have hover effects on outcome cards', () => {
      render(<ProblemOutcomeSection />);

      const timeOutcome = screen
        .getByText('Time Saved')
        .closest('.hover\\:shadow-lg');
      expect(timeOutcome).toHaveClass(
        'hover:shadow-lg',
        'transition-shadow',
        'duration-300'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<ProblemOutcomeSection />);

      const mainHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(mainHeadings).toHaveLength(2);
      expect(mainHeadings[0]).toHaveTextContent(
        'Stop the Stress of Manual Market Monitoring'
      );
      expect(mainHeadings[1]).toHaveTextContent(
        'Transform Your Trading Experience'
      );
    });

    it('should have proper subheading hierarchy', () => {
      render(<ProblemOutcomeSection />);

      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(subHeadings.length).toBeGreaterThan(0);
      expect(
        screen.getByRole('heading', { level: 3, name: 'The Current Reality' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Time Saved' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Decision Confidence' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Better Performance' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 3, name: 'Your New Reality' })
      ).toBeInTheDocument();
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<ProblemOutcomeSection className="custom-test-class" />);

      const section = screen
        .getByText('Stop the Stress of Manual Market Monitoring')
        .closest('section');
      expect(section).toHaveClass('custom-test-class');
    });

    it('should maintain default classes when custom className is provided', () => {
      render(<ProblemOutcomeSection className="custom-test-class" />);

      const section = screen
        .getByText('Stop the Stress of Manual Market Monitoring')
        .closest('section');
      expect(section).toHaveClass(
        'py-20',
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'bg-white',
        'custom-test-class'
      );
    });
  });
});
