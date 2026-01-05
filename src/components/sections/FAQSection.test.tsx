import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FAQSection from './FAQSection';

describe('FAQSection Component', () => {
  describe('Privacy FAQ Content - Requirement 7.1', () => {
    it('should display privacy and data security questions', () => {
      render(<FAQSection />);

      expect(
        screen.getByText('How do you protect my personal and financial data?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Do you store my brokerage account credentials?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Can you access my money or make unauthorized trades?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('What data do you collect and why?')
      ).toBeInTheDocument();
    });

    it('should display privacy answers with security details', () => {
      render(<FAQSection />);

      // Expand first privacy question
      fireEvent.click(
        screen.getByText('How do you protect my personal and financial data?')
      );

      expect(
        screen.getByText(/bank-level security with 256-bit SSL encryption/)
      ).toBeInTheDocument();
      expect(screen.getByText(/SOC 2 compliant/)).toBeInTheDocument();
      expect(
        screen.getByText(/never shared with third parties/)
      ).toBeInTheDocument();
    });
  });

  describe('AI Decisions FAQ Content - Requirement 7.2', () => {
    it('should display AI decision-making process questions', () => {
      render(<FAQSection />);

      expect(
        screen.getByText('How does the AI make trading recommendations?')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Can I understand why the AI made a specific recommendation?'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('Does the AI learn from my trading preferences?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('What happens if the AI makes a wrong prediction?')
      ).toBeInTheDocument();
    });

    it('should display AI decision explanations in non-technical language', () => {
      render(<FAQSection />);

      // Expand first AI question
      fireEvent.click(
        screen.getByText('How does the AI make trading recommendations?')
      );

      expect(
        screen.getByText(/analyzes thousands of market indicators/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/learns from successful trading patterns/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/includes the reasoning behind it/)
      ).toBeInTheDocument();
    });
  });

  describe('Risk Management FAQ Content - Requirement 7.3', () => {
    it('should display risk management and safeguards questions', () => {
      render(<FAQSection />);

      expect(
        screen.getByText('How do you help me manage trading risk?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Can I set limits on how much the AI can trade?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('What safeguards prevent major losses?')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'How do you handle market crashes or extreme volatility?'
        )
      ).toBeInTheDocument();
    });

    it('should display risk management safeguards and controls', () => {
      render(<FAQSection />);

      // Expand first risk management question
      fireEvent.click(
        screen.getByText('How do you help me manage trading risk?')
      );

      expect(
        screen.getByText(/position sizing recommendations/)
      ).toBeInTheDocument();
      expect(screen.getByText(/stop-loss suggestions/)).toBeInTheDocument();
      expect(
        screen.getByText(/portfolio diversification alerts/)
      ).toBeInTheDocument();
      expect(screen.getByText(/risk score calculations/)).toBeInTheDocument();
    });
  });

  describe('Technical FAQ Content - Requirement 7.4', () => {
    it('should display technical questions about platform features', () => {
      render(<FAQSection />);

      expect(
        screen.getByText('Which brokers do you work with?')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Do I need to download software or can I use it on mobile?'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('What markets and assets can the AI trade?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('How fast does the AI react to market changes?')
      ).toBeInTheDocument();
    });

    it('should display technical answers with platform details', () => {
      render(<FAQSection />);

      // Expand first technical question
      fireEvent.click(screen.getByText('Which brokers do you work with?'));

      expect(screen.getByText(/TD Ameritrade/)).toBeInTheDocument();
      expect(screen.getByText(/E\*TRADE/)).toBeInTheDocument();
      expect(screen.getByText(/Interactive Brokers/)).toBeInTheDocument();
      expect(screen.getByText(/Schwab/)).toBeInTheDocument();
    });
  });

  describe('Accordion Expand/Collapse Behavior', () => {
    it('should expand FAQ item when clicked', () => {
      render(<FAQSection />);

      const question = screen.getByText(
        'How do you protect my personal and financial data?'
      );

      // Initially collapsed - answer should not be visible
      expect(
        screen.queryByText(/bank-level security with 256-bit SSL encryption/)
      ).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(question);

      // Answer should now be visible
      expect(
        screen.getByText(/bank-level security with 256-bit SSL encryption/)
      ).toBeInTheDocument();
    });

    it('should collapse FAQ item when clicked again', () => {
      render(<FAQSection />);

      const question = screen.getByText(
        'How do you protect my personal and financial data?'
      );

      // Click to expand
      fireEvent.click(question);
      expect(
        screen.getByText(/bank-level security with 256-bit SSL encryption/)
      ).toBeInTheDocument();

      // Click again to collapse
      fireEvent.click(question);
      expect(
        screen.queryByText(/bank-level security with 256-bit SSL encryption/)
      ).not.toBeInTheDocument();
    });

    it('should allow multiple FAQ items to be expanded simultaneously', () => {
      render(<FAQSection />);

      const question1 = screen.getByText(
        'How do you protect my personal and financial data?'
      );
      const question2 = screen.getByText(
        'How does the AI make trading recommendations?'
      );

      // Expand both questions
      fireEvent.click(question1);
      fireEvent.click(question2);

      // Both answers should be visible
      expect(
        screen.getByText(/bank-level security with 256-bit SSL encryption/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/analyzes thousands of market indicators/)
      ).toBeInTheDocument();
    });

    it('should show proper chevron icons for expanded/collapsed state', () => {
      render(<FAQSection />);

      const questionButton = screen
        .getByText('How do you protect my personal and financial data?')
        .closest('button');

      // Initially should show down chevron (collapsed)
      expect(questionButton?.querySelector('svg')).toBeInTheDocument();

      // Click to expand
      fireEvent.click(questionButton!);

      // Should still have chevron icon (now up chevron)
      expect(questionButton?.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Search Filtering Functionality', () => {
    it('should filter FAQs based on search term in questions', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Search for "AI"
      fireEvent.change(searchInput, { target: { value: 'AI' } });

      // Should show AI-related questions
      expect(
        screen.getByText('How does the AI make trading recommendations?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Does the AI learn from my trading preferences?')
      ).toBeInTheDocument();

      // Should not show unrelated questions
      expect(
        screen.queryByText('Which brokers do you work with?')
      ).not.toBeInTheDocument();
    });

    it('should filter FAQs based on search term in answers', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Search for "broker" (appears in answers)
      fireEvent.change(searchInput, { target: { value: 'broker' } });

      // Should show questions with "broker" in answers
      expect(
        screen.getByText('Do you store my brokerage account credentials?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Which brokers do you work with?')
      ).toBeInTheDocument();
    });

    it('should show "no results" message when search yields no matches', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Search for something that doesn't exist
      fireEvent.change(searchInput, {
        target: { value: 'cryptocurrency mining' },
      });

      expect(
        screen.getByText(/No FAQs found matching your search/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Try different keywords or browse all categories/)
      ).toBeInTheDocument();
    });

    it('should be case-insensitive in search', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Search with different cases - use a term that appears in questions
      fireEvent.change(searchInput, { target: { value: 'data' } });

      expect(
        screen.getByText('How do you protect my personal and financial data?')
      ).toBeInTheDocument();

      fireEvent.change(searchInput, { target: { value: 'DATA' } });

      expect(
        screen.getByText('How do you protect my personal and financial data?')
      ).toBeInTheDocument();
    });

    it('should clear search results when search input is cleared', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');

      // Search for something specific
      fireEvent.change(searchInput, { target: { value: 'AI' } });
      expect(
        screen.queryByText('Which brokers do you work with?')
      ).not.toBeInTheDocument();

      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });
      expect(
        screen.getByText('Which brokers do you work with?')
      ).toBeInTheDocument();
    });
  });

  describe('Category Filtering', () => {
    it('should display all category filter buttons', () => {
      render(<FAQSection />);

      expect(screen.getByText('All Questions')).toBeInTheDocument();

      // Use getAllByText for categories that appear multiple times
      expect(
        screen.getAllByText('Privacy & Security').length
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('AI Decisions').length).toBeGreaterThanOrEqual(
        1
      );
      expect(
        screen.getAllByText('Risk Management').length
      ).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Technical').length).toBeGreaterThanOrEqual(1);
    });

    it('should filter FAQs by Privacy & Security category', () => {
      render(<FAQSection />);

      // Use getAllByText and click the first one (the filter button)
      const privacyButtons = screen.getAllByText('Privacy & Security');
      fireEvent.click(privacyButtons[0]); // Click the filter button

      // Should show privacy questions
      expect(
        screen.getByText('How do you protect my personal and financial data?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Do you store my brokerage account credentials?')
      ).toBeInTheDocument();

      // Should not show AI questions
      expect(
        screen.queryByText('How does the AI make trading recommendations?')
      ).not.toBeInTheDocument();
    });

    it('should filter FAQs by AI Decisions category', () => {
      render(<FAQSection />);

      // Use getAllByText and click the first one (the filter button)
      const aiButtons = screen.getAllByText('AI Decisions');
      fireEvent.click(aiButtons[0]); // Click the filter button

      // Should show AI questions
      expect(
        screen.getByText('How does the AI make trading recommendations?')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Does the AI learn from my trading preferences?')
      ).toBeInTheDocument();

      // Should not show privacy questions
      expect(
        screen.queryByText('How do you protect my personal and financial data?')
      ).not.toBeInTheDocument();
    });

    it('should show active state for selected category', () => {
      render(<FAQSection />);

      // Use getAllByText and click the first one (the filter button)
      const privacyButtons = screen.getAllByText('Privacy & Security');
      const privacyButton = privacyButtons[0]; // The filter button
      fireEvent.click(privacyButton);

      expect(privacyButton).toHaveClass('bg-blue-600', 'text-white');
    });

    it('should return to all questions when "All Questions" is clicked', () => {
      render(<FAQSection />);

      // Filter by category first
      const privacyButtons = screen.getAllByText('Privacy & Security');
      fireEvent.click(privacyButtons[0]); // Click the filter button
      expect(
        screen.queryByText('How does the AI make trading recommendations?')
      ).not.toBeInTheDocument();

      // Click "All Questions"
      fireEvent.click(screen.getByText('All Questions'));
      expect(
        screen.getByText('How does the AI make trading recommendations?')
      ).toBeInTheDocument();
    });
  });

  describe('Section Header and Layout', () => {
    it('should display main section heading', () => {
      render(<FAQSection />);

      expect(
        screen.getByText('Frequently Asked Questions')
      ).toBeInTheDocument();
    });

    it('should display section description', () => {
      render(<FAQSection />);

      expect(
        screen.getByText(/Get answers to common questions about Only Bulls/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/our AI technology, and how we keep your trading safe/)
      ).toBeInTheDocument();
    });

    it('should have proper section background and spacing', () => {
      render(<FAQSection />);

      const section = screen
        .getByText('Frequently Asked Questions')
        .closest('section');
      expect(section).toHaveClass(
        'py-20',
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'bg-white'
      );
    });
  });

  describe('Category Icons and Visual Elements', () => {
    it('should display category icons with proper styling', () => {
      render(<FAQSection />);

      // Check that SVG icons are present for categories
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('should display category badges with FAQ items', () => {
      render(<FAQSection />);

      // Privacy category should be visible on privacy questions
      expect(
        screen.getAllByText('Privacy & Security').length
      ).toBeGreaterThanOrEqual(5); // 1 button + 4 FAQ badges
      expect(screen.getAllByText('AI Decisions').length).toBeGreaterThanOrEqual(
        5
      ); // 1 button + 4 FAQ badges
      expect(
        screen.getAllByText('Risk Management').length
      ).toBeGreaterThanOrEqual(5); // 1 button + 4 FAQ badges
      expect(screen.getAllByText('Technical').length).toBeGreaterThanOrEqual(5); // 1 button + 4 FAQ badges
    });
  });

  describe('Bottom CTA Section', () => {
    it('should display bottom call-to-action section', () => {
      render(<FAQSection />);

      expect(screen.getByText('Still have questions?')).toBeInTheDocument();
      expect(screen.getByText(/Our team is here to help/)).toBeInTheDocument();
    });

    it('should have CTA buttons with proper styling', () => {
      render(<FAQSection />);

      const contactButton = screen.getByText('Contact Support');
      expect(contactButton).toHaveClass(
        'bg-blue-600',
        'text-white',
        'min-h-[44px]'
      );

      const demoButton = screen.getByText('Schedule Demo');
      expect(demoButton).toHaveClass(
        'border',
        'border-gray-300',
        'text-gray-700',
        'min-h-[44px]'
      );
    });

    it('should have responsive CTA button layout', () => {
      render(<FAQSection />);

      const ctaContainer = screen.getByText('Contact Support').closest('.flex');
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
      render(<FAQSection />);

      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveTextContent('Frequently Asked Questions');

      const questionHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(questionHeadings.length).toBeGreaterThanOrEqual(16); // 4 questions per category × 4 categories
    });

    it('should have proper aria-expanded attributes on accordion buttons', () => {
      render(<FAQSection />);

      const questionButton = screen
        .getByText('How do you protect my personal and financial data?')
        .closest('button');

      expect(questionButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(questionButton!);
      expect(questionButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('should have touch-friendly button sizes', () => {
      render(<FAQSection />);

      // Check CTA buttons specifically (they have min-h-[44px])
      const contactButton = screen.getByText('Contact Support');
      const demoButton = screen.getByText('Schedule Demo');

      expect(contactButton).toHaveClass('min-h-[44px]');
      expect(demoButton).toHaveClass('min-h-[44px]');
    });

    it('should have proper search input labeling', () => {
      render(<FAQSection />);

      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      expect(searchInput).toHaveAttribute('type', 'text');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<FAQSection className="custom-test-class" />);

      const section = screen
        .getByText('Frequently Asked Questions')
        .closest('section');
      expect(section).toHaveClass('custom-test-class');
    });

    it('should maintain default classes when custom className is provided', () => {
      render(<FAQSection className="custom-test-class" />);

      const section = screen
        .getByText('Frequently Asked Questions')
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

  describe('Content Organization and Priority', () => {
    it('should display FAQs in priority order within categories', () => {
      render(<FAQSection />);

      // Filter by Privacy category to test ordering
      const privacyButtons = screen.getAllByText('Privacy & Security');
      fireEvent.click(privacyButtons[0]); // Click the filter button

      const privacyQuestions = screen.getAllByRole('heading', { level: 3 });

      // First question should be the highest priority (priority: 1)
      expect(privacyQuestions[0]).toHaveTextContent(
        'How do you protect my personal and financial data?'
      );
    });

    it('should maintain consistent FAQ structure across categories', () => {
      render(<FAQSection />);

      // Each category should have 4 questions (as defined in the component)
      // Note: There might be additional headings from the "Still have questions?" section
      const privacyButtons = screen.getAllByText('Privacy & Security');
      fireEvent.click(privacyButtons[0]); // Click the filter button
      let questions = screen.getAllByRole('heading', { level: 3 });
      // Should have 4 FAQ questions + 1 "Still have questions?" heading = 5 total
      expect(questions.length).toBe(5);

      const aiButtons = screen.getAllByText('AI Decisions');
      fireEvent.click(aiButtons[0]); // Click the filter button
      questions = screen.getAllByRole('heading', { level: 3 });
      expect(questions.length).toBe(5);

      const riskButtons = screen.getAllByText('Risk Management');
      fireEvent.click(riskButtons[0]); // Click the filter button
      questions = screen.getAllByRole('heading', { level: 3 });
      expect(questions.length).toBe(5);

      const techButtons = screen.getAllByText('Technical');
      fireEvent.click(techButtons[0]); // Click the filter button
      questions = screen.getAllByRole('heading', { level: 3 });
      expect(questions.length).toBe(5);
    });
  });

  describe('Search and Filter Interaction', () => {
    it('should combine search and category filters correctly', () => {
      render(<FAQSection />);

      // Filter by AI Decisions category
      const aiButtons = screen.getAllByText('AI Decisions');
      fireEvent.click(aiButtons[0]); // Click the filter button

      // Then search within that category
      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'learn' } });

      // Should show AI questions that contain "learn"
      expect(
        screen.getByText('Does the AI learn from my trading preferences?')
      ).toBeInTheDocument();

      // Should not show privacy questions even if they contain "learn"
      expect(
        screen.queryByText('How do you protect my personal and financial data?')
      ).not.toBeInTheDocument();
    });

    it('should reset category filter when searching across all categories', () => {
      render(<FAQSection />);

      // Filter by specific category
      const privacyButtons = screen.getAllByText('Privacy & Security');
      fireEvent.click(privacyButtons[0]); // Click the filter button

      // Click "All Questions" to reset
      fireEvent.click(screen.getByText('All Questions'));

      // Search should now work across all categories
      const searchInput = screen.getByPlaceholderText('Search FAQs...');
      fireEvent.change(searchInput, { target: { value: 'AI' } });

      expect(
        screen.getByText('How does the AI make trading recommendations?')
      ).toBeInTheDocument();
    });
  });
});
