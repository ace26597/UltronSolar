import type { Metadata } from "next";
import ToolsPageClient from "./ToolsPageClient";

export const metadata: Metadata = {
    title: "Solar Tools Hub | Free Calculators & Guides | Ultron Solar",
    description:
        "Free solar tools: bill analyzer, instant quote calculator, subsidy wizard, and EMI calculator. Plan your solar installation in Dhule and North Maharashtra.",
    alternates: {
        canonical: "https://www.ultronsolar.in/tools",
    },
    openGraph: {
        title: "Solar Tools Hub | Free Calculators & Guides",
        description:
            "Free solar tools: bill analyzer, instant quote, subsidy wizard, and EMI calculator.",
        url: "https://www.ultronsolar.in/tools",
        type: "website",
    },
};

export default function ToolsPage() {
    return <ToolsPageClient />;
}
