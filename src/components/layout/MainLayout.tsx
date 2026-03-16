import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Canvas } from '../simulator/Canvas';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      <Header />
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 relative min-h-[50vh]">
          <Canvas />
        </main>
      </div>
    </div>
  );
};
