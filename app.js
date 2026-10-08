/**
 * SHREE L. R. TIWARI COLLEGE OF ENGINEERING (SLRTCE)
 * Layout Upgrade Demo Scripts
 * THEME: Strictly Maroon, Yellow, and White
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initStatsCounter();
  initTicker();
  initCarousel();
});

/* Mobile Menu Toggle */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (mainNav.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }
}

/* Branch / Programme Filtering */
function filterBranch(type, btnElement) {
  const cards = document.querySelectorAll('.programme-card');
  const tabs = document.querySelectorAll('.programme-filter-tabs .tab-btn');

  if (btnElement) {
    tabs.forEach(tab => tab.classList.remove('active'));
    btnElement.classList.add('active');
  }

  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (type === 'all' || category === type) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
}

/* News & Events Filtering */
function filterNews(type, chipElement) {
  const newsCards = document.querySelectorAll('.news-card');
  const chips = document.querySelectorAll('.news-chip');

  if (chipElement) {
    chips.forEach(c => c.classList.remove('active'));
    chipElement.classList.add('active');
  }

  newsCards.forEach(card => {
    const newsType = card.getAttribute('data-newstype');
    if (type === 'all' || newsType === type) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* Enquiry Form Handler */
function handleEnquirySubmit(event) {
  event.preventDefault();
  const form = document.getElementById('enquiryForm');
  const notice = document.getElementById('enquirySuccessNotice');

  if (notice) {
    notice.style.display = 'flex';
    form.reset();

    setTimeout(() => {
      notice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

/* Modal Management */
const modalContentMap = {
  'mandatory-disclosure': {
    title: 'Mandatory Disclosure (AICTE & DTE Regulation)',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p><strong>Institute Name:</strong> Shree L. R. Tiwari College of Engineering (SLRTCE)</p>
        <p><strong>DTE Code:</strong> EN3218 | <strong>AICTE File No:</strong> Western/1-7002891</p>
        <p><strong>Status:</strong> Autonomous Institute under University of Mumbai</p>
        <hr style="margin: 1rem 0; border: 0; border-top: 1px solid #ecdcd7;">
        <p>This disclosure is published in accordance with AICTE regulations for transparency in governance, faculty profile, infrastructure details, fee approvals, and academic facilities.</p>
        <ul style="margin: 1rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Governing Body & Academic Council Minutes</li>
          <li>Grievance Redressal Mechanism & Anti-Ragging Committee</li>
          <li>Faculty cadre ratio, qualification & experience verified by DTE</li>
          <li>Audited Financial Statements & Infrastructure Compliance</li>
        </ul>
        <p style="color: #7d424b; font-size: 0.85rem;">[Demo View: Full PDF annexure is accessible through the institute registrar office.]</p>
      </div>
    `
  },
  'iqac-modal': {
    title: 'Internal Quality Assurance Cell (IQAC)',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>The <strong>Internal Quality Assurance Cell (IQAC)</strong> at SLRTCE ensures continuous enhancement of academic and administrative performance.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: #4e0712;">Key Objectives:</h4>
        <ul style="margin-left: 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Institutionalize quality practices in teaching-learning and research</li>
          <li>Facilitate learner-centric environment conducive for quality education</li>
          <li>Feedback collection, analysis, and execution from students, parents, and alumni</li>
          <li>NAAC & NBA continuous accreditation compliance</li>
        </ul>
      </div>
    `
  },
  'vision-modal': {
    title: 'Vision & Mission of the Institute',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <h4 style="color: #700c1b; margin-bottom: 0.5rem;"><i class="fa-solid fa-eye"></i> Vision</h4>
        <p style="background: #fffbeb; padding: 1rem; border-radius: 8px; border-left: 4px solid #700c1b; margin-bottom: 1rem;">
          To become a globally recognized centre of excellence in engineering education and research, fostering ethical leaders and innovative entrepreneurs for sustainable nation building.
        </p>
        <h4 style="color: #700c1b; margin-bottom: 0.5rem;"><i class="fa-solid fa-bullseye"></i> Mission</h4>
        <ul style="margin-left: 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Impart rigorous autonomous outcome-based technical education.</li>
          <li>Foster strong industry-institute collaborations for hands-on experiential learning.</li>
          <li>Nurture research, intellectual property generation, and entrepreneurship.</li>
          <li>Inculcate ethical values, lifelong learning, and social responsibility.</li>
        </ul>
      </div>
    `
  },
  'leadership-modal': {
    title: 'Leadership & Rahul Education Trust',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Shree L. R. Tiwari College of Engineering operates under the aegis of <strong>Rahul Education</strong>, a pioneer education conglomerate managing 50+ prestigious institutions since 1992.</p>
        <div style="margin-top: 1rem; background: #fffbeb; padding: 1rem; border-radius: 8px; border: 1px solid #fef08a;">
          <h4 style="color: #4e0712; margin-bottom: 0.35rem;">Shri Ramdhar J. Tiwari</h4>
          <span style="color: #700c1b; font-weight: 700; font-size: 0.85rem;">Founder Chairman, Rahul Education</span>
          <p style="font-size: 0.85rem; color: #5c2830; margin-top: 0.5rem;">"Empowering young minds with accessible, world-class technical education rooted in values and innovation."</p>
        </div>
      </div>
    `
  },
  'governing-modal': {
    title: 'Governing Body & Academic Council',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>The autonomous governance of SLRTCE is steered by eminent academicians from IIT Bombay, University of Mumbai, DTE Maharashtra nominees, and senior industry CXOs.</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Autonomous Syllabus Formulation & Board of Studies (BOS)</li>
          <li>Academic Advisory Board with IEEE / CSI Fellows</li>
          <li>Finance Committee & Strategic Planning Council</li>
        </ul>
      </div>
    `
  },
  'clubs-modal': {
    title: 'Student Technical Chapters & Clubs',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>SLRTCE has a thriving student club ecosystem encouraging leadership and project hackathons:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem;">
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">IEEE Student Branch</strong><br><small style="color: #5c2830;">Global tech papers & conferences</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">CSI & ACM Chapter</strong><br><small style="color: #5c2830;">Hackathons & competitive coding</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">Robotics & IOT Club</strong><br><small style="color: #5c2830;">Autonomous drones & bots</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">ELC (Electoral Club)</strong><br><small style="color: #5c2830;">Social awareness & civic drives</small>
          </div>
        </div>
      </div>
    `
  },
  'fests-modal': {
    title: 'Cultural & Technical Fests (Utsav & TechFest)',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Annual flagship campus celebrations bringing together over 5,000+ students across Mumbai:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li><strong>Utsav:</strong> Grand inter-college cultural fest with dance, drama, and music concerts.</li>
          <li><strong>Tantra / TechNova:</strong> National level project competitions, hackathons, and esports.</li>
        </ul>
      </div>
    `
  },
  'sports-modal': {
    title: 'Sports & Student Gymkhana',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>State-of-the-art sports facilities promoting fitness, team spirit, and university tournament representations:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Full-size Football & Cricket ground</li>
          <li>Indoor Badminton, Table Tennis, and Chess arena</li>
          <li>Modern Fitness Gymnasium with professional trainers</li>
        </ul>
      </div>
    `
  },
  'library-modal': {
    title: 'Central Digital Library & Research Repository',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>An expansive knowledge repository spanning 35,000+ volumes, IEEE Xplore, ScienceDirect, DELNET, and NPTEL video archives.</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Air-conditioned 200+ seating capacity reading halls</li>
          <li>E-Journal digital kiosk with 24/7 remote proxy access</li>
          <li>Plagiarism detection tools & research paper indexing</li>
        </ul>
      </div>
    `
  },
  'cdc-overview-modal': {
    title: 'Career Development Cell (CDC) Overview',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>The Career Development Cell (CDC) at SLRTCE provides holistic end-to-end training starting from 1st year to ensure 100% placement readiness.</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Semester-wise progressive career roadmap</li>
          <li>Dedicated corporate relations & alumni mentorship wing</li>
          <li>Industry readiness assessments and psychometric tests</li>
        </ul>
      </div>
    `
  },
  'training-modal': {
    title: 'Aptitude & Soft Skills Training Modules',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Comprehensive structured grooming conducted by certified corporate trainers:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Quantitative Aptitude, Logical Reasoning, and Data Interpretation</li>
          <li>Group Discussion (GD) & Personal Interview (PI) simulations</li>
          <li>Resume building, GitHub portfolio, and LinkedIn optimization</li>
        </ul>
      </div>
    `
  },
  'cert-modal': {
    title: 'Technical Certifications & Industry Modules',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Embedded industry-certified micro-credentials integrated into the autonomous curriculum:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>AWS Cloud Practitioner & Solution Architect</li>
          <li>Oracle Java / Python & Full Stack MERN Development</li>
          <li>Red Hat Linux & Cisco CCNA Networking</li>
        </ul>
      </div>
    `
  },
  'mou-modal': {
    title: 'Corporate MoUs & Industry Tie-Ups',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Active Memorandums of Understanding (MoUs) providing direct internships and hiring channels:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Hexaware Technologies • TCS Ion • Amazon Web Services Academy</li>
          <li>L&T EduTech • Tech Mahindra Innovation Centre • Capgemini</li>
        </ul>
      </div>
    `
  },
  'internship-modal': {
    title: 'Mandatory Industry Internship Cell',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Under SLRTCE Autonomy, every engineering student undergoes a minimum 6-month industry internship with stipend opportunities.</p>
        <p style="margin-top: 0.5rem; color: #5c2830;">Supported through AICTE Internship Portal, Internshala partnership, and alumni corporate referrals.</p>
      </div>
    `
  },
  'recruiters-modal': {
    title: 'Our Top Recruiters (1000+ Corporate Partners)',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Premier MNCs, core engineering firms, and product startups hiring from SLRTCE:</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 1rem; text-align: center;">
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">Amazon AWS</div>
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">Hexaware</div>
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">TCS</div>
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">Infosys</div>
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">Capgemini</div>
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 0.6rem; border-radius: 6px; font-weight: 700; color: #4e0712;">L&T Infotech</div>
        </div>
      </div>
    `
  },
  'placement-process-modal': {
    title: 'Placement Policy & Selection Process',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>A transparent "One Student One Dream Job" policy with criteria-based placement drives:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Eligibility check & Pre-Placement Talk (PPT)</li>
          <li>Online Coding & Technical Aptitude screening</li>
          <li>Technical Panel & HR rounds with instant offer rollout</li>
        </ul>
      </div>
    `
  },
  'rd-cell-modal': {
    title: 'Research & Innovation Cell (R & D)',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Promoting indigenous engineering solutions, AI/ML research, and technology transfer:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Seed funding for student prototype innovation</li>
          <li>Faculty research publication incentives</li>
          <li>Collaborative research labs with Mumbai University</li>
        </ul>
      </div>
    `
  },
  'publications-modal': {
    title: 'Faculty & Student Research Publications',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Over 500+ Scopus, SCI, and IEEE indexed research papers authored by SLRTCE faculty and students across international conferences.</p>
      </div>
    `
  },
  'patents-modal': {
    title: 'Patents & Intellectual Property Rights (IPR) Cell',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Dedicated support for patent searches, provisional filings, and commercialization under Government of India IPR frameworks.</p>
        <p style="margin-top: 0.5rem; color: #5c2830;">25+ published and granted utility and design patents by faculty and student innovators.</p>
      </div>
    `
  },
  'grants-modal': {
    title: 'Funded Research Projects & Grants',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Research grants secured from AICTE MODROBS, University of Mumbai Minor Research Scheme, and corporate CSR research funds.</p>
      </div>
    `
  },
  'map-modal': {
    title: 'Campus Location & How to Reach',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p><strong>Address:</strong> Shree L. R. Tiwari College of Engineering, Kanakia Park, Mira Road (East), Mira Bhayandar 401107, Maharashtra.</p>
        <p style="margin-top: 0.75rem; color: #5c2830;"><i class="fa-solid fa-train"></i> <strong>Nearest Station:</strong> Mira Road Railway Station (Western Line) — 7 minutes by auto/bus.</p>
        <p style="margin-top: 0.5rem; color: #5c2830;"><i class="fa-solid fa-road"></i> <strong>By Road:</strong> Direct connectivity from Western Express Highway (WEH).</p>
      </div>
    `
  },
  'directory-modal': {
    title: 'Department Contact Directory',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <table style="width: 100%; border-collapse: collapse; margin-top: 0.5rem; font-size: 0.85rem;">
          <tr style="border-bottom: 1px solid #ecdcd7;">
            <td style="padding: 0.5rem; font-weight: 700; color: #4e0712;">Principal Office</td>
            <td style="padding: 0.5rem; color: #700c1b;">principal@slrtce.in</td>
          </tr>
          <tr style="border-bottom: 1px solid #ecdcd7; background: #fffbeb;">
            <td style="padding: 0.5rem; font-weight: 700; color: #4e0712;">Admission Cell</td>
            <td style="padding: 0.5rem; color: #700c1b;">admissions@slrtce.in</td>
          </tr>
          <tr style="border-bottom: 1px solid #ecdcd7;">
            <td style="padding: 0.5rem; font-weight: 700; color: #4e0712;">Placement Cell</td>
            <td style="padding: 0.5rem; color: #700c1b;">placements@slrtce.in</td>
          </tr>
          <tr style="border-bottom: 1px solid #ecdcd7; background: #fffbeb;">
            <td style="padding: 0.5rem; font-weight: 700; color: #4e0712;">Registrar Office</td>
            <td style="padding: 0.5rem; color: #700c1b;">registrar@slrtce.in</td>
          </tr>
        </table>
      </div>
    `
  },
  'committees-modal': {
    title: 'Statutory & Institute Committees',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>SLRTCE has constituted statutory committees in compliance with UGC/AICTE guidelines:</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem;">
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">Internal Complaints Committee (ICC)</strong><br><small style="color: #5c2830;">Women Safety & Prevention of Harassment</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">Anti-Ragging Committee</strong><br><small style="color: #5c2830;">Zero Tolerance Policy on Campus</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">SC/ST Committee</strong><br><small style="color: #5c2830;">Equal Opportunity Cell</small>
          </div>
          <div style="background: #fffbeb; padding: 0.75rem; border-radius: 6px; border: 1px solid #fef08a;">
            <strong style="color: #4e0712;">Student Grievance Cell</strong><br><small style="color: #5c2830;">Ombudsperson Representation</small>
          </div>
        </div>
      </div>
    `
  },
  'alumni-modal': {
    title: 'SLRTCE Alumni Association Network',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Join over 10,000+ engineers making an impact globally in top companies like Amazon, TCS, Hexaware, Infosys, and high-growth tech startups.</p>
        <p style="margin-top: 0.75rem;"><strong>Upcoming:</strong> Annual Global Alumni Meet 2026 registration is currently live. Reconnect with batchmates, mentor current students, and attend guest speaker sessions.</p>
        <div style="margin-top: 1.25rem; background: #fffbeb; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b;">
          <i class="fa-solid fa-graduation-cap" style="color: #700c1b;"></i> <strong style="color: #4e0712;">Alumni Portal:</strong> alumni.slrtce.in
        </div>
      </div>
    `
  },
  'career-modal': {
    title: 'Careers @ SLRTCE — Join Our Academic Team',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>SLRTCE invites applications from qualified and passionate academicians and research scholars for Professor, Associate Professor, and Assistant Professor positions in:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Computer Engineering (AI/ML, Cloud, Cyber Security)</li>
          <li>Information Technology & Data Science</li>
          <li>Electronics & Computer Science / VLSI / IoT</li>
          <li>Mechanical (EV / Mechatronics) & Civil Engineering</li>
        </ul>
        <p>Send your updated CV to <strong style="color: #700c1b;">careers@slrtce.in</strong> with branch specialization in the subject line.</p>
      </div>
    `
  },
  'fee-modal': {
    title: 'Fee Structure — Academic Year 2026–27',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Approved by the Fee Regulating Authority (FRA), Maharashtra for Autonomous Courses:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.875rem;">
          <thead>
            <tr style="background: #4e0712; color: #fbbf24; text-align: left;">
              <th style="padding: 0.6rem;">Category</th>
              <th style="padding: 0.6rem;">Tuition Fee</th>
              <th style="padding: 0.6rem;">Development Fee</th>
              <th style="padding: 0.6rem;">Total Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #ecdcd7;">
              <td style="padding: 0.6rem;"><strong>Open / General</strong></td>
              <td style="padding: 0.6rem;">₹1,15,000</td>
              <td style="padding: 0.6rem;">₹15,000</td>
              <td style="padding: 0.6rem; color: #700c1b; font-weight: 800;">₹1,30,000</td>
            </tr>
            <tr style="border-bottom: 1px solid #ecdcd7; background: #fffbeb;">
              <td style="padding: 0.6rem;"><strong>OBC / EBC / EWS</strong></td>
              <td style="padding: 0.6rem;">₹57,500</td>
              <td style="padding: 0.6rem;">₹15,000</td>
              <td style="padding: 0.6rem; color: #700c1b; font-weight: 800;">₹72,500</td>
            </tr>
            <tr style="border-bottom: 1px solid #ecdcd7;">
              <td style="padding: 0.6rem;"><strong>SC / ST / TFWS</strong></td>
              <td style="padding: 0.6rem;">₹0</td>
              <td style="padding: 0.6rem;">₹15,000</td>
              <td style="padding: 0.6rem; color: #700c1b; font-weight: 800;">₹15,000</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 0.75rem; font-size: 0.8rem; color: #7d424b;">* Scholarships and government schemes as per MahaDBT guidelines.</p>
      </div>
    `
  },
  'login-modal': {
    title: 'Student & Faculty ERP Login Portal',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Access your attendance, internal marks, autonomous exam hall tickets, and fee receipts.</p>
        <form onsubmit="event.preventDefault(); alert('Demo Login Portal: Authenticated successfully (Demo)');" style="margin-top: 1rem;">
          <div style="margin-bottom: 0.85rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #4e0712; margin-bottom: 0.25rem;">PRN / Roll Number</label>
            <input type="text" placeholder="e.g. 2024BECE014" style="width: 100%; padding: 0.65rem; border: 1px solid #ecdcd7; border-radius: 6px;">
          </div>
          <div style="margin-bottom: 1rem;">
            <label style="display: block; font-size: 0.8rem; font-weight: 800; color: #4e0712; margin-bottom: 0.25rem;">Password</label>
            <input type="password" placeholder="••••••••" style="width: 100%; padding: 0.65rem; border: 1px solid #ecdcd7; border-radius: 6px;">
          </div>
          <button type="submit" class="btn btn-primary btn-block" style="background: #700c1b; color: white;">Sign In to Student ERP</button>
        </form>
      </div>
    `
  },
  'brochure-modal': {
    title: 'Download Official Admission Brochure 2026-27',
    body: `
      <div style="line-height: 1.7; text-align: center; padding: 1rem 0; color: #240408;">
        <div style="font-size: 3rem; color: #700c1b; margin-bottom: 1rem;"><i class="fa-solid fa-file-pdf"></i></div>
        <h3 style="color: #4e0712;">SLRTCE Information Brochure 2026-27</h3>
        <p style="color: #5c2830; margin-bottom: 1.5rem;">Includes full curriculum breakdown, department laboratories, placement records, and campus facilities.</p>
        <button class="btn btn-primary" onclick="alert('Download demo started! Brochure PDF would download in live production.')" style="background: #700c1b; color: white; border: 1px solid #f59e0b;">
          <i class="fa-solid fa-download"></i> Download PDF (4.8 MB)
        </button>
      </div>
    `
  },
  'curriculum-modal': {
    title: 'Autonomous Curriculum & Scheme of Education',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>As an <strong>Autonomous Institute</strong>, SLRTCE designs its syllabus in consultation with industry leaders from TCS, AWS, Hexaware, and Mumbai University academicians.</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Industry 4.0 aligned electives: Generative AI, Cloud Security, IoT, Electric Mobility</li>
          <li>Mandatory 6-month industry internship in final year</li>
          <li>Choice-Based Credit System (CBCS) with Minor and Honors degree options</li>
          <li>Continuous evaluation with relative grading transparency</li>
        </ul>
      </div>
    `
  },
  'why-choose-more': {
    title: 'Why Shree L. R. Tiwari College of Engineering?',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <h4 style="color: #4e0712;">The SLRTCE Advantage</h4>
        <p style="color: #5c2830;">Located strategically in Mira Road with sprawling infrastructure, SLRTCE combines academic rigor with career outcomes:</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li><strong>Autonomous Freedom:</strong> Immediate syllabus upgrades matching tech industry evolution.</li>
          <li><strong>State-of-the-Art Labs:</strong> GPU workstation labs, Apple Mac labs, Robotics & CAD setups.</li>
          <li><strong>Industry Partnerships:</strong> Tie-ups with 1000+ corporate recruiters for internships & campus drives.</li>
          <li><strong>Holistic Campus Life:</strong> 25+ student technical chapters (IEEE, CSI, ACM) & vibrant cultural fests.</li>
        </ul>
      </div>
    `
  },
  'placement-report-modal': {
    title: 'Career Development & Placement Cell',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>The Career Development Cell (CDC) at SLRTCE bridges the gap between campus talent and industry recruiters.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0;">
          <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 1rem; border-radius: 8px; text-align: center;">
            <div style="font-size: 1.75rem; font-weight: 800; color: #700c1b;">₹1.2 Cr</div>
            <div style="font-size: 0.8rem; color: #5c2830;">Highest UG Package</div>
          </div>
          <div style="background: #4e0712; padding: 1rem; border-radius: 8px; text-align: center; color: white;">
            <div style="font-size: 1.75rem; font-weight: 800; color: #fbbf24;">1000+</div>
            <div style="font-size: 0.8rem; color: #f7deda;">Corporate Hiring Partners</div>
          </div>
        </div>
        <p style="color: #5c2830;">Key Recruiters include: Hexaware, TCS, Infosys, Amazon, L&T Infotech, Capgemini, Accenture, Tech Mahindra, and Reliance Jio.</p>
      </div>
    `
  },
  'gallery-modal': {
    title: 'Campus Life & Infrastructure Gallery',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1rem; border: 2px solid #f59e0b;">
          <img src="assets/slrtce_campus.jpg" alt="SLRTCE Campus Building" style="width: 100%; height: auto; display: block;">
        </div>
        <h4 style="color: #4e0712; margin-bottom: 0.35rem;">SLRTCE Autonomous Campus — Mira Road (East)</h4>
        <p style="color: #5c2830;">Spread across a modern sprawling educational complex equipped with advanced computing centres, NVIDIA GPU workstations, robotics lab, smart auditoriums, and gymkhana facilities.</p>
      </div>
    `
  },
  'calendar-modal': {
    title: 'Academic Calendar 2026–27',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p><strong style="color: #4e0712;">Term Dates & Examination Schedule:</strong></p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li><strong>Odd Semester Commencement:</strong> July 2026</li>
          <li><strong>Mid-Semester Assessment (In-Sem):</strong> September 2026</li>
          <li><strong>Autonomous End-Semester Exams:</strong> November – December 2026</li>
          <li><strong>Even Semester Commencement:</strong> January 2027</li>
        </ul>
      </div>
    `
  },
  'mht-cet-modal': {
    title: 'MHT-CET & JEE Main Admission Guidance',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>Admissions to First Year Engineering (B.E.) are conducted via State Common Entrance Test Cell (CET Cell), Government of Maharashtra Centralized Admission Process (CAP).</p>
        <p style="margin-top: 0.5rem;"><strong style="color: #700c1b;">Institute Choice Code:</strong> 3218</p>
        <p style="margin-top: 0.5rem; color: #5c2830;">Institute Level & Against CAP vacancy rounds are also conducted as per DTE norms.</p>
      </div>
    `
  },
  'terms-modal': {
    title: 'Terms of Use',
    body: `<p style="color: #240408; line-height: 1.7;">All academic content, syllabi, brochures, and branding displayed on this portal are the intellectual property of Shree L. R. Tiwari College of Engineering (SLRTCE). Unauthorized duplication is prohibited.</p>`
  },
  'privacy-modal': {
    title: 'Privacy Policy',
    body: `<p style="color: #240408; line-height: 1.7;">SLRTCE respects student and visitor data privacy. Information submitted through admission enquiry forms is used solely for counselling and official communication regarding academic admissions.</p>`
  },
  'phd-notice-modal': {
    title: 'Ph.D. Research Centre Details',
    body: `
      <div style="line-height: 1.7; color: #240408;">
        <p>SLRTCE is a recognized Research Centre for Doctor of Philosophy (Ph.D.) in Technology under the University of Mumbai.</p>
        <ul style="margin: 0.75rem 0 1rem 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Branches: Computer Engineering & Electronics and Telecommunication Engineering</li>
          <li>Approved Research Guides with high Scopus/IEEE citation index</li>
          <li>Access to high-performance computing cluster and simulation software</li>
        </ul>
      </div>
    `
  }
};

function openModal(modalKey) {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const modalData = modalContentMap[modalKey];
  if (modalData && modalBackdrop && modalTitle && modalBody) {
    modalTitle.textContent = modalData.title;
    modalBody.innerHTML = modalData.body;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function showNoticeModal(title, type, content, date) {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalBackdrop && modalTitle && modalBody) {
    modalTitle.innerHTML = `<span style="font-size: 0.8rem; padding: 0.2rem 0.5rem; border-radius: 4px; background: #f59e0b; color: #36050c; font-weight: 800; margin-right: 0.5rem;">${type}</span> ${title}`;
    modalBody.innerHTML = `
      <div style="line-height: 1.7; color: #240408;">
        <div style="font-size: 0.8rem; color: #7d424b; margin-bottom: 1rem;"><i class="fa-regular fa-calendar"></i> Date: ${date} | Official SLRTCE Circular</div>
        <p style="font-size: 1rem; color: #240408; margin-bottom: 1.5rem;">${content}</p>
        <div style="background: #fffbeb; border: 1px solid #fef08a; padding: 1rem; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-weight: 700; color: #4e0712;"><i class="fa-solid fa-file-arrow-down" style="color: #700c1b;"></i> Official Circular Document.pdf</span>
          <button class="btn btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: #700c1b; color: white;" onclick="alert('Circular PDF Download Started (Demo)')">Download</button>
        </div>
      </div>
    `;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function openCourseDetails(courseName) {
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  if (modalBackdrop && modalTitle && modalBody) {
    modalTitle.textContent = `Department of ${courseName}`;
    modalBody.innerHTML = `
      <div style="line-height: 1.7; color: #240408;">
        <p><strong>Programme Overview:</strong> The Department of ${courseName} at SLRTCE offers cutting-edge autonomous engineering education integrating theoretical rigor with industrial applications.</p>
        <h4 style="margin: 1rem 0 0.5rem; color: #4e0712;">Key Laboratory Highlights:</h4>
        <ul style="margin-left: 1.5rem; list-style-type: disc; color: #5c2830;">
          <li>Modern Computing and Hardware Experimentation Labs</li>
          <li>High-Speed Gigabit LAN & Specialized Simulation Suites</li>
          <li>Dedicated Capstone Project Workstation Infrastructure</li>
          <li>Hands-on industry certification mapped modules</li>
        </ul>
        <div style="margin-top: 1.5rem; text-align: right;">
          <a href="#enquiry-section" class="btn btn-primary" style="background: #700c1b; color: white; border: 1px solid #f59e0b;" onclick="closeAllModals()">Apply for this Branch</a>
        </div>
      </div>
    `;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals(event) {
  const modalBackdrop = document.getElementById('modalBackdrop');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

/* Close modal on ESC key */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

/* Animated Counter */
function initStatsCounter() {
  const counters = document.querySelectorAll('.counter');

  function countUp() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const text = counter.innerText;
      let count = 0;
      const increment = Math.ceil(target / 40);

      const updateCount = () => {
        count += increment;
        if (count < target) {
          if (text.includes('%')) {
            counter.innerText = count + '%';
          } else if (text.includes('+')) {
            counter.innerText = count + '+';
          } else {
            counter.innerText = count;
          }
          requestAnimationFrame(updateCount);
        } else {
          if (text.includes('%')) {
            counter.innerText = target + '%';
          } else if (text.includes('+')) {
            counter.innerText = target + '+';
          } else {
            counter.innerText = target;
          }
        }
      };
      updateCount();
    });
  }

  // Trigger on load
  setTimeout(countUp, 300);
}

/* ==========================================================================
   NEWS TICKER
   Seamless CSS-animation marquee with Pause / Play controls.
   Items to edit: the <li> elements inside #tickerList in index.html.
   ========================================================================== */
function initTicker() {
  const list   = document.getElementById('tickerList');
  const pause  = document.getElementById('tickerPause');
  const play   = document.getElementById('tickerPlay');
  if (!list || !pause || !play) return;

  // Respect prefers-reduced-motion — CSS already hides animation; just bail.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Clone all items to create a seamless loop.
  const origItems = Array.from(list.querySelectorAll('li'));
  origItems.forEach(item => list.appendChild(item.cloneNode(true)));

  // Measure total width of original set after a brief paint delay.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const totalW = origItems.reduce((acc, li) => acc + li.offsetWidth, 0);
      if (totalW === 0) return;

      // Set CSS custom property used by @keyframes ticker-scroll.
      list.style.setProperty('--ticker-offset', `-${totalW}px`);

      // Duration: ~60px / sec feels comfortable.
      const duration = Math.round(totalW / 60);
      list.style.animation = `ticker-scroll ${duration}s linear infinite`;

      // Pause button
      pause.addEventListener('click', () => {
        list.style.animationPlayState = 'paused';
        pause.classList.add('ticker-btn--hidden');
        play.classList.remove('ticker-btn--hidden');
      });

      // Play button
      play.addEventListener('click', () => {
        list.style.animationPlayState = 'running';
        play.classList.add('ticker-btn--hidden');
        pause.classList.remove('ticker-btn--hidden');
      });
    });
  });
}

/* ==========================================================================
   CAMPUS CAROUSEL (3-up)
   Infinite-loop (clone-based), responsive, keyboard + focus aware.
   Slides to edit: <li class="carousel-slide"> elements in index.html.
   ========================================================================== */
function initCarousel() {
  const track    = document.getElementById('carouselTrack');
  const viewport = document.getElementById('carouselViewport');
  const btnPrev  = document.getElementById('carouselPrev');
  const btnNext  = document.getElementById('carouselNext');
  if (!track || !viewport || !btnPrev || !btnNext) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Helpers ----
  function getSlidesVisible() {
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640)  return 2;
    return 1;
  }

  const origSlides = Array.from(track.querySelectorAll('.carousel-slide'));
  const total      = origSlides.length; // 5

  // Clone set prepended (for prev) and appended (for next).
  function buildTrack() {
    // Remove old clones.
    track.querySelectorAll('.carousel-slide--clone').forEach(el => el.remove());

    const vis = getSlidesVisible();
    const slideW = 100 / vis;

    // Size all originals.
    origSlides.forEach(s => {
      s.style.width = `${slideW}%`;
    });

    // Prepend clones (last <vis> originals) for prev-wrap.
    const prependClones = origSlides.slice(-vis).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('carousel-slide--clone');
      c.style.width = `${slideW}%`;
      return c;
    });
    prependClones.reverse().forEach(c => track.prepend(c));

    // Append clones (first <vis> originals) for next-wrap.
    const appendClones = origSlides.slice(0, vis).map(s => {
      const c = s.cloneNode(true);
      c.classList.add('carousel-slide--clone');
      c.style.width = `${slideW}%`;
      return c;
    });
    appendClones.forEach(c => track.appendChild(c));

    return { vis, slideW, prependCount: prependClones.length };
  }

  let vis, slideW, prependCount;
  let currentIndex = 0; // index into origSlides (0-based)
  let isTransitioning = false;
  let autoTimer = null;

  function getAllSlides() {
    return Array.from(track.querySelectorAll('.carousel-slide'));
  }

  function getOffset(index) {
    // index relative to allSlides array.
    return -(index * (100 / vis));
  }

  function goTo(allSlideIndex, animate) {
    const pct = -(allSlideIndex * (100 / vis));
    if (!animate || reducedMotion) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    track.style.transform = `translateX(${pct}%)`;
  }

  function setup() {
    const res = buildTrack();
    vis = res.vis;
    slideW = res.slideW;
    prependCount = res.prependCount;

    const allSlides = getAllSlides();
    // Initial position: prependCount = offset to first real slide.
    goTo(prependCount + currentIndex, false);
  }

  setup();

  // ---- After transition: jump instantly if on a clone ----
  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    const allSlides = getAllSlides();
    const totalAll  = allSlides.length;

    // Calculate which allSlide index we are at via transform.
    const pct = parseFloat(track.style.transform.replace('translateX(', '').replace('%)', '')) || 0;
    const rawIdx = Math.round(-pct / (100 / vis));

    if (rawIdx <= prependCount - 1) {
      // Jumped before first real slide — jump to equivalent real slide at end.
      currentIndex = total - 1;
      goTo(prependCount + currentIndex, false);
    } else if (rawIdx >= prependCount + total) {
      // Jumped past last real slide — jump to first.
      currentIndex = 0;
      goTo(prependCount + currentIndex, false);
    } else {
      currentIndex = rawIdx - prependCount;
    }
  });

  // ---- Move one step ----
  function step(dir) {
    if (isTransitioning) return;
    isTransitioning = true;

    const allSlides = getAllSlides();
    const curAllIdx = prependCount + currentIndex;

    if (dir === 'next') {
      goTo(curAllIdx + 1, true);
    } else {
      goTo(curAllIdx - 1, true);
    }
  }

  btnNext.addEventListener('click', () => { resetAuto(); step('next'); });
  btnPrev.addEventListener('click', () => { resetAuto(); step('prev'); });

  // ---- Keyboard support ----
  [btnPrev, btnNext].forEach(btn => {
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // ---- Auto-advance ----
  function startAuto() {
    if (reducedMotion) return;
    stopAuto();
    autoTimer = setInterval(() => step('next'), 4000);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  function resetAuto() {
    stopAuto();
    startAuto();
  }

  startAuto();

  // Stop auto when a carousel button has focus.
  [btnPrev, btnNext].forEach(btn => {
    btn.addEventListener('focus', stopAuto);
    btn.addEventListener('blur',  startAuto);
  });

  // ---- Resize: rebuild with correct slide count ----
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newVis = getSlidesVisible();
      if (newVis !== vis) {
        stopAuto();
        setup();
        startAuto();
      }
    }, 200);
  });
}
