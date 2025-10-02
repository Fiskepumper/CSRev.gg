import React, { useRef, useEffect } from 'react';
import './HowItWorks.css';

const HowItWorks: React.FC = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const left = document.querySelector('.karambit-left') as HTMLElement;
      const right = document.querySelector('.karambit-right') as HTMLElement;
      if (left) left.style.transform = `rotate(${scrollY}deg)`;
      if (right) right.style.transform = `rotate(-${scrollY}deg)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="homepage-bg howitworks-bg">
      <div className="glow-bg">
        <svg
          width="700"
          height="700"
          viewBox="0 0 700 700"
          className="glow-svg"
          style={{ position: 'absolute', top: '-200px', left: '-200px', zIndex: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0b0a3c" stopOpacity="1" />
              <stop offset="60%" stopColor="#050558" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0b0a3c" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <ellipse
            cx="20"
            cy="3"
            rx="777"
            ry="777"
            fill="url(#glowGradient)"
          />
        </svg>
      </div>

      <button
        className="scroll-down-btn"
        onClick={() => {
          howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="arrow">&#8595;</span> How It Works
      </button>

      <img src="/csrevexplained.png" alt="CSRev Explained" className="explained" />

      <div
        className="comingsoon-howitworks-markdown"
        ref={howItWorksRef}
      >
        <h1>How It Works – CSRev</h1>

        <h2>Log in with Steam</h2>
        <p>Connect your account – we automatically fetch your inventory.</p>

        <br />

        <h2>Buy or sell skins</h2>
        <p>Sellers can list skins at their own price or instasell for instant payout. Buyers simply browse and click "Buy Now" to purchase.</p>

        <br />

        <h2>Payment and trade happen simultaneously</h2>
        <p>Buyers pay using their preferred crypto wallet – we recommend stablecoins via the Polygon network. Once the skin is sent and accepted on Steam, sellers get paid instantly if they're loyal.</p>
        <p>See our FAQ for details.</p>
      </div>
    </div>
  );
};

export default HowItWorks;