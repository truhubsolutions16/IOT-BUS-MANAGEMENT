export type SafetyStatus = 'SAFE' | 'WARNING' | 'HIGH RISK' | 'CRITICAL';
export type DemandRiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type VehicleHealthStatus = 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR' | 'ANOMALY';
export type VibrationLevel = 'LOW' | 'NORMAL' | 'ELEVATED' | 'HIGH';

export interface DBSIScoreFactors {
  passengerLoad: number;  // 0-100 %
  vehicleHealth: number;  // 0-100 % (higher is worse)
  speedRisk: number;      // 0-100 %
  demandRisk: number;     // 0-100 %
  routeRisk: number;      // 0-100 %
}

export interface MapCoordinates {
  lat: number;
  lng: number;
  xPercent: number; // For custom SVG city grid
  yPercent: number;
}

export interface Bus {
  id: string; // TH-101 to TH-120
  route: string;
  passengers: number;
  capacity: number; // default 60
  occupancy: number; // %
  dbsi: number; // 0-100 index
  speed: number; // km/h
  nextStop: string;
  predictedDemand: number; // +N passengers at next stop
  predictedPassengers: number; // current + predictedDemand
  demandRisk: DemandRiskLevel;
  vehicleHealth: VehicleHealthStatus;
  status: SafetyStatus;
  temperature: number; // °C
  vibration: VibrationLevel;
  voltage: number; // Volts
  location: MapCoordinates;
  dbsiFactors: DBSIScoreFactors;
  lastUpdated?: string;
  isActive: boolean;
}

export interface Alert {
  id: string;
  busId: string;
  type: 'CRITICAL' | 'HIGH RISK' | 'WARNING' | 'INFORMATION';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface RedistributionCandidate {
  busId: string;
  passengers: number;
  capacity: number;
  occupancy: number;
  distanceKm: number;
  etaMinutes: number;
  route: string;
  status: SafetyStatus;
  score: number;
}

export interface RedistributionPlan {
  overloadedBusId: string;
  currentPassengers: number;
  capacity: number;
  upcomingStop: string;
  predictedBoarding: number;
  predictedOccupancy: number;
  excessPassengers: number;
  candidates: RedistributionCandidate[];
  recommendedBusId: string;
  recommendationReasons: string[];
  approved: boolean;
}

export interface HardwareDevice {
  name: string;
  type: string;
  status: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  lastPing: string;
  readings: string;
}
