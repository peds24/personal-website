import React from 'react';
import about from '../../data/about.json';
import '../../styles/main-page.css';

const LeftSection: React.FC = () => {
    const { name, about: bio, quote, digitalArchives, links, email } = about;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    return (
        <div className='left'>
            <h1>{name.toLowerCase()}</h1>

            <h2>aboutMe</h2>
            {/* Bio paragraphs carry inline <strong> emphasis from profile.json. */}
            {bio.map((para, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}

            <p id="quote">
                <i>"{quote.text}"</i>
                <br />
                <b>{quote.author}</b>, <cite>{quote.source}</cite>
            </p>

            <h2>digitalArchives</h2>
            <p>{digitalArchives}</p>
            <a className="link" href={links.linktree}>link to my digital archives</a> <br />
            <a className="link" href={links.spotify}>spotify profile</a> <br />

            <h2>myLinks</h2>
            <a className="link" href={`mailto:${email}`}>{email}</a> <br />
            <a className="link" href={`${base}/assets/pedro-serdio-hank-CV.pdf`}>my-resume.pdf</a> <br />
            <a className="link" href={links.linkedin}>linkedin.com</a> <br />
            <a className="link" href={links.github}>github.com</a> <br />
        </div>
    );
};

export default LeftSection;
