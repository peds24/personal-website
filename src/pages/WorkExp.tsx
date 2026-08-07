import React from 'react';
import PageShell from '../components/shared/PageShell';
import experience from '../data/experience.json';

interface Job {
    id: string;
    role: string;
    company: string;
    location: string;
    start: string;
    end: string;
    bullets: string[];
}

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
    <article className="job-card">
        <h3>{job.role.toLowerCase()}</h3>
        <p className="job-meta">
            {job.company.toLowerCase()}, {job.location.toLowerCase()}
        </p>
        <p className="job-dates">{job.start.toLowerCase()} – {job.end.toLowerCase()}</p>
        <ul>
            {job.bullets.map((b, i) => <li key={i}>{b.toLowerCase()}</li>)}
        </ul>
    </article>
);

const WorkExp: React.FC = () => {
    const { software, additional } = experience as { software: Job[]; additional: Job[] };

    return (
        <PageShell title="workExperiences">
            <section>
                {software.map(job => <JobCard key={job.id} job={job} />)}
            </section>

            {additional.length > 0 && (
                <section>
                    <h2 className="section-heading" id="addExp">additionalExperiences</h2>
                    {additional.map(job => <JobCard key={job.id} job={job} />)}
                </section>
            )}
        </PageShell>
    );
};

export default WorkExp;
