export const THEME_PRESETS = {
  indigo: {
    id: 'indigo',
    name: 'Sunburst Gold & Deep Indigo',
    primary500: '#6e3ce6',
    secondary500: '#5348d4',
    secondary950: '#0a0728',
    accent400: '#ffbe00',
    accent950: '#381e00'
  },
  sapphire: {
    id: 'sapphire',
    name: 'Deep Sapphire & Cyan Glow',
    primary500: '#0066ff',
    secondary500: '#0f2b5c',
    secondary950: '#040d21',
    accent400: '#00f0ff',
    accent950: '#00363a'
  },
  cyber: {
    id: 'cyber',
    name: 'Dark Cyber Violet & Pink Accent',
    primary500: '#9d00ff',
    secondary500: '#4d0080',
    secondary950: '#150024',
    accent400: '#ff007f',
    accent950: '#38001a'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Mint & Charcoal',
    primary500: '#00b87c',
    secondary500: '#0f4c3a',
    secondary950: '#061f18',
    accent400: '#ffc72c',
    accent950: '#382800'
  }
};

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1, label: 'India - ₹ INR' },
  USD: { code: 'USD', symbol: '$', rate: 0.012, label: 'Global - $ USD' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.011, label: 'Europe - € EUR' },
};

export const BILLING_CYCLES = [
  { id: '48', label: '48 Months', discountLabel: 'SAVE 75%', factor: 1.0, isBestValue: true, freeMonths: 2 },
  { id: '24', label: '24 Months', discountLabel: 'SAVE 65%', factor: 1.25, freeMonths: 0 },
  { id: '12', label: '12 Months', discountLabel: 'SAVE 50%', factor: 1.6, freeMonths: 0 },
  { id: '1', label: '1 Month', discountLabel: 'STANDARD', factor: 3.2, freeMonths: 0 },
];

