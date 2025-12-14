/**
 * Solar Estimate Calculation Utilities
 * Provides bill-to-kW conversion, PV yield calculations, and savings estimates
 */

import {
    EstimateInput,
    EstimateOutput,
    EstimateAssumptions,
    Location,
} from '@/types/solar';

// ============================================
// Constants
// ============================================

/** Default electricity tariff in ₹/kWh (Indian residential average) */
const DEFAULT_TARIFF_RATE = parseFloat(process.env.DEFAULT_TARIFF_RATE || '7.0');

/** Default system cost per kW installed in ₹ */
const DEFAULT_SYSTEM_COST_PER_KW = parseFloat(
    process.env.SOLAR_SYSTEM_COST_PER_KW || '55000'
);

/** Net metering rate in ₹/kWh */
const DEFAULT_NET_METERING_RATE = parseFloat(
    process.env.SOLAR_NET_METERING_RATE || '3.0'
);

/** Peak sun hours by latitude band (India-specific) */
const PEAK_SUN_HOURS_BY_LATITUDE: Record<string, number> = {
    south: 5.5, // < 15°N (Tamil Nadu, Kerala, Karnataka)
    central: 5.0, // 15-25°N (Maharashtra, Telangana, Gujarat)
    north: 4.5, // > 25°N (Delhi, UP, Punjab, Rajasthan)
};

/** Monthly generation factors (relative to annual average) */
const MONTHLY_FACTORS = [
    0.85, // January
    0.92, // February
    1.05, // March
    1.12, // April
    1.15, // May
    0.95, // June (monsoon starts)
    0.75, // July
    0.78, // August
    0.88, // September
    1.02, // October
    0.98, // November
    0.85, // December
];

/** CO2 offset per kWh generated (kg) - India grid emission factor */
const CO2_PER_KWH = 0.82;

// ============================================
// Utility Functions
// ============================================

/**
 * Get peak sun hours based on location latitude
 */
export function getPeakSunHours(lat: number): number {
    if (lat < 15) return PEAK_SUN_HOURS_BY_LATITUDE.south;
    if (lat < 25) return PEAK_SUN_HOURS_BY_LATITUDE.central;
    return PEAK_SUN_HOURS_BY_LATITUDE.north;
}

/**
 * Convert monthly electricity bill to kWh consumption
 */
export function billToKwh(billAmount: number, tariffRate: number): number {
    if (billAmount <= 0 || tariffRate <= 0) return 0;
    return billAmount / tariffRate;
}

/**
 * Calculate required system size in kW to offset given consumption
 */
export function calculateRequiredKw(
    monthlyKwh: number,
    peakSunHours: number,
    offsetPercent: number = 100,
    systemEfficiency: number = 0.85
): number {
    if (monthlyKwh <= 0) return 0;

    // Daily consumption
    const dailyKwh = monthlyKwh / 30;

    // Target daily generation (based on offset percentage)
    const targetDailyKwh = (dailyKwh * offsetPercent) / 100;

    // Required kW = target generation / (sun hours * efficiency)
    const requiredKw = targetDailyKwh / (peakSunHours * systemEfficiency);

    // Round up to nearest 0.5 kW
    return Math.ceil(requiredKw * 2) / 2;
}

/**
 * Calculate annual generation for a given system size
 */
export function calculateAnnualGeneration(
    systemKw: number,
    peakSunHours: number,
    systemEfficiency: number = 0.85,
    degradation: number = 0
): number {
    // Daily generation = kW * sun hours * efficiency
    const dailyGeneration = systemKw * peakSunHours * systemEfficiency;

    // Annual = daily * 365 * (1 - degradation)
    return dailyGeneration * 365 * (1 - degradation);
}

/**
 * Calculate monthly generation breakdown
 */
export function calculateMonthlyGeneration(annualKwh: number): number[] {
    const monthlyAverage = annualKwh / 12;
    return MONTHLY_FACTORS.map((factor) => Math.round(monthlyAverage * factor));
}

