import LeftSection from './LeftSection';
import RightSection from './RightSection';
import '../../styles/main-page.css';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default Layout;