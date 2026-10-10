/**
 * IEEE InnovateX 2026 - Creative Technologist Interactive Core
 * Organized by IEEE IAS & RAS Student Branch Chapters • MITS Gwalior
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Synthesizer (Web Audio API - Zero dependencies)
  window.techAudio = new TechAudioController();

  // 2. Custom Magnetic Glowing Cursor
  initCustomCursor();

  // 3. Mouse-Driven Hero Parallax & Glitch Scramble
  initHeroParallax();
  initTitleScramble();

  // 4. Interactive 3D Tilt Cards with Holographic Sheen
  init3DTiltCards();

  // 5. Interactive Laser-Scan QR Pass
  initInteractiveQRScanner();

  // 6. Hidden Easter Egg: Matrix Digital Rain Terminal
  initMatrixEasterEgg();

  // 7. General Core (Canvas, Timer, ScrollSpy, Forms, Modals)
  initParticleCanvas();
  initCountdown();
  initThemeToggle();
  initNavigation();
  initScrollReveal();
  initScheduleFilter();
  initRegistrationForm();
  initSpeakerModals();
  initBackToTop();

  // 8. Cyber Reactor Portal Background & Hyperspace Subpage Transitions
  initPortalBackground();
});

/* --------------------------------------------------------------------------
   1. Web Audio Synthesizer (Zero External Dependencies)
   -------------------------------------------------------------------------- */
class TechAudioController {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('innovatex_muted') === 'true';
    this.setupButton();
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setupButton() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    this.updateButtonUI(btn);

    btn.addEventListener('click', () => {
      this.init();
      this.muted = !this.muted;
      localStorage.setItem('innovatex_muted', this.muted);
      this.updateButtonUI(btn);
      if (!this.muted) this.playClick();
    });
  }

  updateButtonUI(btn) {
    if (this.muted) {
      btn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      btn.classList.add('muted');
      btn.title = 'Sound: Muted (Click to Enable)';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      btn.classList.remove('muted');
      btn.title = 'Sound: Enabled (Click to Mute)';
    }
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  }

  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playGlitch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.setValueAtTime(880, now + 0.03);
      osc.frequency.setValueAtTime(190, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playLaser() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  playMatrix() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [440, 554, 659, 880, 1108];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.025, this.ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.05 + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.05);
        osc.stop(this.ctx.currentTime + i * 0.05 + 0.09);
      });
    } catch (e) {}
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const chords = [523.25, 659.25, 783.99, 1046.50];
      chords.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.22);
      });
    } catch (e) {}
  }
}

/* --------------------------------------------------------------------------
   2. Custom Interactive Magnetic Cursor
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.innerHTML = '<span class="cursor-label"></span>';
  document.body.appendChild(ring);

  const label = ring.querySelector('.cursor-label');

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Mouse leave/enter document
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Attach hover states with sound and morphing
  const interactiveTargets = document.querySelectorAll('a, button, .tilt-card, .marquee-card, .qr-scanner-box, input, select');

  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('cursor-hover');
      const text = el.getAttribute('data-cursor-text') || (el.tagName === 'BUTTON' || el.tagName === 'A' ? 'CLICK' : '');
      if (text) {
        label.textContent = text;
      } else {
        label.textContent = '';
      }
      if (el.classList.contains('ras-card') || el.classList.contains('badge-ras')) {
        ring.classList.add('cursor-purple');
      }
      if (window.techAudio) window.techAudio.playHover();
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-hover', 'cursor-purple');
      label.textContent = '';
    });

    el.addEventListener('click', () => {
      if (window.techAudio) window.techAudio.playClick();
    });
  });
}

/* --------------------------------------------------------------------------
   3. Mouse-Driven Hero Parallax & Cyber Scramble Animation
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const hero = document.getElementById('hero');
  const heroContent = hero?.querySelector('.hero-content');
  const heroPanel = hero?.querySelector('.hero-card-panel');
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');

  if (!hero) return;

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

    if (heroContent) {
      heroContent.style.transform = `translate(${x * -12}px, ${y * -8}px)`;
    }
    if (heroPanel) {
      heroPanel.style.transform = `translate(${x * 16}px, ${y * 12}px)`;
    }
    if (blob1) {
      blob1.style.transform = `translate(${x * -40}px, ${y * -30}px)`;
    }
    if (blob2) {
      blob2.style.transform = `translate(${x * 50}px, ${y * 35}px)`;
    }
  });
}

function initTitleScramble() {
  const titleEl = document.querySelector('.scramble-title');
  if (!titleEl) return;

  const originalText = titleEl.getAttribute('data-text') || titleEl.textContent;
  const cyberChars = '!<>-_\\/[]{}—=+*^?#________01';

  function scramble() {
    let iteration = 0;
    const interval = setInterval(() => {
      titleEl.innerText = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          return cyberChars[Math.floor(Math.random() * cyberChars.length)];
        })
        .join('');

      if (iteration >= originalText.length) {
        clearInterval(interval);
        titleEl.innerText = originalText;
        titleEl.classList.add('glitch-active');
        setTimeout(() => titleEl.classList.remove('glitch-active'), 500);
      }
      iteration += 1 / 2;
    }, 30);
  }

  // Trigger on load
  setTimeout(scramble, 300);

  // Trigger on click
  titleEl.addEventListener('click', () => {
    if (window.techAudio) window.techAudio.playGlitch();
    scramble();
  });
}

/* --------------------------------------------------------------------------
   4. 3D Tilt Speaker Cards with Holographic Sheen
   -------------------------------------------------------------------------- */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    let sheen = card.querySelector('.card-sheen');
    if (!sheen) {
      sheen = document.createElement('div');
      sheen.className = 'card-sheen';
      card.appendChild(sheen);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      const sheenX = (x / rect.width) * 100;
      const sheenY = (y / rect.height) * 100;
      sheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 240, 255, 0.12) 30%, transparent 65%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Laser-Scan QR Pass
   -------------------------------------------------------------------------- */
