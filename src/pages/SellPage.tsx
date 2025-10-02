import './SellPage.css';
import React, { useState, useEffect } from 'react';

const SellPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [inventory, setInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<{ [assetid: string]: boolean }>({});
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState<{ [assetid: string]: string }>({});
  const [floats, setFloats] = useState<{ [assetid: string]: number | null }>({});

  useEffect(() => {
    fetch('http://localhost:5000/auth/user', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        if (data) {
          fetch('http://localhost:5000/auth/inventory', { credentials: 'include' })
            .then(res => res.json())
            .then(inv => {
              if (inv.assets && inv.descriptions) {
                const cs2Assets = inv.assets.filter((asset: any) => asset.appid === 730);
                const items = cs2Assets.map((asset: any) => {
                  const desc = inv.descriptions.find(
                    (d: any) =>
                      d.classid === asset.classid && d.instanceid === asset.instanceid
                  );
                  return {
                    ...asset,
                    ...desc,
                  };
                });

                const noGraffiti = items.filter(
                  (item: any) =>
                    item.type &&
                    !item.type.toLowerCase().includes("graffiti") &&
                    !(item.market_hash_name && item.market_hash_name.toLowerCase().includes("graffiti"))
                );

                const grouped: { [key: string]: any } = {};
                const result: any[] = [];

                noGraffiti.forEach(item => {
                  const isCase =
                    item.type &&
                    (item.type.toLowerCase().includes("case") ||
                      item.market_hash_name?.toLowerCase().includes("case"));
                  const isSticker =
                    item.type &&
                    (item.type.toLowerCase().includes("sticker") ||
                      item.market_hash_name?.toLowerCase().includes("sticker"));

                  if (isCase || isSticker) {
                    const key = item.market_hash_name;
                    if (!grouped[key]) {
                      grouped[key] = { ...item, assetids: [item.assetid], count: 1 };
                    } else {
                      grouped[key].assetids.push(item.assetid);
                      grouped[key].count += 1;
                    }
                  } else {
                    result.push({ ...item, assetids: [item.assetid], count: 1 });
                  }
                });

                result.push(...Object.values(grouped));
                setInventory(result);
              } else {
                setInventory([]);
              }
            })
            .finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      });
  }, []);

  const filteredInventory = inventory.filter((item: any) =>
    item.market_hash_name.toLowerCase().includes(search.toLowerCase())
  );

  const inventoryItems = filteredInventory
    .map((item: any) => {
      const unselectedAssetIds = item.assetids.filter((id: string) => !selected[id]);
      if (unselectedAssetIds.length === 0) return null;
      return {
        ...item,
        assetids: unselectedAssetIds,
        count: unselectedAssetIds.length,
      };
    })
    .filter(Boolean);

  const wantToSellItems = inventory
    .map((item: any) => {
      const selectedAssetIds = item.assetids.filter((id: string) => selected[id]);
      if (selectedAssetIds.length === 0) return null;
      return {
        ...item,
        assetids: selectedAssetIds,
        count: selectedAssetIds.length,
      };
    })
    .filter(Boolean);

  const handleMoveToSell = (item: any) => {
    const ids = item.assetids.filter((id: string) => !selected[id]);
    if (ids.length > 0) {
      setSelected(prev => {
        const copy = { ...prev };
        ids.forEach(id => { copy[id] = true; });
        return copy;
      });
    }
  };

  const handleMoveToInventory = (item: any) => {
    const ids = item.assetids.filter((id: string) => selected[id]);
    if (ids.length > 0) {
      setSelected(prev => {
        const copy = { ...prev };
        ids.forEach(id => { delete copy[id]; });
        return copy;
      });
    }
  };

  useEffect(() => {
    inventory.forEach((item: any) => {
      if (
        item.type &&
        !item.type.toLowerCase().includes("case") &&
        !item.type.toLowerCase().includes("sticker") &&
        item.inspect_link &&
        !floats[item.assetids[0]]
      ) {
        fetch(
          `http://localhost:5000/auth/float/${item.assetids[0]}?inspectLink=${encodeURIComponent(item.inspect_link)}`,
          { credentials: "include" }
        )
          .then(res => res.json())
          .then(data => {
            setFloats(prev => ({
              ...prev,
              [item.assetids[0]]: data.iteminfo?.floatvalue ?? null,
            }));
          });
      }
    });
  }, [inventory]);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (!user) {
    return (
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="background-image"></div>
        <div className="breathe-background"></div>
        <div className="container mx-auto px-4 py-8 text-center" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
          <p className="mb-4">Please log in with Steam to view your CS2 inventory.</p>
          <a
            href="http://localhost:5000/auth/steam"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Login with Steam
          </a>
          <footer className="mt-8" style={{ position: "relative", zIndex: 2 }}>
            <div className="text-center py-4 text-gray-400">© 2024 Ditt Navn</div>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-page-bg">
      <div className="background-image background-layer"></div>
      <div className="breathe-background background-layer"></div>
      <div className="Sell-glow-bg" style={{ pointerEvents: "none" }}></div>

      <div className="content-layer">
        {/* Profile */}
        <div className="profile-section">
          <img src={user.photos?.[0]?.value} alt="Avatar" className="profile-avatar" />
          <div>
            <h1 className="profile-name">{user.displayName}</h1>
            <p className="profile-steamid">SteamID: {user.id}</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="main-layout">
          {/* Inventory */}
          <div className="inventory-section">
            <div className="inventory-header">
              <h2 className="inventory-title">My CS2 Inventory</h2>
              <input
                type="text"
                placeholder="Search inventory ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="inventory-container">
              <div className="glass-card inventory-scroll">
                <div className="glass-card-inner">
                  <div className="inventory-grid">
                    {inventoryItems.length === 0 ? (
                      <p className="empty-state">No CS2 items found in your inventory.</p>
                    ) : (
                      inventoryItems.map((item: any, idx: number) => {
                        const imgUrl = item.icon_url ? `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}` : '';
                        const key = item.assetids.length === 1
                          ? `${item.assetids[0]}-${idx}`
                          : `${item.market_hash_name}-${item.assetids.join(',')}-${idx}`;
                        
                        return (
                          <div
                            key={key}
                            className="item-card"
                            draggable
                            onDragStart={() => handleMoveToSell(item)}
                            onClick={() => handleMoveToSell(item)}
                            title="Klikk eller dra for å flytte alle til Want To Sell"
                          >
                            <img
                              src={imgUrl}
                              alt={item.market_hash_name}
                              className="item-image"
                            />
                            <h3 className="item-name">{item.market_hash_name}</h3>
                            <span className="float-badge">
                              {floats[item.assetids[0]] !== undefined
                                ? (floats[item.assetids[0]] !== null
                                    ? floats[item.assetids[0]]!.toFixed(3)
                                    : "–")
                                : "…"}
                            </span>
                            {item.count > 1 && (
                              <span className="count-badge">x{item.count}</span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Want To Sell Section */}
          <div className="sell-section">
            <div className="glass-card">
              <div className="glass-card-inner">
                <h2 className="inventory-title">Want To Sell ({wantToSellItems.length})</h2>
                
                <div className="inventory-grid">
                  {wantToSellItems.length === 0 ? (
                    <p className="empty-state">No items selected for sale.</p>
                  ) : (
                    wantToSellItems.map((item: any, idx: number) => {
                      const imgUrl = item.icon_url ? `https://steamcommunity-a.akamaihd.net/economy/image/${item.icon_url}` : '';
                      const key = item.assetids.length === 1
                        ? `sell-${item.assetids[0]}-${idx}`
                        : `sell-${item.market_hash_name}-${item.assetids.join(',')}-${idx}`;
                      
                      return (
                        <div
                          key={key}
                          className="item-card"
                          onClick={() => handleMoveToInventory(item)}
                          title="Klikk for å flytte tilbake til inventory"
                        >
                          <img
                            src={imgUrl}
                            alt={item.market_hash_name}
                            className="item-image"
                          />
                          <h3 className="item-name">{item.market_hash_name}</h3>
                          <span className="float-badge">
                            {floats[item.assetids[0]] !== undefined
                              ? (floats[item.assetids[0]] !== null
                                  ? floats[item.assetids[0]]!.toFixed(3)
                                  : "–")
                              : "…"}
                          </span>
                          {item.count > 1 && (
                            <span className="count-badge">x{item.count}</span>
                          )}
                          
                          {/* Price Input */}
                          <input
                            type="number"
                            placeholder="Price"
                            value={prices[item.assetids[0]] || ''}
                            onChange={e => setPrices(prev => ({
                              ...prev,
                              [item.assetids[0]]: e.target.value
                            }))}
                            onClick={e => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              bottom: '2px',
                              left: '2px',
                              right: '2px',
                              fontSize: '6px',
                              padding: '1px',
                              border: '1px solid #ccc',
                              borderRadius: '2px',
                              background: 'white',
                              color: 'black'
                            }}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
                
                {wantToSellItems.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <button 
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                      onClick={() => console.log('Submit for sale:', wantToSellItems, prices)}
                    >
                      Submit Items for Sale
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;