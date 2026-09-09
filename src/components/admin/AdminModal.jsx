import React, { useState, useEffect } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import {
  X, LayoutDashboard, Server, Globe, Megaphone, HelpCircle,
  Palette, Download, Upload, RotateCcw, Plus, Trash2, Edit3,
  Check, Save, Sparkles, Star, Shield, ArrowRight, Layers,
  KeyRound, ShieldCheck, LogOut, Lock, User, AlertCircle
} from 'lucide-react';
import { THEME_PRESETS } from '../../data/hostingData';
import {
  updateAdminCredentials,
  clearSession,
  getAdminCredentials
} from '../../utils/security';

export default function AdminModal({ isOpen, onClose, activeTheme, onThemeChange, onLogout }) {
  const {
    plans, tlds, hero, announcement, testimonials, faqs, templates,
    addPlan, updatePlan, deletePlan,
    addTLD, updateTLD, deleteTLD,
    updateHero, updateAnnouncement,
    addTestimonial, updateTestimonial, deleteTestimonial,
    addFAQ, updateFAQ, deleteFAQ,
    resetToDefaults, exportData, importData
  } = useSiteData();

  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState(null);

  // Edit states for forms
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingTLD, setEditingTLD] = useState(null);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  // New item states
  const [newPlanForm, setNewPlanForm] = useState({
    id: '', name: '', tagline: '', baseMonthlyPriceINR: 199, regularMonthlyPriceINR: 699,
    popular: false, badge: '', specs: { websites: '10 Websites', storage: '50 GB Storage', backups: 'Weekly', bandwidth: '100 GB', email: 'Free', ssl: 'Free SSL', domain: 'No', wordpress: 'Managed' },
    features: ['24/7 Support', 'Free SSL', 'Instant Setup']
  });

  const [newTLDForm, setNewTLDForm] = useState({ tld: '.io', priceINR: 1299, originalPriceINR: 2499, isPopular: false, discount: '50% OFF' });
  const [newFAQForm, setNewFAQForm] = useState({ question: '', answer: '' });
  const [newTestimonialForm, setNewTestimonialForm] = useState({ name: '', role: '', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', stars: 5, verified: true, text: '' });

  // Security Form State
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newUsername: 'admin',
    newPassword: '',
    confirmPassword: ''
  });
  const [securityStatus, setSecurityStatus] = useState({ type: '', message: '' });
  const [securityLoading, setSecurityLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const creds = getAdminCredentials();
      if (creds && creds.username) {
        setSecurityForm(prev => ({ ...prev, newUsername: creds.username }));
      }
      setSecurityStatus({ type: '', message: '' });
    }
  }, [isOpen]);

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setSecurityStatus({ type: '', message: '' });

    if (!securityForm.currentPassword) {
      setSecurityStatus({ type: 'error', message: 'Current password is required to verify identity.' });
      return;
    }
    if (!securityForm.newPassword) {
      setSecurityStatus({ type: 'error', message: 'Please enter a new password.' });
      return;
    }
    if (securityForm.newPassword.length < 6) {
      setSecurityStatus({ type: 'error', message: 'New password must be at least 6 characters long.' });
      return;
    }
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityStatus({ type: 'error', message: 'New password and confirmation do not match.' });
      return;
    }

    setSecurityLoading(true);
    try {
      const res = await updateAdminCredentials(
        securityForm.currentPassword,
        securityForm.newUsername,
        securityForm.newPassword
      );
      if (res.success) {
        setSecurityStatus({ type: 'success', message: 'Admin security credentials updated successfully!' });
        setSecurityForm(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        showToast('Password & Security credentials updated!');
      } else {
        setSecurityStatus({ type: 'error', message: res.error || 'Failed to update credentials.' });
      }
    } catch (err) {
      setSecurityStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setSecurityLoading(false);
    }
  };

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const success = importData(event.target.result);
        if (success) showToast('Website configuration imported successfully!');
        else alert('Failed to import JSON file. Please check file format.');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(10, 7, 40, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem'
    }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'var(--color-success)',
          color: '#ffffff',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-xl)',
          fontWeight: 'bold',
          fontSize: 'var(--font-size-sm)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Check size={18} /> {toastMessage}
        </div>
      )}

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        maxWidth: '1100px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        border: '1px solid var(--color-neutral-200)'
      }}>
        {/* Admin Header */}
        <div style={{
          backgroundColor: 'var(--color-secondary-950)',
          color: '#ffffff',
          padding: '1.25rem 1.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-accent-400), var(--color-accent-500))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-accent-950)',
              fontWeight: 'bold'
            }}>
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: 'var(--font-size-xl)', color: '#ffffff', margin: 0, fontWeight: 'bold' }}>
                Gofayda Admin Control Panel
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)', margin: 0 }}>
                Live Website Manager • Instant Persistence Engine
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => {
                clearSession();
                if (onLogout) onLogout();
                onClose();
              }}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                cursor: 'pointer',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
              title="Log out and end session"
            >
              <LogOut size={14} /> Log Out
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation & Body */}
        <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          {/* Sidebar Tabs */}
          <div style={{
            width: '240px',
            backgroundColor: 'var(--color-neutral-50)',
            borderRight: '1px solid var(--color-neutral-200)',
            padding: '1rem 0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flexShrink: 0
          }}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <LayoutDashboard size={16} /> Overview & Stats
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`btn ${activeTab === 'plans' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <Server size={16} /> Hosting Plans ({plans.length})
            </button>
            <button
              onClick={() => setActiveTab('tlds')}
              className={`btn ${activeTab === 'tlds' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <Globe size={16} /> Domain TLDs ({tlds.length})
            </button>
            <button
              onClick={() => setActiveTab('hero')}
              className={`btn ${activeTab === 'hero' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <Megaphone size={16} /> Banner & Hero
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`btn ${activeTab === 'faqs' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <HelpCircle size={16} /> FAQs & Reviews
            </button>
            <button
              onClick={() => setActiveTab('theme')}
              className={`btn ${activeTab === 'theme' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <Palette size={16} /> Theme & Colors
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`btn ${activeTab === 'backup' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)' }}
            >
              <Download size={16} /> Backup & Reset
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`btn ${activeTab === 'security' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: activeTab === 'security' ? '#ffffff' : 'var(--color-primary-600)' }}
            >
              <KeyRound size={16} /> Security & Passwords
            </button>
          </div>

          {/* Tab Content Panel */}
          <div style={{ flexGrow: 1, padding: '1.75rem', overflowY: 'auto' }}>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-secondary-950)' }}>
                  Website Overview & Status
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-secondary-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-secondary-200)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-secondary-700)', fontWeight: 'bold' }}>HOSTING PLANS</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-secondary-950)' }}>{plans.length}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-600)' }}>Active pricing tiers</div>
                  </div>
                  <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-accent-100)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent-400)' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-950)', fontWeight: 'bold' }}>TLDs OFFERED</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-accent-950)' }}>{tlds.length}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-accent-950)' }}>Domain extensions</div>
                  </div>
                  <div style={{ padding: '1.25rem', backgroundColor: '#f0fdf4', borderRadius: 'var(--radius-lg)', border: '1px solid #bbf7d0' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: '#166534', fontWeight: 'bold' }}>FAQS & REVIEWS</div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#14532d' }}>{faqs.length + testimonials.length}</div>
                    <div style={{ fontSize: '0.75rem', color: '#166534' }}>{faqs.length} FAQs • {testimonials.length} Testimonials</div>
                  </div>
                  <div style={{ padding: '1.25rem', backgroundColor: '#faf5ff', borderRadius: 'var(--radius-lg)', border: '1px solid #e9d5ff' }}>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b21a8', fontWeight: 'bold' }}>ACTIVE THEME</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#581c87', textTransform: 'capitalize' }}>{activeTheme}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b21a8' }}>{THEME_PRESETS[activeTheme]?.name}</div>
                  </div>
                </div>

                <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-neutral-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quick Instructions</h4>
                  <ul style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-700)', paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                    <li>Click on any tab in the left sidebar to edit live website content.</li>
                    <li>Changes take effect immediately on the website upon clicking <strong>Save</strong>.</li>
                    <li>State is persisted in your browser's <code>localStorage</code> automatically.</li>
                    <li>Use the <strong>Backup & Reset</strong> tab to export your website data or restore defaults anytime.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* HOSTING PLANS TAB */}
            {activeTab === 'plans' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-secondary-950)', margin: 0 }}>
                    Manage Hosting Plans ({plans.length})
                  </h3>
                  <button
                    onClick={() => {
                      addPlan(newPlanForm);
                      showToast('New plan added!');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={14} /> Add New Plan
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      style={{
                        padding: '1.25rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-neutral-200)',
                        backgroundColor: plan.popular ? 'var(--color-secondary-50)' : '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-lg)', color: 'var(--color-secondary-900)' }}>{plan.name}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-500)', marginLeft: '0.5rem' }}>[ID: {plan.id}]</span>
                          {plan.badge && <span className="badge badge-accent" style={{ marginLeft: '0.5rem' }}>{plan.badge}</span>}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => deletePlan(plan.id)}
                            className="btn btn-outline btn-sm"
                            style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>

                      {/* Form Inputs for Plan */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Plan Name</label>
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => updatePlan(plan.id, { name: e.target.value })}
                            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ccc' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Base Monthly Price (INR ₹)</label>
                          <input
                            type="number"
                            value={plan.baseMonthlyPriceINR}
                            onChange={(e) => updatePlan(plan.id, { baseMonthlyPriceINR: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ccc' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Regular Price (INR ₹)</label>
                          <input
                            type="number"
                            value={plan.regularMonthlyPriceINR}
                            onChange={(e) => updatePlan(plan.id, { regularMonthlyPriceINR: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ccc' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Badge Label</label>
                          <input
                            type="text"
                            value={plan.badge || ''}
                            onChange={(e) => updatePlan(plan.id, { badge: e.target.value })}
                            placeholder="e.g. MOST POPULAR"
                            style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ccc' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: '0.75rem' }}>
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Tagline</label>
                        <input
                          type="text"
                          value={plan.tagline}
                          onChange={(e) => updatePlan(plan.id, { tagline: e.target.value })}
                          style={{ width: '100%', padding: '0.4rem 0.6rem', fontSize: '0.85rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOMAIN TLDs TAB */}
            {activeTab === 'tlds' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-secondary-950)', margin: 0 }}>
                    Manage Domain TLD Pricing
                  </h3>
                  <button
                    onClick={() => {
                      addTLD(newTLDForm);
                      showToast('New TLD added!');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Plus size={14} /> Add TLD
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                  {tlds.map((tldItem) => (
                    <div
                      key={tldItem.tld}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-neutral-200)',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-secondary-900)' }}>{tldItem.tld}</span>
                        <button
                          onClick={() => deleteTLD(tldItem.tld)}
                          style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Price (INR ₹)</label>
                          <input
                            type="number"
                            value={tldItem.priceINR}
                            onChange={(e) => updateTLD(tldItem.tld, { priceINR: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.35rem', fontSize: '0.85rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Original Price (INR ₹)</label>
                          <input
                            type="number"
                            value={tldItem.originalPriceINR}
                            onChange={(e) => updateTLD(tldItem.tld, { originalPriceINR: Number(e.target.value) })}
                            style={{ width: '100%', padding: '0.35rem', fontSize: '0.85rem' }}
                          />
                        </div>

                        <div>
                          <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Discount Badge Text</label>
                          <input
                            type="text"
                            value={tldItem.discount || ''}
                            onChange={(e) => updateTLD(tldItem.tld, { discount: e.target.value })}
                            placeholder="e.g. 96% OFF"
                            style={{ width: '100%', padding: '0.35rem', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HERO & ANNOUNCEMENT TAB */}
            {activeTab === 'hero' && (
              <div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-secondary-950)' }}>
                  Announcement Bar & Hero Section Content
                </h3>

                {/* Announcement Edit Form */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-neutral-50)', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '0.75rem' }}>Top Announcement Bar</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Badge Text</label>
                      <input
                        type="text"
                        value={announcement.badgeText}
                        onChange={(e) => updateAnnouncement({ badgeText: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Offer Message</label>
                      <input
                        type="text"
                        value={announcement.text}
                        onChange={(e) => updateAnnouncement({ text: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>CTA Button Label</label>
                      <input
                        type="text"
                        value={announcement.ctaText}
                        onChange={(e) => updateAnnouncement({ ctaText: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Edit Form */}
                <div style={{ padding: '1.25rem', backgroundColor: 'var(--color-neutral-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-neutral-200)' }}>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '0.75rem' }}>Hero Banner Content</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Pill Badge Text</label>
                      <input
                        type="text"
                        value={hero.badge}
                        onChange={(e) => updateHero({ badge: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Headline Prefix</label>
                        <input
                          type="text"
                          value={hero.titlePrefix}
                          onChange={(e) => updateHero({ titlePrefix: e.target.value })}
                          style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Headline Highlight (Gold)</label>
                        <input
                          type="text"
                          value={hero.titleHighlight}
                          onChange={(e) => updateHero({ titleHighlight: e.target.value })}
                          style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>Subtitle Paragraph</label>
                      <textarea
                        rows={2}
                        value={hero.subtitle}
                        onChange={(e) => updateHero({ subtitle: e.target.value })}
                        style={{ width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQS & REVIEWS TAB */}
            {activeTab === 'faqs' && (
              <div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-secondary-950)' }}>
                  Manage FAQs ({faqs.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {faqs.map((faq, index) => (
                    <div key={index} style={{ padding: '1rem', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFAQ(index, { question: e.target.value })}
                          style={{ width: '100%', fontWeight: 'bold', padding: '0.35rem' }}
                        />
                        <button onClick={() => deleteFAQ(index)} style={{ border: 'none', background: 'transparent', color: 'var(--color-danger)' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, { answer: e.target.value })}
                        style={{ width: '100%', fontSize: '0.85rem', padding: '0.35rem' }}
                      />
                    </div>
                  ))}
                  <button onClick={() => addFAQ({ question: 'New Question?', answer: 'Answer text here.' })} className="btn btn-outline btn-sm">
                    <Plus size={14} /> Add FAQ
                  </button>
                </div>
              </div>
            )}

            {/* THEME TAB */}
            {activeTab === 'theme' && (
              <div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-secondary-950)' }}>
                  Theme Presets & Palette Customizer
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {Object.keys(THEME_PRESETS).map(key => {
                    const preset = THEME_PRESETS[key];
                    const isSel = activeTheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          onThemeChange(key);
                          showToast(`Theme changed to ${preset.name}`);
                        }}
                        style={{
                          padding: '1.25rem',
                          borderRadius: 'var(--radius-lg)',
                          border: isSel ? '2px solid var(--color-secondary-500)' : '1px solid var(--color-neutral-200)',
                          backgroundColor: isSel ? 'var(--color-secondary-50)' : '#ffffff',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: preset.secondary500, border: `2px solid ${preset.accent400}` }}></div>
                          <span style={{ fontWeight: 'bold', fontSize: 'var(--font-size-sm)' }}>{preset.name}</span>
                        </div>
                        {isSel && <span className="badge badge-primary">ACTIVE</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BACKUP & RESET TAB */}
            {activeTab === 'backup' && (
              <div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem', color: 'var(--color-secondary-950)' }}>
                  Data Management, Backup & Reset
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-lg)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Export Site Config</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-600)', marginBottom: '1rem' }}>
                      Download a JSON file containing all customized plans, TLDs, Hero content, FAQs, and reviews.
                    </p>
                    <button onClick={exportData} className="btn btn-primary btn-sm">
                      <Download size={16} /> Export JSON File
                    </button>
                  </div>

                  <div style={{ padding: '1.5rem', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-lg)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Import Site Config</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-600)', marginBottom: '1rem' }}>
                      Restore or load custom website data from a previously exported JSON file.
                    </p>
                    <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                      <Upload size={16} /> Choose File to Import
                      <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  <div style={{ padding: '1.5rem', border: '1px solid var(--color-danger)', backgroundColor: '#fff5f5', borderRadius: 'var(--radius-lg)' }}>
                    <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', color: 'var(--color-danger)', marginBottom: '0.5rem' }}>Reset to Original Defaults</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-700)', marginBottom: '1rem' }}>
                      Clear all custom edits stored in <code>localStorage</code> and revert back to factory default hosting data.
                    </p>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to reset all site data to default values?')) {
                          resetToDefaults();
                          showToast('Reset to default values successfully!');
                        }
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                    >
                      <RotateCcw size={16} /> Reset Everything
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECURITY & CREDENTIALS TAB */}
            {activeTab === 'security' && (
              <div style={{ maxWidth: '650px' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-secondary-950)', margin: '0 0 0.35rem 0', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={22} color="var(--color-primary-500)" /> Security & Credential Management
                  </h3>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-neutral-600)', margin: 0 }}>
                    Configure administrator login credentials. All passwords are encrypted with SHA-256 and salted for maximum protection.
                  </p>
                </div>

                {/* Security Status Banners */}
                {securityStatus.message && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-xs)',
                    marginBottom: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 500,
                    backgroundColor: securityStatus.type === 'success' ? '#ecfdf5' : '#fff1f2',
                    border: securityStatus.type === 'success' ? '1px solid #a7f3d0' : '1px solid #ffe4e6',
                    color: securityStatus.type === 'success' ? '#065f46' : 'var(--color-danger)'
                  }}>
                    {securityStatus.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                    <span>{securityStatus.message}</span>
                  </div>
                )}

                {/* Security Posture Info Box */}
                <div style={{
                  backgroundColor: 'var(--color-neutral-50)',
                  border: '1px solid var(--color-neutral-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-neutral-500)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                      Encryption Engine
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-secondary-900)', marginTop: '0.2rem' }}>
                      SHA-256 WebCrypto + Salt
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-neutral-500)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                      Brute-Force Shield
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-success)', marginTop: '0.2rem' }}>
                      5 Attempts (60s Lockout)
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-neutral-500)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                      Active Session
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-secondary-600)', marginTop: '0.2rem' }}>
                      Auto-Expires (60 min)
                    </div>
                  </div>
                </div>

                {/* Credential Update Form */}
                <form onSubmit={handleSecuritySubmit} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-neutral-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <h4 style={{ fontSize: 'var(--font-size-base)', fontWeight: 'bold', marginBottom: '1.25rem', color: 'var(--color-neutral-900)' }}>
                    Update Admin Password & Username
                  </h4>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-neutral-700)', marginBottom: '0.35rem' }}>
                      Administrator Username / ID
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={securityForm.newUsername}
                        onChange={(e) => setSecurityForm({ ...securityForm, newUsername: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          fontSize: 'var(--font-size-sm)'
                        }}
                      />
                      <User size={15} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-neutral-700)', marginBottom: '0.35rem' }}>
                      Current Password <span style={{ color: 'var(--color-danger)' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="password"
                        placeholder="Enter current password to verify"
                        value={securityForm.currentPassword}
                        onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-neutral-300)',
                          fontSize: 'var(--font-size-sm)'
                        }}
                      />
                      <Lock size={15} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-neutral-700)', marginBottom: '0.35rem' }}>
                        New Master Password <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="password"
                          placeholder="Min. 6 characters"
                          value={securityForm.newPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                          required
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-neutral-300)',
                            fontSize: 'var(--font-size-sm)'
                          }}
                        />
                        <KeyRound size={15} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'bold', color: 'var(--color-neutral-700)', marginBottom: '0.35rem' }}>
                        Confirm New Password <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="password"
                          placeholder="Re-type new password"
                          value={securityForm.confirmPassword}
                          onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                          required
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-neutral-300)',
                            fontSize: 'var(--font-size-sm)'
                          }}
                        />
                        <KeyRound size={15} color="var(--color-neutral-400)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button
                      type="submit"
                      disabled={securityLoading}
                      className="btn btn-primary"
                      style={{ fontSize: 'var(--font-size-xs)', padding: '0.65rem 1.25rem' }}
                    >
                      {securityLoading ? 'Updating...' : 'Save New Security Credentials'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
