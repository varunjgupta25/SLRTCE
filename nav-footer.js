/**
 * =============================================================================
 * SHREE L. R. TIWARI COLLEGE OF ENGINEERING (SLRTCE)
 * Shared Navigation & Footer Component (Offline-First / Vanilla JS)
 * =============================================================================
 *
 * This file serves as the SINGLE SOURCE OF TRUTH for the global header,
 * navigation bar, footer, and mobile WhatsApp contact widget across all pages.
 *
 * Brand Palette: Maroon #8F0A0B, Gold #E0AA24, Off-White #faf6f4.
 * Square geometry (border-radius: 0), no gradients, no drop shadows, no emojis, no em dashes.
 */

// =============================================================================
// GLOBAL CONFIGURATION
// =============================================================================
// TODO: Enter the official SLRTCE WhatsApp Business phone number below.
// Format: International digits only without '+' or spaces (e.g. '912228120144' or '919876543210').
const SLRTCE_CONFIG = {
  whatsappNumber: 'TODO_WHATSAPP_NUMBER',
  whatsappMessage: 'Hello SLRTCE, I would like to enquire about engineering admission.'
};

/**
 * Generates the full HTML markup for the Global Header & Navigation.
 */
function getHeaderMarkup() {
  return `
  <!-- ================= TOP UTILITY BAR ================= -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span class="govt-code"><i class="fa-solid fa-building-columns"></i> DTE Code: <strong>EN3218</strong></span>
        <span class="divider">|</span>
        <span class="top-contact"><i class="fa-solid fa-envelope"></i> info@slrtce.in</span>
        <span class="divider">|</span>
        <span class="top-contact"><i class="fa-solid fa-phone"></i> +91 (022) 2812 0144</span>
      </div>
      <div class="top-bar-right">
        <a href="#disclosure" class="top-link" onclick="openModal('mandatory-disclosure')">Mandatory Disclosure</a>
        <a href="#iqac" class="top-link" onclick="openModal('iqac-modal')">IQAC</a>
        <a href="#committees" class="top-link" onclick="openModal('committees-modal')">Committees</a>
        <a href="#alumni" class="top-link" onclick="openModal('alumni-modal')">Alumni</a>
        <a href="#careers" class="top-link" onclick="openModal('career-modal')">Careers</a>
        <a href="#fee-structure" class="top-link highlight-fee" onclick="openModal('fee-modal')"><i class="fa-solid fa-receipt"></i> Fee Structure</a>
        <a href="#student-login" class="top-link btn-top-login" onclick="openModal('login-modal')"><i class="fa-solid fa-user-lock"></i> Student Login</a>
      </div>
    </div>
  </div>

  <!-- ================= MAIN BRANDING BAR ================= -->
  <div class="main-branding-bar">
    <div class="container header-inner">
      <div class="brand-block">
        <a href="#" class="brand-logo-wrap">
          <div class="logo-shield">
            <img src="assets/slrtce_logo_crest.jpg" alt="SLRTCE Crest" class="logo-crest-img">
          </div>
          <div class="brand-text">
            <span class="rahul-group">RAHUL EDUCATION</span>
            <h1 class="institute-name">SHREE L. R. TIWARI COLLEGE OF ENGINEERING</h1>
            <p class="institute-affil">
              An Autonomous Institute, Affiliated to University of Mumbai, Approved by AICTE & DTE Maharashtra, NAAC & NBA Accredited, ISO 9001:2015
            </p>
          </div>
        </a>
      </div>

      <div class="header-actions">
        <div class="accreditation-badges-header">
          <span class="badge-pill naac"><i class="fa-solid fa-award"></i> NAAC</span>
          <span class="badge-pill nba"><i class="fa-solid fa-certificate"></i> NBA</span>
          <span class="badge-pill auto"><i class="fa-solid fa-landmark"></i> Autonomous</span>
        </div>
        <button class="mobile-menu-toggle" id="mobileMenuBtn" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mainNav">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- ================= STICKY GLOBAL NAVIGATION ================= -->
  <nav class="main-nav" id="mainNav" aria-label="Primary site navigation">
    <div class="container nav-container">
      <ul class="nav-links" id="primaryNavLinks" role="menubar">

        <!-- 1. About Us -->
        <li class="has-dropdown" role="none" data-nav="about">
          <button type="button" class="nav-item nav-toggle-btn" id="navBtnAbout" aria-expanded="false" aria-haspopup="true" aria-controls="dropdownAbout" role="menuitem">
            <span>About Us</span>
            <i class="fa-solid fa-chevron-down nav-arrow" aria-hidden="true"></i>
          </button>
          <ul class="nav-dropdown" id="dropdownAbout" aria-labelledby="navBtnAbout" role="menu">
            <li role="none"><a role="menuitem" href="#about" onclick="openModal('why-choose-more')"><i class="fa-solid fa-landmark"></i> About</a></li>
            <li role="none"><a role="menuitem" href="#about" onclick="openModal('leadership-modal')"><i class="fa-solid fa-user-tie"></i> Chairman</a></li>
            <li role="none"><a role="menuitem" href="#about" onclick="openModal('leadership-modal')"><i class="fa-solid fa-user-tie"></i> Secretary</a></li>
            <li role="none"><a role="menuitem" href="#about" onclick="openModal('leadership-modal')"><i class="fa-solid fa-user-tie"></i> Joint Secretary</a></li>
            <li role="none"><a role="menuitem" href="#approvals-band"><i class="fa-solid fa-award"></i> Active Approvals</a></li>
          </ul>
        </li>

        <!-- 2. Admission -->
        <li class="has-dropdown" role="none" data-nav="admission">
          <button type="button" class="nav-item nav-toggle-btn" id="navBtnAdmission" aria-expanded="false" aria-haspopup="true" aria-controls="dropdownAdmission" role="menuitem">
            <span>Admission</span>
            <i class="fa-solid fa-chevron-down nav-arrow" aria-hidden="true"></i>
          </button>
          <ul class="nav-dropdown" id="dropdownAdmission" aria-labelledby="navBtnAdmission" role="menu">
            <li role="none"><a role="menuitem" href="#brochure" onclick="openModal('brochure-modal')"><i class="fa-solid fa-file-pdf"></i> Admission Brochure</a></li>
            <li role="none"><a role="menuitem" href="#fee-structure" onclick="openModal('fee-modal')"><i class="fa-solid fa-receipt"></i> Fee Structure</a></li>
            <li role="none"><a role="menuitem" href="#mht-cet" onclick="openModal('mht-cet-modal')"><i class="fa-solid fa-graduation-cap"></i> MHT-CET</a></li>
          </ul>
        </li>

        <!-- 3. Academics -->
        <li class="has-dropdown" role="none" data-nav="academics">
          <button type="button" class="nav-item nav-toggle-btn" id="navBtnAcademics" aria-expanded="false" aria-haspopup="true" aria-controls="dropdownAcademics" role="menuitem">
            <span>Academics</span>
            <i class="fa-solid fa-chevron-down nav-arrow" aria-hidden="true"></i>
          </button>
          <ul class="nav-dropdown" id="dropdownAcademics" aria-labelledby="navBtnAcademics" role="menu">
            <li role="none"><a role="menuitem" href="#programmes"><i class="fa-solid fa-microchip"></i> Departments</a></li>
            <li role="none"><a role="menuitem" href="#calendar" onclick="openModal('calendar-modal')"><i class="fa-solid fa-calendar-days"></i> Academic Calendar</a></li>
            <li role="none"><a role="menuitem" href="#calendar" onclick="openModal('calendar-modal')"><i class="fa-solid fa-file-pen"></i> Exam</a></li>
          </ul>
        </li>

        <!-- 4. Life @ SLRTCE -->
        <li class="has-dropdown" role="none" data-nav="life">
          <button type="button" class="nav-item nav-toggle-btn" id="navBtnLife" aria-expanded="false" aria-haspopup="true" aria-controls="dropdownLife" role="menuitem">
            <span>Life @ SLRTCE</span>
            <i class="fa-solid fa-chevron-down nav-arrow" aria-hidden="true"></i>
          </button>
          <ul class="nav-dropdown" id="dropdownLife" aria-labelledby="navBtnLife" role="menu">
            <li role="none"><a role="menuitem" href="#why-us" onclick="openModal('gallery-modal')"><i class="fa-solid fa-building"></i> Facilities</a></li>
            <li role="none"><a role="menuitem" href="#why-us" onclick="openModal('gallery-modal')"><i class="fa-solid fa-images"></i> Gallery</a></li>
            <li role="none"><a role="menuitem" href="#why-us" onclick="openModal('gallery-modal')"><i class="fa-solid fa-video"></i> Videos</a></li>
            <li role="none"><a role="menuitem" href="#news" onclick="openModal('publications-modal')"><i class="fa-solid fa-book-open"></i> Raw Ink magazine</a></li>
            <li role="none"><a role="menuitem" href="#news"><i class="fa-solid fa-newspaper"></i> Blogs</a></li>
          </ul>
        </li>

        <!-- 5. Career Development Cell -->
        <li class="has-dropdown align-right" role="none" data-nav="cdc">
          <button type="button" class="nav-item nav-toggle-btn" id="navBtnCdc" aria-expanded="false" aria-haspopup="true" aria-controls="dropdownCdc" role="menuitem">
            <span>Career Development Cell</span>
            <i class="fa-solid fa-chevron-down nav-arrow" aria-hidden="true"></i>
          </button>
          <ul class="nav-dropdown" id="dropdownCdc" aria-labelledby="navBtnCdc" role="menu">
            <li role="none"><a role="menuitem" href="#placements" onclick="openModal('placement-report-modal')"><i class="fa-solid fa-trophy"></i> Placement</a></li>
            <li role="none"><a role="menuitem" href="#careers" onclick="openModal('career-modal')"><i class="fa-solid fa-briefcase"></i> Careers</a></li>
            <li role="none"><a role="menuitem" href="#alumni" onclick="openModal('alumni-modal')"><i class="fa-solid fa-user-group"></i> Alumni</a></li>
            <li role="none"><a role="menuitem" href="#alumni" onclick="openModal('alumni-modal')"><i class="fa-solid fa-comment-dots"></i> Testimonials</a></li>
          </ul>
        </li>

        <!-- 6. Contact (Word 'Contact' appears once in nav) -->
        <li class="simple-nav-link" role="none" data-nav="contact">
          <a href="#contact" class="nav-item" id="navLinkContact" role="menuitem">Contact</a>
        </li>
      </ul>

      <!-- Apply Now CTA (Square, theme maroon/gold, no pulse, no animations) -->
      <div class="nav-cta-wrapper">
        <a href="#enquiry-section" class="btn-nav-apply">
          Apply Now
          <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </nav>
  `;
}

