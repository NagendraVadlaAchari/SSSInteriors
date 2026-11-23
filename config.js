/**
 * =====================================================
 *   SSS INTERIORS — GLOBAL SITE CONFIGURATION
 *   Sri Sai Sahasra Interiors
 * =====================================================
 */
const SITE_CONFIG = {

  /* ── BRAND ─────────────────────────────────────── */
  brandShort:    "SSS Interiors",
  brandFull:     "Sri Sai Sahasra Interiors",
  tagline:       "Transforming Houses Into Dream Homes Since 2009",
  established:   "2009",
  location:      "Hyderabad, Telangana",
  logo:          "assets/images/logo.jpg",

  /* ── LEADERSHIP ────────────────────────────────── */
  leadership: {
    name:  "Mahesh Shinde",
    role:  "MD & CEO",
    image: "assets/images/mahesh-md-ceo.jpg"
  },

  /* ── PRIMARY MOBILE & WHATSAPP ─────────────────── */
  primaryPhone:            "+91 77020 66446",
  primaryPhoneRaw:         "+917702066446",
  whatsappNumber:          "917702066446",
  whatsappMessage:         "Hi SSS Interiors, I am interested in your interior design services. Please get in touch.",

  /* ── SECONDARY WHATSAPP & PHONE ────────────────── */
  secondaryWhatsappNumber: "918919215275",
  secondaryPhone:          "+91 891 921 5275",
  secondaryPhoneRaw:       "+918919215275",

  /* Backward compatibility aliases */
  phone1:    "+91 77020 66446",
  phone1Raw: "+917702066446",
  phone2:    "+91 891 921 5275",
  phone2Raw: "+918919215275",

  /* ── EMAIL ──────────────────────────────────────── */
  email: "maheshjaya49@gmail.com",

  /* ── HEAD OFFICE ADDRESS ────────────────────────── */
  address: "Plot No : 103, Lingamsetty Arcade, near by mehara sai school, padma nagar phase 2, Chintal, Hyderabad, Telangana",
  addressHTML: "Plot No : 103, Lingamsetty Arcade,<br>near by mehara sai school, padma nagar phase 2,<br>Chintal, Hyderabad, Telangana",

  /* ── OTHER BRANCHES ─────────────────────────────── */
  branches: [
    "Madhapur",
    "Kukatpally",
    "Hitech City"
  ],
  branchesText: "Madhapur, Kukatpally, Hitech City - these three are other branches - HYD- TG.",
  branchesHTML: "<strong>Other Branches:</strong> Madhapur, Kukatpally, Hitech City (HYD- TG)",

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
  ],

  /* ── OWNER / ADMIN ACCESS ───────────────────────── */
  ownerPasscode:     "7702", // Default 4-digit PIN for Owner Access (matches 77020 66446)
  developerWhatsApp: "917702066446" // Destination for quick project sync notifications
};

/* Make config available globally */
window.SITE_CONFIG = SITE_CONFIG;
