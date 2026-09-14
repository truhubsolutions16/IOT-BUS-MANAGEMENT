import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import type { SafetyStatus } from '../../types/bus';
import { StatusBadge } from '../common/StatusBadge';
import { Search, Filter, ArrowUpDown, ChevronRight, Gauge } from 'lucide-react';

export const LiveFleetTable: React.FC = () => {
  const { buses, selectedBusId, setSelectedBusId } = useSimulation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'id' | 'dbsi' | 'occupancy' | 'speed'>('dbsi');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredBuses = buses
    .filter((bus) => {
      const matchesSearch =
        bus.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bus.nextStop.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterStatus === 'ALL') return matchesSearch;
      return matchesSearch && bus.status === filterStatus;
    })
    .sort((a, b) => {
      let comp = 0;
      if (sortBy === 'dbsi') comp = a.dbsi - b.dbsi;
      else if (sortBy === 'occupancy') comp = a.occupancy - b.occupancy;
      else if (sortBy === 'speed') comp = a.speed - b.speed;
      else comp = a.id.localeCompare(b.id);

      return sortOrder === 'desc' ? -comp : comp;
    });

  const toggleSort = (field: 'id' | 'dbsi' | 'occupancy' | 'speed') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const statusOptions: (SafetyStatus | 'ALL')[] = ['ALL', 'SAFE', 'WARNING', 'HIGH RISK', 'CRITICAL'];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Gauge className="h-4 w-4 text-cyan-400" />
            LIVE FLEET STATUS
          </h2>
          <p className="text-xs text-slate-400">
            Real-time IoT bus telemetry & Dynamic Safety Index (DBSI)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative min-w-44">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search ID, route, stop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1 overflow-x-auto">
            <Filter className="h-3.5 w-3.5 text-slate-500 ml-1.5 hidden sm:inline" />
            {statusOptions.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                  filterStatus === st
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40">
              <th className="py-2.5 px-3 cursor-pointer hover:text-cyan-400" onClick={() => toggleSort('id')}>
                <div className="flex items-center gap-1">
                  Bus ID
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3">Route</th>
              <th className="py-2.5 px-3">Passengers</th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-cyan-400" onClick={() => toggleSort('occupancy')}>
                <div className="flex items-center gap-1">
                  Occupancy
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-cyan-400" onClick={() => toggleSort('dbsi')}>
                <div className="flex items-center gap-1">
                  DBSI Index
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3 cursor-pointer hover:text-cyan-400" onClick={() => toggleSort('speed')}>
                <div className="flex items-center gap-1">
                  Speed
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-2.5 px-3">Demand Risk</th>
              <th className="py-2.5 px-3">Vehicle Health</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {filteredBuses.map((bus) => {
              const isSelected = selectedBusId === bus.id;
              const isOverloadDemoBus = bus.id === 'TH-104';

              return (
                <tr
                  key={bus.id}
                  onClick={() => setSelectedBusId(bus.id)}
                  className={`cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-cyan-950/40 text-slate-100 font-medium border-l-2 border-l-cyan-400'
                      : isOverloadDemoBus
                      ? 'bg-orange-950/20 hover:bg-slate-800/80 text-slate-200'
                      : 'hover:bg-slate-850 text-slate-300'
                  }`}
                >
                  {/* Bus ID */}
                  <td className="py-2.5 px-3 font-bold text-slate-100">
                    <div className="flex items-center gap-1.5">
                      <span>{bus.id}</span>
                      {isOverloadDemoBus && (
                        <span className="px-1.5 py-0.2 text-[9px] rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          DEMO TARGET
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Route */}
                  <td className="py-2.5 px-3 font-sans text-slate-300 max-w-[160px] truncate">
                    {bus.route}
                  </td>

                  {/* Passengers */}
                  <td className="py-2.5 px-3 font-medium">
                    <span className={bus.passengers > 50 ? 'text-amber-400 font-bold' : 'text-slate-300'}>
                      {bus.passengers}
                    </span>
                    <span className="text-slate-500 text-[10px]"> / {bus.capacity}</span>
                  </td>

                  {/* Occupancy % */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            bus.occupancy > 85
                              ? 'bg-red-500'
                              : bus.occupancy > 70
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${Math.min(100, bus.occupancy)}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-200">{bus.occupancy}%</span>
                    </div>
                  </td>

                  {/* DBSI */}
                  <td className="py-2.5 px-3 font-bold">
                    <span
                      className={
                        bus.dbsi > 75
                          ? 'text-red-400 font-extrabold'
                          : bus.dbsi > 60
                          ? 'text-orange-400 font-bold'
                          : bus.dbsi > 45
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {bus.dbsi}
                    </span>
                    <span className="text-[10px] text-slate-500"> / 100</span>
                  </td>

                  {/* Speed */}
                  <td className="py-2.5 px-3 text-slate-300">{bus.speed} km/h</td>

                  {/* Demand Risk */}
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        bus.demandRisk === 'HIGH' || bus.demandRisk === 'CRITICAL'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : bus.demandRisk === 'MODERATE'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {bus.demandRisk}
                    </span>
                  </td>

                  {/* Vehicle Health */}
                  <td className="py-2.5 px-3 font-sans">
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        bus.vehicleHealth === 'ANOMALY'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                          : bus.vehicleHealth === 'EXCELLENT'
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {bus.vehicleHealth}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-2.5 px-3">
                    <StatusBadge status={bus.status} size="sm" />
                  </td>

                  {/* Action Link */}
                  <td className="py-2.5 px-3 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedBusId(bus.id);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-semibold"
                    >
                      Inspect
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
