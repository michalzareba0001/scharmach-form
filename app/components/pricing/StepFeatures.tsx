'use client';

import { FEATURES } from '@/app/constants';
import type { FormData } from '@/app/types';
import { FeatureCard } from './OptionCard';

interface StepFeaturesProps {
  formData: FormData;
  suggestedFeatures: string[];
  aiReasoning: string;
  onToggleFeature: (featureId: string) => void;
}

export function StepFeatures({
  formData,
  suggestedFeatures,
  aiReasoning,
  onToggleFeature,
}: StepFeaturesProps) {
  return (
    <div className="animate-fade-in space-y-6">
      {aiReasoning && <AIReasoningBanner reasoning={aiReasoning} />}

      <div className="space-y-4">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Funkcje aplikacji
        </label>
        <p className="text-sm text-[var(--text-muted)]">
          {suggestedFeatures.length > 0
            ? 'Zaproponowaliśmy funkcje na podstawie Twojego opisu. Możesz je zmienić.'
            : 'Wybierz funkcje, które powinna mieć Twoja aplikacja'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isSelected={formData.features.includes(feature.id)}
              isSuggested={suggestedFeatures.includes(feature.id)}
              onClick={() => onToggleFeature(feature.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface AIReasoningBannerProps {
  reasoning: string;
}

function AIReasoningBanner({ reasoning }: AIReasoningBannerProps) {
  return (
    <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">🤖</span>
        <div>
          <p className="text-sm font-medium text-[var(--primary)] mb-1">
            Propozycja na podstawie opisu:
          </p>
          <p className="text-sm text-[var(--text-secondary)]">{reasoning}</p>
        </div>
      </div>
    </div>
  );
}
