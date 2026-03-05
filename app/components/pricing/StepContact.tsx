'use client';

import type { FormData } from '@/app/types';

interface StepContactProps {
  formData: FormData;
  onUpdate: (field: keyof FormData, value: string) => void;
}

export function StepContact({ formData, onUpdate }: StepContactProps) {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Nazwa projektu / aplikacji *
        </label>
        <input
          type="text"
          placeholder="np. Moja Aplikacja Fitness"
          value={formData.projectName}
          onChange={(e) => onUpdate('projectName', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Nazwa firmy (opcjonalnie)
        </label>
        <input
          type="text"
          placeholder="np. Firma XYZ Sp. z o.o."
          value={formData.companyName}
          onChange={(e) => onUpdate('companyName', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Adres e-mail *
        </label>
        <input
          type="email"
          placeholder="twoj@email.pl"
          value={formData.email}
          onChange={(e) => onUpdate('email', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Telefon (opcjonalnie)
        </label>
        <input
          type="tel"
          placeholder="+48 123 456 789"
          value={formData.phone}
          onChange={(e) => onUpdate('phone', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--text-secondary)]">
          Coś więcej? (opcjonalne)
        </label>
        <textarea
          rows={3}
          placeholder="Dodatkowe uwagi lub pytania..."
          value={formData.additionalInfo}
          onChange={(e) => onUpdate('additionalInfo', e.target.value)}
          className="resize-none"
        />
      </div>
    </div>
  );
}
