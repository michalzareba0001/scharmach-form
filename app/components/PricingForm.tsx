'use client';

import { INITIAL_FORM_DATA, STEPS } from '@/app/constants';
import { useAIAnalysis } from '@/app/hooks';
import { calculateEstimate } from '@/app/lib';
import type { FormData } from '@/app/types';
import { useCallback, useState } from 'react';
import {
  EstimatePreview,
  EstimateResult,
  NavigationButtons,
  ProgressBar,
  StepAppType,
  StepContact,
  StepFeatures,
  StepTimeline,
} from './pricing';

export default function PricingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEstimate, setShowEstimate] = useState(false);
  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM_DATA });

  const {
    isAnalyzing,
    aiReasoning,
    suggestedFeatures,
    analyzeDescription,
    clearAnalysis,
  } = useAIAnalysis();

  const estimate = calculateEstimate(formData);

  const updateFormData = useCallback(
    (field: keyof FormData, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleFeature = useCallback((featureId: string) => {
    setFormData((prev) => {
      const features = prev.features.includes(featureId)
        ? prev.features.filter((f) => f !== featureId)
        : [...prev.features, featureId];
      return { ...prev, features };
    });
  }, []);

  const handleAnalyzeAndProceed = async () => {
    const result = await analyzeDescription(formData);
    if (result?.suggestedFeatures?.length) {
      setFormData((prev) => ({
        ...prev,
        features: [...new Set([...prev.features, ...result.suggestedFeatures])],
      }));
    }
    setCurrentStep(2);
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      await handleAnalyzeAndProceed();
    } else if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowEstimate(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setShowEstimate(false);
    setCurrentStep(1);
    setFormData({ ...INITIAL_FORM_DATA });
    clearAnalysis();
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return formData.appType !== '' && !isAnalyzing;
      case 2:
        return true;
      case 3:
        return Boolean(formData.timeline && formData.hasDesign);
      case 4:
        return Boolean(formData.projectName && formData.email);
      default:
        return true;
    }
  };

  if (showEstimate) {
    return (
      <EstimateResult
        formData={formData}
        estimate={estimate}
        onReset={handleReset}
      />
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepAppType
            formData={formData}
            isAnalyzing={isAnalyzing}
            onUpdate={updateFormData}
          />
        );
      case 2:
        return (
          <StepFeatures
            formData={formData}
            suggestedFeatures={suggestedFeatures}
            aiReasoning={aiReasoning}
            onToggleFeature={toggleFeature}
          />
        );
      case 3:
        return <StepTimeline formData={formData} onUpdate={updateFormData} />;
      case 4:
        return <StepContact formData={formData} onUpdate={updateFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <ProgressBar currentStep={currentStep} totalSteps={4} steps={STEPS} />

      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">{STEPS[currentStep - 1]?.icon}</span>{' '}
          {STEPS[currentStep - 1]?.name}
        </h2>
      </div>

      <div className="card">{renderStep()}</div>

      <EstimatePreview estimate={estimate} />

      <NavigationButtons
        currentStep={currentStep}
        totalSteps={4}
        canProceed={canProceed()}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
