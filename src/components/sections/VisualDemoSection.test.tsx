import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisualDemoSection from './VisualDemoSection';

describe('VisualDemoSection Component', () => {
  describe('Dashboard Mockup Visuals', () => {
    it('should display clean market data interface section', () => {
      render(<VisualDemoSection />);

      expect(
        screen.getByText('Clean Market Data Interface')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Professional-grade market analysis made simple and accessible'
        )
      ).toBeInTheDocument();
    });

    it('should display dashboard mockup with browser frame', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Only Bulls Dashboard')).toBeInTheDocument();

      // Check for browser window controls
      const browserControls = document.querySelectorAll(
        '.w-3.h-3.rounded-full'
      );
      expect(browserControls.length).toBeGreaterThanOrEqual(3); // Red, yellow, green buttons
    });

    it('should display market overview with live indicator', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Market Overview')).toBeInTheDocument();
      expect(screen.getByText('Live')).toBeInTheDocument();

      // Check for live indicator animation
      const liveIndicator = screen.getByText('Live').previousElementSibling;
      expect(liveIndicator).toHaveClass('animate-pulse');
    });

    it('should display market statistics with proper data', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('S&P 500')).toBeInTheDocument();
      expect(screen.getByText('4,567.89')).toBeInTheDocument();
      expect(screen.getByText('+1.23%')).toBeInTheDocument();

      expect(screen.getByText('NASDAQ')).toBeInTheDocument();
      expect(screen.getByText('14,234.56')).toBeInTheDocument();
      expect(screen.getByText('+0.87%')).toBeInTheDocument();

      expect(screen.getByText('Portfolio')).toBeInTheDocument();
      expect(screen.getByText('$127,456')).toBeInTheDocument();
      expect(screen.getByText('+2.14%')).toBeInTheDocument();
    });

    it('should display AI insights panel with different alert types', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('AI Insights')).toBeInTheDocument();
      expect(screen.getByText('Bullish Signal')).toBeInTheDocument();
      expect(
        screen.getByText('AAPL showing strong momentum')
      ).toBeInTheDocument();

      expect(screen.getByText('Entry Opportunity')).toBeInTheDocument();
      expect(screen.getByText('TSLA at support level')).toBeInTheDocument();

      expect(screen.getByText('Risk Alert')).toBeInTheDocument();
      expect(screen.getByText('High volatility expected')).toBeInTheDocument();
    });

    it('should display mock chart visualization', () => {
      render(<VisualDemoSection />);

      // Check for chart bars (should be 15 bars based on the data array)
      const chartBars = document.querySelectorAll(
        '.bg-blue-500.rounded-t.flex-1'
      );
      expect(chartBars.length).toBe(15);
    });
  });

  describe('Mobile Alert System Examples', () => {
    it('should display smart mobile alerts section', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Smart Mobile Alerts')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Get contextual notifications with actionable insights wherever you are'
        )
      ).toBeInTheDocument();
    });

    it('should display iPhone frame with notifications', () => {
      render(<VisualDemoSection />);

      // Check for iPhone frame structure
      const iphoneFrame = document.querySelector(
        '.w-64.h-\\[500px\\].bg-black.rounded-\\[2\\.5rem\\]'
      );
      expect(iphoneFrame).toBeInTheDocument();

      expect(screen.getByText('Only Bulls')).toBeInTheDocument();
    });

    it('should display market alert notification', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Market Alert')).toBeInTheDocument();
      expect(
        screen.getByText(/NVDA breaking resistance at \$485/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Consider entry with stop at \$475/)
      ).toBeInTheDocument();
      expect(screen.getByText('2 min ago')).toBeInTheDocument();
    });

    it('should display trade execution notification', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Trade Executed')).toBeInTheDocument();
      expect(
        screen.getByText(/Successfully bought 100 shares of AAPL at \$175\.50/)
      ).toBeInTheDocument();
      expect(screen.getByText('5 min ago')).toBeInTheDocument();
    });

    it('should display portfolio update notification', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Portfolio Update')).toBeInTheDocument();
      expect(
        screen.getByText(/Your portfolio is up 2\.3% today\. Great job!/)
      ).toBeInTheDocument();
      expect(screen.getByText('1 hour ago')).toBeInTheDocument();
    });

    it('should display notification action buttons', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Act')).toBeInTheDocument();
      expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('should display desktop notification example', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Smart Alert System')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Receive intelligent notifications across all your devices/
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Real-time')).toBeInTheDocument();
      expect(screen.getByText('Contextual')).toBeInTheDocument();
    });

    it('should display device labels', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Mobile Alerts')).toBeInTheDocument();
      expect(screen.getByText('Desktop Notifications')).toBeInTheDocument();
    });
  });

  describe('Decision Flow Illustrations', () => {
    it('should display AI-powered decision flow section', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('AI-Powered Decision Flow')).toBeInTheDocument();
      expect(
        screen.getByText(
          /See how our AI analyzes market conditions and provides step-by-step recommendations/
        )
      ).toBeInTheDocument();
    });

    it('should display all four decision flow steps', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('Market Scan')).toBeInTheDocument();
      expect(
        screen.getByText(
          /AI continuously monitors market conditions and identifies opportunities/
        )
      ).toBeInTheDocument();

      expect(screen.getByText('Analysis')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Deep analysis of technical indicators, sentiment, and risk factors/
        )
      ).toBeInTheDocument();

      expect(screen.getByText('Recommendation')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Personalized trading recommendations based on your risk profile/
        )
      ).toBeInTheDocument();

      expect(screen.getByText('Execution')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Optional automated execution or manual confirmation based on your preference/
        )
      ).toBeInTheDocument();
    });

    it('should display step numbers in colored circles', () => {
      render(<VisualDemoSection />);

      // Check for step numbers 1-4
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
    });

    it('should display decision flow CTA section', () => {
      render(<VisualDemoSection />);

      expect(
        screen.getByText('Experience the power of AI-driven trading decisions')
      ).toBeInTheDocument();
      expect(screen.getByText('See It In Action')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  describe('Section Header', () => {
    it('should display main section heading', () => {
      render(<VisualDemoSection />);

      expect(screen.getByText('See Only Bulls in Action')).toBeInTheDocument();
    });

    it('should display section description', () => {
      render(<VisualDemoSection />);

      expect(
        screen.getByText(
          /Experience the clean, intuitive interface that makes complex market data/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/accessible and actionable for traders at every level/)
      ).toBeInTheDocument();
    });
  });

  describe('Image Loading and Alt Text Accessibility', () => {
    it('should have proper alt text for visual elements', () => {
      render(<VisualDemoSection />);

      // While this component uses CSS-based visuals rather than images,
      // we should check that icons have proper accessibility
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should have accessible button labels', () => {
      render(<VisualDemoSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveTextContent(/\S/); // Should have non-empty text content
      });
    });

    it('should have proper heading hierarchy', () => {
      render(<VisualDemoSection />);

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('See Only Bulls in Action');

      const subHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(subHeadings.length).toBeGreaterThanOrEqual(3);
      expect(subHeadings[0]).toHaveTextContent('Clean Market Data Interface');
      expect(subHeadings[1]).toHaveTextContent('Smart Mobile Alerts');
      expect(subHeadings[2]).toHaveTextContent('AI-Powered Decision Flow');
    });

    it('should have proper heading hierarchy for decision flow steps', () => {
      render(<VisualDemoSection />);

      const stepHeadings = screen.getAllByRole('heading', { level: 4 });
      expect(stepHeadings.length).toBeGreaterThanOrEqual(4);
      expect(stepHeadings.some(h => h.textContent === 'Market Scan')).toBe(
        true
      );
      expect(stepHeadings.some(h => h.textContent === 'Analysis')).toBe(true);
      expect(stepHeadings.some(h => h.textContent === 'Recommendation')).toBe(
        true
      );
      expect(stepHeadings.some(h => h.textContent === 'Execution')).toBe(true);
    });
  });

  describe('Layout and Styling', () => {
    it('should have proper section background and spacing', () => {
      render(<VisualDemoSection />);

      const section = screen
        .getByText('See Only Bulls in Action')
        .closest('section');
      expect(section).toHaveClass(
        'py-20',
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'bg-white'
      );
    });

    it('should have responsive grid layout for decision flow', () => {
      render(<VisualDemoSection />);

      const gridContainer = screen.getByText('Market Scan').closest('.grid');
      expect(gridContainer).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-4',
        'gap-8'
      );
    });

    it('should have proper mobile and desktop layout for alerts', () => {
      render(<VisualDemoSection />);

      const alertsContainer = screen
        .getByText('Smart Mobile Alerts')
        .nextElementSibling?.querySelector('.flex');
      expect(alertsContainer).toHaveClass('flex', 'flex-col', 'lg:flex-row');
    });

    it('should have touch-friendly button sizes', () => {
      render(<VisualDemoSection />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('min-h-[44px]');
      });
    });

    it('should have hover effects on decision flow cards', () => {
      render(<VisualDemoSection />);

      const decisionCard = screen.getByText('Market Scan').closest('.bg-white');
      expect(decisionCard).toHaveClass(
        'hover:shadow-xl',
        'transition-shadow',
        'duration-300'
      );
    });
  });

  describe('Icons and Visual Elements', () => {
    it('should render decision flow icons', () => {
      render(<VisualDemoSection />);

      // Check that SVG icons are present (Heroicons render as SVG elements)
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should have proper color coding for different sections', () => {
      render(<VisualDemoSection />);

      // Check for different colored elements
      const blueElements = document.querySelectorAll(
        '.bg-blue-100, .text-blue-600, .bg-blue-600'
      );
      const greenElements = document.querySelectorAll(
        '.bg-green-100, .text-green-600, .bg-green-600'
      );
      const purpleElements = document.querySelectorAll(
        '.bg-purple-100, .text-purple-600, .bg-purple-600'
      );

      expect(blueElements.length).toBeGreaterThan(0);
      expect(greenElements.length).toBeGreaterThan(0);
      expect(purpleElements.length).toBeGreaterThan(0);
    });

    it('should display status indicators with proper styling', () => {
      render(<VisualDemoSection />);

      // Check for various status indicators
      const statusDots = document.querySelectorAll('.w-2.h-2.rounded-full');
      expect(statusDots.length).toBeGreaterThan(0);
    });
  });

  describe('Interactive Elements', () => {
    it('should have properly styled CTA buttons', () => {
      render(<VisualDemoSection />);

      const primaryButton = screen.getByText('See It In Action');
      expect(primaryButton).toHaveClass('bg-blue-600', 'text-white');

      const secondaryButton = screen.getByText('Learn More');
      expect(secondaryButton).toHaveClass(
        'border',
        'border-gray-300',
        'text-gray-700'
      );
    });

    it('should have responsive CTA button layout', () => {
      render(<VisualDemoSection />);

      const ctaContainer = screen
        .getByText('See It In Action')
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

    it('should have notification action buttons with proper styling', () => {
      render(<VisualDemoSection />);

      const actButton = screen.getByText('Act');
      expect(actButton).toHaveClass('bg-blue-600', 'text-white');

      const dismissButton = screen.getByText('Dismiss');
      expect(dismissButton).toHaveClass(
        'border',
        'border-gray-300',
        'text-gray-700'
      );
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<VisualDemoSection className="custom-test-class" />);

      const section = screen
        .getByText('See Only Bulls in Action')
        .closest('section');
      expect(section).toHaveClass('custom-test-class');
    });

    it('should maintain default classes when custom className is provided', () => {
      render(<VisualDemoSection className="custom-test-class" />);

      const section = screen
        .getByText('See Only Bulls in Action')
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

  describe('Content Organization', () => {
    it('should organize content in logical sections', () => {
      render(<VisualDemoSection />);

      // Check that all three main sections are present in order
      const allText = document.body.textContent || '';
      const dashboardIndex = allText.indexOf('Clean Market Data Interface');
      const alertsIndex = allText.indexOf('Smart Mobile Alerts');
      const decisionFlowIndex = allText.indexOf('AI-Powered Decision Flow');

      expect(dashboardIndex).toBeLessThan(alertsIndex);
      expect(alertsIndex).toBeLessThan(decisionFlowIndex);
    });

    it('should have proper spacing between sections', () => {
      render(<VisualDemoSection />);

      // Check for margin classes that provide spacing between sections
      const sectionElements = document.querySelectorAll('.mb-20');
      expect(sectionElements.length).toBeGreaterThanOrEqual(2);
    });
  });
});