function initInteractiveQRScanner() {
  const qrBox = document.querySelector('.qr-scanner-box');
  if (!qrBox) return;

  qrBox.addEventListener('mouseenter', () => {
    if (window.techAudio) window.techAudio.playLaser();
    qrBox.classList.add('scanning');
    setTimeout(() => {
      qrBox.classList.remove('encrypted');
      qrBox.classList.add('decrypted');
    }, 600);
  });

  qrBox.addEventListener('click', () => {
    if (window.techAudio) window.techAudio.playSuccess();
    qrBox.classList.remove('encrypted');
    qrBox.classList.add('decrypted');
    const modal = document.getElementById('ticket-modal');
    if (modal) modal.classList.add('active');
  });
}

/* --------------------------------------------------------------------------
   6. Hidden Easter Egg: Matrix Digital Rain Terminal
   -------------------------------------------------------------------------- */
function initMatrixEasterEgg() {
  const toggleBtn = document.getElementById('matrix-toggle');
  const canvas = document.getElementById('matrix-canvas');
  const notification = document.getElementById('matrix-notification');
  const closeNoticeBtn = document.getElementById('matrix-close-notice');

  if (!canvas || !toggleBtn) return;

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let isActive = false;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    if (isActive) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  });

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}/*&^%$#@!+~';
  const fontSize = 16;
  let columns = Math.floor(width / fontSize);
  let drops = [];

  function resetDrops() {
    columns = Math.floor(width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 20, 0.08)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Cyan accent highlight on leading character
      if (Math.random() > 0.85) {
        ctx.fillStyle = '#00f0ff';
      } else {
        ctx.fillStyle = '#00ff66';
      }

      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animationId = requestAnimationFrame(drawMatrix);
  }

  function toggleMatrix() {
    isActive = !isActive;
    if (window.techAudio) window.techAudio.playMatrix();

    if (isActive) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      resetDrops();
      canvas.classList.add('active');
      toggleBtn.innerHTML = '<i class="fa-solid fa-power-off"></i> <span>EXIT MATRIX</span>';
      toggleBtn.style.borderColor = 'var(--matrix-green)';
      toggleBtn.style.color = 'var(--matrix-green)';
      if (notification) notification.classList.add('visible');
      drawMatrix();
    } else {
      canvas.classList.remove('active');
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, width, height);
      toggleBtn.innerHTML = '<i class="fa-solid fa-terminal"></i> <span>OVERRIDE</span>';
      toggleBtn.style.borderColor = '';
      toggleBtn.style.color = '';
      if (notification) notification.classList.remove('visible');
    }
  }

  toggleBtn.addEventListener('click', toggleMatrix);

  closeNoticeBtn?.addEventListener('click', () => {
    notification?.classList.remove('visible');
  });

  // Hotkey ~ (Tilde)
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      toggleMatrix();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Background Tech Particle Network
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 18), 75);

  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(168, 85, 247,';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const dirX = dx / distance;
          const dirY = dy / distance;
          this.x -= dirX * force * 2.5;
          this.y -= dirY * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color} ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 115) {
          const opacity = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   8. Live Countdown Timer
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
   9. Theme Toggle (Dark / Light Mode)
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
   10. Sticky Glass Navigation & ScrollSpy
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-active');
    const isOpen = navLinks?.classList.contains('mobile-active');
    menuBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('mobile-active');
      if (menuBtn) menuBtn.innerHTML = '&#9776;';
    });
  });

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
   11. Reveal On Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   12. Schedule Filter Tabs
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
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   13. Registration Form & Digital Pass Generation
   -------------------------------------------------------------------------- */
