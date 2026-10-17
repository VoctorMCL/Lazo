import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CATEGORY_COLORS } from '../core/data';

const PALETTE = [
  CATEGORY_COLORS.jade.hex,
  CATEGORY_COLORS.gold.hex,
  CATEGORY_COLORS.teal.hex,
  CATEGORY_COLORS.plum.hex,
  CATEGORY_COLORS.clay.hex,
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function density(w: number, h: number) {
  return Math.max(30, Math.min(72, Math.round((w * h) / 22000)));
}

interface Particle {
  x: number;
  y: number;
  baseX: number;
  r: number;
  color: string;
  baseAlpha: number;
  speed: number;
  driftAmp: number;
  driftSpeed: number;
  phase: number;
}

@Component({
  selector: 'app-particles',
  template: `<canvas #canvas id="bg-particles" class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true"></canvas>`,
})
export class Particles implements OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private dpr = 1;
  private particles: Particle[] = [];
  private rafId: number | null = null;
  private lastTime = 0;
  private resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  private readonly prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  constructor() {
    afterNextRender(() => this.init());
  }

  private init() {
    const canvas = this.canvasRef().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    document.addEventListener('visibilitychange', this.onVisibility);
    window.addEventListener('resize', this.onResize);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    if (this.prefersReducedMotion) this.drawStatic();
    else this.start();
  }

  private onVisibility = () => {
    if (document.hidden) this.stop();
    else if (!this.prefersReducedMotion) this.start();
  };

  private onResize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resize();
      if (this.prefersReducedMotion) this.drawStatic();
    }, 150);
  };

  private createParticle(x: number, y: number): Particle {
    return {
      x,
      y,
      baseX: x,
      r: rand(1, 2.6),
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      baseAlpha: rand(0.12, 0.4),
      speed: rand(6, 16),
      driftAmp: rand(8, 28),
      driftSpeed: rand(0.15, 0.4),
      phase: rand(0, Math.PI * 2),
    };
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const canvas = this.canvasRef().nativeElement;
    canvas.width = Math.round(this.width * this.dpr);
    canvas.height = Math.round(this.height * this.dpr);
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const target = density(this.width, this.height);
    if (this.particles.length === 0) {
      this.particles = Array.from({ length: target }, () =>
        this.createParticle(rand(0, this.width), rand(0, this.height))
      );
    } else if (this.particles.length < target) {
      while (this.particles.length < target) {
        this.particles.push(this.createParticle(rand(0, this.width), this.height + rand(10, 60)));
      }
    } else {
      this.particles.length = target;
    }
  }

  private drawStatic() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseAlpha;
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  private start() {
    if (this.rafId !== null) return;
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private stop() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = (now: number) => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      p.y -= p.speed * dt;
      p.phase += p.driftSpeed * dt;
      p.x = p.baseX + Math.sin(p.phase) * p.driftAmp;
      if (p.y < -10) {
        p.y = this.height + Math.random() * 30 + 10;
        p.baseX = Math.random() * this.width;
        p.x = p.baseX;
      }
      const fade = Math.min(1, Math.min(p.y / 40, (this.height - p.y) / 40 + 0.6));
      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.baseAlpha * Math.max(0, Math.min(1, fade));
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
    this.rafId = requestAnimationFrame(this.tick);
  };

  ngOnDestroy() {
    this.stop();
    document.removeEventListener('visibilitychange', this.onVisibility);
    window.removeEventListener('resize', this.onResize);
    clearTimeout(this.resizeTimeout);
  }
}
