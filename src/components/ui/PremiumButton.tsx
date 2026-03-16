import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface PremiumButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  active = false,
  className = '',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-colors rounded-lg overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)] border border-indigo-500/50",
    secondary: "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 hover:border-white/20",
    danger: "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/30",
    ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5",
  };

  const activeStyles = active ? "ring-1 ring-indigo-500/50 bg-indigo-500/10 text-indigo-300" : "";

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
