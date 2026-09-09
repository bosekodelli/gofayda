import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  HOSTING_PLANS as INITIAL_PLANS,
  DOMAIN_TLDS as INITIAL_TLDS,
  BUILDER_TEMPLATES as INITIAL_TEMPLATES,
  TESTIMONIALS as INITIAL_TESTIMONIALS,
  FAQS as INITIAL_FAQS,
  THEME_PRESETS
} from '../data/hostingData';

const STORAGE_KEY = 'gofayda_site_data_v2';

const INITIAL_HERO = {
  badge: 'Everything You Need to Create a Website',
  titlePrefix: 'Web Hosting Made ',
  titleHighlight: 'Fast, Simple & Secure',
  subtitle: 'Get top-rated web hosting with a free domain, 1-click website setup, free SSL, and 24/7 customer support.',
  startingPriceINR: 69,
  freeMonthsTag: '+ 2 MONTHS FREE',
  ctaText: 'Claim Deal'
};

const INITIAL_ANNOUNCEMENT = {
  badgeText: 'SPECIAL OFFER',
  text: 'Up to 75% OFF Web Hosting + 2 Months FREE',
  ctaText: 'Claim Deal',
  timerDays: 2,
  timerHours: 14
};

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_plans`);
      return saved ? JSON.parse(saved) : INITIAL_PLANS;
    } catch (e) {
      return INITIAL_PLANS;
    }
  });

  const [tlds, setTlds] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tlds`);
      return saved ? JSON.parse(saved) : INITIAL_TLDS;
    } catch (e) {
      return INITIAL_TLDS;
    }
  });

  const [hero, setHero] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return saved ? JSON.parse(saved) : INITIAL_HERO;
    } catch (e) {
      return INITIAL_HERO;
    }
  });

  const [announcement, setAnnouncement] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_announcement`);
      return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENT;
    } catch (e) {
      return INITIAL_ANNOUNCEMENT;
    }
  });

  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
      return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
    } catch (e) {
      return INITIAL_TESTIMONIALS;
    }
  });

  const [faqs, setFaqs] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_faqs`);
      return saved ? JSON.parse(saved) : INITIAL_FAQS;
    } catch (e) {
      return INITIAL_FAQS;
    }
  });

  const [templates, setTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_templates`);
      return saved ? JSON.parse(saved) : INITIAL_TEMPLATES;
    } catch (e) {
      return INITIAL_TEMPLATES;
    }
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_plans`, JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tlds`, JSON.stringify(tlds));
  }, [tlds]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_announcement`, JSON.stringify(announcement));
  }, [announcement]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_faqs`, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_templates`, JSON.stringify(templates));
  }, [templates]);

  // CRUD Operations
  const addPlan = (newPlan) => {
    setPlans(prev => [...prev, { ...newPlan, id: newPlan.id || `plan_${Date.now()}` }]);
  };

  const updatePlan = (id, updatedFields) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePlan = (id) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const addTLD = (newTLD) => {
    setTlds(prev => [...prev, newTLD]);
  };

  const updateTLD = (tldName, updatedFields) => {
    setTlds(prev => prev.map(t => t.tld === tldName ? { ...t, ...updatedFields } : t));
  };

  const deleteTLD = (tldName) => {
    setTlds(prev => prev.filter(t => t.tld !== tldName));
  };

  const updateHero = (updatedFields) => {
    setHero(prev => ({ ...prev, ...updatedFields }));
  };

  const updateAnnouncement = (updatedFields) => {
    setAnnouncement(prev => ({ ...prev, ...updatedFields }));
  };

  const addTestimonial = (item) => {
    setTestimonials(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const updateTestimonial = (id, item) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...item } : t));
  };

  const deleteTestimonial = (id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addFAQ = (faq) => {
    setFaqs(prev => [...prev, faq]);
  };

  const updateFAQ = (index, faq) => {
    setFaqs(prev => prev.map((f, i) => i === index ? { ...f, ...faq } : f));
  };

  const deleteFAQ = (index) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
  };

  const resetToDefaults = () => {
    setPlans(INITIAL_PLANS);
    setTlds(INITIAL_TLDS);
    setHero(INITIAL_HERO);
    setAnnouncement(INITIAL_ANNOUNCEMENT);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setTemplates(INITIAL_TEMPLATES);
    localStorage.removeItem(`${STORAGE_KEY}_plans`);
    localStorage.removeItem(`${STORAGE_KEY}_tlds`);
    localStorage.removeItem(`${STORAGE_KEY}_hero`);
    localStorage.removeItem(`${STORAGE_KEY}_announcement`);
    localStorage.removeItem(`${STORAGE_KEY}_testimonials`);
    localStorage.removeItem(`${STORAGE_KEY}_faqs`);
    localStorage.removeItem(`${STORAGE_KEY}_templates`);
  };

  const exportData = () => {
    const data = {
      plans,
      tlds,
      hero,
      announcement,
      testimonials,
      faqs,
      templates,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gofayda_config_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (parsed.plans) setPlans(parsed.plans);
      if (parsed.tlds) setTlds(parsed.tlds);
      if (parsed.hero) setHero(parsed.hero);
      if (parsed.announcement) setAnnouncement(parsed.announcement);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.templates) setTemplates(parsed.templates);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  };

  return (
    <SiteDataContext.Provider value={{
      plans,
      tlds,
      hero,
      announcement,
      testimonials,
      faqs,
      templates,
      addPlan,
      updatePlan,
      deletePlan,
      addTLD,
      updateTLD,
      deleteTLD,
      updateHero,
      updateAnnouncement,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addFAQ,
      updateFAQ,
      deleteFAQ,
      resetToDefaults,
      exportData,
      importData
    }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
