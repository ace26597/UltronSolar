/**
 * Solar Simulator Type Definitions
 * Types for the Sunroof-lite + PV*SOL-lite solar simulator feature
 */

// ============================================
// Quick Estimate Types
// ============================================

export interface Location {
    lat: number;
    lon: number;
    city?: string;
    state?: string;
    pincode?: string;
}

export interface EstimateInput {
    /** Location for solar calculations */
    location: Location;
    /** Monthly electricity bill in ₹ (optional if monthlyKwh provided) */
    billAmount?: number;
    /** Monthly consumption in kWh (overrides bill calculation) */
    monthlyKwh?: number;
    /** Electricity tariff rate in ₹/kWh (default: 7.0) */
    tariffRate?: number;
    /** Percentage of consumption to offset with solar (default: 100) */
    offsetPercent?: number;
    /** Roof tilt in degrees (default: 15 for flat roofs in India) */
    roofTilt?: number;
    /** Roof azimuth in degrees (default: 180 = south-facing) */
    roofAzimuth?: number;
    /** System losses percentage (default: 14) */
    systemLosses?: number;
    /** Roof type for display purposes */
    roofType?: 'flat' | 'tilted' | 'shed';
}

export interface EstimateOutput {
    /** Recommended system size in kW */
    recommendedKw: number;
    /** Estimated annual generation in kWh */
    estAnnualKwh: number;
    /** Estimated monthly generation in kWh (12 months) */
    estMonthlyKwh: number[];
    /** Payback period in years */
    paybackYears: number;
    /** Estimated monthly savings in ₹ */
    monthlySavings: number;
    /** Estimated annual savings in ₹ */
    annualSavings: number;
    /** Number of panels required */
    panelCount: number;
    /** Required roof area in m² */
    requiredAreaM2: number;
    /** CO2 offset per year in kg */
    co2OffsetKg: number;
    /** Assumptions used in calculation */
    assumptions: EstimateAssumptions;
}

export interface EstimateAssumptions {
    /** Tariff rate used (₹/kWh) */
    tariffRate: number;
    /** Peak sun hours per day */
    peakSunHours: number;
    /** System efficiency factor */
    systemEfficiency: number;
    /** Panel wattage */
    panelWattage: number;
    /** System cost per kW (₹) */
    systemCostPerKw: number;
    /** Annual tariff inflation rate */
    tariffInflation: number;
    /** Net metering rate (₹/kWh) */
    netMeteringRate: number;
    /** Annual panel degradation rate */
    degradationRate: number;
}

// ============================================
// Map Roof Designer Types
// ============================================

export interface PolygonPoint {
    lat: number;
    lon: number;
}

export interface RoofPolygon {
    /** Unique identifier */
    id: string;
    /** Polygon vertices */
    points: PolygonPoint[];
    /** Optional name/label */
    name?: string;
}

export interface ObstaclePolygon {
    /** Unique identifier */
    id: string;
    /** Polygon vertices */
    points: PolygonPoint[];
    /** Type of obstacle */
    type: 'water_tank' | 'ac_unit' | 'staircase' | 'vent' | 'parapet' | 'other';
    /** Optional name/label */
    name?: string;
}

export interface PanelDimensions {
    /** Panel width in meters */
    width: number;
    /** Panel height in meters */
    height: number;
}

export interface PackInput {
    /** Roof outline polygons */
    roofPolygons: RoofPolygon[];
    /** Obstacle polygons to avoid */
    obstaclePolygons: ObstaclePolygon[];
    /** Panel dimensions in meters */
    panelDimensions: PanelDimensions;
    /** Spacing between panels in meters */
    spacing: { x: number; y: number };
    /** Setback distances in meters */
    setbacks: { edge: number; obstacle: number };
    /** Panel orientation preference */
    orientation?: 'portrait' | 'landscape' | 'auto';
}

export interface PanelPosition {
    /** X position in meters from origin */
    x: number;
    /** Y position in meters from origin */
    y: number;
    /** Rotation in degrees (0 = portrait, 90 = landscape) */
    rotation: number;
    /** Panel index */
    index: number;
}

export interface PackOutput {
    /** Array of panel positions */
    panels: PanelPosition[];
    /** Total number of panels that fit */
    panelCount: number;
    /** Usable area after subtracting obstacles and setbacks (m²) */
    usableAreaM2: number;
    /** Total roof area (m²) */
    totalAreaM2: number;
    /** Total installed capacity in kW */
    installedKw: number;
    /** Bounding box for the layout */
    bounds: {
        minX: number;
        minY: number;
        maxX: number;
        maxY: number;
    };
}

// ============================================
// Solar Design Types (for saving/comparing)
// ============================================

