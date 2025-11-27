import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingCardProps {
  onBook: () => void;
  price: number;
  rating: number;
  reviews: number;
}

export function BookingCard({ onBook, price, rating, reviews }: BookingCardProps) {
  const [checkIn, setCheckIn] = useState('12/15/2025');
  const [checkOut, setCheckOut] = useState('12/20/2025');
  const [guests, setGuests] = useState(2);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const nights = 5;
  const subtotal = price * nights;
  const cleaningFee = 45;
  const serviceFee = 68;
  const total = subtotal + cleaningFee + serviceFee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-300 rounded-2xl p-6 shadow-xl"
    >
      {/* Price & Rating */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          <span className="text-gray-900">${price}</span>
          <span className="text-gray-600"> night</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-current" />
          <span>{rating}</span>
          <span className="text-gray-600">({reviews} reviews)</span>
        </div>
      </div>

      {/* Date & Guest Inputs */}
      <div className="border border-gray-400 rounded-xl overflow-hidden">
        <div className="grid grid-cols-2 border-b border-gray-400">
          <div className="p-3 border-r border-gray-400">
            <label className="text-xs uppercase block mb-1">Check-in</label>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>
          <div className="p-3">
            <label className="text-xs uppercase block mb-1">Checkout</label>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm outline-none"
            />
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div>
              <label className="text-xs uppercase block mb-1">Guests</label>
              <span className="text-sm">{guests} guest{guests > 1 ? 's' : ''}</span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${showGuestPicker ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showGuestPicker && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg p-4 z-50"
              >
                <div className="flex items-center justify-between">
                  <span>Adults</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-900 transition-colors disabled:opacity-50"
                      disabled={guests <= 1}
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-900 transition-colors disabled:opacity-50"
                      disabled={guests >= 8}
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Reserve Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onBook}
        className="w-full mt-4 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
      >
        Reserve
      </motion.button>

      <p className="text-center text-sm text-gray-600 mt-3">You won't be charged yet</p>

      {/* Price Breakdown */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-gray-700">
          <span className="underline">${price} x {nights} nights</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="underline">Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <span className="underline">Service fee</span>
          <span>${serviceFee}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total}</span>
        </div>
      </div>
    </motion.div>
  );
}
