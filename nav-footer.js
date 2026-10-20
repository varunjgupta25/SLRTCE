/**
 * =============================================================================
 * SHREE L. R. TIWARI COLLEGE OF ENGINEERING (SLRTCE)
 * Shared Navigation & Footer Component (Offline-First / Vanilla JS)
 * =============================================================================
 *
 * SINGLE SOURCE OF TRUTH for:
 * 1. Global Header (Gold Utility Bar, Main Branding Bar, Sticky 3-Level Nav)
 * 2. Shared Footer & WhatsApp Widget
 * 3. Reusable Section Sidebar for Inner Pages
 *
 * Brand Palette: Maroon #8F0A0B, Gold #E0AA24, Off-White #faf6f4, Dark Text #240408.
 * Flat styling: border-radius 0, solid colors, zero icons, hyphen '-' only.
 */

// =============================================================================
// NAVIGATION MENU DATA STRUCTURE (Single Source of Truth)
// =============================================================================
const SLRTCE_NAV_MENU = [
  {
    title: 'Home',
    url: 'index.html'
  },
  {
    title: 'About Us',
    children: [
      { title: 'About college', url: 'about-college.html' },
      { title: 'Vision & Mission', url: 'vision-mission.html' },
      { title: "Principal's Message", url: 'principals-message.html' },
      {
        title: 'Our Management',
        children: [
          { title: 'Chairman', url: 'chairman.html' },
          { title: 'President', url: 'president.html' },
          { title: 'Secretary', url: 'secretary.html' },
          { title: 'Joint Secretary', url: 'joint-secretary.html' },
          { title: 'Chief Operating Officer (COO)', url: 'coo.html' }
        ]
      },
      { title: 'Core Values', url: 'core-values.html' },
      { title: 'Gallery', url: 'gallery.html' }
    ]
  },
  {
    title: 'Admission',
    children: [
      {
        title: 'Ph.D. Technology',
        children: [
          { title: 'Ph.D. Programs', url: 'placeholder.html?title=Ph.D.+Programs&section=Admission' },
          {
            title: 'Ph.D. Admission',
            children: [
              { title: 'Ph.D. Admission Application Form', url: 'placeholder.html?title=Ph.D.+Admission+Application+Form&section=Admission' },
              { title: 'Mumbai University Minimum Standards and Procedure for the Award of Ph.D. Degree', url: 'placeholder.html?title=Mumbai+University+Minimum+Standards+and+Procedure+for+the+Award+of+Ph.D.+Degree&section=Admission' },
              { title: 'NOC Format', url: 'placeholder.html?title=NOC+Format&section=Admission' }
            ]
          },
          { title: 'Selection Process', url: 'placeholder.html?title=Selection+Process&section=Admission' }
        ]
      },
      {
        title: 'Admission',
        children: [
          {
            title: 'Provisional Merit List A.Y. 2026-27',
            children: [
              { title: 'First Year B.Tech Merit List Institute Level', url: 'placeholder.html?title=First+Year+B.Tech+Merit+List+Institute+Level&section=Admission' },
              { title: 'First Year B.Tech Merit List - ACAP', url: 'placeholder.html?title=First+Year+B.Tech+Merit+List+-+ACAP&section=Admission' },
              { title: 'DSE Merit List - ACAP', url: 'placeholder.html?title=DSE+Merit+List+-+ACAP&section=Admission' },
              { title: 'M.Tech Merit List Institute Level', url: 'placeholder.html?title=M.Tech+Merit+List+Institute+Level&section=Admission' },
              { title: 'M.Tech Merit List - ACAP', url: 'placeholder.html?title=M.Tech+Merit+List+-+ACAP&section=Admission' },
              { title: 'MCA Merit List Institute Level', url: 'placeholder.html?title=MCA+Merit+List+Institute+Level&section=Admission' },
              { title: 'MCA Merit List - ACAP', url: 'placeholder.html?title=MCA+Merit+List+-+ACAP&section=Admission' },
              { title: 'BMS Merit List Institute Level', url: 'placeholder.html?title=BMS+Merit+List+Institute+Level&section=Admission' },
              { title: 'BMS Merit List - ACAP', url: 'placeholder.html?title=BMS+Merit+List+-+ACAP&section=Admission' }
            ]
          },
          {
            title: 'Final Merit List AY 2026-27',
            children: [
              { title: 'Final First Year B.tech Merit List Institute Level', url: 'placeholder.html?title=Final+First+Year+B.tech+Merit+List+Institute+Level&section=Admission' },
              { title: 'Final First Year B.Tech Merit List - ACAP', url: 'placeholder.html?title=Final+First+Year+B.Tech+Merit+List+-+ACAP&section=Admission' },
              { title: 'Final DSE Merit List - ACAP', url: 'placeholder.html?title=Final+DSE+Merit+List+-+ACAP&section=Admission' },
              { title: 'Final M.Tech Merit List Institute Level', url: 'placeholder.html?title=Final+M.Tech+Merit+List+Institute+Level&section=Admission' },
              { title: 'Final M.Tech Merit List - ACAP', url: 'placeholder.html?title=Final+M.Tech+Merit+List+-+ACAP&section=Admission' },
              { title: 'Final MCA Merit List Institute Level', url: 'placeholder.html?title=Final+MCA+Merit+List+Institute+Level&section=Admission' },
              { title: 'Final MCA Merit List - ACAP', url: 'placeholder.html?title=Final+MCA+Merit+List+-+ACAP&section=Admission' },
              { title: 'Final BMS Merit List Institute Level', url: 'placeholder.html?title=Final+BMS+Merit+List+Institute+Level&section=Admission' },
              { title: 'Final BMS Merit List - ACAP', url: 'placeholder.html?title=Final+BMS+Merit+List+-+ACAP&section=Admission' }
            ]
          }
        ]
      },
      { title: 'Admission Process', url: 'admission-process.html' },
      { title: 'Admission & Eligibility Criteria', url: 'eligibility-criteria.html' },
      { title: 'Admission Notification UG & PG', url: 'placeholder.html?title=Admission+Notification+UG+%26+PG&section=Admission' },
      { title: 'Courses Offered', url: 'courses-offered.html' },
      { title: 'Fee Structure', url: 'fee-structure.html' },
      { title: 'Direct Second Year Admission Notification', url: 'placeholder.html?title=Direct+Second+Year+Admission+Notification&section=Admission' },
      { title: 'College Scholarship', url: 'scholarship.html' },
      { title: 'Facilities', url: 'facilities.html' },
      { title: 'Scholarship/Freeship from govt. of Maharashtra', url: 'scholarship.html' }
    ]
  },
  {
    title: 'Academics',
    children: [
      {
        title: 'Programmes',
        children: [
          {
            title: 'Undergraduate Programmes',
            children: [
              { title: 'Computer Engineering', url: 'computer-engineering.html' },
              { title: 'Electronics and Computer Science', url: 'ecs.html' },
              { title: 'Civil Engineering with Computer Application', url: 'civil-engineering.html' },
              { title: 'Mechanical Engineering', url: 'mechanical-engineering.html' },
              { title: 'Information Technology', url: 'information-technology.html' },
              { title: 'Electronics and Telecommunication Engineering', url: 'extc.html' },
              { title: 'Humanities And Applied Sciences', url: 'placeholder.html?title=Humanities+And+Applied+Sciences&section=Academics' },
              { title: 'Bachelor of Vocation (B.Voc)', url: 'bvoc.html' },
              { title: 'Computer Science & Engineering (Cyber Security)', url: 'cse-cyber.html' },
              { title: 'Computer Science & Engineering (Data Science)', url: 'cse-ds.html' },
              { title: 'Computer Science & Engineering (Artificial Intelligence & Data Science)', url: 'cse-ai.html' },
              { title: 'Artificial Intelligence and Machine Learning', url: 'aiml.html' }
            ]
          },
          {
            title: 'Post Graduate Programmes',
            children: [
              { title: 'Masters of Computer Application', url: 'mca.html' },
              { title: 'Computer Engineering', url: 'me-computer.html' },
              { title: 'Electronics and Telecommunication Engineering', url: 'me-extc.html' },
              { title: 'PGDM Program', url: 'pgdm.html' }
            ]
          },
          { title: 'Phd Programmes', url: 'phd-programmes.html' },
          {
            title: 'Certificate & Diploma',
            children: [
              { title: "SUNY's Courses", url: 'placeholder.html?title=SUNY%27s+Courses&section=Academics' },
              { title: 'Java Certification', url: 'placeholder.html?title=Java+Certification&section=Academics' },
              { title: 'Database Certification', url: 'placeholder.html?title=Database+Certification&section=Academics' }
            ]
          }
        ]
      },
      { title: 'Academic Calendar', url: 'placeholder.html?title=Academic+Calendar&section=Academics' },
      { title: 'Library', url: 'library.html' },
      {
        title: 'College Toppers',
        children: [
          { title: 'Under Graduate Rankers', url: 'college-toppers.html' },
          { title: 'Post Graduate Rankers', url: 'college-toppers.html' }
        ]
      },
      {
        title: 'Exam',
        children: [
          { title: 'Exam-Notices', url: 'exam-notices.html' },
          { title: 'MU Question Paper', url: 'placeholder.html?title=MU+Question+Paper&section=Academics' }
        ]
      }
    ]
  },
  {
    title: 'Life @ SLRTCE',
    children: [
      { title: 'Student Life', url: 'student-life.html' },
      {
        title: 'Student Clubs',
        children: [
          { title: 'AI & ML Club', url: 'student-clubs.html#club-aiml' },
          { title: 'Web Development Club', url: 'student-clubs.html#club-webdev' },
          { title: 'IoT, Embedded & CAD/CAM Club', url: 'student-clubs.html#club-iot' },
          { title: 'Google Developer Student Clubs', url: 'student-clubs.html#club-gdsc' },
          { title: 'Go-Karting Club', url: 'student-clubs.html#club-gokart' }
        ]
      },
      { title: 'Student Council', url: 'student-council.html' },
      {
        title: 'Student Chapters',
        children: [
          { title: 'CSI', url: 'student-chapters.html#chapter-csi' },
          { title: 'IETE', url: 'student-chapters.html#chapter-iete' },
          { title: 'ITSA', url: 'student-chapters.html#chapter-itsa' },
          { title: 'IGS', url: 'student-chapters.html#chapter-igs' },
          { title: 'ECSSA', url: 'student-chapters.html#chapter-ecssa' }
        ]
      },
      { title: 'Achievements', url: 'achievements.html' },
      { title: 'Counselling', url: 'counselling.html' },
      { title: 'NSS', url: 'nss.html' },
      { title: 'DLLE', url: 'dlle.html' }
    ]
  },
  {
    title: 'Career Development Cell',
    url: 'career-development-cell.html'
  },
  {
    title: 'Skills @ SLRTCE',
    children: [
      { title: 'e-yantra Lab', url: 'skills.html' },
      { title: 'MOU Skyline University', url: 'skills.html' },
      { title: 'Edunet Foundation', url: 'skills.html' },
      { title: 'IIT Remote Center', url: 'skills.html' },
      { title: 'IIRS', url: 'skills.html' },
      { title: 'Development Center', url: 'skills.html' },
      { title: 'FOSSEE Club', url: 'skills.html' },
      { title: 'MOU Maharashtra State Skill Development Society (MSSDS)', url: 'skills.html' }
    ]
  },
  {
    title: 'R & D',
    url: 'research-development.html',
    hasNavDropdown: false,
    sidebarChildren: [
      { title: 'About R&D', url: 'research-development.html' },
      { title: 'R&D Committee', url: 'placeholder.html?title=R%26D+Committee&section=R+%26+D' },
      {
        title: 'R&D Activities',
        children: [
          {
            title: 'Grants',
            children: [
              { title: 'Minor project list', url: 'placeholder.html?title=Minor+Project+List&section=R+%26+D' }
            ]
          },
          { title: 'Collaborations', url: 'placeholder.html?title=Collaborations&section=R+%26+D' },
          {
            title: 'Tie ups',
            children: [
              { title: 'e-yantra Lab', url: 'placeholder.html?title=e-yantra+Lab&section=R+%26+D' },
              { title: 'MOU Skyline University', url: 'placeholder.html?title=MOU+Skyline+University&section=R+%26+D' },
              { title: 'Edunet Foundation', url: 'placeholder.html?title=Edunet+Foundation&section=R+%26+D' }
            ]
          },
          { title: 'workshops & seminars', url: 'placeholder.html?title=Workshops+%26+Seminars&section=R+%26+D' }
        ]
      },
      { title: 'Incubation center', url: 'placeholder.html?title=Incubation+Center&section=R+%26+D' },
      { title: 'Startup Clinic permission letter', url: 'placeholder.html?title=Startup+Clinic+Permission+Letter&section=R+%26+D' },
      { title: 'IIC', url: 'placeholder.html?title=IIC&section=R+%26+D' },
      { title: 'NISP', url: 'placeholder.html?title=NISP&section=R+%26+D' },
      { title: 'Patents', url: 'placeholder.html?title=Patents&section=R+%26+D' }
    ]
  },
  {
    title: 'Blockchain Based Transcript',
    children: [
      { title: 'Login', url: 'blockchain-login.html' },
      { title: 'Verification', url: 'blockchain-verify.html' }
    ]
  }
];

