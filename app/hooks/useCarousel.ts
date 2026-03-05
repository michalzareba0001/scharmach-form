'use client';

import type { Project } from '@/app/types';
import { useCallback, useEffect, useState } from 'react';

type SlideDirection = 'left' | 'right' | null;

interface UseCarouselReturn {
  activeIndex: number;
  slideDirection: SlideDirection;
  goToSlide: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

export function useCarousel(totalSlides: number): UseCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<SlideDirection>(null);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;

      const direction = index > activeIndex ? 'left' : 'right';
      setSlideDirection(direction);

      setTimeout(() => {
        setActiveIndex(index);
        setSlideDirection(null);
      }, 200);
    },
    [activeIndex]
  );

  const goNext = useCallback(() => {
    const next = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;
    goToSlide(next);
  }, [activeIndex, totalSlides, goToSlide]);

  const goPrev = useCallback(() => {
    const prev = activeIndex === 0 ? totalSlides - 1 : activeIndex - 1;
    goToSlide(prev);
  }, [activeIndex, totalSlides, goToSlide]);

  return {
    activeIndex,
    slideDirection,
    goToSlide,
    goNext,
    goPrev,
  };
}

interface UseProjectModalReturn {
  selectedProject: Project | null;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

export function useProjectModal(): UseProjectModalReturn {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return {
    selectedProject,
    openProject,
    closeProject,
  };
}

export function useKeyboardNavigation(
  enabled: boolean,
  handlers: {
    onLeft?: () => void;
    onRight?: () => void;
    onEscape?: () => void;
  }
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          handlers.onLeft?.();
          break;
        case 'ArrowRight':
          handlers.onRight?.();
          break;
        case 'Escape':
          handlers.onEscape?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [enabled, handlers]);
}
