import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { StatusBadge } from '../common/StatusBadge';
import { Sparkles, CheckCircle2, ArrowRight, Bus as BusIcon, ShieldCheck, Info } from 'lucide-react';

export const RedistributionCard: React.FC = () => {
  const { redistributionPlan, approveRedistribution } = useSimulation();
  const [showPlanModal, setShowPlanModal] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const {
    overloadedBusId,
    excessPassengers,
    candidates,
    recommendedBusId,
    recommendationReasons,
    approved,
  } = redistributionPlan;

  const handleApprove = () => {
    setIsAnimating(true);
    setTimeout(() => {
      approveRedistribution();
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className={`border rounded-xl p-5 shadow-xl backdrop-blur-md transition-all duration-500 relative overflow-hidden ${
      approved
        ? 'bg-emerald-950/20 border-emerald-500/40 glow-green'
        : 'bg-slate-900/90 border-cyan-500/50 glow-cyan'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Sparkles className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              AI REDISTRIBUTION RECOMMENDATION
            </h2>
            <p className="text-xs text-slate-400">
              Fleet-Level Intelligent Dynamic Passenger Load Balancing
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-slate-800 text-xs font-mono font-bold text-cyan-300">
          Target: Bus {overloadedBusId}
        </span>
      </div>

      {/* Target Excess & Recommended Summary */}
      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
        <div>
          <div className="text-xs text-slate-400">Predicted Overload Excess</div>
          <div className="text-lg font-extrabold text-orange-400">
            {excessPassengers} Passengers Exceeding Safety Threshold
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold">
            Redirecting to: <span className="text-white font-extrabold">{recommendedBusId}</span>
          </div>
        </div>
      </div>

      {/* Nearby Buses Capacity Matrix */}
      <div className="mb-5">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <BusIcon className="h-4 w-4 text-cyan-400" />
          Nearby Candidate Buses in 1.5 km Radius
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {candidates.map((cand) => {
            const isRecommended = cand.busId === recommendedBusId;
            return (
              <div
                key={cand.busId}
                className={`p-3 rounded-xl border transition-all ${
                  isRecommended
                    ? 'bg-cyan-950/40 border-cyan-500/60 ring-2 ring-cyan-500/30 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-extrabold font-mono text-sm text-slate-100 flex items-center gap-1.5">
                    {cand.busId}
                    {isRecommended && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500 text-slate-950 font-bold">
                        AI CHOICE
                      </span>
                    )}
                  </div>
                  <StatusBadge status={cand.status} size="sm" showPulse={false} />
                </div>

                <div className="text-[11px] text-slate-400 font-sans truncate mb-2">{cand.route}</div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Occupancy</span>
                    <span className="font-bold">{cand.passengers} / {cand.capacity} ({cand.occupancy}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-cyan-400 h-full rounded-full"
                      style={{ width: `${cand.occupancy}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                    <span>Distance: {cand.distanceKm} km</span>
                    <span>ETA: ~{cand.etaMinutes} min</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation Box & Action Controls */}
      <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 font-sans">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-extrabold text-cyan-300 flex items-center gap-1.5 mb-1">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              AI Recommendation: REDIRECT APPROX. {excessPassengers} PASSENGERS TO {recommendedBusId}
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300 font-mono mt-2">
              {recommendationReasons.map((reason, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowPlanModal(true)}
              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-750 text-slate-300 hover:text-slate-100 text-xs font-semibold font-mono transition"
            >
              VIEW PLAN
            </button>

            {!approved ? (
              <button
                onClick={handleApprove}
                disabled={isAnimating}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs font-mono shadow-lg transition flex items-center gap-2 glow-green"
              >
                {isAnimating ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    EXECUTING...
                  </span>
                ) : (
                  <>
                    <span>APPROVE DEMO ACTION</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            ) : (
              <div className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-extrabold text-xs font-mono flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>REDISTRIBUTION COMPLETED</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulated Redistribution State Transition Showcase */}
      {approved && (
        <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono space-y-3">
          <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-800/60 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>SIMULATED REDISTRIBUTION RESULTS</span>
            </div>
            <span>DBSI: 72 → 43 (SAFE)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-200">
            <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Bus TH-104 (Target)</div>
              <div className="text-sm font-extrabold mt-0.5">
                Before: <span className="text-red-400">54 / 60</span> (90%) → After: <span className="text-emerald-400">48 / 60</span> (80%)
              </div>
              <div className="text-[10px] text-emerald-400">Status: HIGH RISK → SAFE</div>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Bus TH-108 (Absorber)</div>
              <div className="text-sm font-extrabold mt-0.5">
                Before: <span className="text-cyan-400">28 / 60</span> (46%) → After: <span className="text-emerald-400">34 / 60</span> (57%)
              </div>
              <div className="text-[10px] text-cyan-300">Absorbed 6 passengers at Benz Circle</div>
            </div>
          </div>

          <div className="text-[11px] text-amber-300/90 font-sans flex items-center gap-1.5 pt-1">
            <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Demo action — no real passenger movement occurred.</span>
          </div>
        </div>
      )}

      {/* View Plan Detailed Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                AI Redistribution Plan Breakdown
              </h3>
              <button
                onClick={() => setShowPlanModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono font-bold"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono text-slate-300">
              <p className="text-slate-400 font-sans">
                The decision engine predicts passenger queuing at Benz Circle based on digital ticketing scans and optical platform counts.
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <div>• Overloaded Unit: <strong className="text-white">TH-104</strong></div>
                <div>• Route Corridor: <strong className="text-cyan-300">Vijayawada → Guntur</strong></div>
                <div>• Upcoming Stop: <strong className="text-amber-300">Benz Circle</strong></div>
                <div>• Redirect Target: <strong className="text-emerald-400">TH-108 (+6 pax capacity)</strong></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowPlanModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg font-mono"
              >
                Done Inspecting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
