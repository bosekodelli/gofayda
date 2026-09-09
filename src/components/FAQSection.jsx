import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

export default function FAQSection() {
  const { faqs } = useSiteData();
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="bg-purple-subtle" style={{ padding: '5rem 0' }}>
      <div className="container container-narrow">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            GOT QUESTIONS?
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-secondary-950)', marginBottom: '0.75rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-600)' }}>
            Everything you need to know about our web hosting plans, domain registration, and AI builder.
          </p>
        </div>

        {/* Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-neutral-200)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-card)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 'var(--font-size-base)',
                    color: isOpen ? 'var(--color-secondary-900)' : 'var(--color-neutral-900)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={18} color="var(--color-secondary-500)" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      color: 'var(--color-secondary-500)'
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem 3.25rem',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-neutral-700)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--color-neutral-100)'
                  }}>
                    {faq.answer}
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
