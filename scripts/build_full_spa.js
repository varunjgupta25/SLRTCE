const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const archiveDir = path.join(rootDir, 'archive');

// 1. Read styles.css and app.js
const stylesCss = fs.readFileSync(path.join(rootDir, 'styles.css'), 'utf-8');
let appJs = fs.readFileSync(path.join(rootDir, 'app.js'), 'utf-8');
// remove default DOMContentLoaded from app.js so SPA router controls lifecycle
appJs = appJs.replace(/document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{[\s\S]*?\}\);/m, '');

// Read home page from index.backup.html or archive/index.backup.html
let indexBackupPath = path.join(rootDir, 'index.backup.html');
if (!fs.existsSync(indexBackupPath)) {
  indexBackupPath = path.join(archiveDir, 'index.backup.html');
}
const indexBackupHtml = fs.readFileSync(indexBackupPath, 'utf-8');
const homeMatch = indexBackupHtml.match(/<!-- ================= NEWS TICKER ================= -->([\s\S]*?)<!-- ================= SHARED GLOBAL FOOTER ================= -->/i);
let homeContent = homeMatch ? homeMatch[1] : '';

function normalizeLinks(str) {
  return str
    .replace(/href="index\.html#([^"]*)"/g, 'href="#/home?scroll=$1"')
    .replace(/href="index\.html"/g, 'href="#/home"')
    .replace(/href="placeholder\.html\?([^"]*)"/g, 'href="#/placeholder?$1"')
    .replace(/href="([a-zA-Z0-9_-]+)\.html(#?[^"]*)"/g, 'href="#/$1$2"');
}

homeContent = normalizeLinks(homeContent);

function escapeForTemplateLiteral(str) {
  return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const pageTemplates = [];
const pageMeta = {};

pageTemplates.push(`PAGES['home'] = function() {
  return \`${escapeForTemplateLiteral(homeContent)}\`;
};`);
pageMeta['home'] = { title: 'Home', section: 'Home' };

// 2. Read all HTML files from archive/ or root
let htmlFiles = [];
if (fs.existsSync(archiveDir)) {
  htmlFiles = fs.readdirSync(archiveDir).filter(f => f.endsWith('.html') && f !== 'index.backup.html');
} else {
  htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'index.backup.html');
}

console.log(`Processing ${htmlFiles.length} pages for SPA router...`);

for (const file of htmlFiles) {
  const filePath = fs.existsSync(path.join(archiveDir, file)) ? path.join(archiveDir, file) : path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const pageKey = file.replace('.html', '');

  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/ \| Shree.*$/i, '').trim() : pageKey;

  const sidebarMatch = content.match(/renderSectionSidebar\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);
  const section = sidebarMatch ? sidebarMatch[1] : '';
  const sidebarTitle = sidebarMatch ? sidebarMatch[2] : title;

  pageMeta[pageKey] = { title, section, sidebarTitle };

  let bodyContent = '';
  const bannerMatch = content.match(/(<section class="inner-page-banner"[\s\S]*?<\/main>)/i);
  if (bannerMatch) {
    bodyContent = bannerMatch[1];
  } else {
    const mainSectionMatch = content.match(/<site-header><\/site-header>([\s\S]*?)<site-footer><\/site-footer>/i);
    if (mainSectionMatch) {
      bodyContent = mainSectionMatch[1];
    } else {
      const bodyTagMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      bodyContent = bodyTagMatch ? bodyTagMatch[1] : content;
    }
  }

  bodyContent = bodyContent.replace(/<site-header><\/site-header>/gi, '');
  bodyContent = bodyContent.replace(/<site-footer><\/site-footer>/gi, '');
  bodyContent = bodyContent.replace(/<div class="modal-backdrop"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  bodyContent = bodyContent.replace(/<aside class="inner-sidebar-col"[\s\S]*?<\/aside>/gi, '');
  bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
  bodyContent = normalizeLinks(bodyContent);

  pageTemplates.push(`PAGES['${pageKey}'] = function(query) {
  return \`${escapeForTemplateLiteral(bodyContent)}\`;
};`);
}

pageTemplates.push(`
// Dynamic placeholder handler
PAGES['placeholder'] = function(query) {
  let pTitle = 'Page Under Development';
  let pSection = 'Information';
  if (query) {
    const params = new URLSearchParams(query);
    if (params.get('title')) pTitle = params.get('title');
    if (params.get('section')) pSection = params.get('section');
  }
  return \`
  <section class="inner-page-banner" aria-label="Placeholder Banner">
    <div class="container inner-banner-grid">
      <div class="inner-banner-info">
        <div class="inner-breadcrumbs">
          <a href="#/home">Home</a> / <span>\${pSection}</span> / <span>\${pTitle}</span>
        </div>
        <h1 class="inner-banner-title">\${pTitle}</h1>
        <p class="inner-banner-desc">Official documentation and updates for \${pTitle} under \${pSection} at SLRTCE.</p>
      </div>
      <div class="inner-banner-photo-wrap">
        <img src="assets/slide_robot_exhibition.jpg" alt="SLRTCE Campus" class="inner-banner-photo">
      </div>
    </div>
  </section>
  <main class="container inner-layout-container">
    <article class="inner-main-content">
      <div class="inner-info-box">
        <p>This section is actively being populated for the upcoming academic cycle. You may contact the administration or submit an enquiry for immediate information.</p>
      </div>
      <h2>Overview</h2>
      <p>For more details on <strong>\${pTitle}</strong>, please refer to the respective administrative or departmental desk at Shree L. R. Tiwari College of Engineering.</p>
      <div style="margin-top: 1.5rem;">
        <a href="#/contact" class="btn btn-primary" style="display:inline-block; padding:.6rem 1.2rem; background:var(--color-maroon); color:#fff; text-decoration:none; font-weight:700;">Contact Administration</a>
        <a href="#/home" class="btn btn-outline" style="display:inline-block; padding:.6rem 1.2rem; border:1px solid var(--color-maroon); color:var(--color-maroon); text-decoration:none; font-weight:700; margin-left:.5rem;">Return Home</a>
      </div>
    </article>
    <aside class="inner-sidebar-col" id="sectionSidebar"></aside>
  </main>
  \`;
};
`);

