import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Bus, Alert, HardwareDevice, RedistributionPlan } from '../types/bus';
import { INITIAL_FLEET, INITIAL_ALERTS, INITIAL_HARDWARE } from '../data/mockFleet';
import confetti from 'canvas-confetti';

interface SimulationContextType {
  buses: Bus[];
  alerts: Alert[];
  hardware: HardwareDevice[];
  redistributionPlan: RedistributionPlan;
  isSimulating: boolean;
  lastUpdatedSecondsAgo: number;
  selectedBusId: string | null;
  setSelectedBusId: (id: string | null) => void;
  toggleSimulation: () => void;
  approveRedistribution: () => void;
  resetDemoScenario: () => void;
  markAlertAsRead: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isScenarioRunning: boolean;
  scenarioStep: number;
  startDemoScenario: () => void;
  stopDemoScenario: () => void;
}

const DEFAULT_REDISTRIBUTION_PLAN: RedistributionPlan = {
  overloadedBusId: 'TH-104',
  currentPassengers: 54,
  capacity: 60,
  upcomingStop: 'Benz Circle',
  predictedBoarding: 12,
  predictedOccupancy: 66,
  excessPassengers: 6,
  candidates: [
    {
      busId: 'TH-108',
      passengers: 28,
      capacity: 60,
      occupancy: 46,
      distanceKm: 1.2,
      etaMinutes: 2,
      route: 'Vijayawada → Guntur (Express)',
      status: 'SAFE',
      score: 95,
    },
    {
      busId: 'TH-112',
      passengers: 39,
      capacity: 60,
      occupancy: 65,
      distanceKm: 0.8,
      etaMinutes: 1,
      route: 'Benz Circle → Guntur',
      status: 'SAFE',
      score: 82,
    },
    {
      busId: 'TH-115',
      passengers: 52,
      capacity: 60,
      occupancy: 87,
      distanceKm: 0.6,
      etaMinutes: 1,
      route: 'Vijayawada → Guntur',
      status: 'WARNING',
      score: 64,
    },
  ],
  recommendedBusId: 'TH-108',
  recommendationReasons: [
    'Highest available capacity (32 vacant seats)',
    'Nearby proximity (1.2 km away on parallel corridor)',
    'Identical drop-off route coverage for Benz Circle',
    'Low current occupancy (46%) with low DBSI (24)',
  ],
  approved: false,
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buses, setBuses] = useState<Bus[]>(INITIAL_FLEET);
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [hardware] = useState<HardwareDevice[]>(INITIAL_HARDWARE);
  const [redistributionPlan, setRedistributionPlan] = useState<RedistributionPlan>(DEFAULT_REDISTRIBUTION_PLAN);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [lastUpdatedSecondsAgo, setLastUpdatedSecondsAgo] = useState<number>(0);
  const [selectedBusId, setSelectedBusId] = useState<string | null>('TH-104');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Interactive Scenario Presentation State
  const [isScenarioRunning, setIsScenarioRunning] = useState<boolean>(false);
  const [scenarioStep, setScenarioStep] = useState<number>(1);

  // Timer tick for "X seconds ago" indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdatedSecondsAgo((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Live telemetry simulation loop (ticks every 4 seconds when active)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => {
          if (!bus.isActive) return bus;

          // Don't randomly fluctuate TH-104 if in the middle of scenario showcase unless natural jitter
          const isHighlightOverloadBus = bus.id === 'TH-104';
          const isAnomalyBus = bus.id === 'TH-109';

          // Small telemetry jitter for realistic simulation
          const speedJitter = Math.floor((Math.random() - 0.5) * 4);
          const newSpeed = Math.max(15, Math.min(65, bus.speed + speedJitter));

          let newPassengers = bus.passengers;
          let newDbsi = bus.dbsi;
          let newTemp = bus.temperature;

          if (!isHighlightOverloadBus && !isAnomalyBus) {
            // Random minor passenger fluctuation for other buses
            const paxChange = Math.floor((Math.random() - 0.48) * 3);
            newPassengers = Math.max(10, Math.min(59, bus.passengers + paxChange));

            // Recalculate occupancy
            const occ = Math.round((newPassengers / bus.capacity) * 100);

            // DBSI recalculation formula
            newDbsi = Math.min(99, Math.max(12, Math.round(occ * 0.5 + (newSpeed / 65) * 20 + bus.dbsiFactors.vehicleHealth * 0.3)));
          }

          if (isAnomalyBus) {
            // Keep TH-109 temperature around 82-84°C
            newTemp = 82 + Math.round(Math.random() * 2);
          }

          const updatedOccupancy = Math.round((newPassengers / bus.capacity) * 100);

          return {
            ...bus,
            speed: newSpeed,
            passengers: newPassengers,
            occupancy: updatedOccupancy,
            dbsi: newDbsi,
            temperature: newTemp,
            dbsiFactors: {
              ...bus.dbsiFactors,
              passengerLoad: updatedOccupancy,
            },
          };
        })
      );

      setLastUpdatedSecondsAgo(0);
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  // Toggle Pause/Resume
  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  // Approve Redistribution Action
  const approveRedistribution = useCallback(() => {
    // 1. Update TH-104 and TH-108 in bus fleet
    setBuses((prevBuses) =>
      prevBuses.map((bus) => {
        if (bus.id === 'TH-104') {
          return {
            ...bus,
            passengers: 48,
            occupancy: 80,
            dbsi: 43,
            predictedDemand: 6,
            predictedPassengers: 54,
            demandRisk: 'MODERATE',
            status: 'SAFE',
            dbsiFactors: {
              ...bus.dbsiFactors,
              passengerLoad: 80,
              demandRisk: 25,
            },
          };
        }
        if (bus.id === 'TH-108') {
          return {
            ...bus,
            passengers: 34,
            occupancy: 57,
            dbsi: 30,
            predictedPassengers: 37,
            dbsiFactors: {
              ...bus.dbsiFactors,
              passengerLoad: 57,
            },
          };
        }
        return bus;
      })
    );

    // 2. Mark plan as approved
    setRedistributionPlan((prev) => ({
      ...prev,
      approved: true,
    }));

    // 3. Add success notification alert
    const newAlert: Alert = {
      id: `ALT-${Date.now()}`,
      busId: 'TH-104',
      type: 'INFORMATION',
      message: 'Redistribution plan executed: 6 passengers redirected to TH-108. DBSI improved from 72 to 43.',
      timestamp: 'Just now',
      read: false,
    };
    setAlerts((prev) => [newAlert, ...prev]);

    // 4. Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06b6d4', '#22c55e', '#3b82f6'],
      });
    } catch {
      // fallback if canvas missing
    }
  }, []);

  // Reset Demo Scenario to initial presentation state
  const resetDemoScenario = useCallback(() => {
    setBuses(INITIAL_FLEET);
    setRedistributionPlan(DEFAULT_REDISTRIBUTION_PLAN);
    setAlerts(INITIAL_ALERTS);
    setSelectedBusId('TH-104');
    setScenarioStep(1);
    setIsScenarioRunning(false);
  }, []);

  // Start Automated Demo Scenario (11 steps)
  const startDemoScenario = useCallback(() => {
    setIsScenarioRunning(true);
    setScenarioStep(1);
    setActiveTab('dashboard');
    setSelectedBusId('TH-104');
  }, []);

  const stopDemoScenario = useCallback(() => {
    setIsScenarioRunning(false);
  }, []);

  // Mark alert as read
  const markAlertAsRead = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  return (
    <SimulationContext.Provider
      value={{
        buses,
        alerts,
        hardware,
        redistributionPlan,
        isSimulating,
        lastUpdatedSecondsAgo,
        selectedBusId,
        setSelectedBusId,
        toggleSimulation,
        approveRedistribution,
        resetDemoScenario,
        markAlertAsRead,
        activeTab,
        setActiveTab,
        isScenarioRunning,
        scenarioStep,
        startDemoScenario,
        stopDemoScenario,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
