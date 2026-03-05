'use client';

import { useCarousel, useKeyboardNavigation } from '@/app/hooks';
import type { Project } from '@/app/types';
import Image from 'next/image';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { activeIndex, slideDirection, goToSlide, goNext, goPrev } =
    useCarousel(project.screenshots.length);

  useKeyboardNavigation(true, {
    onLeft: goPrev,
    onRight: goNext,
    onEscape: onClose,
  });

  const hasMultipleScreenshots = project.screenshots.length > 1;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Zamknij"
        >
          ✕
        </button>

        <div className="project-modal-content">
          <div className="project-modal-phone">
            <div className="phone-carousel-wrapper">
              {hasMultipleScreenshots && (
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
                  className={`phone-screen ${
                    slideDirection === 'left' ? 'slide-out-left' : ''
                  } ${slideDirection === 'right' ? 'slide-out-right' : ''}`}
                >
                  <Image
                    src={project.screenshots[activeIndex]}
                    alt={`${project.title} - ekran ${activeIndex + 1}`}
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div className="phone-home-bar" />
              </div>

              {hasMultipleScreenshots && (
                <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={goNext}
                  aria-label="Następny ekran"
                >
                  ›
                </button>
              )}
            </div>

            {hasMultipleScreenshots && (
              <CarouselDots
                total={project.screenshots.length}
                activeIndex={activeIndex}
                accentColor={project.accentColor}
                onDotClick={goToSlide}
              />
            )}

            <div className="carousel-counter">
              {activeIndex + 1} / {project.screenshots.length}
            </div>
          </div>

          <ProjectInfo project={project} />
        </div>
      </div>
    </div>
  );
}

interface CarouselDotsProps {
  total: number;
  activeIndex: number;
  accentColor: string;
  onDotClick: (index: number) => void;
}

function CarouselDots({
  total,
  activeIndex,
  accentColor,
  onDotClick,
}: CarouselDotsProps) {
  return (
    <div className="carousel-dots">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
          onClick={() => onDotClick(i)}
          aria-label={`Ekran ${i + 1}`}
          style={
            i === activeIndex
              ? ({ '--dot-color': accentColor } as React.CSSProperties)
              : undefined
          }
        />
      ))}
    </div>
  );
}

interface ProjectInfoProps {
  project: Project;
}

function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className="project-modal-info">
      <span className="project-category" style={{ color: project.accentColor }}>
        {project.category}
      </span>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tech">
        {project.tech.map((t) => (
          <span key={t} className="project-tech-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
