import React from 'react';

export interface Project {
    id: string;
    title: string;
    role: string;
    languages: string;
    link: string;
    featured: boolean;
    description: string;
    imageLarge: string;
    imageSmall: string;
    /** Phone screenshots are tall; cropping them to a landscape box shows a useless sliver. */
    imagePortrait?: boolean;
}

// Coursework that can't be published is stored with this sentinel rather than a URL.
const isPrivate = (link: string) => !link || link === 'private';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const { title, role, languages, link, description, imageLarge, imagePortrait } = project;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    return (
        <article className="project-card">
            {imageLarge && (
                <img
                    className={`project-image${imagePortrait ? ' project-image--portrait' : ''}`}
                    src={`${base}${imageLarge}`}
                    alt={`Screenshot of ${title}`}
                    loading="lazy"
                />
            )}
            <div className="project-body">
                <h2>{title}</h2>
                <p className="project-meta">
                    {role}{languages && ` · ${languages}`}
                </p>
                <p>{description}</p>
                {isPrivate(link) ? (
                    <p className="project-private">source not public</p>
                ) : (
                    <a className="link" href={link} target="_blank" rel="noreferrer">
                        view source
                    </a>
                )}
            </div>
        </article>
    );
};

export default ProjectCard;