// Utility Bar Menu Data
const SLRTCE_UTILITY_MENU = [
  {
    title: 'Mandatory Disclosure',
    children: [
      {
        title: 'University Grants Commission',
        children: [
          { title: '2F', url: 'http://drive.google.com/file/d/1sGsPONquuU1O-POCjbappjzlpx5HdTca/view', target: '_blank' },
          { title: 'Internal Complaints Committee (ICC)', url: 'placeholder.html?title=Internal+Complaints+Committee+(ICC)&section=Mandatory+Disclosure' },
          { title: 'Redress of Grievances of Students', url: 'placeholder.html?title=Redress+of+Grievances+of+Students&section=Mandatory+Disclosure' },
          { title: 'Public Self-Disclosure', url: 'placeholder.html?title=Public+Self-Disclosure&section=Mandatory+Disclosure' },
          { title: 'Fee Refund Policy', url: 'placeholder.html?title=Fee+Refund+Policy&section=Mandatory+Disclosure' }
        ]
      },
      {
        title: 'AICTE / NCTE / BCI / CoA',
        children: [
          { title: 'EoA / PAR / Recognition', url: 'placeholder.html?title=EoA+%2F+PAR+%2F+Recognition&section=Mandatory+Disclosure' },
          { title: 'Mandatory Disclosure Document', url: 'mandatory-disclosure.html' }
        ]
      },
      {
        title: 'NAAC',
        children: [
          { title: 'Certificate', url: 'placeholder.html?title=NAAC+Certificate&section=Mandatory+Disclosure' },
          { title: 'IIQA', url: 'placeholder.html?title=NAAC+IIQA&section=Mandatory+Disclosure' },
          { title: 'SSR', url: 'placeholder.html?title=NAAC+SSR&section=Mandatory+Disclosure' },
          { title: 'AQAR', url: 'placeholder.html?title=NAAC+AQAR&section=Mandatory+Disclosure' }
        ]
      },
      {
        title: 'NBA',
        children: [
          { title: 'Computer NBA', url: 'placeholder.html?title=Computer+NBA&section=Mandatory+Disclosure' },
          { title: 'Information Technology NBA', url: 'placeholder.html?title=Information+Technology+NBA&section=Mandatory+Disclosure' }
        ]
      }
    ]
  },
  { title: 'IQAC', url: 'placeholder.html?title=IQAC&section=Mandatory+Disclosure', modal: 'iqac-modal' },
  { title: 'Committee', url: 'placeholder.html?title=Committees&section=Mandatory+Disclosure', modal: 'committees-modal' },
  { title: 'Alumni', url: 'placeholder.html?title=Alumni&section=About+Us', modal: 'alumni-modal' },
  { title: 'Career', url: 'placeholder.html?title=Careers&section=About+Us', modal: 'career-modal' },
  { title: 'Student Login', url: 'placeholder.html?title=Student+Login&section=About+Us', modal: 'login-modal' },
  { title: 'Fee Structure', url: 'placeholder.html?title=Fee+Structure&section=Admission', modal: 'fee-modal' }
];

