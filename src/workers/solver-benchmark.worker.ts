import type { BenchmarkResult, Obstacle, SimulationConfig } from '../types/simulation';
import { FluidSolver } from '../engine/simulation/FluidSolver';
import { ObstacleManager } from '../engine/simulation/ObstacleManager';

type WorkerRequest = {
  config: SimulationConfig;
  obstacles: Obstacle[];
  steps: number;
  dt: number;
  seed: number;
  width: number;
  height: number;
};

function mulberry32(seed: number) {
  let t = seed;
  return function rng() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { config, obstacles, steps, dt, seed, width, height } = event.data;

  const obstacleManager = new ObstacleManager();
  const solver = new FluidSolver(config, obstacleManager);
  solver.resize(width, height);
  obstacleManager.setObstacles(obstacles);

  const rng = mulberry32(seed);
  const start = performance.now();

  for (let i = 0; i < steps; i++) {
    const x = 0.1 + rng() * 0.8;
    const y = 0.1 + rng() * 0.8;
    const forceX = (rng() - 0.5) * 12;
    const forceY = (rng() - 0.5) * 12;
    const density = 2 + rng() * 8;

    solver.addVelocity(x, y, forceX, forceY, config.splatRadius);
    solver.addDensity(x, y, density, config.splatRadius);
    solver.step(dt);
  }

  const elapsedMs = performance.now() - start;
  const avgFrameTimeMs = elapsedMs / steps;
  const fpsEstimate = 1000 / Math.max(avgFrameTimeMs, 0.0001);

  let densitySum = 0;
  let velocityXSum = 0;
  let velocityYSum = 0;

  for (let i = 0; i < solver.size; i++) {
    densitySum += solver.density[i];
    velocityXSum += solver.velocityX[i];
    velocityYSum += solver.velocityY[i];
  }

  const result: BenchmarkResult = {
    seed,
    steps,
    dt,
    elapsedMs,
    avgFrameTimeMs,
    fpsEstimate,
    checksum: `${densitySum.toFixed(4)}|${velocityXSum.toFixed(4)}|${velocityYSum.toFixed(4)}`,
    createdAt: new Date().toISOString(),
  };

  self.postMessage(result);
};
