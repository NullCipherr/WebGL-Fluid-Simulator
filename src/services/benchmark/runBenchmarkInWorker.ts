import type { BenchmarkResult, Obstacle, SimulationConfig } from '../../types/simulation';

interface BenchmarkOptions {
  steps: number;
  dt: number;
  seed: number;
  width?: number;
  height?: number;
}

export function runBenchmarkInWorker(
  config: SimulationConfig,
  obstacles: Obstacle[],
  options: BenchmarkOptions,
): Promise<BenchmarkResult> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('../../workers/solver-benchmark.worker.ts', import.meta.url), {
      type: 'module',
    });

    worker.onmessage = (event: MessageEvent<BenchmarkResult>) => {
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (error) => {
      reject(error);
      worker.terminate();
    };

    worker.postMessage({
      config,
      obstacles,
      steps: options.steps,
      dt: options.dt,
      seed: options.seed,
      width: options.width ?? 1280,
      height: options.height ?? 720,
    });
  });
}
