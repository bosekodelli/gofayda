import React, { useState } from 'react';
import { ShoppingCart, Globe, ChevronDown, User, Zap, Check, Palette, ShieldCheck } from 'lucide-react';
import { CURRENCIES, THEME_PRESETS } from '../data/hostingData';

export default function Navbar({ activeCurrency, onCurrencyChange, cartCount, onOpenCart, activeTheme, onThemeChange, onOpenAdmin }) {
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--color-neutral-200)',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      boxShadow: 'var(--shadow-xl)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Hostinger / Gofayda Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(91, 50, 205, 0.3)'
          }}>
            <Zap size={22} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-family-display)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-secondary-900)',
              letterSpacing: '-0.03em'
            }}>
              GOFAYDA
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-secondary-500)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1
            }}>
              WEB HOSTING & CLOUD
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-6)'
        }} className="desktop-nav">
          <button 
            onClick={() => scrollToSection('pricing')}
            style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-800)', fontSize: 'var(--font-size-sm)' }}
            className="btn-ghost"
          >
            Web Hosting
          </button>
          <button 
            onClick={() => scrollToSection('domains')}
            style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-800)', fontSize: 'var(--font-size-sm)' }}
            className="btn-ghost"
          >
            Domain Search
          </button>
          <button 
            onClick={() => scrollToSection('reviews')}
            style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-800)', fontSize: 'var(--font-size-sm)' }}
            className="btn-ghost"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-800)', fontSize: 'var(--font-size-sm)' }}
            className="btn-ghost"
          >
            FAQs
          </button>
        </nav>

        {/* Actions (Theme, Currency, Cart, Admin, Login) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          {/* Theme Preset Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setThemeDropdownOpen(!themeDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-accent-400)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-neutral-900)',
                backgroundColor: 'var(--color-accent-100)'
              }}
              title="Change Color Theme"
            >
              <Palette size={14} color="var(--color-secondary-600)" />
              <span>Theme</span>
              <ChevronDown size={12} />
            </button>

            {themeDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                width: '240px',
                zIndex: 100,
                padding: '0.5rem 0'
              }}>
                <div style={{ padding: '0.35rem 0.75rem', fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>
                  Select Website Theme
                </div>
                {Object.keys(THEME_PRESETS).map(key => {
                  const theme = THEME_PRESETS[key];
                  const isSel = activeTheme === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        onThemeChange(key);
                        setThemeDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '0.5rem 0.75rem',
                        textAlign: 'left',
                        fontSize: 'var(--font-size-xs)',
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        backgroundColor: isSel ? 'var(--color-secondary-50)' : 'transparent',
                        color: isSel ? 'var(--color-secondary-700)' : 'var(--color-neutral-800)',
                        fontWeight: isSel ? 'bold' : 'normal'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: theme.secondary500,
                          border: `2px solid ${theme.accent400}`
                        }}></div>
                        <span>{theme.name}</span>
                      </div>
                      {isSel && <Check size={12} color="var(--color-secondary-600)" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setThemeDropdownOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-neutral-200)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-neutral-800)',
                backgroundColor: 'var(--color-neutral-50)'
              }}
            >
              <Globe size={14} color="var(--color-secondary-500)" />
              <span>{CURRENCIES[activeCurrency].symbol} {activeCurrency}</span>
              <ChevronDown size={12} />
            </button>

            {currencyDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                backgroundColor: '#ffffff',
                border: '1px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                width: '180px',
                zIndex: 100,
                padding: '0.5rem 0'
              }}>
                {Object.keys(CURRENCIES).map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      onCurrencyChange(key);
                      setCurrencyDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      fontSize: 'var(--font-size-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      backgroundColor: activeCurrency === key ? 'var(--color-secondary-50)' : 'transparent',
                      color: activeCurrency === key ? 'var(--color-secondary-700)' : 'var(--color-neutral-800)',
                      fontWeight: activeCurrency === key ? 'bold' : 'normal'
                    }}
                  >
                    <span>{CURRENCIES[key].label}</span>
                    {activeCurrency === key && <Check size={12} color="var(--color-secondary-600)" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cart Icon Button */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              padding: '0.5rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--color-secondary-900)',
              backgroundColor: 'var(--color-secondary-50)',
              border: '1px solid var(--color-secondary-200)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              transition: 'background-color 0.2s'
            }}
            title="View Cart"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: 'var(--color-accent-500)',
                color: 'var(--color-accent-950)',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Log In Button */}
          <button className="btn btn-outline btn-sm">
            <User size={14} /> Log In
          </button>
        </div>
      </div>
    </header>
  );
}
