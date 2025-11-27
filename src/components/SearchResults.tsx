import { useState } from 'react';
import { SlidersHorizontal, Map as MapIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { ListingCard } from './ListingCard';
import { Map } from './Map';

interface SearchResultsProps {
  onSelectListing: (id: number) => void;
}

const mockListings = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Modern Downtown Loft',
    type: 'Entire apartment',
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    price: 189,
    rating: 4.94,
    reviews: 127,
    distance: '1.2 miles away',
    dates: 'Dec 15 – 20'
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1597475681177-809cfdc76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwb2NlYW58ZW58MXx8fHwxNzY0MTk0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2NDE1NjU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NjQyNTQyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Beachfront Villa with Pool',
    type: 'Entire villa',
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    price: 425,
    rating: 4.98,
    reviews: 89,
    distance: '3.5 miles away',
    dates: 'Dec 18 – 23'
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1475087542963-13ab5e611954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY0MjU0MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Cozy Mountain Cabin Retreat',
    type: 'Entire cabin',
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 156,
    rating: 4.87,
    reviews: 203,
    distance: '12.8 miles away',
    dates: 'Dec 20 – 25'
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1672082497059-1e6c0209eeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbG9mdCUyMGFwYXJ0bWVudHxlbnwxfHx8fDE3NjQxOTQxODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2NDE1NjU5MHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Stylish City Loft',
    type: 'Entire loft',
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    price: 145,
    rating: 4.91,
    reviews: 156,
    distance: '0.8 miles away',
    dates: 'Dec 16 – 21'
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NjQyNTQyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1597475681177-809cfdc76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwb2NlYW58ZW58MXx8fHwxNzY0MTk0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Luxury Pool Villa',
    type: 'Entire villa',
    guests: 8,
    bedrooms: 4,
    bathrooms: 4,
    price: 589,
    rating: 5.0,
    reviews: 64,
    distance: '5.2 miles away',
    dates: 'Dec 22 – 27'
  },
  {
    id: 6,
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2NDE1NjU5MHww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    title: 'Charming Studio Apartment',
    type: 'Entire studio',
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 98,
    rating: 4.85,
    reviews: 234,
    distance: '2.1 miles away',
    dates: 'Dec 14 – 19'
  }
];

export function SearchResults({ onSelectListing }: SearchResultsProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="pt-20">
      {/* Filters Bar */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <FilterButton active>Amazing views</FilterButton>
              <FilterButton>Beachfront</FilterButton>
              <FilterButton>Cabins</FilterButton>
              <FilterButton>Trending</FilterButton>
              <FilterButton>Luxury</FilterButton>
              <FilterButton>Countryside</FilterButton>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button className="hidden lg:flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:border-gray-900 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <MapIcon className="w-4 h-4" />
                <span>{showMap ? 'List' : 'Map'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-0">
          {/* Listings Grid */}
          <div className={`px-6 lg:px-20 py-8 ${showMap ? 'hidden lg:block' : 'block'}`}>
            <div className="mb-6">
              <h2 className="text-gray-900">Over 1,000 stays</h2>
              <p className="text-gray-600 mt-2">
                Dec 15 – 20 · 2 guests
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-x-6 gap-y-10">
              {mockListings.map((listing) => (
                <ListingCard
                  key={listing.id}
                  {...listing}
                  onClick={() => onSelectListing(listing.id)}
                />
              ))}
            </div>
          </div>

          {/* Map */}
          <div className={`${showMap ? 'block' : 'hidden lg:block'} lg:sticky lg:top-20 h-[calc(100vh-5rem)]`}>
            <Map listings={mockListings} onSelectListing={onSelectListing} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl border whitespace-nowrap transition-colors ${
        active
          ? 'bg-gray-900 text-white border-gray-900'
          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
      }`}
    >
      {children}
    </motion.button>
  );
}