// 3. Navigation Data & Helper definitions
const navDataScript = `
const SLRTCE_NAV_MENU = [
  { title: 'Home', url: '#/home' },
  {
    title: 'About Us',
    children: [
      { title: 'About college', url: '#/about-college' },
      { title: 'Vision & Mission', url: '#/vision-mission' },
      { title: "Principal's Message", url: '#/principals-message' },
      {
        title: 'Our Management',
        children: [
          { title: 'Chairman', url: '#/chairman' },
          { title: 'President', url: '#/president' },
          { title: 'Secretary', url: '#/secretary' },
          { title: 'Joint Secretary', url: '#/joint-secretary' },
          { title: 'Chief Operating Officer (COO)', url: '#/coo' }
        ]
      },
      { title: 'Core Values', url: '#/core-values' },
      { title: 'Gallery', url: '#/gallery' }
    ]
  },
  {
    title: 'Admission',
    children: [
      {
        title: 'Ph.D. Technology',
        children: [
          { title: 'Ph.D. Programs', url: '#/phd-programmes' },
          {
            title: 'Ph.D. Admission',
            children: [
              { title: 'Ph.D. Admission Application Form', url: '#/phd-programmes' },
              { title: 'Mumbai University Ph.D. Degree Standards', url: '#/phd-programmes' },
              { title: 'NOC Format', url: '#/phd-programmes' }
            ]
          },
          { title: 'Selection Process', url: '#/phd-programmes' }
        ]
      },
      {
        title: 'Admission',
        children: [
          {
            title: 'Provisional Merit List A.Y. 2026-27',
            children: [
              { title: 'First Year B.Tech Merit List Institute Level', url: '#/admission-process' },
              { title: 'First Year B.Tech Merit List - ACAP', url: '#/admission-process' },
              { title: 'DSE Merit List - ACAP', url: '#/admission-process' },
              { title: 'M.Tech Merit List Institute Level', url: '#/admission-process' },
              { title: 'M.Tech Merit List - ACAP', url: '#/admission-process' },
              { title: 'MCA Merit List Institute Level', url: '#/admission-process' },
              { title: 'MCA Merit List - ACAP', url: '#/admission-process' },
              { title: 'BMS Merit List Institute Level', url: '#/admission-process' },
              { title: 'BMS Merit List - ACAP', url: '#/admission-process' }
            ]
          },
          {
            title: 'Final Merit List AY 2026-27',
            children: [
              { title: 'Final First Year B.tech Merit List Institute Level', url: '#/admission-process' },
              { title: 'Final First Year B.Tech Merit List - ACAP', url: '#/admission-process' },
              { title: 'Final DSE Merit List - ACAP', url: '#/admission-process' },
              { title: 'Final M.Tech Merit List Institute Level', url: '#/admission-process' },
              { title: 'Final M.Tech Merit List - ACAP', url: '#/admission-process' },
              { title: 'Final MCA Merit List Institute Level', url: '#/admission-process' },
              { title: 'Final MCA Merit List - ACAP', url: '#/admission-process' },
              { title: 'Final BMS Merit List Institute Level', url: '#/admission-process' },
              { title: 'Final BMS Merit List - ACAP', url: '#/admission-process' }
            ]
          }
        ]
      },
      { title: 'Admission Process', url: '#/admission-process' },
      { title: 'Admission & Eligibility Criteria', url: '#/eligibility-criteria' },
      { title: 'Admission Notification UG & PG', url: '#/admission-process' },
      { title: 'Courses Offered', url: '#/courses-offered' },
      { title: 'Fee Structure', url: '#/fee-structure' },
      { title: 'Direct Second Year Admission Notification', url: '#/admission-process' },
      { title: 'College Scholarship', url: '#/scholarship' },
      { title: 'Facilities', url: '#/facilities' },
      { title: 'Scholarship/Freeship from govt. of Maharashtra', url: '#/scholarship' }
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
              { title: 'Computer Engineering', url: '#/computer-engineering' },
              { title: 'Electronics and Computer Science', url: '#/ecs' },
              { title: 'Civil Engineering with Computer Application', url: '#/civil-engineering' },
              { title: 'Mechanical Engineering', url: '#/mechanical-engineering' },
              { title: 'Information Technology', url: '#/information-technology' },
              { title: 'Electronics and Telecommunication Engineering', url: '#/extc' },
              { title: 'Humanities And Applied Sciences', url: '#/home' },
              { title: 'Bachelor of Vocation (B.Voc)', url: '#/bvoc' },
              { title: 'Computer Science & Engineering (Cyber Security)', url: '#/cse-cyber' },
              { title: 'Computer Science & Engineering (Data Science)', url: '#/cse-ds' },
              { title: 'Computer Science & Engineering (Artificial Intelligence & Data Science)', url: '#/cse-ai' },
              { title: 'Artificial Intelligence and Machine Learning', url: '#/aiml' }
            ]
          },
          {
            title: 'Post Graduate Programmes',
            children: [
              { title: 'Masters of Computer Application', url: '#/mca' },
              { title: 'Computer Engineering', url: '#/me-computer' },
              { title: 'Electronics and Telecommunication Engineering', url: '#/me-extc' },
              { title: 'PGDM Program', url: '#/pgdm' }
            ]
          },
          { title: 'Phd Programmes', url: '#/phd-programmes' },
          {
            title: 'Certificate & Diploma',
            children: [
              { title: "SUNY's Courses", url: '#/skills' },
              { title: 'Java Certification', url: '#/skills' },
              { title: 'Database Certification', url: '#/skills' }
            ]
          }
        ]
      },
      { title: 'Academic Calendar', url: '#/exam-notices' },
      { title: 'Library', url: '#/library' },
      {
        title: 'College Toppers',
        children: [
          { title: 'Under Graduate Rankers', url: '#/college-toppers' },
          { title: 'Post Graduate Rankers', url: '#/college-toppers' }
        ]
      },
      {
        title: 'Exam',
        children: [
          { title: 'Exam-Notices', url: '#/exam-notices' },
          { title: 'MU Question Paper', url: '#/exam-notices' }
        ]
      }
    ]
  },
  {
    title: 'Life @ SLRTCE',
    children: [
      { title: 'Student Life', url: '#/student-life' },
      {
        title: 'Student Clubs',
        children: [
          { title: 'AI & ML Club', url: '#/student-clubs?scroll=club-aiml' },
          { title: 'Web Development Club', url: '#/student-clubs?scroll=club-webdev' },
          { title: 'IoT, Embedded & CAD/CAM Club', url: '#/student-clubs?scroll=club-iot' },
          { title: 'Google Developer Student Clubs', url: '#/student-clubs?scroll=club-gdsc' },
          { title: 'Go-Karting Club', url: '#/student-clubs?scroll=club-gokart' }
        ]
      },
      { title: 'Student Council', url: '#/student-council' },
      {
        title: 'Student Chapters',
        children: [
          { title: 'CSI', url: '#/student-chapters?scroll=chapter-csi' },
          { title: 'IETE', url: '#/student-chapters?scroll=chapter-iete' },
          { title: 'ITSA', url: '#/student-chapters?scroll=chapter-itsa' },
          { title: 'IGS', url: '#/student-chapters?scroll=chapter-igs' },
          { title: 'ECSSA', url: '#/student-chapters?scroll=chapter-ecssa' }
        ]
      },
      { title: 'Achievements', url: '#/achievements' },
      { title: 'Counselling', url: '#/counselling' },
      { title: 'NSS', url: '#/nss' },
      { title: 'DLLE', url: '#/dlle' }
    ]
  },
  { title: 'Career Development Cell', url: '#/career-development-cell' },
  {
    title: 'Skills @ SLRTCE',
    children: [
      { title: 'e-yantra Lab', url: '#/skills' },
      { title: 'MOU Skyline University', url: '#/skills' },
      { title: 'Edunet Foundation', url: '#/skills' },
      { title: 'IIT Remote Center', url: '#/skills' },
      { title: 'IIRS', url: '#/skills' },
      { title: 'Development Center', url: '#/skills' },
      { title: 'FOSSEE Club', url: '#/skills' },
      { title: 'MOU Maharashtra State Skill Development Society (MSSDS)', url: '#/skills' }
    ]
  },
  {
    title: 'R & D',
    url: '#/research-development',
    hasNavDropdown: false,
    sidebarChildren: [
      { title: 'About R&D', url: '#/research-development' },
      { title: 'R&D Committee', url: '#/research-development' },
      {
        title: 'R&D Activities',
        children: [
          { title: 'Grants', children: [{ title: 'Minor project list', url: '#/research-development' }] },
          { title: 'Collaborations', url: '#/research-development' },
          {
            title: 'Tie ups',
            children: [
              { title: 'e-yantra Lab', url: '#/skills' },
              { title: 'MOU Skyline University', url: '#/skills' },
              { title: 'Edunet Foundation', url: '#/skills' }
            ]
          },
          { title: 'workshops & seminars', url: '#/research-development' }
        ]
      },
      { title: 'Incubation center', url: '#/research-development' },
      { title: 'Startup Clinic permission letter', url: '#/research-development' },
      { title: 'IIC', url: '#/research-development' },
      { title: 'NISP', url: '#/research-development' },
      { title: 'Patents', url: '#/research-development' }
    ]
  },
  {
    title: 'Blockchain Based Transcript',
    children: [
      { title: 'Login', url: '#/blockchain-login' },
      { title: 'Verification', url: '#/blockchain-verify' }
    ]
  }
];

const SLRTCE_UTILITY_MENU = [
  {
    title: 'Mandatory Disclosure',
    children: [
      {
        title: 'University Grants Commission',
        children: [
          { title: '2F', url: 'http://drive.google.com/file/d/1sGsPONquuU1O-POCjbappjzlpx5HdTca/view', target: '_blank' },
          { title: 'Internal Complaints Committee (ICC)', url: '#/mandatory-disclosure' },
          { title: 'Redress of Grievances of Students', url: '#/mandatory-disclosure' },
          { title: 'Public Self-Disclosure', url: '#/mandatory-disclosure' },
          { title: 'Fee Refund Policy', url: '#/mandatory-disclosure' }
        ]
      },
      {
        title: 'AICTE / NCTE / BCI / CoA',
        children: [
          { title: 'EoA / PAR / Recognition', url: '#/mandatory-disclosure' },
          { title: 'Mandatory Disclosure Document', url: '#/mandatory-disclosure' }
        ]
      },
      {
        title: 'NAAC',
        children: [
          { title: 'Certificate', url: '#/mandatory-disclosure' },
          { title: 'IIQA', url: '#/mandatory-disclosure' },
          { title: 'SSR', url: '#/mandatory-disclosure' },
          { title: 'AQAR', url: '#/mandatory-disclosure' }
        ]
      },
      {
        title: 'NBA',
        children: [
          { title: 'Computer NBA', url: '#/mandatory-disclosure' },
          { title: 'Information Technology NBA', url: '#/mandatory-disclosure' }
        ]
      }
    ]
  },
  { title: 'IQAC', url: '#', modal: 'iqac-modal' },
  { title: 'Committee', url: '#', modal: 'committees-modal' },
  { title: 'Alumni', url: '#', modal: 'alumni-modal' },
  { title: 'Career', url: '#', modal: 'career-modal' },
  { title: 'Student Login', url: '#', modal: 'login-modal' },
  { title: 'Fee Structure', url: '#/fee-structure' }
];

function renderNavChildren(children, isFlyout = false) {
  if (!children || !children.length) return '';
  const lc = isFlyout ? 'nav-flyout' : 'nav-dropdown';
  return \`<ul class="\${lc}" role="menu">\${children.map(item => {
    const hasSub = item.children && item.children.length > 0;
    const tgt = item.target ? ' target="' + item.target + '" rel="noopener noreferrer"' : '';
    const mc = item.modal ? ' onclick="if(typeof openModal===\\'function\\'){openModal(\\'' + item.modal + '\\');return false;}"' : '';
    const href = item.url || '#';
    if (hasSub) {
      return \`<li class="has-flyout" role="none"><a href="\${href}" role="menuitem" aria-haspopup="true" aria-expanded="false" class="nav-sub-item has-flyout-toggle"\${mc}\${tgt}><span>\${item.title}</span><span class="caret-right" aria-hidden="true"></span></a>\${renderNavChildren(item.children, true)}</li>\`;
    }
    return \`<li role="none"><a href="\${href}" role="menuitem" class="nav-sub-item"\${mc}\${tgt}><span>\${item.title}</span></a></li>\`;
  }).join('')}</ul>\`;
}

function getHeaderMarkup() {
  return \`
  <!-- Top Utility Bar -->
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
        <div class="utility-item has-dropdown">
          <button type="button" class="top-link top-toggle-btn" id="utilBtnDisclosure" aria-expanded="false" aria-haspopup="true">
            <span>Mandatory Disclosure</span>
            <span class="caret-down" aria-hidden="true"></span>
          </button>
          <ul class="nav-dropdown utility-dropdown" aria-labelledby="utilBtnDisclosure" role="menu">
            \${SLRTCE_UTILITY_MENU[0].children.map(g => \`
              <li class="has-flyout" role="none">
                <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false" class="nav-sub-item has-flyout-toggle">
                  <span>\${g.title}</span>
                  <span class="caret-right" aria-hidden="true"></span>
                </a>
                <ul class="nav-flyout" role="menu">
                  \${g.children.map(s => \`
                    <li role="none">
                      <a href="\${s.url}" role="menuitem" class="nav-sub-item"\${s.target ? ' target="' + s.target + '" rel="noopener noreferrer"' : ''}>
                        <span>\${s.title}</span>
                      </a>
                    </li>
                  \`).join('')}
                </ul>
              </li>
            \`).join('')}
          </ul>
        </div>
        <a href="#" class="top-link" onclick="if(typeof openModal==='function'){openModal('iqac-modal');return false;}">IQAC</a>
        <a href="#" class="top-link" onclick="if(typeof openModal==='function'){openModal('committees-modal');return false;}">Committee</a>
        <a href="#" class="top-link" onclick="if(typeof openModal==='function'){openModal('alumni-modal');return false;}">Alumni</a>
        <a href="#" class="top-link" onclick="if(typeof openModal==='function'){openModal('career-modal');return false;}">Career</a>
        <a href="#" class="top-link btn-top-login" onclick="if(typeof openModal==='function'){openModal('login-modal');return false;}">Student Login</a>
        <a href="#/fee-structure" class="top-link highlight-fee">Fee Structure</a>
        <form class="top-search-form" onsubmit="handleSearch(event)" role="search">
          <input type="search" id="spaSearchInput" placeholder="Search..." aria-label="Search site" required>
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>

  <!-- Main Branding Bar (Matched Exactly to Target Design) -->
  <div class="main-branding-bar">
    <div class="container header-inner">
      <div class="brand-block">
        <a href="#/home" class="brand-logo-wrap" onclick="navigate('#/home')">
          <img src="assets/slrtce_logo_crest.jpg" alt="SLRTCE Crest" class="logo-crest-img">
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

  <!-- Sticky Global Navigation (Single Line, Uniform Normal Font) -->
  <nav class="main-nav" id="mainNav" aria-label="Primary site navigation">
    <div class="container nav-container">
      <ul class="nav-links" id="primaryNavLinks" role="menubar">
        \${SLRTCE_NAV_MENU.map((item, idx) => {
          const hasC = item.children && item.children.length > 0 && item.hasNavDropdown !== false;
          const nk = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (hasC) {
            return \`
              <li class="has-dropdown" role="none" data-nav="\${nk}">
                <button type="button" class="nav-item nav-toggle-btn" id="navBtn_\${idx}" aria-expanded="false" aria-haspopup="true" role="menuitem">
                  <span>\${item.title}</span>
                  <span class="caret-down" aria-hidden="true"></span>
                </button>
                \${renderNavChildren(item.children, false)}
              </li>
            \`;
          }
          return \`
            <li class="simple-nav-link" role="none" data-nav="\${nk}">
              <a href="\${item.url || '#/home'}" class="nav-item" role="menuitem" onclick="navigate('\${item.url || '#/home'}');event.preventDefault()">
                <span>\${item.title}</span>
              </a>
            </li>
          \`;
        }).join('')}
      </ul>
      <div class="nav-cta-wrapper">
        <a href="#/home?scroll=enquiry-section" class="btn-nav-apply" onclick="navigate('#/home?scroll=enquiry-section');event.preventDefault()">
          Apply Now
        </a>
      </div>
    </div>
  </nav>
  \`;
}

function getFooterMarkup() {
  return \`
  <footer class="site-footer" id="contact">
    <div class="container footer-main-grid">
      <div class="footer-col brand-col">
        <div class="footer-logo">
          <img src="assets/slrtce_logo_crest.jpg" alt="SLRTCE Crest Logo" class="footer-crest-img">
          <div class="footer-brand-titles">
            <h3 class="footer-institute-name">Shree L. R. Tiwari College of Engineering</h3>
            <span class="footer-tagline">Autonomous Institute &bull; University of Mumbai</span>
          </div>
        </div>
        <p class="footer-brand-desc">Approved by AICTE, New Delhi &amp; DTE Maharashtra. Accredited by NAAC with 'A' Grade &amp; NBA for eligible programmes. ISO 9001:2015 Certified.</p>
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
      <div class="footer-col">
        <h4 class="footer-heading">Information for</h4>
        <ul class="footer-links">
          <li><a href="#" onclick="openModal('alumni-modal');return false;">Alumni Network</a></li>
          <li><a href="#/fee-structure" onclick="navigate('#/fee-structure');return false;">Fee Structure AY 2026-27</a></li>
          <li><a href="#/scholarship" onclick="navigate('#/scholarship');return false;">Scholarships &amp; Freeships</a></li>
          <li><a href="#" onclick="openModal('career-modal');return false;">Careers &amp; Opportunities</a></li>
          <li><a href="#/gallery" onclick="navigate('#/gallery');return false;">Campus Gallery</a></li>
        </ul>
      </div>
      <div class="footer-col contact-col">
        <h4 class="footer-heading">Contact Us</h4>
        <address class="footer-address">
          <p>
            <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Kanakia Park, Mira Road (East), Mira Bhayandar, Thane &ndash; 401107</span>
          </p>
          <p>
            <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>+91 (022) 2812 0144 / 45 / 43</span>
          </p>
          <p>
            <svg class="footer-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span><a href="mailto:info@slrtce.in">info@slrtce.in</a> / <a href="mailto:slrtce@rahuleducation.com">slrtce@rahuleducation.com</a></span>
          </p>
          <div class="footer-enquiry-row">
            <a href="#/contact" onclick="navigate('#/contact');return false;" class="footer-enquiry-btn">
              Send Admission Enquiry &rarr;
            </a>
          </div>
        </address>
      </div>
      <div class="footer-col">
        <h4 class="footer-heading">Portals &amp; Compliance</h4>
        <ul class="footer-links">
          <li><a href="#" onclick="openModal('iqac-modal');return false;">Internal Quality Assurance (IQAC)</a></li>
          <li><a href="#/mandatory-disclosure" onclick="navigate('#/mandatory-disclosure');return false;">Mandatory Disclosure</a></li>
          <li><a href="#" onclick="openModal('login-modal');return false;">Student &amp; Faculty ERP Login</a></li>
          <li><a href="#/student-clubs" onclick="navigate('#/student-clubs');return false;">Technical Clubs (SWDC)</a></li>
          <li><a href="#/student-chapters" onclick="navigate('#/student-chapters');return false;">Professional Chapters</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <div class="footer-bottom-copy">
          <p>&copy; 2026 Shree L. R. Tiwari College of Engineering (SLRTCE). All rights reserved.</p>
          <p class="footer-subtext">Autonomous Institute Affiliated to University of Mumbai &bull; Approved by AICTE &amp; DTE (Code: EN3218)</p>
        </div>
        <div class="footer-bottom-links">
          <a href="#/home" onclick="navigate('#/home');return false;">Home</a>
          <span class="sep">&bull;</span>
          <a href="#/admission-process" onclick="navigate('#/admission-process');return false;">Admissions</a>
          <span class="sep">&bull;</span>
          <a href="#/contact" onclick="navigate('#/contact');return false;">Contact</a>
        </div>
      </div>
    </div>
  </footer>
  \`;
}

function renderSectionSidebar(section, activePage, containerId) {
  // Redundant sidebar disabled to allow full page layout
  const el = document.getElementById(containerId);
  if (el) el.style.display = 'none';
}
`;

