import React, { useState } from 'react';
import { Search, Globe, Check, PlusCircle } from 'lucide-react';
import { CURRENCIES } from '../data/hostingData';
import confetti from 'canvas-confetti';
import { useSiteData } from '../context/SiteDataContext';

export default function DomainSearchWidget({ activeCurrency, onAddToCart }) {
  const { tlds } = useSiteData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTld, setSelectedTld] = useState('.com');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const curr = CURRENCIES[activeCurrency];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const cleanName = searchTerm.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
      const tldObj = tlds.find(t => t.tld === selectedTld) || tlds[0] || { priceINR: 799, tld: '.com' };
      const price = Math.round(tldObj.priceINR * curr.rate);
      
      setSearchResult({
        fullName: `${cleanName}${selectedTld}`,
        available: true,
        price,
        tldObj
      });
    }, 400);
  };

  const handleAddDomain = (domainObj) => {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
    onAddToCart({
      id: `domain-${domainObj.fullName}`,
      name: `Domain Name: ${domainObj.fullName}`,
      monthlyPrice: domainObj.price,
      currency: curr.code,
      type: 'domain',
      durationMonths: 12
    });
  };

  return (
    <section id="domains" className="bg-neutral-light" style={{ padding: '4rem 0 5rem 0' }}>
      <div className="container container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
            FIND YOUR PERFECT WEB ADDRESS
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-secondary-950)', marginBottom: '0.75rem' }}>
            Search Domain Name Availability
          </h2>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-neutral-600)' }}>
            Lock in your domain name today before someone else takes it. Free privacy protection included!
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          gap: '0.5rem',
          backgroundColor: '#ffffff',
          padding: '0.5rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--color-neutral-300)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '1rem',
            color: 'var(--color-neutral-400)'
          }}>
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder="Type your ideal domain name (e.g. mycoolstartup)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flexGrow: 1,
              border: 'none',
              outline: 'none',
              fontSize: 'var(--font-size-base)',
              padding: '0.5rem 0',
              color: 'var(--color-neutral-900)'
            }}
          />

          <select
            value={selectedTld}
            onChange={(e) => setSelectedTld(e.target.value)}
            style={{
              border: 'none',
              backgroundColor: 'var(--color-neutral-100)',
              borderRadius: 'var(--radius-full)',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-secondary-700)',
              cursor: 'pointer'
            }}
          >
            {tlds.map(t => (
              <option key={t.tld} value={t.tld}>{t.tld}</option>
            ))}
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSearching}
            style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1.75rem' }}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Live Search Result Banner */}
        {searchResult && (
          <div style={{
            backgroundColor: '#ffffff',
            border: '2px solid var(--color-secondary-500)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-purple-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                backgroundColor: 'var(--color-success)',
                color: '#1b6329',
                padding: '0.75rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Check size={24} />
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-secondary-900)' }}>
                  {searchResult.fullName}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: '#1b6329', fontWeight: 'bold' }}>
                  🎉 Good news! Domain is available!
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', color: 'var(--color-secondary-950)' }}>
                  {curr.symbol}{searchResult.price}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-500)' }}>/1st year</div>
              </div>
              <button
                onClick={() => handleAddDomain(searchResult)}
                className="btn btn-accent"
              >
                <PlusCircle size={16} /> Add to Cart
              </button>
            </div>
          </div>
        )}

        {/* Popular TLDs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1rem'
        }}>
          {tlds.map(tldObj => {
            const price = Math.round(tldObj.priceINR * curr.rate);
            const origPrice = Math.round(tldObj.originalPriceINR * curr.rate);

            return (
              <div
                key={tldObj.tld}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '1.25rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-neutral-200)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  boxShadow: 'var(--shadow-sm)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--color-secondary-900)' }}>
                  {tldObj.tld}
                </div>
                {tldObj.discount ? (
                  <span className="badge badge-accent" style={{ fontSize: '0.6rem', margin: '0.25rem 0' }}>
                    {tldObj.discount}
                  </span>
                ) : (
                  <div style={{ height: '18px' }}></div>
                )}
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginTop: '0.25rem' }}>
                  {curr.symbol}{price}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-400)', textDecoration: 'line-through' }}>
                  {curr.symbol}{origPrice}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