function initRegistrationForm() {
  const form = document.getElementById('innovatex-reg-form');
  const modal = document.getElementById('ticket-modal');
  const closeModalBtn = document.getElementById('close-ticket-modal');
  const downloadTicketBtn = document.getElementById('download-ticket-btn');

  if (!form) return;

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
      form.querySelector('.is-invalid')?.focus();
      return;
    }

    const randomId = 'IX26-' + Math.floor(100000 + Math.random() * 900000);
    const trackName = trackSelect ? trackSelect.options[trackSelect.selectedIndex].text : 'General Track';

    document.getElementById('pass-name').textContent = nameInput.value;
    document.getElementById('pass-id').textContent = randomId;
    document.getElementById('pass-email').textContent = emailInput.value;
    document.getElementById('pass-track').textContent = trackName;
    document.getElementById('pass-college').textContent = collegeInput.value || 'MITS Gwalior';

    if (window.techAudio) window.techAudio.playSuccess();

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
   14. Keynote Speaker Abstract Modals
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
   15. Back to Top Button
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

/* --------------------------------------------------------------------------
   16. Cyber Reactor Portal Background & Hyperspace Subpage Transitions
   -------------------------------------------------------------------------- */
function initPortalBackground() {
  const portalCore = document.querySelector('.portal-reactor-core');
  const portalBackdrop = document.querySelector('.cyber-portal-backdrop');
  const overlay = document.getElementById('portal-transition-overlay');

  // Detect subpage vs home
  const pathname = window.location.pathname;
  const isSubpage = pathname.includes('speakers.html') ||
                    pathname.includes('schedule.html') ||
                    pathname.includes('register.html') ||
                    pathname.includes('tracks.html') ||
                    pathname.includes('about.html') ||
                    document.body.classList.contains('subpage-view');

  if (isSubpage) {
    document.body.classList.add('subpage-view');
    // Subpage arrival sound effect
    setTimeout(() => {
      if (window.techAudio && !window.techAudio.muted) {
        window.techAudio.playLaser();
      }
    }, 120);
  }

  // Interactive mouse parallax on the portal backdrop
  if (portalBackdrop) {
    let mouseX = 0, mouseY = 0;
    let currX = 0, currY = 0;

    window.addEventListener('mousemove', (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      // Parallax translation range: -24px to +24px
      mouseX = ((e.clientX - halfW) / halfW) * 24;
      mouseY = ((e.clientY - halfH) / halfH) * 24;
    }, { passive: true });

    const animateParallax = () => {
      currX += (mouseX - currX) * 0.05;
      currY += (mouseY - currY) * 0.05;
      portalBackdrop.style.transform = `translate3d(${currX.toFixed(2)}px, ${currY.toFixed(2)}px, 0)`;
      requestAnimationFrame(animateParallax);
    };
    requestAnimationFrame(animateParallax);
  }

  // Intercept navigation links targeting subpages / index for warp transition
  const navLinks = document.querySelectorAll('a[href$=".html"], a[href^="index.html"], a.btn-cta, a.brand-logos-group');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // If anchor link or external link, ignore
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.getAttribute('target') === '_blank') {
        return;
      }

      // Avoid intercepting if already on that exact page
      const currentFile = window.location.pathname.split('/').pop() || 'index.html';
      const targetFile = href.split('/').pop();
      if (currentFile === targetFile) return;

      e.preventDefault();

      // Trigger warp laser sound
      if (window.techAudio) {
        window.techAudio.playLaser();
      }

      // Activate hyperdrive warp visual effects
      if (portalCore) {
        portalCore.classList.add('warp-exit');
      }
      if (overlay) {
        overlay.classList.add('active');
      }

      // Delay page hop to let warp animation & sound play
      setTimeout(() => {
        window.location.href = href;
      }, 340);
    });
  });
}

