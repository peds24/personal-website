import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Wordmark from './Wordmark';
import about from '../../data/about.json';
import '../../styles/pages.css';

interface Props {
    title: string;
    children: React.ReactNode;
}

/**
 * Chrome for every page except home, which keeps its own single-screen stage.
 * The status bar is the Longbox `LONGBOX · reading.tsx` motif, reused as the
 * site's persistent header.
 */
const PageShell: React.FC<Props> = ({ title, children }) => {
    React.useEffect(() => {
        document.title = `${title} · ${about.name.toLowerCase()}`;
    }, [title]);

    return (
        <div className="page">
            <div className="statusbar">
                <Link className="statusbar-mark" to="/">
                    <Wordmark />
                </Link>
                <span className="statusbar-file">{title}.tsx</span>
            </div>

            <header className="page-head">
                <Navigation />
            </header>

            <main className="page-main">
                <div className="eyebrow page-eyebrow">
                    <span className="path">~/{title}$</span>
                    <span>cat *</span>
                </div>
                <h1 className="page-title">{title}</h1>
                {children}
            </main>

            <footer className="page-foot">
                <span>© {new Date().getFullYear()} {about.name.toLowerCase()}</span>
                <a href={`mailto:${about.email}`}>{about.email}</a>
            </footer>
        </div>
    );
};

export default PageShell;
