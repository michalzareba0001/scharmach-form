import {
  PRICING,
  type AppType,
  type DesignType,
  type FeatureType,
  type TimelineType,
} from '@/app/constants/pricing';
import type { Estimate, FormData } from '@/app/types';
import { roundToHundred } from './format';

const ESTIMATE_VARIANCE = 0.12; // ±12%

/**
 * Calculate price estimate based on form data
 */
export function calculateEstimate(formData: FormData): Estimate {
  let total = PRICING.basePrice;

  // App type cost
  if (formData.appType && formData.appType in PRICING.appType) {
    total += PRICING.appType[formData.appType as AppType];
  }

  // Features cost
  formData.features.forEach((feature) => {
    if (feature in PRICING.features) {
      total += PRICING.features[feature as FeatureType];
    }
  });

  // Design cost
  if (formData.hasDesign && formData.hasDesign in PRICING.hasDesign) {
    total += PRICING.hasDesign[formData.hasDesign as DesignType];
  }

  // Timeline cost
  if (formData.timeline && formData.timeline in PRICING.timeline) {
    total += PRICING.timeline[formData.timeline as TimelineType];
  }

  return {
    min: roundToHundred(total * (1 - ESTIMATE_VARIANCE)),
    max: roundToHundred(total * (1 + ESTIMATE_VARIANCE)),
  };
}
