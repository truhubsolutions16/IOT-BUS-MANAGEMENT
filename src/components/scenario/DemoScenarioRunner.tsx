import React, { useEffect, useState, useCallback } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Play, Pause, ChevronRight, RotateCcw, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export const DemoScenarioRunner: React.FC = () => {
  const {
    isScenarioRunning,
    stopDemoScenario,
    approveRedistribution,
    resetDemoScenario,
    setSelectedBusId,
    setActiveTab,
  } = useSimulation();

  const [step, setStep] = useState<number>(1);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const scenarioSteps = [
    {
      num: 1,
      title: 'STEP 1: Inspect Baseline Telemetry',
      desc: 'Bus TH-104 currently carrying 54 / 60 passengers (90% capacity).',
      action: () => {
        setActiveTab('dashboard');
        setSelectedBusId('TH-104');
      },
    },
    {
      num: 2,
      title: 'STEP 2: Simulated Passenger Demand Signal',
      desc: 'System receives simulated stop boarding demand: +12 passengers queued at Benz Circle.',
      action: () => {
        setSelectedBusId('TH-104');
      },
    },
    {
      num: 3,
      title: 'STEP 3: AI Predictive Overload Forecast',
      desc: 'AI predicts expected load: 54 + 12 = 66 passengers (Capacity exceeded by 6).',
      action: () => {},
    },
    {
      num: 4,
      title: 'STEP 4: Dynamic Bus Safety Index (DBSI) Spike',
      desc: 'DBSI risk index jumps from 43 → 72. Safety Status transitions: SAFE → HIGH RISK.',
      action: () => {},
    },
    {
      num: 5,
      title: 'STEP 5: Fleet Spatial Proximity Scan',
      desc: 'System scans nearby corridor buses: TH-108 (28/60), TH-112 (39/60), TH-115 (52/60).',
      action: () => {},
    },
    {
      num: 6,
      title: 'STEP 6: AI Choice Engine Rationale',
      desc: 'AI recommends redirecting excess 6 passengers to Bus TH-108 due to highest available capacity (32 vacant seats).',
      action: () => {},
    },
    {
      num: 7,
      title: 'STEP 7: Redistribution Recommendation Generated',
      desc: 'Control center renders actionable decision plan with before/after load forecasts.',
      action: () => {},
    },
    {
      num: 8,
      title: 'STEP 8: Dispatcher Action Approval',
      desc: 'Clicking APPROVE DEMO ACTION to authorize dynamic passenger redistribution.',
      action: () => {},
    },
    {
      num: 9,
      title: 'STEP 9: Simulated Load Redistribution',
      desc: 'Load transfer executed: TH-104 drops from 54 → 48 pax; TH-108 absorbs 6 pax (28 → 34 pax).',
      action: () => {
        approveRedistribution();
      },
    },
    {
      num: 10,
      title: 'STEP 10: DBSI Recalculation & Recovery',
      desc: 'DBSI score recalculates: 72 → 43. Safety status recovers: HIGH RISK → SAFE.',
      action: () => {},
    },
    {
      num: 11,
      title: 'STEP 11: Risk Mitigation Confirmed',
      desc: '✓ PREDICTED RISK SUCCESSFULLY MITIGATED (Demo action completed safely).',
      action: () => {},
    },
  ];

  const handleNextStep = useCallback(() => {
    if (step < 11) {
      const nextStepNum = step + 1;
      setStep(nextStepNum);
      scenarioSteps[nextStepNum - 1].action();
    } else {
      setAutoPlay(false);
    }
  }, [step, scenarioSteps]);

  // Auto-play timer (every 2.5 seconds advance step)
  useEffect(() => {
    if (!isScenarioRunning || !autoPlay) return;

    const timer = setInterval(() => {
      if (step < 11) {
        handleNextStep();
      } else {
        setAutoPlay(false);
      }
    }, 2800);

    return () => clearInterval(timer);
  }, [isScenarioRunning, autoPlay, step, handleNextStep]);

  if (!isScenarioRunning) return null;

  const currentScenario = scenarioSteps[step - 1];

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[480px] z-50 bg-slate-950/95 border-2 border-cyan-500/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md text-slate-100 font-mono glow-cyan animate-pulse-subtle">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-400 animate-spin" />
          <div>
            <h4 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
              DEMO PRESENTATION SCENARIO MODE
            </h4>
            <div className="text-[10px] text-slate-400">
              Step {step} of 11 ({Math.round((step / 11) * 100)}% Complete)
            </div>
          </div>
        </div>

        <button
          onClick={stopDemoScenario}
          className="text-slate-400 hover:text-white p-1 rounded bg-slate-900 border border-slate-800"
          title="Exit Scenario"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${(step / 11) * 100}%` }}
        />
      </div>

      {/* Current Step Description */}
      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 mb-3 space-y-1">
        <div className="text-xs font-extrabold text-slate-100 flex items-center gap-1.5">
          {step === 11 ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">
              STEP {step}
            </span>
          )}
          <span>{currentScenario.title}</span>
        </div>
        <p className="text-[11px] text-slate-300 font-sans leading-snug">
          {currentScenario.desc}
        </p>
      </div>

      {/* Controls Footer */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <button
          onClick={() => {
            resetDemoScenario();
            setStep(1);
          }}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 text-[11px]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Restart Scenario
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 text-[11px] flex items-center gap-1"
          >
            {autoPlay ? <Pause className="h-3 w-3 text-amber-400" /> : <Play className="h-3 w-3 text-emerald-400" />}
            {autoPlay ? 'Pause' : 'Auto Play'}
          </button>

          {step < 11 && (
            <button
              onClick={handleNextStep}
              className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] flex items-center gap-1 shadow"
            >
              <span>Next Step</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
