import React, { useState } from 'react';
import { LineChart as LineChartIcon, Calendar, ShieldCheck, Activity, Users } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7d' | '30d'>('today');

  const hourlyData = [
    { time: '06:00', demand: 120, occupancy: 42, dbsiAvg: 28, overloadEvents: 0, redistributions: 0 },
    { time: '08:00', demand: 480, occupancy: 88, dbsiAvg: 68, overloadEvents: 4, redistributions: 3 },
    { time: '10:00', demand: 310, occupancy: 65, dbsiAvg: 45, overloadEvents: 1, redistributions: 1 },
    { time: '12:00', demand: 250, occupancy: 58, dbsiAvg: 38, overloadEvents: 0, redistributions: 0 },
    { time: '14:00', demand: 410, occupancy: 82, dbsiAvg: 62, overloadEvents: 3, redistributions: 2 },
    { time: '16:00', demand: 520, occupancy: 92, dbsiAvg: 74, overloadEvents: 5, redistributions: 4 },
    { time: '18:00', demand: 460, occupancy: 84, dbsiAvg: 65, overloadEvents: 3, redistributions: 3 },
    { time: '20:00', demand: 210, occupancy: 48, dbsiAvg: 32, overloadEvents: 0, redistributions: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <LineChartIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              FLEET INTELLIGENCE & ANALYTICS
            </h1>
            <p className="text-xs text-slate-400">
              Aggregated Passenger Demand, DBSI Safety Trends & Redistribution Performance
            </p>
          </div>
        </div>

        {/* Time Filters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 text-xs font-mono">
            <Calendar className="h-3.5 w-3.5 text-slate-500 ml-1.5" />
            {(['today', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded transition uppercase ${
                  timeRange === range
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === 'today' ? 'Today' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono hidden md:inline">
            ALL DATA IS SIMULATED
          </span>
        </div>
      </div>

      {/* Grid of Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. DBSI Safety Index Trends */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              Fleet DBSI Safety Index Trends
            </h3>
            <span className="text-xs font-mono text-cyan-400">Avg DBSI: 48 / 100</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="dbsiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
                <Area type="monotone" dataKey="dbsiAvg" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#dbsiGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Fleet Occupancy vs Demand Forecast */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-400" />
              Fleet Occupancy (%) vs Passenger Demand
            </h3>
            <span className="text-xs font-mono text-emerald-400">Peak Occupancy: 92%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
                <Line type="monotone" dataKey="occupancy" stroke="#10b981" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Overload Predictions & Mitigation Events */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-orange-400" />
              Overload Predictions & Successful Redistribution Mitigations
            </h3>
            <span className="text-xs font-mono text-orange-400">Mitigation Rate: 94.8%</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="monospace" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc', fontSize: '12px' }} />
                <Bar dataKey="overloadEvents" name="Predicted Overloads" fill="#f97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="redistributions" name="Redistributions Approved" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
