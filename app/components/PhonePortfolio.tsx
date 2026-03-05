'use client';

import { PROJECTS } from '@/app/constants';
import { useProjectModal } from '@/app/hooks';
import { PhoneCard, ProjectModal } from './portfolio';

export default function PhonePortfolio() {
  const { selectedProject, openProject, closeProject } = useProjectModal();

  return (
    <>
      <section className="phone-portfolio-section">
        <div className="phones-container">
          {PROJECTS.map((project, index) => (
            <PhoneCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => openProject(project)}
            />
          ))}
        </div>
      </section>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProject} />
      )}
    </>
  );
}
