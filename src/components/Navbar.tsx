import { Search, Globe, Menu, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  onSearch: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onAuthOpen: (mode: 'signin' | 'signup') => void;
}

export function Navbar({ onSearch, currentPage, onNavigate, onAuthOpen }: NavbarProps) {
  const isScrolled = currentPage !== 'home';
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.nav
      initial={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-md border-b border-gray-200' : 'border-b border-gray-100'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <svg className="w-8 h-8 text-[#FF385C]" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 1c2 0 3.46 1.46 3.46 3.46 0 2.16-1.52 4.62-2.8 6.46-.32.48-.96.48-1.28 0-1.28-1.84-2.8-4.3-2.8-6.46C12.54 2.46 14 1 16 1zm0 11.32c.96 0 1.74.78 1.74 1.74v11.2c0 .96-.78 1.74-1.74 1.74-.96 0-1.74-.78-1.74-1.74v-11.2c0-.96.78-1.74 1.74-1.74zM8.54 16.54c1.38-1.38 3.62-1.38 5 0 1.38 1.38 1.38 3.62 0 5l-4.3 4.3c-1.38 1.38-3.62 1.38-5 0-1.38-1.38-1.38-3.62 0-5l4.3-4.3zm14.92 0l4.3 4.3c1.38 1.38 1.38 3.62 0 5-1.38 1.38-3.62 1.38-5 0l-4.3-4.3c-1.38-1.38-1.38-3.62 0-5 1.38-1.38 3.62-1.38 5 0z" />
            </svg>
            <span className="text-[#FF385C] ml-1">eazypg</span>
          </button>

          {/* Search Bar */}
          <motion.button
            onClick={onSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:flex items-center gap-4 px-6 py-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <span className="text-gray-800">Anywhere</span>
            <div className="w-px h-6 bg-gray-300" />
            <span className="text-gray-800">Any week</span>
            <div className="w-px h-6 bg-gray-300" />
            <span className="text-gray-500">Add guests</span>
            <div className="bg-[#FF385C] p-2 rounded-full">
              <Search className="w-4 h-4 text-white" />
            </div>
          </motion.button>

          {/* Right Menu */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('host')}
              className="hidden md:block px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Become a Host
            </button>
            <button className="p-3 rounded-full hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
              >
                <Menu className="w-4 h-4" />
                <div className="w-7 h-7 bg-gray-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  <button 
                    onClick={() => {
                      onAuthOpen('signin');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => {
                      onAuthOpen('signup');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    Sign up
                  </button>
                  <div className="border-t border-gray-200 my-2" />
                  <button 
                    onClick={() => {
                      onNavigate('host');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    List your property
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate('contact');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    Help Center
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate('about');
                      setShowMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    About
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <button
        onClick={onSearch}
        className="md:hidden w-full px-6 pb-4"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-gray-300 shadow-sm">
          <Search className="w-5 h-5 text-gray-500" />
          <div>
            <div className="text-gray-800">Where to?</div>
            <div className="text-xs text-gray-500">Anywhere • Any week • Add guests</div>
          </div>
        </div>
      </button>
    </motion.nav>
  );
}
