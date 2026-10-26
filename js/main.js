/**
 * PORTFOLIO JAVASCRIPT - Jared Kristian M. Gatdula
 * Professional Elective 4 – Web Systems & Technologies
 * Midterm Practical Examination
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Theme Management (Light / Dark Mode with Persistence)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  const getSavedTheme = () => {
    const saved = localStorage.getItem('site-theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeIcon.className = 'fa-solid fa-sun';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  };

  applyTheme(getSavedTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // =========================================================================
  // 2. Mobile Navigation Toggle
  // =========================================================================
  const navToggleBtn = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggleBtn && navLinks) {
    navToggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      navToggleBtn.classList.toggle('active');
      navToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggleBtn.classList.remove('active');
        navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 3. Dynamic Greeting (Hero Section)
  // =========================================================================
  const greetingEl = document.getElementById('dynamic-greeting');
  if (greetingEl) {
    const currentHour = new Date().getHours();
    let greeting = 'Hello';
    if (currentHour < 12) {
      greeting = 'Good morning';
    } else if (currentHour < 18) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    greetingEl.textContent = `${greeting}, welcome to my portfolio`;
  }

  // =========================================================================
  // 4. Sticky Navbar & Scrollspy (Active Navigation Indicator)
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const backToTopBtn = document.getElementById('back-to-top');

  const onScrollHandler = () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScrollHandler, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 5. About Section Tabs
  // =========================================================================
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 6. Project & Certificate Modal Data and Controller
  // =========================================================================
  const modalOverlay = document.getElementById('info-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  const modalDetailsData = {
    'project-kape': {
      title: 'Kape Timplados: POS & Multi-Branch Inventory Management System',
      category: 'Major Web System & Database Architecture Case Study',
      tech: ['PHP (OOP & Procedural)', 'MySQL / MariaDB', 'Relational Schema Design', 'Cron Automation', 'JavaScript', 'PHPMailer'],
      summary: 'A full-featured Point of Sale (POS) and inventory management web system built for a dual-branch coffee shop. Focuses heavily on backend data integrity, per-branch inventory isolation, dynamic product variants with recipes, cashier order workflows, and automated cron task routines on Hostinger.',
      features: [
        'Multi-Branch Architecture: Dedicated per-branch inventory tracking (Branch 1 vs. Branch 2) with stock level deduction per sale',
        'Complex Relational Data Model: Normalized SQL schema supporting product variants (sizes, pricing), customizable flavors, add-ons, and recipe ingredient linkages',
        'Cashier & Admin Terminals: Separate user role portals with order void workflows, transaction receipt logging, and session security',
        'Automated Database Migration: Wrote structured PHP migration scripts (run_migration.php, run_migration_v2.php) and SQL patch files for zero-loss schema updates',
        'Automated Hostinger Cron Jobs: Configured server-level cron jobs for routine database maintenance and inventory audit checks'
      ],
      role: 'Backend Logic, Database Design, & Migration Lead'
    },
    'project-pharmacy': {
      title: 'Multi-Location Pharmacy Inventory Management System',
      category: 'Academic Coursework – Object-Oriented Programming (Java)',
      tech: ['Java', 'Java Swing GUI', 'OOP Design Principles', 'Java Collections (HashMaps)', 'Interface Abstraction'],
      summary: 'A desktop application developed in Java Swing designed to handle stock monitoring and inventory control across multiple pharmacy branches (Location 1 & Location 2). Implements core object-oriented programming principles to maintain modular and maintainable code.',
      features: [
        'Object-Oriented Architecture: Employs interface abstraction (InventoryOperations), model encapsulation (InventoryItem), and inheritance (PharmacyLocation extends InventoryManager)',
        'Multi-Branch Stock Tracking: Dedicated inventory instances for Location 1 and Location 2 with instant cross-location aggregated quantity summaries',
        'Stock Threshold Monitoring: Automated low-stock warning detection logic to alert staff before essential medicines run out of stock',
        'Interactive Java Swing GUI: Custom window frames and modal dialogs enabling full item creation, quantity modification, and item removal',
        'Optimized Lookups: Utilizes HashMap data structures for fast O(1) medicine lookups and inventory updates'
      ],
      role: 'Student Developer (Java & OOP Implementation)'
    },
    'cert-aws': {
      title: 'AWS Community Day Philippines 2026',
      issuer: 'AWS User Group Philippines (AWSUG.PH) & AWS User Group Builders',
      date: 'August 22, 2026',
      credId: 'AWS Office, BGC, Taguig City',
      image: 'AWS Certificate.png',
      topics: 'Active participation in AWS Community Day Philippines 2026 under the theme "Build, Break, Repeat". Engaged with sessions on cloud architecture, serverless systems, AWS foundational services, and developer best practices.'
    },
    'cert-modern': {
      title: 'Modern Work Conference Manila',
      issuer: 'AI Community Days (AICD) & Modern Work Community Manila',
      date: '2 December 2025 – 1 June 2026',
      credId: 'AICD-C-2026-7282FD7F',
      verifyUrl: 'https://aicommunitydays.ai/verify/XULU-8VXD-XA6H',
      image: 'Modern Work Certificate.png',
      topics: 'Certificate of Participation in a global movement for AI knowledge sharing. Covered modern workplace collaboration tools, AI productivity integrations, and cloud-assisted workplace solutions.'
    },
    'cert-paloalto': {
      title: 'Redefining Network Security for the Frontier AI Era',
      issuer: 'Palo Alto Networks',
      date: 'August 20, 2026',
      credId: 'Authorized by Nikesh Arora (Chairman & CEO)',
      image: 'PALOALTO Certificate.png',
      topics: 'Certificate of Completion covering modern network security paradigms, threat landscape evolution in the AI era, zero-trust network principles, and automated cybersecurity protocols.'
    },
    'cert-sas': {
      title: 'Skills Fest: AI Foundations and Real World Impact',
      issuer: 'SAS Global Certification Program (SAS)',
      date: 'August 13, 2026',
      credId: 'Verification No. LWWSKF2',
      image: 'SAS Certificate.jpg',
      topics: 'Certificate of Participation exploring foundational artificial intelligence concepts, data analytics workflows, machine learning use-cases, and real-world industrial impact of predictive models.'
    },
    'cert-snowflake': {
      title: 'Snowflake World Tour Virtual',
      issuer: 'Snowflake Inc.',
      date: '29 September – 3 October 2026',
      credId: 'Virtual Global Conference',
      image: 'Snowflake Certificate.png',
      topics: 'Certificate of Attendance at the global Snowflake World Tour. Explored cloud data platform architecture, data warehousing, scalable SQL analytics, and secure data sharing.'
    }
  };

  const openModal = (id) => {
    const data = modalDetailsData[id];
    if (!data || !modalOverlay) return;

    modalTitle.textContent = data.title;

    if (data.features) {
      // It is a project
      modalBody.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <span class="section-badge" style="font-size: 0.75rem;">${data.category}</span>
        </div>
        <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 1.5rem; line-height: 1.6;">${data.summary}</p>
        <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 0.75rem;">Key Architecture & System Features:</h4>
        <ul style="list-style: none; margin-bottom: 1.5rem;">
          ${data.features.map(f => `<li style="position: relative; padding-left: 1.4rem; margin-bottom: 0.6rem; color: var(--text-muted); font-size: 0.92rem;"><span style="position: absolute; left: 0; color: var(--primary); font-weight: bold;">✔</span>${f}</li>`).join('')}
        </ul>
        <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 0.6rem;">Technologies Applied:</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem;">
          ${data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-dim); border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <strong>Role & Responsibility:</strong> ${data.role}
        </div>
      `;
    } else {
      // It is a certificate
      modalBody.innerHTML = `
        <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <span class="cert-status"><i class="fa-solid fa-circle-check"></i> Verified Credential</span>
          <a href="${data.image}" target="_blank" class="btn btn-outline" style="padding: 0.35rem 0.8rem; font-size: 0.8rem;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Full Image
          </a>
        </div>
        <img src="${data.image}" alt="${data.title}" class="modal-cert-img" loading="lazy">
        <p style="color: var(--secondary); font-weight: 600; font-size: 1.05rem; margin-bottom: 0.4rem;">${data.issuer}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          <span><strong>Date:</strong> ${data.date}</span>
          <span><strong>Credential Ref:</strong> ${data.credId}</span>
          ${data.verifyUrl ? `<span><strong>Verify:</strong> <a href="${data.verifyUrl}" target="_blank" rel="noopener noreferrer">${data.verifyUrl}</a></span>` : ''}
        </div>
        <h4 style="font-size: 1rem; color: var(--text-main); margin-bottom: 0.5rem;">Topics & Learning Focus:</h4>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 0;">${data.topics}</p>
      `;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      openModal(targetId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // =========================================================================
  // 7. Contact Form Validation & Toast Notification
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (message) => {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.elements['name']?.value.trim();
      const email = contactForm.elements['email']?.value.trim();
      const subject = contactForm.elements['subject']?.value.trim();
      const message = contactForm.elements['message']?.value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        showToast(`Thank you, ${name}! Your message has been sent.`);
      }, 1000);
    });
  }

  // Copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailAddress = 'jaredgatdula@gmail.com';
      navigator.clipboard.writeText(emailAddress).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy. Please manually copy the email.');
      });
    });
  }

});
