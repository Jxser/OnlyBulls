'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTAButton from './CTAButton';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface CTAButtonConfig {
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
  loading?: boolean;
}

interface HeaderProps {
  navigationItems: NavigationItem[];
  ctaButton: CTAButtonConfig;
}

export default function Header({ navigationItems, ctaButton }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCTAClick = () => {
    ctaButton.onClick();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800 shadow-sm safe-top">
      <div className="container-mobile md:container-tablet lg:container-desktop">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">Only Bulls</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigationItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={e => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={cn(
                  'text-sm md:text-base font-medium transition-colors duration-200 hover:text-green-400 touch-target cursor-pointer',
                  item.isActive ? 'text-green-400' : 'text-gray-300'
                )}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <CTAButton
              variant={ctaButton.variant}
              loading={ctaButton.loading}
              onClick={handleCTAClick}
              analyticsLabel={ctaButton.text}
              analyticsLocation="header"
              data-testid="header-cta-button"
              className="text-sm md:text-base"
            >
              {ctaButton.text}
            </CTAButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="touch-target p-2 rounded-md text-gray-300 hover:text-green-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden safe-bottom" data-testid="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black border-t border-gray-800">
              {navigationItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={e => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'block px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 hover:text-green-400 hover:bg-gray-800 touch-target cursor-pointer',
                    item.isActive
                      ? 'text-green-400 bg-gray-800'
                      : 'text-gray-300'
                  )}
                  data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile CTA Button */}
              <div className="px-3 pt-4">
                <CTAButton
                  variant={ctaButton.variant}
                  loading={ctaButton.loading}
                  fullWidth
                  onClick={() => {
                    handleCTAClick();
                    setIsMobileMenuOpen(false);
                  }}
                  analyticsLabel={ctaButton.text}
                  analyticsLocation="header-mobile"
                  data-testid="mobile-cta-button"
                  className="text-base"
                >
                  {ctaButton.text}
                </CTAButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
