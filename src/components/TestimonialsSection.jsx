import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function TestimonialsSection() {
  const { testimonials } = useSiteData();

  return (
    <section id="reviews" style={{ padding: '5rem 0', backgroundColor: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#00b67a',
            color: '#ffffff',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            <span>Trustpilot</span>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="#ffffff" stroke="none" />
              ))}
            </div>
            <span>4.8 / 5 Rating</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', color: 'var(--color-secondary-950)', marginBottom: '0.75rem' }}>
            Loved by 3.2+ Million Website Owners
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-600)' }}>
            Read real feedback from developers, agency owners, and entrepreneurs who trust Gofayda.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.map(t => (
            <div
              key={t.id}
              className="card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                backgroundColor: 'var(--color-neutral-50)'
              }}
            >
              <div>
                {/* Star Rating & Quote Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', color: 'var(--color-accent-500)', gap: '2px' }}>
                    {[...Array(t.stars || 5)].map((_, i) => (
                      <Star key={i} size={16} fill="var(--color-accent-500)" stroke="none" />
                    ))}
                  </div>
                  <Quote size={24} color="var(--color-secondary-200)" />
                </div>

                <p style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-neutral-800)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '1.75rem'
                }}>
                  "{t.text}"
                </p>
              </div>

              {/* User Avatar & Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <div style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'bold',
                    color: 'var(--color-secondary-950)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}>
                    {t.name}
                    {t.verified && <CheckCircle size={14} color="#00b67a" />}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-500)' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
