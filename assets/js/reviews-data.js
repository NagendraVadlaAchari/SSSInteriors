/**
 * ============================================================
 *   SSS INTERIORS — CUSTOMER REVIEWS DATA & MODERATION MANAGER
 *   Sri Sai Sahasra Interiors (CEO Mahesh Shinde)
 *   - LocalStorage persistence under 'sss_customer_reviews'
 *   - Status tracking: 'approved' (live) vs 'pending' (moderation)
 *   - Complete Admin controls: Accept, Delete, Add, Reset, Backup
 * ============================================================
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sss_customer_reviews';

  // 1. DEFAULT VERIFIED REVIEWS (All pre-approved)
  const DEFAULT_VERIFIED_REVIEWS = [
    {
      id: 'rev-def-1',
      name: 'Dr. Ramesh & Sunita Rao',
      project: 'Turnkey Duplex Villa • Jubilee Hills',
      rating: 5,
      comment: 'SSS Interiors designed our 4500 sq ft duplex villa in Jubilee Hills. The level of bespoke craftsmanship in the modular kitchen and double-height living room is truly world-class. Mahesh Shinde and the site engineers were on top of every millimeter!',
      date: 'Nov 2026',
      timestamp: 1731600000000,
      status: 'approved'
    },
    {
      id: 'rev-def-2',
      name: 'S. Venkat Reddy',
      project: 'Turnkey Construction & Interior • Madhapur',
      rating: 5,
      comment: 'SSS Interiors handled our independent house construction right from plot foundation to complete interior woodwork. Having single-point accountability for civil + interior was the best decision! Zero stress, delivered on schedule.',
      date: 'Oct 2026',
      timestamp: 1729000000000,
      status: 'approved'
    },
    {
      id: 'rev-def-3',
      name: 'Priya & Vikram Naidu',
      project: '3BHK Penthouse • Financial District',
      rating: 5,
      comment: 'The biggest fear with interior decorators is delays and hidden costs. Sri Sai Sahasra Interiors gave us a fixed quotation with timeline commitments and delivered 4 days ahead of schedule! Best decision we took.',
      date: 'Sep 2026',
      timestamp: 1726000000000,
      status: 'approved'
    },
    {
      id: 'rev-def-4',
      name: 'Sunitha & Rajeshwar Rao',
      project: 'Duplex Villa Living & Kitchen • Jubilee Hills',
      rating: 5,
      comment: 'The 3D wave accent wall, curved sofa layout, and chef-grade island kitchen exceeded our highest expectations. Visitors always compliment the acoustic wall paneling.',
      date: 'Aug 2026',
      timestamp: 1723000000000,
      status: 'approved'
    },
    {
      id: 'rev-def-5',
      name: 'Harish Varma',
      project: 'Master Bedroom Suite & Bar • Gachibowli',
      rating: 5,
      comment: 'Flawless craftsmanship in the fluted oak bedroom and custom marble center tables. The in-house carpentry team was punctual, clean, and highly professional throughout.',
      date: 'Jul 2026',
      timestamp: 1720500000000,
      status: 'approved'
    },
    {
      id: 'rev-def-6',
      name: 'Anand & Meera Joshi',
      project: 'Modular Kitchen & Dining • Banjara Hills',
      rating: 5,
      comment: 'Their modular kitchen engineering is unmatched in Hyderabad. The soft-close German hardware, scratch-proof acrylic shutters, and quartz island look straight out of an architectural digest.',
      date: 'Jun 2026',
      timestamp: 1718000000000,
      status: 'approved'
    },
    {
      id: 'rev-def-7',
      name: 'Kalyan Chakravarthy',
      project: 'Full Home Interior • Gachibowli',
      rating: 5,
      comment: 'From false ceilings with indirect warm cove lighting to custom Burma teak beds, SSS Interiors transformed our apartment into a palace. Truly transparent pricing.',
      date: 'May 2026',
      timestamp: 1715500000000,
      status: 'approved'
    },
    {
      id: 'rev-def-8',
      name: 'Kishore R. & Family',
      project: 'Commercial Office (3000 sq ft) • HITEC City',
      rating: 5,
      comment: 'We hired them for our 3000 sq ft corporate office in HITEC City. The executive boardroom acoustics, ergonomic workstations, and reception aesthetic boosted our brand image tremendously.',
      date: 'Apr 2026',
      timestamp: 1713000000000,
      status: 'approved'
    },
    {
      id: 'rev-def-9',
      name: 'Sneha Reddy',
      project: 'Turnkey 4BHK • Kokapet',
      rating: 5,
      comment: 'Even after 2 years of completion, when we needed a small hinge adjustment in our wardrobe, their support team came within 24 hours. The after-sales care is extraordinary.',
      date: 'Mar 2026',
      timestamp: 1710500000000,
      status: 'approved'
    }
  ];

  // 2. RETRIEVAL & NORMALIZATION
  function getAllReviews() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          let updated = false;
          const normalized = parsed.map((item, idx) => {
            const copy = { ...item };
            if (!copy.id) {
              copy.id = 'rev-legacy-' + (idx + 1) + '-' + (copy.timestamp || Date.now());
              updated = true;
            }
            if (!copy.status) {
              copy.status = 'approved';
              updated = true;
            }
            return copy;
          });
          if (updated) {
            saveAllReviews(normalized);
          }
          return normalized;
        }
      }
    } catch (e) {
      console.warn('Error reading reviews from localStorage:', e);
    }

    // Default initialization
    saveAllReviews(DEFAULT_VERIFIED_REVIEWS);
    return DEFAULT_VERIFIED_REVIEWS.map(r => ({ ...r }));
  }

  function saveAllReviews(reviews) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage error while saving reviews:', e);
    }
  }

  // 3. FILTERED RETRIEVALS
  function getApprovedReviews() {
    return getAllReviews().filter(r => r.status === 'approved' || !r.status);
  }

  function getPendingReviews() {
    return getAllReviews().filter(r => r.status === 'pending');
  }

  // 4. ADMIN ACTIONS: ACCEPT & DELETE & UNAPPROVE
  function acceptReview(id) {
    const list = getAllReviews();
    const target = list.find(r => String(r.id) === String(id));
    if (target) {
      target.status = 'approved';
      target.acceptedAt = new Date().toISOString();
      saveAllReviews(list);
      return target;
    }
    return null;
  }

  function unapproveReview(id) {
    const list = getAllReviews();
    const target = list.find(r => String(r.id) === String(id));
    if (target) {
      target.status = 'pending';
      saveAllReviews(list);
      return target;
    }
    return null;
  }

  function deleteReview(id) {
    const list = getAllReviews();
    const updated = list.filter(r => String(r.id) !== String(id));
    saveAllReviews(updated);
    return updated;
  }

  // 5. ADD REVIEW (From Customer or Admin)
  function addReview(data, isApproved = false) {
    const list = getAllReviews();
    const newRev = {
      id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: (data.name && data.name.trim()) ? data.name.trim() : 'Valued Client',
      project: (data.project && data.project.trim()) ? data.project.trim() : 'Turnkey Home Interior',
      rating: Math.max(1, Math.min(5, parseInt(data.rating, 10) || 5)),
      comment: (data.comment && data.comment.trim()) ? data.comment.trim() : '',
      date: data.date || new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      timestamp: data.timestamp || Date.now(),
      status: isApproved ? 'approved' : 'pending'
    };
    list.unshift(newRev);
    saveAllReviews(list);
    return newRev;
  }

  // 6. RESET & BACKUP
  function resetDefaultReviews() {
    saveAllReviews(DEFAULT_VERIFIED_REVIEWS);
    return DEFAULT_VERIFIED_REVIEWS.map(r => ({ ...r }));
  }

  function exportReviewsJSON() {
    const list = getAllReviews();
    const json = JSON.stringify(list, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sss-interiors-reviews-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }

  // 7. PUBLIC API EXPOSURE
  window.SSS_REVIEWS = {
    DEFAULT_REVIEWS: DEFAULT_VERIFIED_REVIEWS,
    getAllReviews: getAllReviews,
    getApprovedReviews: getApprovedReviews,
    getPendingReviews: getPendingReviews,
    acceptReview: acceptReview,
    unapproveReview: unapproveReview,
    deleteReview: deleteReview,
    addReview: addReview,
    resetDefaultReviews: resetDefaultReviews,
    exportReviewsJSON: exportReviewsJSON
  };

})();
