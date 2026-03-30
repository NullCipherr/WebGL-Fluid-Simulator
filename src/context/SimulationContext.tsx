import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { runBenchmarkInWorker } from '../services/benchmark/runBenchmarkInWorker';
import { SimulationConfig, SimulationState, Obstacle, CustomPreset, PresetKey } from '../types/simulation';

interface SimulationContextProps {
  config: SimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  customPresets: CustomPreset[];
  updateConfig: (key: keyof SimulationConfig, value: any) => void;
  togglePlayPause: () => void;
  resetSimulation: () => void;
  addObstacle: (obs: Omit<Obstacle, 'id'>) => void;
  clearObstacles: () => void;
  applyPreset: (presetName: string) => void;
  saveCustomPreset: (name: string) => string | null;
  removeCustomPreset: (presetId: string) => void;
  runBenchmark: () => Promise<void>;
}

export const PRESETS = {
  calm: { density: 1.0, viscosity: 0.1, impulseForce: 5, dissipation: 0.99, velocityDissipation: 0.99, vorticity: 0.0, splatRadius: 0.01, colorPalette: 'ocean' as const },
  viscous: { density: 2.0, viscosity: 0.8, impulseForce: 15, dissipation: 0.99, velocityDissipation: 0.95, vorticity: 0.0, splatRadius: 0.03, colorPalette: 'default' as const },
  chaotic: { density: 3.0, viscosity: 0.0, impulseForce: 30, dissipation: 0.97, velocityDissipation: 0.99, vorticity: 15.0, splatRadius: 0.02, colorPalette: 'plasma' as const },
  smoke: { density: 5.0, viscosity: 0.0, impulseForce: 10, dissipation: 0.995, velocityDissipation: 0.99, vorticity: 5.0, splatRadius: 0.04, colorPalette: 'fire' as const },
};

const STORAGE_KEY = 'fluid-simulator.custom-presets.v1';

const defaultConfig: SimulationConfig = {
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
};

const defaultState: SimulationState = {
  isRunning: true,
  fps: 0,
  frameTimeMs: 0,
  frameTimeHistoryMs: [],
  isInitialized: false,
  obstacles: [
    { id: 'obs-1', type: 'circle', x: 0.5, y: 0.5, radius: 0.1 }
  ],
  activeParticles: 0,
  estimatedMemoryMB: 0,
  computeLoadPct: 0,
  benchmarkRunning: false,
  lastBenchmarkResult: null,
  resetTrigger: 0,
};

const SimulationContext = createContext<SimulationContextProps | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SimulationConfig>(defaultConfig);
  const [state, setState] = useState<SimulationState>(defaultState);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as CustomPreset[];
      if (Array.isArray(parsed)) {
        setCustomPresets(parsed);
      }
    } catch (error) {
      console.warn('[SimulationContext] Falha ao carregar presets customizados', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customPresets));
  }, [customPresets]);

  const updateConfig = (key: keyof SimulationConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const togglePlayPause = () => {
    setState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetSimulation = () => {
    setState((prev) => ({ ...prev, resetTrigger: prev.resetTrigger + 1 }));
  };

  const addObstacle = (obs: Omit<Obstacle, 'id'>) => {
    const newObs: Obstacle = { ...obs, id: `obs-${Date.now()}` };
    setState(prev => ({ ...prev, obstacles: [...prev.obstacles, newObs] }));
  };

  const clearObstacles = () => {
    setState(prev => ({ ...prev, obstacles: [] }));
  };

  const applyPreset = (presetName: string) => {
    if (presetName.startsWith('custom:')) {
      const customId = presetName.replace('custom:', '');
      const preset = customPresets.find((item) => item.id === customId);
      if (preset) {
        setConfig((prev) => ({ ...prev, ...preset.config }));
      }
      return;
    }

    const preset = PRESETS[presetName as PresetKey];
    if (preset) {
      setConfig((prev) => ({ ...prev, ...preset }));
    }
  };

  const saveCustomPreset = (name: string): string | null => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const presetConfig: CustomPreset['config'] = {
      density: config.density,
      viscosity: config.viscosity,
      impulseForce: config.impulseForce,
      dissipation: config.dissipation,
      velocityDissipation: config.velocityDissipation,
      vorticity: config.vorticity,
      splatRadius: config.splatRadius,
      colorPalette: config.colorPalette,
    };

    const preset: CustomPreset = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      name: trimmed,
      config: presetConfig,
    };

    setCustomPresets((prev) => [preset, ...prev].slice(0, 20));
    return preset.id;
  };

  const removeCustomPreset = (presetId: string) => {
    setCustomPresets((prev) => prev.filter((preset) => preset.id !== presetId));
  };

  const runBenchmark = async () => {
    setState((prev) => ({ ...prev, benchmarkRunning: true }));

    try {
      const benchmarkConfig: SimulationConfig = {
        ...config,
        gridSize: 192,
        density: 2.5,
        impulseForce: 12,
        dissipation: 0.985,
        velocityDissipation: 0.99,
        vorticity: 6,
        splatRadius: 0.02,
        showGrid: false,
        showTrails: false,
        renderBackend: 'classic',
      };

      const benchmarkObstacles: Obstacle[] = [
        { id: 'bench-center', type: 'circle', x: 0.5, y: 0.5, radius: 0.1 },
      ];

      const result = await runBenchmarkInWorker(benchmarkConfig, benchmarkObstacles, {
        steps: 600,
        dt: 1 / 60,
        seed: 1337,
      });

      setState((prev) => ({
        ...prev,
        benchmarkRunning: false,
        lastBenchmarkResult: result,
      }));
    } catch (error) {
      console.error('[SimulationContext] benchmark falhou', error);
      setState((prev) => ({ ...prev, benchmarkRunning: false }));
    }
  };

  const value = useMemo(
    () => ({
      config,
      setConfig,
      state,
      setState,
      customPresets,
      updateConfig,
      togglePlayPause,
      resetSimulation,
      addObstacle,
      clearObstacles,
      applyPreset,
      saveCustomPreset,
      removeCustomPreset,
      runBenchmark,
    }),
    [config, state, customPresets],
  );

  return (
    <SimulationContext.Provider value={value}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
