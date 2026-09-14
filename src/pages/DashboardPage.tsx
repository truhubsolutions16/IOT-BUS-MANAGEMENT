import React from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { DBSIGaugeCard } from '../components/dashboard/DBSIGaugeCard';
import { OverloadAlertCard } from '../components/dashboard/OverloadAlertCard';
import { RedistributionCard } from '../components/dashboard/RedistributionCard';
import { LiveMap } from '../components/dashboard/LiveMap';
import { LiveFleetTable } from '../components/dashboard/LiveFleetTable';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* 1. Fleet KPI Counters */}
      <KPICards />

      {/* 2. Primary Predictions Grid: DBSI Gauge & Predictive Overload Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DBSIGaugeCard />
        <OverloadAlertCard />
      </div>

      {/* 3. AI Dynamic Passenger Redistribution Recommendation */}
      <RedistributionCard />

      {/* 4. Live Map & Fleet Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <LiveMap />
        </div>
        <div className="lg:col-span-7">
          <LiveFleetTable />
        </div>
      </div>
    </div>
  );
};
