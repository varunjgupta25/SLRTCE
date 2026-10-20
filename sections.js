/**
 * SLRTCE Dynamic Home Page Sections
 * Renders four sections from window.SLRTCE_DATA:
 * 1. Why choose us (.wc-)
 * 2. Active approvals (.ap-)
 * 3. Our collaborators (.co-)
 * 4. Latest updates and blogs (.bl-)
 */
(function() {
  'use strict';

  function renderWhyChoose() {
    const section = document.getElementById('wc-section');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.whyChoose;
    if (!window.isSet || !window.isSet(data)) {
      section.hidden = true;
      return;
    }

    const brochure = window.SLRTCE_DATA.brochure;
    let brochureHtml = '';
    if (brochure && brochure.available === true && window.isSet(brochure.path) && window.isSet(brochure.size)) {
      brochureHtml = `
        <div class="wc-actions">
          <a href="${brochure.path}" download class="wc-btn" aria-label="Download official SLRTCE brochure">Download brochure (${brochure.size})</a>
        </div>
      `;
    }

    const itemsHtml = data.map(function(item) {
      return `
        <li class="wc-item">
          <h3 class="wc-item-title">${item.title}</h3>
          <p class="wc-item-desc">${item.description}</p>
        </li>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Why choose us</span>
          <h2 class="section-title">Why choose SLRTCE</h2>
          <p class="section-desc">Key pillars that make Shree L. R. Tiwari College of Engineering a leading autonomous engineering institution.</p>
        </div>
        <div class="wc-wrap">
          <ul class="wc-list">
            ${itemsHtml}
          </ul>
          ${brochureHtml}
        </div>
      </div>
    `;

    section.hidden = false;
  }

  function renderApprovals() {
    const section = document.getElementById('ap-section');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.approvals;
    if (!window.isSet || !window.isSet(data)) {
      section.hidden = true;
      return;
    }

    const cardsHtml = data.map(function(item) {
      const hasLogo = window.isSet(item.logo);
      const hasUrl = window.isSet(item.url);
      const isBadge = item.isBadge === true;

      let contentHtml = '';
      if (hasLogo) {
        contentHtml += `<img src="${item.logo}" alt="Logo of ${item.name}" class="ap-logo" loading="lazy" decoding="async" width="90" height="60">`;
      }
      contentHtml += `<p class="ap-name">${item.name}</p>`;

      if (isBadge || !hasUrl) {
        if (isBadge) {
          return `
            <div class="ap-badge" role="region" aria-label="${item.name}">
              <span class="ap-badge-label">Certified</span>
              <span class="ap-badge-text">${item.name}</span>
            </div>
          `;
        }
        return `
          <div class="ap-card">
            ${contentHtml}
          </div>
        `;
      }

      return `
        <div class="ap-card">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="ap-card-link" aria-label="Official website of ${item.name} (opens in a new tab)">
            ${contentHtml}
          </a>
        </div>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Statutory Recognitions</span>
          <h2 class="section-title">Active Approvals and Accreditations</h2>
          <p class="section-desc">SLRTCE is approved and accredited by premier statutory, state, and central educational bodies in India.</p>
        </div>
        <div class="ap-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    section.hidden = false;
  }

  function renderCollaborators() {
    const section = document.getElementById('co-section');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.collaborators;
    if (!window.isSet || !window.isSet(data)) {
      section.hidden = true;
      return;
    }

    const tilesHtml = data.filter(function(item) {
      // Skip any company whose logo file is missing
      return window.isSet(item.logo);
    }).map(function(item) {
      const imgHtml = `<img src="${item.logo}" alt="Logo of ${item.name}" class="co-logo" width="120" height="60" loading="lazy" decoding="async">`;
      if (window.isSet(item.url)) {
        return `
          <div class="co-tile">
            <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="co-link" aria-label="Official website of ${item.name} (opens in a new tab)">
              ${imgHtml}
            </a>
          </div>
        `;
      }
      return `
        <div class="co-tile">
          ${imgHtml}
        </div>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Industry Ecosystem</span>
          <h2 class="section-title">Our Collaborators</h2>
          <p class="section-desc">Active partnerships with leading global technology corporations, government initiatives, and academic excellence centres.</p>
        </div>
        <div class="co-grid">
          ${tilesHtml}
        </div>
      </div>
    `;

    section.hidden = false;
  }

  function renderBlogs() {
    const section = document.getElementById('bl-section');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.blogs;
    if (!window.isSet || !window.isSet(data)) {
      section.hidden = true;
      return;
    }

    const rowsHtml = data.map(function(item) {
      let thumbHtml = '';
      if (window.isSet(item.image)) {
        thumbHtml = `
          <div class="bl-media">
            <img src="${item.image}" alt="${item.title}" class="bl-thumb" width="120" height="80" loading="lazy" decoding="async">
          </div>
        `;
      }

      return `
        <article class="bl-item">
          <div class="bl-date">${item.date}</div>
          ${thumbHtml}
          <div class="bl-content">
            <h3 class="bl-title">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="bl-title-link" aria-label="${item.title} (opens in a new tab)">
                ${item.title}
              </a>
            </h3>
            <p class="bl-excerpt">${item.excerpt}</p>
          </div>
        </article>
      `;
    }).join('');

    section.innerHTML = `
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Campus Discourse</span>
          <h2 class="section-title">Latest Updates and Blogs</h2>
          <p class="section-desc">Insights, technical commentary, and academic perspectives from faculty and researchers at SLRTCE.</p>
        </div>
        <div class="bl-list">
          ${rowsHtml}
        </div>
        <div class="bl-footer">
          <a href="https://slrtce.in/blogs" target="_blank" rel="noopener noreferrer" class="bl-all-link" aria-label="View all blogs on the official SLRTCE portal (opens in a new tab)">
            View all blogs
          </a>
        </div>
      </div>
    `;

    section.hidden = false;
  }

  function renderHODs() {
    const section = document.getElementById('hd-section');
    const oldMentors = document.getElementById('mentors');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.hods;
    if (!window.isSet || !window.isSet(data) || !Array.isArray(data) || data.length === 0) {
      section.hidden = true;
      section.setAttribute('hidden', '');
      section.style.display = 'none';
      if (oldMentors) {
        oldMentors.hidden = false;
        oldMentors.removeAttribute('hidden');
        oldMentors.style.display = '';
      }
      return;
    }

    try {
      const slidesHtml = data.map(function(item) {
        const hasPhoto = window.isSet(item.photo);
        let mediaHtml = '';
        if (hasPhoto) {
          mediaHtml = `
            <div class="hd-photo-wrap">
              <img src="${item.photo}" alt="${item.name}" class="hd-photo" width="160" height="160" loading="lazy" decoding="async">
            </div>
          `;
        } else {
          const cleanedName = (item.name || '').replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
          const parts = cleanedName.trim().split(/\s+/);
          const initials = (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
          mediaHtml = `
            <div class="hd-photo-wrap">
              <div class="hd-initials" aria-label="${item.name}">${initials}</div>
            </div>
          `;
        }

        return `
          <div class="hd-slide" role="group" aria-roledescription="slide">
            <div class="hd-card">
              ${mediaHtml}
              <h3 class="hd-name">${item.name}</h3>
              <p class="hd-dept">${item.department}</p>
              <p class="hd-desig">${item.designation}</p>
            </div>
          </div>
        `;
      }).join('');

      section.innerHTML = `
        <div class="container">
          <div class="hd-header-wrap">
            <div>
              <span class="section-tag">Academic Leadership</span>
              <h2 class="section-title">Heads of Department</h2>
              <p class="section-desc">Distinguished professors and academic administrators directing excellence across disciplines.</p>
            </div>
            <div class="hd-controls" role="region" aria-label="HOD Carousel Controls">
              <button type="button" class="hd-nav-btn hd-prev" aria-label="Previous HOD">Previous</button>
              <button type="button" class="hd-nav-btn hd-next" aria-label="Next HOD">Next</button>
            </div>
          </div>
          <div class="hd-carousel-window" tabindex="0" aria-label="HODs list, use arrow keys or buttons to navigate">
            <div class="hd-track">
              ${slidesHtml}
            </div>
          </div>
        </div>
      `;

      const track = section.querySelector('.hd-track');
      const prevBtn = section.querySelector('.hd-prev');
      const nextBtn = section.querySelector('.hd-next');
      const carouselWindow = section.querySelector('.hd-carousel-window');
      const totalSlides = data.length;
      let currentIndex = 0;
      let autoTimer = null;

      function getVisibleCount() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 640) return 2;
        return 1;
      }

      function updateSlidePosition() {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, totalSlides - visible);
        if (currentIndex > maxIndex) {
          currentIndex = 0;
        } else if (currentIndex < 0) {
          currentIndex = maxIndex;
        }
        const slideWidthPct = 100 / visible;
        track.style.transform = 'translateX(-' + (currentIndex * slideWidthPct) + '%)';
      }

      function nextSlide() {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, totalSlides - visible);
        if (currentIndex >= maxIndex) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        updateSlidePosition();
      }

      function prevSlide() {
        const visible = getVisibleCount();
        const maxIndex = Math.max(0, totalSlides - visible);
        if (currentIndex <= 0) {
          currentIndex = maxIndex;
        } else {
          currentIndex--;
        }
        updateSlidePosition();
      }

      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);

      carouselWindow.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        }
      });

      const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      function startTimer() {
        if (prefersReducedMotion) return;
        if (autoTimer) clearInterval(autoTimer);
        autoTimer = setInterval(nextSlide, 5000);
      }
      function stopTimer() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      section.addEventListener('focusin', stopTimer);
      section.addEventListener('focusout', startTimer);
      section.addEventListener('mouseenter', stopTimer);
      section.addEventListener('mouseleave', startTimer);
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) stopTimer();
        else startTimer();
      });

      window.addEventListener('resize', function() {
        updateSlidePosition();
      });

      startTimer();
      updateSlidePosition();

      section.hidden = false;
      section.removeAttribute('hidden');
      section.style.display = '';
      if (oldMentors) {
        oldMentors.hidden = true;
        oldMentors.setAttribute('hidden', '');
        oldMentors.style.display = 'none';
      }
    } catch (err) {
      console.error('Error rendering HODs:', err);
      section.hidden = true;
      section.setAttribute('hidden', '');
      section.style.display = 'none';
      if (oldMentors) {
        oldMentors.hidden = false;
        oldMentors.removeAttribute('hidden');
        oldMentors.style.display = '';
      }
    }
  }

  function renderPlacementPartners() {
    const section = document.getElementById('pp-section');
    const oldPlacements = document.getElementById('placements');
    if (!section) return;

    const data = window.SLRTCE_DATA && window.SLRTCE_DATA.recruiters;
    if (!window.isSet || !window.isSet(data) || data.length === 0) {
      section.hidden = true;
      section.setAttribute('hidden', '');
      section.style.display = 'none';
      if (oldPlacements) {
        oldPlacements.hidden = false;
        oldPlacements.removeAttribute('hidden');
        oldPlacements.style.display = '';
      }
      return;
    }

    try {
      function createTiles(isClone) {
        return data.map(function(item) {
          const hasLogo = window.isSet(item.logo);
          let innerHtml = '';
          if (hasLogo) {
            innerHtml = `<img src="${item.logo}" alt="Logo of ${item.name}" class="pp-logo" loading="lazy" decoding="async" width="160" height="80">`;
          } else {
            innerHtml = `<span class="pp-name-fallback">${item.name}</span>`;
          }
          return `
            <div class="pp-tile" ${isClone ? 'data-clone="true"' : 'data-clone="false"'}>
              ${innerHtml}
            </div>
          `;
        }).join('');
      }

      const allTilesHtml = createTiles(false) + createTiles(true);

      section.innerHTML = `
        <div class="container">
          <div class="pp-header-wrap">
            <div class="pp-title-wrap">
              <span class="pp-tag">Placements & Career Cell</span>
              <h2 class="pp-title">Where our students work</h2>
              <p class="pp-subtitle">Our placement cell works with recruiters across IT, core engineering and consulting.</p>
            </div>
            <div class="pp-controls">
              <button type="button" class="pp-control-btn pp-pause" aria-label="Pause recruiter animation" aria-pressed="false">Pause</button>
              <button type="button" class="pp-control-btn pp-play active" aria-label="Play recruiter animation" aria-pressed="true">Play</button>
            </div>
          </div>

          <div class="pp-carousel-window" tabindex="0" role="region" aria-label="Recruiter companies carousel">
            <div class="pp-track" id="pp-track">
              ${allTilesHtml}
            </div>
          </div>

          <!-- Placement Cell CTA Banner -->
          <div class="pp-cta-card">
            <div class="pp-cta-content">
              <h3>Empowering 1000+ student careers every year</h3>
              <p>Continuous aptitude drills, mock interviews, live capstone projects, and direct corporate connect.</p>
            </div>
            <div>
              <button type="button" class="pp-cta-btn" onclick="openModal('placement-report-modal')">
                Our placement cell
              </button>
            </div>
          </div>

          <!-- Alumni Quote / Testimonial -->
          <div class="pp-quote-box">
            <blockquote class="pp-quote-text">
              "As a proud alum of Shree L. R. Tiwari College of Engineering, I owe a big thank you to this top-notch institution. The placement cell deserves a special mention for helping me land my dream job at Hexaware Technologies."
            </blockquote>
            <div class="pp-quote-author">
              <strong>Shweta Singh</strong>
              <span>B.E. Computer Engineering, placed at Hexaware Technologies</span>
            </div>
          </div>
        </div>
      `;

      const track = section.querySelector('#pp-track');
      const pauseBtn = section.querySelector('.pp-pause');
      const playBtn = section.querySelector('.pp-play');
      const carouselWindow = section.querySelector('.pp-carousel-window');
      let isManuallyPaused = false;

      function pauseScroll() {
        track.classList.add('is-paused');
        pauseBtn.classList.add('active');
        playBtn.classList.remove('active');
        pauseBtn.setAttribute('aria-pressed', 'true');
        playBtn.setAttribute('aria-pressed', 'false');
      }

      function playScroll() {
        track.classList.remove('is-paused');
        playBtn.classList.add('active');
        pauseBtn.classList.remove('active');
        playBtn.setAttribute('aria-pressed', 'true');
        pauseBtn.setAttribute('aria-pressed', 'false');
      }

      pauseBtn.addEventListener('click', function() {
        isManuallyPaused = true;
        pauseScroll();
      });

      playBtn.addEventListener('click', function() {
        isManuallyPaused = false;
        playScroll();
      });

      carouselWindow.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'k') {
          e.preventDefault();
          if (track.classList.contains('is-paused')) {
            isManuallyPaused = false;
            playScroll();
          } else {
            isManuallyPaused = true;
            pauseScroll();
          }
        }
      });

      // Hover / focus auto-pause
      carouselWindow.addEventListener('mouseenter', function() {
        track.classList.add('is-paused');
      });
      carouselWindow.addEventListener('mouseleave', function() {
        if (!isManuallyPaused) {
          track.classList.remove('is-paused');
        }
      });
      carouselWindow.addEventListener('focusin', function() {
        track.classList.add('is-paused');
      });
      carouselWindow.addEventListener('focusout', function() {
        if (!isManuallyPaused) {
          track.classList.remove('is-paused');
        }
      });

      // Visibility change
      document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
          track.classList.add('is-paused');
        } else if (!isManuallyPaused) {
          track.classList.remove('is-paused');
        }
      });

      section.hidden = false;
      section.removeAttribute('hidden');
      section.style.display = '';
      if (oldPlacements) {
        oldPlacements.hidden = true;
        oldPlacements.setAttribute('hidden', '');
        oldPlacements.style.display = 'none';
      }
    } catch (err) {
      console.error('Error rendering Placement Partners:', err);
      section.hidden = true;
      section.setAttribute('hidden', '');
      section.style.display = 'none';
      if (oldPlacements) {
        oldPlacements.hidden = false;
        oldPlacements.removeAttribute('hidden');
        oldPlacements.style.display = '';
      }
    }
  }

  function initSections() {
    renderWhyChoose();
    renderApprovals();
    renderCollaborators();
    renderBlogs();
    renderHODs();
    renderPlacementPartners();
  }

  window.renderSLRTCESections = initSections;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSections);
  } else {
    initSections();
  }
})();
