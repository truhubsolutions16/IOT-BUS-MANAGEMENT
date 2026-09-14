import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Radio, Cpu, Info, RefreshCw } from 'lucide-react';

export const HardwarePage: React.FC = () => {
  const { hardware } = useSimulation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Radio className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              SIMULATED AIoT HARDWARE PANEL
            </h1>
            <p className="text-xs text-slate-400">
              Edge Sensing Hardware Status & Sensor Signal Monitor
            </p>
          </div>
        </div>

        {/* REQUIRED HARDWARE DEMO NOTICE BADGE */}
        <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Hardware integration is simulated for this demonstration.</span>
        </div>
      </div>

      {/* Sensor Modules Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {hardware.map((dev) => (
          <div
            key={dev.name}
            className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[10px] text-slate-400 uppercase">{dev.type}</div>
                <h3 className="text-xs font-bold text-slate-100 mt-0.5">{dev.name}</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                {dev.status}
              </span>
            </div>

            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
              <div className="text-[10px] text-slate-400">Live Reading Payload</div>
              <div className="text-cyan-300 font-semibold truncate">{dev.readings}</div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <RefreshCw className="h-3 w-3 text-cyan-500 animate-spin" />
                Ping: {dev.lastPing}
              </span>
              <span>Bus Bar: TH-104</span>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Hardware Specifications Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-3 font-mono">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-cyan-400" />
          Hardware Architecture Specs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-bold">• Microcontroller Core</div>
            <div>ESP32 WROOM-32U Dual-Core Xtensa LX6 @ 240MHz</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-bold">• Telemetry Sensors</div>
            <div>Optoelectronic IR break-beam counter, MPU6050 Accelerometer, DS18B20 Temp Probe</div>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="text-cyan-400 font-bold">• Wireless Protocol</div>
            <div>MQTT over 4G LTE cellular telemetry gateway with local Flash buffering fallback</div>
          </div>
        </div>
      </div>
    </div>
  );
};
