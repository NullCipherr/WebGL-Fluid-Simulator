import React from 'react';
import { motion } from 'motion/react';

interface PremiumSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
}

export const PremiumSlider: React.FC<PremiumSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 w-full group">
      <div className="flex justify-between items-center text-xs">
        <label className="text-slate-400 font-medium tracking-wide">{label}</label>
        <span className="text-slate-300 font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5 group-hover:border-white/10 transition-colors">
          {Number.isInteger(value) ? value : value.toFixed(2)}{unit}
        </span>
      </div>
      <div className="relative h-4 flex items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
        />
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
            layout
          />
        </div>
        <motion.div
          className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none"
          style={{ left: `calc(${percentage}% - 6px)` }}
          layout
        />
      </div>
    </div>
  );
};
