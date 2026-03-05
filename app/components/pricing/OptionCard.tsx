'use client';

import type { FeatureOption, SelectOption } from '@/app/types';

interface OptionCardProps {
  option: SelectOption;
  isSelected: boolean;
  onClick: () => void;
}

export function OptionCard({ option, isSelected, onClick }: OptionCardProps) {
  return (
    <div
      className={`custom-option ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="text-2xl mb-2">{option.icon}</div>
      <div className="font-semibold text-white">{option.label}</div>
      <div className="text-sm text-[var(--text-muted)] mt-1">{option.desc}</div>
    </div>
  );
}

interface FeatureCardProps {
  feature: FeatureOption;
  isSelected: boolean;
  isSuggested: boolean;
  onClick: () => void;
}

export function FeatureCard({
  feature,
  isSelected,
  isSuggested,
  onClick,
}: FeatureCardProps) {
  return (
    <div
      className={`custom-option text-center p-3 relative ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {isSuggested && (
        <div className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
          AI
        </div>
      )}
      <div className="text-xl mb-1">{feature.icon}</div>
      <div className="text-xs font-medium text-white">{feature.label}</div>
    </div>
  );
}
