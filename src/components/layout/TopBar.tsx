import React, { useState } from 'react';
import { Activity, Gauge, Maximize, Settings, HelpCircle, RefreshCw, Save, Trash2 } from 'lucide-react';
import { PRESETS, useSimulation } from '../../context/SimulationContext';
import { PremiumButton } from '../ui/PremiumButton';
import { PremiumSelect } from '../ui/PremiumSelect';

export const TopBar: React.FC = () => {
  const { state, resetSimulation, applyPreset, saveCustomPreset, removeCustomPreset, customPresets, runBenchmark } = useSimulation();
  const [preset, setPreset] = useState('calm');

  const handlePresetChange = (val: string) => {
    setPreset(val);
    applyPreset(val);
  };

  const handleSavePreset = () => {
    const suggested = `Preset ${new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
    const name = window.prompt('Nome do preset personalizado:', suggested);
    if (!name) return;

    const savedId = saveCustomPreset(name);
    if (!savedId) return;
    const optionValue = `custom:${savedId}`;
    setPreset(optionValue);
  };

  const handleRemovePreset = () => {
    if (!preset.startsWith('custom:')) return;
    const customId = preset.replace('custom:', '');
    removeCustomPreset(customId);
    setPreset('calm');
    applyPreset('calm');
  };

  const builtInOptions = Object.keys(PRESETS).map((key) => ({
    value: key,
    label: `Preset: ${key.charAt(0).toUpperCase()}${key.slice(1)}`,
  }));

  const customOptions = customPresets.map((presetItem) => ({
    value: `custom:${presetItem.id}`,
    label: `Custom: ${presetItem.name}`,
  }));

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
            options={[...builtInOptions, ...customOptions]}
            onChange={handlePresetChange}
          />
        </div>
        <div className="h-4 w-px bg-white/10 mx-1" />
        <PremiumButton variant="ghost" size="sm" onClick={handleSavePreset} title="Salvar preset atual">
          <Save className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton
          variant="ghost"
          size="sm"
          onClick={handleRemovePreset}
          title="Remover preset customizado"
          className={!preset.startsWith('custom:') ? 'opacity-40 pointer-events-none' : ''}
        >
          <Trash2 className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton variant="ghost" size="sm" onClick={resetSimulation} title="Reset Simulation">
          <RefreshCw className="w-4 h-4" />
        </PremiumButton>
        <PremiumButton
          variant="ghost"
          size="sm"
          onClick={runBenchmark}
          title="Rodar benchmark reproduzível"
          className={state.benchmarkRunning ? 'opacity-60 pointer-events-none' : ''}
        >
          <Gauge className="w-4 h-4" />
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
