'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
}

export default function FAQSection({ className = '' }: FAQSectionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Simplified FAQ list based on the screenshot
  const faqs: FAQItem[] = [
    {
      id: 'data-sources',
      question: 'What data sources does OnlyBulls use?',
      answer:
        'OnlyBulls aggregates data from multiple premium sources including real-time market feeds, financial news APIs, social sentiment analysis, and technical indicators from major exchanges. Our AI processes over 10,000 data points per second to identify trading opportunities.',
    },
    {
      id: 'security',
      question: 'How secure is my financial information?',
      answer:
        'We use bank-level security with 256-bit SSL encryption for all data transmission. Your personal information is stored in secure, encrypted databases and never shared with third parties. We are SOC 2 compliant and follow strict data protection protocols.',
    },
    {
      id: 'pricing',
      question: 'How much does OnlyBulls cost?',
      answer:
        'OnlyBulls offers flexible pricing plans starting with a free tier that includes basic market alerts. Premium plans start at $29/month with advanced AI recommendations, real-time alerts, and portfolio optimization features.',
    },
    {
      id: 'download',
      question: 'Where can I download OnlyBulls?',
      answer:
        'OnlyBulls is available on both iOS and Android platforms. You can download it from the App Store or Google Play Store. We also offer a web-based dashboard for desktop users.',
    },
    {
      id: 'brokerage-integration',
      question: 'Does OnlyBulls integrate with my brokerage?',
      answer:
        'Yes, OnlyBulls integrates with major brokerages including TD Ameritrade, E*TRADE, Robinhood, Interactive Brokers, and more. We use secure API connections that never store your login credentials.',
    },
  ];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-black ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get answers to the most common questions about OnlyBulls and how our
            AI-powered trading platform works.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:border-gray-700 transition-all duration-300"
            >
              <button
                onClick={() => toggleExpanded(faq.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-800/30 rounded-xl transition-colors duration-200"
                aria-expanded={expandedItems.has(faq.id)}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {expandedItems.has(faq.id) ? (
                    <ChevronUpIcon className="w-6 h-6 text-cyan-400" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                  )}
                </div>
              </button>

              {expandedItems.has(faq.id) && (
                <div className="px-8 pb-6">
                  <div className="border-t border-gray-800 pt-6">
                    <p className="text-gray-300 leading-relaxed text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-300 mb-6">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() =>
                window.open(
                  'https://apps.apple.com/us/app/onlybulls/id6746166943',
                  '_blank'
                )
              }
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
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
              className="border border-pink-500 text-pink-400 px-8 py-3 rounded-lg font-medium hover:bg-pink-500/10 transition-colors duration-200"
            >
              Download Android App
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
