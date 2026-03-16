import { FluidSolver } from './FluidSolver';

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  colorR: number;
  colorG: number;
  colorB: number;
  size: number;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private maxParticles: number;

  constructor(maxParticles: number = 20000) {
    this.maxParticles = maxParticles;
    this.particles = new Array(maxParticles);
    for (let i = 0; i < maxParticles; i++) {
      this.particles[i] = this.createParticle(Math.random(), Math.random(), true);
    }
  }

  public emit(x: number, y: number, amount: number = 50): void {
    let emitted = 0;
    for (let i = 0; i < this.maxParticles; i++) {
      if (this.particles[i].life <= 0) {
        this.particles[i] = this.createParticle(x, y, false);
        emitted++;
        if (emitted >= amount) break;
      }
    }
  }

  public reset(): void {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles[i].life = 0;
    }
  }

  private createParticle(x: number, y: number, randomLife: boolean): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 0.05;
    
    // Blue-ish to purple-ish
    const r = Math.random() * 0.5 + 0.2;
    const g = Math.random() * 0.5 + 0.5;
    const b = 1.0;

    return {
      x: x + (Math.random() - 0.5) * 0.05,
      y: y + (Math.random() - 0.5) * 0.05,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: randomLife ? Math.random() : 1.0,
      maxLife: 0.5 + Math.random() * 1.5,
      colorR: r,
      colorG: g,
      colorB: b,
      size: Math.random() * 2 + 1
    };
  }

  public update(solver: FluidSolver, dt: number): void {
    const W = solver.width;
    const H = solver.height;

    for (let i = 0; i < this.maxParticles; i++) {
      const p = this.particles[i];
      
      p.life -= dt * 0.5;
      if (p.life <= 0) {
        this.particles[i] = this.createParticle(Math.random(), Math.random(), true);
        continue;
      }

      // Get velocity from grid
      const gx = Math.max(0, Math.min(W - 1, Math.floor(p.x * W)));
      const gy = Math.max(0, Math.min(H - 1, Math.floor(p.y * H)));
      const idx = gx + gy * W;

      const gridVx = solver.velocityX[idx];
      const gridVy = solver.velocityY[idx];

      // Blend particle velocity with grid velocity
      p.vx = p.vx * 0.9 + gridVx * 0.1 * W;
      p.vy = p.vy * 0.9 + gridVy * 0.1 * H;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // Bounce off walls
      if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
      if (p.x > 1) { p.x = 1; p.vx *= -0.5; }
      if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
      if (p.y > 1) { p.y = 1; p.vy *= -0.5; }
    }
  }

  public getParticles(): Particle[] {
    return this.particles;
  }
}
