import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/shared/PageShell';

const NotFound: React.FC = () => (
    <PageShell title="404">
        <p>that page doesn't exist.</p>
        <Link className="link" to="/">back home</Link>
    </PageShell>
);

export default NotFound;
