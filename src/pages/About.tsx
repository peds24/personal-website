import React from 'react';
import PageShell from '../components/shared/PageShell';
import AsciiArt from '../components/main-page/AsciiArt';
import about from '../data/about.json';

const About: React.FC = () => {
    const { about: bio, quote, digitalArchives, links } = about;

    return (
        <PageShell title="about">
            <div className="about-hero">
                <div className="prose about-intro">
                    {/* Bio paragraph carries inline <strong> emphasis from profile.json. */}
                    {bio.map((para, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                    ))}
                </div>

                <div className="portrait">
                    <AsciiArt />
                </div>
            </div>

            <blockquote className="quote">
                <p>{quote.text}</p>
                <cite>{quote.author}, <i>{quote.source}</i></cite>
            </blockquote>

            <h2 className="section-heading">digitalArchives</h2>
            <div className="prose">
                <p>{digitalArchives}</p>
            </div>
            <ul className="contact-list">
                <li><a href={links.linktree} target="_blank" rel="noreferrer">the archives</a></li>
                <li><a href={links.spotify} target="_blank" rel="noreferrer">spotify</a></li>
            </ul>
        </PageShell>
    );
};

export default About;
