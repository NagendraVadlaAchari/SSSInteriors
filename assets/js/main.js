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

})();
