'use client';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

interface OutcomeItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  metric?: string;
}

interface ProblemOutcomeSectionProps {
  className?: string;
}

export default function ProblemOutcomeSection({
  className = '',
}: ProblemOutcomeSectionProps) {
  const outcomes: OutcomeItem[] = [
    {
      title: 'Time Saved',
      description:
        "Stop spending hours analyzing charts and market data. Our AI monitors 24/7 so you don't have to.",
      icon: <ClockIcon className="w-8 h-8 text-green-400" />,
      metric: 'Save 4+ hours daily',
    },
    {
      title: 'Decision Confidence',
      description:
        'Make informed decisions backed by AI analysis instead of gut feelings and FOMO.',
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
      metric: '95% confidence boost',
    },
    {
      title: 'Better Performance',
      description:
        'Achieve consistent results with data-driven strategies instead of emotional trading.',
      icon: <ArrowTrendingUpIcon className="w-8 h-8 text-green-400" />,
      metric: '30% better returns',
    },
  ];

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Problem Statement - Left Column */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-mobile-h2 md:text-tablet-h2 lg:text-desktop-h2 font-bold text-white section-margin">
                Manual Market Monitoring is Exhausting
              </h2>
              <p className="text-responsive-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
                You're losing sleep, missing opportunities, and making emotional
                decisions because you can't watch the markets 24/7.
              </p>
            </div>

            {/* Before Scenario - Visual Elements */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 md:p-6">
              <div className="flex items-start space-x-4">
                <ExclamationTriangleIcon className="w-6 h-6 md:w-8 md:h-8 text-red-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-red-400 mb-3">
                    The Current Reality
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-red-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      Constant anxiety about missing market moves
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      Hours spent analyzing charts with no clear direction
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      FOMO-driven decisions that hurt your portfolio
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3 flex-shrink-0"></div>
                      Inconsistent results despite your best efforts
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Outcomes - Right Column */}
          <div className="space-y-6 md:space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-mobile-h2 md:text-tablet-h2 lg:text-desktop-h2 font-bold text-white section-margin">
                AI-Powered Trading Intelligence
              </h2>
              <p className="text-responsive-lg text-gray-300 leading-relaxed mb-6 md:mb-8">
                Experience the calm confidence that comes with AI-powered market
                intelligence working for you around the clock.
              </p>
            </div>

            {/* After Scenario - Outcomes */}
            <div className="space-y-4 md:space-y-6">
              {outcomes.map((outcome, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-gray-500 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{outcome.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                        <h3 className="text-base md:text-lg font-semibold text-white">
                          {outcome.title}
                        </h3>
                        {outcome.metric && (
                          <span className="text-xs md:text-sm font-medium text-green-400 bg-green-900/30 border border-green-500/30 px-2 md:px-3 py-1 rounded-full self-start">
                            {outcome.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                        {outcome.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Success Indicator */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl p-4 md:p-6 text-center">
              <CheckCircleIcon className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-green-300" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Your New Reality
              </h3>
              <p className="text-sm md:text-base text-green-100">
                Sleep better knowing your AI agent is watching the markets,
                making informed decisions, and protecting your investments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
