import React from 'react';
import { Activity, Cpu, Database, Gauge, Network, Zap, Target, Layers } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';
import { SectionCard } from '../ui/SectionCard';
import { MetricCard } from '../ui/MetricCard';

export const RightSidebar: React.FC = () => {
  const { state, config } = useSimulation();

  const frameTime = state.frameTimeMs > 0 ? state.frameTimeMs.toFixed(1) : '0.0';
  const particleCount =
    config.viewMode === 'particles' || config.viewMode === 'density'
      ? state.activeParticles.toLocaleString('pt-BR')
      : '0';
  const memoryUsage = state.estimatedMemoryMB.toFixed(1);
  const computeLoad = state.computeLoadPct.toString();
  const frameSamples = state.frameTimeHistoryMs;
  const sortedSamples = [...frameSamples].sort((a, b) => a - b);
  const minFrame = sortedSamples.length > 0 ? sortedSamples[0] : 0;
  const maxFrame = sortedSamples.length > 0 ? sortedSamples[sortedSamples.length - 1] : 0;
  const avgFrame =
    frameSamples.length > 0
      ? frameSamples.reduce((sum, item) => sum + item, 0) / frameSamples.length
      : 0;
  const p95Frame =
    sortedSamples.length > 0
      ? sortedSamples[Math.min(sortedSamples.length - 1, Math.floor(sortedSamples.length * 0.95))]
      : 0;
  const benchmark = state.lastBenchmarkResult;

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
              <span className="text-slate-400">Mem. Estimada</span>
              <span className="text-slate-200 font-mono">{memoryUsage} MB</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (parseFloat(memoryUsage) / 256) * 100)}%` }} />
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

        {/* Benchmark Mode */}
        <SectionCard title="Benchmark Mode" icon={Cpu} defaultOpen={true}>
          <div className="flex flex-col gap-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Status</span>
              <span className={state.benchmarkRunning ? 'text-amber-300' : 'text-emerald-300'}>
                {state.benchmarkRunning ? 'EXECUTANDO' : 'IDLE'}
              </span>
            </div>
            {benchmark ? (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-400">Seed</span>
                  <span className="text-slate-200">{benchmark.seed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">FPS Est.</span>
                  <span className="text-slate-200">{benchmark.fpsEstimate.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Frame Médio</span>
                  <span className="text-slate-200">{benchmark.avgFrameTimeMs.toFixed(2)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Checksum</span>
                  <span className="text-slate-200 truncate max-w-[150px]" title={benchmark.checksum}>
                    {benchmark.checksum}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-slate-500">Dispare o benchmark no TopBar para gerar baseline comparável.</div>
            )}
          </div>
        </SectionCard>

        {/* Frame Profiler */}
        <SectionCard title="Frame Profiler" icon={Gauge} defaultOpen={true}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-900/40 border border-white/5 rounded px-2 py-1.5">
                <div className="text-slate-400">Min</div>
                <div className="text-slate-200">{minFrame.toFixed(1)}ms</div>
              </div>
              <div className="bg-slate-900/40 border border-white/5 rounded px-2 py-1.5">
                <div className="text-slate-400">Média</div>
                <div className="text-slate-200">{avgFrame.toFixed(1)}ms</div>
              </div>
              <div className="bg-slate-900/40 border border-white/5 rounded px-2 py-1.5">
                <div className="text-slate-400">P95</div>
                <div className="text-slate-200">{p95Frame.toFixed(1)}ms</div>
              </div>
              <div className="bg-slate-900/40 border border-white/5 rounded px-2 py-1.5">
                <div className="text-slate-400">Max</div>
                <div className="text-slate-200">{maxFrame.toFixed(1)}ms</div>
              </div>
            </div>

            <div className="h-14 flex items-end gap-1 rounded bg-slate-900/30 border border-white/5 p-2">
              {frameSamples.slice(-30).map((sample, idx) => (
                <div
                  key={`${idx}-${sample.toFixed(2)}`}
                  className="flex-1 rounded-sm bg-cyan-400/70"
                  style={{ height: `${Math.max(8, Math.min(100, (sample / 33) * 100))}%` }}
                  title={`${sample.toFixed(2)}ms`}
                />
              ))}
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
