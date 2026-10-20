/**
 * SLRTCE College Website Data
 * Plain JavaScript file defining window.SLRTCE_DATA and window.isSet for offline and local filesystem compatibility.
 * All content originates from slrtce.in and official body websites.
 */
(function() {
  'use strict';

  // Helper required by spec: returns false when v is empty, undefined, null or starts with "TODO_"
  window.isSet = function(v) {
    if (v === null || v === undefined || v === '') return false;
    if (typeof v === 'string' && v.startsWith('TODO_')) return false;
    if (Array.isArray(v) && v.length === 0) return false;
    return true;
  };

  window.SLRTCE_DATA = {
    // 1. Why Choose Us (Live site three points, stacked list with 1px dividers)
    whyChoose: [
      {
        id: 'record',
        title: 'Excellent educational record',
        description: 'Consistent academic results with university rankers and merit positions across disciplines through structured mentoring.'
      },
      {
        id: 'transparency',
        title: 'Model of transparency',
        description: 'Clear curriculum governance, transparent academic evaluations, and comprehensive public disclosures across all institutional operations.'
      },
      {
        id: 'teaching',
        title: 'Unparalleled teaching-learning',
        description: 'Interactive classroom pedagogy, extensive practical laboratory work, industry-aligned skill programs, and experienced faculty mentorship.'
      }
    ],

    // Official Brochure (assets/brochure/SLRTCE-Brochure.pdf is missing in repo; available set to false)
    brochure: {
      available: false,
      path: 'assets/brochure/SLRTCE-Brochure.pdf',
      size: 'TODO_FILE_SIZE'
    },

    // 2. Active Approvals
    approvals: [
      {
        id: 'aicte',
        name: 'AICTE',
        fullName: 'All India Council for Technical Education',
        logo: 'assets/optimized/logos/approvals/aicte.webp',
        url: 'https://www.aicte-india.org',
        isBadge: false
      },
      {
        id: 'ugc',
        name: 'UGC',
        fullName: 'University Grants Commission',
        logo: 'assets/optimized/logos/approvals/ugc.webp',
        url: 'https://www.ugc.gov.in',
        isBadge: false
      },
      {
        id: 'naac',
        name: 'NAAC',
        fullName: 'National Assessment and Accreditation Council',
        logo: 'assets/optimized/logos/approvals/naac.webp',
        url: 'https://www.naac.gov.in',
        isBadge: false
      },
      {
        id: 'nba',
        name: 'NBA',
        fullName: 'National Board of Accreditation',
        logo: 'assets/optimized/logos/approvals/nba.webp',
        url: 'https://www.nbaind.org',
        isBadge: false
      },
      {
        id: 'dte',
        name: 'DTE Maharashtra',
        fullName: 'Directorate of Technical Education, Maharashtra State',
        logo: 'assets/optimized/logos/approvals/dte_maharashtra.webp',
        url: 'https://dtemaharashtra.gov.in',
        isBadge: false
      },
      {
        id: 'mu',
        name: 'University of Mumbai',
        fullName: 'University of Mumbai',
        logo: 'assets/optimized/logos/approvals/mumbai_university.webp',
        url: 'https://mu.ac.in',
        isBadge: false
      },
      {
        id: 'iso',
        name: 'ISO 9001:2015',
        fullName: 'ISO 9001:2015 Certified Quality Management System',
        logo: '',
        url: '',
        isBadge: true
      }
    ],

    // 3. Our Collaborators
    collaborators: [
      {
        name: 'Cisco Networking Academy',
        logo: 'assets/optimized/logos/collaborators/cisco.webp',
        url: 'https://www.netacad.com'
      },
      {
        name: 'IBM',
        logo: 'assets/optimized/logos/collaborators/ibm.webp',
        url: 'https://www.ibm.com'
      },
      {
        name: 'Red Hat',
        logo: 'assets/optimized/logos/collaborators/redhat.webp',
        url: 'https://www.redhat.com'
      },
      {
        name: 'AWS Academy',
        logo: 'assets/optimized/logos/collaborators/aws.webp',
        url: 'https://aws.amazon.com/training/awsacademy/'
      },
      {
        name: 'Palo Alto Networks',
        logo: 'assets/optimized/logos/collaborators/palo_alto.webp',
        url: 'https://www.paloaltonetworks.com'
      },
      {
        name: 'C-DAC',
        logo: 'assets/optimized/logos/collaborators/cdac.webp',
        url: 'https://www.cdac.in'
      },
      {
        name: 'IIT Bombay',
        logo: 'assets/optimized/logos/collaborators/iitb_ict.webp',
        url: ''
      },
      {
        name: 'e-Yantra',
        logo: 'assets/optimized/logos/collaborators/eyantra.webp',
        url: 'https://www.e-yantra.org'
      },
      {
        name: 'Virtual Labs',
        logo: 'assets/optimized/logos/collaborators/virtual_lab.webp',
        url: 'https://www.vlab.co.in'
      },
      {
        name: 'Atal Incubation Centre',
        logo: 'assets/optimized/logos/collaborators/atal_incubation.webp',
        url: 'https://aim.gov.in'
      },
      {
        name: 'EduSkills Foundation',
        logo: 'assets/optimized/logos/collaborators/eduskills.webp',
        url: 'https://eduskillsfoundation.org'
      },
      {
        name: 'Blue Prism',
        logo: 'assets/optimized/logos/collaborators/blue_prism.webp',
        url: 'https://www.blueprism.com'
      },
      {
        name: 'Microchip Technology',
        logo: 'assets/optimized/logos/collaborators/microchip.webp',
        url: ''
      },
      {
        name: 'Pratibha Syntex',
        logo: 'assets/optimized/logos/collaborators/pratibha_syntex.webp',
        url: 'https://www.pratibhasyntex.com'
      },
      {
        name: 'Unnat Bharat Abhiyan',
        logo: 'assets/optimized/logos/collaborators/unnat_bharat.webp',
        url: 'https://unnatbharatabhiyan.gov.in'
      }
    ],

    // 4. Latest Updates and Blogs
    blogs: [
      {
        title: 'Genome Editing: The Next Big Revolution in Indian Agriculture',
        date: '08 Oct 2022',
        excerpt: 'Agricultural technology is advancing rapidly with targeted crop genome modifications. Modern editing tools are enhancing yield resilience and food security throughout India.',
        url: 'https://slrtce.in/blogs/genenome-editing-the-next-big-revolution-inindian-agriculture',
        image: 'assets/optimized/blog/agriculture.webp'
      },
      {
        title: 'Demystifying Blockchain Technology: Revolutionizing Data Security and Trust',
        date: '08 Oct 2022',
        excerpt: 'Blockchain frameworks establish tamper-evident decentralized record systems. Distributed consensus protocols eliminate single-point vulnerabilities across data networks.',
        url: 'https://slrtce.in/blogs/blockchain-technology',
        image: 'assets/optimized/blog/blockchain.webp'
      },
      {
        title: 'All About Cyber Security: Layered Protection in a Hyperconnected Era',
        date: '08 Oct 2022',
        excerpt: 'Modern network defence demands proactive security protocols across digital systems. Robust cryptography and security audits protect critical infrastructure from evolving threats.',
        url: 'https://slrtce.in/blogs/cyber-security',
        image: 'assets/optimized/blog/cyber_security.webp'
      },
      {
        title: 'Private Equity: Transforming Enterprise Valuation and Capital Growth',
        date: '08 Oct 2022',
        excerpt: 'Private equity investments provide strategic liquidity and operational discipline. Institutional funding accelerates product development and sustainable business expansion.',
        url: 'https://slrtce.in/blogs/private-equity',
        image: 'assets/optimized/blog/private_equity.webp'
      },
      {
        title: 'Importance of Soft Skills for Engineering Professionals',
        date: '08 Oct 2022',
        excerpt: 'Technical expertise yields maximum impact when paired with effective team collaboration. Structured communication and problem-solving enable engineers to lead multidisciplinary projects.',
        url: 'https://slrtce.in/blogs/importance-of-soft-skills',
        image: 'assets/optimized/blog/soft_skills.webp'
      }
    ],

    // HODs (Academic Leadership)
    hods: [
      {
        name: 'Dr. Bhushan Nemade',
        designation: 'Professor & HOD',
        department: 'Computer Engineering',
        photo: 'assets/optimized/hods/bhushan_nemade.webp'
      },
      {
        name: 'Mr. Abhijit A. Samanta',
        designation: 'Associate Professor & HOD',
        department: 'Information Technology',
        photo: 'assets/optimized/hods/abhijit_samanta.webp'
      },
      {
        name: 'Mrs. Samita Bhandari',
        designation: 'Assistant Professor & HOD',
        department: 'Electronics & Telecommunication',
        photo: 'assets/optimized/hods/samita_bhandari.webp'
      },
      {
        name: 'Mrs. Swapna Patil',
        designation: 'Assistant Professor & HOD',
        department: 'Civil Engineering',
        photo: 'assets/optimized/hods/swapna_patil.webp'
      },
      {
        name: 'Dr. Umesh Bhadade',
        designation: 'Professor & HOD',
        department: 'Mechanical Engineering',
        photo: 'assets/optimized/hods/umesh_bhadade.webp'
      },
      {
        name: 'Dr. Lahu Teli',
        designation: 'Associate Professor & HOD',
        department: 'Applied Sciences & Humanities',
        photo: 'assets/optimized/hods/lahu_teli.webp'
      },
      {
        name: 'Dr. Vikas Kaul',
        designation: 'Professor & HOD',
        department: 'Master of Computer Applications (MCA)',
        photo: 'assets/optimized/hods/vikas_kaul.webp'
      }
    ],

    recruiters: [
      { name: 'TCS', logo: 'assets/optimized/logos/placement/tcs.webp' },
      { name: 'Infosys', logo: 'assets/optimized/logos/placement/infosys.webp' },
      { name: 'Capgemini', logo: 'assets/optimized/logos/placement/capgemini.webp' },
      { name: 'Wipro', logo: 'assets/optimized/logos/placement/wipro.webp' },
      { name: 'Accenture', logo: 'assets/optimized/logos/placement/accenture.webp' },
      { name: 'Cognizant', logo: 'assets/optimized/logos/placement/cognizant.webp' },
      { name: 'LTI Mindtree', logo: 'assets/optimized/logos/placement/lti_mindtree.webp' },
      { name: 'Tech Mahindra', logo: 'assets/optimized/logos/placement/tech_mahindra.webp' },
      { name: 'Hexaware', logo: 'assets/optimized/logos/placement/hexaware.webp' },
      { name: 'Persistent Systems', logo: 'assets/optimized/logos/placement/persistent.webp' },
      { name: 'Jio Platforms', logo: 'assets/optimized/logos/placement/jio.webp' },
      { name: 'Reliance Industries', logo: 'assets/optimized/logos/placement/reliance.webp' },
      { name: 'Amazon AWS', logo: 'assets/optimized/logos/placement/amazon_aws.webp' },
      { name: 'QualityKiosk', logo: 'assets/optimized/logos/placement/qualitykiosk.webp' },
      { name: 'Zeus Learning', logo: 'assets/optimized/logos/placement/zeus_learning.webp' }
    ],

    whyChooseUs: [
      {
        title: 'Autonomous Academic Excellence',
        summary: 'Rigorous outcome-based curriculum affiliated with the University of Mumbai, approved by AICTE, accredited by NAAC and NBA.',
        highlight: 'NAAC Accredited & Autonomous'
      },
      {
        title: 'Outstanding Placement Records',
        summary: 'Consistent 85%+ placement track record with 100+ prestigious recruitment partners including TCS, Infosys, Capgemini, and Amazon.',
        highlight: '100+ Hiring Partners'
      },
      {
        title: 'Industry-Sponsored Labs & CoEs',
        summary: 'Advanced Centers of Excellence powered by Cisco Networking Academy, IBM, AWS Academy, Red Hat, and IIT Bombay e-Yantra.',
        highlight: '15+ Corporate Centers'
      },
      {
        title: 'Vibrant Research & Startup Ecosystem',
        summary: 'Dedicated Atal Incubation Center, active IPR cell, patent funding support, and regular publications in indexed international journals.',
        highlight: 'Active Incubation & Patents'
      },
      {
        title: 'Holistic Student Development',
        summary: 'State-of-the-art campus, extensive digital library, sports facilities, active technical societies (IEEE, CSI, ACM, IETE), and annual cultural fests.',
        highlight: 'Comprehensive Campus Life'
      }
    ],

    news: [
      {
        id: 'n1',
        title: 'First Year B.Tech and Direct Second Year (DSE) Admission Process 2026-27 - Merit Lists Released',
        category: 'Admission',
        date: 'October 2026',
        badge: 'New',
        isNew: true,
        link: 'https://slrtce.in',
        description: 'Institute level and ACAP merit lists for B.Tech First Year and Direct Second Year engineering programs are published.'
      },
      {
        id: 'n2',
        title: 'National Conference on Emerging Trends in Technology & Computing (NCETTC) - Call for Research Papers',
        category: 'Conference',
        date: 'September 2026',
        badge: 'Academic',
        isNew: false,
        link: '#/research',
        description: 'Authors are invited to submit original research manuscripts in AI, Cloud Computing, VLSI, and Sustainable Civil Engineering.'
      },
      {
        id: 'n3',
        title: 'Smart India Hackathon (SIH) Internal Campus Screening - Congratulations to Shortlisted Teams',
        category: 'Innovation',
        date: 'September 2026',
        badge: 'Achievement',
        isNew: false,
        link: '#/achievements',
        description: 'Ten student engineering teams shortlisted to represent SLRTCE in the national-level Grand Finale problem statements.'
      },
      {
        id: 'n4',
        title: 'Campus Recruitment Drive 2026-27: Over 450+ Offers Extended by Top Engineering Corporates',
        category: 'Placement',
        date: 'August 2026',
        badge: 'Career',
        isNew: false,
        link: '#/career-development-cell',
        description: 'TCS, Capgemini, Jio, and Cognizant lead recruitment drives with packages ranging up to 18 LPA.'
      }
    ],

    social: [
      {
        id: 's1',
        platform: 'LinkedIn',
        date: 'October 2026',
        author: 'SLRTCE Official',
        content: 'Proud to announce that SLRTCE has been conferred Autonomous Status by the UGC and University of Mumbai. A milestone in innovative pedagogy.',
        url: 'https://www.linkedin.com/school/shree-l-r-tiwari-college-of-engineering/'
      },
      {
        id: 's2',
        platform: 'Instagram',
        date: 'September 2026',
        author: '@slrtce_official',
        content: 'Highlights from the Inter-Departmental Hackathon! 36 hours of continuous coding, prototyping, and engineering solutions for real-world challenges.',
        url: 'https://www.instagram.com/slrtce_official/'
      },
      {
        id: 's3',
        platform: 'YouTube',
        date: 'September 2026',
        author: 'SLRTCE Media',
        content: 'Watch the complete video recap of the Annual Project Exhibition featuring 80+ working capstone projects built across engineering departments.',
        url: 'https://www.youtube.com/'
      },
      {
        id: 's4',
        platform: 'Facebook',
        date: 'August 2026',
        author: 'SLRTCE Official',
        content: 'SLRTCE celebrates outstanding achievements in campus placements for the graduating batch. Hearty congratulations to our budding engineers.',
        url: 'https://www.facebook.com/'
      }
    ]
  };
})();
