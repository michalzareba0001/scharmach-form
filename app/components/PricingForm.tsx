'use client';

import { useEffect, useState } from 'react';

// Types
interface FormData {
  // Step 1: App Type & Description
  appType: string;
  appDescription: string;

  // Step 2: Features
  features: string[];

  // Step 3: Timeline & Design
  timeline: string;
  hasDesign: string;

  // Step 4: Contact Info (last)
  projectName: string;
  companyName: string;
  email: string;
  phone: string;
  additionalInfo: string;
}

// Pricing multipliers and additions
const PRICING = {
  basePrice: 8000, // PLN - optimized for 6.5k-24k range

  appType: {
    simple: 0,
    medium: 2500,
    complex: 5500,
    enterprise: 9000,
  },

  features: {
    authentication: 500,
    'push-notifications': 400,
    payments: 800,
    maps: 500,
    camera: 400,
    chat: 900,
    'social-media': 500,
    analytics: 300,
    'admin-panel': 1200,
    multilanguage: 500,
    'dark-mode': 200,
  },

  hasDesign: {
    yes: -500,
    partial: 0,
    no: 800,
  },

  timeline: {
    flexible: 0,
    normal: 0,
    fast: 600,
    urgent: 1200,
  },
};

// Form options
const APP_TYPES = [
  {
    id: 'simple',
    label: 'Prosta',
    desc: 'Wizytówka, katalog, do 5 ekranów',
    icon: '📱',
  },
  {
    id: 'medium',
    label: 'Średnia',
    desc: 'Konta użytkowników, 5-10 ekranów',
    icon: '📲',
  },
  {
    id: 'complex',
    label: 'Rozbudowana',
    desc: 'Sklep, rezerwacje, płatności, 10+ ekranów',
    icon: '💼',
  },
  {
    id: 'enterprise',
    label: 'Zaawansowana',
    desc: 'Duży system dla firmy, wiele funkcji',
    icon: '🏢',
  },
];

const FEATURES = [
  { id: 'authentication', label: 'Logowanie / Rejestracja', icon: '🔐' },
  { id: 'push-notifications', label: 'Powiadomienia Push', icon: '🔔' },
  { id: 'payments', label: 'Płatności Online', icon: '💳' },
  { id: 'maps', label: 'Mapy / Lokalizacja', icon: '🗺️' },
  { id: 'camera', label: 'Kamera / Zdjęcia', icon: '📷' },
  { id: 'chat', label: 'Czat / Wiadomości', icon: '💬' },
  { id: 'social-media', label: 'Integracja Social Media', icon: '📢' },
  { id: 'analytics', label: 'Analityka / Statystyki', icon: '📊' },
  { id: 'admin-panel', label: 'Panel Administracyjny', icon: '⚙️' },
  { id: 'multilanguage', label: 'Wielojęzyczność', icon: '🌍' },
  { id: 'dark-mode', label: 'Tryb Ciemny', icon: '🌙' },
];

const HAS_DESIGN_OPTIONS = [
  {
    id: 'yes',
    label: 'Tak, mam projekt graficzny',
    desc: 'Mam gotowe makiety lub design',
    icon: '✅',
  },
  {
    id: 'partial',
    label: 'Mam pomysł',
    desc: 'Wiem jak ma wyglądać, ale nie mam projektu',
    icon: '📝',
  },
  {
    id: 'no',
    label: 'Potrzebuję projektu',
    desc: 'Chcę żebyście zaprojektowali wygląd',
    icon: '🎯',
  },
];

const TIMELINE_OPTIONS = [
  {
    id: 'flexible',
    label: 'Spokojnie',
    desc: 'Bez pośpiechu, zróbmy to dobrze',
    icon: '🧘',
  },
  { id: 'normal', label: 'Standardowo', desc: '2-3 miesiące', icon: '📅' },
  { id: 'fast', label: 'Szybko', desc: '1-2 miesiące', icon: '⚡' },
  {
    id: 'urgent',
    label: 'Na wczoraj',
    desc: 'Pilne, poniżej miesiąca',
    icon: '🚨',
  },
];

