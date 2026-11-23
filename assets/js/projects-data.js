/**
 * ============================================================
 *   SSS INTERIORS — PROJECTS DATA & OWNER SHOWCASE MANAGER
 *   Sri Sai Sahasra Interiors (Mahesh Shinde)
 *   - Clean segregation by space (Living, Bedroom, Kitchen, Civil, Furniture, Commercial)
 *   - Guaranteed 100% working local project assets
 *   - Curated 6-highlight display for "All Showcase" to prevent vertical scroll bloat
 *   - Interactive Grid View & Carousel Slider View modes
 *   - Owner-only image addition, persistence & management
 * ============================================================
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. DEFAULT CURATED SHOWCASE PROJECTS (100% Local Verified Images)
  ------------------------------------------------------------ */
  const DEFAULT_PROJECTS = [
    // === 1. LIVING ROOMS & HALLS ===
    {
      id: 'living-01',
      category: 'living',
      title: '3D Wave Wall & Curved Sectional Hall',
      sub: 'Living Room & Hall',
      image: 'assets/images/projects/living-room/living-room-10.jpg',
      featured: true
    },
    {
      id: 'living-02',
      category: 'living',
      title: 'Tan Leather L-Sofa & Geometric Wall',
      sub: 'Living Room • Sectionals',
      image: 'assets/images/projects/living-room/living-room-04.jpg',
      featured: false
    },
    {
      id: 'living-03',
      category: 'living',
      title: 'Modern Sofa with Backlit Wood Panel',
      sub: 'Living Room • Formal Hall',
      image: 'assets/images/projects/living-room/living-room-01.jpg',
      featured: false
    },
    {
      id: 'living-04',
      category: 'living',
      title: 'Contemporary Cream Sofa Suite & Marble Table',
      sub: 'Living Room • Contemporary Hall',
      image: 'assets/images/projects/living-room/living-room-02.jpg',
      featured: false
    },

    // === 2. BEDROOMS & PRIVATE SUITES (Genuine Master Bedrooms Only) ===
    {
      id: 'bed-01',
      category: 'bedroom',
      title: 'Luxury Master Suite & Fluted Paneling',
      sub: 'Bedroom • Master Suite',
      image: 'assets/images/projects/bedroom/bedroom-suite-01.jpg',
      featured: true
    },
    {
      id: 'bed-02',
      category: 'bedroom',
      title: 'Contemporary Master Bedroom Suite',
      sub: 'Bedroom • Luxury Suite',
      image: 'assets/images/projects/bedroom/bedroom-suite-02.jpg',
      featured: false
    },
    {
      id: 'bed-03',
      category: 'bedroom',
      title: 'Modern King Bedroom with Cove Lighting',
      sub: 'Bedroom • King Suite',
      image: 'assets/images/projects/bedroom/bedroom-suite-03.jpg',
      featured: false
    },
    {
      id: 'bed-04',
      category: 'bedroom',
      title: 'Bespoke Master Bed & Fluted Wall',
      sub: 'Bedroom • Designer Suite',
      image: 'assets/images/projects/bedroom/bedroom-suite-04.jpg',
      featured: false
    },
    {
      id: 'bed-05',
      category: 'bedroom',
      title: 'Cane Bedside & Reading Sanctuary',
      sub: 'Bedroom • Cozy Corner',
      image: 'assets/images/projects/bedroom/bedroom-corner-01.jpg',
      featured: false
    },

    // === 3. MODULAR KITCHENS (Multiple High-End Showcases) ===
    {
      id: 'kitchen-01',
      category: 'kitchen',
      title: 'Statuario Quartz Island Gourmet Kitchen',
      sub: 'Kitchen • Island Modular',
      image: 'assets/images/projects/kitchen/kitchen-island-01.jpg',
      featured: true
    },
    {
      id: 'kitchen-02',
      category: 'kitchen',
      title: 'High-Gloss Modular Kitchen & Breakfast Bar',
      sub: 'Kitchen • Modular L-Shape',
      image: 'assets/images/projects/kitchen/kitchen-modular-02.jpg',
      featured: false
    },
    {
      id: 'kitchen-03',
      category: 'kitchen',
      title: 'Modern Scratch-Proof Acrylic Modular Kitchen',
      sub: 'Kitchen • Acrylic Finish',
      image: 'assets/images/projects/kitchen/kitchen-acrylic-03.jpg',
      featured: false
    },
    {
      id: 'kitchen-04',
      category: 'kitchen',
      title: 'Chef-Grade Luxury Parallel Kitchen Layout',
      sub: 'Kitchen • Parallel Modular',
      image: 'assets/images/projects/kitchen/kitchen-luxury-04.jpg',
      featured: false
    },

    // === 4. CUSTOM LUXURY FURNITURE ===
    {
      id: 'furn-01',
      category: 'furniture',
      title: 'Marble Top Gold S-Curve Coffee Table',
      sub: 'Custom Furniture • Center Tables',
      image: 'assets/images/projects/furniture/coffee-table-02.jpg',
      featured: true
    },
    {
      id: 'furn-02',
      category: 'furniture',
      title: 'Marble Top Sculptural Gold Sphere Table',
      sub: 'Custom Furniture • Center Tables',
      image: 'assets/images/projects/furniture/coffee-table-05.jpg',
      featured: false
    },
    {
      id: 'furn-03',
      category: 'furniture',
      title: 'Fluted Oval Coffee Table with Brass Accent',
      sub: 'Custom Furniture • Center Tables',
      image: 'assets/images/projects/furniture/coffee-table-01.jpg',
      featured: false
    },
    {
      id: 'furn-04',
      category: 'furniture',
      title: 'Curved Geometric Accent Coffee Table',
      sub: 'Custom Furniture • Coffee Tables',
      image: 'assets/images/projects/furniture/coffee-table-03.jpg',
      featured: false
    },

    // === 5. CIVIL CONSTRUCTION (Ground to Handover Stage) ===
    {
      id: 'const-01',
      category: 'construction',
      title: 'Independent Villa Structural Framing & Foundation',
      sub: 'Civil Construction • RCC Structure',
      image: 'assets/images/projects/construction/civil-framing-01.jpg',
      featured: true
    },
    {
      id: 'const-02',
      category: 'construction',
      title: 'Precision Column Slab Casting & Heavy Masonry',
      sub: 'Civil Construction • Brickwork',
      image: 'assets/images/projects/construction/civil-masonry-02.jpg',
      featured: false
    },
    {
      id: 'const-03',
      category: 'construction',
      title: 'Turnkey Duplex Villa Ground-to-Handover',
      sub: 'Civil Construction • Villa Build',
      image: 'assets/images/projects/construction/civil-villa-03.jpg',
      featured: false
    },
    {
      id: 'const-04',
      category: 'construction',
      title: 'On-Site Civil Engineering & Structural Vetting',
      sub: 'Civil Construction • Engineering',
      image: 'assets/images/projects/construction/civil-engineer-04.jpg',
      featured: false
    },

    // === 6. COMMERCIAL & OFFICES ===
    {
      id: 'comm-01',
      category: 'commercial',
      title: 'Executive Boardroom & Acoustic Paneling',
      sub: 'Commercial • Office Interior',
      image: 'assets/images/projects/commercial/boardroom-01.jpg',
      featured: true
    },
    {
      id: 'comm-02',
      category: 'commercial',
      title: 'Ergonomic Corporate Workstations & Reception',
      sub: 'Commercial • Corporate Suites',
      image: 'assets/images/projects/commercial/office-workstation-02.jpg',
      featured: false
    }
  ];

  const STORAGE_KEY = 'SSS_CUSTOM_PROJECTS';
  const AUTH_SESSION_KEY = 'SSS_OWNER_AUTHENTICATED';

  /* ------------------------------------------------------------
     2. DATA ACCESS HELPERS
  ------------------------------------------------------------ */
  function getCustomProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading custom projects from localStorage:', e);
      return [];
    }
  }

  function saveCustomProjects(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving custom projects:', e);
      alert('Storage quota reached. Please use smaller images or clear unused custom photos.');
    }
  }

  function getAllProjects() {
    const custom = getCustomProjects();
    return [...custom, ...DEFAULT_PROJECTS];
  }

  function isOwnerLoggedIn() {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  }

  function getOwnerPasscode() {
    if (typeof window.SITE_CONFIG !== 'undefined' && window.SITE_CONFIG.ownerPasscode) {
      return String(window.SITE_CONFIG.ownerPasscode).trim();
    }
    return '7702'; // default fallback PIN
  }

  /* ------------------------------------------------------------
     3. RENDER FUNCTION WITH COMPACT CURATION & SLIDER CAROUSEL
  ------------------------------------------------------------ */
  let currentActiveFilter = 'all';
  let allShowcaseExpanded = false;
  let currentViewMode = 'grid'; // 'grid' | 'slider'

  function getCuratedHighlights(projects) {
    // Return 6 balanced highlight projects (1 from each core category)
    const categories = ['living', 'bedroom', 'kitchen', 'furniture', 'construction', 'commercial'];
    const curated = [];
    const usedIds = new Set();

    // Check custom owner projects first if any
    const custom = getCustomProjects();
    if (custom.length > 0) {
      curated.push(custom[0]);
      usedIds.add(custom[0].id);
    }

    categories.forEach(cat => {
      if (curated.some(p => p.category === cat)) return;
      const match = projects.find(p => p.category === cat && !usedIds.has(p.id));
      if (match) {
        curated.push(match);
        usedIds.add(match.id);
      }
    });

    // Fill remaining up to 6
    for (let p of projects) {
      if (curated.length >= 6) break;
      if (!usedIds.has(p.id)) {
        curated.push(p);
        usedIds.add(p.id);
      }
    }

    return curated;
  }

  function renderGrid(container, projects, options) {
    if (!container) return;
    const isOwner = isOwnerLoggedIn();
    const filter = options && options.filter ? options.filter : 'all';
    const isHomePage = container.classList.contains('portfolio-grid');

    let displayProjects = projects;

    if (filter === 'all') {
      if (isHomePage && !allShowcaseExpanded && currentViewMode === 'grid') {
        // Show ONLY 6 curated highlights so vertical scrollbar is NOT bloated!
        displayProjects = getCuratedHighlights(projects);
      } else {
        displayProjects = projects;
      }
    } else {
      displayProjects = projects.filter(p => p.category === filter);
    }

    container.innerHTML = '';

    if (displayProjects.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #a3a3a3;">
          <i class="fas fa-folder-open" style="font-size: 2.2rem; margin-bottom: 14px; color: var(--gold);"></i>
          <p style="font-size: 1.1rem; color: #ffffff;">No projects found under this category yet.</p>
          ${isOwner ? `<button class="btn btn-gold btn-sm btn-open-owner-modal" style="margin-top:14px;"><i class="fas fa-plus"></i> Add New Image</button>` : ''}
        </div>
      `;
      updateExpandButton(false, 0);
      return;
    }

    displayProjects.forEach((p) => {
      const card = document.createElement('div');
      card.className = isHomePage ? 'p-card' : 'pp-card';
      card.setAttribute('data-category', p.category);
      card.setAttribute('data-id', p.id);

      const isCustom = p.isCustom;
      const customBadge = isCustom ? `<span class="p-custom-badge"><i class="fas fa-star"></i> Owner Added</span>` : '';
      const deleteBtn = (isOwner && isCustom)
        ? `<button class="p-delete-btn" data-delete-id="${p.id}" title="Delete this image"><i class="fas fa-trash-alt"></i></button>`
        : '';

      const fallbackImg = 'assets/images/projects/living-room/living-room-01.jpg';

      card.innerHTML = `
        ${customBadge}
        ${deleteBtn}
        <img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';" />
        <div class="${isHomePage ? 'p-card-info' : 'pp-info'}">
          <span class="${isHomePage ? 'p-card-cat' : 'pp-cat'}">${escapeHtml(p.sub || p.category)}</span>
          <h4 class="${isHomePage ? 'p-card-title' : 'pp-title'}">${escapeHtml(p.title)}</h4>
          <span class="${isHomePage ? 'p-card-view' : 'pp-cat'}" style="margin-top: 6px;"><i class="fas fa-expand-alt"></i> View Full Space</span>
        </div>
      `;

      card.addEventListener('click', function (e) {
        if (e.target.closest('.p-delete-btn')) {
          e.stopPropagation();
          deleteProject(p.id);
          return;
        }
        openLightbox(p.image, p.title, p.sub);
      });

      container.appendChild(card);
    });

    // Update Expand/Collapse button on homepage
    if (isHomePage) {
      const totalAll = projects.length;
      updateExpandButton(filter === 'all' && currentViewMode === 'grid', totalAll);
    }
  }

  function updateExpandButton(visible, totalCount) {
    let wrap = document.getElementById('showcase-expand-wrap');
    if (!visible) {
      if (wrap) wrap.style.display = 'none';
      return;
    }

    const homeGrid = document.querySelector('.portfolio-grid');
    if (!homeGrid) return;

    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'showcase-expand-wrap';
      wrap.className = 'showcase-expand-wrap';
      homeGrid.parentNode.insertBefore(wrap, homeGrid.nextSibling);
    }

    wrap.style.display = 'block';

    if (!allShowcaseExpanded) {
      wrap.innerHTML = `
        <button id="btn-toggle-showcase" class="btn-toggle-showcase">
          <i class="fas fa-th-large"></i> View All Projects (${totalCount}) <i class="fas fa-chevron-down"></i>
        </button>
      `;
    } else {
      wrap.innerHTML = `
        <button id="btn-toggle-showcase" class="btn-toggle-showcase">
          <i class="fas fa-compress-alt"></i> Show Curated Highlights (6) <i class="fas fa-chevron-up"></i>
        </button>
      `;
    }

    const btn = wrap.querySelector('#btn-toggle-showcase');
    if (btn) {
      btn.addEventListener('click', function () {
        allShowcaseExpanded = !allShowcaseExpanded;
        refreshAllGrids();
        if (!allShowcaseExpanded) {
          const showcaseSec = document.getElementById('showcase');
          if (showcaseSec) showcaseSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ------------------------------------------------------------
     4. LIGHTBOX HANDLER
  ------------------------------------------------------------ */
  function openLightbox(src, title, sub) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    lightboxImg.alt = title || 'SSS Interiors Transformation';

    let caption = lightbox.querySelector('.lightbox-caption');
    if (!caption) {
      caption = document.createElement('div');
      caption.className = 'lightbox-caption';
      caption.style.cssText = 'color:#ffffff; text-align:center; margin-top:12px; font-family:var(--font-heading); font-size:1.15rem;';
      lightbox.appendChild(caption);
    }
    caption.innerHTML = `${escapeHtml(title)} <span style="font-size:0.8rem; color:var(--gold); display:block; text-transform:uppercase; letter-spacing:2px; margin-top:4px;">${escapeHtml(sub || '')}</span>`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /* ------------------------------------------------------------
     5. DELETE PROJECT HANDLER (OWNER ONLY)
  ------------------------------------------------------------ */
  function deleteProject(id) {
    if (!isOwnerLoggedIn()) return;
    if (!confirm('Are you sure you want to remove this image from your showcase?')) return;

    let custom = getCustomProjects();
    custom = custom.filter(p => p.id !== id);
    saveCustomProjects(custom);
    refreshAllGrids();
    showToast('Image removed from showcase.');
  }

  /* ------------------------------------------------------------
     6. REFRESH ALL GRIDS ACROSS PAGE
  ------------------------------------------------------------ */
  function refreshAllGrids() {
    const all = getAllProjects();
    const homeGrid = document.querySelector('.portfolio-grid');
    if (homeGrid) {
      renderGrid(homeGrid, all, { filter: currentActiveFilter });
    }
    const pageGrid = document.querySelector('.portfolio-page-grid');
    if (pageGrid) {
      renderGrid(pageGrid, all, { filter: currentActiveFilter });
    }
    updateOwnerBar();
  }

  /* ------------------------------------------------------------
     7. OWNER BAR & CONTROLS UI
  ------------------------------------------------------------ */
  function updateOwnerBar() {
    let bar = document.getElementById('sss-owner-topbar');
    const isOwner = isOwnerLoggedIn();

    if (isOwner) {
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'sss-owner-topbar';
        bar.className = 'sss-owner-topbar';
        document.body.prepend(bar);
      }
      bar.innerHTML = `
        <div class="owner-topbar-inner">
          <span class="owner-badge"><i class="fas fa-user-shield"></i> Owner Mode Active (Mahesh Shinde)</span>
          <div class="owner-topbar-actions">
            <button class="btn-owner-action btn-open-owner-modal"><i class="fas fa-plus-circle"></i> Add New Image</button>
            <button class="btn-owner-action btn-manage-owner-modal"><i class="fas fa-images"></i> Manage Uploads (${getCustomProjects().length})</button>
            <button class="btn-owner-action btn-owner-logout" title="Sign out of Owner Mode"><i class="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>
      `;

      bar.querySelector('.btn-open-owner-modal').addEventListener('click', () => openOwnerModal('add'));
      bar.querySelector('.btn-manage-owner-modal').addEventListener('click', () => openOwnerModal('manage'));
      bar.querySelector('.btn-owner-logout').addEventListener('click', () => {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        refreshAllGrids();
        showToast('Logged out of Owner Mode.');
      });
    } else {
      if (bar) bar.remove();
    }
  }

  /* ------------------------------------------------------------
     8. OWNER MODAL (Authentication + Add Image + Manage)
  ------------------------------------------------------------ */
  function createOwnerModalDOM() {
    if (document.getElementById('sss-owner-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'sss-owner-modal';
    modal.className = 'sss-owner-modal';
    modal.innerHTML = `
      <div class="owner-modal-overlay"></div>
      <div class="owner-modal-card">
        <button class="owner-modal-close" aria-label="Close modal">&times;</button>
        <div class="owner-modal-header">
          <div class="owner-modal-logo">
            <img src="assets/images/logo.jpg" alt="SSS Interiors" />
            <div>
              <h3>Owner Showcase Portal</h3>
              <p>Sri Sai Sahasra Interiors • Exclusive Owner Access</p>
            </div>
          </div>
        </div>

        <!-- AUTH VIEW -->
        <div id="owner-auth-view" class="owner-modal-body">
          <div class="owner-auth-box">
            <div class="auth-icon"><i class="fas fa-lock"></i></div>
            <h4>Enter Owner Passcode</h4>
            <p>Please enter your 4-digit PIN to upload and manage showcase images.</p>
            <div class="auth-input-wrap">
              <input type="password" id="owner-pin-input" maxlength="8" placeholder="••••" autocomplete="off" />
              <button id="owner-login-submit" class="btn btn-gold">Unlock Portal</button>
            </div>
            <div id="owner-pin-error" class="owner-error-msg" style="display:none;">Incorrect passcode. Please try again.</div>
            <div class="owner-auth-hint">Default PIN: <strong>7702</strong> (matching primary phone number)</div>
          </div>
        </div>

        <!-- DASHBOARD VIEW -->
        <div id="owner-dashboard-view" class="owner-modal-body" style="display:none;">
          <div class="owner-tabs">
            <button class="owner-tab-btn active" data-tab="tab-add"><i class="fas fa-cloud-upload-alt"></i> Add New Image</button>
            <button class="owner-tab-btn" data-tab="tab-manage"><i class="fas fa-th-large"></i> Uploaded Projects (<span id="owner-custom-count">0</span>)</button>
            <button class="owner-tab-btn" data-tab="tab-export"><i class="fas fa-sync-alt"></i> WhatsApp / Backup</button>
          </div>

          <!-- TAB 1: ADD IMAGE -->
          <div id="tab-add" class="owner-tab-content active">
            <form id="owner-add-form" class="owner-form">
              <div class="form-grid-2">
                <div class="owner-form-group">
                  <label for="p-category">Space / Category *</label>
                  <select id="p-category" required>
                    <option value="living">Living Rooms &amp; Halls</option>
                    <option value="bedroom" selected>Bedrooms &amp; Master Suites</option>
                    <option value="kitchen">Modular Kitchens</option>
                    <option value="construction">Civil Construction (Ground to Handover)</option>
                    <option value="furniture">Custom Luxury Furniture</option>
                    <option value="commercial">Commercial &amp; Executive Suites</option>
                  </select>
                </div>
                <div class="owner-form-group">
                  <label for="p-location">Sub-category / Location *</label>
                  <input type="text" id="p-location" placeholder="e.g. Master Bedroom • Jubilee Hills" required />
                </div>
              </div>

              <div class="owner-form-group">
                <label for="p-title">Project Title / Description *</label>
                <input type="text" id="p-title" placeholder="e.g. Royal Master Bedroom with Fluted Oak Backlit Wall" required />
              </div>

              <!-- IMAGE INPUT OPTIONS -->
              <div class="owner-form-group">
                <label>Select Project Image *</label>
                <div class="image-input-choice">
                  <label class="upload-dropzone" for="p-file-input">
                    <i class="fas fa-camera"></i>
                    <span><strong>Choose from Phone / Computer</strong> or Take Photo</span>
                    <small>Auto-compressed for ultra-fast loading</small>
                    <input type="file" id="p-file-input" accept="image/*" />
                  </label>
                  <div class="or-divider"><span>OR PASTE URL</span></div>
                  <input type="url" id="p-url-input" placeholder="https://example.com/your-image.jpg" />
                </div>
              </div>

              <!-- PREVIEW -->
              <div id="p-preview-wrap" class="owner-image-preview" style="display:none;">
                <label>Image Preview:</label>
                <div class="preview-box">
                  <img id="p-preview-img" src="" alt="Preview" />
                  <button type="button" id="p-clear-img" class="btn-clear-preview">&times; Remove</button>
                </div>
              </div>

              <div class="owner-form-actions">
                <button type="submit" id="btn-save-project" class="btn btn-gold btn-block">
                  <i class="fas fa-check-circle"></i> Add to Showcase Instantly
                </button>
              </div>
            </form>
          </div>

          <!-- TAB 2: MANAGE PROJECTS -->
          <div id="tab-manage" class="owner-tab-content">
            <p class="tab-desc">Images you have added to the website showcase. You can remove any entry at any time.</p>
            <div id="owner-projects-list" class="owner-projects-list">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- TAB 3: BACKUP / WHATSAPP SYNC -->
          <div id="tab-export" class="owner-tab-content">
            <p class="tab-desc">Easily share new projects with your web developer (Nagendra) or download a backup.</p>
            <div class="sync-actions-box">
              <button id="btn-share-whatsapp" class="btn btn-whatsapp" style="width:100%; margin-bottom:12px;">
                <i class="fab fa-whatsapp"></i> Notify Web Developer on WhatsApp
              </button>
              <button id="btn-download-backup" class="btn btn-outline-white" style="width:100%; margin-bottom:12px;">
                <i class="fas fa-download"></i> Download Projects Backup (JSON)
              </button>
              <button id="btn-copy-code" class="btn btn-outline-gold" style="width:100%;">
                <i class="fas fa-copy"></i> Copy Code Snippet
              </button>
            </div>
          </div>

        </div>

      </div>
    `;

    document.body.appendChild(modal);

    const overlay = modal.querySelector('.owner-modal-overlay');
    const closeBtn = modal.querySelector('.owner-modal-close');
    const pinInput = modal.querySelector('#owner-pin-input');
    const pinSubmit = modal.querySelector('#owner-login-submit');
    const pinError = modal.querySelector('#owner-pin-error');
    const fileInput = modal.querySelector('#p-file-input');
    const urlInput = modal.querySelector('#p-url-input');
    const previewWrap = modal.querySelector('#p-preview-wrap');
    const previewImg = modal.querySelector('#p-preview-img');
    const clearImgBtn = modal.querySelector('#p-clear-img');
    const addForm = modal.querySelector('#owner-add-form');

    let currentImageDataUrl = '';

    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    function verifyPasscode() {
      const entered = pinInput.value.trim();
      const expected = getOwnerPasscode();
      if (entered === expected) {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        pinError.style.display = 'none';
        pinInput.value = '';
        renderModalDashboard();
        refreshAllGrids();
        showToast('Owner access granted.');
      } else {
        pinError.style.display = 'block';
        pinInput.focus();
      }
    }

    pinSubmit.addEventListener('click', verifyPasscode);
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyPasscode();
    });

    fileInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const rawImg = new Image();
        rawImg.onload = function () {
          const maxWidth = 1280;
          const maxHeight = 960;
          let w = rawImg.width;
          let h = rawImg.height;

          if (w > maxWidth || h > maxHeight) {
            if (w / h > maxWidth / maxHeight) {
              h = Math.round((h * maxWidth) / w);
              w = maxWidth;
            } else {
              w = Math.round((w * maxHeight) / h);
              h = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(rawImg, 0, 0, w, h);

          currentImageDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          previewImg.src = currentImageDataUrl;
          previewWrap.style.display = 'block';
          urlInput.value = '';
        };
        rawImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });

    urlInput.addEventListener('input', function () {
      const val = this.value.trim();
      if (val) {
        currentImageDataUrl = val;
        previewImg.src = val;
        previewWrap.style.display = 'block';
      }
    });

    clearImgBtn.addEventListener('click', function () {
      currentImageDataUrl = '';
      previewImg.src = '';
      previewWrap.style.display = 'none';
      fileInput.value = '';
      urlInput.value = '';
    });

    modal.querySelectorAll('.owner-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', function () {
        modal.querySelectorAll('.owner-tab-btn').forEach(b => b.classList.remove('active'));
        modal.querySelectorAll('.owner-tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const target = this.getAttribute('data-tab');
        const content = modal.querySelector('#' + target);
        if (content) content.classList.add('active');
        if (target === 'tab-manage') renderManageList();
      });
    });

    addForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!currentImageDataUrl) {
        alert('Please choose an image or enter an image URL.');
        return;
      }

      const category = modal.querySelector('#p-category').value;
      const title = modal.querySelector('#p-title').value.trim();
      const location = modal.querySelector('#p-location').value.trim();

      const newProject = {
        id: 'custom-' + Date.now(),
        category: category,
        title: title,
        sub: location,
        image: currentImageDataUrl,
        isCustom: true,
        createdAt: new Date().toISOString()
      };

      const custom = getCustomProjects();
      custom.unshift(newProject);
      saveCustomProjects(custom);

      addForm.reset();
      currentImageDataUrl = '';
      previewWrap.style.display = 'none';

      currentActiveFilter = category;
      document.querySelectorAll('.pf-btn').forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      refreshAllGrids();
      renderModalDashboard();
      closeModal();
      showToast(`Added "${title}" to ${category.toUpperCase()} showcase!`);

      const showcaseSec = document.getElementById('showcase');
      if (showcaseSec) {
        showcaseSec.scrollIntoView({ behavior: 'smooth' });
      }
    });

    modal.querySelector('#btn-share-whatsapp').addEventListener('click', function () {
      const custom = getCustomProjects();
      const dest = (typeof window.SITE_CONFIG !== 'undefined' && window.SITE_CONFIG.developerWhatsApp) || '917702066446';
      let msg = `Hi Nagendra, this is Mahesh from SSS Interiors. I have added ${custom.length} new showcase projects to our website. Please check and sync when you can.`;
      window.open(`https://wa.me/${dest}?text=${encodeURIComponent(msg)}`, '_blank');
    });

    modal.querySelector('#btn-download-backup').addEventListener('click', function () {
      const custom = getCustomProjects();
      const json = JSON.stringify(custom, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `sss-interiors-custom-projects-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    });

    modal.querySelector('#btn-copy-code').addEventListener('click', function () {
      const custom = getCustomProjects();
      const code = JSON.stringify(custom, null, 2);
      navigator.clipboard.writeText(code).then(() => {
        showToast('JSON code copied to clipboard!');
      }).catch(() => {
        prompt('Copy your projects JSON below:', code);
      });
    });
  }

  function renderManageList() {
    const list = document.getElementById('owner-projects-list');
    if (!list) return;
    const custom = getCustomProjects();

    const countSpan = document.getElementById('owner-custom-count');
    if (countSpan) countSpan.textContent = custom.length;

    if (custom.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:36px 12px; color:#888;">
          <i class="fas fa-folder" style="font-size:2rem; color:var(--gold); margin-bottom:10px;"></i>
          <p>No custom images added yet. Click <strong>"Add New Image"</strong> to upload your first project!</p>
        </div>
      `;
      return;
    }

    list.innerHTML = custom.map(p => `
      <div class="owner-project-row">
        <img src="${p.image}" alt="${escapeHtml(p.title)}" class="owner-thumb" />
        <div class="owner-p-details">
          <h5>${escapeHtml(p.title)}</h5>
          <span class="owner-p-cat">${escapeHtml(p.category.toUpperCase())} &bull; ${escapeHtml(p.sub || '')}</span>
        </div>
        <button class="btn-del-row" data-id="${p.id}" title="Delete project"><i class="fas fa-trash-alt"></i> Delete</button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-del-row').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        deleteProject(id);
        renderManageList();
      });
    });
  }

  function renderModalDashboard() {
    const authView = document.getElementById('owner-auth-view');
    const dashView = document.getElementById('owner-dashboard-view');
    if (!authView || !dashView) return;

    if (isOwnerLoggedIn()) {
      authView.style.display = 'none';
      dashView.style.display = 'block';
      const countSpan = document.getElementById('owner-custom-count');
      if (countSpan) countSpan.textContent = getCustomProjects().length;
      renderManageList();
    } else {
      authView.style.display = 'block';
      dashView.style.display = 'none';
    }
  }

  function openOwnerModal(initialTab) {
    createOwnerModalDOM();
    const modal = document.getElementById('sss-owner-modal');
    if (!modal) return;

    renderModalDashboard();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (isOwnerLoggedIn() && initialTab) {
      const tabBtn = modal.querySelector(`.owner-tab-btn[data-tab="tab-${initialTab}"]`);
      if (tabBtn) tabBtn.click();
    }
  }

  function showToast(msg) {
    let toast = document.getElementById('sss-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'sss-toast';
      toast.className = 'sss-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  /* ------------------------------------------------------------
     9. CAROUSEL & VIEW SWITCHER SETUP
  ------------------------------------------------------------ */
  function setupCarouselAndViews() {
    const homeGrid = document.querySelector('.portfolio-grid');
    if (!homeGrid) return;

    const wrap = document.getElementById('portfolio-grid-wrap');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const gridBtn = document.getElementById('view-mode-grid');
    const sliderBtn = document.getElementById('view-mode-slider');

    if (prevBtn && homeGrid) {
      prevBtn.addEventListener('click', () => {
        homeGrid.scrollBy({ left: -360, behavior: 'smooth' });
      });
    }

    if (nextBtn && homeGrid) {
      nextBtn.addEventListener('click', () => {
        homeGrid.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }

    function setViewMode(mode) {
      currentViewMode = mode;
      if (mode === 'slider') {
        homeGrid.classList.add('carousel-view');
        if (wrap) wrap.classList.add('has-carousel');
        if (sliderBtn) sliderBtn.classList.add('active');
        if (gridBtn) gridBtn.classList.remove('active');
      } else {
        homeGrid.classList.remove('carousel-view');
        if (wrap) wrap.classList.remove('has-carousel');
        if (gridBtn) gridBtn.classList.add('active');
        if (sliderBtn) sliderBtn.classList.remove('active');
      }
      refreshAllGrids();
    }

    if (gridBtn) {
      gridBtn.addEventListener('click', () => setViewMode('grid'));
    }
    if (sliderBtn) {
      sliderBtn.addEventListener('click', () => setViewMode('slider'));
    }
  }

  /* ------------------------------------------------------------
     10. INITIALIZATION ON DOM READY
  ------------------------------------------------------------ */
  function init() {
    createOwnerModalDOM();
    setupCarouselAndViews();

    const filterBtns = document.querySelectorAll('.portfolio-filter .pf-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentActiveFilter = this.getAttribute('data-filter') || 'all';
        refreshAllGrids();
      });
    });

    refreshAllGrids();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('owner') === 'true' || window.location.hash === '#owner') {
      openOwnerModal();
    }

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'O' || e.key === 'o')) {
        e.preventDefault();
        openOwnerModal();
      }
    });

    document.querySelectorAll('.btn-open-owner-modal, #owner-login-btn').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openOwnerModal();
      });
    });
  }

  window.SSS_SHOWCASE = {
    getAllProjects: getAllProjects,
    getCustomProjects: getCustomProjects,
    openOwnerModal: openOwnerModal,
    refreshAllGrids: refreshAllGrids
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
