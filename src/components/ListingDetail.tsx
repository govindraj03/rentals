import { useState } from 'react';
import { ChevronLeft, Share, Heart, Star, Wifi, Tv, MapPin, Shield, Calendar, Users, Home, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookingCard } from './BookingCard';

interface ListingDetailProps {
  listingId: number;
  onBook: () => void;
  onBack: () => void;
}

const amenities = [
  { icon: Wifi, label: 'Wifi' },
  { icon: Tv, label: 'TV' },
  { icon: Home, label: 'Kitchen' },
  { icon: Users, label: 'Workspace' },
  { icon: MapPin, label: 'Free parking' },
  { icon: Sparkles, label: 'Pool' }
];

export function ListingDetail({ onBook, onBack }: ListingDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1682888813795-192fca4a10d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2NDE1NjU5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1694967832949-09984640b143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB2aWxsYXxlbnwxfHx8fDE3NjQyNTQyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
          </button>
        </div>
      </div>

      <div className="pt-16 lg:pt-20">
        {/* Desktop Back Button */}
        <div className="hidden lg:block max-w-screen-xl mx-auto px-20 pt-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to results
          </button>
        </div>

        {/* Title Section - Desktop */}
        <div className="hidden lg:block max-w-screen-xl mx-auto px-20 pt-6">
          <h1 className="text-gray-900">Modern Downtown Loft</h1>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-gray-900">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>4.94</span>
                <span className="text-gray-600">(127 reviews)</span>
              </div>
              <span className="text-gray-600">·</span>
              <span className="underline">San Francisco, California</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share className="w-4 h-4" />
                <span className="underline">Share</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF385C] text-[#FF385C]' : ''}`} />
                <span className="underline">Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="max-w-screen-xl mx-auto lg:px-20 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-2 lg:rounded-2xl overflow-hidden lg:h-[480px]">
            <div className="lg:col-span-2 lg:row-span-2 h-64 lg:h-full">
              <ImageWithFallback
                src={images[0]}
                alt="Main view"
                className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition-all"
              />
            </div>
            {images.slice(1).map((image, index) => (
              <div key={index} className="hidden lg:block h-full">
                <ImageWithFallback
                  src={image}
                  alt={`View ${index + 2}`}
                  className="w-full h-full object-cover cursor-pointer hover:brightness-95 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-screen-xl mx-auto px-6 lg:px-20 mt-8 lg:mt-12">
          <div className="lg:grid lg:grid-cols-3 lg:gap-24">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Mobile Title */}
              <div className="lg:hidden mb-6">
                <h1 className="text-gray-900">Modern Downtown Loft</h1>
                <div className="flex items-center gap-2 mt-2 text-gray-900">
                  <Star className="w-4 h-4 fill-current" />
                  <span>4.94</span>
                  <span className="text-gray-600">(127 reviews)</span>
                </div>
              </div>

              {/* Host Info */}
              <div className="pb-8 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900">Entire apartment hosted by Sarah</h2>
                    <p className="text-gray-600 mt-1">4 guests · 2 bedrooms · 2 beds · 2 bathrooms</p>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    SJ
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="py-8 border-b border-gray-200 space-y-6">
                <HighlightItem
                  icon={Home}
                  title="Entire home"
                  description="You'll have the apartment to yourself."
                />
                <HighlightItem
                  icon={Sparkles}
                  title="Enhanced Clean"
                  description="This Host committed to Eazypg's 5-step enhanced cleaning process."
                />
                <HighlightItem
                  icon={Calendar}
                  title="Free cancellation before Dec 10"
                  description="Get a full refund if you change your mind."
                />
              </div>

              {/* Description */}
              <div className="py-8 border-b border-gray-200">
                <p className="text-gray-700 leading-relaxed">
                  Beautiful modern loft in the heart of downtown San Francisco. Walking distance to restaurants, 
                  shopping, and public transportation. The space features high ceilings, large windows with city 
                  views, a fully equipped kitchen, and comfortable living areas. Perfect for couples or small families 
                  looking to explore the city.
                </p>
                <button className="mt-4 underline">Show more</button>
              </div>

              {/* Amenities */}
              <div className="py-8 border-b border-gray-200">
                <h2 className="text-gray-900 mb-6">What this place offers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {amenities.map((amenity) => (
                    <div key={amenity.label} className="flex items-center gap-4">
                      <amenity.icon className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-6 py-3 border border-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                  Show all amenities
                </button>
              </div>

              {/* Reviews */}
              <div className="py-8">
                <div className="flex items-center gap-2 mb-8">
                  <Star className="w-6 h-6 fill-current" />
                  <h2 className="text-gray-900">4.94 · 127 reviews</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ReviewCard
                    name="Jennifer"
                    date="November 2025"
                    rating={5}
                    text="Amazing place! The loft was even better than the photos. Sarah was a great host and very responsive."
                  />
                  <ReviewCard
                    name="Michael"
                    date="October 2025"
                    rating={5}
                    text="Perfect location for exploring the city. The space was clean, modern, and had everything we needed."
                  />
                </div>
                <button className="mt-8 px-6 py-3 border border-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                  Show all reviews
                </button>
              </div>
            </div>

            {/* Booking Card - Desktop */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32">
                <BookingCard onBook={onBook} price={189} rating={4.94} reviews={127} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Booking Bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-gray-900">$189</span>
                <span className="text-gray-600"> night</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="w-3 h-3 fill-current" />
                <span>4.94 (127)</span>
              </div>
            </div>
            <button
              onClick={onBook}
              className="px-8 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightItem({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <Icon className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
      <div>
        <div className="text-gray-900">{title}</div>
        <div className="text-gray-600 mt-1">{description}</div>
      </div>
    </div>
  );
}

function ReviewCard({ name, date, rating, text }: { name: string; date: string; rating: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
          {name[0]}
        </div>
        <div>
          <div className="text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">{date}</div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-current" />
        ))}
      </div>
      <p className="text-gray-700">{text}</p>
    </motion.div>
  );
}
