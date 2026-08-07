import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/global.css';

const LINKS = [
  { to: '/', label: 'home' },
  { to: '/work-exp', label: 'work-exp' },
  { to: '/projects', label: 'projects' },
  { to: '/contact-me', label: 'contact-me' },
];

const Navigation: React.FC = () => {
  return (
    <nav className='nav-bar'>
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