/**
 * Builds HTML for level 2 dropdowns and level 3 flyouts.
 */
function renderNavChildren(children, isFlyout = false) {
  if (!children || !children.length) return '';
  const listClass = isFlyout ? 'nav-flyout' : 'nav-dropdown';

  return `
    <ul class="${listClass}" role="menu">
      ${children.map(item => {
        const hasSub = item.children && item.children.length > 0;
        const targetAttr = item.target ? ` target="${item.target}" rel="noopener noreferrer"` : '';
        const modalAttr = item.modal ? ` onclick="if(typeof openModal==='function'){openModal('${item.modal}'); return false;}"` : '';

        if (hasSub) {
          return `
            <li class="has-flyout" role="none">
              <a href="${item.url || '#'}" role="menuitem" aria-haspopup="true" aria-expanded="false" class="nav-sub-item has-flyout-toggle"${modalAttr}${targetAttr}>
                <span>${item.title}</span>
                <span class="caret-right" aria-hidden="true"></span>
              </a>
              ${renderNavChildren(item.children, true)}
            </li>
          `;
        } else {
          return `
            <li role="none">
              <a href="${item.url || '#'}" role="menuitem" class="nav-sub-item"${modalAttr}${targetAttr}>
                <span>${item.title}</span>
              </a>
            </li>
          `;
        }
      }).join('')}
    </ul>
  `;
}

