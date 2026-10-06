/**
 * IEEE InnovateX 2026 - Main Interactive Scripts
 * Organized by IEEE IAS & RAS Student Branch Chapters, MITS Gwalior
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initThemeToggle();
  initNavigation();
  initScheduleFilter();
  initRegistrationForm();
  initSpeakerModals();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. Live Countdown Timer
   Target: October 24, 2026 09:30:00 AM IST
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetDate = new Date('2026-10-24T09:30:00+05:30').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   2. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const icon = document.getElementById('theme-icon');
  if (!toggleBtn || !icon) return;

  const savedTheme = localStorage.getItem('innovatex_theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    icon.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    icon.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    icon.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('innovatex_theme', isLight ? 'light' : 'dark');
  });
}

/* --------------------------------------------------------------------------
   3. Navigation, Mobile Menu & ScrollSpy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky header class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-active');
    const isOpen = navLinks?.classList.contains('mobile-active');
    menuBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  // Close mobile menu when a nav link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('mobile-active');
      if (menuBtn) menuBtn.innerHTML = '&#9776;';
    });
  });

  // ScrollSpy for active nav link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-link[href*='${sectionId}']`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-link[href*='${sectionId}']`)?.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Schedule Filter Tabs
   -------------------------------------------------------------------------- */
function initScheduleFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.schedule-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const track = card.getAttribute('data-track');
        if (filter === 'all' || track === filter) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Registration Form & Real-time Validation
   -------------------------------------------------------------------------- */
function initRegistrationForm() {
  const form = document.getElementById('innovatex-reg-form');
  const modal = document.getElementById('ticket-modal');
  const closeModalBtn = document.getElementById('close-ticket-modal');
  const downloadTicketBtn = document.getElementById('download-ticket-btn');

  if (!form) return;

  // Real-time field validation
  const nameInput = document.getElementById('reg-name');
  const emailInput = document.getElementById('reg-email');
  const phoneInput = document.getElementById('reg-phone');
  const collegeInput = document.getElementById('reg-college');
  const trackSelect = document.getElementById('reg-track');

  const validateField = (input, validator) => {
    const isValid = validator(input.value.trim());
    if (isValid) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
    return isValid;
  };

  nameInput?.addEventListener('input', () => {
    validateField(nameInput, val => val.length >= 3);
  });

  emailInput?.addEventListener('input', () => {
    validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  });

  phoneInput?.addEventListener('input', () => {
    validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val));
  });

  // Autofill Demo Helper Button (if exists)
  const autofillBtn = document.getElementById('btn-autofill-demo');
  autofillBtn?.addEventListener('click', () => {
    if (nameInput) nameInput.value = 'Rohan Deshmukh';
    if (emailInput) emailInput.value = 'rohan.mits@ieee.org';
    if (phoneInput) phoneInput.value = '9876543210';
    if (collegeInput) collegeInput.value = 'Madhav Institute of Technology & Science, Gwalior';
    if (trackSelect) trackSelect.value = 'ras';

    [nameInput, emailInput, phoneInput].forEach(inp => inp?.classList.remove('is-invalid'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, val => val.length >= 3);
    const isEmailValid = validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
    const isPhoneValid = validateField(phoneInput, val => /^[6-9]\d{9}$/.test(val));
    const isTrackValid = trackSelect ? trackSelect.value !== '' : true;

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isTrackValid) {
      // Find first invalid input and focus
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    // Generate Attendee Pass
    const randomId = 'IX26-' + Math.floor(100000 + Math.random() * 900000);
    const trackName = trackSelect ? trackSelect.options[trackSelect.selectedIndex].text : 'General Track';

    document.getElementById('pass-name').textContent = nameInput.value;
    document.getElementById('pass-id').textContent = randomId;
    document.getElementById('pass-email').textContent = emailInput.value;
    document.getElementById('pass-track').textContent = trackName;
    document.getElementById('pass-college').textContent = collegeInput.value || 'MITS Gwalior';

    // Show modal
    if (modal) {
      modal.classList.add('active');
    }

    form.reset();
  });

  closeModalBtn?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  downloadTicketBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* --------------------------------------------------------------------------
   6. Keynote Speaker Abstract Modals
   -------------------------------------------------------------------------- */
function initSpeakerModals() {
  const abstractBtns = document.querySelectorAll('.btn-view-abstract');
  const abstractModal = document.getElementById('speaker-abstract-modal');
  const abstractTitle = document.getElementById('abstract-modal-title');
  const abstractSpeaker = document.getElementById('abstract-modal-speaker');
  const abstractBody = document.getElementById('abstract-modal-body');
  const closeBtn = document.getElementById('close-abstract-modal');

  const speakerDetails = {
    'priya': {
      speaker: 'Dr. Priya Sharma (Autonomous Systems Lab, IEEE RAS)',
      title: 'Next-Gen Autonomous Navigation: From ROS2 Simulation to Real-World Edge Deployment',
      abstract: 'Robotics is undergoing a paradigm shift towards agile edge autonomy. In this keynote, Dr. Priya explores state-of-the-art Simultaneous Localization and Mapping (SLAM), real-time path planning in unstructured environments using ROS 2, and bridging the "sim-to-real" gap. Delegates will discover how lightweight embedded neural networks run on Jetson and STM32 microarchitectures to enable centimeter-level precision navigation in dynamic environments without cloud latency.'
    },
    'vikram': {
      speaker: 'Er. Vikramaditya Sen (Principal IoT Systems Architect, IEEE IAS)',
      title: 'Industrial IoT & Cyber-Physical Systems: Automating High-Precision Manufacturing',
      abstract: 'Industry 4.0 relies on robust, low-latency telemetry connecting field-level programmable logic controllers (PLCs) with smart cloud pipelines. Er. Vikramaditya delves into MQTT over TLS, OPC-UA protocols, SCADA integration, and predictive maintenance algorithms. Delegates will learn how modern industrial plants leverage IAS engineering standards to eliminate downtime and maximize energy efficiency.'
    }
  };

  abstractBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const speakerKey = btn.getAttribute('data-speaker');
      const data = speakerDetails[speakerKey];
      if (data && abstractModal) {
        abstractTitle.textContent = data.title;
        abstractSpeaker.textContent = data.speaker;
        abstractBody.textContent = data.abstract;
        abstractModal.classList.add('active');
      }
    });
  });

  closeBtn?.addEventListener('click', () => {
    abstractModal?.classList.remove('active');
  });

  abstractModal?.addEventListener('click', (e) => {
    if (e.target === abstractModal) {
      abstractModal.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   7. Back to Top Button
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
