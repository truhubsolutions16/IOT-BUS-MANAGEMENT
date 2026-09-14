import React from 'react';
import { GitMerge, Cpu, Radio, Server, Brain, ShieldAlert, ArrowDown, Activity, Users } from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  const steps = [
    {
      stage: 'STAGE 1',
      title: 'SENSORS & EDGE TELEMETRY',
      subtitle: 'IR Passenger Counter + Vehicle Health (Temp/Vibration/Voltage) + High-Precision GPS + Route Schedule Data',
      icon: Users,
      color: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-400',
    },
    {
      stage: 'STAGE 2',
      title: 'ESP32 / EDGE CONTROLLER',
      subtitle: 'Dual-core 240MHz microcontroller running local sensor filtering & CAN-Bus telemetry aggregation.',
      icon: Cpu,
      color: 'border-blue-500/50 bg-blue-950/30 text-blue-400',
    },
    {
      stage: 'STAGE 3',
      title: 'IoT COMMUNICATION GATEWAY',
      subtitle: '4G LTE / LoRaWAN low-latency packet transmission to cloud command node.',
      icon: Radio,
      color: 'border-purple-500/50 bg-purple-950/30 text-purple-400',
    },
    {
      stage: 'STAGE 4',
      title: 'BACKEND TELEMETRY PIPELINE',
      subtitle: 'Time-series ingestion engine, data cleaning & spatial interpolation.',
      icon: Server,
      color: 'border-indigo-500/50 bg-indigo-950/30 text-indigo-400',
    },
    {
      stage: 'STAGE 5',
      title: 'AI / ML PREDICTION ENGINE',
      subtitle: 'LSTM Passenger Accumulation Model & Random Forest Anomaly Detector.',
      icon: Brain,
      color: 'border-amber-500/50 bg-amber-950/30 text-amber-400',
    },
    {
      stage: 'STAGE 6',
      title: 'DYNAMIC BUS SAFETY INDEX (DBSI)',
      subtitle: 'Multi-factor risk scoring engine combining load, speed, health & demand.',
      icon: Activity,
      color: 'border-orange-500/50 bg-orange-950/30 text-orange-400',
    },
    {
      stage: 'STAGE 7',
      title: 'DECISION ENGINE',
      subtitle: 'Corridor spatial Optimization algorithm evaluating candidate bus capacities.',
      icon: ShieldAlert,
      color: 'border-red-500/50 bg-red-950/30 text-red-400',
    },
    {
      stage: 'STAGE 8',
      title: 'PASSENGER REDISTRIBUTION + PREDICTIVE MAINTENANCE',
      subtitle: 'Dual output action dispatchers generating load-balancing plans & maintenance alerts.',
      icon: GitMerge,
      color: 'border-emerald-500/50 bg-emerald-950/30 text-emerald-400',
    },
    {
      stage: 'STAGE 9',
      title: 'INTELLIGENT CONTROL CENTER',
      subtitle: 'Live transit command center web dashboard displaying actionable intelligence.',
      icon: Cpu,
      color: 'border-cyan-400 bg-cyan-950/50 text-cyan-300 glow-cyan',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <GitMerge className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              SYSTEM ARCHITECTURE & PIPELINE
            </h1>
            <p className="text-xs text-slate-400">
              End-to-End AIoT Sensing, Prediction & Decision Flow
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
          9 Pipeline Stages
        </span>
      </div>

      {/* Animated Pipeline Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md max-w-4xl mx-auto space-y-4 font-mono">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={step.stage}>
              <div className={`p-4 rounded-xl border ${step.color} shadow-lg transition-all duration-300 hover:scale-[1.01] flex items-start gap-4`}>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 shrink-0 mt-0.5">
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 tracking-widest">{step.stage}</span>
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <h3 className="text-sm font-extrabold tracking-wide mt-0.5">{step.title}</h3>
                  <p className="text-xs font-sans text-slate-300 mt-1">{step.subtitle}</p>
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 animate-pulse" />
                    <ArrowDown className="h-4 w-4 text-cyan-400 animate-bounce" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
