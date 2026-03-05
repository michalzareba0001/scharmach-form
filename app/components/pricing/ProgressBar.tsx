'use client';

import type { Step } from '@/app/types';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="text-[var(--text-muted)]">
          Krok {currentStep} z {totalSteps}
        </span>
        <span className="text-[var(--primary)] font-medium">{progress}%</span>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="hidden md:flex justify-between">
        {steps.map((step) => (
          <StepIndicator key={step.id} step={step} currentStep={currentStep} />
        ))}
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  step: Step;
  currentStep: number;
}

function StepIndicator({ step, currentStep }: StepIndicatorProps) {
  const getStepColor = () => {
    if (step.id === currentStep) return 'text-[var(--primary)]';
    if (step.id < currentStep) return 'text-[var(--success)]';
    return 'text-[var(--text-muted)]';
  };

  return (
    <div className={`flex items-center gap-2 text-xs ${getStepColor()}`}>
      <span>{step.icon}</span>
      <span className="hidden lg:inline">{step.name}</span>
    </div>
  );
}
