import React from 'react';
import type { SafetyStatus } from '../../types/bus';

interface StatusBadgeProps {
  status: SafetyStatus | string;
  size?: 'sm' | 'md' | 'lg';
  showPulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md', showPulse = true }) => {
  const getColors = () => {
    switch (status) {
      case 'SAFE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'WARNING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'HIGH RISK':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30 glow-orange';
      case 'CRITICAL':
        return 'bg-red-500/10 text-red-400 border-red-500/30 glow-red animate-pulse';
      case 'ONLINE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  const getDotColor = () => {
    switch (status) {
      case 'SAFE':
      case 'ONLINE':
        return 'bg-emerald-400';
      case 'WARNING':
        return 'bg-amber-400';
      case 'HIGH RISK':
        return 'bg-orange-400';
      case 'CRITICAL':
        return 'bg-red-500';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold tracking-wide',
    lg: 'px-3.5 py-1.5 text-sm font-bold tracking-wider',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${getColors()} ${sizeClasses[size]}`}>
      {showPulse && <span className={`h-1.5 w-1.5 rounded-full ${getDotColor()}`} />}
      {status}
    </span>
  );
};