// 4. Interactive behaviors & helpers
const navBehaviorsAndHelpers = `
function initNavigationBehaviors() {
  const mainNav = document.getElementById('mainNav');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const allDropdowns = document.querySelectorAll('.has-dropdown');
  const allFlyouts = document.querySelectorAll('.has-flyout');

  function closeAllDropdowns(except = null) {
    allDropdowns.forEach(item => {
      if (item !== except) {
        item.classList.remove('dropdown-open');
        const btn = item.querySelector('.nav-toggle-btn, .top-toggle-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function closeAllFlyouts(except = null) {
    allFlyouts.forEach(flyout => {
      if (flyout !== except) {
        flyout.classList.remove('flyout-open');
        const trigger = flyout.querySelector('.has-flyout-toggle');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function adjustFlyoutPosition(flyoutEl) {
    if (!flyoutEl || window.innerWidth <= 900) return;
    const menu = flyoutEl.querySelector('.nav-flyout');
    if (!menu) return;
    menu.classList.remove('flip-left');
    const rect = menu.getBoundingClientRect();
    if (rect.right > (window.innerWidth - 10)) {
      menu.classList.add('flip-left');
    }
  }

  allDropdowns.forEach(item => {
    const toggleBtn = item.querySelector('.nav-toggle-btn, .top-toggle-btn');
    const dropdownMenu = item.querySelector('.nav-dropdown');
    if (!toggleBtn || !dropdownMenu) return;

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
  });

  allFlyouts.forEach(flyout => {
    const trigger = flyout.querySelector('.has-flyout-toggle');
    const flyoutMenu = flyout.querySelector('.nav-flyout');
    if (!trigger || !flyoutMenu) return;

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

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 900 || !trigger.getAttribute('href') || trigger.getAttribute('href') === '#') {
        e.preventDefault();
        const isOpen = flyout.classList.toggle('flyout-open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) adjustFlyoutPosition(flyout);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown') && !e.target.closest('.has-flyout')) {
      closeAllDropdowns();
      closeAllFlyouts();
    }
  });

  if (mobileBtn && mainNav) {
    mobileBtn.onclick = (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };
  }
}

function updateActiveNav() {
  const currentHash = window.location.hash || '#/home';
  document.querySelectorAll('#primaryNavLinks > li').forEach(li => {
    const link = li.querySelector('a');
    if (link && link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    } else if (link) {
      link.classList.remove('active');
    }
  });
}

function injectWhatsAppButton() {
  if (document.getElementById('whatsappFloatingBtn')) return;
  const btn = document.createElement('a');
  btn.id = 'whatsappFloatingBtn';
  btn.className = 'whatsapp-floating-btn';
  btn.setAttribute('aria-label', 'Chat on WhatsApp with SLRTCE Admissions');
  btn.setAttribute('target', '_blank');
  btn.setAttribute('rel', 'noopener noreferrer');
  btn.href = 'https://wa.me/912228120144?text=' + encodeURIComponent('Hello SLRTCE, I would like admission details.');
  btn.innerHTML = '<span class="whatsapp-btn-text">WhatsApp</span>';
  document.body.appendChild(btn);
}

function handleSearch(e) {
  e.preventDefault();
  const q = document.getElementById('spaSearchInput').value.trim().toLowerCase();
  if (!q) return;
  for (const key of Object.keys(PAGES)) {
    if (key.includes(q)) {
      navigate('#/' + key);
      return;
    }
  }
  navigate('#/placeholder?title=' + encodeURIComponent(q) + '&section=Search+Result');
}

function switchTab(e, id) {
  const article = e.target.closest('article') || document;
  article.querySelectorAll('.dept-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  article.querySelectorAll('.dept-tab-panel').forEach(p => p.classList.remove('active'));
  e.target.classList.add('active');
  e.target.setAttribute('aria-selected', 'true');
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

function toggleAcc(trigger) {
  const body = trigger.nextElementSibling;
  const isOpen = trigger.getAttribute('aria-expanded') === 'true';
  trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  if (body) body.classList.toggle('open', !isOpen);
}

function switchYearTab(panelId, btn) {
  document.querySelectorAll('.year-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  const target = document.getElementById('panel_' + panelId);
  if (target) target.style.display = 'block';
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
}

function filterGallery(category, btn) {
  const items = document.querySelectorAll('.gallery-item');
  const btns = document.querySelectorAll('.gallery-filter-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  items.forEach(item => {
    const cat = item.getAttribute('data-category');
    if (category === 'all' || cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

function openLightbox(src, caption) {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (overlay && img) {
    img.src = src;
    if (cap) cap.textContent = caption || '';
    overlay.classList.add('open');
  }
}

function closeLightbox() {
  const overlay = document.getElementById('lightboxOverlay');
  if (overlay) overlay.classList.remove('open');
}

function lightboxNav(dir) {
  const visible = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"]) img'));
  if (!visible.length) return;
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  if (!img) return;
  let idx = visible.findIndex(i => i.src === img.src);
  if (idx === -1) idx = 0;
  idx = (idx + dir + visible.length) % visible.length;
  const next = visible[idx];
  if (next) openLightbox(next.src, next.alt);
}
`;

