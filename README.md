# 🌐 Gofayda - Premium Web Hosting & Cloud Platform

[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()

**Gofayda** is a modern, high-conversion web hosting and cloud services web application inspired by leading hosting platforms. It comes with an interactive pricing engine, live domain checker, AI website builder showcase, shopping cart drawer, multi-currency conversion, theme customization, and an enterprise-grade live Content Management System (Admin Control Panel) secured with cryptographic hashing and brute-force protection.

---

## ✨ Features at a Glance

### 🚀 Public Storefront & User Experience
- **Dynamic Pricing Engine**: Real-time billing cycle toggle (1, 12, 24, and 48 months) with automated discount calculations and savings highlights.
- **Multi-Currency Converter**: Instant currency switcher supporting **INR (₹)**, **USD ($)**, **EUR (€)**, **GBP (£)**, and **AED (د.إ)** with dynamic exchange rates.
- **Interactive Domain Search Widget**: Live TLD availability checker (`.com`, `.in`, `.net`, `.org`, `.online`, `.tech`, `.io`) with instant add-to-cart functionality.
- **AI Website Builder Showcase**: Interactive interactive demo highlighting responsive website generation, templates, and device previews.
- **Interactive Slide-Out Cart Drawer**: Full-featured cart drawer supporting quantity updates, promo codes, tax/discount calculation, and confetti checkout animation.
- **Comprehensive Feature Comparison Table**: Deep breakdown of plan specifications with collapsible categories and tooltips.
- **Dynamic Theme Preset Switcher**: 4 built-in aesthetic themes (**Indigo Modern**, **Sapphire Blue**, **Cyber Violet**, and **Emerald Green**) updated live via CSS variables.

---

### 🛡️ Secure Admin Control Panel (Live CMS)
The project includes a built-in live Content Management System that allows administrators to modify the website in real time with instant `localStorage` persistence:

- **Hosting Plans Manager**: Add, edit, or remove hosting plans, adjust monthly pricing, regular pricing, badges, and server specs.
- **Domain TLD Manager**: Configure TLD pricing, popularity badges, and promotional discounts.
- **Hero & Banner Editor**: Update hero headlines, badges, subtitles, call-to-action buttons, and top announcement bars.
- **FAQs & Reviews Editor**: Manage customer testimonials, Trustpilot ratings, and FAQ accordions.
- **Backup, Export & Import Engine**: Export your entire website configuration to a `.json` file, restore from file, or reset to factory defaults.
- **Security & Password Manager**: Update administrator username and master password anytime with current password verification.

---

## 🔒 Security Architecture

The Admin Control Panel is completely hidden from public visitors and secured with multi-layered defense:

| Security Feature | Implementation Details |
| :--- | :--- |
| **Public Anonymity** | No public "Admin" buttons in the navigation bar or footer. Hidden from regular shoppers. |
| **Cryptographic Hashing** | Passwords are cryptographically salted and hashed using browser-native **SHA-256** (`crypto.subtle.digest`). Plaintext passwords are never stored. |
| **Anti-Brute-Force Lockout** | Automatically locks access for **60 seconds** after 5 consecutive failed attempts, displaying an active countdown timer. |
| **Session Management** | Authenticated admin sessions are stored securely with automatic 60-minute expiration and instant **Log Out** revocation. |
| **Discreet Entry Points** | Accessible via secret shortcut (`Ctrl + Shift + A` / `Cmd + Shift + A`), URL hash (`/#admin`), or the discreet staff indicator in the footer. |

---

## 🔑 Administrator Access Guide

### How to Access the Admin Portal:
1. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) anywhere on the page.
2. **Direct URL Hash**: Append `/#admin` to the browser URL (e.g., `http://localhost:3000/#admin`).
3. **Discreet Footer Trigger**: Click the subtle shield icon located in the copyright line at the bottom of the page.

### Default Initial Credentials:
- **Admin Username**: `admin`
- **Master Password**: `Admin@2026#Secure`

> **Note**: You can change your password immediately after logging in by opening the **Security & Passwords** tab in the Admin Control Panel.

---

## 🛠️ Technology Stack

- **Frontend Framework**: [React 18](https://reactjs.org/)
- **Build Tool & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: Vanilla CSS (Custom Design System with CSS Tokens, Glassmorphism, and HSL palettes)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & Effects**: Custom CSS keyframes, [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Security & Cryptography**: Native Web Crypto API (SHA-256 + Salt)
- **State Management**: React Context API (`SiteDataContext`) with automated `localStorage` syncing

---

## 📂 Project Structure

```text
gofayda/
├── public/                     # Static assets & favicon
├── src/
│   ├── components/             # Reusable UI Components
│   │   ├── admin/              # Administrative Modules
│   │   │   ├── AdminAuthModal.jsx  # Secure login modal (Brute-force protected)
│   │   │   └── AdminModal.jsx      # Live CMS & website management dashboard
│   │   ├── AnnouncementBar.jsx # Top promotional countdown bar
│   │   ├── BillingToggle.jsx   # Billing cycle switcher (1-48 months)
│   │   ├── CartDrawer.jsx      # Slide-out shopping cart & checkout
│   │   ├── DomainSearchWidget.jsx # Live domain availability search
│   │   ├── FAQSection.jsx      # Interactive FAQ accordions
│   │   ├── FeatureComparisonTable.jsx # Technical specifications table
│   │   ├── Footer.jsx          # Multi-column footer & copyright
│   │   ├── HeroSection.jsx     # Hero banner with primary CTA
│   │   ├── Navbar.jsx          # Header navigation & controls
│   │   ├── PricingGrid.jsx     # Hosting plan cards with dynamic currency
│   │   ├── TestimonialsSection.jsx # Trustpilot reviews & ratings
│   │   └── WebsiteBuilderShowcase.jsx # AI builder interactive showcase
│   ├── context/
│   │   └── SiteDataContext.jsx # Persistent live website data provider
│   ├── data/
│   │   └── hostingData.js      # Default plans, TLDs, FAQs & theme presets
│   ├── styles/
│   │   └── app.css             # Global design tokens, typography & CSS variables
│   ├── utils/
│   │   └── security.js         # SHA-256 hashing, rate limiting & session manager
│   ├── App.jsx                 # Main application controller
│   └── main.jsx                # Application root entry point
├── index.html                  # HTML5 template
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/gofayda.git
   cd gofayda
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or the URL shown in your terminal) to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Launches the local development server with Hot Module Replacement (HMR). |
| `npm run build` | Bundles and optimizes the production build into the `dist/` directory. |
| `npm run preview` | Serves the production build locally for verification. |

---

## 🎨 Customizing & Exporting Data

- **Live Changes**: Any changes made inside the Admin Control Panel take effect immediately and are saved to browser storage.
- **Exporting Configuration**: Go to **Admin Panel > Backup & Reset > Export JSON File** to download your custom website data.
- **Importing Configuration**: Use **Choose File to Import** to load your configuration on another device or environment.
- **Reset**: Click **Reset Everything** under Backup & Reset to restore factory defaults.

---

## 📖 Deployment & Troubleshooting Guide

For complete instructions on deploying this app on **aaPanel / Nginx**, fixing the default placeholder page, setting up SPA URL rewrite rules, and troubleshooting errors, see the **[Deployment & Troubleshooting Guide](DEPLOYMENT_TROUBLESHOOTING.md)**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
