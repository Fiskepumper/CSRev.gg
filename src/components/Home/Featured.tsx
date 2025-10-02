import React, { useState, useEffect, useRef } from 'react';
import './Featured.css';

const demoNFTs = [
  {
    id: '1',
    name: 'Sticker | Titan Holo Katowice 2014',
    image: '/titan.png',
    price: '1 250 000',
    currency: 'NOK',
    views: 3847,
    creator: 'TitanLegend',
  },
  {
    id: '2',
    name: 'AK-47 | Bloodsport',
    image: '/ak-1.png',
    price: '11 220',
    currency: 'NOK',
    views: 123,
    creator: 'SkinMaster',
  },
  {
    id: '3',
    name: 'AWP | Dragon Lore',
    image: '/awplore.png',
    price: '128 073',
    currency: 'NOK',
    views: 1243,
    creator: 'AWPGod',
  },
  {
    id: '4',
    name: 'AK-47 | B The Moonster',
    image: '/ak-3.png',
    price: '6 799',
    currency: 'NOK',
    views: 999,
    creator: 'Legend',
  },
  {
    id: '5',
    name: 'Karambit | Doppler',
    image: '/knife-1.png',
    price: '11 500',
    currency: 'NOK',
    views: 152,
    creator: 'KnifeKing',
  },
  {
    id: '6',
    name: 'M4A4 | Chromatic',
    image: '/m4-1.png',
    price: '44 200',
    currency: 'NOK',
    views: 843,
    creator: 'Howler',
  },
  {
    id: '7',
    name: 'M4A1-S | Faded',
    image: '/m4-2.png',
    price: '6 698',
    currency: 'NOK',
    views: 34,
    creator: 'BeastMaster',
  },
  {
    id: '8',
    name: 'M4A4 | Desolate Space',
    image: '/m4-3.png',
    price: '700',
    currency: 'NOK',
    views: 50,
    creator: 'SpaceMan',
  },
  {
    id: '9',
    name: 'Stiletto Knife | Tiger Tooth',
    image: '/knife-2.png',
    price: '78 500',
    currency: 'NOK',
    views: 567,
    creator: 'TigerStrike',
  },
  {
    id: '10',
    name: 'The Trapper | Aggressor',
    image: '/trapper-1.png',
    price: '2 450',
    currency: 'NOK',
    views: 289,
    creator: 'Guerrilla',
  },
  {
    id: '11',
    name: 'Sport Gloves | Nocts',
    image: '/Sport-Gloves-Nocts.png',
    price: '15 890',
    currency: 'NOK',
    views: 445,
    creator: 'GloveGuru',
  },
  {
    id: '12',
    name: 'Sticker | Dexter Shanghai 2024',
    image: '/Sticker-1.png',
    price: '1 250',
    currency: 'NOK',
    views: 178,
    creator: 'StickerLord',
  },
  {
    id: '13',
    name: 'USP-S | Printstream',
    image: '/usp-s-printstream.png',
    price: '8 799',
    currency: 'NOK',
    views: 633,
    creator: 'PrintMaster',
  },
  {
    id: '14',
    name: 'Nomad Knife | Marble Fade',
    image: '/Nomad-knife-marble-fade.png',
    price: '95 600',
    currency: 'NOK',
    views: 891,
    creator: 'MarbleLord',
  },
  {
    id: '15',
    name: 'Number K | The Professionals',
    image: '/Number-K-The-Professionals.png',
    price: '3 200',
    currency: 'NOK',
    views: 234,
    creator: 'ProPlayer',
  },
];

const ANIMATION_DURATION = 400; // ms

const Featured: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animation, setAnimation] = useState<'slide-out-left' | 'slide-in-right' | ''>('');
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Vis 4 om gangen
  const getNFTs = (index: number) => {
    const visible = demoNFTs.slice(index, index + 4);
    return visible.length < 4
      ? visible.concat(demoNFTs.slice(0, 4 - visible.length))
      : visible;
  };

  const nftsToShow = getNFTs(displayedIndex);

  // Automatisk bytte
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [displayedIndex]);

  // Navigasjon med animasjon
  const handlePrev = () => {
    setAnimation('slide-out-left');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const newIndex = (displayedIndex - 4 + demoNFTs.length) % demoNFTs.length;
      setDisplayedIndex(newIndex);
      setAnimation('slide-in-right');
      timeoutRef.current = setTimeout(() => setAnimation(''), ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  };

  const handleNext = () => {
    setAnimation('slide-out-left');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const newIndex = (displayedIndex + 4) % demoNFTs.length;
      setDisplayedIndex(newIndex);
      setAnimation('slide-in-right');
      timeoutRef.current = setTimeout(() => setAnimation(''), ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  };

  // For automatisk bytte
  useEffect(() => {
    setCurrentIndex(displayedIndex);
  }, [displayedIndex]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section className="featured-bg py-8 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="featured-container">
          {/* Grid med 4 kort på rad */}
          <div className="featured-grid">
            {nftsToShow.map((nft) => (
              <div
                key={nft.id}
                className={`featured-card ${
                  animation ? animation : 'slide-in'
                }`}
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="featured-img"
                />
                <h3 className="font-semibold text-lg mb-1 featured-text">{nft.name}</h3>
                <div className="text-lg font-bold mb-2 featured-text">
                  {nft.price} {nft.currency}
                </div>
                <div className="flex gap-4 text-sm mb-2 items-center">
                  <span className="featured-eye">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M1.5 12s4-7 10.5-7 10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </span>
                  <span className="featured-text">{nft.views}</span>
                </div>
                <div className="text-xs opacity-80 featured-text">by {nft.creator}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Featured;