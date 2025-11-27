import { useState } from 'react';
import { ChevronLeft, Home, Upload, MapPin, DollarSign, Calendar, Users, Wifi, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageHeader } from './PageHeader';

interface BecomeHostPageProps {
  onBack: () => void;
  onAuthOpen?: (mode: 'signin' | 'signup') => void;
}

type HostingStep = 1 | 2 | 3 | 4 | 5;

export function BecomeHostPage({ onBack, onAuthOpen }: BecomeHostPageProps) {
  const [currentStep, setCurrentStep] = useState<HostingStep>(1);
  const [listingData, setListingData] = useState({
    propertyType: '',
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    amenities: [] as string[],
    price: '',
    images: [] as string[]
  });
  const [isComplete, setIsComplete] = useState(false);

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: '🏢' },
    { id: 'house', label: 'House', icon: '🏠' },
    { id: 'villa', label: 'Villa', icon: '🏡' },
    { id: 'cabin', label: 'Cabin', icon: '🏕️' },
    { id: 'condo', label: 'Condo', icon: '🏘️' },
    { id: 'other', label: 'Other', icon: '🏗️' }
  ];

  const amenitiesList = [
    { id: 'wifi', label: 'Wifi', icon: Wifi },
    { id: 'kitchen', label: 'Kitchen', icon: Home },
    { id: 'parking', label: 'Free parking', icon: MapPin },
    { id: 'pool', label: 'Pool', icon: '🏊' },
    { id: 'gym', label: 'Gym', icon: '💪' },
    { id: 'ac', label: 'Air conditioning', icon: '❄️' }
  ];

  const handleContinue = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as HostingStep);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as HostingStep);
    } else {
      onBack();
    }
  };

  const toggleAmenity = (amenityId: string) => {
    setListingData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6 pt-20 bg-gradient-to-br from-pink-50 to-purple-50"
      >
        <div className="max-w-lg w-full text-center bg-white rounded-3xl p-12 shadow-xl">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-gray-900 mb-4">Congratulations! 🎉</h1>
          <p className="text-gray-600 mb-8">
            Your listing has been submitted for review. We&apos;ll notify you once it&apos;s live on Eazypg.
          </p>
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="w-full px-8 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              Go to Dashboard
            </motion.button>
            <button
              onClick={() => {
                setIsComplete(false);
                setCurrentStep(1);
              }}
              className="w-full px-8 py-3 border border-gray-300 rounded-lg hover:border-gray-900 transition-colors"
            >
              Create Another Listing
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader onBack={onBack} onAuthOpen={onAuthOpen} title="Become a Host" />
      
      <div className="pt-20">
        {/* Progress Indicator */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="max-w-screen-lg mx-auto px-6 py-4 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-screen-lg mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            {/* Step 1: Property Type */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-gray-900 mb-3">What type of place will you host?</h1>
                <p className="text-gray-600 mb-8">
                  Choose the type that best describes your property.
                </p>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setListingData({ ...listingData, propertyType: type.id })}
                      className={`p-6 border-2 rounded-2xl transition-all hover:border-gray-900 ${
                        listingData.propertyType === type.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300'
                      }`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className="text-gray-900">{type.label}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Basic Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-gray-900 mb-3">Let&apos;s give your place a name</h1>
                <p className="text-gray-600 mb-8">
                  Short titles work best. Don&apos;t worry, you can always change it later.
                </p>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Property Title</label>
                    <input
                      type="text"
                      value={listingData.title}
                      onChange={(e) => setListingData({ ...listingData, title: e.target.value })}
                      placeholder="e.g., Cozy Downtown Loft with City Views"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                      value={listingData.description}
                      onChange={(e) => setListingData({ ...listingData, description: e.target.value })}
                      placeholder="Describe what makes your place special..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-gray-900 mb-3">Where&apos;s your place located?</h1>
                <p className="text-gray-600 mb-8">
                  Your address is only shared with guests after they&apos;ve made a reservation.
                </p>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={listingData.address}
                      onChange={(e) => setListingData({ ...listingData, address: e.target.value })}
                      placeholder="123 Main Street"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={listingData.city}
                        onChange={(e) => setListingData({ ...listingData, city: e.target.value })}
                        placeholder="San Francisco"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={listingData.state}
                        onChange={(e) => setListingData({ ...listingData, state: e.target.value })}
                        placeholder="CA"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={listingData.zipCode}
                      onChange={(e) => setListingData({ ...listingData, zipCode: e.target.value })}
                      placeholder="94103"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Details & Amenities */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-gray-900 mb-3">Share some basics about your place</h1>
                <p className="text-gray-600 mb-8">
                  You&apos;ll add more details later, like bed types.
                </p>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-8">
                  <div className="space-y-6">
                    <Counter
                      label="Guests"
                      value={listingData.guests}
                      onChange={(val) => setListingData({ ...listingData, guests: val })}
                    />
                    <Counter
                      label="Bedrooms"
                      value={listingData.bedrooms}
                      onChange={(val) => setListingData({ ...listingData, bedrooms: val })}
                    />
                    <Counter
                      label="Beds"
                      value={listingData.beds}
                      onChange={(val) => setListingData({ ...listingData, beds: val })}
                    />
                    <Counter
                      label="Bathrooms"
                      value={listingData.bathrooms}
                      onChange={(val) => setListingData({ ...listingData, bathrooms: val })}
                      step={0.5}
                    />
                  </div>

                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-gray-900 mb-4">Amenities</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {amenitiesList.map((amenity) => {
                        const Icon = amenity.icon;
                        return (
                          <button
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg transition-all ${
                              listingData.amenities.includes(amenity.id)
                                ? 'border-gray-900 bg-gray-50'
                                : 'border-gray-300 hover:border-gray-900'
                            }`}
                          >
                            {typeof Icon === 'string' ? (
                              <span className="text-xl">{Icon}</span>
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                            <span>{amenity.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Photos & Pricing */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h1 className="text-gray-900 mb-3">Add photos and set your price</h1>
                <p className="text-gray-600 mb-8">
                  Great photos help guests imagine staying at your place.
                </p>

                <div className="bg-white rounded-2xl p-8 border border-gray-200 space-y-8">
                  <div>
                    <h3 className="text-gray-900 mb-4">Photos</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-900 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-700 mb-2">Drag and drop photos here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                      <button className="mt-4 px-6 py-2 border border-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                        Upload Photos
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-200">
                    <h3 className="text-gray-900 mb-4">Set your price</h3>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                      <input
                        type="number"
                        value={listingData.price}
                        onChange={(e) => setListingData({ ...listingData, price: e.target.value })}
                        placeholder="100"
                        className="w-full pl-14 pr-4 py-4 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors text-2xl"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        per night
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      This is the base price. You can adjust it for specific dates.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="max-w-2xl mx-auto mt-12 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Step {currentStep} of 5
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              className="px-8 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              {currentStep === 5 ? 'Submit Listing' : 'Continue'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Counter({ label, value, onChange, step = 1 }: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <div className="flex items-center justify-between pb-6 border-b border-gray-200">
      <span className="text-gray-900">{label}</span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(step, value - step))}
          disabled={value <= step}
          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-12 text-center text-gray-900">{value}</span>
        <button
          onClick={() => onChange(value + step)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
