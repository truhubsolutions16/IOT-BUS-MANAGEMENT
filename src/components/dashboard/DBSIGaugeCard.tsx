import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { StatusBadge } from '../common/StatusBadge';
import { Activity, Info, ShieldAlert } from 'lucide-react';

export const DBSIGaugeCard: React.FC = () => {
  const { buses, selectedBusId } = useSimulation();

  // Find selected bus (default TH-104)
  const bus = buses.find((b) => b.id === selectedBusId) || buses[3];
  const { dbsi, dbsiFactors, status } = bus;

  // Color mappings based on DBSI score
  const getGaugeColor = () => {
    if (dbsi > 75) return 'text-red-500 stroke-red-500';
    if (dbsi > 60) return 'text-orange-500 stroke-orange-500';
    if (dbsi > 45) return 'text-amber-500 stroke-amber-500';
    return 'text-emerald-500 stroke-emerald-500';
  };

  const factors = [
    { label: 'Passenger Load', value: dbsiFactors.passengerLoad, color: 'bg-blue-500' },
    { label: 'Vehicle Health', value: dbsiFactors.vehicleHealth, color: 'bg-amber-500' },
    { label: 'Speed Risk', value: dbsiFactors.speedRisk, color: 'bg-cyan-500' },
    { label: 'Demand Risk', value: dbsiFactors.demandRisk, color: 'bg-orange-500' },
    { label: 'Route Risk', value: dbsiFactors.routeRisk, color: 'bg-purple-500' },
  ];

  // SVG Gauge Calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dbsi / 100) * (circumference * 0.75); // 270 degree arc

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              DYNAMIC BUS SAFETY INDEX
            </h2>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-cyan-300">
              {bus.id}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-factor real-time risk assessment model
          </p>
        </div>
        <StatusBadge status={status} size="md" />
      </div>

      {/* Main DBSI Score Visual Dial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-2">
        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center relative py-2">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-135" viewBox="0 0 180 180">
              {/* Background Track */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
                strokeLinecap="round"
              />
              {/* Value Arc */}
              <circle
                cx="90"
                cy="90"
                r={radius}
                className={`transition-all duration-700 ease-out ${getGaugeColor()}`}
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Score Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">
                DBSI
              </div>
              <div className="text-4xl font-extrabold font-mono tracking-tight text-slate-100 my-0.5">
                {dbsi}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                / 100
              </div>
              <div className={`text-xs font-bold font-mono mt-1 ${
                dbsi > 70 ? 'text-red-400' : dbsi > 50 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {status}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Factors Breakdown */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-cyan-400" />
            Safety Factor Breakdown
          </div>

          {factors.map((factor) => (
            <div key={factor.label} className="space-y-1 font-mono">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-sans">{factor.label}</span>
                <span className="font-bold text-slate-200">{factor.value}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${factor.color}`}
                  style={{ width: `${Math.min(100, factor.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 bg-slate-950/60 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-slate-400">
        <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300">DBSI combines: </strong>
          Passenger Load, Load Distribution, Vehicle Health, Speed, Route Conditions, and Predicted Passenger Demand.
        </div>
      </div>
    </div>
  );
};
