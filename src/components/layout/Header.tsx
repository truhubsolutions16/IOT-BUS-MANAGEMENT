import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Play, Pause, RotateCcw, ShieldCheck, Activity, Cpu, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const {
    isSimulating,
    toggleSimulation,
    lastUpdatedSecondsAgo,
    resetDemoScenario,
    startDemoScenario,
    isScenarioRunning,
  } = useSimulation();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left Title & Demo Banner */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-wide">
                AIoT TRANSPORT SAFETY
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                Control Center
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                DEMO SIMULATION ACTIVE
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                | Vijayawada–Guntur Transit Corridor
              </span>
            </div>
          </div>
        </div>

        {/* Right Simulation Controls & Presentation Action */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Live Simulation Indicator & Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Activity className={`h-4 w-4 ${isSimulating ? 'text-emerald-400 animate-spin' : 'text-slate-500'}`} />
              <span className="font-mono text-slate-200">
                {isSimulating ? 'SIMULATION RUNNING' : 'SIMULATION PAUSED'}
              </span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">
              {lastUpdatedSecondsAgo}s ago
            </span>
            <button
              onClick={toggleSimulation}
              className={`ml-1 p-1 rounded hover:bg-slate-800 transition text-slate-300 ${
                isSimulating ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
              }`}
              title={isSimulating ? 'Pause Simulation' : 'Resume Simulation'}
            >
              {isSimulating ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Reset Demo State Button */}
          <button
            onClick={resetDemoScenario}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-750 text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition text-xs font-medium"
            title="Reset All Demo Values"
          >
            <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Automated Presentation Scenario Trigger */}
          <button
            onClick={startDemoScenario}
            disabled={isScenarioRunning}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-md ${
              isScenarioRunning
                ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white glow-cyan'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>RUN DEMO SCENARIO</span>
          </button>

          {/* Demo Logout */}
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-900/50 transition"
            title="Exit Demo"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
