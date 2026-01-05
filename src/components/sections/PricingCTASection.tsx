'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import CTAButton from '@/components/ui/CTAButton';
import { trackFormSubmission, trackFunnelStep } from '@/lib/analytics';
import {
  CheckIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

// Form validation schema
const leadCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;

export interface PricingCTASectionProps {
  mode?: 'free-trial' | 'beta-access' | 'waitlist';
  onSubmit?: (data: LeadCaptureFormData) => Promise<void>;
  className?: string;
}

export default function PricingCTASection({
  mode = 'free-trial',
  onSubmit,
  className = '',
}: PricingCTASectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
  });

  const handleFormSubmit = async (data: LeadCaptureFormData) => {
    setIsSubmitting(true);

    // Track funnel step - form started
    const conversionType =
      mode === 'free-trial'
        ? 'signup'
        : mode === 'beta-access'
          ? 'demo_request'
          : 'waitlist';
    trackFunnelStep('form_started', 1, conversionType);

    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Form submitted:', data);
      }

      // Track successful form submission
      trackFormSubmission(conversionType, 'pricing-cta');
      trackFunnelStep('form_completed', 2, conversionType);

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      // Track form submission error
      trackFunnelStep('form_error', -1, conversionType);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContent = () => {
    switch (mode) {
      case 'beta-access':
        return {
          headline: 'Get Early Access to Only Bulls',
          subheadline:
            'Join our exclusive beta program and be among the first to experience AI-powered trading.',
          ctaText: 'Request Beta Access',
          valueProps: [
            'Exclusive early access to all features',
            'Direct feedback channel to our development team',
            'Special beta user pricing when we launch',
            'Priority support and onboarding',
          ],
          trustSignal: 'Join 500+ beta testers already improving their trading',
        };
      case 'waitlist':
        return {
          headline: 'Join the Only Bulls Waitlist',
          subheadline:
            'Be the first to know when Only Bulls launches and secure your spot.',
          ctaText: 'Join Waitlist',
          valueProps: [
            'First access when we launch',
            'Exclusive launch pricing',
            'Weekly market insights while you wait',
            'No commitment required',
          ],
          trustSignal: 'Over 2,000 traders already on the waitlist',
        };
      default: // free-trial
        return {
          headline: 'Start Your Free Trial Today',
          subheadline:
            'Experience the power of AI-driven trading with no risk and no commitment.',
          ctaText: 'Start Free Trial',
          valueProps: [
            '14-day free trial, no credit card required',
            'Full access to all AI trading features',
            'Personal onboarding and setup assistance',
            'Cancel anytime, keep your insights',
          ],
          trustSignal:
            'Join 1,000+ traders already using AI to improve performance',
        };
    }
  };

  const content = getContent();

  if (isSubmitted) {
    return (
      <section
        id="signup-form"
        className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {mode === 'free-trial' &&
                "We'll send you your trial access details shortly."}
              {mode === 'beta-access' &&
                "You're now on our beta access list. We'll be in touch soon!"}
              {mode === 'waitlist' &&
                "You're on the list! We'll notify you as soon as Only Bulls launches."}
            </p>
            <p className="text-sm text-gray-500">
              Check your email for next steps and important updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="signup-form"
      className={`py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-lime-600 bg-clip-text text-transparent mb-6">
            {content.headline}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {content.subheadline}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Value Proposition Side */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 sm:p-12 text-white">
              <h3 className="text-2xl font-bold mb-6">What You Get</h3>
              <ul className="space-y-4 mb-8">
                {content.valueProps.map((prop, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-6 h-6 text-green-200 flex-shrink-0 mt-0.5" />
                    <span className="text-green-50">{prop}</span>
                  </li>
                ))}
              </ul>

              {/* Trust signals */}
              <div className="border-t border-green-500 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <UserGroupIcon className="w-6 h-6 text-green-200" />
                  <span className="text-green-100 text-sm">
                    {content.trustSignal}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-6 h-6 text-green-200" />
                  <span className="text-green-100 text-sm">
                    Your data is secure and never shared with third parties
                  </span>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="p-8 sm:p-12">
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* First Name Field */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name Field (Optional) */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>

                {/* Submit Button */}
                <CTAButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  analyticsLabel={content.ctaText}
                  analyticsLocation="pricing-form"
                  className="text-lg py-4"
                >
                  {content.ctaText}
                </CTAButton>

                {/* Privacy Statement */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    By submitting this form, you agree to receive marketing
                    communications from Only Bulls. We respect your privacy and
                    will never share your information with third parties. You
                    can unsubscribe at any time.{' '}
                    <a
                      href="/privacy"
                      className="text-green-600 hover:text-green-700 underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
