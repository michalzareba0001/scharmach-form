'use client';

import type { Project } from '@/app/types';
import Image from 'next/image';

interface PhoneCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export function PhoneCard({ project, index, onClick }: PhoneCardProps) {
  return (
    <button
      className={`phone-ragdoll ${index % 2 === 0 ? 'phone-up' : 'phone-down'}`}
      style={
        {
          '--rotation': `${project.rotation}deg`,
          '--accent': project.accentColor,
        } as React.CSSProperties
      }
      onClick={onClick}
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
  );
}
