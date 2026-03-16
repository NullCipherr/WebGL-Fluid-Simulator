import React from 'react';
import { Activity, Cpu, Database, Network, Zap, Target, Layers } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { SectionCard } from '../ui/SectionCard';
import { MetricCard } from '../ui/MetricCard';

export const RightSidebar: React.FC = () => {
  const { state, config } = useSimulation();

  // Mocked data for the premium feel
  const frameTime = (1000 / Math.max(state.fps, 1)).toFixed(1);
  const particleCount = config.viewMode === 'particles' || config.viewMode === 'density' ? '15,000' : '0';
  const memoryUsage = (Math.random() * 10 + 45).toFixed(1); // Mocked memory usage
  const computeLoad = (Math.random() * 20 + 60).toFixed(0); // Mocked compute load

  return (
    <aside className="w-72 bg-[#0a0a0c]/90 border-l border-white/10 flex flex-col h-full overflow-y-auto backdrop-blur-2xl shrink-0 z-40 shadow-[-4px_0_24px_rgba(0,0,0,0.5)]">
      <div className="p-4 flex flex-col gap-4">
        
        {/* Live Metrics */}
        <SectionCard title="Live Metrics" icon={Activity} defaultOpen={true}>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard
              title="FPS"
              value={state.fps}
              icon={Zap}
              trend={state.fps > 50 ? 'up' : state.fps < 30 ? 'down' : 'neutral'}
              trendValue={state.fps > 50 ? 'Stable' : 'Drop'}
            />
            <MetricCard
              title="Frame Time"
              value={`${frameTime}ms`}
              icon={Cpu}
            />
            <MetricCard
              title="Particles"
              value={particleCount}
              icon={Target}
            />
            <MetricCard
              title="Obstacles"
              value={state.obstacles.length}
              icon={Layers}
            />
          </div>
        </SectionCard>

        {/* Diagnostics */}
        <SectionCard title="Diagnostics" icon={Database} defaultOpen={true}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">VRAM Usage</span>
              <span className="text-slate-200 font-mono">{memoryUsage} MB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(parseFloat(memoryUsage) / 100) * 100}%` }} />
            </div>
            
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-slate-400">Compute Load</span>
              <span className="text-slate-200 font-mono">{computeLoad}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${computeLoad}%` }} />
            </div>

            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-slate-400">Grid Resolution</span>
              <span className="text-slate-200 font-mono">{config.gridSize}x{config.gridSize}</span>
            </div>
          </div>
        </SectionCard>

        {/* Cursor Inspector */}
        <SectionCard title="Cursor Inspector" icon={Network} defaultOpen={false}>
          <div className="flex flex-col gap-2 text-sm font-mono text-slate-400">
            <div className="flex justify-between">
              <span>Position</span>
              <span className="text-slate-200">X: 0.00 Y: 0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Velocity</span>
              <span className="text-slate-200">0.00 m/s</span>
            </div>
            <div className="flex justify-between">
              <span>Density</span>
              <span className="text-slate-200">0.00 kg/m³</span>
            </div>
            <div className="flex justify-between">
              <span>Pressure</span>
              <span className="text-slate-200">0.00 Pa</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 italic text-center">
              Hover over canvas to inspect
            </div>
          </div>
        </SectionCard>

      </div>
    </aside>
  );
};