/**
 * Generates the full HTML markup for the Global Shared Footer.
 * Note:
 * - Quick-links block is removed and replaced with a Contact Us block.
 * - The word 'Contact' appears once in the footer (in the Contact Us heading).
 * - Col 1 contains institute brand info only (no duplicate contact info).
 * - Internal links open in the same tab. External links open in a new tab.
 */
function getFooterMarkup() {
  return `
  <footer class="site-footer" id="contact">
    <div class="container footer-main-grid">

      <!-- Col 1: Institute Brand Identity (No duplicate contact info) -->
      <div class="footer-col brand-col">
        <div class="footer-logo">
          <span class="footer-crest">SLRTCE</span>
          <div>
            <h3 class="footer-institute-name">Shree L. R. Tiwari College of Engineering</h3>
            <span class="footer-tagline">Excellence in Engineering & Technology</span>
          </div>
        </div>
        <p class="footer-brand-desc">
          An Autonomous Institute affiliated to University of Mumbai, Approved by AICTE & DTE Maharashtra, NAAC & NBA Accredited.
        </p>
        <div class="footer-social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        </div>
      </div>

      <!-- Col 2: Information for -->
      <div class="footer-col">
        <h4 class="footer-heading">Information for</h4>
        <ul class="footer-links">
          <li><a href="#alumni" onclick="openModal('alumni-modal')"><i class="fa-solid fa-chevron-right"></i> Alumni</a></li>
          <li><a href="#fee-structure" onclick="openModal('fee-modal')"><i class="fa-solid fa-chevron-right"></i> Fee structure</a></li>
          <li><a href="#careers" onclick="openModal('career-modal')"><i class="fa-solid fa-chevron-right"></i> Careers</a></li>
          <li><a href="#gallery" onclick="openModal('gallery-modal')"><i class="fa-solid fa-chevron-right"></i> Gallery</a></li>
        </ul>
      </div>

      <!-- Col 3: Contact Us (Replaces old Quick links block; word 'Contact' appears once here) -->
      <div class="footer-col contact-col">
        <h4 class="footer-heading">Contact Us</h4>
        <address class="footer-address">
          <p><i class="fa-solid fa-location-dot"></i> <span>Kanakia Park, Mira Road (East), Mira Bhayandar 401107</span></p>
          <p><i class="fa-solid fa-phone"></i> <span>+91 (022) 2812 0144 / 45</span></p>
          <p><i class="fa-solid fa-envelope"></i> <a href="mailto:info@slrtce.in">info@slrtce.in</a></p>
          <p class="footer-enquiry-row">
            <i class="fa-solid fa-paper-plane"></i>
            <a href="#enquiry-section" class="footer-enquiry-btn">Send Enquiry Form</a>
          </p>
        </address>
      </div>

      <!-- Col 4: Know more -->
      <div class="footer-col">
        <h4 class="footer-heading">Know more</h4>
        <ul class="footer-links">
          <li><a href="#iqac" onclick="openModal('iqac-modal')"><i class="fa-solid fa-chevron-right"></i> IQAC</a></li>
          <li><a href="#disclosure" onclick="openModal('mandatory-disclosure')"><i class="fa-solid fa-chevron-right"></i> Mandatory disclosure</a></li>
          <li><a href="#student-login" onclick="openModal('login-modal')"><i class="fa-solid fa-chevron-right"></i> Student login</a></li>
          <li><a href="#terms" onclick="openModal('terms-modal')"><i class="fa-solid fa-chevron-right"></i> Terms of use</a></li>
          <li><a href="#privacy" onclick="openModal('privacy-modal')"><i class="fa-solid fa-chevron-right"></i> Privacy policy</a></li>
        </ul>
      </div>

    </div>

    <!-- Footer Bottom Strip -->
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>© Shree L. R. Tiwari College of Engineering. All rights reserved.</p>
        <p class="demo-tag">Autonomous Engineering & Research Facility - Mira Road</p>
      </div>
    </div>
  </footer>
  `;
}