/**
 * Calculate panel count from system size
 */
export function calculatePanelCount(
    systemKw: number,
    panelWattage: number = 550
): number {
    if (systemKw <= 0) return 0;
    return Math.ceil((systemKw * 1000) / panelWattage);
}

/**
 * Calculate required roof area
 */
export function calculateRequiredArea(
    panelCount: number,
    panelAreaM2: number = 2.0, // 1.134m x 1.76m typical
    spacingFactor: number = 1.3 // 30% for spacing and walkways
): number {
    return panelCount * panelAreaM2 * spacingFactor;
}

/**
 * Calculate payback period in years
 */
export function calculatePayback(
    systemKw: number,
    annualKwh: number,
    tariffRate: number,
    systemCostPerKw: number = DEFAULT_SYSTEM_COST_PER_KW,
    tariffInflation: number = 0.05, // 5% annual increase
    degradation: number = 0.005 // 0.5% annual degradation
): number {
    const systemCost = systemKw * systemCostPerKw;

    let cumulativeSavings = 0;
    let currentTariff = tariffRate;
    let currentGeneration = annualKwh;

    for (let year = 1; year <= 25; year++) {
        const annualSavings = currentGeneration * currentTariff;
        cumulativeSavings += annualSavings;

        if (cumulativeSavings >= systemCost) {
            // Interpolate for partial year
            const previousCumulative = cumulativeSavings - annualSavings;
            const remaining = systemCost - previousCumulative;
            const partialYear = remaining / annualSavings;
            return Math.round((year - 1 + partialYear) * 10) / 10;
        }

        // Apply inflation and degradation for next year
        currentTariff *= 1 + tariffInflation;
        currentGeneration *= 1 - degradation;
    }

    return 25; // Max payback period
}

/**
 * Calculate annual and monthly savings
 */
export function calculateSavings(
    annualKwh: number,
    tariffRate: number
): { annual: number; monthly: number } {
    const annual = Math.round(annualKwh * tariffRate);
    const monthly = Math.round(annual / 12);
    return { annual, monthly };
}

// ============================================
// Main Estimate Function
// ============================================

/**
 * Calculate complete solar estimate from input parameters
 */
export function calculateEstimate(input: EstimateInput): EstimateOutput {
    // Determine tariff rate
    const tariffRate = input.tariffRate || DEFAULT_TARIFF_RATE;

    // Calculate monthly consumption
    const monthlyKwh = input.monthlyKwh ||
        (input.billAmount ? billToKwh(input.billAmount, tariffRate) : 0);

    // Get location-specific parameters
    const peakSunHours = getPeakSunHours(input.location.lat);
    const systemEfficiency = (100 - (input.systemLosses || 14)) / 100;

    // Calculate required system size
    const offsetPercent = input.offsetPercent || 100;
    const recommendedKw = calculateRequiredKw(
        monthlyKwh,
        peakSunHours,
        offsetPercent,
        systemEfficiency
    );

    // Calculate generation
    const estAnnualKwh = calculateAnnualGeneration(
        recommendedKw,
        peakSunHours,
        systemEfficiency
    );
    const estMonthlyKwh = calculateMonthlyGeneration(estAnnualKwh);

    // Calculate panel requirements
    const panelWattage = 550;
    const panelCount = calculatePanelCount(recommendedKw, panelWattage);
    const requiredAreaM2 = calculateRequiredArea(panelCount);

    // Calculate financial metrics
    const paybackYears = calculatePayback(
        recommendedKw,
        estAnnualKwh,
        tariffRate,
        DEFAULT_SYSTEM_COST_PER_KW
    );
    const savings = calculateSavings(estAnnualKwh, tariffRate);

    // CO2 offset
    const co2OffsetKg = Math.round(estAnnualKwh * CO2_PER_KWH);

    // Build assumptions object
    const assumptions: EstimateAssumptions = {
        tariffRate,
        peakSunHours,
        systemEfficiency,
        panelWattage,
        systemCostPerKw: DEFAULT_SYSTEM_COST_PER_KW,
        tariffInflation: 0.05,
        netMeteringRate: DEFAULT_NET_METERING_RATE,
        degradationRate: 0.005,
    };

    return {
        recommendedKw,
        estAnnualKwh: Math.round(estAnnualKwh),
        estMonthlyKwh,
        paybackYears,
        monthlySavings: savings.monthly,
        annualSavings: savings.annual,
        panelCount,
        requiredAreaM2: Math.round(requiredAreaM2),
        co2OffsetKg,
        assumptions,
    };
}

