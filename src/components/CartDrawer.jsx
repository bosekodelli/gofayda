import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Tag, ShieldCheck, Lock, ArrowRight, Check } from 'lucide-react';
import { CURRENCIES, BILLING_CYCLES } from '../data/hostingData';
import confetti from 'canvas-confetti';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, activeCurrency }) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const curr = CURRENCIES[activeCurrency];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'GOFAYDA2026' || couponCode.trim().toUpperCase() === 'HOSTINGER2026' || couponCode.trim().toUpperCase() === 'DEAL75') {
      setDiscountApplied(true);
    } else if (couponCode.trim() !== '') {
      alert('Invalid code. Try GOFAYDA2026 for 10% extra discount!');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const months = item.durationMonths || 12;
      return total + (item.monthlyPrice * months);
    }, 0);
  };

  const rawSubtotal = calculateSubtotal();
  const discountAmount = discountApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleCheckout = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
    setCheckoutSuccess(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(5, 11, 61, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      {/* Overlay backdrop click */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose}></div>

      {/* Drawer Panel */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '460px',
        backgroundColor: '#ffffff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.25)',
        zIndex: 1001
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--color-secondary-950)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 'bold', fontSize: 'var(--font-size-lg)' }}>
            <ShoppingBag size={20} color="var(--color-accent-400)" />
            <span>Your Order Cart ({cartItems.length})</span>
          </div>
          <button
            onClick={onClose}
            style={{ color: '#ffffff', padding: '0.25rem', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Modal state */}
        {checkoutSuccess ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-success)',
              color: '#1b6329',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}>
              <Check size={36} />
            </div>
            <h3 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-secondary-900)', marginBottom: '0.75rem' }}>
              Order Placed Successfully!
            </h3>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)', marginBottom: '2rem' }}>
              Welcome to Gofayda! Check your email for login credentials and setup instructions.
            </p>
            <button
              onClick={() => {
                setCheckoutSuccess(false);
                onClose();
              }}
              className="btn btn-primary btn-lg"
            >
              Go to Gofayda Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Drawer Body Items List */}
            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-neutral-500)' }}>
                  <ShoppingBag size={48} color="var(--color-neutral-300)" style={{ margin: '0 auto 1rem auto' }} />
                  <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Your cart is empty</div>
                  <p style={{ fontSize: 'var(--font-size-xs)' }}>Choose a web hosting plan or search a domain to get started!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cartItems.map((item, idx) => {
                    const months = item.durationMonths || 12;
                    const itemTotal = item.monthlyPrice * months;

                    return (
                      <div
                        key={idx}
                        style={{
                          backgroundColor: 'var(--color-neutral-50)',
                          padding: '1rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-200)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--color-secondary-900)' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-600)', margin: '0.25rem 0' }}>
                            Billing period: {months} months ({curr.symbol}{item.monthlyPrice}/mo)
                          </div>
                          <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>
                            Free SSL + 24/7 Support
                          </span>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-neutral-900)' }}>
                            {curr.symbol}{itemTotal}
                          </div>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            style={{ color: '#d9534f', marginTop: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--font-size-xs)' }}
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Coupon Code Section */}
                  <form onSubmit={handleApplyCoupon} style={{ marginTop: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexGrow: 1,
                        border: '1px solid var(--color-neutral-300)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: '#ffffff'
                      }}>
                        <Tag size={16} color="var(--color-secondary-500)" />
                        <input
                          type="text"
                          placeholder="Coupon code (e.g. HOSTINGER2026)"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          style={{ border: 'none', outline: 'none', width: '100%', fontSize: 'var(--font-size-xs)' }}
                        />
                      </div>
                      <button type="submit" className="btn btn-outline btn-sm">
                        Apply
                      </button>
                    </div>
                    {discountApplied && (
                      <div style={{ fontSize: 'var(--font-size-xs)', color: '#1b6329', marginTop: '0.35rem', fontWeight: 'bold' }}>
                        ✓ Extra 10% discount applied!
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Drawer Footer Checkout Summary */}
            {cartItems.length > 0 && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                borderTop: '1px solid var(--color-neutral-200)',
                boxShadow: '0 -10px 20px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-600)', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>{curr.symbol}{rawSubtotal}</span>
                </div>

                {discountApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: '#1b6329', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    <span>Coupon Savings (10%)</span>
                    <span>-{curr.symbol}{discountAmount}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-lg)', fontWeight: 'bold', color: 'var(--color-secondary-950)', margin: '0.75rem 0 1.25rem 0', paddingTop: '0.5rem', borderTop: '1px solid var(--color-neutral-200)' }}>
                  <span>Total Amount</span>
                  <span>{curr.symbol}{finalTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="btn btn-accent btn-lg"
                  style={{ width: '100%', borderRadius: 'var(--radius-md)' }}
                >
                  <Lock size={16} /> Checkout & Complete Order <ArrowRight size={16} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-500)', marginTop: '0.75rem' }}>
                  <ShieldCheck size={14} color="#00b67a" />
                  <span>30-Day Money-Back Guarantee Included</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
