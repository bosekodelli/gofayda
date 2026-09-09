import React from 'react';
import { BILLING_CYCLES } from '../data/hostingData';
import { Sparkles } from 'lucide-react';

export default function BillingToggle({ activeCycle, onCycleChange }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '3rem'
    }}>
      <div style={{
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'bold',
        color: 'var(--color-secondary-600)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem'
      }}>
        <Sparkles size={14} /> SELECT YOUR BILLING PERIOD FOR EXTRA DISCOUNTS
      </div>

      <div style={{
        backgroundColor: 'var(--color-neutral-100)',
        padding: '0.35rem',
        borderRadius: 'var(--radius-full)',
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
        border: '1px solid var(--color-neutral-200)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {BILLING_CYCLES.map(cycle => {
          const isActive = activeCycle === cycle.id;
          return (
            <button
              key={cycle.id}
              onClick={() => onCycleChange(cycle.id)}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 'var(--font-weight-bold)',
                fontSize: 'var(--font-size-sm)',
                transition: 'all 0.25s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: isActive ? 'var(--color-secondary-500)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--color-neutral-800)',
                boxShadow: isActive ? '0 4px 12px rgba(91, 50, 205, 0.3)' : 'none'
              }}
            >
              <span>{cycle.label}</span>
              <span style={{
                fontSize: '0.65rem',
                padding: '0.15rem 0.45rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isActive ? 'var(--color-accent-400)' : 'var(--color-secondary-100)',
                color: isActive ? 'var(--color-accent-950)' : 'var(--color-secondary-700)',
                fontWeight: 'bold'
              }}>
                {cycle.discountLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
