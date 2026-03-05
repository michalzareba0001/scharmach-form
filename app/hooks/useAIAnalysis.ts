'use client';

import type { FormData } from '@/app/types';
import { useCallback, useState } from 'react';

interface AnalysisResult {
  suggestedFeatures: string[];
  reasoning: string;
}

interface UseAIAnalysisReturn {
  isAnalyzing: boolean;
  aiReasoning: string;
  suggestedFeatures: string[];
  analyzeDescription: (formData: FormData) => Promise<AnalysisResult | null>;
  clearAnalysis: () => void;
}

export function useAIAnalysis(): UseAIAnalysisReturn {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState('');
  const [suggestedFeatures, setSuggestedFeatures] = useState<string[]>([]);

  const analyzeDescription = useCallback(
    async (formData: FormData): Promise<AnalysisResult | null> => {
      if (!formData.appDescription || formData.appDescription.length < 10) {
        return null;
      }

      setIsAnalyzing(true);

      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            appDescription: formData.appDescription,
            appType: formData.appType,
          }),
        });

        const data = await response.json();

        if (data.suggestedFeatures?.length > 0) {
          setSuggestedFeatures(data.suggestedFeatures);
          setAiReasoning(data.reasoning || '');
          return {
            suggestedFeatures: data.suggestedFeatures,
            reasoning: data.reasoning || '',
          };
        }
      } catch (error) {
        console.error('Analysis failed:', error);
      } finally {
        setIsAnalyzing(false);
      }

      return null;
    },
    []
  );

  const clearAnalysis = useCallback(() => {
    setSuggestedFeatures([]);
    setAiReasoning('');
  }, []);

  return {
    isAnalyzing,
    aiReasoning,
    suggestedFeatures,
    analyzeDescription,
    clearAnalysis,
  };
}