export const HOSTING_PLANS = [
  {
    id: 'single',
    name: 'Single Web Hosting',
    tagline: 'An ideal solution for beginners creating their first website.',
    baseMonthlyPriceINR: 69,
    regularMonthlyPriceINR: 279,
    popular: false,
    badge: null,
    specs: {
      websites: '1 Website',
      storage: '50 GB NVMe Storage',
      backups: 'Weekly Backups',
      bandwidth: '100 GB Bandwidth',
      email: '1 Email Account',
      ssl: 'Free Unlimited SSL',
      domain: 'Domain NOT included',
      wordpress: 'Managed WordPress Engine'
    },
    features: [
      'Managed WordPress',
      'WordPress Acceleration (LiteSpeed)',
      'Smart WordPress Auto Update',
      'Vulnerability Scanner',
      'Free 1-Click WordPress Install',
      'Free 1-Click Script Installer',
      '24/7 Customer Support',
      '99.90% Uptime Guarantee',
      'DNS Management',
      'Cloudflare Protected Nameservers'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Web Hosting',
    tagline: 'Everything you need to create your personal or business website.',
    baseMonthlyPriceINR: 149,
    regularMonthlyPriceINR: 599,
    popular: true,
    badge: 'MOST POPULAR',
    specs: {
      websites: '100 Websites',
      storage: '100 GB NVMe Storage',
      backups: 'Weekly Backups',
      bandwidth: 'Unlimited Bandwidth',
      email: 'Free Professional Email',
      ssl: 'Free Unlimited SSL',
      domain: 'Free Domain (₹799 value)',
      wordpress: 'Managed WordPress + Staging'
    },
    features: [
      'Everything in Single Hosting, plus:',
      'FREE Domain Name (1st year)',
      'Free Dedicated IP Option available',
      'Unlimited Free SSL Certificates',
      'Free Automatic Website Migration',
      'WordPress Staging Tool',
      'Object Cache for WordPress (3x faster)',
      'Git Access & SSH Terminal Access',
      'Unlimited Databases',
      '24/7 Global Customer Support'
    ]
  },
  {
    id: 'business',
    name: 'Business Web Hosting',
    tagline: 'Level up with increased performance & daily backups.',
    baseMonthlyPriceINR: 249,
    regularMonthlyPriceINR: 799,
    popular: false,
    badge: 'BEST FOR E-COMMERCE',
    specs: {
      websites: '100 Websites',
      storage: '200 GB NVMe Storage',
      backups: 'Daily Backups (₹1,500 value)',
      bandwidth: 'Unlimited Bandwidth',
      email: 'Free Professional Email',
      ssl: 'Free Unlimited SSL',
      domain: 'Free Domain (₹799 value)',
      wordpress: 'Managed WordPress + WooCommerce'
    },
    features: [
      'Everything in Premium Hosting, plus:',
      '5x Performance & Speed Boost',
      'Daily Backups (Value ₹1,500/yr)',
      'Free Content Delivery Network (CDN)',
      'On-Demand Backup creation',
      'WooCommerce Optimization',
      'Real-Time Security Analytics',
      'WordPress Auto Staging',
      'Priority Customer Support',
      'Dedicated NVMe Hardware'
    ]
  },
  {
    id: 'cloud_startup',
    name: 'Cloud Startup',
    tagline: 'Enjoy dedicated resources & enterprise cloud performance.',
    baseMonthlyPriceINR: 699,
    regularMonthlyPriceINR: 1999,
    popular: false,
    badge: 'MAXIMUM POWER',
    specs: {
      websites: '300 Websites',
      storage: '250 GB NVMe Storage',
      backups: 'Daily Backups',
      bandwidth: 'Unlimited Bandwidth',
      email: 'Free Professional Email',
      ssl: 'Free Unlimited SSL',
      domain: 'Free Domain (₹799 value)',
      wordpress: 'Full Dedicated WordPress Cluster'
    },
    features: [
      'Everything in Business Hosting, plus:',
      '10x Performance Boost',
      'Dedicated IP Address included',
      '3 GB RAM & 2 CPU Cores',
      'Dedicated Cloud Resources',
      'Priority 24/7 VIP Support',
      '99.99% Enterprise Uptime SLA',
      'Integrated Cloudflare Enterprise CDN',
      'Advanced DDoS Protection',
      'Custom PHP Execution Limits'
    ]
  }
];

export const DOMAIN_TLDS = [
  { tld: '.com', priceINR: 799, originalPriceINR: 1199, isPopular: true },
  { tld: '.in', priceINR: 499, originalPriceINR: 899, isPopular: true },
  { tld: '.online', priceINR: 99, originalPriceINR: 2499, isPopular: false, discount: '96% OFF' },
  { tld: '.tech', priceINR: 199, originalPriceINR: 3200, isPopular: false, discount: '93% OFF' },
  { tld: '.store', priceINR: 149, originalPriceINR: 2800, isPopular: false, discount: '94% OFF' },
  { tld: '.net', priceINR: 999, originalPriceINR: 1499, isPopular: false },
];

export const BUILDER_TEMPLATES = [
  {
    id: 'ecommerce',
    title: 'Modern E-Commerce Store',
    category: 'E-Commerce',
    previewUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    description: 'Sell physical or digital goods with built-in zero-commission online store checkout.'
  },
  {
    id: 'portfolio',
    title: 'Minimalist Portfolio',
    category: 'Creative',
    previewUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Showcase your photography, design, or consulting agency with high-impact layouts.'
  },
  {
    id: 'business',
    title: 'Corporate Agency',
    category: 'Business',
    previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    description: 'Establish trust with online appointment scheduling, team bios, and service grids.'
  },
  {
    id: 'blog',
    title: 'Lifestyle Blog & News',
    category: 'Content',
    previewUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    description: 'SEO-ready blog layouts with subscription forms and social media integration.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Founder at TechPulse',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    verified: true,
    text: 'Switching to Gofayda Business plan was the best decision for our e-commerce site. Our page load speed dropped from 3.2s to 0.7s, and the free SSL + automatic backups give us total peace of mind.'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Freelance UX Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    verified: true,
    text: 'The Gofayda AI Website Builder generated my portfolio in less than 5 minutes! I customized the colors to match my brand, connected my free domain, and launched the same evening.'
  },
  {
    id: 3,
    name: 'Vikram Mehta',
    role: 'DevOps Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5,
    verified: true,
    text: 'Cloud Startup plan resources are truly dedicated. NVMe storage performance is super fast. Customer support responds via live chat within 2 minutes every single time.'
  }
];

export const FAQS = [
  {
    question: 'How does the 30-day money-back guarantee work?',
    answer: 'If you choose to cancel your web hosting account within 30 days of purchase, Gofayda will provide a full refund of your hosting payment. No hassle, no hidden fees.'
  },
  {
    question: 'Do I get a free domain name with Gofayda plans?',
    answer: 'Yes! Premium, Business, and Cloud Startup hosting plans include a FREE domain name (.com, .in, .net, etc.) for the first year.'
  },
  {
    question: 'Can I migrate my existing website to Gofayda for free?',
    answer: 'Absolutely. Gofayda provides free automatic website migration. Our migration team handles everything with zero downtime for your website visitors.'
  },
  {
    question: 'How easy is it to launch a WordPress website on Gofayda?',
    answer: 'Very easy! Gofayda includes a 1-Click WordPress Installer, automated plugin updates, and LiteSpeed performance optimization pre-configured out of the box.'
  },
  {
    question: 'What kind of support will I receive?',
    answer: 'Our customer support team is available 24/7/365 in multiple languages via live chat. We maintain an average response time of under 3 minutes.'
  }
];