const STEPS = [
  { id: 1, name: 'Opowiedz o aplikacji', icon: '📱' },
  { id: 2, name: 'Co ma robić?', icon: '⚡' },
  { id: 3, name: 'Kiedy i jak?', icon: '📅' },
  { id: 4, name: 'Kontakt', icon: '👤' },
];

export default function PricingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showEstimate, setShowEstimate] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState('');
  const [suggestedFeatures, setSuggestedFeatures] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    appType: '',
    appDescription: '',
    features: [],
    timeline: '',
    hasDesign: '',
    projectName: '',
    companyName: '',
    email: '',
    phone: '',
    additionalInfo: '',
  });

  const [estimate, setEstimate] = useState({ min: 0, max: 0 });

  // Calculate estimate whenever formData changes
  useEffect(() => {
    calculateEstimate();
  }, [formData]);

  const calculateEstimate = () => {
    let total = PRICING.basePrice;

    // App type
    if (formData.appType) {
      total +=
        PRICING.appType[formData.appType as keyof typeof PRICING.appType] || 0;
    }

    // Features
    formData.features.forEach((feature) => {
      total += PRICING.features[feature as keyof typeof PRICING.features] || 0;
    });

    // Has existing design
    if (formData.hasDesign) {
      total +=
        PRICING.hasDesign[
          formData.hasDesign as keyof typeof PRICING.hasDesign
        ] || 0;
    }

    // Timeline
    if (formData.timeline) {
      total +=
        PRICING.timeline[formData.timeline as keyof typeof PRICING.timeline] ||
        0;
    }

    // Calculate range (±12%)
    const min = Math.round((total * 0.88) / 100) * 100;
    const max = Math.round((total * 1.12) / 100) * 100;

    setEstimate({ min, max });
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: 'features', value: string) => {
    const currentValues = formData[field];
    if (currentValues.includes(value)) {
      updateFormData(
        field,
        currentValues.filter((v) => v !== value)
      );
    } else {
      updateFormData(field, [...currentValues, value]);
    }
  };

  // AI Analysis when moving from step 1 to step 2
  const analyzeAndSuggestFeatures = async () => {
    if (!formData.appDescription || formData.appDescription.length < 10) {
      setCurrentStep(2);
      return;
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

      if (data.suggestedFeatures && data.suggestedFeatures.length > 0) {
        setSuggestedFeatures(data.suggestedFeatures);
        setFormData((prev) => ({
          ...prev,
          features: [...new Set([...prev.features, ...data.suggestedFeatures])],
        }));
        setAiReasoning(data.reasoning);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setIsAnalyzing(false);
    setCurrentStep(2);
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      await analyzeAndSuggestFeatures();
    } else if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowEstimate(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.appType !== '' && !isAnalyzing;
      case 2:
        return true; // Features are optional
      case 3:
        return formData.timeline && formData.hasDesign;
      case 4:
        return formData.projectName && formData.email;
      default:
        return true;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        // Step 1: App Type + Description
        return (
          <div className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Jaki rodzaj aplikacji planujesz? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {APP_TYPES.map((type) => (
                  <div
                    key={type.id}
                    className={`custom-option ${formData.appType === type.id ? 'selected' : ''}`}
                    onClick={() => updateFormData('appType', type.id)}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="font-semibold text-white">{type.label}</div>
                    <div className="text-sm text-[var(--text-muted)] mt-1">
                      {type.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Opisz swoją aplikację w kilku zdaniach
              </label>
              <p className="text-xs text-[var(--text-muted)]">
                Na podstawie opisu zaproponujemy funkcje, które mogą Ci się
                przydać 🤖
              </p>
              <textarea
                rows={4}
                placeholder="np. Chcę aplikację dla mojego salonu fryzjerskiego, żeby klienci mogli umawiać się na wizyty, przeglądać ceny i otrzymywać powiadomienia o wolnych terminach..."
                value={formData.appDescription}
                onChange={(e) =>
                  updateFormData('appDescription', e.target.value)
                }
                className="resize-none"
              />
            </div>

            {isAnalyzing && (
              <div className="flex items-center justify-center gap-3 text-[var(--primary)] py-4">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-[var(--primary)] border-t-transparent"></div>
                <span className="text-sm">Analizuję i dobieram funkcje...</span>
              </div>
            )}
          </div>
        );

      case 2:
        // Step 2: Features (with AI suggestions)
        return (
          <div className="animate-fade-in space-y-6">
            {aiReasoning && (
              <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--primary)] mb-1">
                      Propozycja na podstawie opisu:
                    </p>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {aiReasoning}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Funkcje aplikacji
              </label>
              <p className="text-sm text-[var(--text-muted)]">
                {suggestedFeatures.length > 0
                  ? 'Zaproponowaliśmy funkcje na podstawie Twojego opisu. Możesz je zmienić.'
                  : 'Wybierz funkcje, które powinna mieć Twoja aplikacja'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FEATURES.map((feature) => {
                  const isSuggested = suggestedFeatures.includes(feature.id);
                  const isSelected = formData.features.includes(feature.id);
                  return (
                    <div
                      key={feature.id}
                      className={`custom-option text-center p-3 relative ${isSelected ? 'selected' : ''}`}
                      onClick={() => toggleArrayField('features', feature.id)}
                    >
                      {isSuggested && (
                        <div className="absolute -top-2 -right-2 bg-[var(--primary)] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          AI
                        </div>
                      )}
                      <div className="text-xl mb-1">{feature.icon}</div>
                      <div className="text-xs font-medium text-white">
                        {feature.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 3:
        // Step 3: Timeline & Design
        return (
          <div className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Kiedy chcesz mieć gotową aplikację? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {TIMELINE_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={`custom-option ${formData.timeline === option.id ? 'selected' : ''}`}
                    onClick={() => updateFormData('timeline', option.id)}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-[var(--text-muted)] mt-1">
                      {option.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">
                Masz już projekt graficzny aplikacji? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {HAS_DESIGN_OPTIONS.map((option) => (
                  <div
                    key={option.id}
                    className={`custom-option ${formData.hasDesign === option.id ? 'selected' : ''}`}
                    onClick={() => updateFormData('hasDesign', option.id)}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-semibold text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-[var(--text-muted)] mt-1">
                      {option.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        // Step 4: Contact Info (last)
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
                onChange={(e) => updateFormData('projectName', e.target.value)}
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
                onChange={(e) => updateFormData('companyName', e.target.value)}
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
                onChange={(e) => updateFormData('email', e.target.value)}
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
                onChange={(e) => updateFormData('phone', e.target.value)}
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
                onChange={(e) =>
                  updateFormData('additionalInfo', e.target.value)
                }
                className="resize-none"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showEstimate) {
    return (
      <div className="animate-fade-in text-center space-y-8">
        <div className="space-y-4">
          <div className="text-6xl animate-pulse-slow">🦁</div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Twoja <span className="gradient-text">Wycena</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto">
            Na podstawie podanych informacji, szacunkowy koszt realizacji Twojej
            aplikacji to:
          </p>
        </div>

        <div className="card glow max-w-md mx-auto py-8">
          <div className="text-5xl md:text-6xl font-bold gradient-text">
            {formatPrice(estimate.min)} - {formatPrice(estimate.max)}
          </div>
          <div className="text-2xl font-semibold text-white mt-2">PLN</div>
          <div className="text-sm text-[var(--text-muted)] mt-4">
            * Wycena orientacyjna, ostateczna cena zostanie ustalona po
            konsultacji
          </div>
        </div>

        <div className="card max-w-2xl mx-auto text-left space-y-4">
          <h3 className="font-semibold text-lg gradient-text">
            Podsumowanie projektu:
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[var(--text-muted)]">Projekt:</span>
              <div className="font-medium">{formData.projectName}</div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Email:</span>
              <div className="font-medium">{formData.email}</div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Typ aplikacji:</span>
              <div className="font-medium">
                {APP_TYPES.find((t) => t.id === formData.appType)?.label}
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">
                Projekt graficzny:
              </span>
              <div className="font-medium">
                {
                  HAS_DESIGN_OPTIONS.find((d) => d.id === formData.hasDesign)
                    ?.label
                }
              </div>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">Harmonogram:</span>
              <div className="font-medium">
                {
                  TIMELINE_OPTIONS.find((t) => t.id === formData.timeline)
                    ?.label
                }
              </div>
            </div>
          </div>
          {formData.features.length > 0 && (
            <div>
              <span className="text-[var(--text-muted)] text-sm">
                Wybrane funkcje:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((f) => (
                  <span
                    key={f}
                    className="bg-[var(--bg-card-hover)] px-3 py-1 rounded-full text-xs"
                  >
                    {FEATURES.find((feat) => feat.id === f)?.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-[var(--text-secondary)]">
            Skontaktujemy się z Tobą w ciągu 24h, aby omówić szczegóły projektu.
          </p>
          <a
            href="https://scharmach.pl/bezplatna-wycena/"
            className="btn-primary inline-flex items-center gap-2"
          >
            Skontaktuj się teraz 📞
          </a>
          <div className="text-sm text-[var(--text-muted)]">
            lub zadzwoń:{' '}
            <a
              href="tel:+48535959510"
              className="text-[var(--primary)] hover:underline"
            >
              +48 535 95 95 10
            </a>
          </div>
        </div>

        <button
          onClick={() => {
            setShowEstimate(false);
            setCurrentStep(1);
            setSuggestedFeatures([]);
            setAiReasoning('');
            setFormData({
              appType: '',
              appDescription: '',
              features: [],
              timeline: '',
              hasDesign: '',
              projectName: '',
              companyName: '',
              email: '',
              phone: '',
              additionalInfo: '',
            });
          }}
          className="btn-secondary"
        >
          ← Wypełnij ponownie
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--text-muted)]">
            Krok {currentStep} z 4
          </span>
          <span className="text-[var(--primary)] font-medium">
            {Math.round((currentStep / 4) * 100)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
        {/* Step indicators */}
        <div className="hidden md:flex justify-between">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex items-center gap-2 text-xs ${
                step.id === currentStep
                  ? 'text-[var(--primary)]'
                  : step.id < currentStep
                    ? 'text-[var(--success)]'
                    : 'text-[var(--text-muted)]'
              }`}
            >
              <span>{step.icon}</span>
              <span className="hidden lg:inline">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step title */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">{STEPS[currentStep - 1]?.icon}</span>{' '}
          {STEPS[currentStep - 1]?.name}
        </h2>
      </div>

      {/* Form content */}
      <div className="card">{renderStep()}</div>

      {/* Live estimate preview */}
      <div className="card bg-gradient-to-r from-[var(--bg-card)] to-[rgba(201,162,39,0.05)] border-[var(--primary)] border-opacity-30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--text-muted)]">
              Szacunkowa wycena
            </div>
            <div className="text-2xl font-bold gradient-text">
              {formatPrice(estimate.min)} - {formatPrice(estimate.max)} PLN
            </div>
          </div>
          <div className="text-4xl">🦁</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-4">
        <button
          onClick={prevStep}
          className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentStep === 1}
        >
          ← Wstecz
        </button>
        <button
          onClick={nextStep}
          className="btn-primary flex-1 md:flex-none"
          disabled={!canProceed()}
        >
          {currentStep === 4 ? 'Zobacz wycenę 🦁' : 'Dalej →'}
        </button>
      </div>
    </div>
  );
}
