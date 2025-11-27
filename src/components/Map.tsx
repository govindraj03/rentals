import { useState } from 'react';
import { motion } from 'motion/react';

interface Listing {
  id: number;
  price: number;
  title: string;
}

interface MapProps {
  listings: Listing[];
  onSelectListing: (id: number) => void;
}

export function Map({ listings, onSelectListing }: MapProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Generate random positions for markers
  const markers = listings.map((listing, index) => ({
    ...listing,
    x: 20 + (index % 3) * 25 + Math.random() * 10,
    y: 20 + Math.floor(index / 3) * 20 + Math.random() * 10
  }));

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative">
      {/* Decorative map elements */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Price Markers */}
      <div className="absolute inset-0">
        {markers.map((marker) => (
          <motion.button
            key={marker.id}
            onClick={() => onSelectListing(marker.id)}
            onMouseEnter={() => setHoveredId(marker.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'absolute',
              left: `${marker.x}%`,
              top: `${marker.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            className={`px-4 py-2 rounded-full shadow-lg transition-all duration-200 ${
              hoveredId === marker.id
                ? 'bg-gray-900 text-white scale-110'
                : 'bg-white text-gray-900 hover:shadow-xl'
            }`}
          >
            ${marker.price}
          </motion.button>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          +
        </button>
        <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
          −
        </button>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
        Interactive Map
      </div>
    </div>
  );
}
