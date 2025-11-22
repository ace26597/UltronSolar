export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    features: string[];
    specifications: {
        [key: string]: string;
    };
    imageUrl: string;
    category: string;
    price?: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Solar Water Pump",
        slug: "solar-water-pump",
        shortDescription: "Reliable solar powered water pump systems for agriculture and irrigation needs.",
        description: "Our Solar Water Pumps are the perfect solution for farmers and agricultural needs. Operating directly from solar power, they eliminate fuel costs and provide a reliable water supply for irrigation, livestock, and domestic use. Available in submersible and surface monoblock options.",
        features: [
            "No Fuel Cost: Runs 100% on solar energy",
            "Automatic Operation: Starts with sunrise, stops with sunset",
            "Low Maintenance: Brushless DC motor technology",
            "Durable: Stainless steel construction for long life",
            "Protection: Dry run and overload protection included"
        ],
        specifications: {
            "Power Range": "1HP to 10HP",
            "Head Range": "10m to 150m",
            "Discharge": "2000 to 200,000 Liters/Day",
            "Motor Type": "BLDC / AC Induction",
            "Controller": "MPPT based VFD",
            "Warranty": "5 Years on Panel, 2 Years on Pump"
        },
        imageUrl: "/images/product-solar-pump.jpg",
        category: "Agriculture"
    },
    {
        id: "2",
        name: "Solar Power UPS",
        slug: "solar-power-ups",
        shortDescription: "Uninterrupted power supply solutions for homes and businesses.",
        description: "Keep your home and business running during power cuts with our Solar Power UPS. It charges from both solar and the grid, ensuring you always have backup power. Ideal for computers, lights, fans, and other critical appliances.",
        features: [
            "Hybrid Charging: Solar + Grid priority logic",
            "Pure Sine Wave: Safe for sensitive electronics",
            "LCD Display: Real-time status monitoring",
            "Battery Protection: Overcharge and deep discharge protection",
            "Silent Operation: No noise pollution"
        ],
        specifications: {
            "Capacity": "1kVA to 10kVA",
            "Battery Voltage": "12V / 24V / 48V / 96V",
            "Waveform": "Pure Sine Wave",
            "Transfer Time": "< 10ms",
            "Efficiency": "> 85%",
            "Warranty": "2 Years"
        },
        imageUrl: "/images/product-solar-ups.jpg",
        category: "Inverters"
    },
    {
        id: "3",
        name: "Voltage Stabilizer",
        slug: "voltage-stabilizer",
        shortDescription: "Servo controlled voltage stabilizers for equipment protection.",
        description: "Protect your valuable appliances and industrial machinery from voltage fluctuations with our Servo Controlled Voltage Stabilizers. They provide a constant output voltage, ensuring the longevity and safety of your equipment.",
        features: [
            "High Accuracy: ±1% output voltage regulation",
            "Fast Correction: Quick response to voltage changes",
            "Digital Display: Input and output voltage monitoring",
            "Protection: High/Low voltage cut-off",
            "Heavy Duty: Copper wound transformer"
        ],
        specifications: {
            "Capacity": "1kVA to 500kVA",
            "Input Voltage Range": "170V - 270V / 90V - 270V",
            "Output Voltage": "230V ± 1%",
            "Cooling": "Air Cooled / Oil Cooled",
            "Type": "Servo Controlled",
            "Warranty": "1 Year"
        },
        imageUrl: "/images/product-servo-stabilizer.jpg",
        category: "Electronics"
    },
    {
        id: "4",
        name: "Solar Street Lights",
        slug: "solar-street-lights",
        shortDescription: "Automatic, energy-efficient lighting for streets and campuses.",
        description: "Illuminate streets, parking lots, and campuses with our All-in-One Solar Street Lights. Integrated with a solar panel, lithium battery, and LED light, they are easy to install and require zero cabling. The built-in motion sensor maximizes battery life.",
        features: [
            "All-in-One Design: Compact and easy to install",
            "Motion Sensor: Dims when no motion is detected",
            "Automatic: Dusk to dawn operation",
            "Weatherproof: IP65 rated for outdoor use",
            "Long Life: LiFePO4 battery technology"
        ],
        specifications: {
            "LED Power": "12W to 100W",
            "Solar Panel": "Monocrystalline / Polycrystalline",
            "Battery": "LiFePO4 / Li-ion",
            "Mounting Height": "4m to 8m",
            "Backup": "12-18 Hours",
            "Warranty": "2 Years"
        },
        imageUrl: "/images/product-solar-lights.jpg",
        category: "Lighting"
    },
    {
        id: "5",
        name: "Rooftop Solar Panels",
        slug: "rooftop-solar-panels",
        shortDescription: "High-efficiency solar panels for maximum energy generation.",
        description: "Turn your roof into a power plant with our high-efficiency Rooftop Solar Panels. Suitable for residential, commercial, and industrial applications, these panels help you slash your electricity bills and reduce your carbon footprint.",
        features: [
            "High Efficiency: Advanced cell technology",
            "Durability: Withstands heavy wind and snow loads",
            "PID Resistant: Long-term performance stability",
            "Low Light Performance: Generates power even on cloudy days",
            "Warranty: 25-year performance warranty"
        ],
        specifications: {
            "Power Output": "335W / 400W / 550W",
            "Type": "Polycrystalline / Monocrystalline PERC",
            "Efficiency": "> 19%",
            "Frame": "Anodized Aluminum",
            "Glass": "Tempered Low Iron",
            "Warranty": "25 Years Performance"
        },
        imageUrl: "/images/gallery-project-2.jpg",
        category: "Solar Panels"
    },
    {
        id: "6",
        name: "Solar Water Heater",
        slug: "solar-water-heater",
        shortDescription: "Cost-effective water heating solutions for all seasons.",
        description: "Get hot water every morning without the electricity bill. Our Solar Water Heaters use vacuum tube technology to absorb heat efficiently. The insulated tank keeps water hot for up to 48 hours, making it perfect for homes, hotels, and hospitals.",
        features: [
            "Efficient Heating: ETC (Evacuated Tube Collector) technology",
            "Insulated Tank: High-density PUF insulation",
            "Hard Water Compatible: Inner tank protection",
            "Electric Backup: Optional for rainy days",
            "Savings: Reduces water heating costs by up to 80%"
        ],
        specifications: {
            "Capacity": "100L / 150L / 200L / 500L",
            "Inner Tank": "Stainless Steel / Glass Lined",
            "Tubes": "3 Layer Borosilicate Glass",
            "Stand": "Galvanized Powder Coated",
            "Warranty": "5 Years"
        },
        imageUrl: "/images/gallery-project-1.jpg",
        category: "Water Heaters"
    },
    {
        id: "7",
        name: "Solar Fencing System",
        slug: "solar-fencing-system",
        shortDescription: "Secure your farm and property with solar-powered electric fencing.",
        description: "Protect your crops and property from wild animals and intruders with our Solar Fencing System. It delivers a sharp but safe shock that deters animals without causing permanent harm. It's an effective, low-maintenance security solution for farms and remote areas.",
        features: [
            "Effective Deterrent: High voltage, low current shock",
            "Solar Powered: Works 24/7 without grid power",
            "Safe: Non-lethal to animals and humans",
            "Alarm System: Optional intrusion alarm",
            "Low Maintenance: Robust design"
        ],
        specifications: {
            "Energizer Capacity": "2km to 10km",
            "Pulse Voltage": "8kV - 10kV",
            "Solar Panel": "12V 20W/40W",
            "Battery": "12V 18Ah/40Ah",
            "Wire": "GI Wire / High Tensile Wire",
            "Warranty": "1 Year"
        },
        imageUrl: "/images/gallery-project-3.jpg",
        category: "Security"
    }
];
