"use client";

import { useState } from "react";
import Link from "next/link";
import {
    EstimateInput,
    EstimateOutput,
    INDIAN_CITIES,
    DEFAULT_TARIFF_RATES,
    DEFAULT_LOCATION,
} from "@/types/solar";
import { BillData, GeoLocation, SolarInsights } from "@/types/billExtract";
import BillUploader from "./BillUploader";
import MapView from "./MapView";
import BuildingStats from "./BuildingStats";

interface QuickEstimateProps {
    onEstimateComplete?: (result: EstimateOutput) => void;
}

export default function QuickEstimate({ onEstimateComplete }: QuickEstimateProps) {
    // Form state
    const [billAmount, setBillAmount] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [customCity, setCustomCity] = useState<string>("");
    const [tariffType, setTariffType] = useState<string>("residential");
    const [roofType, setRoofType] = useState<string>("flat");
    const [offsetPercent, setOffsetPercent] = useState<number>(100);

    // Bill extraction state
    const [extractedBill, setExtractedBill] = useState<BillData | null>(null);
    const [geoLocation, setGeoLocation] = useState<GeoLocation | null>(null);
    const [solarInsights, setSolarInsights] = useState<SolarInsights | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractionError, setExtractionError] = useState<string | null>(null);

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<EstimateOutput | null>(null);

    // Handle bill image upload and extraction
    const handleBillUpload = async (file: File) => {
        setIsExtracting(true);
        setExtractionError(null);
        setExtractedBill(null);
        setGeoLocation(null);
        setSolarInsights(null);

        try {
            // Step 1: Extract bill data
            const formData = new FormData();
            formData.append('file', file);

            const extractRes = await fetch('/api/bill-extract', {
                method: 'POST',
                body: formData,
            });

            const extractData = await extractRes.json();

            if (!extractData.success) {
                throw new Error(extractData.error || 'Failed to extract bill data');
            }

            const billData: BillData = extractData.data;
            setExtractedBill(billData);

            // Auto-fill form fields
            if (billData.totalAmount) {
                // Parse amount (remove currency symbols and commas)
                const amount = billData.totalAmount.replace(/[₹,\s]/g, '');
                const numericAmount = parseFloat(amount);
                if (!isNaN(numericAmount)) {
                    setBillAmount(numericAmount.toString());
                }
            }

            // Step 2: Geocode the address
            if (billData.address) {
                try {
                    const geocodeRes = await fetch('/api/geocode', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ address: billData.address }),
                    });

                    const geocodeData = await geocodeRes.json();

                    if (geocodeData.success && geocodeData.data) {
                        setGeoLocation(geocodeData.data);

                        // Try to match city from geocoded address
                        const formattedAddr = geocodeData.data.formattedAddress.toLowerCase();
                        const matchedCity = INDIAN_CITIES.find(c =>
                            formattedAddr.includes(c.name.toLowerCase())
                        );
                        if (matchedCity) {
                            setSelectedCity(matchedCity.name);
                        } else {
                            // Set as custom city
                            setSelectedCity("__other__");
                            setCustomCity(geocodeData.data.searchQueryUsed || billData.address.split(',')[0]);
                        }

                        // Step 3: Get building insights
                        if (geocodeData.data.lat && geocodeData.data.lng) {
                            try {
                                const insightsRes = await fetch(
                                    `/api/building-insights?lat=${geocodeData.data.lat}&lng=${geocodeData.data.lng}`
                                );
                                const insightsData = await insightsRes.json();

                                if (insightsData.success && insightsData.data) {
                                    setSolarInsights(insightsData.data);
                                }
                            } catch (insightsErr) {
                                console.warn('Could not fetch building insights:', insightsErr);
                            }
                        }
                    }
                } catch (geoErr) {
                    console.warn('Could not geocode address:', geoErr);
                }
            }

        } catch (err) {
            console.error('Bill extraction failed:', err);
            setExtractionError(err instanceof Error ? err.message : 'Failed to extract bill data');
        } finally {
            setIsExtracting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!billAmount || parseFloat(billAmount) <= 0) {
            setError("Please enter your monthly electricity bill");
            return;
        }

        if (!selectedCity) {
            setError("Please select your city");
            return;
        }

        // Handle custom city or get city from list
        let cityData;
        if (selectedCity === "__other__") {
            if (!customCity.trim()) {
                setError("Please enter your city name");
                return;
            }
            // Use geocoded location if available, otherwise default
            if (geoLocation && geoLocation.lat && geoLocation.lng) {
                cityData = {
                    lat: geoLocation.lat,
                    lon: geoLocation.lng,
                    city: customCity.trim(),
                };
            } else {
                cityData = {
                    ...DEFAULT_LOCATION,
                    city: customCity.trim(),
                };
            }
        } else {
            const foundCity = INDIAN_CITIES.find((c) => c.name === selectedCity);
            if (!foundCity) {
                setError("Invalid city selection");
                return;
            }
            cityData = {
                lat: foundCity.lat,
                lon: foundCity.lon,
                city: foundCity.name,
                state: foundCity.state,
            };
        }

        setIsLoading(true);

        try {
            const input: EstimateInput = {
                location: cityData,
                billAmount: parseFloat(billAmount),
                tariffRate: DEFAULT_TARIFF_RATES[tariffType] || 7.0,
                offsetPercent,
                roofType: roofType as 'flat' | 'tilted' | 'shed',
                roofTilt: roofType === 'flat' ? 15 : roofType === 'tilted' ? 25 : 10,
            };

            const response = await fetch("/api/solar/estimate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to calculate estimate");
            }

            setResult(data.data);
            onEstimateComplete?.(data.data);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat("en-IN").format(num);
    };

    return (
        <div className="space-y-6">
            {/* Bill Extraction Results (Map & Building Stats) */}
            {(geoLocation || solarInsights) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {geoLocation && extractedBill?.address && (
                        <MapView address={extractedBill.address} geoLocation={geoLocation} />
                    )}
                    {solarInsights && (
                        <BuildingStats insights={solarInsights} />
                    )}
                </div>
            )}

            {/* Extracted Bill Summary */}
            {extractedBill && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center mb-3">
                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-indigo-900">Bill Data Extracted</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                            <span className="text-gray-500 block">Consumer</span>
                            <span className="font-medium text-gray-900">{extractedBill.consumerName || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Amount</span>
                            <span className="font-medium text-gray-900">₹{extractedBill.totalAmount || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Units</span>
                            <span className="font-medium text-gray-900">{extractedBill.unitsConsumed || 'N/A'} kWh</span>
                        </div>
                        <div>
                            <span className="text-gray-500 block">Provider</span>
                            <span className="font-medium text-gray-900">{extractedBill.provider || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-navy-dark mb-4">
                        Quick Solar Estimate
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Upload your bill for auto-fill, or enter details manually.
                    </p>

                    {/* Bill Uploader */}
                    <BillUploader onFileSelect={handleBillUpload} isLoading={isExtracting} />

                    {/* Extraction Error */}
                    {extractionError && (
                        <div className="mb-4 p-3 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 text-sm">
                            <span className="font-medium">Note:</span> {extractionError}. You can still enter details manually.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Bill Amount */}
                        <div>
                            <label htmlFor="bill" className="block text-sm font-medium text-gray-700 mb-2">
                                Monthly Electricity Bill (₹) *
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    id="bill"
                                    value={billAmount}
                                    onChange={(e) => setBillAmount(e.target.value)}
                                    placeholder="5000"
                                    min="100"
                                    step="100"
                                    className="w-full pl-8 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none"
                                    disabled={isLoading || isExtracting}
                                />
                            </div>
                        </div>

                        {/* City Selection */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                Your City *
                            </label>
                            <select
                                id="city"
                                value={selectedCity}
                                onChange={(e) => {
                                    setSelectedCity(e.target.value);
                                    if (e.target.value !== "__other__") {
                                        setCustomCity("");
                                    }
                                }}
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white"
                                disabled={isLoading || isExtracting}
                            >
                                <option value="">Select your city</option>
                                <optgroup label="North Maharashtra">
                                    {INDIAN_CITIES.filter(c =>
                                        ['Dhule', 'Jalgaon', 'Nashik', 'Nandurbar', 'Sakri', 'Shirpur', 'Dondaicha', 'Malegaon', 'Navapur', 'Amalner', 'Chopda', 'Yaval', 'Faizpur', 'Bhusawal'].includes(c.name)
                                    ).map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </optgroup>
                                <optgroup label="Other Maharashtra Cities">
                                    {INDIAN_CITIES.filter(c =>
                                        c.state === 'Maharashtra' && !['Dhule', 'Jalgaon', 'Nashik', 'Nandurbar', 'Sakri', 'Shirpur', 'Dondaicha', 'Malegaon', 'Navapur', 'Amalner', 'Chopda', 'Yaval', 'Faizpur', 'Bhusawal'].includes(c.name)
                                    ).map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </optgroup>
                                <optgroup label="Other Indian Cities">
                                    {INDIAN_CITIES.filter(c => c.state !== 'Maharashtra').map((city) => (
                                        <option key={city.name} value={city.name}>
                                            {city.name}, {city.state}
                                        </option>
                                    ))}
                                </optgroup>
                                <option value="__other__">Other (Enter manually)</option>
                            </select>

                            {/* Custom city input */}
                            {selectedCity === "__other__" && (
                                <input
                                    type="text"
                                    value={customCity}
                                    onChange={(e) => setCustomCity(e.target.value)}
                                    placeholder="Enter your city name"
                                    className="w-full mt-3 px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none"
                                    disabled={isLoading || isExtracting}
                                />
                            )}
                        </div>

                        {/* Tariff Type */}
                        <div>
                            <label htmlFor="tariff" className="block text-sm font-medium text-gray-700 mb-2">
                                Connection Type
                            </label>
                            <select
                                id="tariff"
                                value={tariffType}
                                onChange={(e) => setTariffType(e.target.value)}
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white"
                                disabled={isLoading || isExtracting}
                            >
                                <option value="residential">Residential (₹7/kWh avg)</option>
                                <option value="commercial">Commercial (₹10/kWh avg)</option>
                                <option value="industrial">Industrial (₹8.5/kWh avg)</option>
                            </select>
                        </div>

                        {/* Roof Type */}
                        <div>
                            <label htmlFor="roof" className="block text-sm font-medium text-gray-700 mb-2">
                                Roof Type
                            </label>
                            <select
                                id="roof"
                                value={roofType}
                                onChange={(e) => setRoofType(e.target.value)}
                                className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all outline-none bg-white"
                                disabled={isLoading || isExtracting}
                            >
                                <option value="flat">Flat Terrace (RCC)</option>
                                <option value="tilted">Tilted Roof</option>
                                <option value="shed">Metal Shed</option>
                            </select>
                        </div>

                        {/* Offset Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Consumption Offset: <span className="font-bold text-primary-blue">{offsetPercent}%</span>
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                step="10"
                                value={offsetPercent}
                                onChange={(e) => setOffsetPercent(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-blue"
                                disabled={isLoading || isExtracting}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || isExtracting}
                            className="w-full bg-solar-red text-white font-bold py-4 rounded-lg hover:bg-solar-red-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Calculating...
                                </span>
                            ) : (
                                "Calculate Savings"
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Display */}
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-navy-dark mb-6">
                        {result ? "Your Solar Savings" : "Results"}
                    </h3>

                    {!result && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-24 h-24 mb-4 bg-gradient-to-br from-solar-100 to-solar-200 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-solar-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">Enter your details to see your solar savings potential</p>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-16 h-16 border-4 border-solar-200 border-t-solar-500 rounded-full animate-spin mb-4" />
                            <p className="text-gray-600">Calculating your savings...</p>
                        </div>
                    )}

                    {result && !isLoading && (
                        <div className="space-y-6">
                            {/* Main Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-solar-50 to-solar-100 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-solar-600">{result.recommendedKw} kW</div>
                                    <div className="text-sm text-gray-600 mt-1">Recommended System</div>
                                </div>
                                <div className="bg-gradient-to-br from-eco-50 to-eco-100 rounded-xl p-4 text-center">
                                    <div className="text-3xl font-bold text-eco-600">{result.panelCount}</div>
                                    <div className="text-sm text-gray-600 mt-1">Solar Panels</div>
                                </div>
                            </div>

                            {/* Savings Highlight */}
                            <div className="bg-solar-red rounded-xl p-6 text-center">
                                <div className="text-sm text-white/90 mb-1">Estimated Monthly Savings</div>
                                <div className="text-4xl font-bold text-white mb-2">{formatCurrency(result.monthlySavings)}</div>
                                <div className="text-sm text-white/90">
                                    {formatCurrency(result.annualSavings)} per year
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Annual Generation</span>
                                    <span className="font-semibold">{formatNumber(result.estAnnualKwh)} kWh</span>
                                </div>
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Payback Period</span>
                                    <span className="font-semibold">{result.paybackYears} years</span>
                                </div>
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">Roof Area Needed</span>
                                    <span className="font-semibold">{formatNumber(result.requiredAreaM2)} m²</span>
                                </div>
                                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-600">CO₂ Offset/Year</span>
                                    <span className="font-semibold">{formatNumber(result.co2OffsetKg)} kg</span>
                                </div>
                            </div>

                            {/* 25-Year Savings */}
                            <div className="bg-gradient-to-br from-primary-blue-50 to-primary-blue-100 rounded-xl p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">25-Year Lifetime Savings</div>
                                        <div className="text-2xl font-bold text-primary-blue">
                                            {formatCurrency(result.annualSavings * 20)} +
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">System Cost (est.)</div>
                                        <div className="text-lg font-semibold text-gray-700">
                                            {formatCurrency(result.recommendedKw * result.assumptions.systemCostPerKw)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/#contact"
                                className="block w-full bg-primary-blue text-white text-center font-bold py-4 rounded-lg hover:bg-primary-blue-dark transition-all shadow-lg hover:shadow-xl"
                            >
                                Get a Free Quote
                            </Link>

                            {/* Assumptions Note */}
                            <p className="text-xs text-gray-500 text-center">
                                * Estimates based on {result.assumptions.peakSunHours} peak sun hours/day,
                                ₹{result.assumptions.tariffRate}/kWh tariff, {result.assumptions.panelWattage}W panels
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
