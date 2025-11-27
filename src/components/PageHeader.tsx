import { motion } from 'motion/react';
import { ChevronLeft, Globe, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { EazypgLogo } from './EazypgLogo';

interface PageHeaderProps {
  onBack: () => void;
  onAuthOpen?: (mode: 'signin' | 'signup') => void;
  title?: string;
}

export function PageHeader({ onBack, onAuthOpen, title }: PageHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Back Button & Logo */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>

            {title && (
              <h1 className="text-lg font-semibold hidden md:block">{title}</h1>
            )}
          </div>

          {/* Eazypg Logo - Center */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <EazypgLogo size="md" showText={true} onClick={onBack} />
          </div>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
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

              {showUserMenu && onAuthOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm">
                      Help Center
                    </button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
