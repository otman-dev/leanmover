// Type definitions for Leanmover website

export interface NavItem {
  name: string;
  href: string;
}

export interface HeroSlide {
  title: string;
  subtitle: string;
  description: string;
}

export interface Metric {
  end: number;
  label: string;
  suffix?: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Certification {
  name: string;
  description: string;
  year?: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: string;
  submittedAt: string;
}
