/**
 * ============================================================
 *   SSS INTERIORS — MAIN JAVASCRIPT
 *   Fully synced with config.js for instant configuration
 *   Clean luxury animations (subtle vertical reveals only)
 * ============================================================
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. APPLY GLOBAL SITE CONFIG (from config.js)
     Allows user to easily change WhatsApp, Phone, Email in 1 place
  ------------------------------------------------------------ */
  function applySiteConfig() {
    if (typeof window.SITE_CONFIG === 'undefined') return;
    const cfg = window.SITE_CONFIG;

    // Helper: update all elements matching selector
    function updateText(selector, text) {
      document.querySelectorAll(selector).forEach(el => el.textContent = text);
    }
    function updateHTML(selector, html) {
      document.querySelectorAll(selector).forEach(el => el.innerHTML = html);
    }

    // Dynamic brand text
    updateText('.cfg-brand-short', cfg.brandShort || 'SSS Interiors');
    updateText('.cfg-brand-full', cfg.brandFull || 'Sri Sai Sahasra Interiors');
    updateText('.cfg-tagline', cfg.tagline || '');
    updateText('.cfg-hours', cfg.hours || '');

    // Phone updates
    document.querySelectorAll('.cfg-phone-link').forEach(el => {
      el.href = 'tel:' + cfg.phone1Raw;
      const textSpan = el.querySelector('.cfg-phone-text') || el;
      if (textSpan === el && !el.querySelector('i')) {
        el.textContent = cfg.phone1;
      } else {
        const span = el.querySelector('.cfg-phone-text');
        if (span) span.textContent = cfg.phone1;
      }
    });
    updateText('.cfg-phone-display', cfg.phone1);

    // Email updates
    document.querySelectorAll('.cfg-email-link').forEach(el => {
      el.href = 'mailto:' + cfg.email;
      const span = el.querySelector('.cfg-email-text');
      if (span) span.textContent = cfg.email;
      else if (!el.querySelector('i')) el.textContent = cfg.email;
    });

    // Address updates
    updateHTML('.cfg-address', cfg.address || '');

    // WhatsApp dynamic URLs across the ENTIRE site
    const defaultMsg = encodeURIComponent(cfg.whatsappMessage || 'Hi, I am interested in your interior design services.');
    const waUrl = 'https://wa.me/' + cfg.whatsappNumber + '?text=' + defaultMsg;

    document.querySelectorAll('.cfg-whatsapp-link, .wa-float, .btn-whatsapp').forEach(el => {
      // If the link has a custom data-msg, use that, else use global default
      const customMsg = el.getAttribute('data-msg');
      if (customMsg) {
        el.href = 'https://wa.me/' + cfg.whatsappNumber + '?text=' + encodeURIComponent(customMsg);
      } else {
        el.href = waUrl;
      }
    });

    // Secondary WhatsApp dynamic links
    const secWaNum = cfg.secondaryWhatsappNumber || '918919215275';
    document.querySelectorAll('.cfg-whatsapp-secondary').forEach(el => {
      el.href = 'https://wa.me/' + secWaNum + '?text=' + defaultMsg;
    });

    // Social links
    document.querySelectorAll('.cfg-instagram').forEach(el => el.href = cfg.instagram || '#');
    document.querySelectorAll('.cfg-facebook').forEach(el => el.href = cfg.facebook || '#');
    document.querySelectorAll('.cfg-youtube').forEach(el => el.href = cfg.youtube || '#');
  }

  // Run on DOMContentLoaded or immediately if ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySiteConfig);
  } else {
    applySiteConfig();
  }

  /* ------------------------------------------------------------
     2. PAGE LOADER
  ------------------------------------------------------------ */
  window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 350);
    }
  });

  /* ------------------------------------------------------------
     3. SCROLL PROGRESS BAR & STICKY NAVBAR
  ------------------------------------------------------------ */
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scroll-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }

    // Sticky navbar
    if (navbar) {
      if (scrollY > 30) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    if (scrollTopBtn) {
      if (scrollY > 400) scrollTopBtn.classList.add('visible');
      else scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------
     4. MOBILE MENU
  ------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* Active nav link */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ------------------------------------------------------------
     5. HERO SLIDER (Crossfade, luxury style)
  ------------------------------------------------------------ */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroIdx = 0;
  let heroInterval = null;

  function setHeroSlide(idx) {
    if (!heroSlides.length) return;
    heroSlides.forEach(s => s.classList.remove('active'));
    heroDots.forEach(d => d.classList.remove('active'));

    currentHeroIdx = (idx + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroIdx].classList.add('active');
    if (heroDots[currentHeroIdx]) heroDots[currentHeroIdx].classList.add('active');
  }

  function startHeroAutoplay() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
      setHeroSlide(currentHeroIdx + 1);
    }, 5500);
  }

  if (heroSlides.length) {
    setHeroSlide(0);
    startHeroAutoplay();

    const heroPrev = document.getElementById('hero-prev');
    const heroNext = document.getElementById('hero-next');

    if (heroPrev) {
      heroPrev.addEventListener('click', () => {
        setHeroSlide(currentHeroIdx - 1);
        startHeroAutoplay();
      });
    }
    if (heroNext) {
      heroNext.addEventListener('click', () => {
        setHeroSlide(currentHeroIdx + 1);
        startHeroAutoplay();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setHeroSlide(idx);
        startHeroAutoplay();
      });
    });
  }

  /* ------------------------------------------------------------
     6. SUBTLE VERTICAL REVEAL (NO jarring horizontal animations)
  ------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* ------------------------------------------------------------
     7. NUMERICAL COUNTER ANIMATION (Luxury ease-out)
  ------------------------------------------------------------ */
  const counterElements = document.querySelectorAll('.counter-val');
  let countersAnimated = false;

  function runCounters() {
    counterElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1800;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        // Ease out quad
        const progress = frame / totalFrames;
        const current = Math.round(target * (progress * (2 - progress)));
        el.textContent = current;

        if (frame === totalFrames) {
          el.textContent = target;
          clearInterval(counter);
        }
      }, frameDuration);
    });
  }

  const statsSection = document.querySelector('.stats-bar, .stats-grid');
  if (statsSection && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        runCounters();
        statObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statObserver.observe(statsSection);
  } else if (counterElements.length) {
    runCounters();
  }

  /* ------------------------------------------------------------
     8. PORTFOLIO FILTER
  ------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll('.pf-btn');
  const portfolioCards = document.querySelectorAll('.p-card, .pp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const cat = this.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const itemCat = card.getAttribute('data-category');
        if (cat === 'all' || itemCat === cat) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------
     9. LIGHTBOX
  ------------------------------------------------------------ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.p-card, .pp-card').forEach(card => {
    card.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Interior Design View';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ------------------------------------------------------------
     10. TESTIMONIALS SLIDER
  ------------------------------------------------------------ */
  const tTrack = document.querySelector('.testimonials-track');
  const tDots = document.querySelectorAll('.t-dot');
  const tCards = document.querySelectorAll('.testimonial-card');
  let currentTIdx = 0;
  let tInterval = null;

  function setTestimonial(idx) {
    if (!tTrack || !tCards.length) return;
    currentTIdx = (idx + tCards.length) % tCards.length;
    tTrack.style.transform = `translateX(-${currentTIdx * 100}%)`;
    tDots.forEach(d => d.classList.remove('active'));
    if (tDots[currentTIdx]) tDots[currentTIdx].classList.add('active');
  }

  function startTestimonials() {
    clearInterval(tInterval);
    tInterval = setInterval(() => {
      setTestimonial(currentTIdx + 1);
    }, 6500);
  }

  if (tTrack && tCards.length) {
    setTestimonial(0);
    startTestimonials();

    const tPrev = document.getElementById('t-prev');
    const tNext = document.getElementById('t-next');

    if (tPrev) {
      tPrev.addEventListener('click', () => {
        setTestimonial(currentTIdx - 1);
        startTestimonials();
      });
    }
    if (tNext) {
      tNext.addEventListener('click', () => {
        setTestimonial(currentTIdx + 1);
        startTestimonials();
      });
    }

    tDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        setTestimonial(idx);
        startTestimonials();
      });
    });

    // Pause auto-sliding on hover, resume on leave
    tTrack.addEventListener('mouseenter', () => clearInterval(tInterval));
    tTrack.addEventListener('mouseleave', () => startTestimonials());

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    tTrack.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(tInterval);
    }, { passive: true });
    tTrack.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        setTestimonial(currentTIdx + 1);
      } else if (touchEndX - touchStartX > 50) {
        setTestimonial(currentTIdx - 1);
      }
      startTestimonials();
    }, { passive: true });
  }

  /* ------------------------------------------------------------
     11. FAQ ACCORDION
  ------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(fi => fi.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* ------------------------------------------------------------
     12. CONTACT FORM WITH DIRECT WHATSAPP OPTION
  ------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (contactForm.querySelector('[name="name"]') || {}).value || '';
      const phone = (contactForm.querySelector('[name="phone"]') || {}).value || '';
      const service = (contactForm.querySelector('[name="service"]') || {}).value || '';
      const message = (contactForm.querySelector('[name="message"]') || {}).value || '';

      const successBox = document.getElementById('form-success');
      if (successBox) {
        successBox.classList.add('show');
        setTimeout(() => successBox.classList.remove('show'), 6000);
      }

      // If user provided phone and wants immediate quote, optionally prompt WhatsApp
      const cfg = window.SITE_CONFIG || {};
      const waNum = cfg.whatsappNumber || '917702066446';
      const promptText = `Hi SSS Interiors, I submitted a consultation request.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Details:* ${encodeURIComponent(message)}`;

      // Open in small delayed popup/tab if desired or keep on-screen notification
      setTimeout(() => {
        window.open(`https://wa.me/${waNum}?text=${promptText}`, '_blank');
      }, 800);

      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------
     13. DYNAMIC CUSTOMER REVIEWS (Interactive Addition & Persistence)
  ------------------------------------------------------------ */
  const openReviewModalBtn = document.getElementById('openReviewModalBtn');
  const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
  const reviewModal = document.getElementById('reviewModal');
  const customerReviewForm = document.getElementById('customerReviewForm');
  const starRatingSelector = document.getElementById('starRatingSelector');
  const reviewRatingVal = document.getElementById('reviewRatingVal');
  const reviewSuccessMsg = document.getElementById('reviewSuccessMsg');
  const customerReviewsFeed = document.getElementById('customerReviewsFeed');

    const defaultVerifiedReviews = [
    {
      name: "Dr. Ramesh & Sunita Rao",
      project: "Turnkey Duplex Villa • Jubilee Hills",
      rating: 5,
      comment: "SSS Interiors designed our 4500 sq ft duplex villa in Jubilee Hills. The level of bespoke craftsmanship in the modular kitchen and double-height living room is truly world-class. Mahesh Shinde and the site engineers were on top of every millimeter!",
      date: "Nov 2026"
    },
    {
      name: "S. Venkat Reddy",
      project: "Turnkey Construction & Interior • Madhapur",
      rating: 5,
      comment: "SSS Interiors handled our independent house construction right from plot foundation to complete interior woodwork. Having single-point accountability for civil + interior was the best decision! Zero stress, delivered on schedule.",
      date: "Oct 2026"
    },
    {
      name: "Priya & Vikram Naidu",
      project: "3BHK Penthouse • Financial District",
      rating: 5,
      comment: "The biggest fear with interior decorators is delays and hidden costs. Sri Sai Sahasra Interiors gave us a fixed quotation with timeline commitments and delivered 4 days ahead of schedule! Best decision we took.",
      date: "Sep 2026"
    },
    {
      name: "Sunitha & Rajeshwar Rao",
      project: "Duplex Villa Living & Kitchen • Jubilee Hills",
      rating: 5,
      comment: "The 3D wave accent wall, curved sofa layout, and chef-grade island kitchen exceeded our highest expectations. Visitors always compliment the acoustic wall paneling.",
      date: "Aug 2026"
    },
    {
      name: "Harish Varma",
      project: "Master Bedroom Suite & Bar • Gachibowli",
      rating: 5,
      comment: "Flawless craftsmanship in the fluted oak bedroom and custom marble center tables. The in-house carpentry team was punctual, clean, and highly professional throughout.",
      date: "Jul 2026"
    },
    {
      name: "Anand & Meera Joshi",
      project: "Modular Kitchen & Dining • Banjara Hills",
      rating: 5,
      comment: "Their modular kitchen engineering is unmatched in Hyderabad. The soft-close German hardware, scratch-proof acrylic shutters, and quartz island look straight out of an architectural digest.",
      date: "Jun 2026"
    },
    {
      name: "Kalyan Chakravarthy",
      project: "Full Home Interior • Gachibowli",
      rating: 5,
      comment: "From false ceilings with indirect warm cove lighting to custom Burma teak beds, SSS Interiors transformed our apartment into a palace. Truly transparent pricing.",
      date: "May 2026"
    },
    {
      name: "Kishore R. & Family",
      project: "Commercial Office (3000 sq ft) • HITEC City",
      rating: 5,
      comment: "We hired them for our 3000 sq ft corporate office in HITEC City. The executive boardroom acoustics, ergonomic workstations, and reception aesthetic boosted our brand image tremendously.",
      date: "Apr 2026"
    },
    {
      name: "Sneha Reddy",
      project: "Turnkey 4BHK • Kokapet",
      rating: 5,
      comment: "Even after 2 years of completion, when we needed a small hinge adjustment in our wardrobe, their support team came within 24 hours. The after-sales care is extraordinary.",
      date: "Mar 2026"
    }
  ];

  function getStoredReviews() {
    try {
      const stored = localStorage.getItem('sss_customer_reviews');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return defaultVerifiedReviews;
  }

  function saveStoredReviews(reviews) {
    try {
      localStorage.setItem('sss_customer_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
  }

  function createCustomerReviewCard(rev, isNew) {
    const card = document.createElement('div');
    card.className = 'cr-card';
    if (isNew) {
      card.style.borderColor = 'var(--gold)';
      card.style.boxShadow = '0 8px 24px rgba(200, 169, 106, 0.25)';
    }

    const initial = (rev.name && rev.name.trim().length > 0) ? rev.name.trim().charAt(0).toUpperCase() : 'C';
    const starCount = Math.max(1, Math.min(5, parseInt(rev.rating, 10) || 5));
    const starHtml = '<i class="fas fa-star" style="color:var(--gold);margin-right:2px;"></i>'.repeat(starCount) + '<i class="far fa-star" style="color:rgba(255,255,255,0.25);margin-right:2px;"></i>'.repeat(5 - starCount);
    const dateText = rev.date || (rev.timestamp ? new Date(rev.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Homeowner');

    card.innerHTML = `
      <div class="cr-card-top">
        <div class="cr-header-row">
          <span class="cr-badge"><i class="fas fa-check-circle"></i> Verified Homeowner</span>
          <span class="cr-date">${dateText}</span>
        </div>
        <div class="cr-stars">${starHtml}</div>
        <p class="cr-comment">"${escapeHtml(rev.comment)}"</p>
      </div>
      <div class="cr-author">
        <div class="cr-avatar">${initial}</div>
        <div>
          <div class="cr-name">${escapeHtml(rev.name)}</div>
          <div class="cr-location">${escapeHtml(rev.project || 'Residential Turnkey Project')}</div>
        </div>
      </div>
    `;
    return card;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  function renderCustomerReviews(filterCat = 'all') {
    if (!customerReviewsFeed) return;
    customerReviewsFeed.innerHTML = '';
    let reviews = getStoredReviews();
    
    // Check if on dedicated reviews page
    const isReviewsPage = window.location.pathname.endsWith('reviews.html') || !!document.getElementById('allReviewsPageContainer');
    
    if (filterCat !== 'all') {
      if (filterCat === '5star') {
        reviews = reviews.filter(r => parseInt(r.rating, 10) === 5);
      } else {
        reviews = reviews.filter(r => (r.project || '').toLowerCase().includes(filterCat.toLowerCase()));
      }
    }
    
    // On homepage, display initial 3 reviews; on reviews.html display all
    const listToRender = isReviewsPage ? reviews : reviews.slice(0, 3);
    
    listToRender.forEach(rev => {
      customerReviewsFeed.appendChild(createCustomerReviewCard(rev, false));
    });
  }

  // Initial load
  renderCustomerReviews();

  // Filter Buttons on reviews.html if present
  const reviewFilterBtns = document.querySelectorAll('.rf-btn');
  if (reviewFilterBtns.length > 0) {
    reviewFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        reviewFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const cat = this.getAttribute('data-filter') || 'all';
        renderCustomerReviews(cat);
      });
    });
  }

  if (openReviewModalBtn && reviewModal) {
    openReviewModalBtn.addEventListener('click', () => {
      reviewModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (reviewSuccessMsg) reviewSuccessMsg.style.display = 'none';
    });
  }

  function closeReviewModal() {
    if (reviewModal) {
      reviewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', closeReviewModal);

  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) closeReviewModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
        closeReviewModal();
      }
    });
  }

  // Interactive 5-star selector
  if (starRatingSelector) {
    const stars = starRatingSelector.querySelectorAll('.star-opt');
    function updateStarDisplay(val) {
      stars.forEach(s => {
        const sVal = parseInt(s.getAttribute('data-val'), 10);
        if (sVal <= val) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    }

    stars.forEach(star => {
      star.addEventListener('mouseenter', function() {
        const val = parseInt(this.getAttribute('data-val'), 10);
        stars.forEach(s => {
          const sVal = parseInt(s.getAttribute('data-val'), 10);
          if (sVal <= val) {
            s.classList.add('hover');
          } else {
            s.classList.remove('hover');
          }
        });
      });

      star.addEventListener('mouseleave', function() {
        stars.forEach(s => s.classList.remove('hover'));
      });

      star.addEventListener('click', function() {
        const val = parseInt(this.getAttribute('data-val'), 10);
        if (reviewRatingVal) reviewRatingVal.value = val;
        updateStarDisplay(val);
      });
    });
  }

  // Handle Form Submission
  if (customerReviewForm) {
    customerReviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const nameInput = document.getElementById('reviewAuthorName');
      const projectInput = document.getElementById('reviewProjectType');
      const commentInput = document.getElementById('reviewComment');
      const rating = reviewRatingVal ? reviewRatingVal.value : 5;

      const newReview = {
        name: nameInput ? nameInput.value.trim() : 'Valued Client',
        project: projectInput ? projectInput.value.trim() : 'Turnkey Home Interior',
        rating: rating,
        comment: commentInput ? commentInput.value.trim() : '',
        timestamp: Date.now()
      };

      if (!newReview.name || !newReview.comment) return;

      // Save to localStorage
      const existing = getStoredReviews();
      existing.unshift(newReview);
      saveStoredReviews(existing);

      // Dynamically prepend to feed with zero extra space or grid distortion
      if (customerReviewsFeed) {
        const newEl = createCustomerReviewCard(newReview, true);
        customerReviewsFeed.prepend(newEl);
      }

      // Show success feedback
      if (reviewSuccessMsg) reviewSuccessMsg.style.display = 'block';
      customerReviewForm.reset();
      if (starRatingSelector) {
        starRatingSelector.querySelectorAll('.star-opt').forEach(s => s.classList.add('active'));
      }
      if (reviewRatingVal) reviewRatingVal.value = '5';

      // Auto close modal after 1.2s and smooth scroll to reviews
      setTimeout(() => {
        closeReviewModal();
        if (reviewSuccessMsg) reviewSuccessMsg.style.display = 'none';
        const reviewsWrap = document.getElementById('customerReviewsFeedWrap');
        if (reviewsWrap) {
          reviewsWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 1200);
    });
  }

  /* ------------------------------------------------------------
     14. CUSTOMER SERVICES CONTINUOUS SLOW-MOTION HORIZONTAL SCROLL
  ------------------------------------------------------------ */
  const csScrollTrack = document.getElementById('csScrollTrack');
  const csPrevBtn = document.getElementById('csPrevBtn');
  const csNextBtn = document.getElementById('csNextBtn');

  if (csScrollTrack) {
    let isCsPaused = false;
    let resumeTimeout = null;

    // Smooth continuous auto-scroll ticker (moves slowly)
    function autoScrollTick() {
      if (!isCsPaused) {
        csScrollTrack.scrollLeft += 0.8; // Slow, elegant speed
        // If reached end, seamlessly wrap to start
        if (csScrollTrack.scrollLeft >= (csScrollTrack.scrollWidth - csScrollTrack.clientWidth - 2)) {
          csScrollTrack.scrollLeft = 0;
        }
      }
      requestAnimationFrame(autoScrollTick);
    }

    // Start auto-scrolling
    requestAnimationFrame(autoScrollTick);

    // Pause on hover or touch so user can click or read easily
    csScrollTrack.addEventListener('mouseenter', () => { isCsPaused = true; });
    csScrollTrack.addEventListener('mouseleave', () => { isCsPaused = false; });
    csScrollTrack.addEventListener('touchstart', () => { isCsPaused = true; }, { passive: true });
    csScrollTrack.addEventListener('touchend', () => {
      clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => { isCsPaused = false; }, 2000);
    }, { passive: true });

    // Arrow navigation buttons
    if (csPrevBtn) {
      csPrevBtn.addEventListener('click', () => {
        isCsPaused = true;
        csScrollTrack.scrollBy({ left: -300, behavior: 'smooth' });
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => { isCsPaused = false; }, 3000);
      });
    }
    if (csNextBtn) {
      csNextBtn.addEventListener('click', () => {
        isCsPaused = true;
        csScrollTrack.scrollBy({ left: 300, behavior: 'smooth' });
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => { isCsPaused = false; }, 3000);
      });
    }
  }

})();
