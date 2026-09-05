(function () {
  const canvas = document.getElementById("bg-particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const PALETTE = ["#2F6E5B", "#A8763A", "#2E7E82", "#6B4A6B", "#8A5A3E"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0, height = 0;
  let particles = [];
  let rafId = null;
  let lastTime = performance.now();

  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const REPEL_RADIUS = 90;
  const REPEL_STRENGTH = 46;
  let mouseX = -9999, mouseY = -9999;
  let mouseActive = false;

  if (hasFinePointer && !prefersReducedMotion) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    }, { passive: true });
    window.addEventListener("mouseleave", () => { mouseActive = false; });
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function densityFor(w, h) {
    const area = w * h;
    return Math.max(18, Math.min(70, Math.round(area / 26000)));
  }

  function makeParticle(w, h, randomizeY = true) {
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    return {
      x: rand(0, w),
      y: randomizeY ? rand(0, h) : h + rand(10, 60),
      r: rand(1, 2.6),
      color,
      baseAlpha: rand(0.12, 0.4),
      speed: rand(6, 16),
      driftAmp: rand(8, 28),
      driftSpeed: rand(0.15, 0.4),
      phase: rand(0, Math.PI * 2),
      baseX: 0
    };
  }

  function resize() {
    const rect = { w: window.innerWidth, h: window.innerHeight };
    width = rect.w;
    height = rect.h;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const targetCount = densityFor(width, height);
    if (particles.length === 0) {
      particles = Array.from({ length: targetCount }, () => makeParticle(width, height));
      particles.forEach(p => (p.baseX = p.x));
    } else if (particles.length < targetCount) {
      const extra = targetCount - particles.length;
      for (let i = 0; i < extra; i++) {
        const p = makeParticle(width, height);
        p.baseX = p.x;
        particles.push(p);
      }
    } else if (particles.length > targetCount) {
      particles.length = targetCount;
    }
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.baseAlpha;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.y -= p.speed * dt;
      p.phase += p.driftSpeed * dt;
      p.x = p.baseX + Math.sin(p.phase) * p.driftAmp;

      if (p.y < -10) {
        p.y = height + rand(10, 40);
        p.baseX = rand(0, width);
        p.x = p.baseX;
      }

      const fade = Math.min(1, Math.min(p.y / 40, (height - p.y) / 40 + 0.6));
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.baseAlpha * Math.max(0, Math.min(1, fade));
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (rafId) return;
    lastTime = performance.now();
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (!prefersReducedMotion) start();
  });

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      if (prefersReducedMotion) drawStatic();
    }, 150);
  });

  resize();
  if (prefersReducedMotion) {
    drawStatic();
  } else {
    start();
  }
})();
