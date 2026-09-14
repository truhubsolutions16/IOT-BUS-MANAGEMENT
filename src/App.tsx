import React, { useState } from 'react';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { HardwarePage } from './pages/HardwarePage';
import { AboutPage } from './pages/AboutPage';
import { DemoScenarioRunner } from './components/scenario/DemoScenarioRunner';
import { ShieldCheck, Info } from 'lucide-react';

const MainAppContent: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { activeTab } = useSimulation();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'alerts':
        return <AlertsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'iot':
        return <HardwarePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Command Center Top Header */}
      <Header onLogout={onLogout} />

      {/* 2. Navigation Bar */}
      <Navigation />

      {/* 3. Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        {renderTabContent()}
      </main>

      {/* 4. Automated Interactive Presentation Overlay */}
      <DemoScenarioRunner />

      {/* 5. Footer with Mandatory Demo Simulation Notice */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 text-center text-xs font-mono text-slate-500 space-y-1">
        <div className="flex items-center justify-center gap-2 text-cyan-400 font-semibold">
          <ShieldCheck className="h-4 w-4" />
          <span>AIoT-Based Predictive Public Transport Safety & Dynamic Passenger Redistribution System</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px]">
          <Info className="h-3.5 w-3.5 text-amber-400" />
          <span>DEMO & SIMULATION MODE ACTIVE — All fleet telemetry, GPS coordinates, and sensor readings are simulated for prototype demonstration.</span>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <SimulationProvider>
      <MainAppContent onLogout={() => setIsLoggedIn(false)} />
    </SimulationProvider>
  );
}
