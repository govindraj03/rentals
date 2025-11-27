import { motion } from 'motion/react';
import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

export function AirbnbFooter() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="px-6 lg:px-20 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-700 hover:underline">Help Center</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">AirCover</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Disability support</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Cancellation options</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Report neighborhood concern</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-700 hover:underline">List your property</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Hosting resources</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Community forum</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Hosting responsibly</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Join a free Hosting class</a></li>
            </ul>
          </div>

          {/* Eazypg */}
          <div>
            <h3 className="font-semibold mb-4">Eazypg</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-700 hover:underline">Newsroom</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">New features</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Careers</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Investors</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Gift cards</a></li>
              <li><a href="#" className="text-gray-700 hover:underline">Emergency accommodations</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Side */}
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
              <span>© 2025 Eazypg</span>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Your Privacy Choices</a>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6">
              {/* Language & Currency */}
              <motion.button
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-4 h-4" />
                <span>English (IN)</span>
              </motion.button>

              <motion.button
                className="text-sm font-medium hover:underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ₹ INR
              </motion.button>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5 text-gray-700" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-5 h-5 text-gray-700" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5 text-gray-700" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
