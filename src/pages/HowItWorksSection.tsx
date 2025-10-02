import React, { useEffect, useRef } from 'react';
import { Wallet, Users, Zap, ArrowRight, Shield, Clock } from 'lucide-react';
import './HowItWorksSection.css';

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null); // Ny ref for scroll target

  const scrollToHowItWorks = () => {
    scrollTargetRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    // Karambit scroll/rotate
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = (scrollY % 1000) / 1000 * 360;
      const left = document.querySelector('.karambit-left') as HTMLElement | null;
      const right = document.querySelector('.karambit-right') as HTMLElement | null;
      if (left) left.style.transform = `translateY(${scrollY * 0.15}px) rotate(-${rotation}deg)`;
      if (right) right.style.transform = `translateY(${scrollY * 0.15}px) rotate(${rotation}deg)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Slide-in effect for steps
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px' // Trigger litt før elementet er helt synlig
      }
    );

    // Vent litt før vi starter observing for at DOM skal være klar
    const timer = setTimeout(() => {
      const elements = sectionRef.current?.querySelectorAll('.slide-step');
      console.log('Found elements:', elements?.length); // Debug
      elements?.forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="comingsoon-center" ref={sectionRef}>
      <div className="logo-row">
        <img src="/karambit_left.png" alt="Karambit Left" className="karambit karambit-left" />
        <img src="/csrevlogo.png" alt="CSRev Logo" className="comingsoon-logo-large" />
        <img src="/karambit_right.png" alt="Karambit Right" className="karambit karambit-right" />
      </div>

      <div className="scroll-down-btn" onClick={scrollToHowItWorks}>
        <span className="arrow">&#8595;</span> How It Works
      </div>

      <img 
        src="/csrevexplained.png" 
        alt="CSRev Explained" 
        className="explained" 
      />

      {/* Ny usynlig div som scroll target mellom PNG og første step */}
      <div ref={scrollTargetRef} className="scroll-target"></div>

      <div className="howitworks-container">
        {/* Step 1 - Connect */}
        <div className="howitworks-step slide-step">
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">
                <Users className="title-icon" />
                Connect Your Accounts
              </h2>
              <div className="step-features">
                <div className="feature-item">
                  <div className="feature-text">

                    <strong>Connect Steam</strong>
                    <span>Connect Steam to access the market and more</span>
                  </div>
                </div>
                
                <div className="feature-item">

                  <div className="feature-text">
                    <strong>Connect Wallet</strong>
                    <span>Connect MetaMask or Trust Wallet for payments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Step 2 - Trade */}
        <div className="howitworks-step slide-step">
          <div className="step-number">
            
          </div>
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">
                <Zap className="title-icon" />
                Buy or Sell Skins
              </h2>
              <div className="step-grid">
                <div className="grid-item seller">
                  <div className="grid-header">
                    <span className="role-badge seller-badge">Sellers</span>
                  </div>
                  <ul className="role-list">
                    <li>Select CS2 skin from inventory</li>
                    <li>Set your price, instasell or lend out</li>
                    <li>Publish listing instantly</li>
                  </ul>
                </div>
                <div className="grid-item buyer">
                  <div className="grid-header">
                    <span className="role-badge buyer-badge">Buyers</span>
                  </div>
                  <ul className="role-list">
                    <li>Browse verified listings</li>
                    <li>View real-time prices</li>
                    <li>Click "Buy Now" to purchase</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Step 3 - Payment */}
        <div className="howitworks-step slide-step">
          <div className="step-number">
            
          </div>
          <div className="step-content">
            <div className="step-text">
              <h2 className="step-title">
                <Shield className="title-icon" />
                Instant Payment & Trade
              </h2>
              <div className="instant-features">
                <div className="instant-item">
                  <Wallet className="instant-feature-icon" />
                  <div className="instant-text">
                    <strong>Secure Payment</strong>
                    <span>Pay with MetaMask or Trust Wallet using stablecoins on Polygon</span>
                  </div>
                </div>
                <div className="instant-item">
                  <Shield className="instant-feature-icon" />
                  <div className="instant-text">
                    <strong>Simultaneous Trade</strong>
                    <span>Steam offer sent automatically when payment is confirmed</span>
                  </div>
                </div>
                <div className="instant-item">
                  <Clock className="instant-feature-icon" />
                  <div className="instant-text">
                    <strong>Instant Payout</strong>
                    <span>Loyal sellers receive payment INSTANTLY upon trade acceptance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section slide-step">
          <h3 className="benefits-title">Why Choose CSRev?</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <Zap className="benefit-icon" />
              <div className="benefit-text">
                <strong>Instant Transactions</strong>
                <span>No waiting periods - get paid instantly when trades are accepted</span>
              </div>
            </div>
            <div className="benefit-card">
              <Shield className="benefit-icon" />
              <div className="benefit-text">
                <strong>Secure & Safe</strong>
                <span>Blockchain security with Steam integration and smart contract protection</span>
              </div>
            </div>
            <div className="benefit-card">
              <Wallet className="benefit-icon" />
              <div className="benefit-text">
                <strong>Low Fees</strong>
                <span>Competitive rates with transparent pricing and no hidden costs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;