import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface AirbnbListingCardProps {
  id: number;
  images: string[];
  title: string;
  type: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  rating?: number;
  reviews?: number;
  location: string;
  host: string;
  distance?: string;
  dates?: string;
  isSuperhost?: boolean;
  onClick: () => void;
}

export function AirbnbListingCard({
  images,
  title,
  type,
  price,
  rating,
  reviews,
  location,
  distance,
  dates,
  isSuperhost,
  onClick
}: AirbnbListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageDirection, setImageDirection] = useState<'left' | 'right'>('right');

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageDirection('right');
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageDirection('left');
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const imageVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -20 : 20,
      opacity: 0
    })
  };

  return (
    <motion.div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
        {/* Images */}
        <AnimatePresence initial={false} custom={imageDirection} mode="wait">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt={title}
            className="w-full h-full object-cover"
            custom={imageDirection}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <AnimatePresence>
          {isHovered && images.length > 1 && (
            <>
              {currentImageIndex > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all z-10"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
              )}
              
              {currentImageIndex < images.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all z-10"
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
            </>
          )}
        </AnimatePresence>

        {/* Wishlist Button */}
        <motion.button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              scale: isWishlisted ? [1, 1.3, 1] : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-6 h-6 stroke-2 ${
                isWishlisted
                  ? 'fill-[#FF385C] stroke-[#FF385C]'
                  : 'fill-black/20 stroke-white'
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Image Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-2'
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Superhost Badge */}
        {isSuperhost && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium shadow-sm">
            SUPERHOST
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-1">
        {/* Location & Rating */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{location}</h3>
          </div>
          {rating && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-sm">
                {rating.toFixed(2)}
                {reviews && <span className="text-gray-600 ml-1">({reviews})</span>}
              </span>
            </div>
          )}
        </div>

        {/* Distance */}
        {distance && (
          <p className="text-sm text-gray-600">{distance}</p>
        )}

        {/* Type */}
        <p className="text-sm text-gray-600 truncate">{type}</p>

        {/* Dates */}
        {dates && (
          <p className="text-sm text-gray-600">{dates}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 pt-1">
          <span className="font-medium">₹{price.toLocaleString('en-IN')}</span>
          <span className="text-sm text-gray-600">night</span>
        </div>
      </div>
    </motion.div>
  );
}
