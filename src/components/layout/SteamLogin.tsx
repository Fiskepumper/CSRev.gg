import React from 'react';

const STEAM_LOGIN_URL = 'http://localhost:5000/auth/steam'; // Oppdater til din backend-url

const SteamLogin: React.FC = () => (
  <a
    href={STEAM_LOGIN_URL}
    className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2 flex items-center"
    style={{ textDecoration: 'none' }}
  >
    <img
      src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png"
      alt="Sign in through Steam"
      className="h-6 mr-2"
      style={{ background: 'white', borderRadius: 3 }}
    />
    Steam Login
  </a>
);

export default SteamLogin;