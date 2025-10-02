import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    ethereum?: any;
  }
}

// Helper: pick the right injected provider (MetaMask or Trust)
const getInjectedProvider = (target: 'MetaMask' | 'TrustWallet') => {
  const eth = window.ethereum as any;
  if (!eth) return null;

  const providers: any[] = Array.isArray(eth.providers) ? eth.providers : [eth];

  const isTarget = (p: any) =>
    target === 'MetaMask'
      ? !!p?.isMetaMask
      : !!(p?.isTrust || p?.isTrustWallet || p?.isTrustWalletProvider);

  return providers.find(isTarget) || (isTarget(eth) ? eth : null);
};

interface ConnectWalletProps {
  onWalletConnected: (address: string) => void;
}

const WALLET_OPTIONS = [
  {
    name: 'MetaMask',
    logo: '/MetaMaskLogo.png',
  },
  {
    name: 'TrustWallet',
    logo: '/TrustLogo.png',
  },
];

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showWalletSelect, setShowWalletSelect] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const connectWith = async (provider: any, target: 'MetaMask' | 'TrustWallet') => {
    if (!provider) {
      const url =
        target === 'MetaMask'
          ? 'https://metamask.io/download/'
          : 'https://trustwallet.com/download';
      window.open(url, '_blank');
      return;
    }
    try {
      setIsConnecting(true);
      setShowWalletSelect(false); // Lukk wallet-select boksen
      const accounts: string[] = await provider.request({ method: 'eth_requestAccounts' });
      const addr = accounts?.[0];
      if (addr) {
        setWalletAddress(addr);
        onWalletConnected(addr);
      }
    } catch (e) {
      console.error(`Error connecting ${target}:`, e);
    } finally {
      setIsConnecting(false);
    }
  };

  const connectMetaMask = async () => {
    const provider = getInjectedProvider('MetaMask');
    await connectWith(provider, 'MetaMask');
  };

  const connectTrustWallet = async () => {
    const provider = getInjectedProvider('TrustWallet');
    await connectWith(provider, 'TrustWallet');
  };

  const handleConnectClick = () => {
    setShowWalletSelect(!showWalletSelect); // Toggle i stedet for bare true
  };

  const handleWalletSelect = (wallet: string) => {
    setSelectedWallet(wallet);
    if (wallet === 'MetaMask') connectMetaMask();
    if (wallet === 'TrustWallet') connectTrustWallet();
  };

  const handleProfileClick = () => {
    if (walletAddress) {
      navigate(`/${walletAddress}`);
    }
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    setWalletAddress(null);
    setShowUserMenu(false);
    setShowWalletSelect(false);
    console.log('Wallet disconnected');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Lukk menyer når man klikker utenfor
  const handleOutsideClick = () => {
    setShowUserMenu(false);
    setShowWalletSelect(false);
  };

  return (
    <div className="connect-wallet-container">
      {walletAddress ? (
        <div className="wallet-connected-section">
          <div 
            className="navbar-wallet-connected"
            onClick={toggleUserMenu}
          >
            <span>🟢</span>
            <span className="navbar-wallet-address">
              {formatAddress(walletAddress)}
            </span>
            <span style={{ marginLeft: '0.5rem' }}>▼</span>
          </div>
          
          {/* User dropdown menu */}
          {showUserMenu && (
            <div className="wallet-user-menu">
              <button 
                onClick={handleProfileClick}
                className="wallet-menu-item"
              >
                👤 Profil
              </button>
              <button 
                onClick={handleLogout}
                className="wallet-menu-item logout"
              >
                🚪 Logg ut
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="connect-wallet-section">
          {/* Connect Wallet knapp */}
          <button
            className="connect-wallet-btn"
            onClick={handleConnectClick}
            disabled={isConnecting}
          >
            {isConnecting ? 'Kobler til...' : 'Connect Wallet'}
          </button>

          {/* Wallet selection dropdown - UTEN "Avbryt" knapp */}
          {showWalletSelect && (
            <div className="wallet-select-dropdown">
              <div className="wallet-select-title">Velg lommebok</div>
              <div className="wallet-select-options">
                {WALLET_OPTIONS.map(option => (
                  <button
                    key={option.name}
                    className="wallet-option-btn"
                    onClick={() => handleWalletSelect(option.name)}
                  >
                    <img
                      src={option.logo}
                      alt={option.name + ' logo'}
                      className="wallet-option-logo"
                    />
                    {option.name}
                  </button>
                ))}
              </div>
              {/* FJERNET: Avbryt-knappen */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;