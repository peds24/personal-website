import React from 'react';
import '../../styles/global.css';

const Navigation: React.FC = () => {
  return (
    <nav className='nav-bar'>
        <a href="/">home</a>
        <a href="/work-exp">work-exp</a>
        <a href="/projects">projects</a>
        <a href="/contact-me">contact-me</a>
    </nav>
  );
};

export default Navigation;