import { Component, ElementRef, afterNextRender, viewChild } from '@angular/core';

const SVG_NS = 'http://www.w3.org/2000/svg';

interface RootPath {
  d: string;
  width: number;
  opacity: number;
  color: string;
}

interface GrowContext {
  min: number;
  max: number;
  out: RootPath[];
  count: { n: number };
  limit: number;
  maxDepth: number;
}

@Component({
  selector: 'app-roots',
  templateUrl: './roots.html',
})
export class Roots {
  private readonly left = viewChild<ElementRef<SVGSVGElement>>('left');
  private readonly right = viewChild<ElementRef<SVGSVGElement>>('right');
  private prefersReducedMotion = false;

  constructor() {
    this.prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    afterNextRender(() => {
      this.populate(this.left()?.nativeElement, 'left');
      this.populate(this.right()?.nativeElement, 'right');
    });
  }

  private rand(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private randInt(min: number, max: number) {
    return Math.floor(this.rand(min, max + 1));
  }

  private pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v));
  }

  private grow(
    x: number,
    y: number,
    angle: number,
    length: number,
    width: number,
    opacity: number,
    depth: number,
    color: string,
    ctx: GrowContext
  ): void {
    if (depth > ctx.maxDepth || width < 0.18 || length < 8 || ctx.count.n >= ctx.limit) return;

    const segments = depth === 0 ? 6 : this.randInt(3, 4);
    const segLen = length / segments;
    const joints: Array<{ x: number; y: number; angle: number }> = [];
    let d = `M${x.toFixed(1)} ${y.toFixed(1)}`;

    for (let i = 0; i < segments; i++) {
      angle += this.rand(-0.4, 0.4) * (depth === 0 ? 0.7 : 1);
      const step = segLen * this.rand(0.8, 1.25);
      const nx = this.clamp(x + Math.sin(angle) * step, ctx.min, ctx.max);
      const ny = y + Math.cos(angle) * step;
      const cx = (x + nx) / 2 + this.rand(-10, 10);
      const cy = (y + ny) / 2 + this.rand(-4, 4);
      d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)}, ${nx.toFixed(1)} ${ny.toFixed(1)}`;
      joints.push({ x: nx, y: ny, angle });
      x = nx;
      y = ny;
    }

    ctx.out.push({ d, width, opacity, color });
    ctx.count.n++;

    for (const joint of joints) {
      if (ctx.count.n >= ctx.limit) break;
      if (Math.random() < 0.35) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        const a = joint.angle + dir * this.rand(0.6, 1.4);
        const len = length * this.rand(0.1, 0.22);
        const ex = this.clamp(joint.x + Math.sin(a) * len, ctx.min, ctx.max);
        const ey = joint.y + Math.cos(a) * len;
        const mx = joint.x + Math.sin(a) * len * 0.5 + this.rand(-6, 6);
        const my = joint.y + Math.cos(a) * len * 0.5 + this.rand(-4, 4);
        ctx.out.push({
          d: `M${joint.x.toFixed(1)} ${joint.y.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`,
          width: width * this.rand(0.3, 0.5),
          opacity: opacity * 0.7,
          color,
        });
        ctx.count.n++;
      }
    }

    if (depth < ctx.maxDepth) {
      const branches = depth === 0 ? this.randInt(2, 3) : this.randInt(1, 2);
      for (let b = 0; b < branches; b++) {
        if (ctx.count.n >= ctx.limit) break;
        const spread = branches > 1 ? (b - (branches - 1) / 2) * this.rand(0.55, 0.9) : 0;
        this.grow(
          x,
          y,
          angle + spread + this.rand(-0.25, 0.25),
          length * this.rand(0.6, 0.72),
          width * this.rand(0.58, 0.72),
          opacity * 0.85,
          depth + 1,
          color,
          ctx
        );
      }
    }
  }

  private makePath(parent: SVGElement, path: RootPath, delay: number) {
    const el = document.createElementNS(SVG_NS, 'path');
    el.setAttribute('d', path.d);
    el.setAttribute('fill', 'none');
    el.style.stroke = path.color;
    el.setAttribute('stroke-width', path.width.toFixed(2));
    el.setAttribute('stroke-linecap', 'round');
    el.setAttribute('stroke-linejoin', 'round');
    el.setAttribute('opacity', path.opacity.toFixed(2));
    el.setAttribute('pathLength', '100');
    el.classList.add('root-path');
    if (this.prefersReducedMotion) {
      el.classList.add('root-path--static');
    } else {
      el.style.setProperty('--draw-delay', `${delay.toFixed(2)}s`);
      el.style.setProperty('--draw-dur', `${this.rand(1.6, 3.2).toFixed(2)}s`);
    }
    parent.appendChild(el);
  }

  private makeTree(paths: RootPath[]): SVGGElement {
    const g = document.createElementNS(SVG_NS, 'g');
    g.classList.add('root-tree');
    if (this.prefersReducedMotion) {
      g.classList.add('root-tree--static');
    } else {
      g.style.setProperty('--sway-dur', `${this.rand(6, 14).toFixed(2)}s`);
      g.style.setProperty('--sway-delay', `${this.rand(-12, -1).toFixed(2)}s`);
      g.style.setProperty('--sway', `${this.rand(0.6, 1.8).toFixed(2)}deg`);
      g.style.setProperty('--sway-x', `${this.rand(2, 8).toFixed(1)}px`);
      g.style.setProperty('--sway-y', `${this.rand(3, 12).toFixed(1)}px`);
    }
    paths.sort((a, b) => b.width - a.width);
    paths.forEach((path, i) => this.makePath(g, path, this.rand(0.05, 0.3) + (i % 8) * 0.1));
    return g;
  }

  private populate(svg: SVGSVGElement | undefined, side: 'left' | 'right') {
    if (!svg) return;
    svg.innerHTML = '';

    const palette: Record<'left' | 'right', string[]> = {
      left: ['rgb(var(--jade))', 'rgb(var(--teal))', 'rgb(var(--moss))', 'rgb(var(--jade))'],
      right: ['rgb(var(--plum))', 'rgb(var(--berry))', 'rgb(var(--indigo))', 'rgb(var(--slate))'],
    };
    const colors = palette[side];
    const compact = typeof window !== 'undefined' && window.innerWidth < 1280;
    const bounds = {
      min: side === 'left' ? (compact ? 30 : -15) : compact ? 50 : 5,
      max: side === 'left' ? (compact ? 130 : 155) : compact ? 130 : 175,
      limit: compact ? 55 : 120,
      maxDepth: compact ? 2 : 3,
    };

    const count = { n: 0 };
    const trunkCount = compact ? this.randInt(2, 3) : this.randInt(3, 5);
    for (let t = 0; t < trunkCount; t++) {
      const tree: RootPath[] = [];
      const ctx: GrowContext = {
        min: bounds.min,
        max: bounds.max,
        out: tree,
        count,
        limit: bounds.limit,
        maxDepth: bounds.maxDepth,
      };
      const startX = side === 'left' ? this.rand(0, 140) : this.rand(20, 160);
      const startY = this.rand(-30, 10);
      const lean = (side === 'left' ? -1 : 1) * this.rand(0.08, 0.4);
      this.grow(
        startX,
        startY,
        this.rand(-0.15, 0.15) + lean,
        this.rand(720, 1000),
        this.rand(1.7, 2.9),
        this.rand(0.32, 0.48),
        0,
        this.pick(colors),
        ctx
      );
      if (tree.length) svg.appendChild(this.makeTree(tree));
    }
  }
}
