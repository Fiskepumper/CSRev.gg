import './Navbar.css';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Start med dark mode
  const [steamUser, setSteamUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Sjekk localStorage for saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Default til dark mode
      setIsDarkMode(true);
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  useEffect(() => {
    // Oppdater body og html classes for å påvirke hele siden
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      document.body.style.background = '#000000';
      document.body.style.color = '#ffffff';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      document.body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
      document.body.style.color = '#1e293b';
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    fetch('http://localhost:5000/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSteamUser(data));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target as Node)) {
        setShowHamburgerMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navbarClass = `custom-navbar-bg${isScrolled ? ' scrolled' : ''}`;

  // Ny funksjon for å scrolle til toppen
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={navbarClass}>
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo section - med scroll to top funksjonalitet */}
          <div 
            onClick={scrollToTop} 
            className="navbar-logo-section"
            style={{ cursor: 'pointer' }}
          >
            <img src="/csrevlogo.png" alt="CSRev Logo" className="navbar-logo" />
            <span className="navbar-title">CSRev</span>
          </div>

          {/* Desktop Navigation - til høyre men ikke helt ytterst */}
          <nav className="navbar-nav-desktop">
            {/* FJERNET: <Link to="/faq" className="navbar-link">FAQ</Link> */}
            <button onClick={toggleDarkMode} className="navbar-darkmode-btn">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <ConnectWallet onWalletConnected={(address) => console.log('Wallet connected:', address)} />
            
            {steamUser && steamUser.photos?.[0]?.value ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(v => !v)}
                  className="focus:outline-none"
                  aria-label="Open profile menu"
                >
                  <img
                    src={steamUser.photos[0].value}
                    alt="Steam avatar"
                    className="navbar-avatar"
                    title={steamUser.displayName}
                  />
                </button>
                {showProfileMenu && (
                  <div className="navbar-profile-menu">
                    <Link to="/profile" className="navbar-profile-link">Profile</Link>
                    <Link to="/sell" className="navbar-profile-link">Sell Item(s)</Link>
                    <Link to="/market" className="navbar-profile-link">Market</Link>
                    {/* FJERNET: <Link to="/faq" className="navbar-profile-link">FAQ</Link> */}
                    <Link to="/history" className="navbar-profile-link">History</Link>
                    <a
                      href="#"
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetch("http://localhost:5000/auth/logout", { credentials: "include" });
                        window.location.href = "/";
                      }}
                      className="navbar-profile-link text-red-400"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="http://localhost:5000/auth/steam"
                className="navbar-steam-login"
              >
                Connect Steam
              </a>
            )}

            {/* Hamburger Menu - helt ytterst til høyre */}
            <div className="navbar-hamburger-section" ref={hamburgerMenuRef}>
              <button
                onClick={() => {
                  setShowHamburgerMenu(!showHamburgerMenu);
                }}
                className={`hamburger-menu-btn ${showHamburgerMenu ? 'active' : ''}`}
                aria-label="Open menu"
              >
                <div className="hamburger-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>

              {/* Hamburger Dropdown - med høy blur på bakgrunnen */}
              {showHamburgerMenu && (
                <div className="hamburger-dropdown">
                  <div className="hamburger-section">
                    <h3 className="hamburger-section-title">Navigation</h3>
                    <Link to="/" className="hamburger-link">Hjem</Link>
                    <Link to="/market" className="hamburger-link">Market</Link>
                    <Link to="/sell" className="hamburger-link">Sell Items</Link>
                    <Link to="/history" className="hamburger-link">History</Link>
                  </div>
                  
                  <div className="hamburger-section">
                    <h3 className="hamburger-section-title">Support</h3>
                    <Link to="/faq" className="hamburger-link">FAQ</Link>
                    <Link to="/support" className="hamburger-link">Support</Link>
                    <Link to="/terms" className="hamburger-link">Terms</Link>
                    <Link to="/privacy" className="hamburger-link">Privacy</Link>
                  </div>

                  <div className="hamburger-section">
                    <h3 className="hamburger-section-title">Account</h3>
                    {steamUser ? (
                      <>
                        <Link to="/profile" className="hamburger-link">Profile</Link>
                        <button
                          onClick={async () => {
                            await fetch("http://localhost:5000/auth/logout", { credentials: "include" });
                            window.location.href = "/";
                          }}
                          className="hamburger-link logout-link"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <a
                        href="http://localhost:5000/auth/steam"
                        className="hamburger-link"
                      >
                        Sign in with Steam
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="navbar-nav-mobile">
            <button onClick={toggleDarkMode} className="navbar-darkmode-btn">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="navbar-mobile-btn"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu... */}
    </header>
  );
};

export default Navbar;