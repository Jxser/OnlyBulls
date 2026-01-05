'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company?: string;
  avatar: string;
  rating: number;
}

interface UserStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface SecurityBadge {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface SocialProofSectionProps {
  className?: string;
}

export default function SocialProofSection({
  className = '',
}: SocialProofSectionProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Sample testimonials - in a real app, these would come from props or API
  const testimonials: Testimonial[] = [
    {
      quote:
        "Only Bulls has completely transformed how I approach trading. The AI insights are incredibly accurate, and I've seen a 40% improvement in my portfolio performance since I started using it.",
      author: 'Sarah Chen',
      title: 'Day Trader',
      company: 'Independent',
      avatar: '/images/testimonial-1.jpg',
      rating: 5,
    },
    {
      quote:
        'As someone who was constantly stressed about missing opportunities, the 24/7 monitoring gives me peace of mind. The alerts are spot-on and have helped me catch several profitable trades I would have missed.',
      author: 'Michael Rodriguez',
      title: 'Portfolio Manager',
      company: 'Hedge Fund',
      avatar: '/images/testimonial-2.jpg',
      rating: 5,
    },
    {
      quote:
        'The personalized risk management is a game-changer. The AI learned my trading style quickly and now provides recommendations that perfectly match my risk tolerance. Highly recommended!',
      author: 'Jennifer Park',
      title: 'Retail Investor',
      avatar: '/images/testimonial-3.jpg',
      rating: 5,
    },
  ];

  // User statistics - these would typically come from real data
  const userStats: UserStat[] = [
    {
      label: 'Active Users',
      value: '1,200+',
      icon: <UsersIcon className="w-6 h-6 text-cyan-400" />,
      description: 'Traders using AI insights daily',
    },
    {
      label: 'Avg. Performance Boost',
      value: '35%',
      icon: <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />,
      description: 'Improvement in portfolio returns',
    },
    {
      label: 'Trades Analyzed',
      value: '50K+',
      icon: <ClockIcon className="w-6 h-6 text-pink-400" />,
      description: 'Market opportunities identified',
    },
  ];

  // Security badges
  const securityBadges: SecurityBadge[] = [
    {
      name: 'SSL Encrypted',
      icon: <LockClosedIcon className="w-6 h-6 text-green-400" />,
      description: '256-bit SSL encryption',
    },
    {
      name: 'SOC 2 Compliant',
      icon: <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />,
      description: 'Enterprise security standards',
    },
    {
      name: 'GDPR Compliant',
      icon: <CheckBadgeIcon className="w-6 h-6 text-pink-400" />,
      description: 'Privacy protection guaranteed',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      prev => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i}>
        {i < rating ? (
          <StarIconSolid className="w-5 h-5 text-yellow-400" />
        ) : (
          <StarIcon className="w-5 h-5 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-600 bg-clip-text text-transparent mb-6">
            Trusted by Traders Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of traders who have transformed their trading
            experience with AI-powered market intelligence.
          </p>
        </div>

        {/* User Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {userStats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-200 border border-gray-700"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-medium text-gray-200 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-16 relative overflow-hidden border border-gray-700">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full -translate-y-32 translate-x-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
                What Our Users Say
              </h3>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Testimonial Content */}
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>

                  <blockquote className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                    "{testimonials[currentTestimonial].quote}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-600">
                      <Image
                        src={testimonials[currentTestimonial].avatar}
                        alt={`${testimonials[currentTestimonial].author} avatar`}
                        fill
                        className="object-cover"
                        sizes="48px"
                        loading="lazy"
                        onError={e => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<span class="text-gray-200 font-medium flex items-center justify-center w-full h-full">${testimonials[
                              currentTestimonial
                            ].author
                              .split(' ')
                              .map(n => n[0])
                              .join('')}</span>`;
                          }
                        }}
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {testimonials[currentTestimonial].author}
                      </div>
                      <div className="text-gray-300">
                        {testimonials[currentTestimonial].title}
                        {testimonials[currentTestimonial].company &&
                          ` • ${testimonials[currentTestimonial].company}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 touch-target bg-gray-800 border border-gray-600 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-300" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 touch-target bg-gray-800 border border-gray-600 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              {/* Testimonial Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`touch-target rounded-full transition-colors duration-200 ${
                      index === currentTestimonial
                        ? 'bg-cyan-500'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="border-t border-gray-700 pt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Your Security is Our Priority
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We implement industry-leading security measures to protect your
              data and trading information.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {securityBadges.map((badge, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-700 rounded-xl hover:border-gray-600 hover:shadow-md transition-all duration-200 bg-gray-800/50"
              >
                <div className="flex justify-center mb-4">{badge.icon}</div>
                <div className="font-semibold text-white mb-2">
                  {badge.name}
                </div>
                <div className="text-sm text-gray-300">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
