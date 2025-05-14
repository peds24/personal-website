import React from 'react';
import '../../styles/main-page.css';

const LeftSection: React.FC = () => {
    return (
        <div className='left'>
            <h1>pedro serdio hank</h1>
            <h2>aboutMe</h2>
            <p>I'm a <strong>dedicated</strong> and efficient individual with a strong work ethic, committed to achieving goals through persistent effort.</p>
            <p>I'm a <strong>passionate</strong> learner who actively engages with educational content, particularly through insightful video essays on YouTube, and has an insatiable curiosity that extends to exploring diverse books.</p>
            <p>I'm <strong>keenly interested</strong> in all facets of technology, staying abreast of the latest advancements and emerging trends in the tech world.</p>
            <p id="quote">
                <i>"Nothing, to my way of thinking, is a better proof of a well ordered mind than a man's ability to stop just where he is and pass some time in his own company."</i>
                <br />
                <b>Lucius Annaeus Seneca</b>, <cite>Letters from a Stoic</cite>
            </p>
            <h2>digitalArchives</h2>
            <p>I meticulously curate my music collection through a deliberate process: discovering exactly 30 songs at a time before organizing them into carefully crafted playlists. These collections serve as my personal digital archives, housing both my most frequently played tracks and thoughtfully curated selections.</p>
            <a className="link" href="https://linktr.ee/peds24">link to my digital archives</a> <br />
            <a className="link" href="https://open.spotify.com/user/serdioped1?si=6ee94dec890e4a15">spotify profile</a> <br />
            <h2>myLinks</h2>
            <a className="link" href="mailto:serdiopedro@gmail.com">serdiopedro@gmail.com</a> <br />
            <a className="link" href="/assets/pedro-serdio-hank-CV.pdf">my-resume.pdf</a> <br />
            <a className="link" href="https://www.linkedin.com/in/psh2323/">linkedin.com</a> <br />
            <a className="link" href="https://github.com/peds24">github.com</a> <br />
        </div>
    );
};

export default LeftSection;