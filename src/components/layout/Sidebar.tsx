import React from 'react';
import { Play, Pause, RotateCcw, Settings2, Plus, Trash2, Zap } from 'lucide-react';
import { useSimulation, PRESETS } from '../../context/SimulationContext';
import { Slider } from '../ui/Slider';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const Sidebar: React.FC = () => {
  const { config, updateConfig, state, togglePlayPause, resetSimulation, addObstacle, clearObstacles, applyPreset } = useSimulation();

  return (
    <aside className="w-full md:w-80 bg-slate-900/50 border-r border-white/5 flex flex-col h-full overflow-y-auto backdrop-blur-xl shrink-0">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2 mb-4 text-slate-200">
          <Settings2 className="w-4 h-4" />
          <h2 className="text-sm font-semibold">Simulation Controls</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button 
            variant={state.isRunning ? 'secondary' : 'primary'} 
            onClick={togglePlayPause}
            className="w-full"
          >
            {state.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {state.isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="danger" onClick={resetSimulation} className="w-full">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Presets</span>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => applyPreset('calm')} className="text-xs py-1">Calm</Button>
            <Button variant="secondary" onClick={() => applyPreset('viscous')} className="text-xs py-1">Viscous</Button>
            <Button variant="secondary" onClick={() => applyPreset('chaotic')} className="text-xs py-1">Chaotic</Button>
            <Button variant="secondary" onClick={() => applyPreset('smoke')} className="text-xs py-1">Smoke</Button>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Visualization</span>
          <Select
            label="View Mode"
            value={config.viewMode}
            options={[
              { value: 'density', label: 'Density (Dye)' },
              { value: 'velocity', label: 'Velocity Vector' },
              { value: 'pressure', label: 'Pressure Map' },
              { value: 'particles', label: 'Particles' },
            ]}
            onChange={(val) => updateConfig('viewMode', val)}
          />
          <Select
            label="Color Palette"
            value={config.colorPalette}
            options={[
              { value: 'default', label: 'Default (Blue/Purple)' },
              { value: 'fire', label: 'Fire (Red/Yellow)' },
              { value: 'ocean', label: 'Ocean (Blue/Cyan)' },
              { value: 'plasma', label: 'Plasma (Purple/Pink)' },
            ]}
            onChange={(val) => updateConfig('colorPalette', val)}
          />
          <div className="flex items-center justify-between mt-2">
            <label className="text-xs text-slate-400">Show Grid</label>
            <input type="checkbox" checked={config.showGrid} onChange={(e) => updateConfig('showGrid', e.target.checked)} className="accent-indigo-500" />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">Show Trails</label>
            <input type="checkbox" checked={config.showTrails} onChange={(e) => updateConfig('showTrails', e.target.checked)} className="accent-indigo-500" />
          </div>
          <Slider
            label="Glow Intensity"
            value={config.glowIntensity}
            min={0}
            max={1}
            step={0.05}
            onChange={(val) => updateConfig('glowIntensity', val)}
          />
        </div>

        <div className="h-px bg-white/5" />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Physics</span>
          <Slider
            label="Density Injection"
            value={config.density}
            min={0.1}
            max={10.0}
            onChange={(val) => updateConfig('density', val)}
          />
          <Slider
            label="Impulse Force"
            value={config.impulseForce}
            min={1.0}
            max={50.0}
            onChange={(val) => updateConfig('impulseForce', val)}
          />
          <Slider
            label="Vorticity"
            value={config.vorticity}
            min={0.0}
            max={50.0}
            onChange={(val) => updateConfig('vorticity', val)}
          />
          <Slider
            label="Density Dissipation"
            value={config.dissipation}
            min={0.90}
            max={1.0}
            step={0.001}
            onChange={(val) => updateConfig('dissipation', val)}
          />
          <Slider
            label="Velocity Dissipation"
            value={config.velocityDissipation}
            min={0.90}
            max={1.0}
            step={0.001}
            onChange={(val) => updateConfig('velocityDissipation', val)}
          />
          <Slider
            label="Brush Radius"
            value={config.splatRadius}
            min={0.005}
            max={0.1}
            step={0.005}
            onChange={(val) => updateConfig('splatRadius', val)}
          />
        </div>

        <div className="h-px bg-white/5" />

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Obstacles</span>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => addObstacle({ type: 'circle', x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, radius: 0.05 + Math.random() * 0.05 })} className="text-xs py-1">
              <Plus className="w-3 h-3 mr-1" /> Circle
            </Button>
            <Button variant="secondary" onClick={() => addObstacle({ type: 'rect', x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, width: 0.1 + Math.random() * 0.1, height: 0.1 + Math.random() * 0.1 })} className="text-xs py-1">
              <Plus className="w-3 h-3 mr-1" /> Rect
            </Button>
          </div>
          <Button variant="danger" onClick={clearObstacles} className="text-xs py-1 mt-1">
             <Trash2 className="w-3 h-3 mr-1" /> Clear All
          </Button>
        </div>

        <div className="h-px bg-white/5" />
        
        <Slider
          label="Grid Size (Resolution)"
          value={config.gridSize}
          min={32}
          max={256}
          step={32}
          onChange={(val) => updateConfig('gridSize', val)}
        />
      </div>

      <div className="p-4 border-t border-white/5 bg-slate-950/30">
        <div className="flex justify-between items-center text-xs font-mono text-slate-500">
          <span>STATUS</span>
          <span className={state.isRunning ? 'text-emerald-400' : 'text-amber-400'}>
            {state.isRunning ? 'RUNNING' : 'PAUSED'}
          </span>
        </div>
        <div className="flex justify-between items-center text-xs font-mono text-slate-500 mt-1">
          <span>FPS</span>
          <span className="text-slate-300">{state.fps}</span>
        </div>
      </div>
    </aside>
  );
};
