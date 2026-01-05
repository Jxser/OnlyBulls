'use client';

import {
  MagnifyingGlassIcon,
  BellAlertIcon,
  CogIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface BenefitItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
  visualDemo?: React.ReactNode;
}

interface BenefitsSectionProps {
  className?: string;
}

export default function BenefitsSection({
  className = '',
}: BenefitsSectionProps) {
  const benefits: BenefitItem[] = [
    {
      title: 'Always-on market scanning',
      description:
        'Our AI continuously monitors market conditions, price movements, and trading opportunities across multiple assets, so you never miss a potential trade.',
      icon: <MagnifyingGlassIcon className="w-8 h-8 text-green-400" />,
      visualDemo: (
        <div className="flex items-center space-x-2 mt-4">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Scanning 24/7</span>
        </div>
      ),
    },
    {
      title: 'Contextualized alerts + recommendations',
      description:
        'Receive intelligent notifications with actionable insights tailored to your portfolio, risk tolerance, and trading strategy.',
      icon: <BellAlertIcon className="w-8 h-8 text-green-400" />,
      visualDemo: (
        <div className="mt-4 bg-green-900/20 border border-green-400/30 rounded-lg p-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-green-400">Smart Alert</p>
              <p className="text-xs text-green-300">
                AAPL showing bullish pattern - Consider entry at $175
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Personalized risk profiles and signal refinement',
      description:
        'AI learns from your trading patterns and preferences to provide increasingly personalized recommendations and risk management.',
      icon: <UserIcon className="w-8 h-8 text-green-400" />,
      visualDemo: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Risk Tolerance</span>
            <span className="text-xs font-medium text-green-400">Moderate</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">AI Learning</span>
            <span className="text-xs font-medium text-green-400">
              85% Complete
            </span>
          </div>
        </div>
      ),
    },
    {
      title: 'Automated trade execution',
      description:
        'Let AI execute trades based on your predefined strategies and risk parameters, removing emotion from your trading decisions.',
      icon: <CogIcon className="w-8 h-8 text-green-400" />,
      comingSoon: true,
      visualDemo: (
        <div className="mt-4 bg-green-900/20 border border-green-400/30 rounded-lg p-3 relative">
          <div className="absolute top-2 right-2">
            <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-full">
              Coming Soon
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Auto-execution ready</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center section-margin">
          <h2 className="text-mobile-h2 md:text-tablet-h2 lg:text-desktop-h2 font-bold text-white section-margin">
            Four Key Benefits That Transform Your Trading
          </h2>
          <p className="text-responsive-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI-driven market intelligence with features
            designed to give you an edge in today's fast-moving markets.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid-responsive-2 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 relative overflow-hidden group hover:border-gray-600"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300"></div>

              {/* Coming Soon Badge */}
              {benefit.comingSoon && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-green-500 text-black text-sm font-medium px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-700 border border-gray-600 rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Visual Demo */}
                {benefit.visualDemo && (
                  <div className="border-t border-gray-700 pt-4">
                    {benefit.visualDemo}
                  </div>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-responsive-base text-gray-300 mb-6">
            Ready to experience these benefits for yourself?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() =>
                window.open(
                  'https://apps.apple.com/us/app/onlybulls/id6746166943',
                  '_blank'
                )
              }
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-black px-6 md:px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 touch-target w-full sm:w-auto"
            >
              Download iOS App
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://play.google.com/store/apps/details?id=com.askroi.onlybulls&pli=1',
                  '_blank'
                )
              }
              className="border border-green-500 text-green-400 px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-green-500/10 transition-colors duration-200 touch-target w-full sm:w-auto"
            >
              Download Android App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
