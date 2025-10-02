import React, { useEffect, useRef, useState } from 'react';
import Featured from '../../components/Home/Featured';
import HowItWorksSection from '../HowItWorksSection';
import Video from '../Video'; // <-- Legg til denne
import './HomePage.css';

const HomePage: React.FC = () => {
  const [viewBoxY, setViewBoxY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Endre 0.5 for mer/mindre bevegelse
      const y = Math.max(0, window.scrollY * 0.5);
      setViewBoxY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage-bg" style={{ paddingTop: '64px', position: 'relative', minHeight: '100vh' }}>
      <div className="homepage-content">
        {/* <Navbar /> */}
        {/* Resten av innholdet ditt... */}
        <Featured />
        <HowItWorksSection />
        <Video /> {/* <-- Legg til denne */}
      </div>
    </div>
  );
};

export default HomePage;