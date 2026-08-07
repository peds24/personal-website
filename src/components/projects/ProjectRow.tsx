import React, { useId, useState } from 'react';

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
    imagePortrait?: boolean;
}

// Coursework that can't be published is stored with this sentinel rather than a URL.
const isPrivate = (link: string) => !link || link === 'private';

/**
 * The hybrid: a bare listing row by default, expanding in place to show the
 * screenshot and the full description. Rows keep the page dense and scannable;
 * the screenshots stay one click away instead of being lost.
 *
 * Click-to-expand rather than hover, so it works the same on touch.
 */
const ProjectRow: React.FC<{ project: Project }> = ({ project }) => {
    const [open, setOpen] = useState(false);
    const panelId = useId();
    const { title, role, languages, link, description, imageLarge, imagePortrait } = project;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    return (
        <article className={`proj-row${open ? ' is-open' : ''}`}>
            <button
                type="button"
                className="proj-head"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen(o => !o)}
            >
                <span className="proj-marker" aria-hidden="true">{open ? '-' : '+'}</span>
                <span className="proj-title">{title}</span>
                <span className="proj-stack">{languages}</span>
            </button>

            <div id={panelId} className="proj-panel" hidden={!open}>
                {imageLarge && (
                    <img
                        className={`proj-shot${imagePortrait ? ' is-portrait' : ''}`}
                        src={`${base}${imageLarge}`}
                        alt={`Screenshot of ${title}`}
                        loading="lazy"
                    />
                )}
                <div className="proj-detail">
                    <p className="proj-role">{role}</p>
                    <p className="proj-desc">{description}</p>
                    {isPrivate(link) ? (
                        <p className="proj-private">source not public</p>
                    ) : (
                        <a className="proj-go" href={link} target="_blank" rel="noreferrer">
                            view source →
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProjectRow;
