export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface CTAButton {
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  onClick: () => void;
  loading?: boolean;
}

export interface UserLead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  source: 'hero' | 'pricing' | 'footer';
  timestamp: Date;
  utmParams?: UTMParameters;
  interests?: string[];
}

export interface UTMParameters {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
}

export interface AnalyticsEvent {
  eventName: string;
  userId?: string;
  sessionId: string;
  timestamp: Date;
  properties: Record<string, unknown>;
  page: string;
  userAgent: string;
}

export interface ConversionEvent extends AnalyticsEvent {
  conversionType: 'signup' | 'demo_request' | 'waitlist';
  value?: number;
  funnel_step: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company?: string;
  avatar: string;
  rating: number;
}

export interface UserStat {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

export interface PressLogo {
  name: string;
  logo: string;
  url?: string;
}

export interface SecurityBadge {
  name: string;
  icon: React.ReactNode;
  description: string;
}

export interface LeadCaptureForm {
  fields: FormField[];
  submitText: string;
  privacyText: string;
  onSubmit: (data: FormData) => Promise<void>;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: Record<string, unknown>;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface AppDownloadProps {
  appStoreUrl: string;
  playStoreUrl: string;
  askRoiUrl: string;
  aultNodesUrl: string;
  className?: string;
}

export interface DownloadButton {
  platform: 'ios' | 'android';
  url: string;
  icon: React.ReactNode;
  text: string;
}

export interface CompanyLink {
  name: string;
  url: string;
  description?: string;
}
