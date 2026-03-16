import { useEffect, useRef } from 'react';
import { FluidEngine } from '../engine/core/FluidEngine';
import { useSimulation } from '../context/SimulationContext';

/**
 * Hook to manage the requestAnimationFrame loop.
 */
export function useAnimationLoop(engine: FluidEngine | null) {
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const lastFpsUpdateRef = useRef<number>(0);
  const { state, setState } = useSimulation();

  const animate = (time: number) => {
    if (!engine) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    if (lastTimeRef.current !== 0) {
      const deltaTime = (time - lastTimeRef.current) / 1000; // in seconds
      
      // Calculate FPS
      if (deltaTime > 0) {
        if (time - lastFpsUpdateRef.current > 500) {
          const fps = Math.round(1 / deltaTime);
          setState(prev => ({ ...prev, fps }));
          lastFpsUpdateRef.current = time;
        }
      }

      if (state.isRunning) {
        engine.update(deltaTime);
      }
      
      // We render every frame, even if paused, to allow for interactive drawing while paused
      engine.render();
    }
    
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [engine, state.isRunning]); // Re-bind if engine or running state changes
}
