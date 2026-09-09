import React from 'react';
import { ShieldCheck, Zap, ArrowRight, CheckCircle2, Star, Sparkles, Globe, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CURRENCIES } from '../data/hostingData';
import { useSiteData } from '../context/SiteDataContext';

export default function HeroSection({ activeCurrency, onSelectPlan }) {
  const { hero } = useSiteData();
  const curr = CURRENCIES[activeCurrency];
  const priceFormatted = `${curr.symbol}${Math.round((hero.startingPriceINR || 69) * curr.rate)}`;

  const handleClaimDeal = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.2 }
    });
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-hero" style={{ padding: '4rem 0 5rem 0' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '3rem',
        alignItems: 'center'
      }}>
        {/* Hero Left Content */}
        <div>
          {/* Badge */}
          <div style={{ marginBottom: '1.25rem' }}>
            <span className="badge badge-purple-pill" style={{ padding: '0.4rem 1rem', fontSize: 'var(--font-size-xs)' }}>
              <Sparkles size={14} /> {hero.badge}
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            color: '#ffffff',
            marginBottom: '1.25rem',
            lineHeight: 1.15,
            fontWeight: 'var(--font-weight-bold)'
          }}>
            {hero.titlePrefix}{' '}
            <span style={{
              background: 'linear-gradient(90deg, #f4bb49, #eba314)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {hero.titleHighlight}
            </span>
          </h1>

          <p style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-neutral-300)',
            marginBottom: '2rem',
            maxWidth: '540px',
            lineHeight: 1.6
          }}>
            {hero.subtitle}
          </p>

          {/* Pricing Highlight Box */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem 1.5rem',
            marginBottom: '2rem',
            backdropFilter: 'blur(10px)',
            display: 'inline-block'
          }}>
            <div style={{ fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', color: 'var(--color-accent-400)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
              Special Web Hosting Price
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', margin: '0.25rem 0' }}>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-400)' }}>From</span>
              <span style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', color: '#ffffff', lineHeight: 1 }}>
                {priceFormatted}
              </span>
              <span style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-300)' }}>/mo</span>
              {hero.freeMonthsTag && (
                <span style={{
                  backgroundColor: 'var(--color-accent-400)',
                  color: 'var(--color-accent-950)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'bold',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {hero.freeMonthsTag}
                </span>
              )}
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-300)' }}>
              Renewable at regular rate • 30-Day Money-Back Guarantee
            </div>
          </div>

          {/* CTA Group */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <button onClick={handleClaimDeal} className="btn btn-accent btn-lg animate-pulse-glow">
              {hero.ctaText || 'Claim Deal'} <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => {
                const el = document.getElementById('domains');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="btn btn-outline btn-lg" 
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Search Domains
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-200)' }}>
              <ShieldCheck size={18} color="var(--color-accent-400)" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-accent-400)' }}>
              <Zap size={18} color="var(--color-accent-400)" />
              <span>24/7 Live Customer Support</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-200)' }}>
              <CheckCircle2 size={18} color="var(--color-accent-400)" />
              <span>99.9% Uptime Guarantee</span>
            </div>
          </div>
        </div>

        {/* Hero Right Visual / Dashboard Preview */}
        <div style={{ position: 'relative' }} className="animate-float">
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
            borderRadius: 'var(--radius-2xl)',
            padding: '1.75rem',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)'
          }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
              </div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-neutral-400)',
                background: 'rgba(0,0,0,0.3)',
                padding: '0.2rem 0.75rem',
                borderRadius: 'var(--radius-full)'
              }}>
                panel.gofayda.com
              </div>
            </div>

            {/* Dashboard Cards Grid inside Preview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-400)', fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>
                  <Zap size={14} /> PERFORMANCE
                </div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: '#ffffff', margin: '0.25rem 0' }}>99 / 100</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-success)' }}>LiteSpeed Engine Powered</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-300)', fontSize: 'var(--font-size-xs)', fontWeight: 'bold' }}>
                  <Lock size={14} /> SECURITY
                </div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: '#ffffff', margin: '0.25rem 0' }}>ACTIVE</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-neutral-300)' }}>Unlimited Free SSL</div>
              </div>
            </div>

            {/* Domain Status row */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Globe size={20} color="var(--color-accent-400)" />
                <div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: '#ffffff' }}>mybrandwebsite.com</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)' }}>Free Domain Included</div>
                </div>
              </div>
              <span className="badge badge-success">READY</span>
            </div>

            {/* Floating Trust Rating Pill */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '20px',
              backgroundColor: '#ffffff',
              color: 'var(--color-neutral-900)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'bold'
            }}>
              <div style={{ display: 'flex', color: '#00b67a' }}>
                <Star size={14} fill="#00b67a" />
                <Star size={14} fill="#00b67a" />
                <Star size={14} fill="#00b67a" />
                <Star size={14} fill="#00b67a" />
                <Star size={14} fill="#00b67a" />
              </div>
              <span>4.8/5 on Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
