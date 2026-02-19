import type { Metadata } from "next";
import MaintenancePageClient from "./MaintenancePageClient";

export const metadata: Metadata = {
    title: "Solar Maintenance & Repair | O&M Services | Ultron Solar",
    description:
        "Professional solar panel cleaning, health checkups, and Annual Maintenance Contracts (AMC) in Dhule and North Maharashtra. Keep your solar system at peak performance.",
    alternates: {
        canonical: "https://www.ultronsolar.in/maintenance",
    },
    openGraph: {
        title: "Solar Maintenance & Repair Services | Ultron Solar",
        description:
            "Professional solar O&M services in Dhule and North Maharashtra.",
        url: "https://www.ultronsolar.in/maintenance",
        type: "website",
    },
};

export default function MaintenancePage() {
    return <MaintenancePageClient />;
}
