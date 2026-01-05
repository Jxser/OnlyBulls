'use client';

import dynamic from 'next/dynamic';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/components/ui/Header';
import HeroSection from '@/components/sections/HeroSection';
import LazySection from '@/components/ui/LazySection';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Lazy load components that are below the fold
const BenefitsSection = dynamic(
  () => import('@/components/sections/BenefitsSection'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading benefits...</div>
      </div>
    ),
  }
);

const VisualDemoSection = dynamic(
  () => import('@/components/sections/VisualDemoSection'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading demo...</div>
      </div>
    ),
  }
);

const SocialProofSection = dynamic(
  () => import('@/components/sections/SocialProofSection'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Loading testimonials...
        </div>
      </div>
    ),
  }
);

const AppDownloadSection = dynamic(
  () => import('@/components/sections/AppDownloadSection'),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Loading app downloads...
        </div>
      </div>
    ),
  }
);

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading FAQ...</div>
    </div>
  ),
});

// Error Fallback Component
function ErrorFallback({
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We're sorry, but there was an error loading this section.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// Smooth scroll utility
const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export default function Home() {
  const navigationItems = [
    {
      label: 'Features',
      href: '#benefits',
      onClick: () => smoothScrollTo('benefits'),
    },
    {
      label: 'Demo',
      href: '#demo',
      onClick: () => smoothScrollTo('demo'),
    },
    {
      label: 'Download',
      href: '#app-download',
      onClick: () => smoothScrollTo('app-download'),
    },
    {
      label: 'FAQ',
      href: '#faq',
      onClick: () => smoothScrollTo('faq'),
    },
  ];

  const ctaButton = {
    text: 'Download App',
    variant: 'outline' as const,
    onClick: () => {
      // Navigate to app download section
      const appSection = document.getElementById('app-download');
      if (appSection) {
        appSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PerformanceMonitor />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header navigationItems={navigationItems} ctaButton={ctaButton} />
      </ErrorBoundary>

      <main className="pt-16">
        {/* Add padding-top to account for fixed header */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HeroSection />
        </ErrorBoundary>

        <LazySection
          id="benefits"
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="animate-pulse text-gray-500">
                Loading benefits...
              </div>
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div id="benefits">
              <BenefitsSection />
            </div>
          </ErrorBoundary>
        </LazySection>

        <LazySection
          id="demo"
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="animate-pulse text-gray-500">Loading demo...</div>
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div id="demo">
              <VisualDemoSection />
            </div>
          </ErrorBoundary>
        </LazySection>

        <LazySection
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="animate-pulse text-gray-500">
                Loading testimonials...
              </div>
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <SocialProofSection />
          </ErrorBoundary>
        </LazySection>

        <LazySection
          id="app-download"
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <div className="animate-pulse text-gray-500">
                Loading app downloads...
              </div>
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div id="app-download">
              <AppDownloadSection
                appStoreUrl="https://apps.apple.com/us/app/onlybulls/id6746166943"
                playStoreUrl="https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1"
                askRoiUrl="https://askroi.com"
                aultNodesUrl="https://aultnodes.com/"
              />
            </div>
          </ErrorBoundary>
        </LazySection>

        <LazySection
          id="faq"
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <div className="animate-pulse text-gray-500">Loading FAQ...</div>
            </div>
          }
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div id="faq">
              <FAQSection />
            </div>
          </ErrorBoundary>
        </LazySection>
      </main>
    </div>
  );
}
