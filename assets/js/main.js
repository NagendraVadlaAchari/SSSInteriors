/**
 * Sri Sai Sahasra Interiors — Main JavaScript
 * Handles: Navbar, Hero Carousel, Scroll Animations, Counters,
 *          Portfolio Filter, Testimonial Carousel, Lightbox,
 *          FAQ Accordion, Form Validation, Dark Mode, Scroll-to-Top
 */

(function () {
  'use strict';

  /* =============================================
     PAGE LOADER
  ============================================= */
  window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
      setTimeout(function () { loader.classList.add('hidden'); }, 400);
    }
  });

  /* =============================================
     SCROLL PROGRESS BAR
  ============================================= */
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    if (!progressBar) return;
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  /* =============================================
     DARK MODE TOGGLE
  ============================================= */
  const darkToggle = document.getElementById('dark-toggle');
  const root = document.documentElement;
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('sssi-theme', theme);
    if (darkToggle) {
      darkToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
      darkToggle.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }
  const savedTheme = localStorage.getItem('sssi-theme') || 'light';
  applyTheme(savedTheme);
  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* =============================================
     STICKY NAVBAR + HAMBURGER
  ============================================= */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 10) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  /* Highlight active nav link */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* =============================================
     SMOOTH SCROLL for anchor links
  ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = (navbar ? navbar.offsetHeight : 80) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* =============================================
     HERO CAROUSEL
  ============================================= */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let heroIndex = 0;
  let heroTimer = null;
  let heroTouchStartX = 0;

  function showHeroSlide(index) {
    heroSlides.forEach(function (s) { s.classList.remove('active'); });
    heroDots.forEach(function (d) { d.classList.remove('active'); });
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    if (heroSlides[heroIndex]) heroSlides[heroIndex].classList.add('active');
    if (heroDots[heroIndex]) heroDots[heroIndex].classList.add('active');
  }

  function startHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(function () { showHeroSlide(heroIndex + 1); }, 5000);
  }

  if (heroSlides.length) {
    showHeroSlide(0);
    startHeroTimer();

    var prev = document.getElementById('hero-prev');
    var next = document.getElementById('hero-next');
    if (prev) prev.addEventListener('click', function () { showHeroSlide(heroIndex - 1); startHeroTimer(); });
    if (next) next.addEventListener('click', function () { showHeroSlide(heroIndex + 1); startHeroTimer(); });

    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showHeroSlide(i); startHeroTimer(); });
    });

    /* Swipe support */
    var heroEl = document.querySelector('.hero-slides');
    if (heroEl) {
      heroEl.addEventListener('touchstart', function (e) { heroTouchStartX = e.changedTouches[0].screenX; }, { passive: true });
      heroEl.addEventListener('touchend', function (e) {
        var diff = heroTouchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { showHeroSlide(diff > 0 ? heroIndex + 1 : heroIndex - 1); startHeroTimer(); }
      }, { passive: true });
    }
  }

  /* =============================================
     SCROLL ANIMATIONS (Intersection Observer)
  ============================================= */
  var aosElements = document.querySelectorAll('[data-aos]');
  if ('IntersectionObserver' in window && aosElements.length) {
    var aosObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = entry.target.getAttribute('data-aos-delay') || 0;
          setTimeout(function () {
            entry.target.classList.add('aos-animate');
          }, parseInt(delay));
          aosObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    aosElements.forEach(function (el) { aosObserver.observe(el); });
  } else {
    aosElements.forEach(function (el) { el.classList.add('aos-animate'); });
  }

  /* =============================================
     COUNTER ANIMATION
  ============================================= */
  function animateCounter(el, target, duration) {
    var start = 0;
    var increment = target / (duration / 16);
    var timer = setInterval(function () {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start);
    }, 16);
  }

  var counters = document.querySelectorAll('.counter-num');
  var countersStarted = false;
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(function (el) {
          animateCounter(el, parseInt(el.getAttribute('data-target') || el.textContent), 2000);
        });
        counterObserver.disconnect();
      }
    }, { threshold: 0.4 });
    var statsSection = document.querySelector('.stats');
    if (statsSection) counterObserver.observe(statsSection);
  }

  /* =============================================
     PORTFOLIO FILTER
  ============================================= */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInCard .4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* =============================================
     LIGHTBOX
  ============================================= */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  portfolioCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var img = card.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
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
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  /* =============================================
     TESTIMONIAL CAROUSEL
  ============================================= */
  var testimonialTrack = document.querySelector('.testimonials-track');
  var testimonialDots = document.querySelectorAll('.testimonial-dot');
  var testimonialCards = document.querySelectorAll('.testimonial-card');
  var testimonialIndex = 0;
  var testimonialTimer = null;
  var testTouchStartX = 0;

  function showTestimonial(index) {
    if (!testimonialTrack) return;
    testimonialIndex = (index + testimonialCards.length) % testimonialCards.length;
    testimonialTrack.style.transform = 'translateX(-' + (testimonialIndex * 100) + '%)';
    testimonialDots.forEach(function (d) { d.classList.remove('active'); });
    if (testimonialDots[testimonialIndex]) testimonialDots[testimonialIndex].classList.add('active');
  }

  function startTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(function () { showTestimonial(testimonialIndex + 1); }, 6000);
  }

  if (testimonialCards.length) {
    showTestimonial(0);
    startTestimonialTimer();
    var tPrev = document.getElementById('test-prev');
    var tNext = document.getElementById('test-next');
    if (tPrev) tPrev.addEventListener('click', function () { showTestimonial(testimonialIndex - 1); startTestimonialTimer(); });
    if (tNext) tNext.addEventListener('click', function () { showTestimonial(testimonialIndex + 1); startTestimonialTimer(); });
    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showTestimonial(i); startTestimonialTimer(); });
    });

    if (testimonialTrack) {
      testimonialTrack.addEventListener('touchstart', function (e) { testTouchStartX = e.changedTouches[0].screenX; }, { passive: true });
      testimonialTrack.addEventListener('touchend', function (e) {
        var diff = testTouchStartX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) { showTestimonial(diff > 0 ? testimonialIndex + 1 : testimonialIndex - 1); startTestimonialTimer(); }
      }, { passive: true });
    }
  }

  /* =============================================
     FAQ ACCORDION
  ============================================= */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        faqItems.forEach(function (fi) { fi.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  /* =============================================
     FORM VALIDATION
  ============================================= */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    function validateField(field) {
      var group = field.closest('.form-group');
      if (!group) return true;
      var value = field.value.trim();
      var valid = true;

      if (field.required && !value) valid = false;
      if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) valid = false;
      if (field.dataset.type === 'phone' && value && !/^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))) valid = false;

      if (!valid) {
        group.classList.add('invalid');
        field.classList.add('error');
      } else {
        group.classList.remove('invalid');
        field.classList.remove('error');
      }
      return valid;
    }

    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () { if (field.classList.contains('error')) validateField(field); });
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = contactForm.querySelectorAll('input, select, textarea');
      var allValid = true;
      fields.forEach(function (f) { if (!validateField(f)) allValid = false; });

      if (allValid) {
        var successMsg = document.getElementById('form-success');
        if (successMsg) successMsg.classList.add('show');
        contactForm.reset();
        setTimeout(function () { if (successMsg) successMsg.classList.remove('show'); }, 5000);
      }
    });
  }

  /* =============================================
     SCROLL TO TOP
  ============================================= */
  var scrollTopBtn = document.getElementById('scroll-top');
  window.addEventListener('scroll', function () {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) { scrollTopBtn.classList.add('visible'); }
    else { scrollTopBtn.classList.remove('visible'); }
  }, { passive: true });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =============================================
     WHATSAPP CLICK TRACKING
  ============================================= */
  document.querySelectorAll('.whatsapp-float, .btn-whatsapp').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', { event_category: 'engagement', event_label: 'whatsapp' });
      }
    });
  });

  /* =============================================
     FADE-IN CARD KEYFRAME (injected)
  ============================================= */
  var style = document.createElement('style');
  style.textContent = '@keyframes fadeInCard { from { opacity:0; transform:scale(.96); } to { opacity:1; transform:scale(1); } }';
  document.head.appendChild(style);

})();
