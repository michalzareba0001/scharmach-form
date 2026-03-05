import type { FeatureOption, SelectOption, Step } from '@/app/types';

export const APP_TYPES: SelectOption[] = [
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

export const FEATURES: FeatureOption[] = [
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

export const HAS_DESIGN_OPTIONS: SelectOption[] = [
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

export const TIMELINE_OPTIONS: SelectOption[] = [
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

export const STEPS: Step[] = [
  { id: 1, name: 'Opowiedz o aplikacji', icon: '📱' },
  { id: 2, name: 'Co ma robić?', icon: '⚡' },
  { id: 3, name: 'Kiedy i jak?', icon: '📅' },
  { id: 4, name: 'Kontakt', icon: '👤' },
];

export const INITIAL_FORM_DATA = {
  appType: '',
  appDescription: '',
  features: [] as string[],
  timeline: '',
  hasDesign: '',
  projectName: '',
  companyName: '',
  email: '',
  phone: '',
  additionalInfo: '',
};
