// Form Types
export interface FormData {
  appType: string;
  appDescription: string;
  features: string[];
  timeline: string;
  hasDesign: string;
  projectName: string;
  companyName: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

export interface Estimate {
  min: number;
  max: number;
}

// Option Types
export interface SelectOption {
  id: string;
  label: string;
  desc: string;
  icon: string;
}

export interface FeatureOption {
  id: string;
  label: string;
  icon: string;
}

export interface Step {
  id: number;
  name: string;
  icon: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  accentColor: string;
  rotation: number;
  screenshots: string[];
}

// API Types
export interface AnalyzeRequest {
  appDescription: string;
  appType: string;
}

export interface AnalyzeResponse {
  suggestedFeatures: string[];
  pricingModifier: number;
  reasoning: string;
}

export interface AIAnalyzeRawResponse {
  suggestedFeatures?: unknown;
  pricingModifier?: unknown;
  reasoning?: unknown;
}

export interface AnalyzeModelResult {
  analysis: AnalyzeResponse | null;
  status?: number;
  message?: string;
  retryAfter?: string;
}
