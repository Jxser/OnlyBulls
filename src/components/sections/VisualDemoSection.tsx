'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  ChartBarIcon,
  BellAlertIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

interface VisualDemoSectionProps {
  className?: string;
}

export default function VisualDemoSection({
  className = '',
}: VisualDemoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -25]);

  return (
    <section
      ref={containerRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 overflow-hidden ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent mb-6">
            See Only Bulls in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the clean, intuitive interface that makes complex market
            data accessible and actionable for traders at every level.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div className="mb-20" style={{ y: y1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-4">
                Clean Market Data Interface
              </h3>
              <p className="text-gray-300">
                Professional-grade market analysis made simple and accessible
              </p>
            </div>

            {/* Desktop Frame */}
            <div className="relative mx-auto max-w-5xl">
              <div className="bg-gray-900 rounded-t-xl p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-gray-400 text-sm">
                    Only Bulls Dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="bg-gray-800 border-x border-b border-gray-600 rounded-b-xl p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Market Overview */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-white">
                        Market Overview
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-300">Live</span>
                      </div>
                    </div>

                    {/* Mock Chart */}
                    <div className="bg-gray-900 rounded-lg p-4 h-48 flex items-end space-x-1">
                      {[
                        65, 45, 78, 52, 89, 67, 43, 76, 54, 82, 69, 91, 58, 73,
                        86,
                      ].map((height, i) => (
                        <div
                          key={i}
                          className="bg-green-500 rounded-t flex-1 transition-all duration-300 hover:bg-green-400"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>

                    {/* Market Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <ArrowTrendingUpIcon className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-green-400">
                            S&P 500
                          </span>
                        </div>
                        <div className="text-lg font-bold text-white">
                          4,567.89
                        </div>
                        <div className="text-sm text-green-400">+1.23%</div>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <ChartBarIcon className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-green-400">
                            NASDAQ
                          </span>
                        </div>
                        <div className="text-lg font-bold text-white">
                          14,234.56
                        </div>
                        <div className="text-sm text-green-400">+0.87%</div>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <CurrencyDollarIcon className="w-5 h-5 text-green-400" />
                          <span className="text-sm font-medium text-green-400">
                            Portfolio
                          </span>
                        </div>
                        <div className="text-lg font-bold text-white">
                          $127,456
                        </div>
                        <div className="text-sm text-green-400">+2.14%</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Insights Panel */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">
                      AI Insights
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-green-400">
                              Bullish Signal
                            </p>
                            <p className="text-xs text-green-300">
                              AAPL showing strong momentum
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-green-400">
                              Entry Opportunity
                            </p>
                            <p className="text-xs text-green-300">
                              TSLA at support level
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium text-yellow-400">
                              Risk Alert
                            </p>
                            <p className="text-xs text-yellow-300">
                              High volatility expected
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Alert System */}
        <motion.div className="mb-20" style={{ y: y2 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent mb-4">
                Smart Mobile Alerts
              </h3>
              <p className="text-gray-300">
                Get contextual notifications with actionable insights wherever
                you are
              </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* iPhone Frame */}
              <div className="relative">
                <div className="w-72 h-[580px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
                    {/* iPhone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-10"></div>

                    {/* Screen content */}
                    <div className="pt-10 px-6 h-full bg-gray-800">
                      <div className="text-center mb-8">
                        <h4 className="text-xl font-semibold text-white">
                          Only Bulls
                        </h4>
                      </div>

                      {/* Notification examples */}
                      <div className="space-y-6">
                        <motion.div
                          className="bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-600/50 p-4"
                          initial={{ x: 100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <BellAlertIcon className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white mb-1">
                                Market Alert
                              </p>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                NVDA breaking resistance at $485. Consider entry
                                with stop at $475.
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pl-9">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">
                                2 min ago
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-xs bg-green-500 hover:bg-green-600 text-black px-3 py-1.5 rounded font-medium transition-colors">
                                Act
                              </button>
                              <button className="text-xs border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white px-3 py-1.5 rounded transition-colors">
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-600/50 p-4"
                          initial={{ x: 100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircleIcon className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white mb-1">
                                Trade Executed
                              </p>
                              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                                Successfully bought 100 shares of AAPL at
                                $175.50
                              </p>
                              <span className="text-xs text-gray-400">
                                5 min ago
                              </span>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          className="bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-600/50 p-4"
                          initial={{ x: 100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.9 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white mb-1">
                                Portfolio Update
                              </p>
                              <p className="text-xs text-gray-300 leading-relaxed mb-2">
                                Your portfolio is up 2.3% today. Great job!
                              </p>
                              <span className="text-xs text-gray-400">
                                1 hour ago
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone label */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <DevicePhoneMobileIcon className="w-4 h-4" />
                    <span>Mobile Alerts</span>
                  </div>
                </div>
              </div>

              {/* Desktop notification example */}
              <div className="relative">
                <div className="bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-6 max-w-sm">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-900/30 border border-green-500/30 rounded-full flex items-center justify-center">
                      <BellAlertIcon className="w-6 h-6 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        Smart Alert System
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Receive intelligent notifications across all your
                        devices with contextual insights and actionable
                        recommendations.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Real-time</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Contextual</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <ComputerDesktopIcon className="w-4 h-4" />
                    <span>Desktop Notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decision Flow Illustration */}
        <motion.div style={{ y: y3 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">
                AI-Powered Decision Flow
              </h3>
              <p className="text-gray-300">
                See how our AI analyzes market conditions and provides
                step-by-step recommendations
              </p>
            </div>

            {/* Decision Flow Steps */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Market Scan',
                    description:
                      'AI continuously monitors market conditions and identifies opportunities',
                    icon: <ChartBarIcon className="w-8 h-8" />,
                    color: 'green',
                  },
                  {
                    step: 2,
                    title: 'Analysis',
                    description:
                      'Deep analysis of technical indicators, sentiment, and risk factors',
                    icon: <ClockIcon className="w-8 h-8" />,
                    color: 'emerald',
                  },
                  {
                    step: 3,
                    title: 'Recommendation',
                    description:
                      'Personalized trading recommendations based on your risk profile',
                    icon: <BellAlertIcon className="w-8 h-8" />,
                    color: 'lime',
                  },
                  {
                    step: 4,
                    title: 'Execution',
                    description:
                      'Optional automated execution or manual confirmation based on your preference',
                    icon: <CheckCircleIcon className="w-8 h-8" />,
                    color: 'green',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Connection line */}
                    {index < 3 && (
                      <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-gray-600 z-0"></div>
                    )}

                    <div className="relative z-10 bg-gray-800 border border-gray-600 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-gray-500 transition-all duration-300">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          item.color === 'green'
                            ? 'bg-green-900/30 border border-green-500/30'
                            : item.color === 'emerald'
                              ? 'bg-emerald-900/30 border border-emerald-500/30'
                              : item.color === 'lime'
                                ? 'bg-lime-900/30 border border-lime-500/30'
                                : 'bg-green-900/30 border border-green-500/30'
                        }`}
                      >
                        <div
                          className={`${
                            item.color === 'green'
                              ? 'text-green-400'
                              : item.color === 'emerald'
                                ? 'text-emerald-400'
                                : item.color === 'lime'
                                  ? 'text-lime-400'
                                  : 'text-green-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                      </div>

                      <div
                        className={`w-8 h-8 text-black rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4 ${
                          item.color === 'green'
                            ? 'bg-green-500'
                            : item.color === 'emerald'
                              ? 'bg-emerald-500'
                              : item.color === 'lime'
                                ? 'bg-lime-500'
                                : 'bg-green-500'
                        }`}
                      >
                        {item.step}
                      </div>

                      <h4 className="text-lg font-semibold text-white mb-3">
                        {item.title}
                      </h4>

                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300 mb-6">
                Experience the power of AI-driven trading decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() =>
                    window.open(
                      'https://apps.apple.com/us/app/onlybulls/id6746166943',
                      '_blank'
                    )
                  }
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-black px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 touch-target"
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
                  className="border border-green-500 text-green-400 px-8 py-3 rounded-lg font-medium hover:bg-green-500/10 transition-colors duration-200 touch-target"
                >
                  Download Android App
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
