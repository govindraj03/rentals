import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  Mountain, 
  Palmtree, 
  Waves, 
  TreePine, 
  Castle,
  Tent,
  Ship,
  UtensilsCrossed,
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

const categories = [
  { id: 'all', name: 'All', icon: Home },
  { id: 'beachfront', name: 'Beachfront', icon: Waves },
  { id: 'cabins', name: 'Cabins', icon: TreePine },
  { id: 'trending', name: 'Trending', icon: Flame },
  { id: 'tropical', name: 'Tropical', icon: Palmtree },
  { id: 'mountain', name: 'Mountain', icon: Mountain },
  { id: 'castles', name: 'Castles', icon: Castle },
  { id: 'camping', name: 'Camping', icon: Tent },
  { id: 'boats', name: 'Boats', icon: Ship },
  { id: 'chef', name: "Chef's kitchens", icon: UtensilsCrossed },
  { id: 'luxury', name: 'Luxe', icon: Sparkles },
];

interface CategoryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilters({ selectedCategory, onSelectCategory }: CategoryFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="sticky top-[73px] bg-white z-40 border-b border-gray-200">
      <div className="px-6 lg:px-20 py-4 relative">
        <div className="flex items-center gap-4">
          {/* Categories Scroll */}
          <div className="flex-1 relative">
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
            )}

            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`flex flex-col items-center gap-2 pb-3 border-b-2 transition-all min-w-fit ${
                      isActive
                        ? 'border-gray-900'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon 
                      className={`w-6 h-6 ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`} 
                    />
                    <span 
                      className={`text-xs font-medium whitespace-nowrap ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}
                    >
                      {category.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Filters Button */}
          <motion.button
            className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-900 transition-colors min-w-fit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Filters</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
