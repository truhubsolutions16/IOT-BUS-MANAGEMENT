import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Bus, CheckCircle2, AlertTriangle, AlertOctagon, ShieldAlert, Radio } from 'lucide-react';

export const KPICards: React.FC = () => {
  const { buses } = useSimulation();

  const totalBuses = buses.length;
  const activeBuses = buses.filter((b) => b.isActive).length;
  const safeBuses = buses.filter((b) => b.isActive && b.status === 'SAFE').length;
  const warningBuses = buses.filter((b) => b.isActive && b.status === 'WARNING').length;
  const highRiskBuses = buses.filter((b) => b.isActive && b.status === 'HIGH RISK').length;
  const criticalBuses = buses.filter((b) => b.isActive && b.status === 'CRITICAL').length;

  const kpis = [
    {
      title: 'TOTAL BUSES',
      value: totalBuses,
      subtext: 'Registered Fleet',
      icon: Bus,
      border: 'border-slate-800',
      text: 'text-slate-100',
      bg: 'bg-slate-900/80',
      iconColor: 'text-slate-400',
    },
    {
      title: 'ACTIVE',
      value: activeBuses,
      subtext: 'In Transit Operations',
      icon: Radio,
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      bg: 'bg-cyan-950/20',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'SAFE',
      value: safeBuses,
      subtext: 'DBSI < 50 Low Risk',
      icon: CheckCircle2,
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/20',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'WARNING',
      value: warningBuses,
      subtext: 'DBSI 50–65 Moderate',
      icon: AlertTriangle,
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      bg: 'bg-amber-950/20',
      iconColor: 'text-amber-400',
    },
    {
      title: 'HIGH RISK',
      value: highRiskBuses,
      subtext: 'DBSI 66–80 Overload Risk',
      icon: AlertOctagon,
      border: 'border-orange-500/40 glow-orange',
      text: 'text-orange-400',
      bg: 'bg-orange-950/30',
      iconColor: 'text-orange-400',
    },
    {
      title: 'CRITICAL',
      value: criticalBuses,
      subtext: 'DBSI > 80 Immediate Action',
      icon: ShieldAlert,
      border: 'border-red-500/50 glow-red animate-pulse',
      text: 'text-red-400',
      bg: 'bg-red-950/30',
      iconColor: 'text-red-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.title}
            className={`p-3.5 rounded-xl border ${kpi.border} ${kpi.bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 tracking-wider">
                {kpi.title}
              </span>
              <Icon className={`h-4 w-4 ${kpi.iconColor}`} />
            </div>
            <div className={`text-2xl lg:text-3xl font-extrabold mt-1 tracking-tight ${kpi.text}`}>
              {kpi.value}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate font-medium">
              {kpi.subtext}
            </div>
          </div>
        );
      })}
    </div>
  );
};
