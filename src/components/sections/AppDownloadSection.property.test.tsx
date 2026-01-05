import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import * as fc from 'fast-check';
import AppDownloadSection from './AppDownloadSection';

// Mock window.open
const mockWindowOpen = vi.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockWindowOpen,
});

describe('AppDownloadSection Property-Based Tests', () => {
  describe('Property 20: App Download Integration', () => {
    it('should open the correct app store (iOS or Android) in a new tab with the proper app URL', () => {
      // Feature: landing-page, Property 20: App Download Integration
      // **Validates: Requirements 10.1, 10.2, 10.5**

      const urlArbitrary = fc.webUrl();
      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(
          urlArbitrary,
          urlArbitrary,
          urlArbitrary,
          urlArbitrary,
          classNameArbitrary,
          (appStoreUrl, playStoreUrl, askRoiUrl, aultNodesUrl, className) => {
            mockWindowOpen.mockClear();

            const { container } = render(
              <AppDownloadSection
                appStoreUrl={appStoreUrl}
                playStoreUrl={playStoreUrl}
                askRoiUrl={askRoiUrl}
                aultNodesUrl={aultNodesUrl}
                className={className}
              />
            );

            // Verify iOS App Store button exists and has correct attributes
            const iosButton = container.querySelector(
              'button[aria-label="Download Only Bulls from the Apple App Store"]'
            );
            expect(iosButton).toBeInTheDocument();
            expect(iosButton).toHaveTextContent('App Store');

            // Verify Android Play Store button exists and has correct attributes
            const androidButton = container.querySelector(
              'button[aria-label="Download Only Bulls from Google Play Store"]'
            );
            expect(androidButton).toBeInTheDocument();
            expect(androidButton).toHaveTextContent('Google Play');

            // Test iOS button click opens correct URL in new tab
            fireEvent.click(iosButton!);
            expect(mockWindowOpen).toHaveBeenCalledWith(
              appStoreUrl,
              '_blank',
              'noopener,noreferrer'
            );

            mockWindowOpen.mockClear();

            // Test Android button click opens correct URL in new tab
            fireEvent.click(androidButton!);
            expect(mockWindowOpen).toHaveBeenCalledWith(
              playStoreUrl,
              '_blank',
              'noopener,noreferrer'
            );

            // Verify both buttons have proper styling for touch interfaces
            expect(iosButton).toHaveClass('group');
            expect(iosButton).toHaveClass('flex');
            expect(iosButton).toHaveClass('items-center');
            expect(iosButton).toHaveClass('px-6');
            expect(iosButton).toHaveClass('py-4');
            expect(iosButton).toHaveClass('rounded-xl');

            expect(androidButton).toHaveClass('group');
            expect(androidButton).toHaveClass('flex');
            expect(androidButton).toHaveClass('items-center');
            expect(androidButton).toHaveClass('px-6');
            expect(androidButton).toHaveClass('py-4');
            expect(androidButton).toHaveClass('rounded-xl');

            // Verify buttons have hover effects
            expect(iosButton).toHaveClass('hover:bg-gray-800');
            expect(iosButton).toHaveClass('hover:scale-105');
            expect(androidButton).toHaveClass('hover:bg-gray-800');
            expect(androidButton).toHaveClass('hover:scale-105');

            // Verify buttons have proper icons
            const iosIcon = iosButton?.querySelector('svg');
            const androidIcon = androidButton?.querySelector('svg');
            expect(iosIcon).toBeInTheDocument();
            expect(androidIcon).toBeInTheDocument();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default URLs when no custom URLs are provided', () => {
      // Feature: landing-page, Property 20: App Download Integration (Default URLs)
      // **Validates: Requirements 10.1, 10.2, 10.5**

      fc.assert(
        fc.property(fc.constant(undefined), () => {
          mockWindowOpen.mockClear();

          const { container } = render(<AppDownloadSection />);

          // Get the buttons
          const iosButton = container.querySelector(
            'button[aria-label="Download Only Bulls from the Apple App Store"]'
          );
          const androidButton = container.querySelector(
            'button[aria-label="Download Only Bulls from Google Play Store"]'
          );

          expect(iosButton).toBeInTheDocument();
          expect(androidButton).toBeInTheDocument();

          // Test that default URLs are used
          fireEvent.click(iosButton!);
          expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://apps.apple.com/us/app/onlybulls/id6746166943',
            '_blank',
            'noopener,noreferrer'
          );

          mockWindowOpen.mockClear();

          fireEvent.click(androidButton!);
          expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1',
            '_blank',
            'noopener,noreferrer'
          );
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain proper button layout and accessibility across different viewport sizes', () => {
      // Feature: landing-page, Property 20: App Download Integration (Responsive)
      // **Validates: Requirements 10.1, 10.2, 10.5**

      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(classNameArbitrary, className => {
          const { container } = render(
            <AppDownloadSection className={className} />
          );

          // Verify responsive button container
          const buttonContainer = container.querySelector(
            '.flex.flex-col.sm\\:flex-row.gap-4.justify-center.items-center'
          );
          expect(buttonContainer).toBeInTheDocument();

          // Verify both buttons are present
          const buttons = buttonContainer?.querySelectorAll('button');
          expect(buttons?.length).toBe(2);

          // Verify buttons have proper accessibility attributes
          buttons?.forEach(button => {
            expect(button).toHaveAttribute('aria-label');
            expect(button.getAttribute('aria-label')).toContain(
              'Download Only Bulls'
            );

            // Verify button has proper focus states
            expect(button).toHaveClass('group');

            // Verify button content structure
            const textContent = button.querySelector('.text-left');
            expect(textContent).toBeInTheDocument();

            const downloadText = textContent?.querySelector('.text-xs');
            const storeText = textContent?.querySelector(
              '.text-lg.font-semibold'
            );
            expect(downloadText).toBeInTheDocument();
            expect(storeText).toBeInTheDocument();
          });

          // Verify responsive layout classes
          expect(buttonContainer).toHaveClass('flex-col'); // Mobile first
          expect(buttonContainer).toHaveClass('sm:flex-row'); // Desktop layout
          expect(buttonContainer).toHaveClass('gap-4');
          expect(buttonContainer).toHaveClass('justify-center');
          expect(buttonContainer).toHaveClass('items-center');
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 21: Company Branding Display', () => {
    it('should properly display and link AskROI branding and Ault Nodes company links', () => {
      // Feature: landing-page, Property 21: Company Branding Display
      // **Validates: Requirements 10.3, 10.4**

      const urlArbitrary = fc.webUrl();
      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(
          urlArbitrary,
          urlArbitrary,
          urlArbitrary,
          urlArbitrary,
          classNameArbitrary,
          (appStoreUrl, playStoreUrl, askRoiUrl, aultNodesUrl, className) => {
            mockWindowOpen.mockClear();

            const { container } = render(
              <AppDownloadSection
                appStoreUrl={appStoreUrl}
                playStoreUrl={playStoreUrl}
                askRoiUrl={askRoiUrl}
                aultNodesUrl={aultNodesUrl}
                className={className}
              />
            );

            // Verify "Powered by AskROI.com" branding exists
            const askRoiButton = container.querySelector(
              'button[aria-label="Visit AskROI.com website"]'
            );
            expect(askRoiButton).toBeInTheDocument();
            expect(askRoiButton).toHaveTextContent('AskROI.com');

            // Verify Ault Nodes company reference exists
            const aultNodesButton = container.querySelector(
              'button[aria-label="Visit Ault Nodes company website"]'
            );
            expect(aultNodesButton).toBeInTheDocument();
            expect(aultNodesButton).toHaveTextContent('Ault Nodes');

            // Test AskROI link functionality
            fireEvent.click(askRoiButton!);
            expect(mockWindowOpen).toHaveBeenCalledWith(
              askRoiUrl,
              '_blank',
              'noopener,noreferrer'
            );

            mockWindowOpen.mockClear();

            // Test Ault Nodes link functionality
            fireEvent.click(aultNodesButton!);
            expect(mockWindowOpen).toHaveBeenCalledWith(
              aultNodesUrl,
              '_blank',
              'noopener,noreferrer'
            );

            // Verify proper styling for branding elements
            expect(askRoiButton).toHaveClass('group');
            expect(askRoiButton).toHaveClass('inline-flex');
            expect(askRoiButton).toHaveClass('items-center');
            expect(askRoiButton).toHaveClass('gap-2');
            expect(askRoiButton).toHaveClass('text-blue-600');
            expect(askRoiButton).toHaveClass('hover:text-blue-700');

            expect(aultNodesButton).toHaveClass('group');
            expect(aultNodesButton).toHaveClass('inline-flex');
            expect(aultNodesButton).toHaveClass('items-center');
            expect(aultNodesButton).toHaveClass('gap-2');
            expect(aultNodesButton).toHaveClass('text-gray-700');
            expect(aultNodesButton).toHaveClass('hover:text-gray-900');

            // Verify external link icons are present in branding buttons
            const askRoiIcon = askRoiButton?.querySelector('svg');
            const aultNodesIcon = aultNodesButton?.querySelector('svg');
            expect(askRoiIcon).toBeInTheDocument();
            expect(aultNodesIcon).toBeInTheDocument();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should use default company URLs when no custom URLs are provided', () => {
      // Feature: landing-page, Property 21: Company Branding Display (Default URLs)
      // **Validates: Requirements 10.3, 10.4**

      fc.assert(
        fc.property(fc.constant(undefined), () => {
          mockWindowOpen.mockClear();

          const { container } = render(<AppDownloadSection />);

          // Get the company branding buttons
          const askRoiButton = container.querySelector(
            'button[aria-label="Visit AskROI.com website"]'
          );
          const aultNodesButton = container.querySelector(
            'button[aria-label="Visit Ault Nodes company website"]'
          );

          expect(askRoiButton).toBeInTheDocument();
          expect(aultNodesButton).toBeInTheDocument();

          // Test that default URLs are used
          fireEvent.click(askRoiButton!);
          expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://askroi.com',
            '_blank',
            'noopener,noreferrer'
          );

          mockWindowOpen.mockClear();

          fireEvent.click(aultNodesButton!);
          expect(mockWindowOpen).toHaveBeenCalledWith(
            'https://aultnodes.com/',
            '_blank',
            'noopener,noreferrer'
          );
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain proper branding layout and hierarchy', () => {
      // Feature: landing-page, Property 21: Company Branding Display (Layout)
      // **Validates: Requirements 10.3, 10.4**

      const classNameArbitrary = fc.option(fc.string(), { nil: undefined });

      fc.assert(
        fc.property(classNameArbitrary, className => {
          const { container } = render(
            <AppDownloadSection className={className} />
          );

          // Verify company branding section exists with proper structure
          const brandingSection = container.querySelector(
            '.border-t.border-gray-200.pt-12'
          );
          expect(brandingSection).toBeInTheDocument();

          // Verify "Powered by" section has proper layout
          const poweredBySection = brandingSection?.querySelector(
            '.flex.flex-col.sm\\:flex-row.items-center.justify-center.gap-2.text-gray-600'
          );
          expect(poweredBySection).toBeInTheDocument();

          // Verify "A product by" section has proper layout
          const productBySection = brandingSection?.querySelector(
            '.flex.flex-col.sm\\:flex-row.items-center.justify-center.gap-2.text-gray-500'
          );
          expect(productBySection).toBeInTheDocument();

          // Verify trust signals section exists
          const trustSignalsSection = container.querySelector(
            '.mt-8.pt-8.border-t.border-gray-100'
          );
          expect(trustSignalsSection).toBeInTheDocument();

          // Verify trust signals have proper content
          const trustSignalsContainer = trustSignalsSection?.querySelector(
            '.flex.flex-col.sm\\:flex-row.items-center.justify-center.gap-6.text-sm.text-gray-500'
          );
          expect(trustSignalsContainer).toBeInTheDocument();

          const trustSignals = trustSignalsContainer?.querySelectorAll(
            '.flex.items-center.gap-2'
          );
          expect(trustSignals?.length).toBe(3);

          // Verify each trust signal has an indicator dot and text
          trustSignals?.forEach(signal => {
            const dot = signal.querySelector('.w-2.h-2.rounded-full');
            expect(dot).toBeInTheDocument();

            const text = signal.querySelector('span');
            expect(text).toBeInTheDocument();
            expect(text?.textContent?.length).toBeGreaterThan(0);
          });

          // Verify responsive layout classes
          expect(poweredBySection).toHaveClass('flex-col');
          expect(poweredBySection).toHaveClass('sm:flex-row');
          expect(productBySection).toHaveClass('flex-col');
          expect(productBySection).toHaveClass('sm:flex-row');
        }),
        { numRuns: 100 }
      );
    });
  });
});
