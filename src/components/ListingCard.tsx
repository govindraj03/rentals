import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageCarousel } from './ImageCarousel';

interface ListingCardProps {
  id: number;
  images: string[];
  title: string;
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  rating: number;
  reviews: number;
  distance?: string;
  dates?: string;
  onClick: () => void;
}

export function ListingCard({
  images,
  title,
  type,
  guests,
  bedrooms,
  bathrooms,
  price,
  rating,
  reviews,
  distance,
  dates,
  onClick
}: ListingCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={images} />
        
        {/* Wishlist Heart */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-black/10 transition-colors"
        >
          <AnimatePresence mode="wait">
            {isFavorite ? (
              <motion.div
                key="filled"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Heart className="w-6 h-6 fill-[#FF385C] text-[#FF385C]" />
              </motion.div>
            ) : (
              <motion.div
                key="outline"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Heart className="w-6 h-6 text-white stroke-2 drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Listing Details */}
      <div className="mt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="text-gray-900">{title}</div>
            <div className="text-gray-600 mt-1">{type}</div>
            <div className="text-gray-600 text-sm mt-1">
              {guests} guests · {bedrooms} bedroom{bedrooms > 1 ? 's' : ''} · {bathrooms} bath{bathrooms > 1 ? 's' : ''}
            </div>
            {distance && <div className="text-gray-600 text-sm mt-1">{distance}</div>}
            {dates && <div className="text-gray-500 text-sm mt-1">{dates}</div>}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-current" />
            <span>{rating.toFixed(2)}</span>
            <span className="text-gray-600">({reviews})</span>
          </div>
        </div>
        <div className="mt-2">
          <span className="text-gray-900">${price}</span>
          <span className="text-gray-600"> night</span>
        </div>
      </div>
    </motion.div>
  );
}
