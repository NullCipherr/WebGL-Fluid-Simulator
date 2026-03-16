import React from 'react';
import { motion } from 'motion/react';

interface PremiumToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const PremiumToggle: React.FC<PremiumToggleProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between py-1 group cursor-pointer" onClick={() => onChange(!checked)}>
      <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
        {label}
      </span>
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
          checked ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-slate-700/50 border border-white/5'
        }`}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
    </div>
  );
};
