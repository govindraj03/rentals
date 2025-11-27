import { useState } from 'react';
import { ChevronLeft, CreditCard, Shield, Star, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CheckoutProps {
  onBack: () => void;
}

type Step = 1 | 2 | 3;

export function Checkout({ onBack }: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-gray-900 mb-4">Booking confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Your reservation is confirmed. We've sent a confirmation email with all the details.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
          >
            View booking
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-screen-lg mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-6 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Form */}
          <div>
            <h1 className="text-gray-900 mb-8">Confirm and pay</h1>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-1 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-gray-900 mb-4">Your trip</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Dates</div>
                          <div className="text-gray-900">Dec 15 – 20</div>
                        </div>
                        <button className="text-sm underline">Edit</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Guests</div>
                          <div className="text-gray-900">2 guests</div>
                        </div>
                        <button className="text-sm underline">Edit</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-gray-900 mb-4">Who's coming?</h2>
                    <input
                      type="text"
                      placeholder="Full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors mb-3"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors mb-3"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-gray-900 mb-4">Message the host</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Let Sarah know a little about yourself and why you're coming
                    </p>
                    <textarea
                      placeholder="Tell your host about your trip..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors resize-none"
                    />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-gray-900 mb-4">Cancellation policy</h2>
                    <p className="text-gray-700 mb-3">
                      Free cancellation before Dec 10. Cancel before check-in on Dec 15 for a partial refund.
                    </p>
                    <button className="text-sm underline">Learn more</button>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Pay with
                    </h2>
                    <div className="space-y-3 mb-6">
                      <PaymentOption selected>Credit or debit card</PaymentOption>
                      <PaymentOption>PayPal</PaymentOption>
                      <PaymentOption>Google Pay</PaymentOption>
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Billing postal code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#FF385C] flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-gray-900 mb-1">Your payment is secure</h3>
                        <p className="text-sm text-gray-600">
                          We use secure encryption to protect your payment information.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContinue}
              disabled={isSubmitting}
              className="w-full mt-8 py-4 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </span>
              ) : currentStep === 3 ? (
                'Confirm and pay'
              ) : (
                'Continue'
              )}
            </motion.button>
          </div>

          {/* Right Column - Summary */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                {/* Listing Preview */}
                <div className="flex gap-4 pb-6 border-b border-gray-200">
                  <div className="w-28 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Listing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Entire apartment</div>
                    <div className="text-gray-900 mt-1">Modern Downtown Loft</div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-sm">4.94 (127 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Price Details */}
                <div className="pt-6 space-y-3">
                  <h3 className="text-gray-900 mb-4">Price details</h3>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>$189 x 5 nights</span>
                    <span>$945</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Cleaning fee</span>
                    <span>$45</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700">
                    <span>Service fee</span>
                    <span>$68</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Total (USD)</span>
                      <span className="text-gray-900">$1,058</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Price Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-gray-900">Total</div>
            <div className="text-sm text-gray-600">$1,058</div>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : currentStep === 3 ? 'Pay' : 'Continue'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function PaymentOption({ children, selected = false }: { children: React.ReactNode; selected?: boolean }) {
  return (
    <button
      className={`w-full px-4 py-3 rounded-lg border transition-colors text-left ${
        selected
          ? 'border-gray-900 bg-gray-50'
          : 'border-gray-300 hover:border-gray-900'
      }`}
    >
      {children}
    </button>
  );
}
