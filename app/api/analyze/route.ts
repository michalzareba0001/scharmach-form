import { ALLOWED_FEATURES } from '@/app/constants/feature-keywords';
import { extractModelPayload, normalizeAIResponse } from '@/app/lib/openai';
import type { AnalyzeModelResult, AnalyzeRequest } from '@/app/types';
import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const OPENAI_MODEL = process.env.OPENAI_ANALYZE_MODEL || 'gpt-4o-mini';
const REQUEST_TIMEOUT_MS = 12000;

async function analyzeWithModel(
  description: string,
  appType: string
): Promise<AnalyzeModelResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      analysis: null,
      status: 503,
      message: 'Brak konfiguracji OPENAI_API_KEY.',
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify(buildOpenAIRequest(description, appType)),
    });

    if (!response.ok) {
      return handleOpenAIError(response);
    }

    const responseJson = await response.json();
    const parsed = extractModelPayload(responseJson);

    if (!parsed) {
      return {
        analysis: null,
        status: 502,
        message: 'Model zwrócił nieprawidłowy format odpowiedzi.',
      };
    }

    return { analysis: normalizeAIResponse(parsed) };
  } catch (error) {
    console.error('OpenAI analyze error:', error);
    return {
      analysis: null,
      status: 503,
      message: 'Błąd połączenia z OpenAI. Spróbuj ponownie.',
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildOpenAIRequest(description: string, appType: string) {
  return {
    model: OPENAI_MODEL,
    input: [
      {
        role: 'system',
        content: [
          {
            type: 'input_text',
            text: `Jesteś asystentem analizującym opis aplikacji. Zwracaj WYŁĄCZNIE JSON zgodny ze schematem. Dozwolone suggestedFeatures: ${ALLOWED_FEATURES.join(', ')}. reasoning pisz po polsku, 1 krótkie zdanie. pricingModifier licz jako nieujemna liczba całkowita (0-3000). Wnioskuj też domyślne funkcje branżowe: np. dla zamawiania jedzenia zwykle dodaj payments, a dla zarządzania ofertą/menu często admin-panel.`,
          },
        ],
      },
      {
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `appType: ${appType || 'simple'}\nappDescription: ${description}`,
          },
        ],
      },
    ],
    text: {
      format: {
        type: 'json_schema',
        name: 'analysis',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            suggestedFeatures: {
              type: 'array',
              items: {
                type: 'string',
                enum: ALLOWED_FEATURES,
              },
            },
            pricingModifier: {
              type: 'number',
              minimum: 0,
              maximum: 3000,
            },
            reasoning: {
              type: 'string',
              minLength: 5,
              maxLength: 180,
            },
          },
          required: ['suggestedFeatures', 'pricingModifier', 'reasoning'],
        },
      },
    },
  };
}

async function handleOpenAIError(
  response: Response
): Promise<AnalyzeModelResult> {
  const retryAfter = response.headers.get('retry-after') || undefined;
  let message = 'Analiza AI jest chwilowo niedostępna. Spróbuj ponownie.';

  try {
    const errorPayload = (await response.json()) as {
      error?: { message?: string; code?: string; type?: string };
    };

    const apiCode = errorPayload?.error?.code;
    const apiMessage = errorPayload?.error?.message;

    if (response.status === 429 && apiCode === 'insufficient_quota') {
      message =
        'Przekroczono limit konta OpenAI (insufficient_quota). Doładuj billing lub zwiększ limity.';
    } else if (response.status === 429) {
      message =
        'Limit zapytań OpenAI został przekroczony. Odczekaj chwilę i spróbuj ponownie.';
    } else if (typeof apiMessage === 'string' && apiMessage.trim().length > 0) {
      message = apiMessage;
    }

    console.error('OpenAI analyze request failed:', {
      status: response.status,
      code: apiCode,
      message: apiMessage,
    });
  } catch {
    console.error('OpenAI analyze request failed:', response.status);
  }

  return {
    analysis: null,
    status: response.status,
    message,
    retryAfter,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { appDescription, appType } = body;

    if (!appDescription || appDescription.trim().length < 10) {
      return NextResponse.json({
        suggestedFeatures: [],
        pricingModifier: 0,
        reasoning: 'Opisz swoją aplikację, a zaproponujemy funkcje.',
      });
    }

    const modelResult = await analyzeWithModel(appDescription, appType);

    if (!modelResult.analysis) {
      return NextResponse.json(
        {
          suggestedFeatures: [],
          pricingModifier: 0,
          reasoning:
            modelResult.message ||
            'Analiza AI jest chwilowo niedostępna. Spróbuj ponownie.',
        },
        {
          status: modelResult.status || 503,
          headers: modelResult.retryAfter
            ? { 'Retry-After': modelResult.retryAfter }
            : undefined,
        }
      );
    }

    console.log('Model analysis result:', modelResult.analysis);
    return NextResponse.json(modelResult.analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      {
        suggestedFeatures: [],
        pricingModifier: 0,
        reasoning: 'Wybierz funkcje ręcznie.',
      },
      { status: 200 }
    );
  }
}
