import { motion } from 'motion/react';
import { Users, Globe, Heart, Shield, TrendingUp, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageHeader } from './PageHeader';

interface AboutPageProps {
  onBack: () => void;
  onAuthOpen?: (mode: 'signin' | 'signup') => void;
}

export function AboutPage({ onBack, onAuthOpen }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader onBack={onBack} onAuthOpen={onAuthOpen} title="About Us" />
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NjQxNzc4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="About Eazypg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-6"
          >
            <h1 className="text-white mb-6">One community. Millions of possibilities.</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Founded in 2024, Eazypg connects millions of people to comfortable and affordable PG accommodations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            To create a world where anyone can belong anywhere, providing healthy travel that is local, 
            authentic, diverse, inclusive and sustainable.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <StatCard
            number="5M+"
            label="Active Hosts"
            delay={0.3}
          />
          <StatCard
            number="1.5B+"
            label="Guest Arrivals"
            delay={0.4}
          />
          <StatCard
            number="220+"
            label="Countries"
            delay={0.5}
          />
          <StatCard
            number="100K+"
            label="Cities"
            delay={0.6}
          />
        </div>

        {/* Values */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from building products to serving our community.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={Users}
              title="Champion the Mission"
              description="We're united with our community to create a world where anyone can belong anywhere."
              delay={0.8}
            />
            <ValueCard
              icon={Heart}
              title="Be a Host"
              description="We're passionate about hospitality and creating a welcoming environment for everyone."
              delay={0.9}
            />
            <ValueCard
              icon={Globe}
              title="Embrace the Adventure"
              description="We're curious, creative, and always open to new ideas and experiences."
              delay={1.0}
            />
            <ValueCard
              icon={Shield}
              title="Be a Cereal Entrepreneur"
              description="We're resourceful and determined to succeed, even in challenging times."
              delay={1.1}
            />
            <ValueCard
              icon={TrendingUp}
              title="Simplify"
              description="We value clarity and focus on what matters most to deliver the best experience."
              delay={1.2}
            />
            <ValueCard
              icon={Award}
              title="Every Frame Matters"
              description="We care deeply about quality and craftsmanship in everything we create."
              delay={1.3}
            />
          </div>
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-12 lg:p-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  In 2024, we started Eazypg with a simple mission: make finding quality PG accommodations 
                  easy and hassle-free. Now, thousands of students and working professionals have found their 
                  perfect home away from home through our platform.
                </p>
                <p>
                  We&apos;ve expanded to include verified listings, flexible booking options, and more. But our 
                  mission remains the same: to help people find comfortable, affordable, and safe PG accommodations 
                  wherever they need them.
                </p>
                <p>
                  Today, Eazypg has grown into a trusted community connecting property owners with those seeking 
                  quality accommodations. We&apos;re building a more transparent, secure, and convenient rental 
                  experience for everyone.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQxOTkzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Story 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1597475681177-809cfdc76cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdXNlJTIwb2NlYW58ZW58MXx8fHwxNzY0MTk0MDY4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Story 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRyb29tJTIwaG90ZWx8ZW58MXx8fHwxNzY0MjA0MzIwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Story 3"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1475087542963-13ab5e611954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhYmluJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY0MjU0MjE2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Story 4"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to travel or share your space, we'd love to have you join us.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#FF385C] text-white rounded-lg hover:bg-[#E31C5F] transition-colors"
            >
              Become a Host
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore Stays
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ number, label, delay }: {
  number: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl"
    >
      <div className="text-[#FF385C] mb-2">{number}</div>
      <div className="text-gray-700">{label}</div>
    </motion.div>
  );
}

function ValueCard({ icon: Icon, title, description, delay }: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 bg-white border border-gray-200 rounded-2xl hover:shadow-lg transition-all"
    >
      <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-[#FF385C]" />
      </div>
      <h3 className="text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
