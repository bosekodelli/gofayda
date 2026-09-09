import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, AlertTriangle, KeyRound, ArrowRight, X } from 'lucide-react';
import { verifyCredentials, getLockoutStatus } from '../../utils/security';

export default function AdminAuthModal({ isOpen, onClose, onAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Check lockout status on open
  useEffect(() => {
    if (isOpen) {
      const lockoutTime = getLockoutStatus();
      if (lockoutTime > Date.now()) {
        setLockoutSeconds(Math.ceil((lockoutTime - Date.now()) / 1000));
      } else {
        setLockoutSeconds(0);
      }
      setErrorMessage('');
    }
  }, [isOpen]);

  // Lockout countdown timer
  useEffect(() => {
    let timer;
    if (lockoutSeconds > 0) {
      timer = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setErrorMessage('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutSeconds > 0 || loading) return;

    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const result = await verifyCredentials(username, password);
      if (result.success) {
        setUsername('');
        setPassword('');
        setErrorMessage('');
        onAuthenticated();
      } else {
        if (result.locked) {
          setLockoutSeconds(result.remainingSeconds || 60);
          setErrorMessage(result.error);
        } else {
          setErrorMessage(result.error || 'Authentication failed. Please check your credentials.');
        }
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 3, 25, 0.82)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        maxWidth: '430px',
        width: '100%',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(145deg, var(--color-secondary-950) 0%, var(--color-secondary-900) 100%)',
          color: '#ffffff',
          padding: '1.75rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: 'var(--color-neutral-300)',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s'
            }}
          >
            <X size={16} />
          </button>

          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--color-secondary-800), var(--color-secondary-700))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
          }}>
            <ShieldCheck size={26} color="var(--color-accent-400)" />
          </div>
          <h3 style={{ fontSize: 'var(--font-size-xl)', color: '#ffffff', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Authorized Staff Access
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-300)', marginTop: '0.35rem', marginBottom: 0 }}>
            Encrypted Administrative Console • Multi-Factor Secured
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
          {/* Lockout Warning Banner */}
          {lockoutSeconds > 0 && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 500
            }}>
              <AlertTriangle size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>Security Lockout:</strong> Too many failed attempts. Try again in {lockoutSeconds} seconds.
              </div>
            </div>
          )}

          {/* Standard Error Message */}
          {errorMessage && lockoutSeconds === 0 && (
            <div style={{
              backgroundColor: '#fff1f2',
              border: '1px solid #ffe4e6',
              color: 'var(--color-danger)',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-xs)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 500
            }}>
              <AlertTriangle size={15} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Username Field */}
          <div style={{ marginBottom: '1.15rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-neutral-700)',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Admin Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Enter administrator ID"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={lockoutSeconds > 0}
                autoFocus
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-neutral-300)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  backgroundColor: lockoutSeconds > 0 ? 'var(--color-neutral-100)' : '#ffffff',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              />
              <User size={16} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--color-neutral-700)',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Master Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                disabled={lockoutSeconds > 0}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-neutral-300)',
                  fontSize: 'var(--font-size-sm)',
                  outline: 'none',
                  backgroundColor: lockoutSeconds > 0 ? 'var(--color-neutral-100)' : '#ffffff',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
              />
              <KeyRound size={16} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-neutral-400)',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={lockoutSeconds > 0 || loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: lockoutSeconds > 0 || loading ? 0.6 : 1,
              cursor: lockoutSeconds > 0 || loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Authenticate & Access Console</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Discreet Security Footer */}
          <div style={{
            marginTop: '1.25rem',
            textAlign: 'center',
            fontSize: '0.72rem',
            color: 'var(--color-neutral-400)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem'
          }}>
            <Lock size={12} />
            <span>End-to-end encrypted session with brute-force protection</span>
          </div>
        </form>
      </div>
    </div>
  );
}
