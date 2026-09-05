(function () {
  const leftSvg = document.getElementById("roots-left");
  const rightSvg = document.getElementById("roots-right");
  if (!leftSvg && !rightSvg) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const SVG_NS = "http://www.w3.org/2000/svg";

  const PALETTE = {
    left: ["#2F6E5B", "#2E7E82", "#6B7A3E"],
    right: ["#6B4A6B", "#8A3E5A", "#4A5A8A"]
  };

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }
  function buildTrunk({ startX, height, corridorMin, corridorMax, segments, driftBias }) {
    let x = startX;
    let y = 0;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;
    const segHeight = height / segments;
    const sprouts = [];

    for (let i = 0; i < segments; i++) {
      const nextY = y + segHeight * rand(0.72, 1.28);
      const drift = rand(-24, 24) + driftBias * rand(3, 11);
      const nextX = clamp(x + drift, corridorMin, corridorMax);

      const c1x = clamp(x + rand(-20, 20), corridorMin - 10, corridorMax + 10);
      const c1y = y + segHeight * rand(0.2, 0.55);
      const c2x = clamp(nextX + rand(-20, 20), corridorMin - 10, corridorMax + 10);
      const c2y = nextY - segHeight * rand(0.2, 0.55);

      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;

      if (i > 0 && i < segments - 1 && Math.random() < 0.5) {
        sprouts.push({ x: nextX, y: nextY, dir: drift >= 0 ? 1 : -1 });
      }

      x = nextX;
      y = nextY;
    }
    return { d, sprouts };
  }

  function buildHair(originX, originY, dir, corridorMin, corridorMax) {
    const len = rand(50, 150);
    const segs = 2 + Math.round(rand(0, 1));
    let x = originX, y = originY;
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;

    for (let i = 0; i < segs; i++) {
      const nextY = y + len / segs;
      const nextX = clamp(x + dir * rand(8, 32) + rand(-8, 8), corridorMin, corridorMax);
      const c1x = x + dir * rand(4, 14);
      const c1y = y + (len / segs) * 0.4;
      const c2x = nextX - dir * rand(4, 14);
      const c2y = nextY - (len / segs) * 0.4;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;
      x = nextX;
      y = nextY;
    }
    return d;
  }

  function makePath(d, { stroke, width, opacity, delay, duration, swayDur, swayDelay, driftDur }) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", stroke);
    path.setAttribute("stroke-width", width.toFixed(2));
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("opacity", opacity.toFixed(2));
    path.setAttribute("pathLength", "100");
    path.classList.add("root-path");
    if (prefersReducedMotion) {
      path.classList.add("root-path--static");
    } else {
      path.style.setProperty("--draw-delay", `${delay.toFixed(2)}s`);
      path.style.setProperty("--draw-dur", `${duration.toFixed(2)}s`);
      path.style.setProperty("--sway-dur", `${swayDur.toFixed(2)}s`);
      path.style.setProperty("--sway-delay", `${swayDelay.toFixed(2)}s`);
      path.style.setProperty("--drift-dur", `${driftDur.toFixed(2)}s`);
    }
    return path;
  }

  function populate(svg, side) {
    if (!svg) return;
    svg.innerHTML = "";
    const colors = PALETTE[side];
    const corridorMin = side === "left" ? -15 : -5;
    const corridorMax = side === "left" ? 115 : 135;
    const trunkCount = Math.random() < 0.5 ? 2 : 3;
    let delay = rand(0.05, 0.2);

    for (let t = 0; t < trunkCount; t++) {
      const startX = rand(20, 100);
      const height = rand(780, 940);
      const segments = 5 + Math.round(rand(0, 3));
      const driftBias = side === "left" ? rand(-1, 0.5) : rand(-0.5, 1);

      const { d, sprouts } = buildTrunk({ startX, height, corridorMin, corridorMax, segments, driftBias });

      svg.appendChild(makePath(d, {
        stroke: pick(colors),
        width: rand(1, 1.9),
        opacity: rand(0.2, 0.34),
        delay,
        duration: rand(2.2, 3.4),
        swayDur: rand(8, 16),
        swayDelay: rand(1.5, 4),
        driftDur: rand(11, 19)
      }));

      sprouts.forEach((s) => {
        const hairD = buildHair(s.x, s.y, s.dir, corridorMin - 15, corridorMax + 15);
        svg.appendChild(makePath(hairD, {
          stroke: pick(colors),
          width: rand(0.35, 0.7),
          opacity: rand(0.09, 0.18),
          delay: delay + rand(0.6, 1.5),
          duration: rand(1.1, 2),
          swayDur: rand(10, 18),
          swayDelay: rand(2, 5),
          driftDur: rand(13, 20)
        }));
      });

      delay += rand(0.15, 0.35);
    }
  }

  function init() {
    populate(leftSvg, "left");
    populate(rightSvg, "right");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