/**
 * Generates the full HTML markup for the Global Header & Navigation.
 */
function getHeaderMarkup() {
  return `
  <!-- ================= TOP GOLD UTILITY BAR ================= -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span class="govt-code">DTE Code: <strong>EN3218</strong></span>
        <span class="divider">|</span>
        <span class="top-contact">info@slrtce.in</span>
        <span class="divider">|</span>
        <span class="top-contact">+91 (022) 2812 0144</span>
      </div>
      <div class="top-bar-right">
        <!-- Utility Links -->
        <div class="utility-item has-dropdown">
          <button type="button" class="top-link top-toggle-btn" id="utilBtnDisclosure" aria-expanded="false" aria-haspopup="true">
            <span>Mandatory Disclosure</span>
            <span class="caret-down" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown utility-dropdown" aria-labelledby="utilBtnDisclosure" role="menu">
            ${SLRTCE_UTILITY_MENU[0].children.map(group => `
              <li class="has-flyout" role="none">
                <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" class="nav-sub-item has-flyout-toggle">
                  <span>${group.title}</span>
                  <span class="caret-right" aria-hidden="true"></span>
                </a>
                <ul class="nav-flyout" role="menu">
                  ${group.children.map(sub => `
                    <li role="none">
                      <a href="${sub.url}" role="menuitem" class="nav-sub-item"${sub.target ? ` target="${sub.target}" rel="noopener noreferrer"` : ''}>
                        <span>${sub.title}</span>
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </li>
            `).join('')}
          </ul>
        </div>

        <a href="#iqac" class="top-link" onclick="if(typeof openModal==='function'){openModal('iqac-modal'); return false;}">IQAC</a>
        <a href="#committees" class="top-link" onclick="if(typeof openModal==='function'){openModal('committees-modal'); return false;}">Committee</a>
        <a href="#alumni" class="top-link" onclick="if(typeof openModal==='function'){openModal('alumni-modal'); return false;}">Alumni</a>
        <a href="#careers" class="top-link" onclick="if(typeof openModal==='function'){openModal('career-modal'); return false;}">Career</a>
        <a href="#student-login" class="top-link btn-top-login" onclick="if(typeof openModal==='function'){openModal('login-modal'); return false;}">Student Login</a>
        <a href="#fee-structure" class="top-link highlight-fee" onclick="if(typeof openModal==='function'){openModal('fee-modal'); return false;}">Fee Structure</a>

        <!-- Top Search Form -->
        <form class="top-search-form" action="placeholder.html" method="GET" role="search">
          <input type="hidden" name="section" value="Search">
          <input type="search" name="title" placeholder="Search..." aria-label="Search site" required>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>

  <!-- ================= MAIN BRANDING BAR ================= -->
  <div class="main-branding-bar">
    <div class="container header-inner">
      <div class="brand-block">
        <a href="index.html" class="brand-logo-wrap">
          <img src="assets/optimized/slrtce_logo_crest.webp" alt="Shree L. R. Tiwari College of Engineering Crest Logo" class="logo-crest-img" width="48" height="48" loading="lazy" decoding="async">
          <div class="brand-text">
            <h1 class="institute-name">SHREE L. R. TIWARI COLLEGE OF ENGINEERING</h1>
            <div class="institute-affil">
              <div class="affil-line">An Autonomous Institute, Affiliated to University of Mumbai Approved by AICTE &amp; DTE, Maharashtra State | NAAC Accredited,</div>
              <div class="affil-line">NBA Accredited Program | ISO 9001:2015 Certified | DTE Code No: 3423 | Recognized under Section 2(f) of the UGC Act 1956 |</div>
              <div class="affil-line">Minority Status (Hindi Linguistic)</div>
            </div>
          </div>
        </a>
      </div>
      <button class="mobile-menu-toggle" id="mobileMenuBtn" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mainNav"><span>Menu</span></button>
    </div>
  </div>

  <!-- ================= STICKY GLOBAL NAVIGATION ================= -->
  <nav class="main-nav" id="mainNav" aria-label="Primary site navigation">
    <div class="container nav-container">
      <ul class="nav-links" id="primaryNavLinks" role="menubar">
        ${SLRTCE_NAV_MENU.map((item, idx) => {
          const hasChildren = item.children && item.children.length > 0 && item.hasNavDropdown !== false;
          const navKey = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');

          if (hasChildren) {
            return `
              <li class="has-dropdown" role="none" data-nav="${navKey}">
                <button type="button" class="nav-item nav-toggle-btn" id="navBtn_${idx}" aria-expanded="false" aria-haspopup="true" role="menuitem">
                  <span>${item.title}</span>
                  <span class="caret-down" aria-hidden="true"></span>
                </button>
                ${renderNavChildren(item.children, false)}
              </li>
            `;
          } else {
            return `
              <li class="simple-nav-link" role="none" data-nav="${navKey}">
                <a href="${item.url || '#'}" class="nav-item" role="menuitem">
                  <span>${item.title}</span>
                </a>
              </li>
            `;
          }
        }).join('')}
      </ul>

      <!-- Apply Now CTA -->
      <div class="nav-cta-wrapper">
        <a href="index.html#enquiry-section" class="btn-nav-apply">
          Apply Now
        </a>
      </div>
    </div>
  </nav>
  `;
}

/**
 * Generates the full HTML markup for the Global Shared Footer.
 */
function getFooterMarkup() {
  return `
  <footer class="site-footer" id="contact">
    <div class="container footer-main-grid">

      <!-- Col 1: Institute Brand Identity -->
      <div class="footer-col brand-col">
        <div class="footer-logo">
          <img src="assets/optimized/slrtce_logo_crest.webp" alt="Shree L. R. Tiwari College of Engineering Official Crest" class="footer-crest-img" width="54" height="54" loading="lazy" decoding="async">
          <div>
            <h3 class="footer-institute-name">Shree L. R. Tiwari College of Engineering</h3>
            <span class="footer-tagline">Excellence in Engineering & Technology</span>
          </div>
        </div>
        <p class="footer-brand-desc">
          An Autonomous Institute affiliated to University of Mumbai, Approved by AICTE & DTE Maharashtra, NAAC & NBA Accredited.
        </p>
        <div class="footer-social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>

      <!-- Col 2: Information for -->
      <div class="footer-col">
        <h4 class="footer-heading">Information for</h4>
        <ul class="footer-links">
          <li><a href="#alumni" onclick="if(typeof openModal==='function'){openModal('alumni-modal'); return false;}">Alumni</a></li>
          <li><a href="#fee-structure" onclick="if(typeof openModal==='function'){openModal('fee-modal'); return false;}">Fee structure</a></li>
          <li><a href="#careers" onclick="if(typeof openModal==='function'){openModal('career-modal'); return false;}">Careers</a></li>
          <li><a href="placeholder.html?title=Gallery&section=About+Us">Gallery</a></li>
        </ul>
      </div>

      <!-- Col 3: Contact Us -->
      <div class="footer-col contact-col">
        <h4 class="footer-heading">Contact Us</h4>
        <address class="footer-address">
          <p><span>Kanakia Park, Mira Road (East), Mira Bhayandar 401107</span></p>
          <p><span>+91 (022) 2812 0144 / 45</span></p>
          <p><a href="mailto:info@slrtce.in">info@slrtce.in</a></p>
          <p class="footer-enquiry-row">
            <a href="index.html#enquiry-section" class="footer-enquiry-btn">Send Enquiry Form</a>
          </p>
        </address>
      </div>

      <!-- Col 4: Know more -->
      <div class="footer-col">
        <h4 class="footer-heading">Know more</h4>
        <ul class="footer-links">
          <li><a href="#iqac" onclick="if(typeof openModal==='function'){openModal('iqac-modal'); return false;}">IQAC</a></li>
          <li><a href="#disclosure" onclick="if(typeof openModal==='function'){openModal('mandatory-disclosure'); return false;}">Mandatory disclosure</a></li>
          <li><a href="#student-login" onclick="if(typeof openModal==='function'){openModal('login-modal'); return false;}">Student login</a></li>
          <li><a href="#terms" onclick="if(typeof openModal==='function'){openModal('terms-modal'); return false;}">Terms of use</a></li>
          <li><a href="#privacy" onclick="if(typeof openModal==='function'){openModal('privacy-modal'); return false;}">Privacy policy</a></li>
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
 */
function injectWhatsAppButton() {
  if (document.getElementById('whatsappFloatingBtn')) return;

  const btn = document.createElement('a');
  btn.id = 'whatsappFloatingBtn';
  btn.className = 'whatsapp-floating-btn';
  btn.setAttribute('aria-label', 'Chat on WhatsApp with SLRTCE Admissions');
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');

  const waNum = typeof SLRTCE_CONFIG !== 'undefined' ? SLRTCE_CONFIG.whatsappNumber : '';
  const waMsg = typeof SLRTCE_CONFIG !== 'undefined' ? SLRTCE_CONFIG.whatsappMessage : 'Hello SLRTCE';

  if (typeof isSet === 'function' && isSet(waNum)) {
    btn.href = `https://wa.me/${waNum}?text=${encodeURIComponent(waMsg)}`;
  } else {
    btn.href = 'index.html#enquiry-section';
    btn.title = 'WhatsApp (Click to Send Enquiry)';
  }

  btn.innerHTML = `<span class="whatsapp-btn-text">WhatsApp</span>`
      <div class="site-copyright-bar"><div class="copyright-inner"><p class="copyright-text">&copy; <span id="copyrightYear"></span> Shree L. R. Tiwari College of Engineering. All rights reserved. Affiliated to University of Mumbai. Approved by AICTE.</p></div></div>
    `;
  document.body.appendChild(btn);
}

/**
 * Reusable Section Sidebar Component for Inner Pages.
 * Finds the section in SLRTCE_NAV_MENU (or utility) and renders the list of pages,
 * highlighting the active page.
 */
function renderSectionSidebar(sectionTitle, activeTitle, containerId = 'sectionSidebar') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Find section in nav menu or utility menu
  let targetSection = SLRTCE_NAV_MENU.find(item => item.title.toLowerCase() === (sectionTitle || '').toLowerCase());
  let items = [];

  if (targetSection) {
    items = targetSection.sidebarChildren || targetSection.children || [];
  } else {
    // Check utility menu
    const utilMatch = SLRTCE_UTILITY_MENU.find(item => item.title.toLowerCase() === (sectionTitle || '').toLowerCase());
    if (utilMatch) {
      items = utilMatch.children || [];
    } else {
      // Fallback: search children of all sections
      for (const topItem of SLRTCE_NAV_MENU) {
        if (topItem.children) {
          const match = topItem.children.find(c => c.title.toLowerCase() === (sectionTitle || '').toLowerCase());
          if (match && match.children) {
            targetSection = match;
            items = match.children;
            break;
          }
        }
      }
    }
  }

  const cleanActive = (activeTitle || '').toLowerCase().trim();

  function renderList(list) {
    if (!list || !list.length) return '';
    return `
      <ul class="sidebar-nav">
        ${list.map(entry => {
          const isCurrent = entry.title.toLowerCase().trim() === cleanActive;
          const hasChildren = entry.children && entry.children.length > 0;
          return `
            <li>
              <a href="${entry.url || '#'}" class="${isCurrent ? 'active' : ''}">
                <span>${entry.title}</span>
                ${hasChildren ? '<span class="caret-down" aria-hidden="true"></span>' : ''}
              </a>
              ${hasChildren ? `<ul class="sidebar-subnav">${renderList(entry.children)}</ul>` : ''}
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  const headingText = targetSection ? targetSection.title : (sectionTitle || 'Related Links');

  container.innerHTML = `
    <div class="inner-sidebar">
      <h3 class="inner-sidebar-title">${headingText}</h3>
      ${items.length > 0 ? renderList(items) : `<p style="font-size:0.875rem; color:var(--text-muted);">No additional pages in this section.</p>`}
    </div>
  `;
}

/**
 * Initializes keyboard navigation, dropdowns, side flyouts,
 * boundary detection (flip-left), mobile accordion drawer, and scrollspy.
 */
function initNavigationBehaviors() {
  const mainNav = document.getElementById('mainNav');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const allDropdowns = document.querySelectorAll('.has-dropdown');
  const allFlyouts = document.querySelectorAll('.has-flyout');

  // Close all open dropdowns
  function closeAllDropdowns(except = null) {
    allDropdowns.forEach(item => {
      if (item !== except) {
        item.classList.remove('dropdown-open');
        const btn = item.querySelector('.nav-toggle-btn, .top-toggle-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Close all open flyouts
  function closeAllFlyouts(except = null) {
    allFlyouts.forEach(flyout => {
      if (flyout !== except) {
        flyout.classList.remove('flyout-open');
        const trigger = flyout.querySelector('.has-flyout-toggle');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Adjust flyout boundary so it doesn't overflow the viewport
  function adjustFlyoutPosition(flyoutEl) {
    if (!flyoutEl || window.innerWidth <= 900) return;
    const menu = flyoutEl.querySelector('.nav-flyout');
    if (!menu) return;

    // Reset first
    menu.classList.remove('flip-left');
    const rect = menu.getBoundingClientRect();
    if (rect.right > (window.innerWidth - 10)) {
      menu.classList.add('flip-left');
    }
  }

  // Dropdowns (Level 1 -> 2)
  allDropdowns.forEach(item => {
    const toggleBtn = item.querySelector('.nav-toggle-btn, .top-toggle-btn');
    const dropdownMenu = item.querySelector('.nav-dropdown');

    if (!toggleBtn || !dropdownMenu) return;

    // Desktop hover
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
        closeAllFlyouts();
      }
    });

    // Tap/Click toggle (Keyboard Enter or mobile touch)
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('dropdown-open');
      if (isOpen) {
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        closeAllDropdowns(item);
        item.classList.add('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard navigation within dropdown
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        item.classList.remove('dropdown-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      } else if (e.key === 'ArrowDown') {
        if (!item.classList.contains('dropdown-open')) {
          e.preventDefault();
          closeAllDropdowns(item);
          item.classList.add('dropdown-open');
          toggleBtn.setAttribute('aria-expanded', 'true');
          const firstLink = dropdownMenu.querySelector('a, button');
          if (firstLink) firstLink.focus();
        }
      }
    });
  });

  // Flyouts (Level 2 -> 3)
  allFlyouts.forEach(flyout => {
    const trigger = flyout.querySelector('.has-flyout-toggle');
    const flyoutMenu = flyout.querySelector('.nav-flyout');

    if (!trigger || !flyoutMenu) return;

    // Desktop hover
    flyout.addEventListener('mouseenter', () => {
      if (window.innerWidth > 900) {
        flyout.classList.add('flyout-open');
        trigger.setAttribute('aria-expanded', 'true');
        adjustFlyoutPosition(flyout);
      }
    });

    flyout.addEventListener('mouseleave', () => {
      if (window.innerWidth > 900) {
        flyout.classList.remove('flyout-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Mobile tap or click
    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 || !trigger.getAttribute('href') || trigger.getAttribute('href') === '#') {
        e.preventDefault();
        const isOpen = flyout.classList.toggle('flyout-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) adjustFlyoutPosition(flyout);
      }
    });

    // Keyboard arrow keys for flyout
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        flyout.classList.add('flyout-open');
        trigger.setAttribute('aria-expanded', 'true');
        adjustFlyoutPosition(flyout);
        const firstChild = flyoutMenu.querySelector('a, button');
        if (firstChild) firstChild.focus();
      }
    });

    flyoutMenu.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        flyout.classList.remove('flyout-open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      }
    });
  });

  // Close when focus moves outside navigation
  document.addEventListener('focusin', (e) => {
    if (!e.target.closest('#mainNav') && !e.target.closest('.top-bar')) {
      closeAllDropdowns();
      closeAllFlyouts();
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown') && !e.target.closest('.has-flyout')) {
      closeAllDropdowns();
      closeAllFlyouts();
    }
  });

  // Mobile menu button toggle (<= 900px)
  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Scrollspy: active nav link highlight on home page
  const sectionMap = [
    { id: 'hero', navKey: 'about' },
    { id: 'about', navKey: 'about' },
    { id: 'programmes', navKey: 'academics' },
    { id: 'news', navKey: 'life' },
    { id: 'why-us', navKey: 'life' },
    { id: 'placements', navKey: 'cdc' },
    { id: 'enquiry-section', navKey: 'admission' },
    { id: 'contact', navKey: 'contact' }
  ];

  function updateActiveNav() {
    const scrollPos = window.scrollY + 180;
    let currentNavKey = '';

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

    if (!currentNavKey) return;

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

  if (document.getElementById('hero')) {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }
}

/**
 * Custom Elements: <site-header> and <site-footer>
 */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getHeaderMarkup();
    initNavigationBehaviors();
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = getFooterMarkup();
    injectWhatsAppButton();
  }
}

if ('customElements' in window) {
  if (!customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
  if (!customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
}

// Fallback auto-mounting if customElements not used
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

  injectWhatsAppButton();
});

// Set current year in copyright bar
document.addEventListener('DOMContentLoaded', function () {
  var yearEls = document.querySelectorAll('.copyright-year');
  var y = new Date().getFullYear();
  yearEls.forEach(function(el) { el.textContent = y; });
});
