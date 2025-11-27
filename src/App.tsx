import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AirbnbHome } from './components/AirbnbHome';
import { AirbnbSearchResults } from './components/AirbnbSearchResults';
import { ListingDetail } from './components/ListingDetail';
import { Checkout } from './components/Checkout';
import { Auth } from './components/Auth';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { BecomeHostPage } from './components/BecomeHostPage';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

type Page = 'home' | 'search' | 'listing' | 'checkout' | 'contact' | 'about' | 'host';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedListing, setSelectedListing] = useState<number | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(true);

  // Initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Update document title
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'Eazypg - Find Your Perfect PG Accommodation',
      search: 'Search Results - Eazypg',
      listing: 'Property Details - Eazypg',
      checkout: 'Checkout - Eazypg',
      contact: 'Contact Us - Eazypg',
      about: 'About Us - Eazypg',
      host: 'Become a Host - Eazypg'
    };
    document.title = titles[currentPage];
  }, [currentPage]);

  const navigateTo = (page: Page, listingId?: number) => {
    setCurrentPage(page);
    if (listingId !== undefined) {
      setSelectedListing(listingId);
    }
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAuthOpen = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const showFooter = !['checkout', 'home'].includes(currentPage);

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentPage === 'home' && (
            <AirbnbHome 
              onSearch={() => navigateTo('search')}
              onAuthOpen={handleAuthOpen}
              onSelectListing={(id) => navigateTo('listing', id)}
              onNavigate={(page) => navigateTo(page as Page)}
            />
          )}
          {currentPage === 'search' && (
            <AirbnbSearchResults 
              onSelectListing={(id) => navigateTo('listing', id)}
              onBack={() => navigateTo('home')}
              onAuthOpen={handleAuthOpen}
              onNavigate={(page) => navigateTo(page as Page)}
            />
          )}
          {currentPage === 'listing' && selectedListing !== null && (
            <ListingDetail 
              listingId={selectedListing} 
              onBook={() => navigateTo('checkout')}
              onBack={() => navigateTo('search')}
            />
          )}
          {currentPage === 'checkout' && (
            <Checkout onBack={() => navigateTo('listing', selectedListing!)} />
          )}
          {currentPage === 'contact' && (
            <ContactPage 
              onBack={() => navigateTo('home')}
              onAuthOpen={handleAuthOpen}
            />
          )}
          {currentPage === 'about' && (
            <AboutPage 
              onBack={() => navigateTo('home')}
              onAuthOpen={handleAuthOpen}
            />
          )}
          {currentPage === 'host' && (
            <BecomeHostPage 
              onBack={() => navigateTo('home')}
              onAuthOpen={handleAuthOpen}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showFooter && <Footer onNavigate={(page) => navigateTo(page as Page)} />}

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <Auth 
            onClose={() => setShowAuth(false)} 
            initialMode={authMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
