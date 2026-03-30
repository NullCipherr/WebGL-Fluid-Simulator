import { useRef, useEffect, useState } from 'react';
import { FluidEngine } from '../engine/core/FluidEngine';
import { useSimulation } from '../context/SimulationContext';

/**
 * Hook to manage the canvas element and instantiate the FluidEngine.
 */
export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FluidEngine | null>(null);
  const { config, setState, state } = useSimulation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Instantiate engine
    const engine = new FluidEngine(canvas, config);
    engine.onObstacleChange = (obstacles) => {
      setState(prev => ({ ...prev, obstacles }));
    };
    engine.initialize();
    engineRef.current = engine;
    
    setIsReady(true);
    setState(prev => ({ ...prev, isInitialized: true }));

    // Handle resize
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        engine.resize(parent.clientWidth, parent.clientHeight);
        // Force a render so it doesn't wait for the next animation frame if paused
        engine.render();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => {
      window.removeEventListener('resize', handleResize);
      engine.dispose();
      engineRef.current = null;
      setState(prev => ({ ...prev, isInitialized: false }));
    };
  }, []); // Run once on mount

  // Update engine config when context config changes
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.updateConfig(config);
      // Force render to show changes immediately if paused
      engineRef.current.render();
    }
  }, [config]);

  // Handle reset
  useEffect(() => {
    if (engineRef.current && state.resetTrigger > 0) {
      engineRef.current.reset();
      engineRef.current.render();
    }
  }, [state.resetTrigger]);

  return { canvasRef, engine: engineRef.current, isReady };
}
