import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  LayoutDashboard,
  Wrench,
  Bell,
  LineChart,
  GitMerge,
  Radio,
  Info,
} from 'lucide-react';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, alerts } = useSimulation();
  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Live Control Center', icon: LayoutDashboard },
    { id: 'maintenance', label: 'Predictive Maintenance', icon: Wrench, badge: 'ANOMALY' },
    { id: 'alerts', label: 'Alert Feed', icon: Bell, count: unreadAlertsCount },
    { id: 'analytics', label: 'Fleet Analytics', icon: LineChart },
    { id: 'architecture', label: 'System Pipeline', icon: GitMerge },
    { id: 'iot', label: 'Demo Hardware', icon: Radio },
    { id: 'about', label: 'Uniqueness & Feasibility', icon: Info },
  ];

  return (
    <nav className="bg-slate-900/60 border-b border-slate-800/80 px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>

              {item.badge && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-orange-500/20 text-orange-400 border border-orange-500/40 animate-pulse">
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span className="h-4 min-w-4 px-1 rounded-full text-[10px] font-bold bg-red-500 text-white flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
