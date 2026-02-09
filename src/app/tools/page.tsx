import type { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Free Solar Tools | Bill Analyzer, Quote Calculator, EMI & Subsidy Check",
  description: "Use our free AI-powered solar tools: electricity bill analyzer, instant quote calculator, EMI vs savings calculator, and PM Surya Ghar subsidy checker.",
  alternates: { canonical: "https://www.ultronsolar.in/tools" },
};

export default function ToolsPage() {
  return <ToolsClient />;
}
