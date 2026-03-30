export type ViewMode = 'density' | 'velocity' | 'pressure' | 'particles';

export type PresetKey = 'calm' | 'viscous' | 'chaotic' | 'smoke';

export interface Obstacle {
  id: string;
  type: 'circle' | 'rect';
  x: number; // normalized 0-1
  y: number; // normalized 0-1
  radius?: number; // for circle, normalized
  width?: number; // for rect, normalized
  height?: number; // for rect, normalized
}

export interface SimulationConfig {
  density: number;
  viscosity: number;
  impulseForce: number;
  gridSize: number;
  resolution: number;
  viewMode: ViewMode;
  dissipation: number;
  velocityDissipation: number;
  splatRadius: number;
  showGrid: boolean;
  showTrails: boolean;
  glowIntensity: number;
  colorPalette: 'default' | 'fire' | 'ocean' | 'plasma';
  vorticity: number;
  renderBackend: 'classic' | 'experimental-gpu';
}

export interface BenchmarkResult {
  seed: number;
  steps: number;
  dt: number;
  elapsedMs: number;
  avgFrameTimeMs: number;
  fpsEstimate: number;
  checksum: string;
  createdAt: string;
}

export interface SimulationState {
  isRunning: boolean;
  fps: number;
  frameTimeMs: number;
  frameTimeHistoryMs: number[];
  isInitialized: boolean;
  obstacles: Obstacle[];
  activeParticles: number;
  estimatedMemoryMB: number;
  computeLoadPct: number;
  benchmarkRunning: boolean;
  lastBenchmarkResult: BenchmarkResult | null;
  resetTrigger: number;
}

export interface CustomPreset {
  id: string;
  name: string;
  config: Pick<
    SimulationConfig,
    | 'density'
    | 'viscosity'
    | 'impulseForce'
    | 'dissipation'
    | 'velocityDissipation'
    | 'vorticity'
    | 'splatRadius'
    | 'colorPalette'
  >;
}