export interface SolarDesign {
    /** Unique design ID */
    id: string;
    /** User-friendly name */
    name: string;
    /** Creation timestamp */
    createdAt: string;
    /** Last updated timestamp */
    updatedAt: string;
    /** Estimate input parameters */
    estimateInput: EstimateInput;
    /** Estimate results */
    estimateOutput?: EstimateOutput;
    /** Roof layout data */
    packInput?: PackInput;
    /** Pack results */
    packOutput?: PackOutput;
    /** Design notes */
    notes?: string;
}

export interface CompareOutput {
    /** Difference in kW */
    deltaKw: number;
    /** Difference in panel count */
    deltaPanels: number;
    /** Difference in annual generation (kWh) */
    deltaGeneration: number;
    /** Difference in cost (₹) */
    deltaCost: number;
    /** Difference in payback period (years) */
    deltaPayback: number;
    /** Difference in savings (₹/year) */
    deltaSavings: number;
}

// ============================================
// API Response Types
// ============================================

export interface SolarApiError {
    error: string;
    details?: string;
    code?: string;
}

export type SolarApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: SolarApiError };

// ============================================
// UI State Types
// ============================================

export type SimulatorTab = 'quick-estimate' | 'draw-roof' | 'compare' | 'photo';

export interface SimulatorState {
    activeTab: SimulatorTab;
    isLoading: boolean;
    error: string | null;
    currentDesign: SolarDesign | null;
    savedDesigns: SolarDesign[];
}

// ============================================
// Constants
// ============================================

export const DEFAULT_PANEL_DIMENSIONS: PanelDimensions = {
    width: 1.134, // meters (typical 550W panel)
    height: 2.278, // meters
};

export const DEFAULT_PANEL_WATTAGE = 550; // Watts

export const DEFAULT_TARIFF_RATES: Record<string, number> = {
    residential: 7.0,
    commercial: 10.0,
    industrial: 8.5,
};

export const INDIAN_CITIES: { name: string; lat: number; lon: number; state: string }[] = [
    // North Maharashtra - Primary service area (Dhule at top)
    { name: 'Dhule', lat: 20.9042, lon: 74.7749, state: 'Maharashtra' },
    { name: 'Jalgaon', lat: 21.0077, lon: 75.5626, state: 'Maharashtra' },
    { name: 'Nashik', lat: 19.9975, lon: 73.7898, state: 'Maharashtra' },
    { name: 'Nandurbar', lat: 21.3700, lon: 74.2394, state: 'Maharashtra' },
    { name: 'Sakri', lat: 20.9833, lon: 74.3167, state: 'Maharashtra' },
    { name: 'Shirpur', lat: 21.3500, lon: 74.8800, state: 'Maharashtra' },
    { name: 'Dondaicha', lat: 21.3200, lon: 74.5700, state: 'Maharashtra' },
    { name: 'Malegaon', lat: 20.5579, lon: 74.5089, state: 'Maharashtra' },
    { name: 'Navapur', lat: 21.1700, lon: 73.7800, state: 'Maharashtra' },
    { name: 'Amalner', lat: 21.0500, lon: 75.0500, state: 'Maharashtra' },
    { name: 'Chopda', lat: 21.2500, lon: 75.3000, state: 'Maharashtra' },
    { name: 'Yaval', lat: 21.1667, lon: 75.7000, state: 'Maharashtra' },
    { name: 'Faizpur', lat: 21.1700, lon: 75.8500, state: 'Maharashtra' },
    { name: 'Bhusawal', lat: 21.0500, lon: 75.7833, state: 'Maharashtra' },
    // Other Maharashtra cities
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777, state: 'Maharashtra' },
    { name: 'Pune', lat: 18.5204, lon: 73.8567, state: 'Maharashtra' },
    { name: 'Aurangabad', lat: 19.8762, lon: 75.3433, state: 'Maharashtra' },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882, state: 'Maharashtra' },
    // Major Indian cities
    { name: 'Delhi', lat: 28.6139, lon: 77.2090, state: 'Delhi' },
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946, state: 'Karnataka' },
    { name: 'Chennai', lat: 13.0827, lon: 80.2707, state: 'Tamil Nadu' },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867, state: 'Telangana' },
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639, state: 'West Bengal' },
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714, state: 'Gujarat' },
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873, state: 'Rajasthan' },
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462, state: 'Uttar Pradesh' },
];

// Default location for custom cities (Dhule, Maharashtra)
export const DEFAULT_LOCATION: Location = {
    lat: 20.9042,
    lon: 74.7749,
    city: 'Dhule',
    state: 'Maharashtra',
};
