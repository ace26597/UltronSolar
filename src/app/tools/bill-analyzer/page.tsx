import type { Metadata } from "next";
import BillAnalyzerClient from "./BillAnalyzerClient";

export const metadata: Metadata = {
    title: "AI Bill Analyzer | Upload & Get Solar Savings | Ultron Solar",
    description:
        "Upload your electricity bill photo and our AI will extract your usage and calculate exactly how much you can save with solar in Dhule and North Maharashtra.",
    alternates: {
        canonical: "https://www.ultronsolar.in/tools/bill-analyzer",
    },
    openGraph: {
        title: "AI Bill Analyzer - Calculate Solar Savings Instantly",
        description:
            "Upload your electricity bill and get an instant solar savings estimate.",
        url: "https://www.ultronsolar.in/tools/bill-analyzer",
        type: "website",
    },
};

export default function BillAnalyzerPage() {
    return <BillAnalyzerClient />;
}
