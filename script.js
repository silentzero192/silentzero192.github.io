(function () {
  const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

  const TERMINAL_LINES = [
    "$ whoami",
    "> Alex Chen  —  Cyber Security Student",
    "$ cat interests.txt",
    "> Ethical Hacking | Network Security | CTF",
    "$ status",
    "> Learning. Building. Securing."
  ];

  const SKILLS = [
    { name: "Linux / Bash", level: 72, icon: "terminal" },
    { name: "Network Fundamentals", level: 65, icon: "network" },
    { name: "Python", level: 68, icon: "code" },
    { name: "Web Security Basics", level: 60, icon: "globe" },
    { name: "CTF & Bug Hunting", level: 55, icon: "bug" },
    { name: "Cryptography Basics", level: 50, icon: "key" }
  ];

  const PROJECTS = [
    {
      title: "Port Scanner",
      tag: "Python Tool",
      desc: "Built a multi-threaded TCP port scanner in Python that identifies open services on a target host. Learned socket programming and basic recon techniques.",
      tech: ["Python", "Sockets", "Threading"],
      icon: "network",
      color: "#00d4aa"
    },
    {
      title: "Password Manager CLI",
      tag: "Cryptography",
      desc: "A command-line password manager using AES-256 encryption and PBKDF2 key derivation. Stores encrypted credentials in a local SQLite database.",
      tech: ["Python", "AES-256", "SQLite"],
      icon: "lock",
      color: "#3b82f6"
    },
    {
      title: "CTF Write-ups Blog",
      tag: "Learning Journal",
      desc: "Documenting my journey through TryHackMe and HackTheBox challenges. Covers topics like privilege escalation, reverse shells, and OSINT.",
      tech: ["TryHackMe", "HackTheBox", "OSINT"],
      icon: "shield",
      color: "#f59e0b"
    },
    {
      title: "Network Packet Analyzer",
      tag: "Networking",
      desc: "Simple packet sniffer using Python Scapy to capture and analyze network traffic. Helps visualize TCP/IP headers and DNS queries.",
      tech: ["Python", "Scapy", "Wireshark"],
      icon: "globe",
      color: "#8b5cf6"
    }
  ];

  const TOOLS = [
    "Kali Linux",
    "Nmap",
    "Metasploit",
    "Burp Suite",
    "Wireshark",
    "John the Ripper",
    "Gobuster",
    "Netcat",
    "Git",
    "Docker",
    "VS Code",
    "Vim"
  ];

  const SOCIALS = [
    { label: "GitHub", icon: "github" },
    { label: "LinkedIn", icon: "linkedin" },
    { label: "Twitter", icon: "twitter" }
  ];

  const Icons = {
    terminal: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>';
    },
    lock: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
    },
    code: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>';
    },
    globe: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>';
    },
    network: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"></circle><circle cx="19" cy="19" r="3"></circle><circle cx="5" cy="19" r="3"></circle><line x1="12" y1="8" x2="12" y2="14"></line><line x1="12" y1="14" x2="5" y2="17"></line><line x1="12" y1="14" x2="19" y2="17"></line></svg>';
    },
    bug: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="8" height="14" rx="4"></rect><path d="M19 7l-3 2M5 7l3 2M19 12h-3M5 12h3M19 17l-3-1M5 17l3-1"></path><path d="M12 6V3"></path></svg>';
    },
    key: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"></circle><path d="M21 2l-9.6 9.6M15.5 7.5l3 3"></path></svg>';
    },
    shield: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>';
    },
    sun: function () {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    },
    moon: function () {
      return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    },
    menu: function () {
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    },
    close: function () {
      return '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
    },
    github: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"></path></svg>';
    },
    linkedin: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>';
    },
    twitter: function (size) {
      return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>';
    },
    arrow: function () {
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>';
    }
  };

  function iconByName(name, size) {
    if (!Object.prototype.hasOwnProperty.call(Icons, name)) {
      return "";
    }

    if (typeof size === "number") {
      return Icons[name](size);
    }

    return Icons[name]();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function withAlpha(hex, alpha) {
    var clean = hex.replace("#", "");
    var full = clean.length === 3
      ? clean.split("").map(function (part) { return part + part; }).join("")
      : clean;
    var intVal = parseInt(full, 16);
    var r = (intVal >> 16) & 255;
    var g = (intVal >> 8) & 255;
    var b = intVal & 255;

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  var desktopNav = document.getElementById("desktop-nav");
  var mobileMenu = document.getElementById("mobile-menu");
  var footerLinks = document.getElementById("footer-links");
  var themeToggle = document.getElementById("theme-toggle");
  var menuToggle = document.getElementById("menu-toggle");
  var skillsGrid = document.getElementById("skills-grid");
  var projectsGrid = document.getElementById("projects-grid");
  var toolsList = document.getElementById("tools-list");
  var socialLinks = document.getElementById("social-links");
  var terminalLines = document.getElementById("terminal-lines");

  var dark = true;
  var menuOpen = false;
  var activeSection = "Home";
  var skillsVisible = false;

  function renderNavigation() {
    desktopNav.innerHTML = NAV_LINKS.map(function (link) {
      return '<button type="button" class="nav-link" data-link="' + link + '" data-scroll="' + link.toLowerCase() + '">' + link + "</button>";
    }).join("");

    mobileMenu.innerHTML = NAV_LINKS.map(function (link) {
      return '<button type="button" class="nav-link" data-link="' + link + '" data-scroll="' + link.toLowerCase() + '" style="text-align: left; width: 100%;">' + link + "</button>";
    }).join("");

    footerLinks.innerHTML = NAV_LINKS.map(function (link) {
      return '<button type="button" class="footer-link" data-scroll="' + link.toLowerCase() + '">' + link + "</button>";
    }).join("");
  }

  function renderSkills() {
    skillsGrid.innerHTML = SKILLS.map(function (skill) {
      return [
        '<div class="card skill-card">',
        '  <div class="skill-head">',
        '    <div class="skill-main">',
        '      <div class="skill-icon">' + iconByName(skill.icon, 18) + "</div>",
        '      <span class="skill-name">' + escapeHtml(skill.name) + "</span>",
        "    </div>",
        '    <span class="skill-level">' + skill.level + "%</span>",
        "  </div>",
        '  <div class="skill-track">',
        '    <div class="skill-bar-fill" data-level="' + skill.level + '"></div>',
        "  </div>",
        "</div>"
      ].join("");
    }).join("");
  }

  function renderProjects() {
    projectsGrid.innerHTML = PROJECTS.map(function (project) {
      var color15 = withAlpha(project.color, 0.082353);
      var color30 = withAlpha(project.color, 0.188235);
      var color12 = withAlpha(project.color, 0.070588);
      var color25 = withAlpha(project.color, 0.145098);

      return [
        '<div class="card project-card" style="--project-color: ' + project.color + '; --project-color-15: ' + color15 + '; --project-color-30: ' + color30 + '; --project-color-12: ' + color12 + '; --project-color-25: ' + color25 + ';">',
        '  <div class="project-head">',
        '    <div class="project-icon-wrap">' + iconByName(project.icon, 28) + "</div>",
        '    <span class="project-badge">' + escapeHtml(project.tag) + "</span>",
        "  </div>",
        '  <h3 class="project-title">' + escapeHtml(project.title) + "</h3>",
        '  <p class="project-desc">' + escapeHtml(project.desc) + "</p>",
        '  <div class="project-tech">' + project.tech.map(function (item) {
          return '<span class="tag">' + escapeHtml(item) + "</span>";
        }).join("") + "</div>",
        '  <button type="button" class="project-link">' + iconByName("github", 16) + " View on GitHub " + iconByName("arrow") + "</button>",
        "</div>"
      ].join("");
    }).join("");
  }

  function renderTools() {
    toolsList.innerHTML = TOOLS.map(function (tool) {
      return '<span class="tag">' + escapeHtml(tool) + "</span>";
    }).join("");
  }

  function renderSocial() {
    socialLinks.innerHTML = SOCIALS.map(function (entry) {
      return '<button type="button" class="social-btn">' + iconByName(entry.icon, 20) + " " + escapeHtml(entry.label) + "</button>";
    }).join("");
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    themeToggle.innerHTML = dark ? iconByName("sun") : iconByName("moon");
  }

  function setMenuOpen(open) {
    menuOpen = open;
    mobileMenu.classList.toggle("open", menuOpen);
    menuToggle.innerHTML = menuOpen ? iconByName("close") : iconByName("menu");
  }

  function setActiveSection(sectionName) {
    if (activeSection === sectionName) {
      return;
    }

    activeSection = sectionName;
    var navButtons = document.querySelectorAll(".nav-link[data-link]");
    navButtons.forEach(function (button) {
      button.classList.toggle("active", button.getAttribute("data-link") === activeSection);
    });
  }

  function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }

  function updateScrollSpy() {
    NAV_LINKS.forEach(function (id) {
      var section = document.getElementById(id.toLowerCase());
      if (!section) {
        return;
      }

      var top = section.getBoundingClientRect().top;
      if (top <= 120 && top > -400) {
        setActiveSection(id);
      }
    });
  }

  function renderTerminal(displayedLines) {
    terminalLines.innerHTML = displayedLines.map(function (line, index) {
      var lineClass = "";
      if (line.indexOf("$") === 0) {
        lineClass = "command";
      } else if (line.indexOf(">") === 0) {
        lineClass = "output";
      }

      var cursor = index === displayedLines.length - 1 ? '<span class="terminal-cursor">█</span>' : "";
      return '<div class="terminal-line ' + lineClass + '">' + escapeHtml(line) + cursor + "</div>";
    }).join("");
  }

  function startTypingEffect() {
    var displayed = [];
    var lineIndex = 0;
    var charIndex = 0;

    function step() {
      if (lineIndex >= TERMINAL_LINES.length) {
        return;
      }

      if (charIndex < TERMINAL_LINES[lineIndex].length) {
        setTimeout(function () {
          if (!displayed[lineIndex]) {
            displayed[lineIndex] = "";
          }

          displayed[lineIndex] += TERMINAL_LINES[lineIndex][charIndex];
          charIndex += 1;
          renderTerminal(displayed);
          step();
        }, 50);
      } else {
        setTimeout(function () {
          lineIndex += 1;
          charIndex = 0;
          step();
        }, 400);
      }
    }

    renderTerminal(displayed);
    step();
  }

  function revealSkillBars() {
    if (skillsVisible) {
      return;
    }

    skillsVisible = true;
    document.querySelectorAll(".skill-bar-fill").forEach(function (bar) {
      var level = bar.getAttribute("data-level");
      bar.style.width = level + "%";
    });
  }

  function initSkillsObserver() {
    var skillsSection = document.getElementById("skills");
    if (!skillsSection) {
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      var entry = entries[0];
      if (entry.isIntersecting) {
        revealSkillBars();
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
  }

  function bindEvents() {
    themeToggle.addEventListener("click", function () {
      dark = !dark;
      applyTheme();
    });

    menuToggle.addEventListener("click", function () {
      setMenuOpen(!menuOpen);
    });

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-scroll]");
      if (!trigger) {
        return;
      }

      var targetId = trigger.getAttribute("data-scroll");
      if (!targetId) {
        return;
      }

      event.preventDefault();
      scrollToSection(targetId);
    });

    window.addEventListener("scroll", updateScrollSpy, { passive: true });
  }

  function init() {
    renderNavigation();
    renderSkills();
    renderProjects();
    renderTools();
    renderSocial();

    bindEvents();

    applyTheme();
    setMenuOpen(false);
    setActiveSection("Home");
    updateScrollSpy();
    startTypingEffect();
    initSkillsObserver();
  }

  init();
})();
