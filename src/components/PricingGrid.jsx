import React from 'react';
import { CURRENCIES, BILLING_CYCLES } from '../data/hostingData';
import { Check, Zap, Server, Globe, Shield, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSiteData } from '../context/SiteDataContext';

export default function PricingGrid({ activeCurrency, activeCycle, onAddToCart }) {
  const { plans } = useSiteData();
  const curr = CURRENCIES[activeCurrency];
  const selectedCycleObj = BILLING_CYCLES.find(c => c.id === activeCycle) || BILLING_CYCLES[0];

  const calculatePrices = (plan) => {
    const monthlyPrice = Math.round(plan.baseMonthlyPriceINR * selectedCycleObj.factor * curr.rate);
    const regularPrice = Math.round(plan.regularMonthlyPriceINR * curr.rate);
    const savingsPercent = Math.round(((regularPrice - monthlyPrice) / regularPrice) * 100);
    return { monthlyPrice, regularPrice, savingsPercent };
  };

  const handleAdd = (plan) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    onAddToCart(plan);
  };

  return (
    <section id="pricing" style={{ padding: '3rem 0 5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            CHOICE OF MILLIONS WORLDWIDE
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-secondary-950)', marginBottom: '1rem' }}>
            Choose Your Web Hosting Plan
          </h2>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)' }}>
            All plans include SSL certificates, 24/7 support, and 99.9% uptime guarantee. Upgrade or downgrade anytime!
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}>
          {plans.map(plan => {
            const { monthlyPrice, regularPrice, savingsPercent } = calculatePrices(plan);

            return (
              <div
                key={plan.id}
                className={`card ${plan.popular ? 'card-popular' : ''}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.5rem 1.5rem 2rem 1.5rem',
                  position: 'relative',
                  backgroundColor: plan.popular ? 'var(--color-secondary-50)' : '#ffffff',
                  marginTop: plan.badge ? '1rem' : '0'
                }}
              >
                {/* Popular / Special Badge */}
                {plan.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: plan.popular ? 'var(--color-secondary-500)' : 'var(--color-accent-400)',
                    color: plan.popular ? '#ffffff' : 'var(--color-accent-950)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    padding: '0.4rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    whiteSpace: 'nowrap',
                    boxShadow: plan.popular 
                      ? '0 4px 14px rgba(83, 72, 212, 0.4)' 
                      : '0 4px 14px rgba(255, 190, 0, 0.4)',
                    letterSpacing: '0.06em',
                    zIndex: 10
                  }}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan Title & Tagline */}
                <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                  <h3 style={{
                    fontSize: 'var(--font-size-xl)',
                    color: 'var(--color-secondary-900)',
                    marginBottom: '0.5rem'
                  }}>
                    {plan.name}
                  </h3>
                  <p style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-neutral-600)',
                    minHeight: '36px'
                  }}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display Block */}
                <div style={{
                  borderTop: '1px solid var(--color-neutral-200)',
                  borderBottom: '1px solid var(--color-neutral-200)',
                  padding: '1.25rem 0',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{
                      textDecoration: 'line-through',
                      color: 'var(--color-neutral-400)',
                      fontSize: 'var(--font-size-sm)'
                    }}>
                      {curr.symbol}{regularPrice}
                    </span>
                    <span className="badge badge-accent" style={{ fontSize: '0.65rem' }}>
                      SAVE {savingsPercent}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                    <span style={{
                      fontSize: 'var(--font-size-3xl)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--color-secondary-950)',
                      lineHeight: 1
                    }}>
                      {curr.symbol}{monthlyPrice}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)' }}>
                      /mo
                    </span>
                  </div>

                  {selectedCycleObj.freeMonths > 0 && (
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-secondary-700)',
                      fontWeight: 'bold',
                      marginTop: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <Sparkles size={12} color="var(--color-secondary-500)" />
                      + {selectedCycleObj.freeMonths} Months FREE Included
                    </div>
                  )}
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={() => handleAdd({ ...plan, monthlyPrice, currency: curr.code, durationMonths: Number(selectedCycleObj.id) })}
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    width: '100%',
                    marginBottom: '1.75rem',
                    padding: '0.875rem 1rem',
                    fontSize: 'var(--font-size-base)'
                  }}
                >
                  Add to Cart <ArrowRight size={16} />
                </button>

                {/* Key Highlight Specs */}
                {plan.specs && (
                  <div style={{
                    backgroundColor: plan.popular ? '#ffffff' : 'var(--color-neutral-50)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--color-neutral-200)',
                    fontSize: 'var(--font-size-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', gap: '0.5rem', fontWeight: 'bold' }}>
                      <Globe size={14} color="var(--color-secondary-600)" />
                      <span>{plan.specs.websites}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Server size={14} color="var(--color-secondary-600)" />
                      <span>{plan.specs.storage}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Shield size={14} color="var(--color-secondary-600)" />
                      <span>{plan.specs.ssl}</span>
                    </div>
                  </div>
                )}

                {/* Features List */}
                {plan.features && (
                  <div style={{ flexGrow: 1 }}>
                    <div style={{
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      color: 'var(--color-neutral-500)',
                      marginBottom: '0.75rem',
                      letterSpacing: '0.05em'
                    }}>
                      Included Features:
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {plan.features.map((feat, idx) => (
                        <li key={idx} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-neutral-800)',
                          lineHeight: 1.4
                        }}>
                          <span style={{
                            backgroundColor: 'var(--color-success)',
                            color: '#1b6329',
                            borderRadius: '50%',
                            padding: '2px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '2px',
                            flexShrink: 0
                          }}>
                            <Check size={10} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
