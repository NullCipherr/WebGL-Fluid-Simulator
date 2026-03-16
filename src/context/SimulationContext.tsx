import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SimulationConfig, SimulationState, Obstacle } from '../types/simulation';

interface SimulationContextProps {
  config: SimulationConfig;
  setConfig: React.Dispatch<React.SetStateAction<SimulationConfig>>;
  state: SimulationState;
  setState: React.Dispatch<React.SetStateAction<SimulationState>>;
  updateConfig: (key: keyof SimulationConfig, value: any) => void;
  togglePlayPause: () => void;
  resetSimulation: () => void;
  addObstacle: (obs: Omit<Obstacle, 'id'>) => void;
  clearObstacles: () => void;
  applyPreset: (presetName: keyof typeof PRESETS) => void;
}

export const PRESETS = {
  calm: { density: 1.0, viscosity: 0.1, impulseForce: 5, dissipation: 0.99, velocityDissipation: 0.99, vorticity: 0.0, splatRadius: 0.01, colorPalette: 'ocean' as const },
  viscous: { density: 2.0, viscosity: 0.8, impulseForce: 15, dissipation: 0.99, velocityDissipation: 0.95, vorticity: 0.0, splatRadius: 0.03, colorPalette: 'default' as const },
  chaotic: { density: 3.0, viscosity: 0.0, impulseForce: 30, dissipation: 0.97, velocityDissipation: 0.99, vorticity: 15.0, splatRadius: 0.02, colorPalette: 'plasma' as const },
  smoke: { density: 5.0, viscosity: 0.0, impulseForce: 10, dissipation: 0.995, velocityDissipation: 0.99, vorticity: 5.0, splatRadius: 0.04, colorPalette: 'fire' as const },
};

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
};

const defaultState: SimulationState = {
  isRunning: true,
  fps: 0,
  isInitialized: false,
  obstacles: [
    { id: 'obs-1', type: 'circle', x: 0.5, y: 0.5, radius: 0.1 }
  ],
  resetTrigger: 0,
};

const SimulationContext = createContext<SimulationContextProps | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SimulationConfig>(defaultConfig);
  const [state, setState] = useState<SimulationState>(defaultState);

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

  const applyPreset = (presetName: keyof typeof PRESETS) => {
    const preset = PRESETS[presetName];
    if (preset) {
      setConfig(prev => ({ ...prev, ...preset }));
    }
  };

  return (
    <SimulationContext.Provider
      value={{ config, setConfig, state, setState, updateConfig, togglePlayPause, resetSimulation, addObstacle, clearObstacles, applyPreset }}
    >
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
