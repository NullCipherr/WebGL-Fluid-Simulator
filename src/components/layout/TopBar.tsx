import React, { useState } from 'react';
import { Activity, Maximize, Settings, HelpCircle, RefreshCw, Layers } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { PremiumButton } from '../ui/PremiumButton';
import { PremiumSelect } from '../ui/PremiumSelect';

export const TopBar: React.FC = () => {
  const { state, resetSimulation, applyPreset } = useSimulation();
  const [preset, setPreset] = useState('calm');

  const handlePresetChange = (val: string) => {
    setPreset(val);
    applyPreset(val as any);
  };

  return (
    <header className="h-14 border-b border-white/10 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-4 shrink-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-indigo-400">
          <Activity className="w-5 h-5" />
          <h1 className="font-bold tracking-tight text-slate-100">Fluid<span className="text-indigo-500 font-light">Engine</span></h1>
        </div>
        <div className="h-4 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="bg-white/5 px-2 py-1 rounded border border-white/5">WORKSPACE</span>
          <span className="text-slate-400">/</span>
          <span className="text-slate-300">Project Alpha</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-48">
          <PremiumSelect
            label=""
            value={preset}
            options={[
              { value: 'calm', label: 'Preset: Calm' },
              { value: 'viscous', label: 'Preset: Viscous' },
              { value: 'chaotic', label: 'Preset: Chaotic' },
              { value: 'smoke', label: 'Preset: Smoke' },
            ]}
            onChange={handlePresetChange}
          />
        </div>
        <div className="h-4 w-px bg-white/10 mx-1" />
        <PremiumButton variant="ghost" size="sm" onClick={resetSimulation} title="Reset Simulation">
          <RefreshCw className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton variant="ghost" size="sm" title="Toggle Fullscreen">
          <Maximize className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton variant="ghost" size="sm" title="Settings">
          <Settings className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton variant="ghost" size="sm" title="Help">
          <HelpCircle className="w-4 h-4" />
        </PremiumButton>
      </div>
    </header>
  );
};
