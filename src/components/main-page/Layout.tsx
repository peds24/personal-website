import React from 'react';
import Navigation from '../shared/Navigation';
import AsciiTorus from './AsciiTorus';
import Wordmark from '../shared/Wordmark';
import about from '../../data/about.json';
import '../../styles/main-page.css';

/**
 * Home is deliberately one screen and one idea: the torus, the name, a line, the
 * way in. Everything else lives on its own page.
 */
const Layout: React.FC = () => {
    React.useEffect(() => {
        document.title = about.name.toLowerCase();
    }, []);

    return (
        <div className="home">
            <main className="home-stage">
                <AsciiTorus cols={74} rows={30} />

                <h1 className="home-name">
                    <Wordmark />
                </h1>

                <p className="home-line">{about.tagline}</p>

                <Navigation className="home-nav" />
            </main>

            <footer className="home-foot">
                <span>© {new Date().getFullYear()} {about.name.toLowerCase()}</span>
                <span aria-hidden="true">·</span>
                <a href={`mailto:${about.email}`}>{about.email}</a>
            </footer>
        </div>
    );
};

export default Layout;
