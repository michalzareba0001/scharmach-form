'use client';

import {
  APP_TYPES,
  FEATURES,
  HAS_DESIGN_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/app/constants';
import { formatPrice } from '@/app/lib';
import type { Estimate, FormData } from '@/app/types';

interface EstimateResultProps {
  formData: FormData;
  estimate: Estimate;
  onReset: () => void;
}

export function EstimateResult({
  formData,
  estimate,
  onReset,
}: EstimateResultProps) {
  const appType = APP_TYPES.find((t) => t.id === formData.appType);
  const designOption = HAS_DESIGN_OPTIONS.find(
    (d) => d.id === formData.hasDesign
  );
  const timeline = TIMELINE_OPTIONS.find((t) => t.id === formData.timeline);

  return (
    <div className="animate-fade-in text-center space-y-8">
      <div className="space-y-4">
        <div className="text-6xl animate-pulse-slow">🦁</div>
        <h2 className="text-3xl md:text-4xl font-bold">
          Twoja <span className="gradient-text">Wycena</span>
        </h2>
        <p className="text-[var(--text-secondary)] max-w-md mx-auto">
          Na podstawie podanych informacji, szacunkowy koszt realizacji Twojej
          aplikacji to:
        </p>
      </div>

      <div className="card glow max-w-lg mx-auto py-8">
        <div className="text-5xl md:text-6xl font-bold gradient-text">
          {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
        </div>
        <div className="text-2xl font-semibold text-white mt-2">PLN</div>
        <div className="text-sm text-[var(--text-muted)] mt-4">
          * Wycena orientacyjna, ostateczna cena zostanie ustalona po
          konsultacji
        </div>
      </div>

      <div className="card max-w-2xl mx-auto text-left space-y-4">
        <h3 className="font-semibold text-lg gradient-text">
          Podsumowanie projektu:
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[var(--text-muted)]">Projekt:</span>
            <div className="font-medium">{formData.projectName}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Email:</span>
            <div className="font-medium">{formData.email}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Typ aplikacji:</span>
            <div className="font-medium">{appType?.label}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Projekt graficzny:</span>
            <div className="font-medium">{designOption?.label}</div>
          </div>
          <div>
            <span className="text-[var(--text-muted)]">Harmonogram:</span>
            <div className="font-medium">{timeline?.label}</div>
          </div>
        </div>

        {formData.features.length > 0 && (
          <div>
            <span className="text-[var(--text-muted)] text-sm">
              Wybrane funkcje:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.features.map((f) => (
                <span
                  key={f}
                  className="bg-[var(--bg-card-hover)] px-3 py-1 rounded-full text-xs"
                >
                  {FEATURES.find((feat) => feat.id === f)?.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <p className="text-[var(--text-secondary)]">
          Skontaktujemy się z Tobą w ciągu 24h, aby omówić szczegóły projektu.
        </p>
        <a
          href="https://scharmach.pl/bezplatna-wycena/"
          className="btn-primary inline-flex items-center gap-2"
        >
          Skontaktuj się teraz 📞
        </a>
        <div className="text-sm text-[var(--text-muted)]">
          lub zadzwoń:{' '}
          <a
            href="tel:+48535959510"
            className="text-[var(--primary)] hover:underline"
          >
            +48 535 959 510
          </a>
        </div>
      </div>

      <button onClick={onReset} className="btn-secondary">
        ← Wypełnij ponownie
      </button>
    </div>
  );
}
