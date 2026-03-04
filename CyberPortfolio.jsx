import { useState, useEffect, useRef } from "react";

// ── Google Fonts injected once ──────────────────────────────────────────────
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Outfit:wght@300;400;500;600&display=swap');
`;

// ── SVG Icons ───────────────────────────────────────────────────────────────
const ShieldIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const TerminalIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);
const LockIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const CodeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const GlobeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const NetworkIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" /><circle cx="19" cy="19" r="3" /><circle cx="5" cy="19" r="3" />
    <line x1="12" y1="8" x2="12" y2="14" /><line x1="12" y1="14" x2="5" y2="17" /><line x1="12" y1="14" x2="19" y2="17" />
  </svg>
);
const BugIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="6" width="8" height="14" rx="4" />
    <path d="M19 7l-3 2M5 7l3 2M19 12h-3M5 12h3M19 17l-3-1M5 17l3-1" />
    <path d="M12 6V3" />
  </svg>
);
const KeyIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" /><path d="M21 2l-9.6 9.6M15.5 7.5l3 3" />
  </svg>
);
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);
const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

// ── Animated Shield SVG ─────────────────────────────────────────────────────
const AnimatedShield = ({ accent }) => (
  <div style={{ position: "relative", width: 220, height: 220 }}>
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
      {/* Outer ring */}
      <circle cx="110" cy="110" r="100" stroke={accent} strokeWidth="1" strokeDasharray="4 6" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 110 110" to="360 110 110" dur="20s" repeatCount="indefinite" />
      </circle>
      {/* Mid ring */}
      <circle cx="110" cy="110" r="75" stroke={accent} strokeWidth="1" strokeDasharray="8 4" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate" from="360 110 110" to="0 110 110" dur="14s" repeatCount="indefinite" />
      </circle>
      {/* Shield body */}
      <path d="M110 30 L170 55 L170 110 C170 145 110 175 110 175 C110 175 50 145 50 110 L50 55 Z" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="2" />
      {/* Shield inner */}
      <path d="M110 50 L155 70 L155 110 C155 135 110 157 110 157 C110 157 65 135 65 110 L65 70 Z" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.5" />
      {/* Lock symbol */}
      <rect x="97" y="108" width="26" height="20" rx="3" fill={accent} fillOpacity="0.7" />
      <path d="M103 108 L103 101 C103 96 117 96 117 101 L117 108" stroke={accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="110" cy="118" r="3" fill="#0a0f1e" />
      {/* Pulse dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <circle key={i} cx={110 + 100 * Math.cos((deg * Math.PI) / 180)} cy={110 + 100 * Math.sin((deg * Math.PI) / 180)} r="3" fill={accent} opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="2s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  </div>
);

// ── Hex Grid Background ──────────────────────────────────────────────────────
const HexGrid = ({ dark }) => {
  const color = dark ? "rgba(0,212,170,0.07)" : "rgba(5,150,105,0.06)";
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
          <polygon points="30,2 58,17 58,35 30,50 2,35 2,17" fill="none" stroke={color} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
};

// ── Typing Effect Hook ───────────────────────────────────────────────────────
function useTyping(lines, speed = 60) {
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (idx >= lines.length) { setDone(true); return; }
    if (charIdx < lines[idx].length) {
      const t = setTimeout(() => {
        setCharIdx(c => c + 1);
        setDisplayed(d => {
          const updated = [...d];
          updated[idx] = (updated[idx] || "") + lines[idx][charIdx];
          return updated;
        });
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setIdx(i => i + 1); setCharIdx(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [idx, charIdx, lines, speed]);

  return { displayed, done };
}

// ── Skills data ──────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "Linux / Bash", level: 72, icon: <TerminalIcon size={18} /> },
  { name: "Network Fundamentals", level: 65, icon: <NetworkIcon size={18} /> },
  { name: "Python", level: 68, icon: <CodeIcon size={18} /> },
  { name: "Web Security Basics", level: 60, icon: <GlobeIcon size={18} /> },
  { name: "CTF & Bug Hunting", level: 55, icon: <BugIcon size={18} /> },
  { name: "Cryptography Basics", level: 50, icon: <KeyIcon size={18} /> },
];

const PROJECTS = [
  {
    title: "Port Scanner",
    tag: "Python Tool",
    desc: "Built a multi-threaded TCP port scanner in Python that identifies open services on a target host. Learned socket programming and basic recon techniques.",
    tech: ["Python", "Sockets", "Threading"],
    icon: <NetworkIcon size={28} />,
    color: "#00d4aa",
  },
  {
    title: "Password Manager CLI",
    tag: "Cryptography",
    desc: "A command-line password manager using AES-256 encryption and PBKDF2 key derivation. Stores encrypted credentials in a local SQLite database.",
    tech: ["Python", "AES-256", "SQLite"],
    icon: <LockIcon size={28} />,
    color: "#3b82f6",
  },
  {
    title: "CTF Write-ups Blog",
    tag: "Learning Journal",
    desc: "Documenting my journey through TryHackMe and HackTheBox challenges. Covers topics like privilege escalation, reverse shells, and OSINT.",
    tech: ["TryHackMe", "HackTheBox", "OSINT"],
    icon: <ShieldIcon size={28} />,
    color: "#f59e0b",
  },
  {
    title: "Network Packet Analyzer",
    tag: "Networking",
    desc: "Simple packet sniffer using Python Scapy to capture and analyze network traffic. Helps visualize TCP/IP headers and DNS queries.",
    tech: ["Python", "Scapy", "Wireshark"],
    icon: <GlobeIcon size={28} />,
    color: "#8b5cf6",
  },
];

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

// ── Main Component ───────────────────────────────────────────────────────────
export default function CyberPortfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [visibleSkills, setVisibleSkills] = useState(false);
  const skillsRef = useRef(null);

  const terminalLines = [
    "$ whoami",
    "> Alex Chen  —  Cyber Security Student",
    "$ cat interests.txt",
    "> Ethical Hacking | Network Security | CTF",
    "$ status",
    "> Learning. Building. Securing.",
  ];
  const { displayed } = useTyping(terminalLines, 50);

  // Dark/light palette
  const t = {
    bg: dark ? "#07101f" : "#f0f4f8",
    surface: dark ? "#0d1a2d" : "#ffffff",
    surface2: dark ? "#112236" : "#f8fafc",
    border: dark ? "rgba(0,212,170,0.15)" : "rgba(5,150,105,0.2)",
    text: dark ? "#e2eeff" : "#0f2040",
    textMuted: dark ? "#7a9bb5" : "#4a6380",
    accent: dark ? "#00d4aa" : "#059669",
    accent2: dark ? "#3b82f6" : "#2563eb",
    navBg: dark ? "rgba(7,16,31,0.9)" : "rgba(240,244,248,0.9)",
    cardBg: dark ? "#0d1a2d" : "#ffffff",
    tagBg: dark ? "rgba(0,212,170,0.1)" : "rgba(5,150,105,0.1)",
  };

  // Intersection observer for skills animation
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisibleSkills(true); }, { threshold: 0.3 });
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      NAV_LINKS.forEach(id => {
        const el = document.getElementById(id.toLowerCase());
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 120 && top > -400) setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{FONTS + `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; transition: background 0.3s, color 0.3s; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.accent}; border-radius: 3px; }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 6px;
          transition: all 0.2s;
          color: ${t.textMuted};
          text-decoration: none;
          border: none;
          background: none;
        }
        .nav-link:hover, .nav-link.active {
          color: ${t.accent};
          background: ${t.tagBg};
        }
        .btn-primary {
          background: ${t.accent};
          color: #07101f;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.05em;
          padding: 10px 22px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px ${t.accent}40; }
        .btn-outline {
          background: transparent;
          color: ${t.accent};
          font-family: 'JetBrains Mono', monospace;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 0.05em;
          padding: 10px 22px;
          border: 1px solid ${t.accent}60;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover { background: ${t.tagBg}; border-color: ${t.accent}; }
        .card {
          background: ${t.cardBg};
          border: 1px solid ${t.border};
          border-radius: 14px;
          transition: all 0.3s;
        }
        .card:hover { transform: translateY(-4px); border-color: ${t.accent}60; box-shadow: 0 16px 40px ${dark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.1)"}; }
        .skill-bar-fill { transition: width 1.4s cubic-bezier(.4,0,.2,1); }
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${t.accent};
          display: flex; align-items: center; gap: 8px;
        }
        .section-label::before { content: ''; display: inline-block; width: 20px; height: 1px; background: ${t.accent}; }
        .section-title {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 700;
          color: ${t.text};
          line-height: 1.15;
        }
        .glow { text-shadow: 0 0 30px ${t.accent}80; }
        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 4px;
          background: ${t.tagBg};
          color: ${t.accent};
          border: 1px solid ${t.accent}30;
        }
        @media (max-width: 768px) {
          .hero-grid { flex-direction: column !important; }
          .about-grid { flex-direction: column !important; gap: 32px !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .footer-social { flex-direction: column; align-items: center; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        .mobile-menu {
          position: fixed; top: 70px; left: 0; right: 0;
          background: ${t.navBg};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid ${t.border};
          z-index: 999;
          padding: 16px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .contact-input {
          width: 100%;
          background: ${t.surface2};
          border: 1px solid ${t.border};
          border-radius: 8px;
          padding: 12px 16px;
          color: ${t.text};
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border 0.2s;
        }
        .contact-input:focus { border-color: ${t.accent}; }
        .contact-input::placeholder { color: ${t.textMuted}; }
        .stat-card {
          background: ${t.surface2};
          border: 1px solid ${t.border};
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          transition: all 0.2s;
        }
        .stat-card:hover { border-color: ${t.accent}60; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 ${t.accent}40; }
          70% { box-shadow: 0 0 0 16px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .pulse { animation: pulse-ring 2.5s infinite; }
      `}</style>

      <div style={{ background: t.bg, color: t.text, minHeight: "100vh", transition: "all 0.3s", position: "relative", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: t.navBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, height: 68 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("home")}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${t.accent}15`, border: `1.5px solid ${t.accent}50`, display: "flex", alignItems: "center", justifyContent: "center", color: t.accent }}>
                <ShieldIcon size={20} color={t.accent} />
              </div>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: 16, color: t.text }}>
                Alex<span style={{ color: t.accent }}>Sec</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {NAV_LINKS.map(link => (
                <button key={link} className={`nav-link ${activeSection === link ? "active" : ""}`} onClick={() => scrollTo(link)}>
                  {link}
                </button>
              ))}
            </div>

            {/* Right actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setDark(d => !d)} style={{ width: 36, height: 36, borderRadius: 8, background: t.surface2, border: `1px solid ${t.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.textMuted, transition: "all 0.2s" }}>
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>
              <button className="mobile-menu-btn" onClick={() => setMenuOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: 8, background: t.surface2, border: `1px solid ${t.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: t.text }}>
                {menuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map(link => (
              <button key={link} className={`nav-link ${activeSection === link ? "active" : ""}`} onClick={() => scrollTo(link)} style={{ textAlign: "left", width: "100%" }}>
                {link}
              </button>
            ))}
          </div>
        )}

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", paddingTop: 68, position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <HexGrid dark={dark} />

          {/* Radial glow */}
          <div style={{ position: "absolute", top: "30%", left: "60%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}18 0%, transparent 70%)`, pointerEvents: "none", transform: "translate(-50%,-50%)" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative", zIndex: 1 }}>
            <div className="hero-grid" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, flexWrap: "wrap" }}>

              {/* Left */}
              <div style={{ flex: "1 1 420px", maxWidth: 560 }}>
                <div className="section-label fade-up" style={{ marginBottom: 16 }}>
                  Security Researcher in Training
                </div>
                <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(36px, 6vw, 58px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, animation: "fadeUp 0.8s ease 0.1s both" }}>
                  <span style={{ color: t.text }}>Securing the</span><br />
                  <span style={{ color: t.accent }} className="glow">Digital World</span><br />
                  <span style={{ color: t.text }}>One Byte</span>{" "}
                  <span style={{ color: t.accent2 }}>at a Time</span>
                </h1>
                <p style={{ color: t.textMuted, lineHeight: 1.7, fontSize: 15, marginBottom: 32, animation: "fadeUp 0.8s ease 0.2s both", maxWidth: 480 }}>
                  A passionate cybersecurity student exploring ethical hacking, network security, and CTF challenges. Building solid fundamentals to protect systems and people.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.3s both" }}>
                  <button className="btn-primary pulse" onClick={() => scrollTo("projects")}>
                    View Projects <ArrowIcon />
                  </button>
                  <button className="btn-outline" onClick={() => scrollTo("contact")}>
                    Contact Me
                  </button>
                </div>

                {/* Stats row */}
                <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap", animation: "fadeUp 0.8s ease 0.4s both" }}>
                  {[["4+", "Projects Built"], ["50+", "CTF Challenges"], ["1yr+", "Learning Journey"]].map(([num, label]) => (
                    <div key={label}>
                      <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 24, fontWeight: 700, color: t.accent }}>{num}</div>
                      <div style={{ fontSize: 11, color: t.textMuted, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.05em" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Terminal + Shield */}
              <div style={{ flex: "0 1 420px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, animation: "fadeUp 0.9s ease 0.2s both" }}>
                <AnimatedShield accent={t.accent} />

                {/* Terminal box */}
                <div style={{ width: "100%", maxWidth: 380, background: dark ? "#050c18" : "#1a2332", borderRadius: 12, border: `1px solid ${t.border}`, overflow: "hidden" }}>
                  {/* Terminal bar */}
                  <div style={{ padding: "10px 14px", background: dark ? "#0d1829" : "#243044", display: "flex", alignItems: "center", gap: 8 }}>
                    {["#ef4444", "#f59e0b", "#22c55e"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a7a99", marginLeft: 8 }}>alex@terminal:~$</span>
                  </div>
                  <div style={{ padding: "14px 16px", minHeight: 120 }}>
                    {displayed.map((line, i) => (
                      <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.8, color: line.startsWith("$") ? t.accent : line.startsWith(">") ? "#7dd3fc" : t.textMuted }}>
                        {line}
                        {i === displayed.length - 1 && <span style={{ animation: "fadeUp 0.5s infinite alternate", color: t.accent }}>█</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: "100px 24px", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", right: 0, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent2}12 0%, transparent 70%)`, transform: "translateY(-50%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Who I Am</div>
            <h2 className="section-title" style={{ marginBottom: 60 }}>
              About <span style={{ color: t.accent }}>Me</span>
            </h2>

            <div className="about-grid" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>
              {/* Left — text */}
              <div style={{ flex: "1 1 400px" }}>
                <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                  Hey! I'm <strong style={{ color: t.text }}>Alex Chen</strong>, a cybersecurity student currently pursuing my degree and diving deep into the world of ethical hacking and digital defense.
                </p>
                <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>
                  I'm passionate about understanding how systems work under the hood — so I can better understand how they fail. From poking at CTF challenges to writing Python tools for recon, I'm building a foundation one skill at a time.
                </p>
                <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
                  Currently grinding through <strong style={{ color: t.accent }}>TryHackMe</strong> and <strong style={{ color: t.accent }}>HackTheBox</strong> to sharpen my practical skills. My goal: land an internship in offensive security or SOC analysis.
                </p>

                {/* Info grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    ["Status", "Student / Learning"],
                    ["Focus", "Ethical Hacking"],
                    ["Location", "Remote / Open"],
                    ["Available", "Internships 2025"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ background: t.surface2, borderRadius: 10, padding: "12px 16px", border: `1px solid ${t.border}` }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: t.accent, textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                      <div style={{ fontSize: 14, color: t.text, fontWeight: 500 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — stat cards */}
              <div style={{ flex: "0 1 340px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[
                    { icon: <ShieldIcon size={26} />, label: "Security Focus", sub: "Offensive & Defensive" },
                    { icon: <TerminalIcon size={26} />, label: "Linux User", sub: "Kali & Arch daily" },
                    { icon: <BugIcon size={26} />, label: "CTF Player", sub: "TryHackMe & HackTheBox" },
                    { icon: <CodeIcon size={26} />, label: "Python Dev", sub: "Scripting & Tooling" },
                  ].map((item) => (
                    <div key={item.label} className="stat-card">
                      <div style={{ color: t.accent, marginBottom: 10 }}>{item.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: t.textMuted }}>{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* Learning platforms */}
                <div style={{ marginTop: 14, background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 12, padding: 18 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em", color: t.accent, textTransform: "uppercase", marginBottom: 14 }}>Learning Platforms</div>
                  {[["TryHackMe", "Top 10%", "#00d4aa"], ["HackTheBox", "Script Kiddie", "#f59e0b"], ["PicoCTF", "Active", "#3b82f6"]].map(([name, rank, color]) => (
                    <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: "8px 12px", background: t.cardBg, borderRadius: 8, border: `1px solid ${t.border}` }}>
                      <span style={{ fontSize: 13, color: t.text }}>{name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color, background: `${color}15`, padding: "2px 8px", borderRadius: 4 }}>{rank}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={skillsRef} style={{ padding: "100px 24px", background: t.surface }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="section-label" style={{ marginBottom: 12 }}>What I Know</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              My <span style={{ color: t.accent }}>Skills</span>
            </h2>
            <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 56, maxWidth: 500 }}>
              Still learning and growing — these are the areas I've been actively studying and practicing.
            </p>

            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {SKILLS.map((skill) => (
                <div key={skill.name} className="card" style={{ padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ color: t.accent }}>{skill.icon}</div>
                      <span style={{ fontWeight: 500, fontSize: 14, color: t.text }}>{skill.name}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: t.accent }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 4, background: t.surface2, overflow: "hidden" }}>
                    <div
                      className="skill-bar-fill"
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                        width: visibleSkills ? `${skill.level}%` : "0%",
                        boxShadow: `0 0 8px ${t.accent}60`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tool badges */}
            <div style={{ marginTop: 48 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.15em", color: t.textMuted, textTransform: "uppercase", marginBottom: 16 }}>Tools & Technologies</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Kali Linux", "Nmap", "Metasploit", "Burp Suite", "Wireshark", "John the Ripper", "Gobuster", "Netcat", "Git", "Docker", "VS Code", "Vim"].map(tool => (
                  <span key={tool} className="tag">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "100px 24px", position: "relative" }}>
          <div style={{ position: "absolute", top: "40%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent}10 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>What I've Built</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              My <span style={{ color: t.accent }}>Projects</span>
            </h2>
            <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 56, maxWidth: 500 }}>
              Personal projects and tools I've built while learning. Each one taught me something new about security.
            </p>

            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {PROJECTS.map((p) => (
                <div key={p.title} className="card" style={{ padding: 28 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: `${p.color}15`, border: `1px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", color: p.color }}>
                      {p.icon}
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "4px 10px", borderRadius: 4, background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>
                      {p.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 17, fontWeight: 700, color: t.text, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {p.tech.map(t_ => <span key={t_} className="tag">{t_}</span>)}
                  </div>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: p.color, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: "flex", alignItems: "center", gap: 6, padding: 0, transition: "gap 0.2s" }} onMouseEnter={e => e.currentTarget.style.gap = "10px"} onMouseLeave={e => e.currentTarget.style.gap = "6px"}>
                    <GithubIcon size={16} /> View on GitHub <ArrowIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "100px 24px", background: t.surface, position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${t.accent2}10 0%, transparent 70%)`, transform: "translateY(-50%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Get in Touch</div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              Let's <span style={{ color: t.accent }}>Connect</span>
            </h2>
            <p style={{ color: t.textMuted, fontSize: 14, marginBottom: 48, lineHeight: 1.7 }}>
              Whether you want to collaborate on a CTF, discuss cybersecurity, or consider me for an internship — I'd love to hear from you.
            </p>

            {/* Contact form */}
            <div className="card" style={{ padding: 36 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Name</label>
                  <input className="contact-input" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email</label>
                  <input className="contact-input" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Subject</label>
                <input className="contact-input" type="text" placeholder="What's this about?" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>Message</label>
                <textarea className="contact-input" rows={5} placeholder="Tell me more..." style={{ resize: "vertical" }} />
              </div>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }}>
                <MailIcon size={16} /> Send Message
              </button>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
              {[
                { icon: <GithubIcon />, label: "GitHub" },
                { icon: <LinkedinIcon />, label: "LinkedIn" },
                { icon: <TwitterIcon />, label: "Twitter" },
              ].map(({ icon, label }) => (
                <button key={label} style={{ display: "flex", alignItems: "center", gap: 8, background: t.surface2, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 18px", cursor: "pointer", color: t.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textMuted; }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${t.border}`, padding: "28px 24px", background: t.bg }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldIcon size={16} color={t.accent} />
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 13, color: t.text }}>
                Alex<span style={{ color: t.accent }}>Sec</span>
              </span>
            </div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.textMuted }}>
              © 2025 Alex Chen · Built with React · Stay Curious, Stay Secure
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              {NAV_LINKS.map(l => (
                <button key={l} onClick={() => scrollTo(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: t.textMuted, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = t.accent}
                  onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
