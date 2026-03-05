'use client';

import { HAS_DESIGN_OPTIONS, TIMELINE_OPTIONS } from '@/app/constants';
import type { FormData } from '@/app/types';
import { OptionCard } from './OptionCard';

interface StepTimelineProps {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: string) => void;
}

export function StepTimeline({ formData, onUpdate }: StepTimelineProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Kiedy chcesz mieć gotową aplikację? *
        </label>
        <div className="grid grid-cols-2 gap-4">
          {TIMELINE_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={formData.timeline === option.id}
              onClick={() => onUpdate('timeline', option.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Masz już projekt graficzny aplikacji? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HAS_DESIGN_OPTIONS.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              isSelected={formData.hasDesign === option.id}
              onClick={() => onUpdate('hasDesign', option.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