// 5. Hash Router & Life-cycle Orchestration
const routerCode = `
function navigate(url) {
  if (!url) return;
  if (url.startsWith('#')) {
    window.location.hash = url;
  } else {
    window.location.hash = '#/' + url.replace(/^\\//, '').replace(/\\.html$/, '');
  }
  const mainNav = document.getElementById('mainNav');
  if (mainNav) mainNav.classList.remove('open');
}

function handleRoute() {
  let hash = window.location.hash || '#/home';
  if (hash === '#' || hash === '#/' || hash === '#/index') hash = '#/home';

  const raw = hash.replace(/^#\\/?/, '');
  const [pageKey, queryString] = raw.split('?');
  const route = pageKey || 'home';

  const pageView = document.getElementById('page-view');
  if (!pageView) return;

  pageView.classList.remove('spa-fade-in');
  void pageView.offsetWidth;
  pageView.classList.add('spa-fade-in');

  if (PAGES[route]) {
    pageView.innerHTML = PAGES[route](queryString || '');
  } else if (PAGES['placeholder']) {
    pageView.innerHTML = PAGES['placeholder'](\`title=\${encodeURIComponent(route)}&section=General\`);
  } else {
    pageView.innerHTML = PAGES['home']();
  }

  if (PAGE_METADATA[route] && PAGE_METADATA[route].title) {
    document.title = PAGE_METADATA[route].title + ' | Shree L. R. Tiwari College of Engineering';
  } else {
    document.title = 'Shree L. R. Tiwari College of Engineering (SLRTCE) | Autonomous Institute';
  }

  if (queryString) {
    const params = new URLSearchParams(queryString);
    const scrollTarget = params.get('scroll');
    if (scrollTarget) {
      setTimeout(() => {
        const targetEl = document.getElementById(scrollTarget);
        if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.scrollTo(0, 0);
    }
  } else {
    window.scrollTo(0, 0);
  }

  if (route === 'home') {
    if (typeof initStatsCounter === 'function') initStatsCounter();
    if (typeof initTicker === 'function') initTicker();
    if (typeof initCarousel === 'function') initCarousel();
  }

  if (PAGE_METADATA[route] && PAGE_METADATA[route].section) {
    if (typeof renderSectionSidebar === 'function') {
      const activeTitle = PAGE_METADATA[route].sidebarTitle || PAGE_METADATA[route].title;
      renderSectionSidebar(PAGE_METADATA[route].section, activeTitle, 'sectionSidebar');
    }
  }

  if (typeof updateActiveNav === 'function') {
    updateActiveNav();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('spa-header');
  if (headerEl) headerEl.innerHTML = getHeaderMarkup();

  const footerEl = document.getElementById('spa-footer');
  if (footerEl) footerEl.innerHTML = getFooterMarkup();

  initNavigationBehaviors();
  injectWhatsAppButton();
  handleRoute();
});

window.addEventListener('hashchange', handleRoute);
`;

