import { describe, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CTAButton from './CTAButton';

describe('CTAButton Component', () => {
  describe('Basic Functionality', () => {
    it('should render button with children text', () => {
      render(<CTAButton>Click me</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click me');
    });

    it('should call onClick handler when clicked', () => {
      const handleClick = vi.fn();
      render(<CTAButton onClick={handleClick}>Click me</CTAButton>);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled prop is true', () => {
      render(<CTAButton disabled>Click me</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Variants', () => {
    it('should apply primary variant styles by default', () => {
      render(<CTAButton>Primary Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('should apply secondary variant styles', () => {
      render(<CTAButton variant="secondary">Secondary Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-100', 'text-gray-900');
    });

    it('should apply outline variant styles', () => {
      render(<CTAButton variant="outline">Outline Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'border',
        'border-gray-300',
        'text-gray-700',
        'bg-white'
      );
    });
  });

  describe('Sizes', () => {
    it('should apply medium size styles by default', () => {
      render(<CTAButton>Medium Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-4', 'py-2', 'text-base', 'min-h-[44px]');
    });

    it('should apply small size styles', () => {
      render(<CTAButton size="sm">Small Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-3', 'py-2', 'text-sm', 'min-h-[36px]');
    });

    it('should apply large size styles', () => {
      render(<CTAButton size="lg">Large Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg', 'min-h-[52px]');
    });
  });

  describe('Touch-Friendly Design', () => {
    it('should have minimum touch target size for mobile', () => {
      render(<CTAButton>Touch Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-w-[44px]', 'min-h-[44px]');
    });

    it('should have touch-manipulation CSS property', () => {
      render(<CTAButton>Touch Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('touch-manipulation');
    });

    it('should maintain touch-friendly sizing even for small variant', () => {
      render(<CTAButton size="sm">Small Touch Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('min-w-[44px]');
      // Small variant has min-h-[36px] but touch-friendly min-w-[44px] is still applied
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading is true', () => {
      render(<CTAButton loading>Loading Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Loading...');

      // Check for loading spinner
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should not call onClick when loading', () => {
      const handleClick = vi.fn();
      render(
        <CTAButton loading onClick={handleClick}>
          Loading Button
        </CTAButton>
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should disable button when loading', () => {
      render(<CTAButton loading>Loading Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Full Width', () => {
    it('should apply full width styles when fullWidth is true', () => {
      render(<CTAButton fullWidth>Full Width Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('should not apply full width styles by default', () => {
      render(<CTAButton>Normal Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('w-full');
    });
  });

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      render(<CTAButton className="custom-class">Custom Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('should forward other HTML button attributes', () => {
      render(
        <CTAButton type="submit" id="submit-btn">
          Submit
        </CTAButton>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('id', 'submit-btn');
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus styles', () => {
      render(<CTAButton>Accessible Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2'
      );
    });

    it('should have proper disabled styles', () => {
      render(<CTAButton disabled>Disabled Button</CTAButton>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'disabled:opacity-50',
        'disabled:cursor-not-allowed'
      );
    });
  });
});
