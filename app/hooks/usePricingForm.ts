'use client';

import { INITIAL_FORM_DATA } from '@/app/constants';
import { calculateEstimate } from '@/app/lib';
import type { Estimate, FormData } from '@/app/types';
import { useCallback, useState } from 'react';

interface UsePricingFormReturn {
  formData: FormData;
  estimate: Estimate;
  updateFormData: (field: keyof FormData, value: string | string[]) => void;
  toggleFeature: (featureId: string) => void;
  resetForm: () => void;
}

export function usePricingForm(): UsePricingFormReturn {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

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

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const estimate = calculateEstimate(formData);

  return {
    formData,
    estimate,
    updateFormData,
    toggleFeature,
    resetForm,
  };
}
