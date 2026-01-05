'use client';

import CTAButton from '@/components/ui/CTAButton';

interface HeroSectionProps {
  onPrimaryCTAClick?: () => void;
  onSecondaryCTAClick?: () => void;
}

export default function HeroSection({
  onPrimaryCTAClick,
  onSecondaryCTAClick,
}: HeroSectionProps) {
  const handlePrimaryCTA = () => {
    // Navigate to App Store
    window.open(
      'https://apps.apple.com/us/app/onlybulls/id6746166943',
      '_blank'
    );
    onPrimaryCTAClick?.();
  };

  const handleSecondaryCTA = () => {
    // Navigate to Play Store
    window.open(
      'https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1',
      '_blank'
    );
    onSecondaryCTAClick?.();
  };

  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-black px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
      {/* Background geometric patterns with neon colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-lime-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="text-center">
          {/* Main Headline - Fixed layout */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight section-margin">
            Transform Your Trading Experience
          </h1>

          {/* Subheadline - Mobile-optimized */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto section-margin leading-relaxed">
            24/7 AI Market Agent That Helps You{' '}
            <span className="text-green-400">Spot Opportunities</span> and{' '}
            <span className="text-green-300">Execute Trades Smarter</span>
          </p>

          {/* Trust signals - Mobile-friendly layout */}
          <div className="flex flex-col xs:flex-row flex-wrap justify-center items-center gap-4 xs:gap-6 section-margin text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>24/7 Market Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Smart Trade Execution</span>
            </div>
          </div>

          {/* CTA Buttons - App Download focused */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center section-margin">
            <CTAButton
              variant="primary"
              size="lg"
              onClick={handlePrimaryCTA}
              analyticsLabel="Download iOS App"
              analyticsLocation="hero"
              className="text-responsive-base px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0"
            >
              Download for iOS
            </CTAButton>

            <CTAButton
              variant="outline"
              size="lg"
              onClick={handleSecondaryCTA}
              analyticsLabel="Download Android App"
              analyticsLocation="hero"
              className="text-responsive-base px-6 py-3 md:px-8 md:py-4 w-full sm:w-auto border-green-500 text-green-400 hover:bg-green-500/10"
            >
              Download for Android
            </CTAButton>
          </div>

          {/* Additional trust signal */}
          <p className="text-sm text-gray-500 mt-6">
            Join 1,000+ traders already using AI to improve their performance
          </p>
        </div>
      </div>
    </section>
  );
}
