import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'C:\Users\krist\Pictures\PhotoShop\NFT\Server\CSLeaseLOGO.png'; // Oppdater banen hvis nødvendig

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} alt="CSLease Logo" className="h-10 w-auto" />
      <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
        CSLease
      </span>
    </Link>
  );
};

export default Logo;