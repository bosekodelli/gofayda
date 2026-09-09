import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BillingToggle from './components/BillingToggle';
import PricingGrid from './components/PricingGrid';
import DomainSearchWidget from './components/DomainSearchWidget';
import FeatureComparisonTable from './components/FeatureComparisonTable';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AdminModal from './components/admin/AdminModal';
import AdminAuthModal from './components/admin/AdminAuthModal';
import { SiteDataProvider } from './context/SiteDataContext';
import { isValidSession, clearSession } from './utils/security';

function MainAppContent() {
  const [activeCurrency, setActiveCurrency] = useState('INR');
  const [activeCycle, setActiveCycle] = useState('48');
  const [activeTheme, setActiveTheme] = useState('indigo');
  const [cartItems, setCartItems] = useState([
    {
      id: 'premium-init',
      name: 'Premium Web Hosting (48 Months)',
      monthlyPrice: 149,
      currency: 'INR',
      durationMonths: 48,
      type: 'hosting'
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Apply Theme CSS variables dynamically when activeTheme changes
  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === 'indigo') {
      root.style.setProperty('--color-primary-500', '#6e3ce6');
      root.style.setProperty('--color-secondary-500', '#5348d4');
      root.style.setProperty('--color-secondary-600', '#4035b3');
      root.style.setProperty('--color-secondary-900', '#16104c');
      root.style.setProperty('--color-secondary-950', '#0a0728');
      root.style.setProperty('--color-accent-400', '#ffbe00');
      root.style.setProperty('--color-accent-500', '#ffab00');
      root.style.setProperty('--color-accent-950', '#381e00');
    } else if (activeTheme === 'sapphire') {
      root.style.setProperty('--color-primary-500', '#0066ff');
      root.style.setProperty('--color-secondary-500', '#0f387a');
      root.style.setProperty('--color-secondary-600', '#0b2b61');
      root.style.setProperty('--color-secondary-900', '#071b3d');
      root.style.setProperty('--color-secondary-950', '#040d21');
      root.style.setProperty('--color-accent-400', '#00e5ff');
      root.style.setProperty('--color-accent-500', '#00b8cc');
      root.style.setProperty('--color-accent-950', '#00333d');
    } else if (activeTheme === 'cyber') {
      root.style.setProperty('--color-primary-500', '#9d00ff');
      root.style.setProperty('--color-secondary-500', '#5a0099');
      root.style.setProperty('--color-secondary-600', '#460078');
      root.style.setProperty('--color-secondary-900', '#2a0047');
      root.style.setProperty('--color-secondary-950', '#150024');
      root.style.setProperty('--color-accent-400', '#ff007f');
      root.style.setProperty('--color-accent-500', '#d9006c');
      root.style.setProperty('--color-accent-950', '#38001a');
    } else if (activeTheme === 'emerald') {
      root.style.setProperty('--color-primary-500', '#00b87c');
      root.style.setProperty('--color-secondary-500', '#125441');
      root.style.setProperty('--color-secondary-600', '#0d3d2f');
      root.style.setProperty('--color-secondary-900', '#092920');
      root.style.setProperty('--color-secondary-950', '#041410');
      root.style.setProperty('--color-accent-400', '#ffc72c');
      root.style.setProperty('--color-accent-500', '#e0a814');
      root.style.setProperty('--color-accent-950', '#382600');
    }
  }, [activeTheme]);

  // Handler to open Admin panel safely
  const handleOpenAdmin = () => {
    if (isValidSession()) {
      setIsAdminModalOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  // Keyboard shortcut Ctrl+Shift+A and URL hash #admin listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        handleOpenAdmin();
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        handleOpenAdmin();
      }
    };

    if (window.location.hash === '#admin') {
      handleOpenAdmin();
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Announcement Bar */}
      <AnnouncementBar onClaimDeal={() => setIsCartOpen(true)} />

      {/* Main Navbar */}
      <Navbar
        activeCurrency={activeCurrency}
        onCurrencyChange={setActiveCurrency}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
      />

      {/* Hero Section */}
      <HeroSection
        activeCurrency={activeCurrency}
        onSelectPlan={(plan) => handleAddToCart(plan)}
      />

      {/* Main Pricing Section Container */}
      <div id="pricing-wrapper" style={{ paddingTop: '4rem' }}>
        <BillingToggle
          activeCycle={activeCycle}
          onCycleChange={setActiveCycle}
        />
        <PricingGrid
          activeCurrency={activeCurrency}
          activeCycle={activeCycle}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* Domain Search Checker Widget */}
      <DomainSearchWidget
        activeCurrency={activeCurrency}
        onAddToCart={handleAddToCart}
      />

      {/* Specs & Feature Comparison Table */}
      <FeatureComparisonTable />

      {/* Customer Testimonials & Reviews */}
      <TestimonialsSection />

      {/* FAQ Accordion Section */}
      <FAQSection />

      {/* Footer */}
      <Footer
        activeCurrency={activeCurrency}
        onCurrencyChange={setActiveCurrency}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
        activeCurrency={activeCurrency}
      />

      {/* Admin Security Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => {
          setIsAdminAuthOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, null, ' ');
          }
        }}
        onAuthenticated={() => {
          setIsAdminAuthOpen(false);
          setIsAdminModalOpen(true);
        }}
      />

      {/* Admin Dashboard Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, null, ' ');
          }
        }}
        onLogout={() => {
          setIsAdminModalOpen(false);
          setIsAdminAuthOpen(false);
          if (window.location.hash === '#admin') {
            history.replaceState(null, null, ' ');
          }
        }}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <MainAppContent />
    </SiteDataProvider>
  );
}
