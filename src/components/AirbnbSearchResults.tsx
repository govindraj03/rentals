import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { AirbnbHeader } from './AirbnbHeader';
import { CategoryFilters } from './CategoryFilters';
import { AirbnbListingCard } from './AirbnbListingCard';
import { Map } from './Map';

interface AirbnbSearchResultsProps {
  onSelectListing: (id: number) => void;
  onBack: () => void;
  onAuthOpen: (mode: 'signin' | 'signup') => void;
  onNavigate?: (page: string) => void;
}

const searchListings = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    ],
    title: 'Beachfront Villa in Goa',
    type: 'Beach house',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    price: 12500,
    rating: 4.95,
    reviews: 128,
    location: 'Goa, India',
    host: 'Raj',
    distance: '2,345 kilometers away',
    dates: 'Dec 10 – 15',
    isSuperhost: true
  },
  {
    id: 2,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    ],
    title: 'Mountain Cabin',
    type: 'Cabin',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    price: 8500,
    rating: 4.89,
    reviews: 67,
    location: 'Manali, India',
    host: 'Priya',
    distance: '1,876 kilometers away',
    dates: 'Dec 5 – 10'
  },
  {
    id: 3,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    ],
    title: 'Modern Apartment',
    type: 'Apartment',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price: 4500,
    rating: 4.92,
    reviews: 203,
    location: 'Mumbai, India',
    host: 'Amit',
    distance: '892 kilometers away',
    dates: 'Dec 1 – 6',
    isSuperhost: true
  },
  {
    id: 4,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    ],
    title: 'Luxury Villa',
    type: 'Villa',
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    price: 25000,
    rating: 4.98,
    reviews: 89,
    location: 'Jaipur, India',
    host: 'Neha',
    distance: '1,234 kilometers away',
    dates: 'Dec 12 – 17',
    isSuperhost: true
  },
  {
    id: 5,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&q=80',
    ],
    title: 'Cozy Cottage',
    type: 'Cottage',
    guests: 3,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    price: 6500,
    rating: 4.87,
    reviews: 45,
    location: 'Ooty, India',
    host: 'Vikram',
    distance: '2,103 kilometers away',
    dates: 'Dec 8 – 13'
  },
  {
    id: 6,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80',
    ],
    title: 'Heritage Home',
    type: 'House',
    guests: 5,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    price: 15000,
    rating: 4.93,
    reviews: 156,
    location: 'Udaipur, India',
    host: 'Arjun',
    distance: '1,567 kilometers away',
    dates: 'Dec 15 – 20',
    isSuperhost: true
  }
];

export function AirbnbSearchResults({ onSelectListing, onBack, onAuthOpen, onNavigate }: AirbnbSearchResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <AirbnbHeader 
        onSearch={() => {}} 
        onAuthOpen={onAuthOpen}
        onNavigate={onNavigate}
        currentPage="search"
      />
      
      <CategoryFilters 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Back Button */}
      <div className="px-6 lg:px-20 pt-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium hover:underline mb-4"
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back to home
        </motion.button>
      </div>

      {/* Main Content */}
      <main className="px-6 lg:px-20 pb-12">
        {/* Results Header */}
        <div className="mb-6">
          <h1 className="text-sm text-gray-600 mb-2">
            Over 1,000 stays · Dec 1 – Dec 6 · 2 guests
          </h1>
          <h2 className="text-3xl">Stays in India</h2>
        </div>

        <div className="lg:flex gap-6">
          {/* Listings Grid */}
          <div className={`flex-1 ${showMap ? 'lg:w-1/2' : 'w-full'}`}>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-6 gap-y-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {searchListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AirbnbListingCard
                    {...listing}
                    onClick={() => onSelectListing(listing.id)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Map - Desktop */}
          {showMap && (
            <div className="hidden lg:block lg:w-1/2 sticky top-[145px] h-[calc(100vh-145px)]">
              <Map listings={searchListings} onSelectListing={onSelectListing} />
            </div>
          )}
        </div>

        {/* Show Map Button - Mobile */}
        <motion.button
          onClick={() => setShowMap(!showMap)}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg z-40 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showMap ? 'Show list' : 'Show map'}
        </motion.button>
      </main>
    </div>
  );
}
