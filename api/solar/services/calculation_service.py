"""Service for calculating solar system requirements from bills and kW."""
import os
from typing import Tuple, Optional


# Default values
DEFAULT_TARIFF_RATE = float(os.getenv("DEFAULT_TARIFF_RATE", "7.0"))  # ₹/kWh for Indian residential
DEFAULT_PANEL_WATTAGE = 550  # Watts per panel (typical modern panel)
PANEL_DIMENSIONS = (2.0, 1.0)  # meters (length, width) - typical 550W panel
PANEL_AREA_PER_PANEL = PANEL_DIMENSIONS[0] * PANEL_DIMENSIONS[1]  # 2.0 m²


def estimate_kw_from_bill(monthly_bill: float, tariff_rate: Optional[float] = None) -> float:
    """
    Estimate required solar system size (kW) from monthly electricity bill.
    
    Args:
        monthly_bill: Monthly electricity bill in ₹
        tariff_rate: Electricity tariff rate in ₹/kWh (defaults to DEFAULT_TARIFF_RATE)
    
    Returns:
        Estimated system size in kW
    """
    if tariff_rate is None:
        tariff_rate = DEFAULT_TARIFF_RATE
    
    if monthly_bill <= 0 or tariff_rate <= 0:
        return 0.0
    
    # Calculate monthly kWh consumption
    monthly_kwh = monthly_bill / tariff_rate
    
    # Estimate daily consumption (assuming 30 days)
    daily_kwh = monthly_kwh / 30
    
    # Estimate peak sun hours in India (average 5-6 hours)
    peak_sun_hours = 5.5
    
    # Calculate required kW: daily_kwh / peak_sun_hours
    # Add 20% buffer for system losses and future growth
    required_kw = (daily_kwh / peak_sun_hours) * 1.2
    
    return round(required_kw, 2)


def calculate_panel_count(kw: float, panel_wattage: Optional[float] = None) -> int:
    """
    Calculate number of solar panels needed for a given system size.
    
    Args:
        kw: System size in kilowatts
        panel_wattage: Wattage per panel in watts (defaults to DEFAULT_PANEL_WATTAGE)
    
    Returns:
        Number of panels required (rounded up)
    """
    if panel_wattage is None:
        panel_wattage = DEFAULT_PANEL_WATTAGE
    
    if kw <= 0 or panel_wattage <= 0:
        return 0
    
    # Convert kW to watts
    total_watts = kw * 1000
    
    # Calculate number of panels (round up)
    import math
    panel_count = math.ceil(total_watts / panel_wattage)
    
    return panel_count


def estimate_terrace_area_needed(panel_count: int, panel_area: Optional[float] = None) -> float:
    """
    Estimate terrace area needed for solar panels.
    
    Args:
        panel_count: Number of panels
        panel_area: Area per panel in m² (defaults to PANEL_AREA_PER_PANEL)
    
    Returns:
        Total area needed in m²
    """
    if panel_area is None:
        panel_area = PANEL_AREA_PER_PANEL
    
    if panel_count <= 0:
        return 0.0
    
    # Add 30% buffer for spacing, walkways, and mounting structure
    total_area = panel_count * panel_area * 1.3
    
    return round(total_area, 2)


def calculate_system_specs(kw: Optional[float] = None, bill: Optional[float] = None) -> dict:
    """
    Calculate complete system specifications from either kW or bill.
    
    Args:
        kw: System size in kilowatts (if provided, used directly)
        bill: Monthly bill in ₹ (if kW not provided, used to calculate kW)
    
    Returns:
        Dictionary with system specifications:
        - kw: System size in kW
        - panel_count: Number of panels
        - terrace_area: Required terrace area in m²
        - estimated_generation: Estimated daily generation in kWh
    """
    # Determine kW
    if kw is None or kw <= 0:
        if bill and bill > 0:
            kw = estimate_kw_from_bill(bill)
        else:
            kw = 0.0
    
    # Calculate panel count
    panel_count = calculate_panel_count(kw)
    
    # Calculate terrace area
    terrace_area = estimate_terrace_area_needed(panel_count)
    
    # Estimate daily generation (kW * peak_sun_hours * efficiency)
    peak_sun_hours = 5.5
    system_efficiency = 0.85  # 85% efficiency accounting for losses
    estimated_daily_generation = kw * peak_sun_hours * system_efficiency
    
    return {
        "kw": kw,
        "panel_count": panel_count,
        "terrace_area": terrace_area,
        "estimated_daily_generation": round(estimated_daily_generation, 2),
        "panel_wattage": DEFAULT_PANEL_WATTAGE,
        "panel_dimensions": PANEL_DIMENSIONS
    }

