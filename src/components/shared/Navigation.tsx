import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/global.css';

const LINKS = [
  { to: '/', label: 'home' },
  { to: '/about', label: 'about' },
  { to: '/work-exp', label: 'work' },
  { to: '/projects', label: 'projects' },
  { to: '/contact-me', label: 'contact' },
];

const Navigation: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <nav className={`nav-bar ${className}`}>
      {LINKS.map(({ to, label }) => (
        // `end` on "/" so home isn't marked active on every route.
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
