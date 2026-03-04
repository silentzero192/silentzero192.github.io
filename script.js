/* ============================================================
   CyberPortfolio — script.js
   Replaces all React state / hooks with vanilla JS
   ============================================================ */

// ── Theme ─────────────────────────────────────────────────────────────────────
let dark = true; // Start dark

function applyTheme() {
  if (dark) {
    document.documentElement.classList.remove('light-mode');
    document.getElementById('sunIcon').style.display  = '';
    document.getElementById('moonIcon').style.display = 'none';
  } else {
    document.documentElement.classList.add('light-mode');
    document.getElementById('sunIcon').style.display  = 'none';
    document.getElementById('moonIcon').style.display = '';
  }
}

document.getElementById('themeToggle').addEventListener('click', function () {
  dark = !dark;
  applyTheme();
});

applyTheme();

// ── Mobile Menu ───────────────────────────────────────────────────────────────
let menuOpen = false;

function closeMobileMenu() {
  menuOpen = false;
  document.getElementById('mobileMenu').style.display = 'none';
  document.getElementById('menuIcon').style.display  = '';
  document.getElementById('closeIcon').style.display = 'none';
  // sync active class in mobile menu
  syncMobileActive();
}

document.getElementById('menuToggle').addEventListener('click', function () {
  menuOpen = !menuOpen;
  document.getElementById('mobileMenu').style.display = menuOpen ? 'flex' : 'none';
  document.getElementById('menuIcon').style.display  = menuOpen ? 'none' : '';
  document.getElementById('closeIcon').style.display = menuOpen ? '' : 'none';
});

// ── Scroll helper ─────────────────────────────────────────────────────────────
function scrollTo(id) {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// expose globally (used by inline onclick in HTML)
window.scrollTo = scrollTo;
window.closeMobileMenu = closeMobileMenu;

// ── Scroll Spy ────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
let activeSection = 'Home';

function setActiveSection(name) {
  activeSection = name;
  // desktop nav
  document.querySelectorAll('#desktopNav .nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === name);
  });
  // mobile nav
  syncMobileActive();
}

function syncMobileActive() {
  document.querySelectorAll('#mobileMenu .nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === activeSection);
  });
}

window.addEventListener('scroll', function () {
  NAV_LINKS.forEach(id => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const { top } = el.getBoundingClientRect();
      if (top <= 120 && top > -400) setActiveSection(id);
    }
  });
});

// ── Typing animation ───────────────────────────────────────────────────────────
const terminalLines = [
  '$ whoami',
  '> Alex Chen  —  Cyber Security Student',
  '$ cat interests.txt',
  '> Ethical Hacking | Network Security | CTF',
  '$ status',
  '> Learning. Building. Securing.',
];

const SPEED = 50;   // ms per character
const LINE_PAUSE = 400; // ms between lines

let lineIdx  = 0;
let charIdx  = 0;
let displayed = [];
let typingTimer = null;

const termBody = document.getElementById('terminalBody');

function renderTerminal() {
  termBody.innerHTML = '';
  displayed.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'terminal-line ' + (
      text.startsWith('$') ? 'terminal-line--cmd' :
      text.startsWith('>') ? 'terminal-line--out'  : 'terminal-line--muted'
    );
    // Add cursor to last line
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
  if (lineIdx >= terminalLines.length) {
    // Done — show static cursor at end
    renderTerminal();
    return;
  }

  const currentLine = terminalLines[lineIdx];

  if (charIdx < currentLine.length) {
    // Append next character
    if (!displayed[lineIdx]) displayed[lineIdx] = '';
    displayed[lineIdx] += currentLine[charIdx];
    charIdx++;
    renderTerminal();
    typingTimer = setTimeout(typeNext, SPEED);
  } else {
    // Line complete — move to next line after pause
    lineIdx++;
    charIdx = 0;
    typingTimer = setTimeout(typeNext, LINE_PAUSE);
  }
}

typeNext();

// ── Skill bars — IntersectionObserver ────────────────────────────────────────
const skillsSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const level = bar.getAttribute('data-level');
      bar.style.width = level + '%';
    });
    skillObserver.disconnect();
  }
}, { threshold: 0.3 });

if (skillsSection) skillObserver.observe(skillsSection);