// Assemble HTML shell
const spaHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shree L. R. Tiwari College of Engineering (SLRTCE) | Autonomous Institute</title>
  <meta name="description" content="SLRTCE - Autonomous Institute, University of Mumbai, AICTE approved, NAAC &amp; NBA Accredited. Mira Road, Mumbai.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <style>
${stylesCss}

  /* ── SPA Shell Overrides & Enhancements ── */
  #page-view { min-height: 60vh; }
  .page-loading { display:flex; align-items:center; justify-content:center; padding:4rem; color:var(--text-muted); font-size:.9rem; }
  .inner-page-banner{background:var(--color-maroon);color:#fff;padding:2.5rem 0}
  .inner-banner-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}
  @media(max-width:768px){.inner-banner-grid{grid-template-columns:1fr}}
  .inner-breadcrumbs{font-size:.78rem;margin-bottom:.75rem;opacity:.75}
  .inner-breadcrumbs a{color:#fff;text-decoration:none}
  .inner-breadcrumbs span{opacity:.85}
  .inner-banner-title{font-size:clamp(1.4rem,3vw,2rem);font-weight:800;margin:0 0 .6rem;color:#fff}
  .inner-banner-desc{font-size:.9rem;line-height:1.65;opacity:.88;margin:0;color:#fff}
  .inner-banner-photo-wrap{display:flex;justify-content:flex-end}
  .inner-banner-photo{width:100%;max-width:420px;height:220px;object-fit:cover;display:block}
  @media(max-width:768px){.inner-banner-photo-wrap{display:none}}
  .inner-layout-container{display:block !important; width:100% !important; max-width:1340px !important; margin:0 auto !important; padding:2.5rem 1.5rem 3.5rem !important;}
  .inner-sidebar-col, .inner-sidebar, #sectionSidebar{display:none !important;}
  .inner-main-content{width:100% !important; min-width:0;}
  .inner-main-content h2{font-size:1.15rem;font-weight:800;color:var(--color-maroon);margin:1.5rem 0 .75rem;padding-bottom:.4rem;border-bottom:2px solid var(--color-maroon)}
  .inner-main-content h2:first-child{margin-top:0}
  .inner-main-content h3{font-size:1rem;font-weight:700;color:var(--text-main);margin:1.1rem 0 .5rem}
  .inner-main-content p{font-size:.9rem;line-height:1.75;color:var(--text-main);margin-bottom:.85rem}
  .inner-main-content ul{margin:.5rem 0 1rem 1.5rem;line-height:2}
  .inner-info-box{background:var(--bg-card);border:1px solid var(--color-gold);border-left:4px solid var(--color-gold);padding:1rem 1.25rem;margin-bottom:1.5rem;font-size:.875rem;line-height:1.65}
  .inner-table{width:100%;border-collapse:collapse;font-size:.875rem;margin-bottom:1.5rem}
  .inner-table th,.inner-table td{padding:.7rem .9rem;border:1px solid var(--border-color);vertical-align:top;text-align:left}
  .inner-table th{background:var(--color-maroon);color:#fff;font-weight:700;font-size:.8rem}
  .inner-table tbody tr:nth-child(even){background:var(--bg-card)}
  .inner-table tbody tr:hover{background:var(--border-color-light)}
  .footer-crest-img{width:52px;height:52px;border-radius:50%;object-fit:cover;background:#fff;border:2px solid var(--color-gold);padding:2px;flex-shrink:0}
  .footer-brand-titles{display:flex;flex-direction:column;gap:2px}
  .footer-social-links a svg{width:18px;height:18px;display:block}
  .footer-icon{width:16px;height:16px;margin-top:0.25rem;flex-shrink:0;color:var(--color-gold)}
  .dept-tabs{display:flex;gap:0;border-bottom:2px solid var(--color-maroon);margin-bottom:1.5rem;flex-wrap:wrap}
  .dept-tab-btn{padding:.55rem 1.1rem;border:none;background:transparent;font-family:var(--font-main);font-size:.83rem;font-weight:600;color:var(--text-muted);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:color .15s,border-color .15s}
  .dept-tab-btn:hover{color:var(--color-maroon)}
  .dept-tab-btn.active{color:var(--color-maroon);border-bottom-color:var(--color-maroon)}
  .dept-tab-panel{display:none}
  .dept-tab-panel.active{display:block}
  .accordion{border:1px solid var(--border-color);margin-bottom:.55rem}
  .accordion-trigger{width:100%;display:flex;justify-content:space-between;align-items:center;padding:.8rem 1rem;background:var(--bg-card);border:none;cursor:pointer;font-family:var(--font-main);font-size:.875rem;font-weight:700;color:var(--text-main);text-align:left}
  .accordion-trigger:hover{background:var(--border-color-light)}
  .acc-icon{font-size:1rem;color:var(--color-maroon);transition:transform .2s;flex-shrink:0}
  .accordion-trigger[aria-expanded="true"] .acc-icon{transform:rotate(45deg)}
  .accordion-body{display:none;padding:0 1rem 1rem;background:var(--bg-main)}
  .accordion-body.open{display:block}
  .dept-stats-strip{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem}
  .dept-stat-chip{padding:.25rem .75rem;border:1px solid var(--color-maroon);font-size:.75rem;font-weight:700;color:var(--color-maroon)}
  .hod-card{display:flex;gap:1rem;align-items:flex-start;padding:1.1rem;border:1px solid var(--border-color);background:var(--bg-card);margin-bottom:1rem}
  .hod-avatar{width:48px;height:48px;background:var(--color-maroon);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1rem;font-weight:800;flex-shrink:0}
  .hod-name{margin:0 0 .1rem;color:var(--color-maroon);font-size:.95rem;font-weight:700}
  .hod-role{margin:0 0 .5rem;font-size:.78rem;color:var(--text-muted)}
  .hod-quote{margin:0;font-size:.85rem;line-height:1.65;color:var(--text-main);font-style:italic}
  .contact-layout{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:2rem}
  @media(max-width:768px){.contact-layout{grid-template-columns:1fr}}
  .contact-form-card{border:1px solid var(--border-color);padding:1.5rem;background:var(--bg-card)}
  .contact-form-card h3{margin:0 0 1.1rem;color:var(--color-maroon);font-size:1rem}
  .contact-form-card .form-group{margin-bottom:.85rem}
  .contact-form-card label{display:block;font-size:.82rem;font-weight:600;margin-bottom:.3rem;color:var(--text-main)}
  .contact-form-card input,.contact-form-card textarea,.contact-form-card select{width:100%;padding:.6rem .8rem;border:1px solid var(--border-color);background:var(--bg-main);color:var(--text-main);font-family:var(--font-main);font-size:.875rem;outline:none}
  .contact-form-card input:focus,.contact-form-card textarea:focus{border-color:var(--color-maroon)}
  .contact-form-card textarea{resize:vertical;min-height:110px}
  .contact-info-box{border:1px solid var(--border-color);padding:1.25rem;background:var(--bg-card);margin-bottom:1rem}
  .contact-info-box h4{margin:0 0 .65rem;color:var(--color-maroon);font-size:.9rem}
  .contact-info-box p{margin:0 0 .35rem;font-size:.84rem;color:var(--text-main);line-height:1.55}
  .contact-info-box a{color:var(--color-maroon)}
  .map-embed{width:100%;border:1px solid var(--border-color);display:block}
  .gallery-filter-bar{display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.5rem}
  .gallery-filter-btn{padding:.4rem .9rem;border:1px solid var(--color-maroon);background:transparent;color:var(--color-maroon);font-family:var(--font-main);font-size:.82rem;font-weight:600;cursor:pointer;transition:background .15s,color .15s}
  .gallery-filter-btn.active,.gallery-filter-btn:hover{background:var(--color-maroon);color:#fff}
  .gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.85rem;margin-bottom:1.5rem}
  @media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:480px){.gallery-grid{grid-template-columns:1fr}}
  .gallery-item{position:relative;overflow:hidden;border:1px solid var(--border-color);cursor:pointer;aspect-ratio:4/3}
  .gallery-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}
  .gallery-item:hover img{transform:scale(1.05)}
  .gallery-item-caption{position:absolute;bottom:0;left:0;right:0;background:rgba(143,10,11,.88);color:#fff;font-size:.77rem;font-weight:600;padding:.45rem .65rem;transform:translateY(100%);transition:transform .25s}
  .gallery-item:hover .gallery-item-caption{transform:translateY(0)}
  .lightbox-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9999;align-items:center;justify-content:center;padding:1rem}
  .lightbox-overlay.open{display:flex}
  .lightbox-inner{position:relative;max-width:860px;width:100%}
  .lightbox-inner img{width:100%;max-height:78vh;object-fit:contain;display:block}
  .lightbox-caption{color:#fff;text-align:center;padding:.65rem 0 0;font-size:.875rem}
  .lightbox-close{position:absolute;top:-2rem;right:0;background:none;border:none;color:#fff;font-size:1.6rem;cursor:pointer;line-height:1}
  .lightbox-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(143,10,11,.8);border:none;color:#fff;font-size:1.4rem;padding:.4rem .8rem;cursor:pointer}
  .lightbox-nav.prev{left:-3rem}
  .lightbox-nav.next{right:-3rem}
  @media(max-width:768px){.lightbox-nav.prev{left:0}.lightbox-nav.next{right:0}}
  .chain-badge{display:inline-block;background:var(--color-maroon);color:#fff;font-size:.7rem;font-weight:700;padding:.18rem .55rem;margin-bottom:.85rem;letter-spacing:.04em}
  .verify-center{display:flex;justify-content:center;padding:1rem 0 1.5rem}
  .verify-card{width:100%;max-width:480px;border:1px solid var(--border-color);padding:1.75rem;background:var(--bg-card)}
  .verify-card h2{margin:0 0 .3rem;color:var(--color-maroon);font-size:1.1rem}
  .verify-card p{font-size:.85rem;color:var(--text-muted);margin:0 0 1.25rem}
  .notice-list{list-style:none;padding:0;margin:0 0 1.5rem}
  .notice-item{display:flex;gap:.85rem;align-items:flex-start;padding:.9rem 1rem;border:1px solid var(--border-color);margin-bottom:.45rem;background:var(--bg-card)}
  .notice-date{min-width:62px;text-align:center;background:var(--color-maroon);color:#fff;padding:.3rem .4rem;font-size:.72rem;font-weight:700;line-height:1.3;flex-shrink:0}
  .notice-body h4{margin:0 0 .18rem;font-size:.875rem;color:var(--text-main)}
  .notice-body p{margin:0;font-size:.78rem;color:var(--text-muted)}
  .notice-tag{display:inline-block;font-size:.68rem;font-weight:700;padding:.08rem .4rem;background:var(--color-gold);color:#240408;margin-left:.4rem;vertical-align:middle}
  .clubs-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;margin-bottom:2rem}
  @media(max-width:768px){.clubs-grid{grid-template-columns:1fr}}
  .club-card{border:1px solid var(--border-color);padding:1.25rem;background:var(--bg-card);display:flex;flex-direction:column;border-radius:4px;scroll-margin-top:100px;transition:box-shadow .2s,border-color .2s}
  .club-card:hover{border-color:var(--color-maroon);box-shadow:0 4px 12px rgba(143,10,11,0.08)}
  .club-card-header{display:flex;gap:.85rem;align-items:center;margin-bottom:.75rem}
  .club-badge{width:46px;height:46px;flex-shrink:0;background:var(--color-maroon);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.76rem;text-align:center;line-height:1.2;border-radius:3px}
  .club-badge.badge-gokart{background:#1e293b;color:var(--color-gold)}
  .club-name{font-weight:700;font-size:.95rem;color:var(--color-maroon);margin:0 0 .12rem}
  .club-type{font-size:.75rem;color:var(--text-muted);font-weight:600}
  .club-desc{font-size:.85rem;line-height:1.65;color:var(--text-main);margin:0 0 .85rem}
  .club-team-box{background:var(--bg-main,#fafafa);border:1px solid var(--border-color,#e2e8f0);padding:.85rem 1rem;border-radius:4px;margin-top:auto}
  .club-team-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:.65rem;border-bottom:1px solid var(--border-color,#e2e8f0);padding-bottom:.4rem}
  .club-team-title{font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--color-maroon);margin:0}
  .club-team-ay{font-size:.7rem;font-weight:700;color:var(--text-muted);background:var(--border-color-light,#edf2f7);padding:.12rem .4rem;border-radius:2px}
  .club-members-row{display:flex;flex-direction:column;gap:.45rem}
  .club-lead-group{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center}
  .club-lead-chip{display:inline-flex;align-items:center;gap:.35rem;background:#fff;border:1px solid #fed7aa;padding:.22rem .55rem;border-radius:3px;font-size:.78rem;color:#1e293b}
  .club-lead-chip.lead{border-color:#fecaca}
  .club-role-badge{font-size:.67rem;font-weight:800;text-transform:uppercase;padding:.08rem .35rem;border-radius:2px;letter-spacing:.03em}
  .club-role-badge.head{background:#fef3c7;color:#92400e}
  .club-role-badge.lead{background:#fee2e2;color:#991b1b}
  .club-role-badge.officer{background:#e0e7ff;color:#3730a3}
  .club-dept-badge{font-size:.72rem;color:#64748b;font-weight:600}
  .club-members-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.35rem}
  .club-member-tag{display:inline-flex;align-items:center;gap:.3rem;background:#fff;border:1px solid var(--border-color);padding:.18rem .5rem;border-radius:3px;font-size:.76rem;color:#334155}
  .gokart-table{width:100%;border-collapse:collapse;font-size:.78rem;margin-top:.4rem;background:#fff}
  .gokart-table th,.gokart-table td{padding:.35rem .6rem;border:1px solid var(--border-color);text-align:left}
  .gokart-table th{background:var(--color-maroon);color:#fff;font-weight:700;font-size:.72rem}
  .gokart-table tr:nth-child(even){background:#f8fafc}
  .gokart-section-head{font-weight:700;font-size:.78rem;color:var(--color-maroon);margin:.75rem 0 .25rem;text-transform:uppercase;letter-spacing:.03em;display:flex;align-items:center;gap:.4rem}
  .topper-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.85rem;margin-bottom:1.5rem}
  @media(max-width:768px){.topper-grid{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:480px){.topper-grid{grid-template-columns:1fr}}
  .topper-card{border:1px solid var(--border-color);padding:1rem;text-align:center;background:var(--bg-card)}
  .topper-rank{display:inline-block;background:var(--color-maroon);color:#fff;font-weight:800;font-size:.72rem;padding:.18rem .55rem;margin-bottom:.5rem}
  .topper-name{font-weight:700;font-size:.9rem;color:var(--text-main);margin:0 0 .18rem}
  .topper-branch{font-size:.77rem;color:var(--text-muted);margin:0 0 .13rem}
  .topper-cgpa{font-size:.82rem;font-weight:700;color:var(--color-maroon);margin:0}
  .steps-list{list-style:none;padding:0;margin:0 0 1.5rem}
  .steps-list li{display:flex;gap:1rem;align-items:flex-start;padding:.95rem 1rem;border:1px solid var(--border-color);margin-bottom:.45rem;background:var(--bg-card)}
  .step-num{min-width:2rem;height:2rem;background:var(--color-maroon);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.875rem;flex-shrink:0}
  .step-body h4{margin:0 0 .18rem;font-size:.875rem;color:var(--color-maroon)}
  .step-body p{margin:0;font-size:.82rem;line-height:1.55;color:var(--text-muted)}
  .success-msg{display:none;background:#f0fff4;border:1px solid #38a169;color:#276749;padding:.75rem 1rem;font-size:.84rem;margin-top:.65rem}
  .error-msg{display:none;color:#c0392b;font-size:.84rem;margin-top:.4rem;padding:.45rem .7rem;border:1px solid #e74c3c;background:#fef9f9}
  .spa-fade-in{animation:spaFade .18s ease}
  @keyframes spaFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  </style>
</head>
<body>
  <div id="spa-header"></div>
  <div id="page-view"></div>
  <div id="spa-footer"></div>

  <!-- MODAL -->
  <div class="modal-backdrop" id="modalBackdrop" onclick="closeAllModals(event)">
    <div class="modal-container" id="modalContainer" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h3 id="modalTitle">Modal Header</h3>
        <button class="modal-close-btn" onclick="closeAllModals()">&times;</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
      <div class="modal-footer"><button class="btn btn-outline" onclick="closeAllModals()">Close</button></div>
    </div>
  </div>

  <!-- LIGHTBOX -->
  <div class="lightbox-overlay" id="lightboxOverlay" role="dialog" aria-modal="true">
    <div class="lightbox-inner">
      <button class="lightbox-close" onclick="closeLightbox()" aria-label="Close">&times;</button>
      <button class="lightbox-nav prev" onclick="lightboxNav(-1)" aria-label="Previous">&#8249;</button>
      <img id="lightboxImg" src="" alt="">
      <p class="lightbox-caption" id="lightboxCaption"></p>
      <button class="lightbox-nav next" onclick="lightboxNav(1)" aria-label="Next">&#8250;</button>
    </div>
  </div>

  <script src="config.js"></script>
  <script>
${navDataScript}

${appJs}

const PAGE_METADATA = ${JSON.stringify(pageMeta, null, 2)};
const PAGES = {};

${pageTemplates.join('\n\n')}

${navBehaviorsAndHelpers}

${routerCode}
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'index.html'), spaHtml, 'utf-8');
console.log(`Successfully generated updated SPA index.html with ${Object.keys(pageMeta).length} pages!`);
