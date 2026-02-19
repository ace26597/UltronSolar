import type { Metadata } from "next";
import EMICalculatorClient from "./EMICalculatorClient";

export const metadata: Metadata = {
    title: "Solar EMI Calculator | Loan vs Savings | Ultron Solar",
    description:
        "Calculate your solar loan EMI and compare it with monthly electricity savings. See how solar panels pay for their own loan from month 1 in Maharashtra.",
    alternates: {
        canonical: "https://www.ultronsolar.in/tools/emi-calculator",
    },
    openGraph: {
        title: "Solar EMI vs Savings Calculator",
        description:
            "Calculate solar loan EMI and see how panels pay for themselves from month 1.",
        url: "https://www.ultronsolar.in/tools/emi-calculator",
        type: "website",
    },
};

export default function EMICalculatorPage() {
    return <EMICalculatorClient />;
}
