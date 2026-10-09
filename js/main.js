/* ==========================================================================
   NAV DIGITAL SKILLS - DIGITAL MARKETING AGENCY
   Sector 51B, Chandigarh | Phone: 8198086320
   JavaScript Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header & Shrink Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation Toggle
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openDrawer() {
    mobileDrawer?.classList.add('active');
    drawerOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('active');
    drawerOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const faqHeader = item.querySelector('.faq-header');
    const faqContent = item.querySelector('.faq-content');

    faqHeader?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // Toggle current FAQ item
      if (!isActive) {
        item.classList.add('active');
        if (faqContent) faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
      }
    });
  });

  // 4. Number Counters Animation
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animatedStats = false;

  function animateCounters() {
    if (animatedStats) return;

    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const step = Math.ceil(target / (duration / 20));

      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = prefix + target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = prefix + current + suffix;
        }
      }, 20);
    });

    animatedStats = true;
  }

  // Trigger counter animation when stats section is scrolled into view
  const statsSection = document.querySelector('.stats-banner');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // 5. Contact Form Handler (Client Side Feedback)
  const inquiryForm = document.getElementById('agencyInquiryForm');
  const formMessage = document.getElementById('formResponseMessage');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value;
      const phone = document.getElementById('clientPhone')?.value;

      if (!name || !phone) {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#EF4444';
          formMessage.textContent = 'Please fill in your name and phone number.';
        }
        return;
      }

      // Simulate successful submission
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.color = '#10B981';
          formMessage.innerHTML = `<i class="fas fa-check-circle"></i> Thank you ${name}! Your request has been received. Our Chandigarh Sector 51B team will contact you at ${phone} shortly. Or call us directly at <strong>8198086320</strong>.`;
        }
        inquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Request Free Consultation';
        }
      }, 1200);
    });
  }
});
