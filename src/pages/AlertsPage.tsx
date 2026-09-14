import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bell, Filter, CheckCircle2, AlertOctagon, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertAsRead } = useSimulation();
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'ALL') return true;
    return alert.type === filterType;
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'CRITICAL':
        return <ShieldAlert className="h-5 w-5 text-red-400 animate-pulse" />;
      case 'HIGH RISK':
        return <AlertOctagon className="h-5 w-5 text-orange-400" />;
      case 'WARNING':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      default:
        return <Info className="h-5 w-5 text-cyan-400" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'CRITICAL':
        return 'bg-red-950/30 border-red-500/50 glow-red';
      case 'HIGH RISK':
        return 'bg-orange-950/30 border-orange-500/50 glow-orange';
      case 'WARNING':
        return 'bg-amber-950/30 border-amber-500/40';
      default:
        return 'bg-slate-900/80 border-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              REAL-TIME ALERT CENTER
            </h1>
            <p className="text-xs text-slate-400">
              Simulated Safety & Telemetry Incident Notification Feed
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 overflow-x-auto">
          <Filter className="h-3.5 w-3.5 text-slate-500 ml-2 hidden sm:inline" />
          {['ALL', 'CRITICAL', 'HIGH RISK', 'WARNING', 'INFORMATION'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded text-xs font-semibold font-mono transition ${
                filterType === t
                  ? 'bg-cyan-500 text-slate-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-8 text-center text-slate-400 font-mono text-xs">
            No active alerts matching filter criteria.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-xl border transition-all duration-200 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getAlertStyle(
                alert.type
              )} ${alert.read ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 shrink-0">
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2 font-mono">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                        alert.type === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-400'
                          : alert.type === 'HIGH RISK'
                          ? 'bg-orange-500/20 text-orange-400'
                          : alert.type === 'WARNING'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                      }`}
                    >
                      {alert.type}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      Bus {alert.busId}
                    </span>
                    <span className="text-[10px] text-slate-500">• {alert.timestamp}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans mt-1">
                    {alert.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 font-mono">
                {!alert.read && (
                  <button
                    onClick={() => markAlertAsRead(alert.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Mark as Read</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
