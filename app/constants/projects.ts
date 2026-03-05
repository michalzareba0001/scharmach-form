import type { Project } from '@/app/types';

export const PROJECTS: Project[] = [
  {
    id: 'e-taca',
    title: 'E-Taca',
    description:
      'Polski serwis umożliwiający płacenie dotacji dla kościoła online. Panel administracyjny dla parafii do tworzenia zbiórek, zarządzania darowiznami i monitorowania wpłat.',
    category: 'FinTech / Kościół',
    tech: ['Flutter', 'TypeScript'],
    accentColor: '#c9a227',
    rotation: -10,
    screenshots: [
      '/e-taca/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.47.43.png',
      '/e-taca/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.47.53.png',
      '/e-taca/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.47.57.png',
      '/e-taca/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.48.02.png',
    ],
  },
  {
    id: 'fuszek',
    title: 'Fuszek',
    description:
      'Portal do znajdywania pracy dorywczej na teraz. Szybkie zlecenia lokalne — łączenie zleceniodawców z wykonawcami w Twojej okolicy.',
    category: 'Praca / Marketplace',
    tech: ['Flutter', 'TypeScript'],
    accentColor: '#22c55e',
    rotation: 6,
    screenshots: [
      '/fuszek/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.53.31.png',
      '/fuszek/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.53.39.png',
      '/fuszek/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.53.46.png',
    ],
  },
  {
    id: 'mpc',
    title: 'MPC',
    description:
      'Aplikacja z pełnym wyposażeniem dla trenera personalnego i jego klientów. Śledzenie postępów, plany treningowe, statystyki i komunikacja trener–klient.',
    category: 'Fitness / SaaS',
    tech: ['Flutter', 'TypeScript'],
    accentColor: '#3b82f6',
    rotation: -14,
    screenshots: [
      '/mpc/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.59.37.png',
      '/mpc/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 12.59.49.png',
      '/mpc/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 13.00.11.png',
    ],
  },
  {
    id: 'novawixa',
    title: 'Novawixa',
    description:
      'Serwis dla właścicieli agencji organizujących imprezy. Sprzedaż biletów, zarządzanie eventami, statystyki sprzedaży i obsługa gości.',
    category: 'Eventy / Bilety',
    tech: ['Flutter', 'TypeScript'],
    accentColor: '#a855f7',
    rotation: 12,
    screenshots: [
      '/novawixa/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 13.18.13.png',
      '/novawixa/Simulator Screenshot - iPhone 17 Pro - 2026-03-03 at 13.18.25.png',
    ],
  },
  {
    id: 'burgers-flow',
    title: 'Burgers Flow',
    description:
      'Aplikacja do zamawiania jedzenia dla zespołu restauracji w Gdańsku. Menu, koszyk, śledzenie zamówień i płatności online.',
    category: 'Gastronomia / FoodTech',
    tech: ['Flutter', 'TypeScript'],
    accentColor: '#f59e0b',
    rotation: -7,
    screenshots: [
      '/burgers flow/Restaraunt.png',
      '/burgers flow/Choose restaurant.png',
      '/burgers flow/Tracking order_created.png',
    ],
  },
];