/**
 * Creates and injects the Mobile-Friendly Fixed WhatsApp button at bottom-right.
 * Respects safe areas, square styling, theme maroon/gold colors.
 */
function injectWhatsAppButton() {
  if (document.getElementById('whatsappFloatingBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'whatsappFloatingBtn';
  btn.className = 'whatsapp-floating-btn';
  btn.setAttribute('aria-label', 'Chat on WhatsApp with SLRTCE Admissions');
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');

  if (SLRTCE_CONFIG.whatsappNumber && SLRTCE_CONFIG.whatsappNumber !== 'TODO_WHATSAPP_NUMBER') {
    btn.href = `https://wa.me/${SLRTCE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SLRTCE_CONFIG.whatsappMessage)}`;
  } else {
    // If WhatsApp number is yet to be configured, guide student to enquiry section or open prompt
    btn.href = '#enquiry-section';
    btn.title = 'WhatsApp: ' + SLRTCE_CONFIG.whatsappNumber + ' (Click to Send Enquiry)';
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === '#enquiry-section') {
        const enquiry = document.getElementById('enquiry-section');
        if (enquiry) {
          e.preventDefault();
          enquiry.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  btn.innerHTML = `
    <i class="fa-brands fa-whatsapp" aria-hidden="true"></i>
    <span class="whatsapp-btn-text">WhatsApp</span>
  `;

  document.body.appendChild(btn);
}

/**
 * Initializes Keyboard Navigation, Hover/Tap Dropdowns, Mobile Drawer,
 * Sticky Navigation, and Scrollspy Highlighting.
 */
function initNavigationBehaviors() {
  const mainNav = document.getElementById('mainNav');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const dropdownItems = document.querySelectorAll('.has-dropdown');

  // Helper: Close all open dropdowns
  function closeAllDropdowns(exceptItem = null) {
    dropdownItems.forEach(item => {
      if (item !== exceptItem) {
        item.classList.remove('dropdown-open');
        const toggleBtn = item.querySelector('.nav-toggle-btn');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // Dropdown keyboard & mouse interactions
  dropdownItems.forEach(item => {
    const toggleBtn = item.querySelector('.nav-toggle-btn');
    const dropdownMenu = item.querySelector('.nav-dropdown');

    if (!toggleBtn || !dropdownMenu) return;

    // Desktop hover: open on mouseenter, close on mouseleave
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 900) {
        closeAllDropdowns(item);
        item.classList.add('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 900) {
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Tap/Click on toggle button (both touch and keyboard activate click)
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = item.classList.contains('dropdown-open');
      if (isExpanded) {
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        closeAllDropdowns(item);
        item.classList.add('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support: Escape closes current dropdown and focuses trigger
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    });

    // Close when clicking dropdown links on mobile
    dropdownMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900 && mainNav) {
          mainNav.classList.remove('open');
          if (mobileBtn) {
            mobileBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
              icon.classList.remove('fa-xmark');
              icon.classList.add('fa-bars');
            }
          }
        }
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close dropdowns if focus moves completely outside the nav
  document.addEventListener('focusin', (e) => {
    if (!mainNav || !mainNav.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  // Close dropdowns if user clicks outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      closeAllDropdowns();
    }
  });

  // Mobile menu button toggle (<= 900px)
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Scrollspy: dynamically highlight current page or section
  const sectionMap = [
    { id: 'hero', navKey: 'about' },
    { id: 'about', navKey: 'about' },
    { id: 'programmes', navKey: 'academics' },
    { id: 'news', navKey: 'life' },
    { id: 'why-us', navKey: 'life' },
    { id: 'placements', navKey: 'cdc' },
    { id: 'mentors', navKey: 'cdc' },
    { id: 'enquiry-section', navKey: 'admission' },
    { id: 'contact', navKey: 'contact' }
  ];

  function updateActiveNav() {
    const scrollPos = window.scrollY + 180;
    let currentNavKey = 'about';

    for (let i = 0; i < sectionMap.length; i++) {
      const el = document.getElementById(sectionMap[i].id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentNavKey = sectionMap[i].navKey;
        }
      }
    }

    // Update active class on nav items
    document.querySelectorAll('#primaryNavLinks > li').forEach(li => {
      const match = li.getAttribute('data-nav') === currentNavKey;
      const toggle = li.querySelector('.nav-toggle-btn, .nav-item');
      if (toggle) {
        if (match) {
          toggle.classList.add('active');
        } else {
          toggle.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
}

/**
 * Custom Element: <site-header>
 */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getHeaderMarkup();
    initNavigationBehaviors();
  }
}

/**
 * Custom Element: <site-footer>
 */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getFooterMarkup();
    injectWhatsAppButton();
  }
}

// Register Custom Web Components
if ('customElements' in window) {
  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
}

// Fallback auto-mounting if elements already exist by ID
document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.querySelector('site-header');
  if (!headerMount) {
    const fallbackHeader = document.getElementById('globalHeaderPlaceholder');
    if (fallbackHeader) {
      fallbackHeader.innerHTML = getHeaderMarkup();
      initNavigationBehaviors();
    }
  }

  const footerMount = document.querySelector('site-footer');
  if (!footerMount) {
    const fallbackFooter = document.getElementById('globalFooterPlaceholder');
    if (fallbackFooter) {
      fallbackFooter.innerHTML = getFooterMarkup();
      injectWhatsAppButton();
    }
  }

  // Ensure WhatsApp button is present
  injectWhatsAppButton();
});

