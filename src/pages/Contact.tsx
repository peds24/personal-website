import React from 'react';
import PageShell from '../components/shared/PageShell';
import about from '../data/about.json';

const Contact: React.FC = () => {
    const { email, links } = about;
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');

    return (
        <PageShell title="contactMe">
            <p>the fastest way to reach me is email. i read everything.</p>

            <ul className="contact-list">
                <li><a className="link" href={`mailto:${email}`}>{email}</a></li>
                <li><a className="link" href={links.linkedin} target="_blank" rel="noreferrer">linkedin</a></li>
                <li><a className="link" href={links.github} target="_blank" rel="noreferrer">github</a></li>
                <li><a className="link" href={links.digitalArchives} target="_blank" rel="noreferrer">digital archives</a></li>
                <li><a className="link" href={`${base}/assets/pedro-serdio-hank-CV.pdf`}>my-resume.pdf</a></li>
            </ul>
        </PageShell>
    );
};

export default Contact;
