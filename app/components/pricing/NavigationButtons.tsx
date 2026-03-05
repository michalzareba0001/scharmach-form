'use client';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationButtons({
  currentStep,
  totalSteps,
  canProceed,
  onPrev,
  onNext,
}: NavigationButtonsProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between gap-4">
      <button
        onClick={onPrev}
        className={`btn-secondary ${isFirstStep ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isFirstStep}
      >
        ← Wstecz
      </button>
      <button
        onClick={onNext}
        className="btn-primary flex-1 md:flex-none"
        disabled={!canProceed}
      >
        {isLastStep ? 'Zobacz wycenę 🦁' : 'Dalej →'}
      </button>
    </div>
  );
}
