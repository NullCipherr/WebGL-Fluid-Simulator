import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Terminal, Zap, Layers, Maximize } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { state, config } = useSimulation();

  return (
    <footer className="h-8 border-t border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl flex items-center justify-between px-4 shrink-0 z-50 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${state.isRunning ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`} />
          <span className={state.isRunning ? 'text-emerald-400' : 'text-amber-400'}>
            {state.isRunning ? 'SIMULATION RUNNING' : 'SIMULATION PAUSED'}
          </span>
        </div>
        <div className="h-3 w-px bg-white/10 mx-1" />
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-slate-500" />
          <span>MODE: {config.viewMode}</span>
        </div>
        <div className="h-3 w-px bg-white/10 mx-1" />
        <div className="flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-slate-500" />
          <span>PALETTE: {config.colorPalette}</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Maximize className="w-3 h-3 text-slate-500" />
          <span>RES: {config.gridSize}x{config.gridSize}</span>
        </div>
        <div className="h-3 w-px bg-white/10 mx-1" />
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-slate-500" />
          <span className="text-slate-300">{state.fps} FPS</span>
        </div>
        <div className="h-3 w-px bg-white/10 mx-1" />
        <div className="flex items-center gap-1.5 text-slate-500">
          <span>HINTS: Left Click = Inject | Right Click = Repel | Drag = Move Obstacle</span>
        </div>
      </div>
    </footer>
  );
};
