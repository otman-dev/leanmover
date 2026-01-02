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
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  notes?: string;
  assignedTo?: string;
  repliedAt?: Date;
  source: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Solution related types
export interface SolutionResult {
  metric: string;
  value: string;
  description: string;
}

export interface SolutionTechnology {
  category: 'Hardware' | 'Software' | 'Process' | 'Integration';
  name: string;
  description?: string;
}

export interface SolutionTimeline {
  phase: string;
  duration: string;
  description?: string;
}

export interface SolutionClient {
  name?: string;
  sector: string;
  size: 'startup' | 'sme' | 'large';
  location?: string;
}

export interface Solution {
  _id?: string;
  title: string;
  slug: string;
  industry: string;
  shortDescription: string;
  client: SolutionClient;
  challenge: string;
  solution: string;
  results: SolutionResult[];
  technologies: SolutionTechnology[];
  timeline: SolutionTimeline[];
  imageUrl?: string;
  gallery: string[];
  metaDescription: string;
  keywords: string[];
  publishedAt: Date;
  updatedAt?: Date;
  status: 'draft' | 'published' | 'featured';
  featured: boolean;
  viewCount: number;
  downloadCount: number;
}

// Blog related types
export interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readTime: string;
  imageUrl?: string;
  metaDescription: string;
  keywords: string[];
  publishedAt: Date;
  updatedAt?: Date;
  status: 'draft' | 'published';
  featured: boolean;
  viewCount: number;
}
