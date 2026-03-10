import {
  Component, OnInit, OnDestroy, inject, PLATFORM_ID,
  ChangeDetectionStrategy, NgZone, ElementRef, ViewChild, AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  life?: number;
  maxLife?: number;
  burst?: boolean;
}


const COLORS = ['#4aaff1', '#d94cac'];

@Component({
  selector: 'app-particles-bg',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `],
})
export class ParticlesBgComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private rafId = 0;
  private active = false;
  private w = 0;
  private h = 0;
  private dpr = 1;

  private boundResize?: () => void;
  private boundClick?: (e: MouseEvent) => void;

  private readonly PARTICLE_COUNT = 50;
  private readonly LINK_DISTANCE = 150;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.active = true;
  }

  ngAfterViewInit(): void {
    if (!this.active) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.dpr = window.devicePixelRatio || 1;
    this.resize();
    this.createParticles();

    this.zone.runOutsideAngular(() => {
      this.boundResize = () => this.resize();
      this.boundClick = (e: MouseEvent) => this.spawnBurst(e.clientX, e.clientY);

      window.addEventListener('resize', this.boundResize);
      document.addEventListener('click', this.boundClick);

      this.animate();
    });
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    canvas.width = this.w * this.dpr;
    canvas.height = this.h * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  private createParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: 1 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 0.15 + Math.random() * 0.35,
      });
    }
  }

  private spawnBurst(x: number, y: number): void {
    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: 1,
        burst: true,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
    }
  }

  private animate(): void {
    const { ctx, w, h } = this;
    ctx.clearRect(0, 0, w, h);

    // Update & draw particles (iterate backwards for safe removal)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.burst) {
        p.life!++;
        p.vy += 0.03;
        p.vx *= 0.98;
        p.vy *= 0.98;
        const progress = p.life! / p.maxLife!;
        p.opacity = 1 - progress;
        p.radius *= (1 - progress * 0.01);

        if (p.life! >= p.maxLife!) {
          // Settle as a regular particle instead of removing
          p.burst = false;
          p.opacity = 0.2 + Math.random() * 0.25;
          p.vx = (Math.random() - 0.5) * 0.8;
          p.vy = (Math.random() - 0.5) * 0.8;
          p.radius = 1 + Math.random() * 2;
          continue;
        }

        // Glow effect for burst particles
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.hexToRgba(p.color, p.opacity * 0.15);
        ctx.fill();
      } else {
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.hexToRgba(p.color, p.opacity);
      ctx.fill();
    }

    const particles = this.particles;

    // Draw links between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.LINK_DISTANCE) {
          const opacity = (1 - dist / this.LINK_DISTANCE) * 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(74, 175, 241, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }


    this.rafId = requestAnimationFrame(() => this.animate());
  }

  private hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.boundResize) window.removeEventListener('resize', this.boundResize);
    if (this.boundClick) document.removeEventListener('click', this.boundClick);
  }
}