// ============================================
// PVWatts API Integration (Optional)
// ============================================

interface PVWattsParams {
    lat: number;
    lon: number;
    systemCapacity: number;
    tilt: number;
    azimuth: number;
    losses: number;
}

interface PVWattsResponse {
    outputs: {
        ac_annual: number;
        ac_monthly: number[];
        solrad_annual: number;
        capacity_factor: number;
    };
}

/**
 * Call NREL PVWatts API for more accurate yield calculations
 * Returns null if API key not configured or call fails
 */
export async function callPVWattsAPI(
    params: PVWattsParams
): Promise<PVWattsResponse | null> {
    const apiKey = process.env.NREL_API_KEY;

    if (!apiKey) {
        console.log('[PVWatts] No API key configured, using local calculation');
        return null;
    }

    try {
        const url = new URL('https://developer.nrel.gov/api/pvwatts/v8.json');
        url.searchParams.set('api_key', apiKey);
        url.searchParams.set('lat', params.lat.toString());
        url.searchParams.set('lon', params.lon.toString());
        url.searchParams.set('system_capacity', params.systemCapacity.toString());
        url.searchParams.set('tilt', params.tilt.toString());
        url.searchParams.set('azimuth', params.azimuth.toString());
        url.searchParams.set('losses', params.losses.toString());
        url.searchParams.set('array_type', '1'); // Fixed open rack
        url.searchParams.set('module_type', '1'); // Premium

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            console.error('[PVWatts] API error:', response.status);
            return null;
        }

        const data = await response.json();
        return data as PVWattsResponse;
    } catch (error) {
        console.error('[PVWatts] API call failed:', error);
        return null;
    }
}

/**
 * Calculate estimate using PVWatts API with local fallback
 */
export async function calculateEstimateWithPVWatts(
    input: EstimateInput
): Promise<EstimateOutput> {
    // First get basic estimate using local calculation
    const localEstimate = calculateEstimate(input);

    // Try to enhance with PVWatts API
    const pvWattsResult = await callPVWattsAPI({
        lat: input.location.lat,
        lon: input.location.lon,
        systemCapacity: localEstimate.recommendedKw,
        tilt: input.roofTilt || 15,
        azimuth: input.roofAzimuth || 180,
        losses: input.systemLosses || 14,
    });

    if (!pvWattsResult) {
        return localEstimate;
    }

    // Use PVWatts results for more accurate generation estimates
    const estAnnualKwh = Math.round(pvWattsResult.outputs.ac_annual);
    const estMonthlyKwh = pvWattsResult.outputs.ac_monthly.map(Math.round);

    // Recalculate savings with PVWatts generation
    const tariffRate = input.tariffRate || DEFAULT_TARIFF_RATE;
    const savings = calculateSavings(estAnnualKwh, tariffRate);
    const paybackYears = calculatePayback(
        localEstimate.recommendedKw,
        estAnnualKwh,
        tariffRate
    );

    return {
        ...localEstimate,
        estAnnualKwh,
        estMonthlyKwh,
        annualSavings: savings.annual,
        monthlySavings: savings.monthly,
        paybackYears,
        co2OffsetKg: Math.round(estAnnualKwh * CO2_PER_KWH),
    };
}
