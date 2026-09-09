import React, { useState, useEffect } from 'react';
import { Zap, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSiteData } from '../context/SiteDataContext';

export default function AnnouncementBar({ onClaimDeal }) {
  const { announcement } = useSiteData();
  const [timeLeft, setTimeLeft] = useState({
    days: announcement.timerDays || 2,
    hours: announcement.timerHours || 14,
    minutes: 35,
    seconds: 48
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.1 }
    });
    if (onClaimDeal) onClaimDeal();
    const pricingEl = document.getElementById('pricing');
    if (pricingEl) {
      pricingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pad = num => String(num).padStart(2, '0');

  return (
    <div style={{
      background: 'linear-gradient(90deg, #191032 0%, #4d2aad 50%, #0015d6 100%)',
      color: '#ffffff',
      fontSize: 'var(--font-size-sm)',
      padding: '0.5rem 1rem',
      position: 'relative',
      zIndex: 100
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        {/* Deal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'var(--font-weight-semibold)' }}>
          <span style={{
            background: 'var(--color-accent-400)',
            color: 'var(--color-accent-950)',
            padding: '0.15rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-bold)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <Zap size={12} /> {announcement.badgeText}
          </span>
          <span>{announcement.text}</span>
        </div>

        {/* Live Timer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-accent-300)', fontSize: 'var(--font-size-xs)' }}>
            <Clock size={14} />
            <span>ENDS IN:</span>
          </div>
          <div style={{ display: 'flex', gap: '0.25rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{pad(timeLeft.days)}d</span>:
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{pad(timeLeft.hours)}h</span>:
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{pad(timeLeft.minutes)}m</span>:
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--color-accent-400)' }}>{pad(timeLeft.seconds)}s</span>
          </div>

          <button
            onClick={handleClaim}
            style={{
              backgroundColor: 'var(--color-accent-400)',
              color: 'var(--color-accent-950)',
              fontWeight: 'var(--font-weight-bold)',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--font-size-xs)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginLeft: '0.5rem',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {announcement.ctaText} <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
