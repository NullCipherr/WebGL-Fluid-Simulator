import React from 'react';
import { Play, Pause, RotateCcw, SlidersHorizontal, Droplets, Layers, MousePointer2, BoxSelect, Trash2 } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { SectionCard } from '../ui/SectionCard';
import { PremiumSlider } from '../ui/PremiumSlider';
import { PremiumToggle } from '../ui/PremiumToggle';
import { PremiumSelect } from '../ui/PremiumSelect';
import { PremiumButton } from '../ui/PremiumButton';

export const LeftSidebar: React.FC = () => {
  const { config, updateConfig, state, togglePlayPause, resetSimulation, addObstacle, clearObstacles } = useSimulation();

  return (
    <aside className="w-80 bg-[#0a0a0c]/90 border-r border-white/10 flex flex-col h-full overflow-y-auto backdrop-blur-2xl shrink-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
      <div className="p-4 flex flex-col gap-4">
        
        {/* Global Controls */}
        <div className="grid grid-cols-2 gap-2">
          <PremiumButton 
            variant={state.isRunning ? 'secondary' : 'primary'} 
            onClick={togglePlayPause}
            className="w-full"
          >
            {state.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {state.isRunning ? 'Pause' : 'Start'}
          </PremiumButton>
          <PremiumButton variant="danger" onClick={resetSimulation} className="w-full">
            <RotateCcw className="w-4 h-4" />
            Reset
          </PremiumButton>
        </div>

        {/* Fluid Parameters */}
        <SectionCard title="Fluid Parameters" icon={Droplets} defaultOpen={true}>
          <PremiumSlider
            label="Density Injection"
            value={config.density}
            min={0.1}
            max={10.0}
            onChange={(val) => updateConfig('density', val)}
          />
          <PremiumSlider
            label="Impulse Force"
            value={config.impulseForce}
            min={1.0}
            max={50.0}
            onChange={(val) => updateConfig('impulseForce', val)}
          />
          <PremiumSlider
            label="Vorticity"
            value={config.vorticity}
            min={0.0}
            max={50.0}
            onChange={(val) => updateConfig('vorticity', val)}
          />
          <PremiumSlider
            label="Density Dissipation"
            value={config.dissipation}
            min={0.90}
            max={1.0}
            step={0.001}
            onChange={(val) => updateConfig('dissipation', val)}
          />
          <PremiumSlider
            label="Velocity Dissipation"
            value={config.velocityDissipation}
            min={0.90}
            max={1.0}
            step={0.001}
            onChange={(val) => updateConfig('velocityDissipation', val)}
          />
        </SectionCard>

        {/* Rendering */}
        <SectionCard title="Rendering" icon={Layers} defaultOpen={true}>
          <PremiumSelect
            label="View Mode"
            value={config.viewMode}
            options={[
              { value: 'density', label: 'Density (Dye)' },
              { value: 'velocity', label: 'Velocity Vector' },
              { value: 'pressure', label: 'Pressure Map' },
              { value: 'particles', label: 'Particles' },
            ]}
            onChange={(val) => updateConfig('viewMode', val as any)}
          />
          <PremiumSelect
            label="Color Palette"
            value={config.colorPalette}
            options={[
              { value: 'default', label: 'Default (Blue/Purple)' },
              { value: 'fire', label: 'Fire (Red/Yellow)' },
              { value: 'ocean', label: 'Ocean (Blue/Cyan)' },
              { value: 'plasma', label: 'Plasma (Purple/Pink)' },
            ]}
            onChange={(val) => updateConfig('colorPalette', val as any)}
          />
          <PremiumSlider
            label="Glow Intensity"
            value={config.glowIntensity}
            min={0}
            max={1}
            step={0.05}
            onChange={(val) => updateConfig('glowIntensity', val)}
          />
          <div className="h-px bg-white/5 my-2" />
          <PremiumToggle
            label="Show Grid"
            checked={config.showGrid}
            onChange={(val) => updateConfig('showGrid', val)}
          />
          <PremiumToggle
            label="Show Trails"
            checked={config.showTrails}
            onChange={(val) => updateConfig('showTrails', val)}
          />
        </SectionCard>

        {/* Interaction */}
        <SectionCard title="Interaction" icon={MousePointer2} defaultOpen={false}>
          <PremiumSlider
            label="Brush Radius"
            value={config.splatRadius}
            min={0.005}
            max={0.1}
            step={0.005}
            onChange={(val) => updateConfig('splatRadius', val)}
          />
        </SectionCard>

        {/* Obstacles */}
        <SectionCard title="Obstacles" icon={BoxSelect} defaultOpen={false}>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <PremiumButton variant="secondary" size="sm" onClick={() => addObstacle({ type: 'circle', x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, radius: 0.05 + Math.random() * 0.05 })}>
              + Circle
            </PremiumButton>
            <PremiumButton variant="secondary" size="sm" onClick={() => addObstacle({ type: 'rect', x: Math.random() * 0.8 + 0.1, y: Math.random() * 0.8 + 0.1, width: 0.1 + Math.random() * 0.1, height: 0.1 + Math.random() * 0.1 })}>
              + Rect
            </PremiumButton>
          </div>
          <PremiumButton variant="danger" size="sm" onClick={clearObstacles} className="w-full">
            <Trash2 className="w-4 h-4 mr-2" /> Clear All
          </PremiumButton>
        </SectionCard>

        {/* Advanced */}
        <SectionCard title="Advanced Settings" icon={SlidersHorizontal} defaultOpen={false}>
          <PremiumSlider
            label="Grid Size (Resolution)"
            value={config.gridSize}
            min={32}
            max={512}
            step={32}
            onChange={(val) => updateConfig('gridSize', val)}
          />
        </SectionCard>

      </div>
    </aside>
  );
};
