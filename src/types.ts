/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'about' | 'solutions' | 'contact';

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  linkedin: string;
  contributions: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Service Excellence' | 'Product Innovation';
  description: string;
  challenge: string;
  solution: string;
  impact: string;
  techStack: string[];
  metrics: { value: string; label: string }[];
}

export interface ProductShowcase {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  status: 'Production' | 'Beta' | 'R&D Lab';
  demoMetrics: { name: string; value: number }[];
}

export interface AppointmentSlot {
  time: string;
  available: boolean;
}

export interface ConsultationRequest {
  fullName: string;
  email: string;
  company: string;
  serviceInterest: string;
  message: string;
  preferredDate: string;
  preferredTime: string;
}
