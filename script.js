/* ============================================================
   CyberPortfolio - script.js
   ============================================================ */

// Keep the experience dark-only.
document.documentElement.classList.remove('light-mode');

const currentYear = document.getElementById('currentYear');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

let menuOpen = false;

function closeMobileMenu() {
  menuOpen = false;
  if (mobileMenu) mobileMenu.style.display = 'none';
  if (menuIcon) menuIcon.style.display = '';
  if (closeIcon) closeIcon.style.display = 'none';
}

if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    menuOpen = !menuOpen;
    if (mobileMenu) mobileMenu.style.display = menuOpen ? 'flex' : 'none';
    if (menuIcon) menuIcon.style.display = menuOpen ? 'none' : '';
    if (closeIcon) closeIcon.style.display = menuOpen ? '' : 'none';
  });
}

// ── Smooth section scrolling ─────────────────────────────────────────────────
const SCROLL_OFFSET = 84;
const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'research', 'contact'];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const targetTop = el.getBoundingClientRect().top + window.pageYOffset - SCROLL_OFFSET;
  window.scrollTo({ top: targetTop, behavior: 'smooth' });
}

document.querySelectorAll('[data-scroll-target]').forEach((link) => {
  link.addEventListener('click', function (event) {
    const target = this.getAttribute('data-scroll-target');
    if (!target) return;

    event.preventDefault();
    scrollToSection(target);

    if (this.hasAttribute('data-mobile-link')) {
      closeMobileMenu();
    }
  });
});

// ── Scroll Spy ────────────────────────────────────────────────────────────────
function setActiveSection(id) {
  document.querySelectorAll('#desktopNav .nav-link, #mobileMenu .nav-link').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('data-scroll-target') === id);
  });
}

function updateActiveSection() {
  let currentSection = SECTION_IDS[0];

  SECTION_IDS.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top;
    if (top <= 140) {
      currentSection = id;
    }
  });

  setActiveSection(currentSection);
}

window.addEventListener('scroll', updateActiveSection);
window.addEventListener('load', updateActiveSection);

// ── Typing animation ──────────────────────────────────────────────────────────
const terminalLines = [
  '$ whoami',
  '> Muhammad Jilani - Cyber Security Analyst',
  '$ cat interests.txt',
  '> CTF enthusiast | Red Teaming | Malware Analysis',
  '$ status',
  '> Learning. Building. Securing.',
];

const SPEED = 50;
const LINE_PAUSE = 400;

let lineIdx = 0;
let charIdx = 0;
let displayed = [];
let typingTimer = null;

const termBody = document.getElementById('terminalBody');

function renderTerminal() {
  if (!termBody) return;

  termBody.innerHTML = '';
  displayed.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'terminal-line ' + (
      text.startsWith('$') ? 'terminal-line--cmd' :
      text.startsWith('>') ? 'terminal-line--out' :
      'terminal-line--muted'
    );

    if (i === displayed.length - 1 && lineIdx < terminalLines.length) {
      div.textContent = text;
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.textContent = '█';
      div.appendChild(cursor);
    } else {
      div.textContent = text;
    }

    termBody.appendChild(div);
  });
}

function typeNext() {
  if (!termBody) return;

  if (lineIdx >= terminalLines.length) {
    renderTerminal();
    return;
  }

  const currentLine = terminalLines[lineIdx];

  if (charIdx < currentLine.length) {
    if (!displayed[lineIdx]) displayed[lineIdx] = '';
    displayed[lineIdx] += currentLine[charIdx];
    charIdx++;
    renderTerminal();
    typingTimer = setTimeout(typeNext, SPEED);
  } else {
    lineIdx++;
    charIdx = 0;
    typingTimer = setTimeout(typeNext, LINE_PAUSE);
  }
}

typeNext();

// ── Skill bars ────────────────────────────────────────────────────────────────
const skillsSection = document.getElementById('skills');

if (skillsSection && 'IntersectionObserver' in window) {
  const skillObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
      });
      skillObserver.disconnect();
    }
  }, { threshold: 0.3 });

  skillObserver.observe(skillsSection);
} else {
  document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
    const level = bar.getAttribute('data-level');
    bar.style.width = level + '%';
  });
}

// ── Contact form ──────────────────────────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const mailtoLink =
      'mailto:muhammadjilani192@gmail.com' +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    if (contactFeedback) {
      contactFeedback.textContent = 'Opening your email app with a pre-filled draft...';
    }

    window.location.href = mailtoLink;
  });
}

// Expose helpers for any future inline hooks.
window.closeMobileMenu = closeMobileMenu;
window.scrollToSection = scrollToSection;
