import React from 'react';
import { TopBar } from './TopBar';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { StatusBar } from './StatusBar';
import { Canvas } from '../simulator/Canvas';

export const AppShell: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0a0c] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <TopBar />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftSidebar />
        <main className="flex-1 relative flex flex-col min-h-[50vh] bg-black/50 overflow-hidden shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-4 rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/80">
            <Canvas />
            {/* Technical Overlay */}
            <div className="absolute top-4 left-4 pointer-events-none">
              <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400/70 bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SIMULATION ACTIVE
              </div>
            </div>
            <div className="absolute bottom-4 right-4 pointer-events-none">
              <div className="text-[10px] font-mono text-slate-500/70 bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/5">
                v2.4.0-beta
              </div>
            </div>
          </div>
        </main>
        <RightSidebar />
      </div>
      <StatusBar />
    </div>
  );
};
