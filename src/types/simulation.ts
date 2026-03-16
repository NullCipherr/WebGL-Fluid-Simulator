export type ViewMode = 'density' | 'velocity' | 'pressure' | 'particles';

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
}

export interface SimulationState {
  isRunning: boolean;
  fps: number;
  isInitialized: boolean;
  obstacles: Obstacle[];
  resetTrigger: number;
}
