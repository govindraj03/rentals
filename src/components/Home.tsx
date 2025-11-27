import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  onExplore: () => void;
}

const destinations = [
  {
    id: 1,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NDE5MzYwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '4,500 miles away'
  },
  {
    id: 2,
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1583915223588-7d88ebf23414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjQxNjg2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '6,700 miles away'
  },
  {
    id: 3,
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1728050829052-2d1514f1d168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwYmVhY2glMjB2aWxsYXxlbnwxfHx8fDE3NjQyNTQyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '8,900 miles away'
  },
  {
    id: 4,
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1570304816841-906a17d7b067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwc2t5bGluZXxlbnwxfHx8fDE3NjQxODk1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '2,800 miles away'
  }
];

const categories = [
  { name: 'Amazing views', icon: '🏔️' },
  { name: 'Beachfront', icon: '🏖️' },
  { name: 'Trending', icon: '🔥' },
  { name: 'Countryside', icon: '🌾' },
  { name: 'Cabins', icon: '🏡' },
  { name: 'Luxury', icon: '✨' },
  { name: 'Unique stays', icon: '🎪' },
  { name: 'City', icon: '🏙️' }
];

export function Home({ onExplore }: HomeProps) {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-gray-800 mb-2">Not sure where to go? Perfect.</h1>
          <button
            onClick={onExplore}
            className="group mt-4 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span>I'm flexible</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </button>
        </motion.div>

        {/* Destinations Grid */}
        <div className="mt-16">
          <h2 className="text-gray-800 mb-8">Inspiration for your next trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination, index) => (
              <motion.button
                key={destination.id}
                onClick={onExplore}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="mb-1">{destination.name}</div>
                    <div className="text-sm opacity-90">{destination.distance}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-20">
          <h2 className="text-gray-800 mb-8">Browse by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                onClick={onExplore}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-gray-200 hover:border-gray-900 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm text-gray-700">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 mb-12 bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-12 text-center"
        >
          <h2 className="text-gray-800 mb-4">Questions about hosting?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of Hosts and start earning extra income by sharing your space
          </p>
          <button className="px-8 py-4 bg-[#FF385C] text-white rounded-full hover:bg-[#E31C5F] transition-colors shadow-lg hover:shadow-xl">
            Learn more
          </button>
        </motion.div>
      </div>
    </div>
  );
}
