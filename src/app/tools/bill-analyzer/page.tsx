import type { Metadata } from "next";
import BillAnalyzerClient from "./BillAnalyzerClient";

export const metadata: Metadata = {
  title: "Free Electricity Bill Analyzer | AI-Powered Solar Savings Calculator",
  description: "Upload your electricity bill photo and our AI instantly calculates your solar savings, recommended system size, and subsidy eligibility.",
  alternates: { canonical: "https://www.ultronsolar.in/tools/bill-analyzer" },
};

export default function BillAnalyzerPage() {
  return <BillAnalyzerClient />;
}
