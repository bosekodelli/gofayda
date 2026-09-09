import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Shield, Cpu, Zap, Globe } from 'lucide-react';

export default function FeatureComparisonTable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    {
      title: 'Hardware & Dedicated Resources',
      icon: <Cpu size={16} color="var(--color-secondary-500)" />,
      rows: [
        { name: 'Websites Allowed', single: '1', premium: '100', business: '100', cloud: '300' },
        { name: 'NVMe Storage Space', single: '50 GB', premium: '100 GB', business: '200 GB', cloud: '250 GB Dedicated' },
        { name: 'Bandwidth', single: '100 GB', premium: 'Unlimited', business: 'Unlimited', cloud: 'Unlimited' },
        { name: 'RAM Memory Allocation', single: '768 MB', premium: '1 GB', business: '1.5 GB', cloud: '3 GB Dedicated' },
        { name: 'CPU Cores', single: '1 Core', premium: '1 Core', business: '2 Cores', cloud: '2 Cores Dedicated' },
      ]
    },
    {
      title: 'Security & Backup Features',
      icon: <Shield size={16} color="var(--color-secondary-500)" />,
      rows: [
        { name: 'Unlimited Free SSL Certificates', single: true, premium: true, business: true, cloud: true },
        { name: 'Automated Backups', single: 'Weekly', premium: 'Weekly', business: 'Daily (Free)', cloud: 'Daily (Free)' },
        { name: 'Cloudflare Protected Nameservers', single: true, premium: true, business: true, cloud: true },
        { name: 'DDoS Attack Protection', single: true, premium: true, business: true, cloud: true },
        { name: 'Free Dedicated IP Address', single: false, premium: false, business: false, cloud: true },
      ]
    },
    {
      title: 'WordPress & Performance Speed',
      icon: <Zap size={16} color="var(--color-secondary-500)" />,
      rows: [
        { name: 'Managed WordPress Engine', single: true, premium: true, business: true, cloud: true },
        { name: 'LiteSpeed Web Server Acceleration', single: true, premium: true, business: true, cloud: true },
        { name: 'WordPress Staging Environment', single: false, premium: true, business: true, cloud: true },
        { name: 'Object Cache for WordPress (3x Speed)', single: false, premium: true, business: true, cloud: true },
        { name: 'Free Gofayda CDN', single: false, premium: false, business: true, cloud: true },
      ]
    }
  ];

  const renderVal = (val) => {
    if (typeof val === 'boolean') {
      return val ? (
        <span style={{ color: '#1b6329', backgroundColor: 'var(--color-success)', padding: '4px', borderRadius: '50%', display: 'inline-flex' }}>
          <Check size={14} />
        </span>
      ) : (
        <span style={{ color: 'var(--color-neutral-400)' }}>
          <X size={14} />
        </span>
      );
    }
    return <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>{val}</span>;
  };

  return (
    <section id="features" style={{ padding: '4rem 0', backgroundColor: 'var(--color-neutral-50)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem auto' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            TRANSPARENT COMPARISON
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-secondary-950)', marginBottom: '0.5rem' }}>
            Compare All Hosting Plan Specs
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-600)' }}>
            Detailed breakdown of resources, features, and capabilities across all plans.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-neutral-200)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}>
          {/* Table Sticky Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--color-secondary-950)',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 'var(--font-size-sm)',
            alignItems: 'center'
          }}>
            <div>Features & Capabilities</div>
            <div style={{ textAlign: 'center' }}>Single</div>
            <div style={{ textAlign: 'center', color: 'var(--color-accent-400)' }}>Premium</div>
            <div style={{ textAlign: 'center' }}>Business</div>
            <div style={{ textAlign: 'center' }}>Cloud Startup</div>
          </div>

          {/* Table Body Categories */}
          {categories.map((cat, catIdx) => (
            <div key={catIdx}>
              {/* Category Header */}
              <div style={{
                backgroundColor: 'var(--color-secondary-50)',
                padding: '0.75rem 1.5rem',
                fontWeight: 'bold',
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-secondary-900)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderTop: '1px solid var(--color-neutral-200)'
              }}>
                {cat.icon} {cat.title}
              </div>

              {cat.rows.map((row, rowIdx) => (
                <div
                  key={rowIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    padding: '0.875rem 1.5rem',
                    borderTop: '1px solid var(--color-neutral-100)',
                    fontSize: 'var(--font-size-xs)',
                    alignItems: 'center',
                    backgroundColor: rowIdx % 2 === 0 ? '#ffffff' : 'var(--color-neutral-50)'
                  }}
                >
                  <div style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-neutral-800)' }}>
                    {row.name}
                  </div>
                  <div style={{ textAlign: 'center' }}>{renderVal(row.single)}</div>
                  <div style={{ textAlign: 'center' }}>{renderVal(row.premium)}</div>
                  <div style={{ textAlign: 'center' }}>{renderVal(row.business)}</div>
                  <div style={{ textAlign: 'center' }}>{renderVal(row.cloud)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
