import React from 'react';
import { Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 border-b border-white/5 bg-slate-950/50 backdrop-blur-md flex items-center px-6 shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
          <Activity className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-slate-200 tracking-tight">Fluid Dynamics</h1>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Computational Engine v0.2</p>
        </div>
      </div>
    </header>
  );
};
