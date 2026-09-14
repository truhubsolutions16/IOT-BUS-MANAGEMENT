import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Wrench,
  AlertTriangle,
  Flame,
  Activity,
  Zap,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';

export const MaintenancePage: React.FC = () => {
  const { buses } = useSimulation();
  const busTH109 = buses.find((b) => b.id === 'TH-109') || buses[8];
  const [selectedMetric, setSelectedMetric] = useState<'temp' | 'vibration' | 'voltage'>('temp');

  // Simulated telemetry historical timeline (12 hourly data points showing normal baseline and 1 spike)
  const telemetryHistoryData = [
    { time: '06:00', temp: 58, vibration: 1.1, voltage: 13.8 },
    { time: '07:00', temp: 60, vibration: 1.2, voltage: 13.7 },
    { time: '08:00', temp: 62, vibration: 1.3, voltage: 13.6 },
    { time: '09:00', temp: 61, vibration: 1.2, voltage: 13.5 },
    { time: '10:00', temp: 64, vibration: 1.4, voltage: 13.4 },
    { time: '11:00', temp: 68, vibration: 1.8, voltage: 13.2 },
    { time: '12:00', temp: 72, vibration: 2.2, voltage: 12.9 },
    { time: '13:00', temp: 78, vibration: 2.9, voltage: 12.5 },
    { time: '14:00 (ANOMALY)', temp: 82, vibration: 3.4, voltage: 12.1 }, // ABNORMAL SPIKE
    { time: '15:00', temp: 81, vibration: 3.2, voltage: 12.2 },
    { time: '16:00', temp: 80, vibration: 3.1, voltage: 12.3 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Wrench className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              PREDICTIVE MAINTENANCE DASHBOARD
            </h1>
            <p className="text-xs text-slate-400">
              Vibration FFT Analysis & Engine Thermal Anomaly Early Warning Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs font-mono font-bold animate-pulse">
            1 VEHICLE ANOMALY DETECTED
          </span>
        </div>
      </div>

      {/* Target Focus Bus TH-109 Card */}
      <div className="bg-slate-900/90 border-2 border-orange-500/60 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden glow-orange">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-100">
                BUS {busTH109.id}
              </h2>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                {busTH109.route}
              </span>
              <StatusBadge status={busTH109.status} size="sm" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Location: Autonagar Bus Stop Corridor | Driver: R. Sharma (ID: DRV-442)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Maintenance Risk</div>
              <div className="text-lg font-extrabold text-red-400">HIGH</div>
            </div>
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 font-bold text-xs font-mono">
              ANOMALY DETECTED
            </div>
          </div>
        </div>

        {/* Live Telemetry Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Temperature */}
          <div
            onClick={() => setSelectedMetric('temp')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedMetric === 'temp'
                ? 'bg-orange-950/40 border-orange-500/60 ring-2 ring-orange-500/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>Engine Temperature</span>
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-orange-400">
              {busTH109.temperature}°C
            </div>
            <div className="text-[10px] text-orange-300 font-mono mt-1">
              ▲ +24°C above baseline threshold (58°C)
            </div>
          </div>

          {/* Vibration */}
          <div
            onClick={() => setSelectedMetric('vibration')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedMetric === 'vibration'
                ? 'bg-orange-950/40 border-orange-500/60 ring-2 ring-orange-500/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>Chassis Vibration</span>
              <Activity className="h-4 w-4 text-red-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-red-400">
              {busTH109.vibration}
            </div>
            <div className="text-[10px] text-red-300 font-mono mt-1">
              3.4g peak acceleration on Z-axis
            </div>
          </div>

          {/* Voltage */}
          <div
            onClick={() => setSelectedMetric('voltage')}
            className={`p-4 rounded-xl border cursor-pointer transition ${
              selectedMetric === 'voltage'
                ? 'bg-orange-950/40 border-orange-500/60 ring-2 ring-orange-500/30'
                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
              <span>Battery Voltage</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-amber-400">
              {busTH109.voltage}V
            </div>
            <div className="text-[10px] text-amber-300 font-mono mt-1">
              ▼ 1.7V below nominal charging level
            </div>
          </div>
        </div>

        {/* AI Recommendation Box */}
        <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-400">AI Diagnostic Recommendation</div>
              <div className="text-sm font-semibold text-slate-200 font-sans mt-0.5">
                "Schedule vehicle inspection before next operating cycle."
              </div>
              <div className="text-[11px] text-slate-400 font-sans mt-1">
                Potential radiator coolant leak or alternator bearing wear detected via multi-sensor fusion.
              </div>
            </div>
          </div>

          <button className="px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-slate-950 font-extrabold text-xs font-mono shadow-md transition flex items-center justify-center gap-2 shrink-0">
            <Calendar className="h-4 w-4" />
            <span>SCHEDULE MAINTENANCE INSPECTION</span>
          </button>
        </div>
      </div>

      {/* VIEW VEHICLE HEALTH Telemetry Timeline Chart */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              VIEW VEHICLE HEALTH TELEMETRY
            </h3>
            <p className="text-xs text-slate-400">
              Historical sensor telemetry showing abnormal thermal/vibration spike
            </p>
          </div>

          {/* Metric selector tabs */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setSelectedMetric('temp')}
              className={`px-3 py-1 rounded transition ${selectedMetric === 'temp' ? 'bg-orange-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Temperature (°C)
            </button>
            <button
              onClick={() => setSelectedMetric('vibration')}
              className={`px-3 py-1 rounded transition ${selectedMetric === 'vibration' ? 'bg-red-500 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Vibration (g)
            </button>
            <button
              onClick={() => setSelectedMetric('voltage')}
              className={`px-3 py-1 rounded transition ${selectedMetric === 'voltage' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Voltage (V)
            </button>
          </div>
        </div>

        {/* Recharts Line Timeline */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryHistoryData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke={selectedMetric === 'temp' ? '#f97316' : selectedMetric === 'vibration' ? '#ef4444' : '#eab308'}
                strokeWidth={3}
                dot={{ r: 4, fill: '#0f172a', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
              {/* Highlight AI Anomaly Point at 14:00 */}
              <ReferenceDot
                x="14:00 (ANOMALY)"
                y={selectedMetric === 'temp' ? 82 : selectedMetric === 'vibration' ? 3.4 : 12.1}
                r={10}
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth={3}
                label={{ value: 'AI ANOMALY', fill: '#ef4444', fontSize: 12, fontWeight: 'bold', position: 'top' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span>Spike at 14:00 identified as an engine overheating anomaly by AIoT Random Forest Anomaly Detector.</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">Model Accuracy: 98.4%</span>
        </div>
      </div>
    </div>
  );
};
