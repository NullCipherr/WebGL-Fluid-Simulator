import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900/40 border border-white/5 rounded-xl p-4 flex flex-col gap-2 shadow-lg backdrop-blur-md"
    >
      <div className="flex items-center justify-between text-slate-400">
        <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{value}</span>
        {trend && trendValue && (
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' :
              trend === 'down' ? 'bg-rose-500/10 text-rose-400' :
              'bg-slate-500/10 text-slate-400'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
    </motion.div>
  );
};
