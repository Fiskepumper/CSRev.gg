import React, { useEffect, useState } from "react";

const MarketPage: React.FC = () => {
  const [marketItems, setMarketItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [steamUser, setSteamUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  //#region Steam Authentication Logic
  // Sjekk om bruker er logget inn med Steam
  useEffect(() => {
    fetch('http://localhost:5000/auth/user', { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Not authenticated');
      })
      .then(data => {
        setSteamUser(data);
        setCheckingAuth(false);
      })
      .catch(() => {
        setSteamUser(null);
        setCheckingAuth(false);
      });
  }, []);

  // Legg til body class for navbar glow effect
  useEffect(() => {
    if (!steamUser && !checkingAuth) {
      document.body.classList.add('market-needs-steam');
    } else {
      document.body.classList.remove('market-needs-steam');
    }

    return () => {
      document.body.classList.remove('market-needs-steam');
    };
  }, [steamUser, checkingAuth]);
  //#endregion

  //#region Market Data Loading
  useEffect(() => {
    if (steamUser) {
      fetch("http://localhost:5000/market", { credentials: "include" })
        .then(res => res.json())
        .then(data => setMarketItems(data))
        .catch(err => console.error('Failed to fetch market items:', err))
        .finally(() => setLoading(false));
    } else if (!checkingAuth) {
      setLoading(false);
    }
  }, [steamUser, checkingAuth]);
  //#endregion

  //#region Loading State
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  //#endregion

  //#region Steam Login Required View
  if (!steamUser) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Market</h1>
            
            <div className="max-w-md mx-auto">
              <p className="text-orange-400 font-semibold text-xl mb-3">
                Connect til Steam for tilgang
              </p>
              <p className="text-gray-400 text-lg mb-8">
                Se markedet, kjøp/selg skins og mer
              </p>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <p className="text-sm text-gray-500 mb-4">
                  For å handle CS2 skins må du:
                </p>
                <ul className="text-left text-sm text-gray-400 space-y-2">
                  <li>• Koble til Steam-kontoen din</li>
                  <li>• Se alle tilgjengelige skins</li>
                  <li>• Kjøpe og selge trygt</li>
                  <li>• Se handelshistorikk</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  //#endregion

  //#region Market Data Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Market</h1>
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Laster markedsplassen...</p>
          </div>
        </div>
      </div>
    );
  }
  //#endregion

  //#region Authenticated Market View
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-2 py-8 max-w-[1800px]">
        {/* Header med velkomsthilsen */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Market</h1>
            {steamUser && (
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Velkommen,</span>
                <div className="flex items-center gap-2">
                  {steamUser.photos?.[0]?.value && (
                    <img 
                      src={steamUser.photos[0].value} 
                      alt="Steam Avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-blue-400 font-semibold">
                    {steamUser.displayName}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Market items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {marketItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-900 rounded-lg p-8 max-w-md mx-auto">
                <p className="text-gray-400 text-lg mb-2">Ingen items til salgs</p>
                <p className="text-gray-600 text-sm">Kom tilbake senere!</p>
              </div>
            </div>
          ) : (
            marketItems.map(item => (
              <div key={item.assetid} className="bg-gray-900 hover:bg-gray-800 rounded-lg p-4 flex flex-col items-center transition-colors border border-gray-700 hover:border-blue-500">
                <img
                  src={item.icon_url ? `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}` : ""}
                  alt={item.market_hash_name}
                  className="w-20 h-20 object-contain rounded mb-2"
                />
                <div className="font-bold text-center text-sm text-white mb-1">
                  {item.market_hash_name}
                </div>
                <div className="text-green-400 font-semibold">
                  {item.price} NOK
                </div>
                <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition-colors">
                  Kjøp
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
  //#endregion
};

export default MarketPage;