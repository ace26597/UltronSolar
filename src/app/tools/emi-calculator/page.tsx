import type { Metadata } from "next";
import EMICalculatorClient from "./EMICalculatorClient";

export const metadata: Metadata = {
  title: "Solar EMI Calculator | Compare Monthly Loan vs Electricity Savings",
  description: "See how solar panels pay for their own loan. Compare monthly EMI payments against electricity savings with our interactive calculator.",
  alternates: { canonical: "https://www.ultronsolar.in/tools/emi-calculator" },
};

export default function EMICalculatorPage() {
  return <EMICalculatorClient />;
}
