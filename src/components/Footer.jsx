import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';
import { CURRENCIES } from '../data/hostingData';

export default function Footer({ activeCurrency, onCurrencyChange, onOpenAdmin }) {
  return (
    <footer style={{
      backgroundColor: 'var(--color-secondary-950)',
      color: '#ffffff',
      paddingTop: '4rem',
      paddingBottom: '2rem',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <div className="container">
        {/* Main Footer Link Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-secondary-500), var(--color-primary-500))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 'bold'
              }}>
                <Zap size={20} />
              </div>
              <span style={{
                fontFamily: 'var(--font-family-display)',
                fontSize: 'var(--font-size-xl)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: '-0.03em'
              }}>
                GOFAYDA
              </span>
            </div>
            <p style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-neutral-400)',
              lineHeight: 1.6,
              maxWidth: '320px',
              marginBottom: '1.25rem'
            }}>
              We are a web hosting provider on a mission to bring success to everyone who goes online. We constantly improve server technology, provide professional support, and streamline website creation.
            </p>
          </div>

          {/* Hosting Column */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Hosting
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-400)' }}>
              <li><a href="#pricing" style={{ transition: 'color 0.2s' }}>Web Hosting</a></li>
              <li><a href="#pricing">VPS Hosting</a></li>
              <li><a href="#pricing">Cloud Hosting</a></li>
              <li><a href="#pricing">WordPress Hosting</a></li>
              <li><a href="#pricing">Agency Hosting</a></li>
            </ul>
          </div>

          {/* Domain Column */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Domain
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-400)' }}>
              <li><a href="#domains">Domain Name Search</a></li>
              <li><a href="#domains">Free Domain (.com, .in)</a></li>
              <li><a href="#domains">Domain Transfer</a></li>
              <li><a href="#domains">WHOIS Lookup</a></li>
              <li><a href="#domains">Free SSL Certificate</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 style={{ fontSize: 'var(--font-size-sm)', color: '#ffffff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-400)' }}>
              <li><a href="#pricing">Managed WordPress</a></li>
              <li><a href="#reviews">Customer Reviews</a></li>
              <li><a href="#faq">Knowledge Base</a></li>
              <li><a href="#hero">System Status</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Icons & Copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-neutral-400)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>© {new Date().getFullYear()} Gofayda Technologies Ltd. All rights reserved.</span>
            <button
              onClick={onOpenAdmin}
              title="Staff Portal"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.12)',
                cursor: 'pointer',
                padding: '0.2rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.12)'}
            >
              <ShieldCheck size={12} />
            </button>
          </div>

          {/* Payment Methods Badges */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>VISA</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>Mastercard</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>UPI / GPay</span>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontWeight: 'bold' }}>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
