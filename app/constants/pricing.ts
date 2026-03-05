export const PRICING = {
  basePrice: 8000,

  appType: {
    simple: 0,
    medium: 2500,
    complex: 5500,
    enterprise: 9000,
  },

  features: {
    authentication: 500,
    'push-notifications': 400,
    payments: 800,
    maps: 500,
    camera: 400,
    chat: 900,
    'social-media': 500,
    analytics: 300,
    'admin-panel': 1200,
    multilanguage: 500,
    'dark-mode': 200,
  },

  hasDesign: {
    yes: -500,
    partial: 0,
    no: 800,
  },

  timeline: {
    flexible: 0,
    normal: 0,
    fast: 600,
    urgent: 1200,
  },
} as const;

export type AppType = keyof typeof PRICING.appType;
export type FeatureType = keyof typeof PRICING.features;
export type DesignType = keyof typeof PRICING.hasDesign;
export type TimelineType = keyof typeof PRICING.timeline;
