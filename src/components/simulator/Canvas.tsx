import React, { useEffect } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { useAnimationLoop } from '../../hooks/useAnimationLoop';
import { useSimulation } from '../../context/SimulationContext';

export const Canvas: React.FC = () => {
  const { canvasRef, engine } = useCanvas();
  const { state } = useSimulation();
  
  // Start the animation loop
  useAnimationLoop(engine);

  // Update obstacles when they change in state
  useEffect(() => {
    if (engine) {
      engine.updateObstacles(state.obstacles);
    }
  }, [engine, state.obstacles]);

  return (
    <div className="relative w-full h-full bg-[#0a0c10] overflow-hidden flex items-center justify-center">
      {/* The canvas container needs to be responsive */}
      <div className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair touch-none"
        />
      </div>
      
      {/* Overlay for technical aesthetic */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
};
