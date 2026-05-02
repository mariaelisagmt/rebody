/* ── REBODY — script.js ── */

/* ─── A. PARTICLE NETWORK ─────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let   pts    = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn(n) {
    pts = [];
    for (let i = 0; i < n; i++) {
      pts.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r:  Math.random() * 1.2 + 0.4
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 215, 0, 0.55)';
      ctx.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(255, 215, 0, ' + (0.12 * (1 - d / 130)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () { resize(); spawn(75); });
  resize();
  spawn(75);
  draw();
})();

/* ─── B. TYPING EFFECT ────────────────────────────────── */
(function initTypewriter() {
  const el   = document.getElementById('typewriter');
  const text = '"They can erase your memory. They cannot buy your soul."';
  let   i    = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i) + (i < text.length ? '|' : '');
      i++;
      setTimeout(type, 58);
    } else {
      /* blinking cursor after finishing */
      let show = false;
      setInterval(function () {
        el.textContent = text + (show ? '|' : ' ');
        show = !show;
      }, 530);
    }
  }

  setTimeout(type, 1600);
})();

/* ─── C. GLITCH EFFECT ────────────────────────────────── */
(function initGlitch() {
  const h1 = document.querySelector('.hero h1');

  function glitch() {
    h1.classList.add('glitching');
    setTimeout(function () { h1.classList.remove('glitching'); }, 520);
  }

  setTimeout(glitch, 600);
  setInterval(glitch, 4200);
})();

/* ─── D. SCROLL FADE-IN (IntersectionObserver) ─────────── */
(function initScrollFade() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });
})();

/* ─── E. NAV SCROLL STYLE ─────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ─── F. CHARACTER CARD FLIP ──────────────────────────── */
(function initCardFlip() {
  document.querySelectorAll('.char-card').forEach(function (card) {
    card.addEventListener('click', function () {
      card.querySelector('.card-inner').classList.toggle('flipped');
    });
  });
})();
