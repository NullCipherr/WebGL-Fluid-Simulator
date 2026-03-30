import { SimulationConfig, Obstacle } from '../../types/simulation';
import { WebGLRenderer } from '../rendering/WebGLRenderer';
import { FluidSolver } from '../simulation/FluidSolver';
import { ObstacleManager } from '../simulation/ObstacleManager';
import { ParticleSystem } from '../simulation/ParticleSystem';
import { InputController } from './InputController';

export interface RuntimeMetrics {
  activeParticles: number;
  estimatedMemoryMB: number;
}

/**
 * Core Fluid Engine class.
 * Orchestrates the simulation state, renderer, and input controller.
 */
export class FluidEngine {
  private solver: FluidSolver;
  private renderer: WebGLRenderer;
  private inputController: InputController;
  private obstacleManager: ObstacleManager;
  private particleSystem: ParticleSystem;
  private config: SimulationConfig;
  public onObstacleChange?: (obstacles: Obstacle[]) => void;

  constructor(canvas: HTMLCanvasElement, config: SimulationConfig) {
    this.config = config;
    this.obstacleManager = new ObstacleManager();
    this.solver = new FluidSolver(config, this.obstacleManager);
    this.particleSystem = new ParticleSystem(15000);
    this.renderer = new WebGLRenderer(canvas);
    this.inputController = new InputController(canvas, this);
  }

  public initialize(): void {
    console.log('[FluidEngine] Initializing...');
    this.renderer.initialize();
    this.solver.initialize();
    this.solver.resize(this.renderer.getWidth(), this.renderer.getHeight());
    this.inputController.initialize();
  }

  public update(deltaTime: number): void {
    // Cap deltaTime to avoid instability on lag spikes
    const dt = Math.min(deltaTime, 0.033); 
    this.solver.step(dt);
    this.particleSystem.update(this.solver, dt);
  }

  public render(): void {
    this.renderer.draw(this.solver, this.obstacleManager, this.particleSystem, this.config);
  }

  public reset(): void {
    console.log('[FluidEngine] Resetting...');
    this.solver.reset();
    this.particleSystem.reset();
    this.renderer.clear();
  }

  public resize(width: number, height: number): void {
    this.renderer.resize(width, height);
    this.solver.resize(width, height);
  }

  public applyForce(x: number, y: number, forceX: number, forceY: number): void {
    this.solver.addVelocity(x, y, forceX * this.config.impulseForce * 1000, forceY * this.config.impulseForce * 1000, this.config.splatRadius);
    this.particleSystem.emit(x, y, 50);
  }

  public injectDensity(x: number, y: number, amount: number): void {
    this.solver.addDensity(x, y, amount * this.config.density, this.config.splatRadius);
  }

  public updateConfig(newConfig: SimulationConfig): void {
    const oldGridSize = this.config.gridSize;
    this.config = newConfig;
    this.solver.updateConfig(newConfig);
    
    if (oldGridSize !== newConfig.gridSize) {
      this.solver.resize(this.renderer.getWidth(), this.renderer.getHeight());
    }
  }

  public updateObstacles(obstacles: Obstacle[]): void {
    this.obstacleManager.setObstacles(obstacles);
  }

  public getObstacleManager(): ObstacleManager {
    return this.obstacleManager;
  }

  public getRuntimeMetrics(): RuntimeMetrics {
    const bytes =
      this.solver.getEstimatedMemoryBytes() +
      this.renderer.getEstimatedMemoryBytes() +
      this.obstacleManager.getObstacleGridByteSize();

    return {
      activeParticles: this.particleSystem.getActiveCount(),
      estimatedMemoryMB: bytes / (1024 * 1024),
    };
  }

  public dispose(): void {
    this.inputController.dispose();
    this.renderer.dispose();
    this.solver.dispose();
    this.particleSystem.dispose();
    this.obstacleManager.dispose();
  }
}
