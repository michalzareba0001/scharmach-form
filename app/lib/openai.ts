import { ALLOWED_FEATURES } from '@/app/constants/feature-keywords';
import type { AIAnalyzeRawResponse, AnalyzeResponse } from '@/app/types';

/**
 * Extract the model payload from the OpenAI response
 */
export function extractModelPayload(
  responseJson: unknown
): AIAnalyzeRawResponse | null {
  if (!responseJson || typeof responseJson !== 'object') {
    return null;
  }

  const data = responseJson as {
    output_text?: unknown;
    output?: Array<{
      type?: string;
      content?: Array<{ type?: string; text?: unknown; json?: unknown }>;
    }>;
  };

  if (
    data.output_text &&
    typeof data.output_text === 'object' &&
    !Array.isArray(data.output_text)
  ) {
    return data.output_text as AIAnalyzeRawResponse;
  }

  if (typeof data.output_text === 'string') {
    try {
      return JSON.parse(data.output_text) as AIAnalyzeRawResponse;
    } catch {
      return null;
    }
  }

  if (!Array.isArray(data.output)) {
    return null;
  }

  for (const entry of data.output) {
    if (!entry || !Array.isArray(entry.content)) {
      continue;
    }

    for (const part of entry.content) {
      if (part?.json && typeof part.json === 'object') {
        return part.json as AIAnalyzeRawResponse;
      }

      if (typeof part?.text === 'string' && part.text.trim().length > 0) {
        try {
          return JSON.parse(part.text) as AIAnalyzeRawResponse;
        } catch {
          continue;
        }
      }
    }
  }

  return null;
}

/**
 * Normalize and validate the AI response
 */
export function normalizeAIResponse(
  payload: AIAnalyzeRawResponse
): AnalyzeResponse | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const suggestedFeatures = Array.isArray(payload.suggestedFeatures)
    ? payload.suggestedFeatures
        .filter((value): value is string => typeof value === 'string')
        .filter((feature) => ALLOWED_FEATURES.includes(feature))
    : [];

  const pricingModifier =
    typeof payload.pricingModifier === 'number' &&
    Number.isFinite(payload.pricingModifier)
      ? Math.round(payload.pricingModifier)
      : 0;

  const reasoning =
    typeof payload.reasoning === 'string' && payload.reasoning.trim().length > 0
      ? payload.reasoning.trim()
      : 'Wybierz funkcje które najlepiej pasują do Twojej aplikacji.';

  return {
    suggestedFeatures,
    pricingModifier,
    reasoning,
  };
}
