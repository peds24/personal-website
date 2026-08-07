import React from 'react';
import PageShell from '../components/shared/PageShell';
import ProjectCard, { type Project } from '../components/projects/ProjectCard';
import projects from '../data/projects.json';

const Projects: React.FC = () => {
    const all = projects as Project[];
    const featured = all.filter(p => p.featured);
    const rest = all.filter(p => !p.featured);

    return (
        <PageShell title="projects">
            <section className="card-grid">
                {featured.map(p => <ProjectCard key={p.id} project={p} />)}
            </section>

            {rest.length > 0 && (
                <section>
                    <h2 className="section-heading">alsoBuilt</h2>
                    <div className="card-grid">
                        {rest.map(p => <ProjectCard key={p.id} project={p} />)}
                    </div>
                </section>
            )}
        </PageShell>
    );
};

export default Projects;
