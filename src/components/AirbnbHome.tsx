import { useState } from 'react';
import { motion } from 'motion/react';
import { AirbnbHeader } from './AirbnbHeader';
import { CategoryFilters } from './CategoryFilters';
import { AirbnbListingCard } from './AirbnbListingCard';
import { AirbnbFooter } from './AirbnbFooter';
import { EazypgHero } from './EazypgHero';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AirbnbHomeProps {
  onSearch: () => void;
  onAuthOpen: (mode: 'signin' | 'signup') => void;
  onSelectListing: (id: number) => void;
  onNavigate?: (page: string) => void;
}

// Sample listings data
const listings = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
    ],
    title: 'Beachfront Villa in Goa',
    type: 'Beach house hosted by Raj',
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
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ],
    title: 'Mountain Cabin',
    type: 'Cabin hosted by Priya',
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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
    ],
    title: 'Modern Apartment',
    type: 'Apartment hosted by Amit',
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
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
    ],
    title: 'Luxury Villa',
    type: 'Villa hosted by Neha',
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
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'
    ],
    title: 'Cozy Cottage',
    type: 'Cottage hosted by Vikram',
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
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    title: 'Heritage Home',
    type: 'House hosted by Arjun',
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
  },
  {
    id: 7,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80'
    ],
    title: 'Riverside Retreat',
    type: 'Cottage hosted by Maya',
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    price: 9500,
    rating: 4.91,
    reviews: 72,
    location: 'Rishikesh, India',
    host: 'Maya',
    distance: '1,432 kilometers away',
    dates: 'Dec 6 – 11'
  },
  {
    id: 8,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80'
    ],
    title: 'Urban Loft',
    type: 'Loft hosted by Rohan',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    price: 5500,
    rating: 4.88,
    reviews: 134,
    location: 'Bangalore, India',
    host: 'Rohan',
    distance: '734 kilometers away',
    dates: 'Dec 3 – 8',
    isSuperhost: true
  }
];

export function AirbnbHome({ onSearch, onAuthOpen, onSelectListing, onNavigate }: AirbnbHomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-white">
      <AirbnbHeader 
        onSearch={onSearch} 
        onAuthOpen={onAuthOpen}
        onNavigate={onNavigate}
        currentPage="home"
      />
      
      {/* Hero Section */}
      <div className="pt-20">
        <EazypgHero onSearch={onSearch} />
      </div>
      
      <CategoryFilters 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="px-6 lg:px-20 py-6">
        {/* Listings Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {listings.map((listing, index) => (
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

        {/* Continue Exploring */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue exploring stays
          </motion.button>
        </motion.div>

        {/* Inspiration Section */}
        <motion.div
          className="mt-16 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl mb-6">Inspiration for future getaways</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Popular', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
              { name: 'Arts & culture', image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?w=400&q=80' },
              { name: 'Outdoors', image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&q=80' },
              { name: 'Mountains', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="font-medium">{item.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <AirbnbFooter />
    </div>
  );
}
