import React from 'react';
import PageShell from '../components/shared/PageShell';
import ProjectRow, { type Project } from '../components/projects/ProjectRow';
import projects from '../data/projects.json';

const Projects: React.FC = () => {
    const all = projects as Project[];
    const featured = all.filter(p => p.featured);
    const rest = all.filter(p => !p.featured);

    return (
        <PageShell title="projects">
            <div className="proj-list">
                {featured.map(p => <ProjectRow key={p.id} project={p} />)}
            </div>

            {rest.length > 0 && (
                <>
                    <h2 className="section-heading">alsoBuilt</h2>
                    <div className="proj-list">
                        {rest.map(p => <ProjectRow key={p.id} project={p} />)}
                    </div>
                </>
            )}
        </PageShell>
    );
};

export default Projects;
