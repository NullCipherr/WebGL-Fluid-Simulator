import { describe, expect, it } from 'vitest';
import type { SimulationConfig } from '../../../types/simulation';
import { ObstacleManager } from '../ObstacleManager';
import { FluidSolver } from '../FluidSolver';

function createConfig(overrides: Partial<SimulationConfig> = {}): SimulationConfig {
  return {
    density: 2.0,
    viscosity: 0.0,
    impulseForce: 10.0,
    gridSize: 128,
    resolution: 1.0,
    viewMode: 'density',
    dissipation: 0.98,
    velocityDissipation: 0.99,
    splatRadius: 0.02,
    showGrid: false,
    showTrails: true,
    glowIntensity: 0.5,
    colorPalette: 'default',
    vorticity: 2.0,
    renderBackend: 'classic',
    ...overrides,
  };
}

function createSolver(configOverrides: Partial<SimulationConfig> = {}) {
  const obstacleManager = new ObstacleManager();
  const solver = new FluidSolver(createConfig(configOverrides), obstacleManager);
  solver.resize(800, 600);
  return { solver, obstacleManager };
}

function sum(values: Float32Array): number {
  let total = 0;
  for (let i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
}

describe('FluidSolver invariantes', () => {
  it('aloca buffers consistentes ao redimensionar', () => {
    const { solver } = createSolver({ gridSize: 160 });

    expect(solver.width).toBe(160);
    expect(solver.height).toBeGreaterThan(0);
    expect(solver.size).toBe(solver.width * solver.height);
    expect(solver.density.length).toBe(solver.size);
    expect(solver.velocityX.length).toBe(solver.size);
    expect(solver.velocityY.length).toBe(solver.size);
  });

  it('injeta densidade em células válidas sem gerar NaN', () => {
    const { solver } = createSolver();

    solver.addDensity(0.5, 0.5, 10, 0.05);

    expect(sum(solver.density)).toBeGreaterThan(0);
    expect([...solver.density].every(Number.isFinite)).toBe(true);
  });

  it('reset limpa os campos da simulação', () => {
    const { solver } = createSolver();

    solver.addDensity(0.5, 0.5, 20, 0.05);
    solver.addVelocity(0.5, 0.5, 8, -3, 0.05);
    solver.step(1 / 60);
    solver.reset();

    expect(sum(solver.density)).toBe(0);
    expect(sum(solver.velocityX)).toBe(0);
    expect(sum(solver.velocityY)).toBe(0);
  });

  it('não injeta densidade dentro de células marcadas como obstáculo', () => {
    const { solver, obstacleManager } = createSolver();
    obstacleManager.setObstacles([{ id: 'center', type: 'circle', x: 0.5, y: 0.5, radius: 0.15 }]);

    solver.addDensity(0.5, 0.5, 50, 0.02);

    const centerX = Math.floor(solver.width * 0.5);
    const centerY = Math.floor(solver.height * 0.5);
    const centerIdx = centerX + centerY * solver.width;

    expect(obstacleManager.isObstacle(centerX, centerY)).toBe(true);
    expect(solver.density[centerIdx]).toBe(0);
  });

  it('mantém campos numéricos finitos após múltiplos passos', () => {
    const { solver } = createSolver();

    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      solver.addVelocity(0.2 + t * 0.6, 0.4, 5, -3, 0.03);
      solver.addDensity(0.2 + t * 0.6, 0.6, 6, 0.03);
      solver.step(1 / 60);
    }

    expect([...solver.density].every(Number.isFinite)).toBe(true);
    expect([...solver.velocityX].every(Number.isFinite)).toBe(true);
    expect([...solver.velocityY].every(Number.isFinite)).toBe(true);
  });
});
