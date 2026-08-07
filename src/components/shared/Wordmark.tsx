import React from 'react';
import about from '../../data/about.json';

/**
 * The one place the rounded face appears. The dot is the accent — the poster's
 * soft-against-rigid tension, reduced to a single character.
 *
 * Text comes from profile.basics.wordmark rather than being split off the full
 * name, which produced "pedro.serdiohank".
 */
const Wordmark: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [head, ...tail] = about.wordmark.split('.');
    return (
        <span className={`wordmark ${className}`}>
            {head}
            {tail.map((part, i) => (
                <React.Fragment key={i}>
                    <span className="dot">.</span>{part}
                </React.Fragment>
            ))}
        </span>
    );
};

export default Wordmark;
