import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Globe, Menu, User, X } from 'lucide-react';
import { EazypgLogo } from './EazypgLogo';

interface AirbnbHeaderProps {
  onSearch: () => void;
  onAuthOpen: (mode: 'signin' | 'signup') => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function AirbnbHeader({ onSearch, onAuthOpen, onNavigate, currentPage }: AirbnbHeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState<'stays' | 'experiences'>('stays');

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <EazypgLogo size="md" showText={true} onClick={() => onNavigate?.('home')} />

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            {!isSearchExpanded ? (
              <motion.button
                onClick={() => setIsSearchExpanded(true)}
                className="w-full flex items-center justify-between px-6 py-3 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow bg-white"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-sm">Anywhere</span>
                  <span className="w-px h-6 bg-gray-300"></span>
                  <span className="font-medium text-sm">Any week</span>
                  <span className="w-px h-6 bg-gray-300"></span>
                  <span className="text-sm text-gray-600">Add guests</span>
                </div>
                <div className="bg-[#FF385C] p-2 rounded-full">
                  <Search className="w-4 h-4 text-white" />
                </div>
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-full border border-gray-300 shadow-xl p-2"
              >
                <div className="flex items-center gap-2 mb-4 px-4">
                  <button
                    onClick={() => setActiveSearchTab('stays')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSearchTab === 'stays'
                        ? 'bg-white shadow-md'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Stays
                  </button>
                  <button
                    onClick={() => setActiveSearchTab('experiences')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      activeSearchTab === 'experiences'
                        ? 'bg-white shadow-md'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Experiences
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 px-6 py-3 border-r hover:bg-gray-50 rounded-l-full cursor-pointer">
                    <label className="block text-xs font-bold mb-1">Where</label>
                    <input
                      type="text"
                      placeholder="Search destinations"
                      className="w-full outline-none bg-transparent text-sm"
                      autoFocus
                    />
                  </div>
                  <div className="flex-1 px-6 py-3 border-r hover:bg-gray-50 cursor-pointer">
                    <label className="block text-xs font-bold mb-1">Check in</label>
                    <input
                      type="text"
                      placeholder="Add dates"
                      className="w-full outline-none bg-transparent text-sm"
                    />
                  </div>
                  <div className="flex-1 px-6 py-3 border-r hover:bg-gray-50 cursor-pointer">
                    <label className="block text-xs font-bold mb-1">Check out</label>
                    <input
                      type="text"
                      placeholder="Add dates"
                      className="w-full outline-none bg-transparent text-sm"
                    />
                  </div>
                  <div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-r-full cursor-pointer flex items-center justify-between">
                    <div>
                      <label className="block text-xs font-bold mb-1">Who</label>
                      <input
                        type="text"
                        placeholder="Add guests"
                        className="w-full outline-none bg-transparent text-sm"
                      />
                    </div>
                    <motion.button
                      onClick={() => {
                        setIsSearchExpanded(false);
                        onSearch();
                      }}
                      className="bg-[#FF385C] p-4 rounded-full ml-2 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Search className="w-4 h-4 text-white" />
                      <span className="text-white font-medium text-sm pr-1">Search</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mobile Search Button */}
          <motion.button
            onClick={onSearch}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 shadow-sm"
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-4 h-4" />
            <div className="text-left">
              <div className="text-sm font-medium">Anywhere</div>
              <div className="text-xs text-gray-600">Any week · Add guests</div>
            </div>
          </motion.button>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => onNavigate?.('host')}
              className="hidden lg:block text-sm font-medium px-4 py-3 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              List your property
            </motion.button>

            <motion.button
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-4 h-4" />
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-full border border-gray-300 hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Menu className="w-4 h-4" />
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <button
                        onClick={() => {
                          onAuthOpen('signup');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 font-medium text-sm"
                      >
                        Sign up
                      </button>
                      <button
                        onClick={() => {
                          onAuthOpen('signin');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                      >
                        Log in
                      </button>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button 
                        onClick={() => {
                          onNavigate?.('host');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                      >
                        List your property
                      </button>
                      <button 
                        onClick={() => {
                          onNavigate?.('contact');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                      >
                        Help Center
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when search expanded */}
      <AnimatePresence>
        {isSearchExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[-1]"
            onClick={() => setIsSearchExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
