import React, { useState } from 'react';
import { nfts, collections } from '../../data/mockData';
import { Filter, Search, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardFooter, CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';

const ExplorePage: React.FC = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', name: 'All Items' },
    { id: 'art', name: 'Art' },
    { id: 'collectibles', name: 'Collectibles' },
    { id: 'game', name: 'Gaming' },
    { id: 'photography', name: 'Photography' },
    { id: 'music', name: 'Music' },
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 mt-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore CS2 skins
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the latest CS2 skins from talented creators around the world
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.name}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center">
              <Filter size={16} className="mr-2" />
              More Filters
            </button>
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search NFTs"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
              <button
                className={`p-1.5 rounded ${
                  view === 'grid' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
                onClick={() => setView('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`p-1.5 rounded ${
                  view === 'list' ? 'bg-gray-200 dark:bg-gray-700' : ''
                }`}
                onClick={() => setView('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* NFT Grid View */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nfts.map(nft => {
              const collection = collections.find(c => c.id === nft.collection);
              
              return (
                <Link to={`/nft/${nft.id}`} key={nft.id}>
                  <Card>
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                            {nft.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {collection?.name}
                          </p>
                        </div>
                        {collection?.verified && (
                          <Badge variant="primary" size="sm">Verified</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {nft.price} {nft.currency}
                          </p>
                        </div>
                        <Badge variant={nft.price > 1 ? 'secondary' : 'success'}>
                          {nft.likes} Likes
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {nfts.map(nft => {
              const collection = collections.find(c => c.id === nft.collection);
              
              return (
                <Link to={`/nft/${nft.id}`} key={nft.id}>
                  <Card className="flex overflow-hidden">
                    <div className="w-24 h-24 sm:w-40 sm:h-40 flex-shrink-0">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-between p-4 w-full">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {nft.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {collection?.name}
                          </p>
                        </div>
                        {collection?.verified && (
                          <Badge variant="primary" size="sm">Verified</Badge>
                        )}
                      </div>
                      <div className="flex justify-between items-end mt-2">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {nft.price} {nft.currency}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {nft.likes} Likes
                          </Badge>
                          <Badge variant="outline">
                            {nft.views} Views
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;