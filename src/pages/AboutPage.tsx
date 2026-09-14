import React from 'react';
import { ShieldCheck, Cpu, GitMerge, Wrench, BarChart2, Layers, CheckCircle2, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const uniquenessCards = [
    {
      title: '1. Predictive Safety',
      desc: 'Predicts unsafe passenger loading and overcrowding before it occurs at upcoming stops.',
      icon: ShieldCheck,
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400',
    },
    {
      title: '2. Dynamic Bus Safety Index',
      desc: 'Combines passenger load, vehicle health, speed, demand, and route risk into a unified index (DBSI).',
      icon: Layers,
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400',
    },
    {
      title: '3. Passenger Redistribution',
      desc: 'Recommends nearby corridor buses with available capacity to absorb excess passenger surges.',
      icon: GitMerge,
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-400',
    },
    {
      title: '4. Predictive Maintenance',
      desc: 'Identifies abnormal engine temperature, chassis vibration, and voltage drops before catastrophic failure.',
      icon: Wrench,
      color: 'border-orange-500/50 bg-orange-950/20 text-orange-400',
    },
    {
      title: '5. Fleet-Level Intelligence',
      desc: 'Considers multiple buses across transit corridors when making dynamic spatial recommendations.',
      icon: BarChart2,
      color: 'border-blue-500/50 bg-blue-950/20 text-blue-400',
    },
    {
      title: '6. AIoT Integration',
      desc: 'Seamlessly connects physical hardware sensors, AI/ML predictions, and real-time decision-making.',
      icon: Cpu,
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-400',
    },
  ];

  const feasibilityItems = [
    {
      title: 'TECHNICAL FEASIBILITY',
      desc: 'Existing IoT sensors (IR counters, MPU6050, DS18B20), GPS modules, ESP32 microcontrollers, and standard Python/React AI/ML frameworks can readily implement the system prototype.',
    },
    {
      title: 'ECONOMIC FEASIBILITY',
      desc: 'Low-cost edge sensors ($15–$30 per vehicle) and open-source software stack make fleet-wide adoption affordable for public transport authorities.',
    },
    {
      title: 'OPERATIONAL FEASIBILITY',
      desc: 'The centralized control-center dashboard provides simple, actionable 1-click recommendations to transit dispatchers without requiring manual route recalculations.',
    },
    {
      title: 'SCALABILITY',
      desc: 'Modular microservice and edge-cloud architecture allows seamless scaling from a 20-bus prototype to city-wide fleets of 1,000+ public transit buses.',
    },
    {
      title: 'DATA FEASIBILITY',
      desc: 'Simulated telemetry can be directly replaced with real RTC bus sensor streams, ticketing APIs, and GPS feeds in future production deployments.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              PROJECT UNIQUENESS & FEASIBILITY
            </h1>
            <p className="text-xs text-slate-400">
              College Capstone Project Defense & System Evaluation Matrix
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
          Academic Presentation Model
        </span>
      </div>

      {/* SECTION 1: PROJECT UNIQUENESS (6 CARDS) */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2 font-mono">
          <ShieldCheck className="h-5 w-5 text-cyan-400" />
          PROJECT UNIQUENESS (KEY INNOVATIONS)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uniquenessCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`p-5 rounded-2xl border ${card.color} shadow-xl backdrop-blur-md space-y-2 hover:scale-[1.02] transition duration-200`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-100 font-mono">{card.title}</h3>
                  <Icon className="h-5 w-5 opacity-80" />
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: FEASIBILITY ANALYSIS */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2 font-mono">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          FEASIBILITY ANALYSIS
        </h2>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-4 font-mono">
          {feasibilityItems.map((item, idx) => (
            <div key={item.title} className="p-4 bg-slate-950/70 rounded-xl border border-slate-850 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">
                  0{idx + 1}
                </span>
                <span>{item.title}</span>
              </div>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
