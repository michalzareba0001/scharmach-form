import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const OPENAI_MODEL = process.env.OPENAI_ANALYZE_MODEL || 'gpt-4o-mini';

// Feature keywords mapping - AI-like analysis
const FEATURE_KEYWORDS: Record<string, string[]> = {
  authentication: [
    'logowanie',
    'login',
    'rejestracja',
    'konto',
    'użytkownik',
    'profil',
    'hasło',
    'autoryzacja',
    'member',
    'user',
  ],
  'push-notifications': [
    'powiadomienia',
    'notyfikacje',
    'alert',
    'przypomnienie',
    'notification',
    'push',
  ],
  payments: [
    'płatność',
    'płatności',
    'platnosc',
    'platnosci',
    'karta',
    'przelew',
    'blik',
    'zakup',
    'sklep',
    'sprzedaż',
    'koszyk',
    'checkout',
    'payment',
    'e-commerce',
    'zamówienie',
    'zamowienie',
    'zamówić',
    'zamowic',
    'zamawiać',
    'zamawiac',
    'zamwaic',
    'jedzenie',
    'restauracja',
    'dania',
  ],
  maps: [
    'mapa',
    'lokalizacja',
    'gps',
    'nawigacja',
    'location',
    'trasa',
    'miejsce',
    'adres',
    'dostawa',
    'kierowca',
  ],
  camera: [
    'zdjęcie',
    'foto',
    'kamera',
    'skan',
    'qr',
    'galeria',
    'image',
    'photo',
    'upload',
  ],
  chat: [
    'czat',
    'wiadomość',
    'komunikator',
    'chat',
    'message',
    'rozmowa',
    'kontakt',
    'support',
    'obsługa',
  ],
  'social-media': [
    'social',
    'facebook',
    'instagram',
    'udostępnianie',
    'share',
    'like',
    'follow',
    'komentarz',
  ],
  analytics: [
    'statystyki',
    'analityka',
    'raport',
    'dashboard',
    'wykres',
    'dane',
    'analytics',
    'tracking',
  ],
  'admin-panel': [
    'admin',
    'panel',
    'zarządzanie',
    'cms',
    'backend',
    'moderacja',
    'kontrola',
  ],
  multilanguage: [
    'język',
    'tłumaczenie',
    'polski',
    'angielski',
    'międzynarodowy',
    'language',
    'multi',
  ],
  'dark-mode': ['ciemny', 'dark', 'tryb', 'theme', 'motyw'],
};

const ALLOWED_FEATURES = Object.keys(FEATURE_KEYWORDS);

interface AnalyzeRequest {
  appDescription: string;
  appType: string;
}

interface AnalyzeResponse {
  suggestedFeatures: string[];
  pricingModifier: number;
  reasoning: string;
}

interface AIAnalyzeRawResponse {
  suggestedFeatures?: unknown;
  pricingModifier?: unknown;
  reasoning?: unknown;
}

interface AnalyzeModelResult {
  analysis: AnalyzeResponse | null;
  status?: number;
  message?: string;
  retryAfter?: string;
}

function extractModelPayload(
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

function normalizeAIResponse(
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
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
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

    const responseJson = await response.json();
    const parsed = extractModelPayload(responseJson);

    if (!parsed) {
      return {
        analysis: null,
        status: 502,
        message: 'Model zwrócił nieprawidłowy format odpowiedzi.',
      };
    }

    return {
      analysis: normalizeAIResponse(parsed),
    };
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
