import React from 'react';
import Navigation from './Navigation';
import ThemeSwitcher from '../main-page/ThemeSwitcher';
import about from '../../data/about.json';
import '../../styles/pages.css';

interface Props {
    title: string;
    children: React.ReactNode;
}

/**
 * Chrome for every page except home, which keeps its own two-column layout.
 */
const PageShell: React.FC<Props> = ({ title, children }) => {
    React.useEffect(() => {
        document.title = `${title} · ${about.name.toLowerCase()}`;
    }, [title]);

    return (
        <div className="page">
            <header>
                <Navigation />
                <ThemeSwitcher />
            </header>
            <main>
                <h1>{title}</h1>
                {children}
            </main>
            <footer>
                <p>© {new Date().getFullYear()} {about.name.toLowerCase()}</p>
            </footer>
        </div>
    );
};

export default PageShell;
