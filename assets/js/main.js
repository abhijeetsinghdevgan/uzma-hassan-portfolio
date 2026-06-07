/* ============================================
   UZMA HASSAN — SEO PORTFOLIO
   main.js
   ============================================ */

(function () {
  'use strict';

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ── Mobile hamburger menu ── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on nav link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      }
    });
  }
  /* ── Fade-up on scroll (IntersectionObserver) ── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12 }
  );
  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ── Skill bars animation ── */
  const skillSection = document.getElementById('skills');
  if (skillSection) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
              bar.style.width = bar.dataset.width + '%';
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    barObserver.observe(skillSection);
  }

  /* ── Active nav link on scroll ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle(
              'active-nav',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => sectionObserver.observe(s));

  /* ── Smooth hero entrance ── */
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#hero .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 + i * 120);
    });
  });

})();
