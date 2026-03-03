'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech: string[];
  accentColor: string;
  rotation: number;
  screenshots: string[];
}

const projects: Project[] = [
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

export default function PhonePortfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(
    null
  );

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveScreenshot(0);
    setSlideDirection(null);
  };

  const goToScreenshot = useCallback(
    (index: number) => {
      if (!selectedProject) return;
      const dir = index > activeScreenshot ? 'left' : 'right';
      setSlideDirection(dir);
      setTimeout(() => {
        setActiveScreenshot(index);
        setSlideDirection(null);
      }, 200);
    },
    [activeScreenshot, selectedProject]
  );

  const goPrev = useCallback(() => {
    if (!selectedProject) return;
    const prev =
      activeScreenshot === 0
        ? selectedProject.screenshots.length - 1
        : activeScreenshot - 1;
    goToScreenshot(prev);
  }, [activeScreenshot, selectedProject, goToScreenshot]);

  const goNext = useCallback(() => {
    if (!selectedProject) return;
    const next =
      activeScreenshot === selectedProject.screenshots.length - 1
        ? 0
        : activeScreenshot + 1;
    goToScreenshot(next);
  }, [activeScreenshot, selectedProject, goToScreenshot]);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedProject, goPrev, goNext]);

  return (
    <>
      <section className="phone-portfolio-section">
        <div className="phones-container">
          {projects.map((project, index) => (
            <button
              key={project.id}
              className={`phone-ragdoll ${index % 2 === 0 ? 'phone-up' : 'phone-down'}`}
              style={
                {
                  '--rotation': `${project.rotation}deg`,
                  '--accent': project.accentColor,
                } as React.CSSProperties
              }
              onClick={() => openProject(project)}
              aria-label={`Zobacz projekt: ${project.title}`}
            >
              <div className="phone-label-tag">{project.title}</div>
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <Image
                    src={project.screenshots[0]}
                    alt={project.title}
                    fill
                    sizes="110px"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="phone-home-bar" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="project-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Zamknij"
            >
              ✕
            </button>
            <div className="project-modal-content">
              <div className="project-modal-phone">
                {/* Phone with carousel */}
                <div className="phone-carousel-wrapper">
                  {selectedProject.screenshots.length > 1 && (
                    <button
                      className="carousel-arrow carousel-arrow-left"
                      onClick={goPrev}
                      aria-label="Poprzedni ekran"
                    >
                      ‹
                    </button>
                  )}
                  <div className="phone-frame large">
                    <div className="phone-notch" />
                    <div
                      className={`phone-screen ${slideDirection === 'left' ? 'slide-out-left' : ''} ${slideDirection === 'right' ? 'slide-out-right' : ''}`}
                    >
                      <Image
                        src={selectedProject.screenshots[activeScreenshot]}
                        alt={`${selectedProject.title} - ekran ${activeScreenshot + 1}`}
                        fill
                        sizes="220px"
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                    <div className="phone-home-bar" />
                  </div>
                  {selectedProject.screenshots.length > 1 && (
                    <button
                      className="carousel-arrow carousel-arrow-right"
                      onClick={goNext}
                      aria-label="Następny ekran"
                    >
                      ›
                    </button>
                  )}
                </div>
                {/* Dot indicators */}
                {selectedProject.screenshots.length > 1 && (
                  <div className="carousel-dots">
                    {selectedProject.screenshots.map((_, i) => (
                      <button
                        key={i}
                        className={`carousel-dot ${i === activeScreenshot ? 'active' : ''}`}
                        onClick={() => goToScreenshot(i)}
                        aria-label={`Ekran ${i + 1}`}
                        style={
                          i === activeScreenshot
                            ? ({
                                '--dot-color': selectedProject.accentColor,
                              } as React.CSSProperties)
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
                {/* Counter */}
                <div className="carousel-counter">
                  {activeScreenshot + 1} / {selectedProject.screenshots.length}
                </div>
              </div>
              <div className="project-modal-info">
                <span
                  className="project-category"
                  style={{ color: selectedProject.accentColor }}
                >
                  {selectedProject.category}
                </span>
                <h3 className="project-title">{selectedProject.title}</h3>
                <p className="project-description">
                  {selectedProject.description}
                </p>
                <div className="project-tech">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="project-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
