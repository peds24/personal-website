import React from 'react';
import Navigation from '../shared/Navigation';
import AsciiArt from './AsciiArt';
import ThemeSwitcher from './ThemeSwitcher';
// import Footer from '../common/Footer';
import '../../styles/main-page.css';


const RightSection: React.FC = () => {
  return (
    <div className="right">
      <Navigation />
      <AsciiArt />
      <ThemeSwitcher />
    </div>
  );
};

export default RightSection;