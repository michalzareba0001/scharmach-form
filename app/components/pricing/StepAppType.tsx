'use client';

import { APP_TYPES } from '@/app/constants';
import type { FormData } from '@/app/types';
import { OptionCard } from './OptionCard';

interface StepAppTypeProps {
  formData: FormData;
  isAnalyzing: boolean;
  onUpdate: (field: keyof FormData, value: string) => void;
}

export function StepAppType({
  formData,
  isAnalyzing,
  onUpdate,
}: StepAppTypeProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Jaki rodzaj aplikacji planujesz? *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {APP_TYPES.map((type) => (
            <OptionCard
              key={type.id}
              option={type}
              isSelected={formData.appType === type.id}
              onClick={() => onUpdate('appType', type.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Opisz swoją aplikację w kilku zdaniach
        </label>
        <p className="text-xs text-[var(--text-muted)]">
          Na podstawie opisu zaproponujemy funkcje, które mogą Ci się przydać 🤖
        </p>
        <textarea
          rows={4}
          placeholder="np. Chcę aplikację dla mojego salonu fryzjerskiego, żeby klienci mogli umawiać się na wizyty, przeglądać ceny i otrzymywać powiadomienia o wolnych terminach..."
          value={formData.appDescription}
          onChange={(e) => onUpdate('appDescription', e.target.value)}
          className="resize-none"
        />
      </div>

      {isAnalyzing && (
        <div className="flex items-center justify-center gap-3 text-[var(--primary)] py-4">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-[var(--primary)] border-t-transparent" />
          <span className="text-sm">Analizuję i dobieram funkcje...</span>
        </div>
      )}
    </div>
  );
}
