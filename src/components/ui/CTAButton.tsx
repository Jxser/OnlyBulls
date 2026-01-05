'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { trackCTAClick } from '@/lib/analytics';

export interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  analyticsLabel?: string;
  analyticsLocation?: string;
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      className,
      disabled,
      children,
      analyticsLabel,
      analyticsLocation,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Track CTA click if analytics props are provided
      if (analyticsLabel && analyticsLocation) {
        trackCTAClick(analyticsLabel, analyticsLocation);
      }

      // Call the original onClick handler
      if (onClick) {
        onClick(event);
      }
    };
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 focus:ring-cyan-500 active:from-cyan-700 active:to-blue-700 border-0',
      secondary:
        'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-600 border border-gray-600',
      outline:
        'border border-pink-500 text-pink-400 bg-transparent hover:bg-pink-500/10 focus:ring-pink-500 active:bg-pink-500/20',
    };

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[52px]',
    };

    // Ensure touch-friendly sizing for mobile (minimum 44px touch target)
    const touchFriendlyStyles = 'min-w-[44px] touch-manipulation';

    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      touchFriendlyStyles,
      fullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;
