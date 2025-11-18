// script.js
(function() {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Theme persistence
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const initial = saved ? saved : (prefersDark ? 'theme-dark' : 'theme-light');
  document.body.className = initial;

  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    const next = document.body.classList.contains('theme-dark') ? 'theme-light' : 'theme-dark';
    document.body.className = next;
    localStorage.setItem('theme', next);
  });

  // Minimal network animation background
  const canvas = document.getElementById('netCanvas');
  const ctx = canvas.getContext('2d');
  let points = [];
  let w = 0, h = 0;

  function resize() {
    w = canvas.width = canvas.clientWidth;
    h = canvas.height = canvas.clientHeight;
    points = Array.from({ length: Math.max(40, Math.floor(w / 30)) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function step() {
    ctx.clearRect(0, 0, w, h);
    // draw lines
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      for (let j = i + 1; j < points.length; j++) {
        const q = points[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist2 = dx*dx + dy*dy;
        if (dist2 < 120*120) {
          const alpha = Math.max(0.05, 1 - dist2 / (120*120));
          ctx.strokeStyle = `rgba(106,169,255,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
      // draw point
      ctx.fillStyle = 'rgba(155,255,214,0.8)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();
