/**
 * =====================================================
 *   SSS INTERIORS — GLOBAL SITE CONFIGURATION
 *   Edit this file to update contact details across
 *   the ENTIRE website instantly.
 * =====================================================
 */
const SITE_CONFIG = {

  /* ── BRAND ─────────────────────────────────────── */
  brandShort:    "SSS Interiors",
  brandFull:     "Sri Sai Sahasra Interiors",
  tagline:       "Transforming Houses Into Dream Homes Since 2009",
  established:   "2009",
  location:      "Hyderabad, Telangana",

  /* ── WHATSAPP ───────────────────────────────────── */
  // Change ONLY this number to update WhatsApp across the whole site
  // Format: country code + number, no spaces, no + sign (e.g., 919876543210)
  whatsappNumber: "919876543210",
  whatsappMessage: "Hi, I am interested in your interior design services. Please get in touch.",

  /* ── PHONE ──────────────────────────────────────── */
  phone1: "+91 98765 43210",
  phone1Raw: "+919876543210",
  phone2: "040 2345 6789",
  phone2Raw: "+914023456789",

  /* ── EMAIL ──────────────────────────────────────── */
  email: "info@sssinteriors.com",

  /* ── ADDRESS ────────────────────────────────────── */
  address: "Plot No. 42, Jubilee Hills,<br>Hyderabad – 500 033, Telangana",

  /* ── WORKING HOURS ──────────────────────────────── */
  hours: "Mon – Sat: 9:00 AM – 7:00 PM",

  /* ── SOCIAL MEDIA ───────────────────────────────── */
  instagram: "https://instagram.com",
  facebook:  "https://facebook.com",
  youtube:   "https://youtube.com",

  /* ── STATS ──────────────────────────────────────── */
  stats: [
    { number: 500,  suffix: "+", label: "Happy Families" },
    { number: 15,   suffix: "+", label: "Years Experience" },
    { number: 1000, suffix: "+", label: "Projects Completed" },
    { number: 100,  suffix: "%", label: "Client Satisfaction" }
  ]
};

/* Make config available globally */
window.SITE_CONFIG = SITE_CONFIG;
