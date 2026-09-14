import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { StatusBadge } from '../common/StatusBadge';
import { MapPin, Navigation, Compass, AlertCircle } from 'lucide-react';

export const LiveMap: React.FC = () => {
  const { buses, selectedBusId, setSelectedBusId } = useSimulation();

  const activeBusesOnMap = buses.filter((b) => b.isActive);
  const selectedBus = buses.find((b) => b.id === selectedBusId) || buses[3]; // default TH-104

  // Route Corridor Node coordinates for map SVG visualization
  const transitStops = [
    { name: 'Vijayawada Central', x: 25, y: 22 },
    { name: 'PNS Bus Terminal', x: 22, y: 36 },
    { name: 'Benz Circle', x: 28, y: 32 },
    { name: 'Governorpet', x: 20, y: 28 },
    { name: 'Tadepalli Junction', x: 34, y: 40 },
    { name: 'Mangalagiri Bypass', x: 45, y: 52 },
    { name: 'AIIMS Mangalagiri', x: 50, y: 58 },
    { name: 'Pedakakani', x: 65, y: 70 },
    { name: 'Guntur RTC Busstand', x: 78, y: 82 },
  ];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow-xl backdrop-blur-md relative overflow-hidden flex flex-col h-full min-h-[420px]">
      {/* Map Header & Badge */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Compass className="h-4 w-4 text-cyan-400" />
            LIVE TRANSIT CORRIDOR MAP
          </h2>
          <p className="text-[11px] text-slate-400">
            Vijayawada – Mangalagiri – Guntur National Transit Line
          </p>
        </div>

        {/* REQUIRED DEMO BADGE */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-semibold shadow-sm">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          SIMULATED GPS DATA
        </span>
      </div>

      {/* Main Vector Grid & Bus Markers Container */}
      <div className="relative flex-1 bg-[#080d1a] border border-slate-800/80 rounded-lg overflow-hidden min-h-[300px] flex items-center justify-center">
        {/* Decorative Grid Lines */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#06b6d4 1px, #080d1a 1px)`,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0, 12px 12px',
          }}
        />

        {/* SVG Route Corridor Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {/* Main Transit Arterial (Vijayawada -> Guntur Line) */}
          <path
            d="M 22 36 L 25 22 L 28 32 L 34 40 L 45 52 L 50 58 L 65 70 L 78 82"
            fill="none"
            stroke="#0284c7"
            strokeWidth="3"
            strokeDasharray="6 4"
            className="opacity-70"
          />
          {/* City Loop Secondary Line */}
          <path
            d="M 18 22 L 28 32 L 42 48 L 78 82"
            fill="none"
            stroke="#0d9488"
            strokeWidth="2"
            strokeDasharray="4 3"
            className="opacity-50"
          />

          {/* Render Route Station Nodes */}
          {transitStops.map((stop, i) => (
            <g key={i}>
              <circle cx={`${stop.x}%`} cy={`${stop.y}%`} r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text
                x={`${stop.x}%`}
                y={`${stop.y + 4}%`}
                fill="#94a3b8"
                fontSize="9 font-mono"
                textAnchor="middle"
                className="select-none font-semibold"
              >
                {stop.name}
              </text>
            </g>
          ))}
        </svg>

        {/* Live Bus Markers Overlay */}
        {activeBusesOnMap.map((bus) => {
          const isSelected = selectedBusId === bus.id;

          const markerColor =
            bus.status === 'SAFE'
              ? 'bg-emerald-500 border-emerald-300 text-emerald-950'
              : bus.status === 'WARNING'
              ? 'bg-amber-500 border-amber-300 text-amber-950'
              : bus.status === 'HIGH RISK'
              ? 'bg-orange-500 border-orange-300 text-orange-950 glow-orange'
              : 'bg-red-500 border-red-300 text-red-950 glow-red animate-pulse';

          return (
            <div
              key={bus.id}
              onClick={() => setSelectedBusId(bus.id)}
              style={{
                left: `${bus.location.xPercent}%`,
                top: `${bus.location.yPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute cursor-pointer transition-all duration-500 z-20 group`}
            >
              {/* Pulsing ring around marker */}
              <div
                className={`absolute -inset-2 rounded-full opacity-60 animate-ping pointer-events-none ${
                  bus.status === 'SAFE'
                    ? 'bg-emerald-500'
                    : bus.status === 'WARNING'
                    ? 'bg-amber-500'
                    : bus.status === 'HIGH RISK'
                    ? 'bg-orange-500'
                    : 'bg-red-500'
                }`}
              />

              {/* Marker Pill */}
              <div
                className={`relative px-2 py-1 rounded-full border-2 text-[10px] font-mono font-extrabold shadow-lg flex items-center gap-1 ${markerColor} ${
                  isSelected ? 'ring-4 ring-cyan-400 scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <Navigation className="h-3 w-3 fill-current rotate-45" />
                <span>{bus.id}</span>
              </div>

              {/* Hover Tooltip Preview */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-40 bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded-md text-[11px] font-mono text-slate-200 whitespace-nowrap shadow-2xl">
                <div className="font-bold text-cyan-400">{bus.id}</div>
                <div>{bus.passengers}/{bus.capacity} pax ({bus.occupancy}%)</div>
                <div>DBSI: <span className="font-bold">{bus.dbsi}</span></div>
              </div>
            </div>
          );
        })}

        {/* Selected Bus Inspection Popover Card */}
        {selectedBus && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-slate-950/95 border border-slate-800 rounded-xl p-3.5 shadow-2xl backdrop-blur-md z-30">
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    Bus {selectedBus.id}
                  </h3>
                  <StatusBadge status={selectedBus.status} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400">{selectedBus.route}</p>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono">DBSI Index</div>
                <div className={`text-base font-extrabold font-mono ${
                  selectedBus.dbsi > 70 ? 'text-red-400' : selectedBus.dbsi > 50 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {selectedBus.dbsi} / 100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-2">
              <div className="bg-slate-900/90 p-2 rounded border border-slate-850">
                <div className="text-[10px] text-slate-400">Current Passengers</div>
                <div className="font-bold text-slate-200">
                  {selectedBus.passengers} / {selectedBus.capacity} ({selectedBus.occupancy}%)
                </div>
              </div>
              <div className="bg-slate-900/90 p-2 rounded border border-slate-850">
                <div className="text-[10px] text-slate-400">Current Speed</div>
                <div className="font-bold text-slate-200">{selectedBus.speed} km/h</div>
              </div>
              <div className="bg-slate-900/90 p-2 rounded border border-slate-850">
                <div className="text-[10px] text-slate-400">Next Stop</div>
                <div className="font-bold text-cyan-300 truncate">{selectedBus.nextStop}</div>
              </div>
              <div className="bg-slate-900/90 p-2 rounded border border-slate-850">
                <div className="text-[10px] text-slate-400">Predicted Boarding</div>
                <div className="font-bold text-amber-300">+{selectedBus.predictedDemand} boardings</div>
              </div>
            </div>

            {selectedBus.id === 'TH-104' && (
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/30 text-[11px] text-orange-300 flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-orange-400" />
                <span>Overload predicted at Benz Circle! Review AI Redistribution below.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
