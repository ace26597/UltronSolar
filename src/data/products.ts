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
        name: "High-Efficiency Monocrystalline Solar Panel",
        slug: "mono-crystalline-panel-550w",
        shortDescription: "Premium 550W solar panel with 21.5% efficiency for maximum energy generation.",
        description: "Our top-of-the-line Monocrystalline Solar Panels are designed for homeowners and businesses who want the best performance. With advanced PERC technology, these panels deliver superior efficiency even in low-light conditions. They are built to withstand harsh weather conditions and come with a 25-year performance warranty.",
        features: [
            "High Efficiency: Up to 21.5% module efficiency",
            "Low Light Performance: Excellent performance in cloudy environments",
            "Durability: Certified to withstand high wind and snow loads",
            "PID Resistant: Excellent Anti-PID performance",
            "25-Year Warranty: Guaranteed power output"
        ],
        specifications: {
            "Power Output": "550W",
            "Cell Type": "Monocrystalline PERC",
            "Dimensions": "2279 x 1134 x 35 mm",
            "Weight": "28.6 kg",
            "Efficiency": "21.5%",
            "Open Circuit Voltage": "49.8V",
            "Short Circuit Current": "13.9A"
        },
        imageUrl: "/images/product-1.jpg",
        category: "Solar Panels"
    },
    {
        id: "2",
        name: "Hybrid Solar Inverter 5kW",
        slug: "hybrid-inverter-5kw",
        shortDescription: "Smart 5kW hybrid inverter compatible with battery storage for 24/7 power.",
        description: "The 5kW Hybrid Solar Inverter is the heart of your solar energy system. It intelligently manages power flow between your solar panels, battery storage, and the grid. With built-in MPPT charge controller and Wi-Fi monitoring, you can track your energy production and consumption in real-time.",
        features: [
            "Smart Energy Management: Prioritizes solar power usage",
            "Battery Ready: Compatible with lead-acid and lithium-ion batteries",
            "Remote Monitoring: Wi-Fi/GPRS module included",
            "Pure Sine Wave: Clean power for sensitive electronics",
            "IP65 Protection: Suitable for outdoor installation"
        ],
        specifications: {
            "Rated Power": "5000W",
            "Max PV Input": "6500W",
            "MPPT Voltage Range": "120V - 450V",
            "AC Output Voltage": "230V",
            "Efficiency": "97.6%",
            "Communication": "RS485, Wi-Fi, GPRS",
            "Warranty": "5 Years"
        },
        imageUrl: "/images/product-2.jpg",
        category: "Inverters"
    },
    {
        id: "3",
        name: "Solar Water Heater 200L",
        slug: "solar-water-heater-200l",
        shortDescription: "Eco-friendly water heating solution for a family of 4-5 people.",
        description: "Enjoy hot water year-round with our high-efficiency Solar Water Heater. Using advanced vacuum tube technology, it absorbs heat effectively even on cooler days. The insulated tank ensures hot water is available whenever you need it, significantly reducing your electricity bills.",
        features: [
            "High Efficiency Tubes: Three-layer absorption coating",
            "Food Grade Tank: Stainless steel inner tank for clean water",
            "Long Heat Retention: High-density PUF insulation",
            "Durable Stand: Corrosion-resistant galvanized steel",
            "Electric Backup: Optional element for cloudy days"
        ],
        specifications: {
            "Capacity": "200 Liters",
            "Inner Tank Material": "SUS304-2B Stainless Steel",
            "Outer Tank Material": "Galvanized Steel / Stainless Steel",
            "Insulation": "50mm Polyurethane Foam",
            "Tube Type": "Vacuum Tubes (58mm x 1800mm)",
            "Number of Tubes": "20"
        },
        imageUrl: "/images/product-3.jpg",
        category: "Water Heaters"
    },
    {
        id: "4",
        name: "Solar Street Light All-in-One",
        slug: "solar-street-light-aio",
        shortDescription: "Integrated solar street light with motion sensor for automated outdoor lighting.",
        description: "Illuminate your streets, gardens, and pathways with our All-in-One Solar Street Light. It combines a high-efficiency solar panel, long-life lithium battery, and bright LED light into a single compact unit. The built-in motion sensor saves energy by dimming the light when no movement is detected.",
        features: [
            "Easy Installation: No wiring required",
            "Motion Sensor: Auto-dimming for energy saving",
            "Dusk to Dawn: Automatic operation",
            "High Brightness: High-lumen LED chips",
            "Long Life Battery: LiFePO4 battery technology"
        ],
        specifications: {
            "LED Power": "40W",
            "Luminous Flux": "4800 lm",
            "Solar Panel": "Monocrystalline 60W",
            "Battery": "LiFePO4 12.8V 24Ah",
            "Mounting Height": "4-6 meters",
            "Lighting Time": "12+ hours"
        },
        imageUrl: "/images/product-1.jpg",
        category: "Lighting"
    }
];
