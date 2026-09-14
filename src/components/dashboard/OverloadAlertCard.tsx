import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertOctagon, ArrowDown, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export const OverloadAlertCard: React.FC = () => {
  const { buses, selectedBusId, redistributionPlan } = useSimulation();

  const targetBusId = selectedBusId || 'TH-104';
  const bus = buses.find((b) => b.id === targetBusId) || buses[3]; // TH-104

  const isApproved = redistributionPlan.approved && targetBusId === 'TH-104';

  return (
    <div className={`border rounded-xl p-5 shadow-xl backdrop-blur-md transition-all duration-300 ${
      isApproved
        ? 'bg-emerald-950/20 border-emerald-500/40 glow-green'
        : 'bg-orange-950/20 border-orange-500/50 glow-orange'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${isApproved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
            <AlertOctagon className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-100 flex items-center gap-2">
              PREDICTIVE OVERLOAD ALERT
            </h2>
            <p className="text-xs text-slate-400">
              AI Passenger Accumulation & Boarding Forecast Engine
            </p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-mono font-extrabold tracking-wider ${
          isApproved
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            : 'bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse'
        }`}>
          {isApproved ? 'RISK MITIGATED' : 'OVERLOAD PREDICTED'}
        </span>
      </div>

      {/* Target Bus Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono mb-5">
        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Target Bus ID</div>
          <div className="text-base font-extrabold text-cyan-400">{bus.id}</div>
          <div className="text-[10px] text-slate-500 font-sans truncate">{bus.route}</div>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Upcoming Stop</div>
          <div className="text-base font-extrabold text-slate-100">{bus.nextStop}</div>
          <div className="text-[10px] text-amber-400">Next stop arrival ~2 mins</div>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Current Passengers</div>
          <div className="text-base font-extrabold text-slate-100">
            {bus.passengers} <span className="text-xs text-slate-500">/ {bus.capacity}</span>
          </div>
          <div className="text-[10px] text-slate-400">{bus.occupancy}% occupancy</div>
        </div>

        <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase">Predicted Boarding</div>
          <div className="text-base font-extrabold text-amber-400 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            +{bus.predictedDemand} pax
          </div>
          <div className="text-[10px] text-slate-400">Ticket & Stop sensor data</div>
        </div>
      </div>

      {/* Step-by-Step Visual Flow Diagram */}
      <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 font-mono">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
          <span>Visual Prediction Flow</span>
          <span className="text-[11px] text-cyan-400 font-sans font-semibold">
            Risk predicted approx. 1 stop ahead
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-center">
          {/* Step 1: Current */}
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase">CURRENT</div>
            <div className="text-xl font-bold text-slate-100 my-0.5">{bus.passengers}</div>
            <div className="text-[10px] text-slate-500">Passengers</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowDown className="h-5 w-5 -rotate-90 text-cyan-500/70" />
          </div>

          {/* Step 2: Predicted Boarding */}
          <div className="bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/40">
            <div className="text-[10px] text-amber-400 uppercase">PREDICTED BOARDING</div>
            <div className="text-xl font-bold text-amber-300 my-0.5">+{bus.predictedDemand}</div>
            <div className="text-[10px] text-amber-400/80">At Benz Circle</div>
          </div>

          <div className="hidden md:flex justify-center text-slate-600">
            <ArrowDown className="h-5 w-5 -rotate-90 text-cyan-500/70" />
          </div>

          {/* Step 3: Expected & Capacity Risk */}
          <div className={`p-2.5 rounded-lg border ${
            isApproved ? 'bg-emerald-950/40 border-emerald-500/50' : 'bg-red-950/40 border-red-500/50'
          }`}>
            <div className="text-[10px] text-slate-400 uppercase">EXPECTED OCCUPANCY</div>
            <div className={`text-xl font-extrabold my-0.5 ${isApproved ? 'text-emerald-400' : 'text-red-400'}`}>
              {bus.predictedPassengers} <span className="text-xs text-slate-400">/ {bus.capacity}</span>
            </div>
            <div className={`text-[10px] font-bold ${isApproved ? 'text-emerald-400' : 'text-red-400'}`}>
              {isApproved ? 'SAFE (48 pax)' : 'HIGH OVERLOAD RISK'}
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Notice Footer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-cyan-400" />
          <span>IR Passenger Counter & Bus Stop Smart Kiosk Integration</span>
        </div>
        <div className="flex items-center gap-1 text-slate-500">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
          <span>AI Forecast Confidence: 94.2%</span>
        </div>
      </div>
    </div>
  );
};
